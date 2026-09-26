// shader 家族汇总：家族名 -> GLSL 源码 / 操作码列表。
import mathShader from './mathShader.js'
import artisticShader from './artisticShader.js'
import channelShader from './channelShader.js'
import blendShader from './blendShader.js'
import seamlessShader from './seamlessShader.js'
import normalShader from './normalShader.js'
import uvShader from './uvShader.js'
import shapeShader from './shapeShader.js'
import solidShader from './solidShader.js'
import gradientShader from './gradientShader.js'
import { outputShader, copyShader } from './outputShader.js'
import { MATH_OPS, CHANNEL_OPS, ARTISTIC_OPS, NORMAL_OPS, UV_OPS, SHAPE_OPS, SOLID_OPS, BLEND_MODES, SEAMLESS_OPS } from './ops.js'

export const FAMILY_SHADERS = {
  math: mathShader,
  artistic: artisticShader,
  channel: channelShader,
  blend: blendShader,
  seamless: seamlessShader,
  normal: normalShader,
  uv: uvShader,
  shape: shapeShader,
  solid: solidShader,
  gradient: gradientShader,
  output: outputShader,
  copy: copyShader,
}

export const FAMILY_OPS = {
  math: MATH_OPS,
  channel: CHANNEL_OPS,
  artistic: ARTISTIC_OPS,
  normal: NORMAL_OPS,
  uv: UV_OPS,
  shape: SHAPE_OPS,
  solid: SOLID_OPS,
  gradient: ['gradient', 'sampleGradient'],
  blend: BLEND_MODES,
  seamless: SEAMLESS_OPS,
  output: null,
}

export function getFamilyShader(family) {
  return FAMILY_SHADERS[family] || null
}
