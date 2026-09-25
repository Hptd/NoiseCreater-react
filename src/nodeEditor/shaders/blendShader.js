// 混合节点家族：七种混合模式 + Mask + 不透明度。
import { BLEND_MODES, opDefines } from './ops.js'

export default `
varying vec2 vUv;
uniform int uMode;
uniform float uOpacity;

uniform sampler2D uInA; uniform bool uHasA; uniform vec4 uValA;
uniform sampler2D uInB; uniform bool uHasB; uniform vec4 uValB;
uniform sampler2D uInC; uniform bool uHasC; uniform vec4 uValC;

${opDefines('BLEND', BLEND_MODES)}

vec4 readA() { return uHasA ? texture2D(uInA, vUv) : uValA; }
vec4 readB() { return uHasB ? texture2D(uInB, vUv) : uValB; }
vec4 readC() { return uHasC ? texture2D(uInC, vUv) : uValC; }

vec4 inMode(int mode, vec4 base, vec4 blend) {
  if (mode == BLEND_MULTIPLY) return base * blend;
  if (mode == BLEND_SCREEN) return 1.0 - (1.0 - base) * (1.0 - blend);
  if (mode == BLEND_OVERLAY) {
    vec4 lo = 2.0 * base * blend;
    vec4 hi = 1.0 - 2.0 * (1.0 - base) * (1.0 - blend);
    return mix(lo, hi, step(vec4(0.5), base));
  }
  if (mode == BLEND_SOFT_LIGHT) {
    vec4 d = mix(sqrt(max(base, vec4(0.0))), ((16.0 * base - 12.0) * base + 4.0) * base, step(vec4(0.25), base));
    return mix(base - (1.0 - 2.0 * blend) * base * (1.0 - base), base + (2.0 * blend - 1.0) * (d - base), step(vec4(0.5), blend));
  }
  if (mode == BLEND_ADD) return base + blend;
  if (mode == BLEND_SUBTRACT) return base - blend;
  if (mode == BLEND_DIFFERENCE) return abs(base - blend);
  return blend;
}

void main() {
  vec4 base = readA();
  vec4 blend = readB();
  vec4 blended = inMode(uMode, base, blend);
  float mask = uHasC ? dot(readC().rgb, vec3(0.2126, 0.7152, 0.0722)) : 1.0;
  gl_FragColor = vec4(mix(base.rgb, blended.rgb, clamp(uOpacity * mask, 0.0, 1.0)), base.a);
}
`
