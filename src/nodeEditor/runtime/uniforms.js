// 参数 -> uniform 的通用绑定规则。
// 非噪波节点：参数名 `foo` -> uniform `uFoo`；图像输入 -> `uInA/uHasA/uValA`。
// 噪波节点：复用现有 PropsUniforms / FrameUniforms，逐帧重建生效参数。
import * as THREE from 'three'
import { PropsUniforms } from '../../canvasUniformFrame/PropsUniforms.js'
import { FrameUniforms } from '../../canvasUniformFrame/FrameUniform.js'
import { FAMILY_OPS } from '../shaders/index.js'
import { opIndex } from '../shaders/ops.js'

export const INPUT_LETTERS = ['A', 'B', 'C', 'D', 'E']
export const BLACK = [0, 0, 0, 1]

// 噪波公共参数 -> uniform 的单一映射（nodeEditor 侧唯一副本；iTime 由调用方单独处理）。
const NOISE_COMMON_UNIFORM_MAP = {
  uvScale: 'noiseUvSize',
  uvMoveX: 'noiseOffsetU',
  uvMoveY: 'noiseOffsetV',
  uvScaleX: 'noiseScaleU',
  uvScaleY: 'noiseScaleV',
  brightness: 'noiseBright',
  colorRev: 'noiseInvert',
  useAlpha: 'noiseAlphaChannel',
}

function buildNoiseCommonUniforms(commonParams) {
  const uniforms = { iTime: { value: 0 } }
  for (const [uniformKey, propKey] of Object.entries(NOISE_COMMON_UNIFORM_MAP)) {
    uniforms[uniformKey] = { value: commonParams[propKey] }
  }
  return uniforms
}

function applyNoiseCommonUniforms(uniforms, commonParams) {
  for (const [uniformKey, propKey] of Object.entries(NOISE_COMMON_UNIFORM_MAP)) {
    uniforms[uniformKey].value = commonParams[propKey]
  }
}

export function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return new THREE.Vector3(1, 1, 1)
  return new THREE.Vector3(
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255,
  )
}

export function uniformNameForParam(spec) {
  if (spec.kind === 'gradient') return 'uGradient'
  return `u${spec.name.charAt(0).toUpperCase()}${spec.name.slice(1)}`
}

function makeGradientTexture(stops) {
  const width = 256
  const data = new Uint8Array(width * 4)
  const list = (Array.isArray(stops) && stops.length ? stops : [{ pos: 0, color: '#000000' }, { pos: 1, color: '#ffffff' }])
    .map(s => ({ pos: Math.min(Math.max(Number(s.pos) || 0, 0), 1), c: hexToRgb(s.color) }))
    .sort((a, b) => a.pos - b.pos)
  for (let i = 0; i < width; i++) {
    const t = i / (width - 1)
    let a = list[0]
    let b = list[list.length - 1]
    for (let k = 0; k < list.length - 1; k++) {
      if (t >= list[k].pos && t <= list[k + 1].pos) { a = list[k]; b = list[k + 1]; break }
    }
    const span = Math.max(b.pos - a.pos, 1e-6)
    const f = Math.min(Math.max((t - a.pos) / span, 0), 1)
    data[i * 4 + 0] = Math.round((a.c.x + (b.c.x - a.c.x) * f) * 255)
    data[i * 4 + 1] = Math.round((a.c.y + (b.c.y - a.c.y) * f) * 255)
    data[i * 4 + 2] = Math.round((a.c.z + (b.c.z - a.c.z) * f) * 255)
    data[i * 4 + 3] = 255
  }
  const tex = new THREE.DataTexture(data, width, 1, THREE.RGBAFormat)
  tex.needsUpdate = true
  tex.minFilter = THREE.LinearFilter
  tex.magFilter = THREE.LinearFilter
  tex.wrapS = THREE.ClampToEdgeWrapping
  tex.wrapT = THREE.ClampToEdgeWrapping
  return tex
}

function colorToVec3(value) {
  return hexToRgb(value)
}

function defaultValueForSpec(spec) {
  switch (spec.kind) {
    case 'float':
    case 'int':
      return Number(spec.default) || 0
    case 'bool':
      return Boolean(spec.default)
    case 'enum':
      return Math.max(spec.options.indexOf(spec.default), 0)
    case 'color':
      return colorToVec3(spec.default)
    case 'vec2':
      return new THREE.Vector2(spec.default[0], spec.default[1])
    case 'vec3':
      return new THREE.Vector3(spec.default[0], spec.default[1], spec.default[2])
    default:
      return null
  }
}

// 把图像输入的内联常量（若有）广播为 vec4。找不到匹配参数时用黑色。
function inlineVec4(def, inputName, params) {
  const spec = (def.params || []).find(p => p.name === inputName)
  if (!spec) return new THREE.Vector4(...BLACK)
  const raw = params[inputName]
  if (spec.kind === 'color') {
    const c = colorToVec3(raw)
    return new THREE.Vector4(c.x, c.y, c.z, 1)
  }
  if (spec.kind === 'vec2') {
    const v = raw || spec.default
    return new THREE.Vector4(v[0], v[1], 0, 1)
  }
  if (spec.kind === 'vec3') {
    const v = raw || spec.default
    return new THREE.Vector4(v[0], v[1], v[2], 1)
  }
  const n = Number(raw)
  const v = Number.isFinite(n) ? n : 0
  return new THREE.Vector4(v, v, v, 1)
}

