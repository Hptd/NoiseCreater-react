// 渐变节点家族：Gradient（按 u 采样）/ Sample Gradient（按输入灰度采样）。
// 渐变以 256x1 的 DataTexture 形式传入 uGradient。
export default `
varying vec2 vUv;
uniform int uOp;
uniform sampler2D uGradient;

uniform sampler2D uInA; uniform bool uHasA; uniform vec4 uValA;

#define GRAD_GRADIENT 0
#define GRAD_SAMPLE_GRADIENT 1

void main() {
  float t = vUv.x;
  if (uOp == GRAD_SAMPLE_GRADIENT) {
    vec4 c = uHasA ? texture2D(uInA, vUv) : uValA;
    t = dot(c.rgb, vec3(0.2126, 0.7152, 0.0722));
  }
  gl_FragColor = texture2D(uGradient, vec2(clamp(t, 0.0, 1.0), 0.5));
}
`
