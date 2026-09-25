// 非噪波节点注册表（表驱动）。
// 每种节点由若干“图像输入端口 + 内联常量 + 参数”描述；运行时按 `shader` 家族选择 shader，
// 按参数 spec 通用绑定 uniform，无需为单个节点写代码。
//
// 命名约定：
// - type/op 与 .ncgraph 文件字段一一对应
// - inputs[].inline 为 true 时，存在同名参数作为“未连线时的常量”
// - 端口统一 RGBA（vec4），标量常量广播到 4 通道

const float = (name, def, min, max, step = 0.001) => ({ name, kind: 'float', default: def, min, max, step })
const int = (name, def, min, max) => ({ name, kind: 'int', default: def, min, max, step: 1 })
const bool = (name, def) => ({ name, kind: 'bool', default: def })
const color = (name, def) => ({ name, kind: 'color', default: def })
const enumP = (name, def, options) => ({ name, kind: 'enum', default: def, options })
const vec2 = (name, def) => ({ name, kind: 'vec2', default: def })
const vec3 = (name, def) => ({ name, kind: 'vec3', default: def })

function unaryMath(op, label, extra = []) {
  return {
    type: 'math', op, label, category: 'Math', shader: 'math',
    inputs: [{ name: 'in', inline: true }],
    outputs: ['out'],
    params: [float('in', 0, -10, 10), ...extra],
  }
}

function binaryMath(op, label, defaults = { a: 0, b: 0 }, extra = []) {
  return {
    type: 'math', op, label, category: 'Math', shader: 'math',
    inputs: [{ name: 'a', inline: true }, { name: 'b', inline: true }],
    outputs: ['out'],
    params: [float('a', defaults.a, -10, 10), float('b', defaults.b, -10, 10), ...extra],
  }
}

function ternaryMath(op, label, names, defaults, extra = []) {
  return {
    type: 'math', op, label, category: 'Math', shader: 'math',
    inputs: names.map(n => ({ name: n, inline: true })),
    outputs: ['out'],
    params: [
      ...names.map((n, i) => float(n, defaults[i], -10, 10)),
      ...extra,
    ],
  }
}

const IMAGE = (name, inline) => (inline ? { name, inline: true } : { name })

export const NODE_CATEGORIES = ['Input', 'Math', 'Channel', 'Artistic', 'Normal', 'UV', 'Shape', 'Utility', 'Output']

