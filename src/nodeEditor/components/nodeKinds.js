// 节点类别判定与 Preview 尺寸的单一真源（供画布节点与求值循环共用）。
export const PREVIEW_SIZES = ['128', '256', '512']
const PREVIEW_DEFAULT = 128
const PREVIEW_MIN = 64
const PREVIEW_MAX = 2048

export function isPreviewData(data) {
  return data?.type === 'utility' && data?.op === 'preview'
}

export function isThumbnailData(data) {
  return data?.type === 'noise' || data?.type === 'output' || isPreviewData(data)
}

export function previewSize(data) {
  const size = Number(data?.params?.size) || PREVIEW_DEFAULT
  return Math.min(Math.max(size, PREVIEW_MIN), PREVIEW_MAX)
}
