// 无缝贴图节点家族：把输入纹理转换为可平铺的无缝贴图（边缘交叉淡化）。
// out(u) = mix( f(u), f(1-u), w )，w 在首尾边缘精确取 0.5、中心取 0，
// 保证左右 / 上下边缘像素相等，平铺后接缝连续。先横向、再纵向各做一次。
export default `
varying vec2 vUv;

uniform sampler2D uInA; uniform bool uHasA; uniform vec4 uValA;

uniform vec2 uTexel;
uniform float uEdgeBand;

vec4 sampleA(vec2 uv) { return uHasA ? texture2D(uInA, uv) : uValA; }

// p 为像素坐标（0 .. n-1），n 为边长（像素）。边缘权重 0.5，中心 0。
float bandWeight(float p, float n) {
  float bw = max(uEdgeBand * n, 1.0);
  float k = min(smoothstep(0.0, bw, p), smoothstep(0.0, bw, n - 1.0 - p));
  return 0.5 * (1.0 - k);
}

void main() {
  float n = 1.0 / max(uTexel.x, 1e-6);
  float wx = bandWeight(vUv.x * n - 0.5, n);
  float wy = bandWeight(vUv.y * n - 0.5, n);

  vec4 h0 = mix(sampleA(vUv), sampleA(vec2(1.0 - vUv.x, vUv.y)), wx);
  vec4 h1 = mix(sampleA(vec2(vUv.x, 1.0 - vUv.y)), sampleA(vec2(1.0 - vUv.x, 1.0 - vUv.y)), wx);
  gl_FragColor = mix(h0, h1, wy);
}
`
