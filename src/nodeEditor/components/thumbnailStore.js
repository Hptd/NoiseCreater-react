// 节点缩略图的外置订阅存储：像素回读结果写在这里，节点组件按 id 订阅，
// 避免为了刷新一张缩略图而重渲染整张画布。
import { useSyncExternalStore } from 'react'

const thumbnails = new Map()
const listeners = new Set()

function emit() {
  for (const listener of listeners) listener()
}

export function setThumbnail(id, dataURL) {
  if (thumbnails.get(id) === dataURL) return
  thumbnails.set(id, dataURL)
  emit()
}

export function clearThumbnails() {
  if (thumbnails.size === 0) return
  thumbnails.clear()
  emit()
}

export function subscribeThumbnails(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useThumbnail(id) {
  return useSyncExternalStore(subscribeThumbnails, () => thumbnails.get(id))
}
