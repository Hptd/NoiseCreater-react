// 双手柄滑杆：两个极值可分别拖动，步进 0.01，用于左右 / 上下裁剪。
import { useRef, useState } from 'react'
import { quantizeStep } from './imageCropMath.js'

export default function DualRangeSlider({ low, high, onDrag, disabled = false }) {
  const trackRef = useRef(null)
  const [dragging, setDragging] = useState(null)

  const valueAt = (clientX) => {
    const rect = trackRef.current?.getBoundingClientRect()
    if (!rect || rect.width === 0) return 0
    return quantizeStep((clientX - rect.left) / rect.width)
  }

  const startDrag = (handle, event) => {
    if (disabled) return
    event.preventDefault()
    event.stopPropagation()
    setDragging(handle)
    onDrag(handle, valueAt(event.clientX))
    const move = (ev) => onDrag(handle, valueAt(ev.clientX))
    const end = () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', end)
      setDragging(null)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', end)
  }

  // 在轨道上按下时，选择距离指针更近的手柄。
  const handleTrackDown = (event) => {
    if (disabled) return
    const value = valueAt(event.clientX)
    const nearLow = Math.abs(value - low) <= Math.abs(value - high)
    startDrag(nearLow ? 'low' : 'high', event)
  }

  const percent = v => `${Math.min(Math.max(v, 0), 1) * 100}%`

  return (
    <div className={`nc-dual${disabled ? ' disabled' : ''}`}>
      <span className="nc-dual-num">{Number(low).toFixed(2)}</span>
      <div className="nc-dual-track" ref={trackRef} onPointerDown={handleTrackDown}>
        <div className="nc-dual-fill" style={{ left: percent(low), right: `calc(100% - ${percent(high)})` }} />
        <span className={`nc-dual-thumb${dragging === 'low' ? ' active' : ''}`} style={{ left: percent(low) }} />
        <span className={`nc-dual-thumb${dragging === 'high' ? ' active' : ''}`} style={{ left: percent(high) }} />
      </div>
      <span className="nc-dual-num">{Number(high).toFixed(2)}</span>
    </div>
  )
}
