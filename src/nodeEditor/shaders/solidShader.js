// 数据节点落成纯色纹理时使用（数据节点在 CPU 侧持值，仅当连接到图像端口时才渲染）。
export default `
varying vec2 vUv;
uniform vec4 uValue;

void main() {
  gl_FragColor = uValue;
}
`
