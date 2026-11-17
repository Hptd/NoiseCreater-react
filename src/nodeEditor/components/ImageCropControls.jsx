// 上传图片节点的裁剪属性面板：双头滑杆 + 对称 / 正方形裁剪 + 输出尺寸 + 大图裁剪预览。
import { useRef } from 'react'
import DualRangeSlider from './DualRangeSlider.jsx'
import { useLang, tUi } from '../i18n/index.js'
import {
  CROP_MIN_GAP,
  cropValues,
  cropFromSquareK,
  imageAspect,
  kFromCurrentCrop,
  kFromHorizontalMargin,
  kFromVerticalMargin,
  freePair,
  panCrop,
  symmetricPair,
} from './imageCropMath.js'

const ROW_KEYS = {
  h: ['cropLeft', 'cropRight'],
  v: ['cropTop', 'cropBottom'],
}

const SYMMETRIC_KEY = { h: 'symmetricX', v: 'symmetricY' }

function percent(value) {
  const clamped = Math.min(Math.max(value, 0), 1)
  return `${(clamped * 100).toFixed(3)}%`
}

export default function ImageCropControls({ params, image, onChange, onChangeMany }) {
  useLang()
  const frameRef = useRef(null)
  const crop = cropValues(params)
  const aspect = imageAspect(image)
  const hasImage = Boolean(image?.src)
  const square = Boolean(params?.squareCrop)
  const symmetric = {
    h: params?.symmetricX !== false,
    v: params?.symmetricY !== false,
  }
  const outputFit = params?.outputFit === 'original' ? 'original' : 'autoSquare'

  const patch = values => onChangeMany(values)

  const handleDrag = (axis, handle, value) => {
    if (!hasImage) return
    const [lowKey, highKey] = ROW_KEYS[axis]
    if (square) {
      const margin = handle === 'low' ? value : 1 - value
      const k = axis === 'h'
        ? kFromHorizontalMargin(image, margin)
        : kFromVerticalMargin(image, margin)
      // 方形裁剪的滑杆调整始终居中，同步把对称恢复为勾选。
      patch({ ...cropFromSquareK(image, k), symmetricX: true, symmetricY: true })
      return
    }
    if (symmetric[axis]) {
      // 对称：以被拖动一侧的边距为准，镜像另一侧；最小间距限制为 0.1。
      const margin = Math.min(Math.max(handle === 'low' ? value : 1 - value, 0), (1 - CROP_MIN_GAP) / 2)
      const [low, high] = symmetricPair([margin, 1 - margin])
      patch({ [lowKey]: low, [highKey]: high })
    } else {
      const [low, high] = freePair([crop[lowKey], crop[highKey]], handle, value)
      patch({ [lowKey]: low, [highKey]: high })
    }
  }

  const toggleSymmetric = (axis, checked) => {
    if (square) return
    const [lowKey, highKey] = ROW_KEYS[axis]
    const key = SYMMETRIC_KEY[axis]
    if (!checked) {
      patch({ [key]: false })
      return
    }
    const [low, high] = symmetricPair([crop[lowKey], crop[highKey]])
    patch({ [key]: true, [lowKey]: low, [highKey]: high })
  }

  const resetRow = (axis) => {
    if (square) {
      patch({ ...cropFromSquareK(image, 1), symmetricX: true, symmetricY: true })
      return
    }
    const [lowKey, highKey] = ROW_KEYS[axis]
    patch({ [lowKey]: 0, [highKey]: 1, [SYMMETRIC_KEY[axis]]: true })
  }

  const toggleSquare = (checked) => {
    if (checked) {
      const k = hasImage ? kFromCurrentCrop(image, params) : 1
      patch({
        ...cropFromSquareK(image, k),
        squareCrop: true,
        symmetricX: true,
        symmetricY: true,
        outputFit: 'autoSquare',
      })
    } else {
      patch({ squareCrop: false })
    }
  }

  const setOutputFit = (mode) => {
    if (square || !hasImage) return
    onChange('outputFit', mode)
  }

  // 在预览图上按住拖动：平移裁剪区（保持裁剪区宽高不变）。
  const startPan = (event) => {
    if (!hasImage) return
    const rect = frameRef.current?.getBoundingClientRect()
    if (!rect || rect.width === 0 || rect.height === 0) return
    event.preventDefault()
    const origin = { x: event.clientX, y: event.clientY, crop, symmetric: { ...symmetric } }
    const move = (ev) => {
      const dx = (ev.clientX - origin.x) / rect.width
      const dy = (ev.clientY - origin.y) / rect.height
      const next = panCrop(origin.crop, dx, dy)
      // 平移破坏了某一轴的对称关系时，取消该轴「对称」勾选（不自动重新勾选）。
      const near = (value) => Math.abs(value) <= 1e-3
      patch({
        ...next,
        symmetricX: origin.symmetric.h && near(next.cropLeft + next.cropRight - 1),
        symmetricY: origin.symmetric.v && near(next.cropTop + next.cropBottom - 1),
      })
    }
    const end = () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', end)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', end)
  }

  const frameStyle = aspect >= 1
    ? { width: '100%', aspectRatio: `${image?.width} / ${image?.height}` }
    : { height: '100%', aspectRatio: `${image?.width} / ${image?.height}` }

  return (
    <div className="nc-image-crop">
      <label className="nc-crop-square">
        <input
          type="checkbox"
          checked={square}
          disabled={!hasImage}
          onChange={e => toggleSquare(e.target.checked)}
        />
        <span>{tUi('squareCrop')}</span>
      </label>

      {['h', 'v'].map(axis => (
        <div className="nc-crop-row" key={axis}>
          <span className="nc-crop-axis">{tUi(axis === 'h' ? 'cropHorizontal' : 'cropVertical')}</span>
          <label className={`nc-crop-symmetric${square || !hasImage ? ' disabled' : ''}`}>
            <input
              type="checkbox"
              checked={symmetric[axis]}
              disabled={square || !hasImage}
              onChange={e => toggleSymmetric(axis, e.target.checked)}
            />
            <span>{tUi('symmetric')}</span>
          </label>
          <DualRangeSlider
            low={axis === 'h' ? crop.cropLeft : crop.cropTop}
            high={axis === 'h' ? crop.cropRight : crop.cropBottom}
            disabled={!hasImage}
            onDrag={(handle, value) => handleDrag(axis, handle, value)}
          />
          <button className="nc-btn small" disabled={!hasImage} onClick={() => resetRow(axis)}>
            {tUi('reset')}
          </button>
        </div>
      ))}

      <div className="nc-crop-output">
        <span className="nc-crop-output-title">{tUi('imageOutputSize')}</span>
        {['autoSquare', 'original'].map(mode => (
          <label key={mode} className={`nc-crop-radio${square || !hasImage ? ' disabled' : ''}`}>
            <input
              type="radio"
              name="nc-image-output-fit"
              checked={outputFit === mode}
              disabled={square || !hasImage}
              onChange={() => setOutputFit(mode)}
            />
            <span>{tUi(mode)}</span>
          </label>
        ))}
      </div>

      <div className="nc-crop-preview">
        {hasImage ? (
          <div className="nc-crop-preview-frame" style={frameStyle} ref={frameRef} onPointerDown={startPan}>
            <img src={image.src} alt="" draggable={false} />
            <div className="nc-crop-mask" style={{ left: 0, right: 0, top: 0, height: percent(crop.cropTop) }} />
            <div className="nc-crop-mask" style={{ left: 0, right: 0, bottom: 0, height: percent(1 - crop.cropBottom) }} />
            <div className="nc-crop-mask" style={{ left: 0, top: percent(crop.cropTop), bottom: percent(1 - crop.cropBottom), width: percent(crop.cropLeft) }} />
            <div className="nc-crop-mask" style={{ right: 0, top: percent(crop.cropTop), bottom: percent(1 - crop.cropBottom), width: percent(1 - crop.cropRight) }} />
          </div>
        ) : (
          <span className="nc-crop-empty">{tUi('noImage')}</span>
        )}
      </div>
    </div>
  )
}
