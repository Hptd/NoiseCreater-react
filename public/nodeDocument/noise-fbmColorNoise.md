# FBM 彩色

- 分类：噪声
- 英文标识：noise:fbmColorNoise

## 功能介绍
生成「FBM 彩色」噪波图案。

## 如何使用
从左侧菜单拖入画布即可生成图案，无需输入图像；在右侧参数面板调节公共参数（尺寸 / 位移 / 缩放 / 明暗 / 反相 / 动画等）与专属参数。

## 输入
无图像输入（噪波自生成）。公共参数（噪波尺寸 / 横向位移 / 纵向位移 / 横向尺寸 / 纵向尺寸 / 整体明暗 / 颜色取反 / Alpha / 动画）由节点面板统一控制。

## 输出
- **out**：图像输出（RGBA）

## 参数
- noiseColor1：默认 #f00508
- noiseColor2：默认 #0a0a38
- noiseColor3：默认 #ffccff
- noiseColor4：默认 #336680
- noiseTimeSpeed：默认 0.1
- noiseScale：默认 3.5
- noiseMixExp1：默认 4
- noiseMixExp2：默认 1.4
- noiseGamma：默认 2
- noiseLacunarity：默认 2
- noiseRoughness：默认 0.33
- noiseLacunarity2：默认 3
- noiseRoughness2：默认 0.5
- noiseWarpStrength：默认 1
- noiseDomainWarp：默认 0.006
- noiseRemoveCol：默认 false
