// 形状节点家族：椭圆 / 矩形 / 圆角矩形 / 多边形（SDF 生成）。
import { SHAPE_OPS, opDefines } from './ops.js'

export default `
varying vec2 vUv;
uniform vec2 uTexel;
uniform int uOp;

uniform float uWidth;
uniform float uHeight;
uniform float uRadius;
uniform int uSides;
uniform float uAngle;

${opDefines('SH', SHAPE_OPS)}

float sdfRect(vec2 p, vec2 halfSize, float r) {
  vec2 q = abs(p) - halfSize + vec2(r);
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

float sdfPolygon(vec2 p, float radius, int n, float angle) {
  float a = atan(p.y, p.x) - angle;
  float b = 6.2831853 / float(n);
  float k = floor(a / b + 0.5) * b;
  vec2 q = vec2(cos(k), sin(k)) * radius;
  return length(p - q) - radius * cos(b * 0.5);
}

void main() {
  vec2 p = vUv - 0.5;
  float d = 1.0;

  if (uOp == SH_ELLIPSE) {
    d = length(p / max(vec2(uWidth, uHeight) * 0.5, vec2(1e-4))) - 1.0;
  } else if (uOp == SH_RECTANGLE) {
    d = sdfRect(p, vec2(uWidth, uHeight) * 0.5, 0.0);
  } else if (uOp == SH_ROUNDED_RECTANGLE) {
    d = sdfRect(p, vec2(uWidth, uHeight) * 0.5, uRadius);
  } else if (uOp == SH_POLYGON) {
    d = sdfPolygon(p, max(uWidth, uHeight) * 0.5, max(uSides, 3), radians(uAngle));
  }

  float w = max(max(length(uTexel), fwidth(d)), 1e-5);
  float mask = 1.0 - smoothstep(-w, w, d);
  gl_FragColor = vec4(vec3(mask), 1.0);
}
`
