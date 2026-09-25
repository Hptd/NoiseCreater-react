// 从节点定义创建图节点实例（含默认参数）。
import { getDefaultParams } from '../graph/nodeRegistry.js'
import { getNoiseDefaults, getCommonDefaults } from '../runtime/noiseSliceRegistry.js'
import { createNodeId, createEdgeId } from '../graph/ncgraph.js'

export function defaultParamsFor(def) {
  if (!def) return {}
  if (def.type === 'noise') return getNoiseDefaults(def.noiseName)
  return getDefaultParams(def)
}

// 返回可放入 React Flow node.data 的对象（不含 position）。
export function createGraphNode(def, position) {
  const data = {
    type: def.type,
    op: def.op,
    label: def.label,
    params: defaultParamsFor(def),
  }
  if (def.type === 'noise') {
    data.noiseName = def.noiseName
    data.commonParams = getCommonDefaults()
  }
  return { id: createNodeId(def.type === 'noise' ? 'nz' : 'n'), type: 'ncNode', position, data }
}

export function toRFEdge(graphEdge) {
  return {
    id: graphEdge.id,
    source: graphEdge.from.node,
    sourceHandle: graphEdge.from.port,
    target: graphEdge.to.node,
    targetHandle: graphEdge.to.port,
  }
}

export function newEdgeId() {
  return createEdgeId()
}
