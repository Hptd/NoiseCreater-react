// 多 pass FBO 求值引擎（纯 three.js，不含 React）。
// 每个节点一份 material + RenderTarget，下游把上游的 target 当纹理采样。
import * as THREE from 'three'
import VertShader from '../../../public/glsl/NoiseVertexShader.js'
import { topoSort, findCycleNodes } from '../graph/graphUtils.js'
import { resolveNodeDef } from '../graph/nodeRegistry.js'
// 仅为副作用导入：确保噪波节点定义在 resolveNodeDef 前完成注册
import '../graph/noiseCatalog.js'
import { getFamilyShader } from '../shaders/index.js'
import { getNoiseShader, preloadNoiseShaders } from './noiseShaderCache.js'
import {
  createNodeUniforms, updateNodeUniforms,
  createNoiseUniforms, updateNoiseUniforms,
  INPUT_LETTERS,
} from './uniforms.js'

export const MAX_RESOLUTION = 2048
export const MIN_RESOLUTION = 64

export class GraphRuntime {
  constructor(renderer) {
    this.renderer = renderer
    this.scene = new THREE.Scene()
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    this.quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2))
    this.quad.frustumCulled = false
    this.scene.add(this.quad)

    this.resolution = 1024
    this.graph = { nodes: [], edges: [] }
    this.nodes = new Map()
    this.edgesByInput = new Map()
    this.outputId = null
    this.error = null
    this.cycleNodes = new Set()
    this.time = 0
    this.ready = false
    this._captureMaterial = null
    this._captureTargets = new Map()
  }

  setGraph(graph) {
    this.disposeNodes()
    this.graph = graph || { nodes: [], edges: [] }
    this.nodes.clear()
    this.edgesByInput.clear()

    for (const node of this.graph.nodes || []) {
      const def = resolveNodeDef(node)
      this.nodes.set(node.id, {
        node,
        def,
        error: !def,
        params: node.params || {},
        commonParams: node.commonParams || {},
        material: null,
        targets: [],
        targetResolution: 0,
      })
    }
    for (const edge of this.graph.edges || []) {
      if (!edge?.to?.node) continue
      this.edgesByInput.set(`${edge.to.node}:${edge.to.port}`, edge)
    }
    const output = (this.graph.nodes || []).find(n => n.type === 'output')
    this.outputId = output ? output.id : null
    this.ready = true
    this.error = output ? null : 'no output node'
  }

  setResolution(size) {
    const clamped = Math.min(Math.max(Number(size) || 1024, MIN_RESOLUTION), MAX_RESOLUTION)
    if (clamped === this.resolution) return
    this.resolution = clamped
    for (const entry of this.nodes.values()) this.disposeEntry(entry)
  }

  setNodeParams(id, params, commonParams) {
    const entry = this.nodes.get(id)
    if (!entry) return
    entry.params = params || {}
    if (commonParams) entry.commonParams = commonParams
  }

  // 预加载图中全部噪波着色器；返回缺失列表（正常情况下为空）。
  async preload() {
    const paths = []
    for (const entry of this.nodes.values()) {
      if (entry.def?.type === 'noise' && entry.def.shaderPath) paths.push(entry.def.shaderPath)
      if (entry.def?.shaderPaths) paths.push(...entry.def.shaderPaths)
    }
    await preloadNoiseShaders(paths)
    const missing = []
    for (const entry of this.nodes.values()) {
      if (!entry.def) continue
      if (entry.def.type === 'noise' && !getNoiseShader(entry.def.shaderPath)) missing.push(entry.node.id)
      if (!entry.def.type && !getFamilyShader(entry.def.shader) && entry.def.shader !== 'noise') missing.push(entry.node.id)
    }
    return missing
  }

  ensureMaterial(entry) {
    if (entry.material) return entry.material
    const def = entry.def
    const source = def.type === 'noise' ? getNoiseShader(def.shaderPath) : getFamilyShader(def.shader)
    // 着色器可能尚未加载完成：此处不置粘性错误，等 preload 完成后由脏标记重试。
    if (!source) return null
    const uniforms = def.type === 'noise'
      ? createNoiseUniforms(def.noiseName, entry.commonParams, entry.params)
      : createNodeUniforms(def)
    const material = new THREE.ShaderMaterial({
      vertexShader: VertShader,
      fragmentShader: source,
      uniforms,
      depthTest: false,
      depthWrite: false,
    })
    material.extensions = { derivatives: true }
    entry.material = material
    return material
  }

  ensureTargets(entry) {
    const count = Math.max(entry.def.outputs?.length || 1, 1)
    if (entry.targets.length === count && entry.targetResolution === this.resolution) return
    for (const t of entry.targets) t.dispose()
    entry.targets = []
    for (let i = 0; i < count; i++) {
      const target = new THREE.WebGLRenderTarget(this.resolution, this.resolution, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        wrapS: THREE.ClampToEdgeWrapping,
        wrapT: THREE.ClampToEdgeWrapping,
        depthBuffer: false,
        stencilBuffer: false,
      })
      entry.targets.push(target)
    }
    entry.targetResolution = this.resolution
  }

  getTexture(nodeId, port) {
    const upstream = this.nodes.get(nodeId)
    if (!upstream || !upstream.targets.length) return null
    const outputs = upstream.def?.outputs || ['out']
    const index = outputs.length > 1 ? Math.max(outputs.indexOf(port), 0) : 0
    return upstream.targets[Math.min(index, upstream.targets.length - 1)]?.texture || null
  }

  bindInputs(entry, material) {
    const def = entry.def
    for (let i = 0; i < INPUT_LETTERS.length; i++) {
      const input = def.inputs[i]
      if (!input) continue
      const letter = INPUT_LETTERS[i]
      const uniformIn = material.uniforms[`uIn${letter}`]
      const uniformHas = material.uniforms[`uHas${letter}`]
      if (!uniformIn || !uniformHas) continue
      const edge = this.edgesByInput.get(`${entry.node.id}:${input.name}`)
      const texture = edge ? this.getTexture(edge.from.node, edge.from.port) : null
      uniformIn.value = texture
      uniformHas.value = Boolean(texture)
    }
  }

  renderEntry(entry) {
    const material = this.ensureMaterial(entry)
    if (!material) return
    this.ensureTargets(entry)
    const count = entry.targets.length

    for (let out = 0; out < count; out++) {
      this.quad.material = material
      if (entry.def.type === 'noise') {
        const anim = entry.commonParams.noiseAnimationOC
        updateNoiseUniforms(material, entry.def.noiseName, entry.commonParams, entry.params, anim ? this.time : 0)
      } else {
        this.bindInputs(entry, material)
        updateNodeUniforms(material, entry.def, entry.params, {
          texel: [1 / this.resolution, 1 / this.resolution],
          time: this.time,
        })
        if (material.uniforms.uOutputIndex) material.uniforms.uOutputIndex.value = out
      }
      this.renderer.setRenderTarget(entry.targets[out])
      this.renderer.render(this.scene, this.camera)
    }
    this.renderer.setRenderTarget(null)
  }

  evaluate(delta = 0) {
    if (!this.ready) return false
    this.time += delta
    const nodes = this.graph.nodes
    const edges = this.graph.edges

    // 渲染全图（含未连到 Output 的节点），这样每个节点都能出预览缩略图。
    // 有环时环上节点无法排序，会被跳过，但不影响其余节点。
    this.cycleNodes = findCycleNodes(nodes, edges)
    if (this.cycleNodes.size > 0) this.error = 'graph has cycle'
    else if (!this.outputId) this.error = 'no output node'
    else this.error = null

    const { order } = topoSort(nodes, edges)
    if (order.length === 0) return false
    for (const id of order) {
      const entry = this.nodes.get(id)
      if (!entry) continue
      this.renderEntry(entry)
    }
    return true
  }

  getOutputTexture() {
    if (!this.outputId) return null
    const entry = this.nodes.get(this.outputId)
    return entry?.targets?.[0]?.texture || null
  }

  getNodeTarget(nodeId, port) {
    const entry = this.nodes.get(nodeId)
    if (!entry || !entry.targets.length) return null
    const outputs = entry.def?.outputs || ['out']
    const index = outputs.length > 1 ? Math.max(outputs.indexOf(port), 0) : 0
    return entry.targets[Math.min(index, entry.targets.length - 1)] || null
  }

  // 回读 Output 的像素（WebGL 坐标系，y 轴自下而上，导出时需翻转）。
  readOutputPixels() {
    const target = this.getNodeTarget(this.outputId, 'out')
    if (!target) return null
    const width = target.width
    const height = target.height
    const data = new Uint8Array(width * height * 4)
    this.renderer.readRenderTargetPixels(target, 0, 0, width, height, data)
    return { data, width, height }
  }

  ensureCaptureMaterial() {
    if (!this._captureMaterial) {
      this._captureMaterial = new THREE.ShaderMaterial({
        vertexShader: VertShader,
        fragmentShader: getFamilyShader('copy'),
        uniforms: {
          uInA: { value: null },
          uHasA: { value: false },
          uValA: { value: new THREE.Vector4(0, 0, 0, 1) },
        },
        depthTest: false,
        depthWrite: false,
      })
    }
    return this._captureMaterial
  }

  // 把某节点输出缩采到 size×size 后回读，供节点缩略图使用（同样为 y 轴自下而上）。
  // 按尺寸缓存 RenderTarget，避免不同节点不同尺寸时反复重建。
  captureNode(nodeId, port, size = 96) {
    const target = this.getNodeTarget(nodeId, port)
    if (!target || !this.renderer) return null
    const material = this.ensureCaptureMaterial()
    material.uniforms.uInA.value = target.texture
    material.uniforms.uHasA.value = true
    let captureTarget = this._captureTargets.get(size)
    if (!captureTarget) {
      captureTarget = new THREE.WebGLRenderTarget(size, size, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        depthBuffer: false,
        stencilBuffer: false,
      })
      this._captureTargets.set(size, captureTarget)
    }
    this.quad.material = material
    this.renderer.setRenderTarget(captureTarget)
    this.renderer.render(this.scene, this.camera)
    this.renderer.setRenderTarget(null)
    const data = new Uint8Array(size * size * 4)
    this.renderer.readRenderTargetPixels(captureTarget, 0, 0, size, size, data)
    return { data, width: size, height: size }
  }

  disposeEntry(entry) {
    for (const t of entry.targets) t.dispose()
    entry.targets = []
    entry.targetResolution = 0
    if (entry.material) {
      entry.material.dispose()
      entry.material = null
    }
  }

  disposeNodes() {
    for (const entry of this.nodes.values()) this.disposeEntry(entry)
  }

  dispose() {
    this.disposeNodes()
    for (const target of this._captureTargets.values()) target.dispose()
    this._captureTargets.clear()
    if (this._captureMaterial) { this._captureMaterial.dispose(); this._captureMaterial = null }
    this.quad.geometry.dispose()
    this.scene.remove(this.quad)
  }
}
