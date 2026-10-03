// 导出比例：独立噪波面板与节点混合面板共用。
// 约定：所有非 1:1 比例都保持噪波不变形，工作区仍为正方形，
// 画面居中裁切填满目标宽高。

export const DEFAULT_ASPECT = '1:1'

export const ASPECT_RATIOS = [
  { label: '1:1', w: 1, h: 1 },
  { label: '16:9', w: 16, h: 9 },
  { label: '9:16', w: 9, h: 16 },
  { label: '21:9', w: 21, h: 9 },
  { label: '2:1', w: 2, h: 1 },
  { label: '1:2', w: 1, h: 2 },
  { label: '4:3', w: 4, h: 3 },
  { label: '3:4', w: 3, h: 4 },
]

export const ASPECT_LABELS = ASPECT_RATIOS.map(r => r.label)

export function aspectSize(label) {
  return ASPECT_RATIOS.find(r => r.label === label) || ASPECT_RATIOS[0]
}

// 以宽度为基准，按比例算出画布宽高（高度只读，不可输入）。
export function computeExportSize(width, label) {
  const { w, h } = aspectSize(label)
  const W = Math.round(Number(width)) || 1024
  return { width: W, height: Math.max(1, Math.round(W * h / w)) }
}
