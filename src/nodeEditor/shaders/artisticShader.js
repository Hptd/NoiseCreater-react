// 艺术节点家族：对比度 / 色相 / 反色 / 饱和度 / 灰度 / 通道遮罩 / 颜色遮罩。
import { ARTISTIC_OPS, opDefines } from './ops.js'

export default `
varying vec2 vUv;
uniform float uTime;
uniform int uOp;

uniform sampler2D uInA; uniform bool uHasA; uniform vec4 uValA;

uniform float uContrast;
uniform float uOffset;
uniform float uSaturation;
uniform vec3 uMaskColor;
uniform float uRange;
uniform float uFuzziness;
uniform bool uR;
uniform bool uG;
uniform bool uB;
uniform bool uA;

${opDefines('ART', ARTISTIC_OPS)}

vec4 readA() { return uHasA ? texture2D(uInA, vUv) : uValA; }
float lumaOf(vec3 c) { return dot(c, vec3(0.2126, 0.7152, 0.0722)); }

vec3 rgb2hsv(vec3 c) {
  vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
  vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
  vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
  float d = q.x - min(q.w, q.y);
  float e = 1.0e-10;
  return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
  vec4 a = readA();
  vec4 c = a;

  if (uOp == ART_CONTRAST) {
    c = vec4((a.rgb - 0.5) * uContrast + 0.5, a.a);
  } else if (uOp == ART_HUE) {
    vec3 hsv = rgb2hsv(a.rgb);
    hsv.x = fract(hsv.x + uOffset / 360.0);
    c = vec4(hsv2rgb(hsv), a.a);
  } else if (uOp == ART_INVERT_COLORS) {
    c = vec4(1.0 - a.rgb, a.a);
  } else if (uOp == ART_SATURATION) {
    float l = lumaOf(a.rgb);
    c = vec4(mix(vec3(l), a.rgb, uSaturation), a.a);
  } else if (uOp == ART_LUMA) {
    c = vec4(vec3(lumaOf(a.rgb)), a.a);
  } else if (uOp == ART_CHANNEL_MASK) {
    c = a * vec4(uR ? 1.0 : 0.0, uG ? 1.0 : 0.0, uB ? 1.0 : 0.0, uA ? 1.0 : 0.0);
  } else if (uOp == ART_COLOR_MASK) {
    vec3 d = abs(a.rgb - uMaskColor);
    float m = 1.0 - smoothstep(uRange, uRange + max(uFuzziness, 1e-5), max(d.r, max(d.g, d.b)));
    c = vec4(vec3(m), a.a);
  }

  gl_FragColor = c;
}
`
