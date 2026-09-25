# 法线混合（Normal Blend）

- 分类：法线
- 英文标识：normal:blend

## 功能介绍
按 Whiteout 等算法叠加两张法线贴图。

## 如何使用
连接高度图 / 法线图后按参数调整。

## 输入
- **a**：底层法线图
- **b**：细节层法线图

## 输出
- **out**：图像输出（RGBA）

## 参数
- 混合算法（mode）：默认 whiteout
- 底层权重（weightA）：默认 1
- 细节层权重（weightB）：默认 1
- 不透明度（opacity）：默认 1
- A 常量（a）：默认 0
- B 常量（b）：默认 0
