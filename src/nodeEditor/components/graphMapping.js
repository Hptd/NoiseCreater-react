// 图模型 <-> React Flow 的纯函数转换，以及数据节点取值的纯逻辑。
import { hexToRgb } from '../runtime/uniforms.js'
import { toRFEdge } from './nodeFactory.js'

// React Flow 节点/边 -> .ncgraph 的图模型
export function toGraphModel(nodes, edges, meta) {
  return {
    meta,
    nodes: nodes.map(n => ({
      id: n.id,
      type: n.data.type,
      op: n.data.op,
      noiseName: n.data.noiseName,
      label: n.data.label,
      position: n.position,
      params: n.data.params,
      commonParams: n.data.commonParams,
    })),
    edges: edges.map(e => ({
      id: e.id,
      from: { node: e.source, port: e.sourceHandle },
      to: { node: e.target, port: e.targetHandle },
    })),
  }
}

// .ncgraph -> React Flow 节点/边
export function graphToRF(graph) {
  return {
    nodes: graph.nodes.map(n => ({
      id: n.id,
      type: 'ncNode',
      position: n.position,
      data: {
        type: n.type, op: n.op, noiseName: n.noiseName, label: n.label,
        params: n.params, commonParams: n.commonParams, error: n.error,
      },
    })),
    edges: graph.edges.map(toRFEdge),
  }
}

// 数据节点 CPU 侧的值 -> 标量（噪声参数端口只接受数值）
export function toScalar(value) {
  if (typeof value === 'number') return value
  if (Array.isArray(value)) return Number(value[0]) || 0
  if (value && typeof value === 'object' && 'x' in value) {
    return 0.2126 * value.x + 0.7152 * value.y + 0.0722 * value.z
  }
  return Number(value) || 0
}

// 数据节点在 CPU 侧持有的原始值
export function dataNodeValue(node, time) {
  const p = node.data.params || {}
  switch (node.data.op) {
    case 'time': return time
    case 'color': return hexToRgb(p.value)
    case 'vector2': return p.xy || [0, 0]
    case 'vector3': return p.xyz || [0, 0, 0]
    default: return Number(p.value) || 0
  }
}

// 是否需要在每帧推进全局时间（有动画噪波或 Time 节点）
export function graphAnimates(nodes) {
  return nodes.some(n => (n.data.type === 'noise' && n.data.commonParams?.noiseAnimationOC)
    || (n.data.type === 'constant' && n.data.op === 'time'))
}

// 计算节点实际生效状态：噪波节点叠加来自 `param:<name>` 端口的外部数据节点值。
// 公共参数（noiseUvSize 等）走 commonParams，专属参数走 params —— 两者的 uniform 来源不同。
export function resolveNodeState(node, allNodes, edges, time) {
  const params = { ...(node.data.params || {}) }
  const commonParams = { ...(node.data.commonParams || {}) }
  if (node.data.type !== 'noise') return { params, commonParams }
  for (const edge of edges) {
    if (edge.target !== node.id || !edge.targetHandle?.startsWith('param:')) continue
    const source = allNodes.find(n => n.id === edge.source)
    if (!source) continue
    const key = edge.targetHandle.slice(6)
    const value = toScalar(dataNodeValue(source, time))
    if (key in commonParams) commonParams[key] = value
    else params[key] = value
  }
  return { params, commonParams }
}
