# 无缝贴图（Convert to Seamless Texture）

- 分类：艺术
- 英文标识：artistic:seamless

## 功能介绍
把输入图像转换为可平铺的无缝贴图：在边缘做交叉淡化，使左右/上下边缘像素连续，平铺后看不到接缝。

## 如何使用
连接输入图像后按参数调整效果。

## 输入
- **in**：输入图像

## 输出
- **out**：图像输出（RGBA）

## 参数
- 边缘带宽（edgeBand）：默认 0.25
- 平铺检测（tileCheck）：默认 3x3
