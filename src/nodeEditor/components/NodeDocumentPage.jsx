// 节点帮助文档页：/nodeDocument 列出全部节点，/nodeDocument/:slug 展示单个节点说明。
// 说明文件为 public/nodeDocument/*.md，静态访问、零后端。
import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './nodeDocument.css'

function inline(text, keyPrefix = 'i') {
  const parts = []
  const re = /(\*\*([^*]+)\*\*|`([^`]+)`)/g
  let last = 0
  let m
  let k = 0
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    if (m[2] !== undefined) parts.push(<strong key={`${keyPrefix}-b${k++}`}>{m[2]}</strong>)
    else parts.push(<code key={`${keyPrefix}-c${k++}`}>{m[3]}</code>)
    last = re.lastIndex
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts
}

function renderMarkdown(md) {
  const nodes = []
  let list = []
  let key = 0
  const flush = () => {
    if (!list.length) return
    nodes.push(<ul key={`ul-${key++}`}>{list.map((t, i) => <li key={i}>{inline(t, `li-${key}-${i}`)}</li>)}</ul>)
    list = []
  }
  for (const raw of md.split('\n')) {
    const line = raw.replace(/\s+$/, '')
    if (line.startsWith('## ')) { flush(); nodes.push(<h2 key={`h2-${key++}`}>{inline(line.slice(3))}</h2>) }
    else if (line.startsWith('# ')) { flush(); nodes.push(<h1 key={`h1-${key++}`}>{inline(line.slice(2))}</h1>) }
    else if (line.startsWith('- ')) { list.push(line.slice(2)) }
    else if (line.trim() === '') { flush() }
    else { flush(); nodes.push(<p key={`p-${key++}`}>{inline(line)}</p>) }
  }
  flush()
  return nodes
}

function DocIndex() {
  const [items, setItems] = useState(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    let alive = true
    fetch('/nodeDocument/index.json')
      .then(res => res.json())
      .then(data => { if (alive) setItems(data) })
      .catch(() => { if (alive) setItems([]) })
    return () => { alive = false }
  }, [])

  const groups = useMemo(() => {
    if (!items) return []
    const kw = query.trim().toLowerCase()
    const filtered = kw
      ? items.filter(it => `${it.title} ${it.en} ${it.slug}`.toLowerCase().includes(kw))
      : items
    const map = new Map()
    for (const it of filtered) {
      if (!map.has(it.category)) map.set(it.category, [])
      map.get(it.category).push(it)
    }
    return [...map.entries()]
  }, [items, query])

  return (
    <div className="nc-doc-page">
      <header className="nc-doc-top">
        <h1>节点帮助文档</h1>
        <Link className="nc-doc-btn" to="/nodeEditor">返回节点编辑器</Link>
      </header>
      <input
        className="nc-doc-search"
        placeholder="搜索节点…"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      {!items && <p className="nc-doc-muted">加载中…</p>}
      {items && groups.length === 0 && <p className="nc-doc-muted">没有匹配的节点</p>}
      {groups.map(([category, list]) => (
        <section key={category} className="nc-doc-group">
          <h2>{category}</h2>
          <div className="nc-doc-grid">
            {list.map(it => (
              <Link key={it.slug} className="nc-doc-card" to={`/nodeDocument/${it.slug}/`}>
                <span className="nc-doc-card-title">{it.title}</span>
                <span className="nc-doc-card-en">{it.en}</span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

function DocDetail({ slug }) {
  const [state, setState] = useState({ status: 'loading', text: '' })

  useEffect(() => {
    let alive = true
    setState({ status: 'loading', text: '' })
    fetch(`/nodeDocument/${slug}.md`)
      .then(res => {
        if (!res.ok) throw new Error(String(res.status))
        return res.text()
      })
      .then(text => { if (alive) setState({ status: 'ok', text }) })
      .catch(() => { if (alive) setState({ status: 'missing', text: '' }) })
    return () => { alive = false }
  }, [slug])

  return (
    <div className="nc-doc-page">
      <header className="nc-doc-top">
        <Link className="nc-doc-btn" to="/nodeDocument/">← 文档目录</Link>
        <Link className="nc-doc-btn" to="/nodeEditor">返回节点编辑器</Link>
      </header>
      {state.status === 'loading' && <p className="nc-doc-muted">加载中…</p>}
      {state.status === 'missing' && <p className="nc-doc-muted">未找到该节点的说明文档。</p>}
      {state.status === 'ok' && <article className="nc-doc-article">{renderMarkdown(state.text)}</article>}
    </div>
  )
}

export default function NodeDocumentPage() {
  const { slug } = useParams()
  return slug ? <DocDetail slug={slug} /> : <DocIndex />
}
