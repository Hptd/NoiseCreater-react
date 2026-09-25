# 黑白转法线（Normal From Height）

- 分类：法线
- 英文标识：normal:fromHeight

## 功能介绍
由灰度高度图计算法线贴图。

## 如何使用
连接高度图 / 法线图后按参数调整。

## 输入
- **in**：输入图像

## 输出
- **out**：图像输出（RGBA）

## 参数
- 取值通道（channel）：默认 luma
- 输入黑场（levelInBlack）：默认 0
- 输入白场（levelInWhite）：默认 1
- 高度反转（invert）：默认 false
- 求导算子（kernel）：默认 sobel
- 采样步长（sampleStep）：默认 1
- 预平滑次数（preSmooth）：默认 0
- 平坦阈值（flatThreshold）：默认 0
- 强度（strength）：默认 1
- 锐利度（contrast）：默认 1
- 法线朝向（convention）：默认 opengl
- 翻转 X 通道（flipX）：默认 false
- 重新归一化（reNormalize）：默认 true
- 边缘模式（edgeMode）：默认 wrap
- 边缘淡化（edgeFade）：默认 0
