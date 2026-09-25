// 节点编辑器中英文切换（Noise 节点及参数不参与，保持原样）。
// 中文文案来自 main-files/节点编辑器中英翻译对照表.md 的最终审核版。
import { useSyncExternalStore } from 'react'

const STORAGE_KEY = 'nc-nodeeditor-lang'
const listeners = new Set()

function readStored() {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v === 'zh' || v === 'en') return v
  } catch {
    /* SSR / 无 localStorage */
  }
  return 'zh'
}

let lang = readStored()

export function getLang() {
  return lang
}

export function setLang(next) {
  if (next !== 'zh' && next !== 'en') return
  lang = next
  try { localStorage.setItem(STORAGE_KEY, next) } catch { /* ignore */ }
  for (const listener of listeners) listener()
}

export function toggleLang() {
  setLang(lang === 'zh' ? 'en' : 'zh')
}

function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useLang() {
  return useSyncExternalStore(subscribe, getLang)
}

// 分类（层级）名称
export const CATEGORY_ZH = {
  Input: '输入',
  Math: '数学',
  Channel: '通道',
  Artistic: '艺术',
  Normal: '法线',
  UV: 'UV',
  Shape: '形状',
  Utility: '实用',
  Output: '输出',
  Noise: '噪声',
}

// 节点名称（type:op -> 中文）
export const NODE_LABEL_ZH = {
  'constant:constant': '常量',
  'constant:integer': '整数',
  'constant:slider': '滑块',
  'constant:color': '颜色',
  'constant:time': '时间',
  'constant:vector2': '二维向量',
  'constant:vector3': '三维向量',
  'gradient:gradient': '渐变',
  'gradient:sampleGradient': '采样渐变',
  'math:add': '加法',
  'math:subtract': '减法',
  'math:multiply': '乘法',
  'math:divide': '除法',
  'math:power': '幂',
  'math:sqrt': '平方根',
  'math:absolute': '绝对值',
  'math:exponential': '指数',
  'math:length': '长度',
  'math:log': '对数',
  'math:modulo': '取模',
  'math:negate': '取负',
  'math:normalize': '归一化',
  'math:posterize': '色调分离',
  'math:reciprocal': '倒数',
  'math:root': 'n 次方根',
  'math:sign': '符号',
  'math:ddx': 'x 方向偏导',
  'math:ddy': 'y 方向偏导',
  'math:ddxy': '双向偏导和',
  'math:lerp': '线性插值',
  'math:inverseLerp': '反线性插值',
  'math:smoothstep': '平滑阶梯',
  'math:clamp': '范围钳制',
  'math:fraction': '取小数部分',
  'math:maximum': '最大值',
  'math:minimum': '最小值',
  'math:oneMinus': '1 减',
  'math:randomRange': '随机范围',
  'math:remap': '值域重映射',
  'math:saturate': '限制0-1',
  'math:ceiling': '向上取整',
  'math:floor': '向下取整',
  'math:round': '四舍五入',
  'math:arccosine': '反余弦',
  'math:arcsine': '反正弦',
  'math:arctangent': '反正切',
  'math:arctangent2': '双参反正切',
  'math:cosine': '余弦',
  'math:sine': '正弦',
  'math:tangent': '正切',
  'math:degreesToRadians': '角度转弧度',
  'math:radiansToDegrees': '弧度转角度',
  'channel:combine': '通道合并',
  'channel:split': '通道拆分',
  'channel:flip': '通道翻转',
  'channel:swizzle': '通道重排',
  'artistic:contrast': '对比度',
  'artistic:hue': '色相',
  'artistic:invertColors': '反色',
  'artistic:saturation': '饱和度',
  'artistic:luma': '彩色转黑白',
  'artistic:blend': '混合',
  'artistic:channelMask': '通道遮罩',
  'artistic:colorMask': '颜色遮罩',
  'normal:fromHeight': '黑白转法线',
  'normal:strength': '法线强度',
  'normal:blend': '法线混合',
  'uv:uv': 'UV',
  'uv:polar': '极坐标',
  'uv:radialShear': '径向切变',
  'uv:tilingOffset': '平铺与偏移',
  'uv:twirl': '旋涡扭曲',
  'shape:ellipse': '椭圆',
  'shape:rectangle': '矩形',
  'shape:roundedRectangle': '圆角矩形',
  'shape:polygon': '多边形',
  'utility:preview': '预览',
  'output:output': '输出',
}

