// 噪波片段着色器的 fetch 缓存。着色器文件是 `export default \`...\`` 的模块，
// 这里与 NoiseDetail 一致地取出反引号之间的 GLSL 源码。
const cache = new Map()
const pending = new Map()

function stripShaderModule(text) {
  const start = text.indexOf('`') + 1
  const end = text.lastIndexOf('`')
  if (start <= 0 || end <= start) return text
  return text.substring(start, end)
}

export function getNoiseShader(path) {
  return cache.get(path) || null
}

export function loadNoiseShader(path) {
  if (cache.has(path)) return Promise.resolve(cache.get(path))
  if (pending.has(path)) return pending.get(path)
  const task = fetch(path)
    .then(res => {
      if (!res.ok) throw new Error(`shader ${path} 加载失败 (${res.status})`)
      return res.text()
    })
    .then(text => {
      const source = stripShaderModule(text)
      cache.set(path, source)
      pending.delete(path)
      return source
    })
    .catch(err => {
      pending.delete(path)
      console.error(err)
      return null
    })
  pending.set(path, task)
  return task
}

export async function preloadNoiseShaders(paths) {
  const unique = [...new Set((paths || []).filter(Boolean))]
  await Promise.all(unique.map(loadNoiseShader))
}
