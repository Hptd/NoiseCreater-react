// 本地图片文件读取（节点上传按钮与画布拖拽上传共用）。

// 读取图片：先转 dataURL，再解码取得原始宽高（裁剪计算需要）。
export function readImageFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const src = typeof reader.result === 'string' ? reader.result : ''
      if (!src) { reject(new Error('empty image')); return }
      const probe = new Image()
      probe.onload = () => resolve({
        src,
        width: probe.naturalWidth || probe.width,
        height: probe.naturalHeight || probe.height,
        name: file.name,
      })
      probe.onerror = () => reject(new Error('decode failed'))
      probe.src = src
    }
    reader.onerror = () => reject(new Error('read failed'))
    reader.readAsDataURL(file)
  })
}

// 兼容部分浏览器 / 系统拖拽时 file.type 为空的情况。
export function isImageFile(file) {
  if (!file) return false
  if (file.type && file.type.startsWith('image/')) return true
  return /\.(png|jpe?g|webp|gif|bmp|svg|avif)$/i.test(file.name || '')
}

// 拖拽内容中是否包含文件（dragover 阶段只能拿到 types，拿不到具体文件）。
export function hasFileDrag(dataTransfer) {
  return Array.from(dataTransfer?.types || []).includes('Files')
}
