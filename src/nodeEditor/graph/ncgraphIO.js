// 浏览器侧 .ncgraph 文件读写（依赖 file-saver，仅此模块触碰 DOM/下载）。
import { saveAs } from 'file-saver'
import { serializeGraph, deserializeGraph } from './ncgraph.js'

export const GRAPH_FILE_EXT = '.ncgraph'

function safeFileName(name) {
  const base = (name || '未命名节点图').replace(/[\\/:*?"<>|]/g, '_').trim()
  return (base || '未命名节点图') + GRAPH_FILE_EXT
}

// 导出：序列化为 .ncgraph 并触发下载。
export function downloadGraph(graph, filename) {
  const data = serializeGraph(graph)
  const json = JSON.stringify(data, null, 2)
  saveAs(new Blob([json], { type: 'application/json' }), filename || safeFileName(graph?.meta?.name))
}

// 读取：返回 deserializeGraph 的结果（不抛出，错误放在 result.error）。
export function readGraphFile(file, options = {}) {
  return new Promise((resolve) => {
    if (!file) {
      resolve({ ok: false, error: '未选择文件', warnings: [], graph: null })
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      try {
        resolve(deserializeGraph(JSON.parse(reader.result), options))
      } catch (err) {
        resolve({ ok: false, error: `JSON 解析失败：${err.message}`, warnings: [], graph: null })
      }
    }
    reader.onerror = () => resolve({ ok: false, error: '文件读取失败', warnings: [], graph: null })
    reader.readAsText(file)
  })
}
