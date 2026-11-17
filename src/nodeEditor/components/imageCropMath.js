// 上传图片节点的裁剪参数计算（纯函数，供属性面板与默认值使用）。
//
// 约定：cropLeft/Right/Top/Bottom 为裁剪边在图像归一化坐标中的位置，
// 左/上边界取 0、右/下边界取 1；裁剪区像素宽高比 = (right-left)*W / ((bottom-top)*H)。

export const CROP_STEP = 0.01
export const CROP_MIN_GAP = 0.1

const round2 = v => Math.round(v * 100) / 100
const round4 = v => Math.round(v * 10000) / 10000
const clamp = (v, min, max) => Math.min(Math.max(v, min), max)

export function imageAspect(image) {
  const w = Number(image?.width)
  const h = Number(image?.height)
  if (!(w > 0) || !(h > 0)) return 1
  return w / h
}

export function cropValues(params) {
  const p = params || {}
  return {
    cropLeft: Number.isFinite(Number(p.cropLeft)) ? Number(p.cropLeft) : 0,
    cropRight: Number.isFinite(Number(p.cropRight)) ? Number(p.cropRight) : 1,
    cropTop: Number.isFinite(Number(p.cropTop)) ? Number(p.cropTop) : 0,
    cropBottom: Number.isFinite(Number(p.cropBottom)) ? Number(p.cropBottom) : 1,
  }
}

// 正方形裁剪模式下可用的最小边长系数（相对短边，0–1）：
// 保证长短两轴在归一化坐标下的间距都不小于 CROP_MIN_GAP。
export function squareKMin(image) {
  const aspect = imageAspect(image)
  return Math.min(1, CROP_MIN_GAP * Math.max(aspect, 1 / aspect))
}

// 由“方形边长系数”k 生成居中的正方形裁剪四值。
export function cropFromSquareK(image, k) {
  const aspect = imageAspect(image)
  const kk = clamp(k, squareKMin(image), 1)
  let left
  let top
  if (aspect >= 1) {
    top = (1 - kk) / 2
    left = (1 - kk / aspect) / 2
  } else {
    left = (1 - kk) / 2
    top = (1 - kk * aspect) / 2
  }
  return {
    cropLeft: round4(left),
    cropRight: round4(1 - left),
    cropTop: round4(top),
    cropBottom: round4(1 - top),
  }
}

// 水平/垂直裁剪边距 -> 方形边长系数（用于“调整任一 slider 其余三项自适应”）。
export function kFromHorizontalMargin(image, margin) {
  const aspect = imageAspect(image)
  return aspect >= 1 ? (1 - 2 * margin) * aspect : 1 - 2 * margin
}

export function kFromVerticalMargin(image, margin) {
  const aspect = imageAspect(image)
  return aspect >= 1 ? 1 - 2 * margin : (1 - 2 * margin) / aspect
}

// 由当前裁剪区取“较短边”作为方形边长，供勾选正方形裁剪时的一次性换算。
export function kFromCurrentCrop(image, params) {
  const aspect = imageAspect(image)
  const crop = cropValues(params)
  const wide = (crop.cropRight - crop.cropLeft) * aspect
  const tall = crop.cropBottom - crop.cropTop
  const side = Math.min(wide, tall)
  return side / Math.min(aspect, 1)
}

// 开启“对称”时，以相对变化较小的极值为准，镜像较大的一侧。
export function symmetricPair(values) {
  const margin = Math.min(values[0], 1 - values[1])
  return [round2(margin), round2(1 - margin)]
}

// 单个手柄拖动后的成对取值（非对称模式，保证最小间距 0.1）。
export function freePair(values, handle, value) {
  const next = [...values]
  const index = handle === 'low' ? 0 : 1
  next[index] = round2(clamp(value, 0, 1))
  if (next[1] - next[0] < CROP_MIN_GAP) {
    if (handle === 'low') next[0] = round2(next[1] - CROP_MIN_GAP)
    else next[1] = round2(next[0] + CROP_MIN_GAP)
  }
  return [clamp(next[0], 0, 1), clamp(next[1], 0, 1)]
}

export function quantizeStep(value) {
  return round2(Math.round(value / CROP_STEP) * CROP_STEP)
}

// 平移裁剪区：保持裁剪区宽高不变，只移动位置；超出图像时贴边。
export function panCrop(params, dx, dy) {
  const crop = cropValues(params)
  const width = crop.cropRight - crop.cropLeft
  const height = crop.cropBottom - crop.cropTop
  const left = clamp(crop.cropLeft + dx, 0, 1 - width)
  const top = clamp(crop.cropTop + dy, 0, 1 - height)
  return {
    cropLeft: round4(left),
    cropRight: round4(left + width),
    cropTop: round4(top),
    cropBottom: round4(top + height),
  }
}
