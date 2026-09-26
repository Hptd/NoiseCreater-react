// 各 shader 家族的操作码列表。
// 顺序同时决定：JS 侧 uOp/uMode 的整数值，以及 GLSL 侧 #define 的取值。
// 二者由同一个列表生成，新增操作只需往列表里加一项。

export const MATH_OPS = [
  'add', 'subtract', 'multiply', 'divide', 'power', 'sqrt',
  'absolute', 'exponential', 'length', 'log', 'modulo', 'negate',
  'normalize', 'posterize', 'reciprocal', 'root', 'sign',
  'ddx', 'ddy', 'ddxy',
  'lerp', 'inverseLerp', 'smoothstep',
  'clamp', 'fraction', 'maximum', 'minimum', 'oneMinus', 'randomRange', 'remap', 'saturate',
  'ceiling', 'floor', 'round',
  'arccosine', 'arcsine', 'arctangent', 'arctangent2', 'cosine', 'sine', 'tangent',
  'degreesToRadians', 'radiansToDegrees',
]

export const CHANNEL_OPS = ['combine', 'split', 'flip', 'swizzle']
export const ARTISTIC_OPS = ['contrast', 'hue', 'invertColors', 'saturation', 'luma', 'channelMask', 'colorMask']
export const NORMAL_OPS = ['fromHeight', 'strength', 'blend']
export const UV_OPS = ['uv', 'polar', 'radialShear', 'tilingOffset', 'twirl']
export const SHAPE_OPS = ['ellipse', 'rectangle', 'roundedRectangle', 'polygon']
export const SOLID_OPS = ['constant', 'integer', 'slider', 'color', 'time', 'vector2', 'vector3']
export const BLEND_MODES = ['multiply', 'screen', 'overlay', 'softLight', 'add', 'subtract', 'difference']
export const SEAMLESS_OPS = ['seamless']

export function opIndex(list, op) {
  return list.indexOf(op)
}

function macroName(prefix, name) {
  return `${prefix}_${name.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toUpperCase()}`
}

// 生成 GLSL #define 块，保证 JS 与 shader 的操作码编号一致。
export function opDefines(prefix, list) {
  return list.map((name, i) => `#define ${macroName(prefix, name)} ${i}`).join('\n')
}
