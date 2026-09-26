// 节点编辑器页面：React Flow 画布 + GraphRuntime 求值 + 参数面板 + 存读导出。
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  ReactFlow, ReactFlowProvider, Background, Controls, MiniMap,
  addEdge, useNodesState, useEdgesState, useReactFlow, SelectionMode,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import * as THREE from 'three'
import { saveAs } from 'file-saver'
import { getNodeDef } from '../graph/nodeRegistry.js'
import { createGraphNode, newEdgeId } from './nodeFactory.js'
import { GraphRuntime } from '../runtime/graphRuntime.js'
import { createNodeStore, readNodeParams, readCommonParams } from '../runtime/scopedStore.js'
import { getNoiseDefaults, getCommonDefaults } from '../runtime/noiseSliceRegistry.js'
import { downloadGraph, readGraphFile } from '../graph/ncgraphIO.js'
import { toGraphModel, graphToRF, graphAnimates, resolveNodeState } from './graphMapping.js'
import GenericNode from './GenericNode.jsx'
import NodePalette from './NodePalette.jsx'
import NodeParamsPanel from './NodeParamsPanel.jsx'
import { setThumbnail, clearThumbnails } from './thumbnailStore.js'
import { isPreviewData, isThumbnailData, previewSize } from './nodeKinds.js'
import { useLang, toggleLang } from '../i18n/index.js'
import './nodeEditor.css'

const nodeTypes = { ncNode: GenericNode }

function makeOutputNode() {
  return createGraphNode(getNodeDef('output', 'output'), { x: 720, y: 220 })
}

function drawPixels(canvas, pixels) {
  if (!canvas || !pixels) return
  const { data, width, height } = pixels
  if (canvas.width !== width) canvas.width = width
  if (canvas.height !== height) canvas.height = height
  const ctx = canvas.getContext('2d')
  const image = ctx.createImageData(width, height)
  for (let y = 0; y < height; y++) {
    const src = (height - 1 - y) * width * 4
    image.data.set(data.subarray(src, src + width * 4), y * width * 4)
  }
  ctx.putImageData(image, 0, 0)
}

function pixelsToDataURL(pixels) {
  const canvas = document.createElement('canvas')
  drawPixels(canvas, pixels)
  return canvas.toDataURL('image/png')
}

