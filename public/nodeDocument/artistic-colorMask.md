# 颜色遮罩（Color Mask）

- 分类：艺术
- 英文标识：artistic:colorMask

## 功能介绍
保留与指定颜色接近的像素，其余变黑。

## 如何使用
连接输入图像后按参数调整效果。

## 输入
- **in**：输入图像

## 输出
- **out**：图像输出（RGBA）

## 参数
- 遮罩颜色（maskColor）：默认 #ffffff
- 匹配范围（range）：默认 0.1
- 容差模糊（fuzziness）：默认 0.1
