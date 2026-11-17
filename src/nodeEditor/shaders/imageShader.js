// 上传图片节点：按裁剪参数重采样，并按“图片输出尺寸”适配到方形工作区。
// outputFit = 0 自适应方形：裁剪结果直接铺满方形（必要时拉伸/压缩）；
// outputFit = 1 原图模式：长边占满方形，短边留空（透明，下游 Blend 按 alpha 屏蔽）。
export default `
varying vec2 vUv;

uniform sampler2D uImage;
uniform bool uHasImage;
uniform float uImageAspect;

uniform float uCropLeft;
uniform float uCropRight;
uniform float uCropTop;
uniform float uCropBottom;
uniform int uOutputFit;

void main() {
  if (!uHasImage) {
    gl_FragColor = vec4(0.0);
    return;
  }

  float cropW = max(uCropRight - uCropLeft, 0.00001);
  float cropH = max(uCropBottom - uCropTop, 0.00001);
  float cropAspect = (cropW * uImageAspect) / cropH;

  vec2 region = vec2(vUv.x, vUv.y);
  float inside = 1.0;

  if (uOutputFit == 1) {
    if (cropAspect >= 1.0) {
      float halfBand = 0.5 / cropAspect;
      inside = step(abs(vUv.y - 0.5), halfBand);
      region.y = 0.5 + (vUv.y - 0.5) * cropAspect;
    } else {
      float halfBand = 0.5 * cropAspect;
      inside = step(abs(vUv.x - 0.5), halfBand);
      region.x = 0.5 + (vUv.x - 0.5) / cropAspect;
    }
  }

  // 纹理默认 flipY，因此 v 方向用 1 - 边界值（输出上方对应裁剪区顶部）。
  vec2 uv = vec2(
    mix(uCropLeft, uCropRight, region.x),
    mix(1.0 - uCropBottom, 1.0 - uCropTop, region.y)
  );
  vec4 color = texture2D(uImage, uv);
  color.a *= inside;
  gl_FragColor = inside > 0.5 ? color : vec4(0.0);
}
`
