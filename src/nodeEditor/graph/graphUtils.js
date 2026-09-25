// 节点图纯函数算法：拓扑排序 / 环检测。
// 不依赖 React / three / redux，可在 Node 中直接测试。

function endpointNode(endpoint) {
  return endpoint && typeof endpoint.node === 'string' ? endpoint.node : null
}

// 建立邻接表。忽略指向不存在节点的连线。
export function buildAdjacency(nodes, edges) {
  const nodeIds = new Set(nodes.map(n => n.id))
  const outgoing = new Map()
  const incoming = new Map()
  for (const id of nodeIds) {
    outgoing.set(id, [])
    incoming.set(id, [])
  }
  for (const edge of edges || []) {
    const from = endpointNode(edge && edge.from)
    const to = endpointNode(edge && edge.to)
    if (!from || !to) continue
    if (!nodeIds.has(from) || !nodeIds.has(to)) continue
    outgoing.get(from).push({ edge, node: to })
    incoming.get(to).push({ edge, node: from })
  }
  return { nodeIds, outgoing, incoming }
}

// Kahn 拓扑排序。有环时 order 只含能排出的节点，hasCycle 为 true。
export function topoSort(nodes, edges) {
  const { nodeIds, outgoing, incoming } = buildAdjacency(nodes, edges)
  const indegree = new Map()
  for (const id of nodeIds) indegree.set(id, incoming.get(id).length)

  const queue = []
  for (const id of nodeIds) {
    if (indegree.get(id) === 0) queue.push(id)
  }

  const order = []
  while (queue.length) {
    const v = queue.shift()
    order.push(v)
    for (const { node: w } of outgoing.get(v)) {
      const next = indegree.get(w) - 1
      indegree.set(w, next)
      if (next === 0) queue.push(w)
    }
  }
  return { order, hasCycle: order.length !== nodeIds.size }
}

// Tarjan 求强连通分量，精确返回“环上的节点”（不含仅下游的节点）。
export function findCycleNodes(nodes, edges) {
  const { nodeIds, outgoing } = buildAdjacency(nodes, edges)
  let index = 0
  const indices = new Map()
  const lowlink = new Map()
  const onStack = new Set()
  const stack = []
  const cycleNodes = new Set()

  function strongconnect(v) {
    indices.set(v, index)
    lowlink.set(v, index)
    index += 1
    stack.push(v)
    onStack.add(v)

    for (const { node: w } of outgoing.get(v)) {
      if (!indices.has(w)) {
        strongconnect(w)
        lowlink.set(v, Math.min(lowlink.get(v), lowlink.get(w)))
      } else if (onStack.has(w)) {
        lowlink.set(v, Math.min(lowlink.get(v), indices.get(w)))
      }
    }

    if (lowlink.get(v) === indices.get(v)) {
      const component = []
      let w
      do {
        w = stack.pop()
        onStack.delete(w)
        component.push(w)
      } while (w !== v)

      if (component.length > 1) {
        component.forEach(n => cycleNodes.add(n))
      } else if (outgoing.get(v).some(x => x.node === v)) {
        cycleNodes.add(v)
      }
    }
  }

  for (const id of nodeIds) {
    if (!indices.has(id)) strongconnect(id)
  }
  return cycleNodes
}
