// UV 节点家族：UV 生成 / 极坐标 / 径向切变 / 平铺偏移 / 扭曲（均为图像后处理）。
import { UV_OPS, opDefines } from './ops.js'

export default `
varying vec2 vUv;
uniform int uOp;

uniform sampler2D uInA; uniform bool uHasA; uniform vec4 uValA;

uniform vec2 uCenter;
uniform vec2 uTiling;
uniform vec2 uOffset;
uniform float uRadialScale;
uniform float uLengthScale;
uniform float uStrength;
uniform float uRadius;

${opDefines('UV', UV_OPS)}

vec4 sampleA(vec2 uv) { return uHasA ? texture2D(uInA, fract(uv)) : uValA; }

void main() {
  vec4 c = vec4(0.0);

  if (uOp == UV_UV) {
    c = vec4(vUv.x, vUv.y, 0.0, 1.0);
  } else if (uOp == UV_POLAR) {
    vec2 d = vUv - uCenter;
    float r = length(d);
    float a = atan(d.y, d.x);
    vec2 uv2 = vec2((a * 0.15915494 + 0.5) * uRadialScale, r * uLengthScale);
    c = sampleA(uv2);
  } else if (uOp == UV_RADIAL_SHEAR) {
    vec2 uv2 = vUv + (vUv - uCenter) * uStrength;
    c = sampleA(uv2);
  } else if (uOp == UV_TILING_OFFSET) {
    c = sampleA(vUv * uTiling + uOffset);
  } else if (uOp == UV_TWIRL) {
    vec2 d = vUv - uCenter;
    float r = length(d);
    float ang = uStrength * (1.0 - smoothstep(0.0, max(uRadius, 1e-4), r));
    float s = sin(ang);
    float co = cos(ang);
    vec2 uv2 = uCenter + mat2(co, -s, s, co) * d;
    c = sampleA(uv2);
  }

  gl_FragColor = c;
}
`
