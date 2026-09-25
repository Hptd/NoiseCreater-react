// 节点帮助文档的稳定 slug（供节点帮助链接与文档生成器共用）。
export function nodeDocSlug(def) {
  if (!def) return ''
  if (def.type === 'noise') return `noise-${def.noiseName || def.op}`
  return `${def.type}-${def.op}`
}