export const NODE_DEFS = [
  // ---------------------------------------------------------------- Input
  {
    type: 'constant', op: 'constant', label: 'Constant', category: 'Input', shader: 'solid',
    inputs: [], outputs: ['out'],
    params: [{ ...float('value', 0.5, -10, 10), control: 'number' }],
  },
  {
    type: 'constant', op: 'integer', label: 'Integer', category: 'Input', shader: 'solid',
    inputs: [], outputs: ['out'],
    params: [{ ...int('value', 0, -1024, 1024), control: 'number' }],
  },
  {
    type: 'constant', op: 'slider', label: 'Slider', category: 'Input', shader: 'solid',
    inputs: [], outputs: ['out'],
    params: [
      { ...float('value', 0.5, 0, 1), bounds: ['min', 'max'] },
      float('min', 0, -10, 10),
      float('max', 1, -10, 10),
    ],
  },
  {
    type: 'constant', op: 'color', label: 'Color', category: 'Input', shader: 'solid',
    inputs: [], outputs: ['out'],
    params: [color('value', '#ffffff')],
  },
  {
    type: 'constant', op: 'time', label: 'Time', category: 'Input', shader: 'solid',
    inputs: [], outputs: ['out'],
    params: [],
  },
  {
    type: 'constant', op: 'vector2', label: 'Vector 2', category: 'Input', shader: 'solid',
    inputs: [], outputs: ['out'],
    params: [vec2('xy', [0, 0])],
  },
  {
    type: 'constant', op: 'vector3', label: 'Vector 3', category: 'Input', shader: 'solid',
    inputs: [], outputs: ['out'],
    params: [vec3('xyz', [0, 0, 0])],
  },
  {
    type: 'gradient', op: 'gradient', label: 'Gradient', category: 'Input', shader: 'gradient',
    inputs: [], outputs: ['out'],
    params: [{
      name: 'stops', kind: 'gradient',
      default: [{ pos: 0, color: '#000000' }, { pos: 1, color: '#ffffff' }],
    }],
  },
  {
    type: 'gradient', op: 'sampleGradient', label: 'Sample Gradient', category: 'Input', shader: 'gradient',
    inputs: [IMAGE('in', true)], outputs: ['out'],
    params: [float('in', 0, 0, 1), {
      name: 'stops', kind: 'gradient',
      default: [{ pos: 0, color: '#000000' }, { pos: 1, color: '#ffffff' }],
    }],
  },

  // ---------------------------------------------------------------- Math / Basic
  binaryMath('add', 'Add', { a: 0, b: 0 }),
  binaryMath('subtract', 'Subtract', { a: 0, b: 0 }),
  binaryMath('multiply', 'Multiply', { a: 1, b: 1 }),
  binaryMath('divide', 'Divide', { a: 1, b: 1 }),
  binaryMath('power', 'Power', { a: 1, b: 2 }),
  unaryMath('sqrt', 'Square Root', [float('in', 1, 0, 100)]),

  // ---------------------------------------------------------------- Math / Advanced
  unaryMath('absolute', 'Absolute'),
  unaryMath('exponential', 'Exponential'),
  unaryMath('length', 'Length'),
  unaryMath('log', 'Log', [float('base', 2, 0.001, 100)]),
  binaryMath('modulo', 'Modulo', { a: 1, b: 1 }),
  unaryMath('negate', 'Negate'),
  unaryMath('normalize', 'Normalize'),
  unaryMath('posterize', 'Posterize', [float('steps', 4, 2, 256, 1)]),
  unaryMath('reciprocal', 'Reciprocal', [float('in', 1, -10, 10)]),
  unaryMath('root', 'Root', [float('in', 1, -10, 10), float('power', 2, 0.001, 100)]),
  unaryMath('sign', 'Sign'),

  // ---------------------------------------------------------------- Math / Derivative
  unaryMath('ddx', 'DDX'),
  unaryMath('ddy', 'DDY'),
  unaryMath('ddxy', 'DDXY'),

  // ---------------------------------------------------------------- Math / Interpolation
  ternaryMath('lerp', 'Lerp', ['a', 'b', 't'], [0, 1, 0.5]),
  ternaryMath('inverseLerp', 'Inverse Lerp', ['a', 'b', 't'], [0, 1, 0.5]),
  ternaryMath('smoothstep', 'Smoothstep', ['in', 'edge1', 'edge2'], [0, 0, 1]),

  // ---------------------------------------------------------------- Math / Range
  ternaryMath('clamp', 'Clamp', ['in', 'min', 'max'], [0, 0, 1]),
  unaryMath('fraction', 'Fraction'),
  binaryMath('maximum', 'Maximum', { a: 0, b: 0 }),
  binaryMath('minimum', 'Minimum', { a: 0, b: 0 }),
  unaryMath('oneMinus', 'One Minus'),
  ternaryMath('randomRange', 'Random Range', ['seed', 'min', 'max'], [0, 0, 1]),
  {
    type: 'math', op: 'remap', label: 'Remap', category: 'Math', shader: 'math',
    inputs: [
      { name: 'in', inline: true }, { name: 'inMin', inline: true },
      { name: 'inMax', inline: true }, { name: 'outMin', inline: true }, { name: 'outMax', inline: true },
    ],
    outputs: ['out'],
    params: [
      float('in', 0, -10, 10), float('inMin', 0, -10, 10), float('inMax', 1, -10, 10),
      float('outMin', 0, -10, 10), float('outMax', 1, -10, 10),
    ],
  },
  unaryMath('saturate', 'Saturate'),

  // ---------------------------------------------------------------- Math / Round
  unaryMath('ceiling', 'Ceiling'),
  unaryMath('floor', 'Floor'),
  unaryMath('round', 'Round'),

  // ---------------------------------------------------------------- Math / Trigonometry
  unaryMath('arccosine', 'Arccosine'),
  unaryMath('arcsine', 'Arcsine'),
  unaryMath('arctangent', 'Arctangent'),
  binaryMath('arctangent2', 'Arctangent2', { a: 0, b: 1 }),
  unaryMath('cosine', 'Cosine'),
  unaryMath('sine', 'Sine'),
  unaryMath('tangent', 'Tangent'),
  unaryMath('degreesToRadians', 'Degrees To Radians'),
  unaryMath('radiansToDegrees', 'Radians To Degrees'),

  // ---------------------------------------------------------------- Channel
  {
    type: 'channel', op: 'combine', label: 'Combine', category: 'Channel', shader: 'channel',
    inputs: [IMAGE('r'), IMAGE('g'), IMAGE('b'), IMAGE('a')],
    outputs: ['out'],
    params: [float('r', 0, 0, 1), float('g', 0, 0, 1), float('b', 0, 0, 1), float('a', 1, 0, 1)],
  },
  {
    type: 'channel', op: 'split', label: 'Split', category: 'Channel', shader: 'channel',
    inputs: [IMAGE('in')], outputs: ['r', 'g', 'b', 'a'],
    params: [],
  },
  {
    type: 'channel', op: 'flip', label: 'Flip', category: 'Channel', shader: 'channel',
    inputs: [IMAGE('in')], outputs: ['out'],
    params: [bool('flipR', false), bool('flipG', false), bool('flipB', false), bool('flipA', false)],
  },
  {
    type: 'channel', op: 'swizzle', label: 'Swizzle', category: 'Channel', shader: 'channel',
    inputs: [IMAGE('in')], outputs: ['out'],
    params: [
      enumP('x', 'r', ['r', 'g', 'b', 'a']), enumP('y', 'g', ['r', 'g', 'b', 'a']),
      enumP('z', 'b', ['r', 'g', 'b', 'a']), enumP('w', 'a', ['r', 'g', 'b', 'a']),
    ],
  },

  // ---------------------------------------------------------------- Artistic / Adjustment
  {
    type: 'artistic', op: 'contrast', label: 'Contrast', category: 'Artistic', shader: 'artistic',
    inputs: [IMAGE('in')], outputs: ['out'],
    params: [float('contrast', 1, 0, 10)],
  },
  {
    type: 'artistic', op: 'hue', label: 'Hue', category: 'Artistic', shader: 'artistic',
    inputs: [IMAGE('in')], outputs: ['out'],
    params: [float('offset', 0, -180, 180)],
  },
  {
    type: 'artistic', op: 'invertColors', label: 'Invert Colors', category: 'Artistic', shader: 'artistic',
    inputs: [IMAGE('in')], outputs: ['out'],
    params: [],
  },
  {
    type: 'artistic', op: 'saturation', label: 'Saturation', category: 'Artistic', shader: 'artistic',
    inputs: [IMAGE('in')], outputs: ['out'],
    params: [float('saturation', 1, 0, 2)],
  },
  {
    type: 'artistic', op: 'luma', label: 'Luma', category: 'Artistic', shader: 'artistic',
    inputs: [IMAGE('in')], outputs: ['out'],
    params: [],
  },

  // ---------------------------------------------------------------- Artistic / Blend
  {
    type: 'artistic', op: 'blend', label: 'Blend', category: 'Artistic', shader: 'blend',
    inputs: [IMAGE('base'), IMAGE('blend'), IMAGE('mask')], outputs: ['out'],
    params: [
      enumP('mode', 'multiply', ['multiply', 'screen', 'overlay', 'softLight', 'add', 'subtract', 'difference']),
      float('opacity', 1, 0, 1),
      float('base', 0, 0, 1), float('blend', 0, 0, 1),
    ],
  },

  // ---------------------------------------------------------------- Artistic / Mask
  {
    type: 'artistic', op: 'channelMask', label: 'Channel Mask', category: 'Artistic', shader: 'artistic',
    inputs: [IMAGE('in')], outputs: ['out'],
    params: [bool('r', true), bool('g', true), bool('b', true), bool('a', true)],
  },
  {
    type: 'artistic', op: 'colorMask', label: 'Color Mask', category: 'Artistic', shader: 'artistic',
    inputs: [IMAGE('in')], outputs: ['out'],
    params: [color('maskColor', '#ffffff'), float('range', 0.1, 0, 1), float('fuzziness', 0.1, 0, 1)],
  },

  // ---------------------------------------------------------------- Normal
  {
    type: 'normal', op: 'fromHeight', label: 'Normal From Height', category: 'Normal', shader: 'normal',
    inputs: [IMAGE('in')], outputs: ['out'],
    params: [
      enumP('channel', 'luma', ['r', 'g', 'b', 'a', 'luma']),
      float('levelInBlack', 0, 0, 1), float('levelInWhite', 1, 0, 1), bool('invert', false),
      enumP('kernel', 'sobel', ['central', 'sobel', 'scharr', 'prewitt']),
      float('sampleStep', 1, 1, 8, 1), float('preSmooth', 0, 0, 4, 1), float('flatThreshold', 0, 0, 1),
      float('strength', 1, 0, 10), float('contrast', 1, 0.1, 4),
      enumP('convention', 'opengl', ['opengl', 'directx']), bool('flipX', false), bool('reNormalize', true),
      enumP('edgeMode', 'wrap', ['wrap', 'clamp', 'mirror']), float('edgeFade', 0, 0, 0.5),
    ],
  },
  {
    type: 'normal', op: 'strength', label: 'Normal Strength', category: 'Normal', shader: 'normal',
    inputs: [IMAGE('in')], outputs: ['out'],
    params: [float('strengthX', 1, 0, 10), float('strengthY', 1, 0, 10), bool('reNormalize', true)],
  },
  {
    type: 'normal', op: 'blend', label: 'Normal Blend', category: 'Normal', shader: 'normal',
    inputs: [IMAGE('a'), IMAGE('b')], outputs: ['out'],
    params: [
      enumP('mode', 'whiteout', ['whiteout', 'udn', 'partialDerivative']),
      float('weightA', 1, 0, 1), float('weightB', 1, 0, 1), float('opacity', 1, 0, 1),
      float('a', 0, 0, 1), float('b', 0, 0, 1),
    ],
  },

  // ---------------------------------------------------------------- UV
  {
    type: 'uv', op: 'uv', label: 'UV', category: 'UV', shader: 'uv',
    inputs: [], outputs: ['out'], params: [],
  },
  {
    type: 'uv', op: 'polar', label: 'Polar Coordinates', category: 'UV', shader: 'uv',
    inputs: [IMAGE('in')], outputs: ['out'],
    params: [vec2('center', [0.5, 0.5]), float('radialScale', 1, -10, 10), float('lengthScale', 1, -10, 10)],
  },
  {
    type: 'uv', op: 'radialShear', label: 'Radial Shear', category: 'UV', shader: 'uv',
    inputs: [IMAGE('in')], outputs: ['out'],
    params: [vec2('center', [0.5, 0.5]), float('strength', 1, -10, 10)],
  },
  {
    type: 'uv', op: 'tilingOffset', label: 'Tiling And Offset', category: 'UV', shader: 'uv',
    inputs: [IMAGE('in')], outputs: ['out'],
    params: [vec2('tiling', [1, 1]), vec2('offset', [0, 0])],
  },
  {
    type: 'uv', op: 'twirl', label: 'Twirl', category: 'UV', shader: 'uv',
    inputs: [IMAGE('in')], outputs: ['out'],
    params: [vec2('center', [0.5, 0.5]), float('strength', 10, -100, 100), float('radius', 0.5, 0, 1)],
  },

  // ---------------------------------------------------------------- Shape
  {
    type: 'shape', op: 'ellipse', label: 'Ellipse', category: 'Shape', shader: 'shape',
    inputs: [], outputs: ['out'],
    params: [float('width', 0.5, 0, 1), float('height', 0.5, 0, 1)],
  },
  {
    type: 'shape', op: 'rectangle', label: 'Rectangle', category: 'Shape', shader: 'shape',
    inputs: [], outputs: ['out'],
    params: [float('width', 0.5, 0, 1), float('height', 0.5, 0, 1)],
  },
  {
    type: 'shape', op: 'roundedRectangle', label: 'Rounded Rectangle', category: 'Shape', shader: 'shape',
    inputs: [], outputs: ['out'],
    params: [float('width', 0.5, 0, 1), float('height', 0.5, 0, 1), float('radius', 0.1, 0, 0.5)],
  },
  {
    type: 'shape', op: 'polygon', label: 'Polygon', category: 'Shape', shader: 'shape',
    inputs: [], outputs: ['out'],
    params: [int('sides', 6, 3, 64), float('width', 0.5, 0, 1), float('height', 0.5, 0, 1), float('angle', 0, -180, 180)],
  },

  // ---------------------------------------------------------------- Utility
  {
    type: 'utility', op: 'preview', label: 'Preview', category: 'Utility', shader: 'output',
    inputs: [IMAGE('in')], outputs: [],
    params: [enumP('size', '128', ['128', '256', '512'])],
  },

  // ---------------------------------------------------------------- Output
  {
    type: 'output', op: 'output', label: 'Output', category: 'Output', shader: 'output',
    inputs: [IMAGE('in')], outputs: [],
    params: [int('resolution', 1024, 64, 2048), bool('alphaChannel', false)],
  },
]

