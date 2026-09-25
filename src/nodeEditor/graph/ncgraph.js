// .ncgraph 自定义格式的序列化与反序列化（纯函数）。
// 格式设计见 main-files/节点编辑器设计方案.md 第四章。
import { getDefaultParams, resolveNodeDef } from './nodeRegistry.js'
// 仅为副作用导入：确保噪波节点在 getNodeDef 中可解析
import './noiseCatalog.js'

export const GRAPH_FORMAT = 'NoiseCreaterGraph'
export const GRAPH_VERSION = 1

const APP_NAME = 'NoiseCreaterReact'
const APP_VERSION = '0.0.0'

function clone(value) {
  return value == null ? value : JSON.parse(JSON.stringify(value))
}

let idSeed = 0
export function createNodeId(prefix = 'n') {
  idSeed += 1
  const rand = Math.random().toString(36).slice(2, 8)
  return `${prefix}_${rand}${idSeed.toString(36)}`
}

export function createEdgeId() {
  return createNodeId('e')
}

export function createGraphMeta(name = '未命名节点图') {
  const now = new Date().toISOString()
  return { name, createdAt: now, modifiedAt: now, app: APP_NAME, appVersion: APP_VERSION }
}

export function createEmptyGraph(name) {
  return { meta: createGraphMeta(name), viewport: { x: 0, y: 0, zoom: 1 }, nodes: [], edges: [] }
}

function normalizePosition(position) {
  const x = Number(position?.x)
  const y = Number(position?.y)
  return { x: Number.isFinite(x) ? x : 0, y: Number.isFinite(y) ? y : 0 }
}

function serializeNode(node) {
  const out = {
    id: node.id,
    type: node.type,
    position: normalizePosition(node.position),
  }
  if (node.label != null) out.label = node.label

  if (node.type === 'noise') {
    out.noiseName = node.noiseName
    if (node.shaderPath) out.shaderPath = node.shaderPath
    out.params = clone(node.params) || {}
    out.commonParams = clone(node.commonParams) || {}
  } else {
    if (node.op != null) out.op = node.op
    out.params = clone(node.params) || {}
  }
  return out
}

function serializeEdge(edge) {
  return {
    id: edge.id,
    from: { node: edge.from?.node, port: edge.from?.port ?? 'out' },
    to: { node: edge.to?.node, port: edge.to?.port },
  }
}

// 把内部图对象导出为 .ncgraph 结构（可直接 JSON.stringify）。
export function serializeGraph(graph) {
  const meta = { ...createGraphMeta(graph?.meta?.name), ...clone(graph?.meta) }
  meta.modifiedAt = new Date().toISOString()
  return {
    format: GRAPH_FORMAT,
    version: GRAPH_VERSION,
    meta,
    viewport: {
      x: Number(graph?.viewport?.x) || 0,
      y: Number(graph?.viewport?.y) || 0,
      zoom: Number(graph?.viewport?.zoom) || 1,
    },
    nodes: (graph?.nodes || []).map(serializeNode),
    edges: (graph?.edges || []).map(serializeEdge),
  }
}

function deserializeNode(rawNode, options, warnings) {
  const def = resolveNodeDef(rawNode)
  if (!def) {
    warnings.push(`未知节点类型：${rawNode?.type}${rawNode?.op ? `/${rawNode.op}` : ''}${rawNode?.noiseName ? `/${rawNode.noiseName}` : ''}`)
  }

  const node = {
    id: rawNode.id,
    type: rawNode.type,
    position: normalizePosition(rawNode.position),
  }
  if (rawNode.label != null) node.label = rawNode.label

  if (rawNode.type === 'noise') {
    node.noiseName = rawNode.noiseName
    node.op = rawNode.noiseName
    node.shaderPath = rawNode.shaderPath || def?.shaderPath
    const defaults = options.getNoiseDefaults ? options.getNoiseDefaults(rawNode.noiseName) : {}
    node.params = { ...defaults, ...(clone(rawNode.params) || {}) }
    const commonDefaults = options.getCommonDefaults ? options.getCommonDefaults() : {}
    node.commonParams = { ...commonDefaults, ...(clone(rawNode.commonParams) || {}) }
  } else {
    node.op = def?.op ?? rawNode.op
    const defaults = def ? getDefaultParams(def) : {}
    node.params = { ...defaults, ...(clone(rawNode.params) || {}) }
  }

  if (!def) node.error = true
  return node
}

function deserializeEdge(rawEdge, nodeIds, warnings) {
  const from = rawEdge?.from?.node
  const to = rawEdge?.to?.node
  if (!from || !to || !nodeIds.has(from) || !nodeIds.has(to)) {
    warnings.push(`丢弃无效连线：${rawEdge?.id ?? '(无 id)'}`)
    return null
  }
  return {
    id: rawEdge.id || createEdgeId(),
    from: { node: from, port: rawEdge.from.port ?? 'out' },
    to: { node: to, port: rawEdge.to.port ?? 'in' },
  }
}

/**
 * 解析 .ncgraph。
 * @param {object} raw 已 JSON.parse 的文件对象
 * @param {object} [options]
 * @param {function} [options.getNoiseDefaults] (noiseName) => 参数默认值
 * @param {function} [options.getCommonDefaults] () => 节点级公共参数默认值
 * @returns {{ ok: boolean, error: string|null, warnings: string[], graph: object|null }}
 */
export function deserializeGraph(raw, options = {}) {
  const warnings = []
  if (!raw || typeof raw !== 'object') {
    return { ok: false, error: '文件内容不是有效的 JSON 对象', warnings, graph: null }
  }
  if (raw.format !== GRAPH_FORMAT) {
    return { ok: false, error: '非本平台节点图文件', warnings, graph: null }
  }
  if (Number(raw.version) > GRAPH_VERSION) {
    warnings.push(`文件版本 ${raw.version} 高于当前支持的 ${GRAPH_VERSION}，尝试只读加载`)
  }
  if (!Array.isArray(raw.nodes)) {
    return { ok: false, error: '缺少 nodes 字段', warnings, graph: null }
  }

  const nodes = raw.nodes
    .filter(n => n && typeof n.id === 'string')
    .map(n => deserializeNode(n, options, warnings))
  const nodeIds = new Set(nodes.map(n => n.id))

  const edges = (Array.isArray(raw.edges) ? raw.edges : [])
    .map(e => deserializeEdge(e, nodeIds, warnings))
    .filter(Boolean)

  const outputNodes = nodes.filter(n => n.type === 'output')
  if (outputNodes.length === 0) warnings.push('图中没有 Output 节点')
  else if (outputNodes.length > 1) warnings.push('图中存在多个 Output 节点，仅使用第一个')

  return {
    ok: true,
    error: null,
    warnings,
    graph: {
      meta: { ...createGraphMeta(raw?.meta?.name), ...clone(raw.meta) },
      viewport: {
        x: Number(raw?.viewport?.x) || 0,
        y: Number(raw?.viewport?.y) || 0,
        zoom: Number(raw?.viewport?.zoom) || 1,
      },
      nodes,
      edges,
    },
  }
}
