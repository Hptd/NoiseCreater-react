# 上传图片（Upload Image）

- 分类：输入
- 英文标识：image:upload

## 功能介绍
上传本地图片并裁剪，可作为混合素材与噪波或其它图片节点混合；原图模式下长边占满、短边留空（留空区不参与混合）。

## 如何使用
在节点中上传本地图片，或直接把本地图片拖到画布（自动创建本节点）；在右侧属性面板设置裁剪与“图片输出尺寸”，在预览图上拖动可平移裁剪区，再连接到 Blend 等节点进行混合。

## 输入
无图像输入。

## 输出
- **out**：图像输出（RGBA）

## 参数
- 左侧裁剪（cropLeft）：默认 0
- 右侧裁剪（cropRight）：默认 1
- 顶部裁剪（cropTop）：默认 0
- 底部裁剪（cropBottom）：默认 1
- 水平对称（symmetricX）：默认 true
- 垂直对称（symmetricY）：默认 true
- 正方形裁剪（squareCrop）：默认 false
- 图片输出尺寸（outputFit）：默认 autoSquare
