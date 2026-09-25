# 色差焦散

- 分类：噪声
- 英文标识：noise:causticChromaNoise

## 功能介绍
生成「色差焦散」噪波图案。

## 如何使用
从左侧菜单拖入画布即可生成图案，无需输入图像；在右侧参数面板调节公共参数（尺寸 / 位移 / 缩放 / 明暗 / 反相 / 动画等）与专属参数。

## 输入
无图像输入（噪波自生成）。公共参数（噪波尺寸 / 横向位移 / 纵向位移 / 横向尺寸 / 纵向尺寸 / 整体明暗 / 颜色取反 / Alpha / 动画）由节点面板统一控制。

## 输出
- **out**：图像输出（RGBA）

## 参数
- noiseOctaves：默认 24
- noiseRefineSteps：默认 10
- noiseSepSize：默认 1.2
- noiseSepLight：默认 1.9
- noiseSepAnim：默认 0.1
- noiseCausticStrength：默认 0.008
- noiseCausticRoughness：默认 1.3
- noiseCausticAber：默认 0.001
- noiseScale：默认 3
- noiseRemoveCol：默认 false
