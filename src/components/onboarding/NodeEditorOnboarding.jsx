// 本文件用于展示画布引导效果，可随时删除

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import './NodeEditorOnboarding.css'

// 高亮挖孔相对目标卡片向外扩展的距离
const HOLE_PADDING = 12

// 提示引导只在本标签页内展示一次：
// - 首次进入首页展示；
// - 进入噪波/工具页后再返回首页（含 SPA 返回和整页跳转返回）不再展示；
// - 刷新首页视为新一次进入，会重新展示。
const GUIDE_SHOWN_KEY = 'nodeEditorOnboardingShown'

const showOnFirstHomeMount = (() => {
  try {
    const navigation = performance.getEntriesByType('navigation')[0]
    if (navigation?.type === 'reload') return true
    return sessionStorage.getItem(GUIDE_SHOWN_KEY) !== '1'
  } catch {
    return true
  }
})()

// 同一次页面加载内，SPA 返回首页时不再展示
let guideShownInThisPageLoad = false

function buildPath(start, end) {
  const dx = end.x - start.x
  const dy = end.y - start.y

  if (dx > 0 && dx >= Math.abs(dy)) {
    const bend = dx * 0.5
    return `M ${start.x} ${start.y} C ${start.x + bend} ${start.y}, ${end.x - bend} ${end.y}, ${end.x} ${end.y}`
  }

  const bend = dy * 0.5
  return `M ${start.x} ${start.y} C ${start.x} ${start.y + bend}, ${end.x} ${end.y - bend}, ${end.x} ${end.y}`
}

export default function NodeEditorOnboarding() {
  const frameRef = useRef(null)
  const [layout, setLayout] = useState(null)
  const [closed, setClosed] = useState(
    () => guideShownInThisPageLoad || !showOnFirstHomeMount
  )

  const measure = useCallback(() => {
    const target = document.querySelector('[data-guide="nodeEditor"]')
    const frame = frameRef.current
    if (!target || !frame) return

    const t = target.getBoundingClientRect()
    const m = frame.getBoundingClientRect()
    if (!t.width || !m.width) return

    const vw = window.innerWidth
    const vh = window.innerHeight
    if (t.bottom <= 0 || t.top >= vh || t.right <= 0 || t.left >= vw) return

    const hole = {
      top: Math.max(0, t.top - HOLE_PADDING),
      left: Math.max(0, t.left - HOLE_PADDING),
      right: Math.min(vw, t.right + HOLE_PADDING),
      bottom: Math.min(vh, t.bottom + HOLE_PADDING),
    }

    const horizontal = m.left - t.right > 60
    const start = horizontal
      ? { x: hole.right, y: t.top + t.height * 0.55 }
      : { x: t.left + t.width * 0.5, y: hole.bottom }
    const end = horizontal
      ? { x: m.left - 6, y: m.top + m.height * 0.5 }
      : { x: m.left + m.width * 0.5, y: m.top - 6 }

    setLayout({
      viewport: { w: vw, h: vh },
      hole,
      path: buildPath(start, end),
    })
  }, [])

  // 标记已展示：同一次页面加载内 SPA 返回首页、或从其他页面整页跳回首页都不再出现
  useLayoutEffect(() => {
    guideShownInThisPageLoad = true
    try {
      sessionStorage.setItem(GUIDE_SHOWN_KEY, '1')
    } catch {
      // 存储不可用时忽略，不影响本次展示
    }
  }, [])

  // 先锁定滚动（可能改变滚动条宽度/页面居中位置），再测量目标与弹窗位置
  useLayoutEffect(() => {
    if (closed) return undefined

    // 刷新时浏览器会恢复上次滚动位置，先回到顶部，保证目标卡片处于可视区域
    window.scrollTo(0, 0)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [closed])

  useLayoutEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  useEffect(() => {
    if (closed) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setClosed(true)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [closed])

  if (closed) return null

  const close = () => setClosed(true)
  const holeHeight = layout ? layout.hole.bottom - layout.hole.top : 0

  return createPortal(
    <div className="guide-root">
      {layout && (
        <>
          <div
            className="guide-blur guide-blur-top"
            onClick={close}
            style={{ height: layout.hole.top }}
          />
          <div
            className="guide-blur guide-blur-bottom"
            onClick={close}
            style={{ top: layout.hole.bottom, height: `calc(100% - ${layout.hole.bottom}px)` }}
          />
          <div
            className="guide-blur guide-blur-left"
            onClick={close}
            style={{
              top: layout.hole.top,
              left: 0,
              width: layout.hole.left,
              height: holeHeight,
            }}
          />
          <div
            className="guide-blur guide-blur-right"
            onClick={close}
            style={{
              top: layout.hole.top,
              left: layout.hole.right,
              width: `calc(100% - ${layout.hole.right}px)`,
              height: holeHeight,
            }}
          />
          <div
            className="guide-target-ring"
            style={{
              top: layout.hole.top,
              left: layout.hole.left,
              width: layout.hole.right - layout.hole.left,
              height: holeHeight,
            }}
          />
          <svg
            className="guide-line"
            viewBox={`0 0 ${layout.viewport.w} ${layout.viewport.h}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path className="guide-line-glow" d={layout.path} />
            <path className="guide-line-dash" d={layout.path} />
            <circle className="guide-dot" r="5" key={layout.path}>
              <animateMotion dur="1.8s" repeatCount="indefinite" path={layout.path} />
            </circle>
          </svg>
        </>
      )}

      <div className="guide-modal-frame" ref={frameRef}>
        <div className="guide-modal" onClick={(event) => event.stopPropagation()}>
          <div className="guide-modal-head">
            <h2 className="guide-modal-title">画布工具</h2>
            <button type="button" className="guide-close" onClick={close} aria-label="关闭引导">
              ×
            </button>
          </div>
          <ul className="guide-list">
            <li>支持多noise节点黑白效果混合；</li>
            <li>支持无缝贴图导出：【无缝贴图】节点；</li>
            <li>支持黑白转成法线并导出：【黑白转法线】节点；</li>
            <li>类似Unity Shader Graph、ASE、UE材质节点操作；</li>
          </ul>
          <div className="guide-actions">
            <p className="guide-hint">点击模糊区域或按 Esc 关闭引导</p>
            <Link to="/nodeEditor" className="guide-cta">去看看</Link>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
