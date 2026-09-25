// 输出 / 预览节点家族：直通。alphaChannel 开启时按亮度生成 alpha（黑透明 / 白不透明）。
export const outputShader = `
varying vec2 vUv;
uniform bool uAlphaChannel;
uniform sampler2D uInA; uniform bool uHasA; uniform vec4 uValA;

void main() {
  vec4 c = uHasA ? texture2D(uInA, vUv) : uValA;
  if (uAlphaChannel) {
    c.a = dot(c.rgb, vec3(0.2126, 0.7152, 0.0722));
  } else {
    c.a = 1.0;
  }
  gl_FragColor = c;
}
`

// 复制纹理，用于把节点的 RenderTarget 缩采到缩略图尺寸后回读。
export const copyShader = `
varying vec2 vUv;
uniform sampler2D uInA; uniform bool uHasA; uniform vec4 uValA;

void main() {
  gl_FragColor = uHasA ? texture2D(uInA, vUv) : uValA;
}
`
