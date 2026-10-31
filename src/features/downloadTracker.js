// 下载按钮埋点：同一按钮 3 秒冷却 + 上报实际下载文件名。
// 真实 IP 由后端从请求连接 / 可信代理头获取，前端不能也不应自行上报。
const API_URL = "https://www.hptd.cn/api/downloads"
const COOLDOWN_MS = 3000
const lastClickAt = new Map()

// 同一按钮 3 秒内重复点击返回 false，调用方应直接忽略本次点击。
export function acquireDownload(key) {
  const now = Date.now()
  const last = lastClickAt.get(key) ?? 0
  if (now - last < COOLDOWN_MS) return false
  lastClickAt.set(key, now)
  return true
}

// 只上报，不处理响应；失败静默，避免埋点影响下载主流程。
export function reportDownload(downloadName) {
  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ downloadName }),
    keepalive: true,
  }).catch(() => {})
}
