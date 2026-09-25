// 节点分类图标（非噪波菜单项的 Logo）。
const ICONS = {
  Input: (
    <>
      <rect x="4" y="7" width="12" height="10" rx="2" />
      <path d="M4 11h8" />
      <path d="M12 9l2 2-2 2" />
    </>
  ),
  Math: (
    <>
      <path d="M6 6h6" />
      <path d="M9 6v12" />
      <path d="M6 12h6" />
    </>
  ),
  Channel: (
    <>
      <rect x="4" y="5" width="12" height="4" rx="1" />
      <rect x="4" y="10" width="12" height="4" rx="1" />
      <rect x="4" y="15" width="12" height="4" rx="1" />
    </>
  ),
  Artistic: (
    <>
      <circle cx="10" cy="10" r="6" />
      <path d="M10 4a6 6 0 0 1 0 12z" fill="currentColor" opacity="0.35" />
    </>
  ),
  Normal: (
    <>
      <path d="M5 17L15 5" />
      <path d="M15 5h-4" />
      <path d="M15 5v4" />
      <path d="M4 17h12" opacity="0.5" />
    </>
  ),
  UV: (
    <>
      <rect x="4" y="4" width="12" height="12" rx="1" />
      <path d="M4 10h12" />
      <path d="M10 4v12" />
    </>
  ),
  Shape: (
    <>
      <rect x="4" y="4" width="12" height="12" rx="1" opacity="0.5" />
      <circle cx="12" cy="12" r="4" />
    </>
  ),
  Utility: (
    <>
      <path d="M2 10s3-5 8-5 8 5 8 5-3 5-8 5-8-5-8-5z" />
      <circle cx="10" cy="10" r="2" />
    </>
  ),
  Output: (
    <>
      <rect x="3" y="5" width="9" height="10" rx="1" />
      <path d="M12 10h5" />
      <path d="M15 7l3 3-3 3" />
    </>
  ),
}

export default function NodeIcon({ category }) {
  return (
    <svg className="nc-palette-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      {ICONS[category] || ICONS.Utility}
    </svg>
  )
}