function solidValue(def, params, time) {
  const p = params || {}
  switch (def.op) {
    case 'color': {
      const c = colorToVec3(p.value)
      return new THREE.Vector4(c.x, c.y, c.z, 1)
    }
    case 'time':
      return new THREE.Vector4(time, time, time, 1)
    case 'vector2':
      return new THREE.Vector4(p.xy ? p.xy[0] : 0, p.xy ? p.xy[1] : 0, 0, 1)
    case 'vector3':
      return new THREE.Vector4(p.xyz ? p.xyz[0] : 0, p.xyz ? p.xyz[1] : 0, p.xyz ? p.xyz[2] : 0, 1)
    default: {
      const v = Number(p.value)
      const n = Number.isFinite(v) ? v : 0
      return new THREE.Vector4(n, n, n, 1)
    }
  }
}

// 非噪波节点：按 def 生成 uniform 容器。
export function createNodeUniforms(def) {
  const uniforms = {
    uTexel: { value: new THREE.Vector2(1 / 1024, 1 / 1024) },
    uTime: { value: 0 },
    uOp: { value: -1 },
    uOutputIndex: { value: 0 },
  }
  for (const letter of INPUT_LETTERS) {
    uniforms[`uIn${letter}`] = { value: null }
    uniforms[`uHas${letter}`] = { value: false }
    uniforms[`uVal${letter}`] = { value: new THREE.Vector4(...BLACK) }
  }
  for (const spec of def.params || []) {
    if (def.shader === 'solid') continue
    if (spec.ui) continue
    uniforms[uniformNameForParam(spec)] = { value: defaultValueForSpec(spec) }
  }
  if (def.shader === 'solid') uniforms.uValue = { value: new THREE.Vector4(...BLACK) }
  if (def.shader === 'gradient') uniforms.uGradient = { value: makeGradientTexture(null) }
  return uniforms
}

function syncGradientUniform(material, spec, params) {
  const key = JSON.stringify(params[spec.name] ?? spec.default)
  if (material.userData.gradientKey === key) return
  const old = material.uniforms.uGradient.value
  material.uniforms.uGradient.value = makeGradientTexture(params[spec.name] ?? spec.default)
  if (old && old.dispose) old.dispose()
  material.userData.gradientKey = key
}

// 非噪波节点：写入参数与内联常量（图像纹理由 runtime 绑定）。
export function updateNodeUniforms(material, def, params, ctx) {
  const u = material.uniforms
  u.uTexel.value.set(ctx.texel[0], ctx.texel[1])
  u.uTime.value = ctx.time
  const list = FAMILY_OPS[def.shader]
  u.uOp.value = list ? opIndex(list, def.op) : -1

  for (const spec of def.params || []) {
    if (def.shader === 'solid') break
    if (spec.ui) continue
    if (spec.kind === 'gradient') {
      syncGradientUniform(material, spec, params)
      continue
    }
    const uniform = u[uniformNameForParam(spec)]
    if (!uniform) continue
    const raw = params[spec.name]
    switch (spec.kind) {
      case 'float':
      case 'int':
        uniform.value = Number(raw)
        break
      case 'bool':
        uniform.value = Boolean(raw)
        break
      case 'enum':
        uniform.value = Math.max(spec.options.indexOf(raw), 0)
        break
      case 'color': {
        const c = colorToVec3(raw)
        uniform.value.set(c.x, c.y, c.z)
        break
      }
      case 'vec2':
        if (raw) uniform.value.set(raw[0], raw[1])
        break
      case 'vec3':
        if (raw) uniform.value.set(raw[0], raw[1], raw[2])
        break
      default:
        break
    }
  }

  if (def.shader === 'solid') u.uValue.value.copy(solidValue(def, params, ctx.time))

  for (let i = 0; i < INPUT_LETTERS.length; i++) {
    const letter = INPUT_LETTERS[i]
    const input = def.inputs[i]
    if (!input) continue
    u[`uVal${letter}`].value.copy(inlineVec4(def, input.name, params))
  }
}

// 噪波节点：公共参数 + PropsUniforms 共同构成初始 uniforms。
export function createNoiseUniforms(noiseName, commonParams, params) {
  return {
    ...buildNoiseCommonUniforms(commonParams),
    ...PropsUniforms(noiseName, params, hexToRgb),
  }
}

// 噪波节点：逐帧写入公共参数 + 专属参数 + 该节点自己的 iTime。
export function updateNoiseUniforms(material, noiseName, commonParams, params, iTime) {
  const u = material.uniforms
  applyNoiseCommonUniforms(u, commonParams)
  u.iTime.value = iTime
  FrameUniforms({ current: material }, params, noiseName, hexToRgb)
}
