// 无缝贴图节点的拼接效果预览：定时回读该节点输出，按 2×2 / 3×3 / 4×4 平铺绘制。
import { useEffect, useRef } from 'react'

const CAPTURE_SIZE = 256
const CAPTURE_INTERVAL = 250

function drawTiled(canvas, source, pixels, times) {
  const { width, height } = pixels
  if (canvas.width !== width * times) canvas.width = width * times
  if (canvas.height !== height * times) canvas.height = height * times
  const ctx = canvas.getContext('2d')
  for (let y = 0; y < times; y++) {
    for (let x = 0; x < times; x++) ctx.drawImage(source, x * width, y * height)
  }
}

export default function SeamlessPreview({ nodeId, tile = '3x3', capture }) {
  const canvasRef = useRef(null)
  const tileRef = useRef(tile)
  tileRef.current = tile

  useEffect(() => {
    if (!capture) return
    const source = document.createElement('canvas')
    let raf
    let last = 0

    // WebGL 回读为 y 轴自下而上，绘制前需翻转。
    const draw = (pixels) => {
      const { data, width, height } = pixels
      source.width = width
      source.height = height
      const sctx = source.getContext('2d')
      const image = sctx.createImageData(width, height)
      for (let y = 0; y < height; y++) {
        const from = (height - 1 - y) * width * 4
        image.data.set(data.subarray(from, from + width * 4), y * width * 4)
      }
      sctx.putImageData(image, 0, 0)
      drawTiled(canvasRef.current, source, pixels, parseInt(tileRef.current, 10) || 3)
    }

    const loop = (now) => {
      if (now - last > CAPTURE_INTERVAL && canvasRef.current) {
        last = now
        const pixels = capture(nodeId, 'out', CAPTURE_SIZE)
        if (pixels) draw(pixels)
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [nodeId, capture])

  return (
    <div className="nc-seamless-preview">
      <div className="nc-seamless-preview-title">拼接效果预览</div>
      <canvas ref={canvasRef} width={256} height={256} />
    </div>
  )
}