function Editor() {
  const initialNodesRef = useRef(null)
  if (initialNodesRef.current === null) initialNodesRef.current = [makeOutputNode()]
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodesRef.current)
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [selectedId, setSelectedId] = useState(null)
  const [paletteOpen, setPaletteOpen] = useState(true)
  const [creatorOpen, setCreatorOpen] = useState(false)
  const [pendingConnect, setPendingConnect] = useState(null)
  const [playing, setPlaying] = useState(true)
  const [status, setStatus] = useState('')
  const [graphName, setGraphName] = useState('未命名节点图')
  const [panelWidth, setPanelWidth] = useState(466)
  const [previewSide, setPreviewSide] = useState(220)
  const [, bumpStores] = useState(0)

  const { screenToFlowPosition } = useReactFlow()
  const lang = useLang()

  const canvasRef = useRef(null)
  const canvasWrapRef = useRef(null)
  const previewCanvasRef = useRef(null)
  const fileRef = useRef(null)
  const runtimeRef = useRef(null)
  const rendererRef = useRef(null)
  const storesRef = useRef(new Map())
  const metaRef = useRef({ name: '未命名节点图' })
  const dirtyRef = useRef(true)
  const thumbDirtyRef = useRef(true)
  const previewDirtyRef = useRef(true)
  const playingRef = useRef(true)
  const nodesRef = useRef(nodes)
  const edgesRef = useRef(edges)
  const previewSizeRef = useRef(previewSide)
  const pendingPositionRef = useRef(null)

  nodesRef.current = nodes
  edgesRef.current = edges
  metaRef.current = { name: graphName }
  playingRef.current = playing
  previewSizeRef.current = previewSide

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, preserveDrawingBuffer: true, antialias: false })
    renderer.setPixelRatio(1)
    rendererRef.current = renderer
    runtimeRef.current = new GraphRuntime(renderer)
    return () => {
      runtimeRef.current?.dispose()
      renderer.dispose()
    }
  }, [])

  // 每个噪波节点一份作用域 store，并订阅其参数变化回写到 React Flow 节点数据。
  useEffect(() => {
    for (const id of [...storesRef.current.keys()]) {
      if (!nodes.some(n => n.id === id)) storesRef.current.delete(id)
    }
    for (const node of nodes) {
      if (node.data.type !== 'noise' || storesRef.current.has(node.id)) continue
      const store = createNodeStore(node.data.noiseName, node.data.params, node.data.commonParams)
      storesRef.current.set(node.id, store)
      const noiseName = node.data.noiseName
      store.subscribe(() => {
        const params = readNodeParams(store, noiseName)
        const commonParams = readCommonParams(store)
        setNodes(nds => nds.map(n => (n.id === node.id ? { ...n, data: { ...n.data, params, commonParams } } : n)))
        dirtyRef.current = true
      })
      bumpStores(v => v + 1)
    }
  }, [nodes, setNodes])

  const topoKey = useMemo(
    () => nodes.map(n => `${n.id}:${n.data.type}:${n.data.op}`).join('|')
      + '::' + edges.map(e => `${e.source}:${e.sourceHandle}>${e.target}:${e.targetHandle}`).join('|'),
    [nodes, edges],
  )

  const outputResolution = useMemo(() => {
    const out = nodes.find(n => n.data.type === 'output')
    return Number(out?.data?.params?.resolution) || 1024
  }, [nodes])

  useEffect(() => {
    const rt = runtimeRef.current
    if (!rt) return
    rt.setGraph(toGraphModel(nodesRef.current, edgesRef.current, metaRef.current))
    rt.setResolution(outputResolution)
    rt.preload().then(missing => {
      setStatus(missing.length ? `有 ${missing.length} 个节点的着色器加载失败` : '')
      dirtyRef.current = true
    })
    dirtyRef.current = true
  }, [topoKey, outputResolution])

  const pushParams = useCallback((rt) => {
    const ns = nodesRef.current
    const es = edgesRef.current
    for (const node of ns) {
      const { params, commonParams } = resolveNodeState(node, ns, es, rt.time)
      rt.setNodeParams(node.id, params, commonParams)
    }
  }, [])

  // 求值循环：脏标记或存在动画节点时重新求值；缩略图 300ms 节流，输出预览 150ms。
  useEffect(() => {
    let raf
    let last = performance.now()
    let lastThumb = 0
    let lastPreview = 0
    const loop = (now) => {
      const delta = Math.min((now - last) / 1000, 0.1)
      last = now
      const rt = runtimeRef.current
      if (rt && rt.ready) {
        const animating = playingRef.current && graphAnimates(nodesRef.current)
        if (dirtyRef.current || animating) {
          pushParams(rt)
          rt.evaluate(animating ? delta : 0)
          dirtyRef.current = false
          thumbDirtyRef.current = true
          previewDirtyRef.current = true
        }
        if (now - lastThumb > 300 && thumbDirtyRef.current) {
          lastThumb = now
          thumbDirtyRef.current = false
          for (const node of nodesRef.current) {
            if (!isThumbnailData(node.data)) continue
            const size = isPreviewData(node.data) ? previewSize(node.data) : 96
            const pixels = rt.captureNode(node.id, 'out', size)
            if (pixels) setThumbnail(node.id, pixelsToDataURL(pixels))
          }
        }
        if (now - lastPreview > 150 && previewDirtyRef.current && previewCanvasRef.current) {
          lastPreview = now
          previewDirtyRef.current = false
          const size = Math.round(Math.min(640, Math.max(120, previewSizeRef.current)))
          const pixels = rt.captureNode(rt.outputId, 'out', size)
          if (pixels) drawPixels(previewCanvasRef.current, pixels)
        }
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [pushParams])

  // 统一的加边逻辑：同一目标端口只保留一条入边（handle 连线与拖到空白创建都复用）。
  const addConnection = useCallback((connection) => {
    setEdges(eds => {
      const filtered = eds.filter(e => !(e.target === connection.target && e.targetHandle === connection.targetHandle))
      return addEdge({ ...connection, id: newEdgeId() }, filtered)
    })
    dirtyRef.current = true
  }, [setEdges])

  // 目标点（flow 坐标）缺省时落在当前画布中心；双击/空白拖拽创建时传入落点。
  // connect 存在时，把源的输出连到新节点的首个输入端口（inputs[0] 为主输入）。
  const addNode = useCallback((def, target, connect) => {
    let position = target
    if (!position) {
      const rect = canvasWrapRef.current?.getBoundingClientRect()
      const base = screenToFlowPosition({
        x: (rect?.left || 0) + (rect?.width || 600) / 2,
        y: (rect?.top || 0) + (rect?.height || 600) / 2,
      })
      position = base
      // 与已有节点位置冲突时微移，避免完全重叠导致端口无法操作
      const taken = (p) => nodesRef.current.some(n => Math.abs(n.position.x - p.x) < 12 && Math.abs(n.position.y - p.y) < 12)
      let i = 0
      while (taken(position) && i < 8) {
        i += 1
        position = { x: base.x + i * 36, y: base.y + i * 36 }
      }
    }
    const node = createGraphNode(def, position)
    setNodes(nds => nds.concat(node))
    if (connect && def.inputs?.length) {
      addConnection({
        source: connect.source,
        sourceHandle: connect.sourceHandle,
        target: node.id,
        targetHandle: def.inputs[0].name,
      })
    }
    dirtyRef.current = true
  }, [screenToFlowPosition, setNodes, addConnection])

  // 双击画布空白处：以双击点作为创建基准点，打开创建弹窗。
  const handleCanvasDoubleClick = useCallback((e) => {
    if (e.target.closest('.react-flow__node') || e.target.closest('.nc-palette') || e.target.closest('.nc-preview-glass')) return
    pendingPositionRef.current = screenToFlowPosition({ x: e.clientX, y: e.clientY })
    setPendingConnect(null)
    setCreatorOpen(true)
  }, [screenToFlowPosition])

  // 用捕获阶段的原生 dblclick，避免 React Flow pane 拦截事件冒泡。
  const dblClickRef = useRef(handleCanvasDoubleClick)
  dblClickRef.current = handleCanvasDoubleClick
  useEffect(() => {
    const el = canvasWrapRef.current
    if (!el) return
    const listener = (e) => dblClickRef.current(e)
    el.addEventListener('dblclick', listener, true)
    return () => el.removeEventListener('dblclick', listener, true)
  }, [])

  const onConnect = useCallback((connection) => addConnection(connection), [addConnection])

  // 从输出 handle 起拖、在画布空白处松手：以落点打开创建弹窗，并记住待连接的源。
  const handleConnectEnd = useCallback((event, connectionState) => {
    const from = connectionState?.fromHandle
    if (!from || from.type !== 'source') return
    if (connectionState.toHandle) return
    const t = event.target
    const wrap = canvasWrapRef.current
    if (!wrap || !t || !wrap.contains(t)) return
    if (t.closest('.react-flow__node') || t.closest('.nc-palette') || t.closest('.nc-preview-glass')) return
    const point = event.changedTouches ? event.changedTouches[0] : event
    pendingPositionRef.current = screenToFlowPosition({ x: point.clientX, y: point.clientY })
    setPendingConnect({ source: from.nodeId, sourceHandle: from.id })
    setCreatorOpen(true)
  }, [screenToFlowPosition])

  // Output 全局唯一且不可删除：拦截 React Flow 的删除（键盘 Backspace/Delete 等）。
  const onBeforeDelete = useCallback(async ({ nodes: nodesToDelete, edges: edgesToDelete }) => {
    const deletableNodes = nodesToDelete.filter(n => n.data?.type !== 'output')
    if (deletableNodes.length === nodesToDelete.length) return { nodes: nodesToDelete, edges: edgesToDelete }
    const deletableIds = new Set(deletableNodes.map(n => n.id))
    return {
      nodes: deletableNodes,
      edges: edgesToDelete.filter(e => deletableIds.has(e.source) || deletableIds.has(e.target)),
    }
  }, [])

  const deleteSelected = useCallback(() => {
    if (!selectedId) return
    if (nodesRef.current.find(n => n.id === selectedId)?.data.type === 'output') return
    setNodes(nds => nds.filter(n => n.id !== selectedId))
    setEdges(eds => eds.filter(e => e.source !== selectedId && e.target !== selectedId))
    storesRef.current.delete(selectedId)
    setSelectedId(null)
    dirtyRef.current = true
  }, [selectedId, setNodes, setEdges])

  // Ctrl/Cmd + D：复制选中节点（只复制节点本身与其参数，不带任何连线）。
  const duplicateNode = useCallback((id) => {
    setNodes(nds => {
      const src = nds.find(n => n.id === id)
      if (!src || src.data.type === 'output') return nds
      const copy = createGraphNode(getNodeDef(src.data.type, src.data.op), { x: src.position.x + 40, y: src.position.y + 40 })
      copy.data.params = JSON.parse(JSON.stringify(src.data.params || {}))
      if (src.data.commonParams) copy.data.commonParams = JSON.parse(JSON.stringify(src.data.commonParams))
      copy.data.label = src.data.label
      return nds.concat(copy)
    })
    dirtyRef.current = true
  }, [setNodes])

  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'd' || e.key === 'D')) {
        if (!selectedId) return
        e.preventDefault()
        duplicateNode(selectedId)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selectedId, duplicateNode])

  // 空格键呼出创建节点弹窗（输入框内不触发）
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.code !== 'Space' && e.key !== ' ') return
      const target = e.target
      const tag = target?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target?.isContentEditable) return
      if (e.ctrlKey || e.metaKey || e.altKey) return
      e.preventDefault()
      pendingPositionRef.current = null
      setPendingConnect(null)
      setCreatorOpen(v => !v)
    }
    const onEsc = (e) => { if (e.key === 'Escape') setCreatorOpen(false) }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keydown', onEsc)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keydown', onEsc)
    }
  }, [])

  const startPanelResize = useCallback((e) => {
    e.preventDefault()
    const startX = e.clientX
    const startWidth = panelWidth
    const onMove = (ev) => setPanelWidth(Math.min(Math.max(startWidth - (ev.clientX - startX), 260), 900))
    const onUp = () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [panelWidth])

  // 预览保持 1:1：取水平/垂直拖拽量中较大者作为新的边长。
  const startPreviewResize = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    const startX = e.clientX
    const startY = e.clientY
    const startSide = previewSide
    const onMove = (ev) => {
      const delta = Math.max(-(ev.clientX - startX), ev.clientY - startY)
      setPreviewSide(Math.min(Math.max(startSide + delta, 120), 640))
    }
    const onUp = () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [previewSide])

  const updateNodeParam = useCallback((id, name, value) => {
    setNodes(nds => nds.map(n => (n.id === id ? { ...n, data: { ...n.data, params: { ...n.data.params, [name]: value } } } : n)))
    dirtyRef.current = true
  }, [setNodes])

  // 供参数面板按节点回读输出像素（无缝贴图的拼接预览用）。
  const captureNodePreview = useCallback((id, port, size) => runtimeRef.current?.captureNode(id, port, size), [])

  const setResolution = useCallback((value) => {
    const out = nodesRef.current.find(n => n.data.type === 'output')
    if (out) updateNodeParam(out.id, 'resolution', Number(value))
  }, [updateNodeParam])

  const exportPNG = useCallback(() => {
    const rt = runtimeRef.current
    if (!rt) return
    const pixels = rt.readOutputPixels()
    if (!pixels) { setStatus('没有可导出的输出（请连接 Output 节点）'); return }
    const canvas = document.createElement('canvas')
    drawPixels(canvas, pixels)
    saveAs(canvas.toDataURL('image/png'), `${graphName || 'nodeGraph'}.png`)
  }, [graphName])

  const saveGraph = useCallback(() => {
    const graph = toGraphModel(nodesRef.current, edgesRef.current, metaRef.current)
    downloadGraph(graph, `${graphName || '未命名节点图'}.ncgraph`)
  }, [graphName])

  const handleFile = useCallback(async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    const result = await readGraphFile(file, {
      getNoiseDefaults,
      getCommonDefaults,
    })
    if (!result.ok) { setStatus(result.error); return }
    if (result.warnings.length) setStatus(result.warnings.join('；'))
    storesRef.current.clear()
    clearThumbnails()
    const rf = graphToRF(result.graph)
    setNodes(rf.nodes)
    setEdges(rf.edges)
    setGraphName(result.graph.meta?.name || '未命名节点图')
    setSelectedId(null)
    dirtyRef.current = true
  }, [setNodes, setEdges])

  const displayNodes = useMemo(() => {
    const paramTargets = new Set(edges.filter(e => e.targetHandle?.startsWith('param:')).map(e => e.target))
    const hasPreview = nodes.some(n => isPreviewData(n.data))
    if (paramTargets.size === 0 && !hasPreview) return nodes
    return nodes.map(n => {
      let data = n.data
      if (paramTargets.has(n.id) && !data.hasParamEdge) data = { ...data, hasParamEdge: true }
      if (isPreviewData(n.data)) {
        data = { ...data, onParamChange: (name, value) => updateNodeParam(n.id, name, value) }
      }
      return data === n.data ? n : { ...n, data }
    })
  }, [nodes, edges, updateNodeParam])

  const selectedNode = nodes.find(n => n.id === selectedId) || null
  const selectedDef = selectedNode ? getNodeDef(selectedNode.data.type, selectedNode.data.op) : null
  const selectedStore = selectedNode ? storesRef.current.get(selectedNode.id) || null : null
  const overridden = useMemo(
    () => edges
      .filter(e => e.target === selectedId && e.targetHandle?.startsWith('param:'))
      .map(e => e.targetHandle.slice(6)),
    [edges, selectedId],
  )

  return (
    <div className="nc-editor">
      <div className="nc-toolbar">
        <span className="nc-brand">节点混合面板</span>
        <input className="nc-name" value={graphName} onChange={e => setGraphName(e.target.value)} />
        <button className={paletteOpen ? 'nc-btn active' : 'nc-btn'} onClick={() => setPaletteOpen(v => !v)}>添加节点</button>
        <button className="nc-btn" onClick={saveGraph}>保存Graph</button>
        <button className="nc-btn" onClick={() => fileRef.current?.click()}>打开Graph</button>
        <button className="nc-btn" onClick={() => setPlaying(v => !v)}>{playing ? '暂停动画' : '播放动画'}</button>
        <label className="nc-res">
          分辨率
          <select value={outputResolution} onChange={e => setResolution(e.target.value)}>
            {[256, 512, 1024, 1536, 2048].map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </label>
        <button className="nc-btn export" onClick={exportPNG}>导出 PNG</button>
        <a className="nc-btn link" href="/">返回首页</a>
        <button className="nc-btn lang" onClick={toggleLang} title="中英文切换">
          {lang === 'zh' ? '中文 / EN' : 'EN / 中文'}
        </button>
        {status && <span className="nc-status">{status}</span>}
      </div>

      <div className="nc-main">
        <div className="nc-canvas-wrap" ref={canvasWrapRef} onDoubleClick={handleCanvasDoubleClick}>
          <ReactFlow
            nodes={displayNodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onConnectEnd={handleConnectEnd}
            onBeforeDelete={onBeforeDelete}
            onSelectionChange={params => setSelectedId(params.nodes[0]?.id || null)}
            selectionOnDrag
            panOnDrag={[1, 2]}
            selectionMode={SelectionMode.Partial}
            deleteKeyCode={['Backspace', 'Delete']}
            proOptions={{ hideAttribution: true }}
            fitView
            fitViewOptions={{ padding: 0.2, maxZoom: 1 }}
            minZoom={0.1}
            maxZoom={2.5}
          >
            <Background color="#333" gap={24} />
            <Controls showInteractive={false} />
            <MiniMap pannable zoomable />
          </ReactFlow>
          {paletteOpen && <NodePalette onAdd={addNode} onClose={() => setPaletteOpen(false)} />}
          <div className="nc-preview-glass">
            <span>Output 预览</span>
            <canvas
              ref={previewCanvasRef}
              width={320}
              height={320}
              style={{ width: previewSide, height: previewSide }}
            />
            <span className="nc-preview-resize" onMouseDown={startPreviewResize} title="拖拽调整预览大小" />          </div>
        </div>

        <div className="nc-splitter" onMouseDown={startPanelResize} title="拖拽调整参数面板宽度" />

        <div className="nc-panel-host" style={{ width: panelWidth }}>
          <NodeParamsPanel
            node={selectedNode}
            def={selectedDef}
            store={selectedStore}
            overridden={overridden}
            onChange={(name, value) => selectedId && updateNodeParam(selectedId, name, value)}
            onDelete={deleteSelected}
            canDelete={selectedNode?.data.type !== 'output'}
            captureNode={captureNodePreview}
          />
        </div>
      </div>

      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <input ref={fileRef} type="file" accept=".ncgraph" style={{ display: 'none' }} onChange={handleFile} />

      {creatorOpen && (
        <div className="nc-creator-overlay" onClick={() => { setCreatorOpen(false); pendingPositionRef.current = null; setPendingConnect(null) }}>
          <div className="nc-creator-modal" onClick={e => e.stopPropagation()}>
            <NodePalette
              connectMode={!!pendingConnect}
              onAdd={def => {
                setCreatorOpen(false)
                addNode(def, pendingPositionRef.current, pendingConnect)
                pendingPositionRef.current = null
                setPendingConnect(null)
              }}
              onClose={() => { setCreatorOpen(false); pendingPositionRef.current = null; setPendingConnect(null) }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default function NodeEditorPage() {
  return (
    <ReactFlowProvider>
      <Editor />
    </ReactFlowProvider>
  )
}