export function nodeDefKey(type, op) {
  return `${type}:${op || ''}`
}

const DEF_BY_KEY = new Map()
for (const def of NODE_DEFS) DEF_BY_KEY.set(nodeDefKey(def.type, def.op), def)

// 噪波节点由 noiseCatalog 注入（避免循环依赖，同时便于 Node 测试）。
let noiseDefsByKey = new Map()

export function registerNoiseDefs(defs) {
  noiseDefsByKey = new Map(defs.map(def => [nodeDefKey(def.type, def.op), def]))
}

export function getNodeDef(type, op) {
  return DEF_BY_KEY.get(nodeDefKey(type, op)) || noiseDefsByKey.get(nodeDefKey(type, op)) || null
}

// op 缺失时的类型默认值（旧 .ncgraph 或未显式写 op 的节点）。
const DEFAULT_OP_BY_TYPE = { output: 'output', constant: 'constant' }

// 解析节点定义：噪波用 noiseName，其余用 type+op。调用前需已加载 noiseCatalog 注册噪波。
export function resolveNodeDef(node) {
  if (!node) return null
  if (node.type === 'noise') return getNodeDef('noise', node.noiseName)
  const op = node.op != null ? node.op : DEFAULT_OP_BY_TYPE[node.type]
  return getNodeDef(node.type, op)
}

export function getDefaultParams(def) {
  const params = {}
  for (const spec of def.params || []) {
    params[spec.name] = Array.isArray(spec.default) ? [...spec.default] : spec.default
  }
  return params
}