// 参数名称（上下文无关的通用译名）
const PARAM_ZH = {
  value: '值', min: '最小值', max: '最大值',
  xy: '二维坐标', xyz: '三维坐标', stops: '色标',
  in: '输入', a: 'A', b: 'B', t: '插值系数',
  base: '底数', steps: '色阶数', power: '开方次数',
  edge1: '起始边缘', edge2: '结束边缘', seed: '随机种子',
  inMin: '输入下限', inMax: '输入上限', outMin: '输出下限', outMax: '输出上限',
  r: '红通道', g: '绿通道',
  flipR: '翻转红通道', flipG: '翻转绿通道', flipB: '翻转蓝通道', flipA: '翻转透明通道',
  contrast: '对比度', offset: '色相偏移', saturation: '饱和度',
  mode: '混合模式', opacity: '不透明度',
  maskColor: '遮罩颜色', range: '匹配范围', fuzziness: '容差模糊',
  channel: '取值通道', levelInBlack: '输入黑场', levelInWhite: '输入白场', invert: '高度反转',
  kernel: '求导算子', sampleStep: '采样步长', preSmooth: '预平滑次数', flatThreshold: '平坦阈值',
  strength: '强度', convention: '法线朝向', flipX: '翻转 X 通道', reNormalize: '重新归一化',
  edgeMode: '边缘模式', edgeFade: '边缘淡化',
  strengthX: 'X 方向强度', strengthY: 'Y 方向强度', weightA: '底层权重', weightB: '细节层权重',
  center: '中心点', radialScale: '径向缩放', lengthScale: '长度缩放', tiling: '平铺次数',
  radius: '圆角半径', width: '宽度', height: '高度', sides: '边数', angle: '旋转角度',
  size: '预览尺寸', resolution: '分辨率', alphaChannel: '透明通道',
}

// 同名参数在不同节点下的差异化译名
const PARAM_ZH_BY_OP = {
  'artistic:blend': { base: '底层常量', blend: '混合层常量' },
  'normal:blend': { mode: '混合算法', a: 'A 常量', b: 'B 常量' },
  'normal:fromHeight': { contrast: '锐利度' },
  'uv:tilingOffset': { offset: '偏移' },
  'uv:twirl': { radius: '作用半径' },
  'channel:swizzle': { x: '输出红通道', y: '输出绿通道', z: '输出蓝通道', w: '输出透明通道' },
  'channel:combine': { a: '透明通道', b: '蓝通道' },
  'artistic:channelMask': { a: '透明通道', b: '蓝通道' },
}

// 枚举选项值 -> 中文
const ENUM_ZH = {
  r: '红', g: '绿', b: '蓝', a: '透明', luma: '灰度',
  multiply: '正片叠底', screen: '滤色', overlay: '叠加', softLight: '柔光',
  add: '相加', subtract: '相减', difference: '差值',
  central: '中心差分', sobel: 'Sobel', scharr: 'Scharr', prewitt: 'Prewitt',
  opengl: 'OpenGL', directx: 'DirectX',
  wrap: '平铺', clamp: '钳制', mirror: '镜像',
  whiteout: 'Whiteout', udn: 'UDN', partialDerivative: '偏导数',
}

export function tNode(def) {
  if (!def) return ''
  if (def.type === 'noise') return def.label
  if (lang !== 'zh') return def.label
  return NODE_LABEL_ZH[`${def.type}:${def.op}`] || def.label
}

export function tParam(def, spec) {
  if (!spec) return ''
  if (!def || def.type === 'noise' || lang !== 'zh') return spec.name
  return PARAM_ZH_BY_OP[`${def.type}:${def.op}`]?.[spec.name] || PARAM_ZH[spec.name] || spec.name
}

export function tEnum(value) {
  if (lang !== 'zh') return value
  return ENUM_ZH[value] || value
}

export function tCategory(category) {
  if (lang !== 'zh') return category
  return CATEGORY_ZH[category] || category
}

// 搜索用：返回节点的中英文可匹配文本
export function nodeSearchText(def) {
  return `${def.label} ${NODE_LABEL_ZH[`${def.type}:${def.op}`] || ''} ${def.op || ''}`.toLowerCase()
}
