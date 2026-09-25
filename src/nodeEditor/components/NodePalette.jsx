// 节点菜单：按分类列出全部节点类型（噪波由 noiseList.json 派生）。
import { useMemo, useState } from 'react'
import { NODE_CATEGORIES, NODE_DEFS } from '../graph/nodeRegistry.js'
import { NOISE_DEFS } from '../graph/noiseCatalog.js'
import NodeIcon from './NodeIcon.jsx'
import { useLang, tNode, tCategory, nodeSearchText } from '../i18n/index.js'

const ALL_CATEGORIES = [...NODE_CATEGORIES, 'Noise']

// 输出节点全局唯一且不可删除，任何模式下都不出现在菜单里。
// connectMode（拖到空白创建）：只列可接收图像输入的节点，且不含 Noise 分类。
function buildGroups(connectMode) {
  // connectMode（拖到空白创建）：Utility/Preview 置顶；其余模式保持原分类顺序。
  const categories = connectMode
    ? ['Utility', ...NODE_CATEGORIES.filter(c => c !== 'Utility')]
    : ALL_CATEGORIES
  return categories.map(category => ({
    category,
    defs: (category === 'Noise' ? NOISE_DEFS : NODE_DEFS.filter(d => d.category === category))
      .filter(d => d.type !== 'output' && (!connectMode || (d.inputs?.length || 0) > 0)),
  })).filter(g => g.defs.length > 0)
}

export default function NodePalette({ onAdd, onClose, connectMode = false }) {
  const [query, setQuery] = useState('')
  const [openCategory, setOpenCategory] = useState(connectMode ? '' : 'Noise')
  useLang()
  const groups = useMemo(() => buildGroups(connectMode), [connectMode])

  const keyword = query.trim().toLowerCase()
  const searching = keyword.length > 0
  const filtered = searching
    ? groups
      .map(g => ({ ...g, defs: g.defs.filter(d => nodeSearchText(d).includes(keyword)) }))
      .filter(g => g.defs.length > 0)
    : groups

  return (
    <div className="nc-palette">
      <div className="nc-palette-head">
        <input
          className="nc-palette-search"
          placeholder="搜索节点…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          autoFocus
        />
        <button className="nc-btn" onClick={onClose}>关闭</button>
      </div>
      <div className="nc-palette-body">
        {filtered.map(group => (
          <div className="nc-palette-group" key={group.category}>
            <button
              className="nc-palette-category"
              onClick={() => setOpenCategory(openCategory === group.category ? '' : group.category)}
            >
              {openCategory === group.category ? '▾' : '▸'} {tCategory(group.category)} ({group.defs.length})
            </button>
            {(connectMode || searching || openCategory === group.category) && (
              group.category === 'Noise' ? (
                <div className="nc-palette-noise-grid">
                  {group.defs.map(def => (
                    <button
                      className="nc-palette-noise"
                      key={`${def.type}:${def.op}`}
                      onClick={() => onAdd(def)}
                      title={def.label}
                    >
                      {def.imgSrc
                        ? <img src={def.imgSrc} alt="" draggable={false} />
                        : <span className="nc-palette-noise-ph" />}
                      <span className="nc-palette-noise-name">{tNode(def)}</span>                    </button>
                  ))}
                </div>
              ) : (
                <div className="nc-palette-node-grid">
                  {group.defs.map(def => (
                    <button
                      className="nc-palette-node"
                      key={`${def.type}:${def.op}`}
                      onClick={() => onAdd(def)}
                      title={`${tNode(def)} (${def.op})`}
                    >
                      <NodeIcon category={def.category} />
                      <span className="nc-palette-node-name">{tNode(def)}</span>
                    </button>
                  ))}
                </div>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
