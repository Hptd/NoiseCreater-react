# 治愈同心圆环

- 分类：噪声
- 英文标识：noise:satisfyNoise

## 功能介绍
生成「治愈同心圆环」噪波图案。

## 如何使用
从左侧菜单拖入画布即可生成图案，无需输入图像；在右侧参数面板调节公共参数（尺寸 / 位移 / 缩放 / 明暗 / 反相 / 动画等）与专属参数。

## 输入
无图像输入（噪波自生成）。公共参数（噪波尺寸 / 横向位移 / 纵向位移 / 横向尺寸 / 纵向尺寸 / 整体明暗 / 颜色取反 / Alpha / 动画）由节点面板统一控制。

## 输出
- **out**：图像输出（RGBA）

## 参数
- noiseNum：默认 20
- noiseSpeed：默认 1.2
- noiseThick：默认 1.1
- noisePaletteR：默认 1.5
- noisePaletteG：默认 2.9
- noisePaletteB：默认 3.5
- noiseMirror：默认 true
- noiseRotate：默认 false
- noiseRotOfst：默认 true
- noiseTriNoise：默认 true
- noiseRemoveCol：默认 false
