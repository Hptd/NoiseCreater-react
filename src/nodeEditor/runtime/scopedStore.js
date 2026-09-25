// 每个噪波节点一份独立 store，用 <Provider> 作用域隔离，
// 从而原样复用现有的 NoiseCommonProps 与 50 个专属参数组件（它们都靠 useDispatch/useSelector 就地解析）。
import { configureStore } from '@reduxjs/toolkit'
import { noiseCommonParams } from '../../features/NoiseCommonParamsSlice.js'
import { NOISE_SLICES, getCommonDefaults } from './noiseSliceRegistry.js'

export function nodeSliceKey(noiseName) {
  return `${noiseName}Props`
}

// 依据节点保存的参数构造 preloadedState，使界面/渲染还原到文件中的值。
export function preloadedStateFor(noiseName, params, commonParams) {
  const state = { noiseCommonProps: { ...getCommonDefaults(), ...(commonParams || {}) } }
  const sliceKey = nodeSliceKey(noiseName)
  if (NOISE_SLICES[sliceKey]) state[sliceKey] = { ...NOISE_SLICES[sliceKey](undefined, { type: '@@init' }), ...(params || {}) }
  return state
}

export function createNodeStore(noiseName, params, commonParams) {
  const reducer = { noiseCommonProps: noiseCommonParams.reducer }
  const sliceKey = nodeSliceKey(noiseName)
  if (NOISE_SLICES[sliceKey]) reducer[sliceKey] = NOISE_SLICES[sliceKey]
  return configureStore({
    reducer,
    preloadedState: preloadedStateFor(noiseName, params, commonParams),
  })
}

export function readNodeParams(store, noiseName) {
  const sliceKey = nodeSliceKey(noiseName)
  if (!NOISE_SLICES[sliceKey]) return {}
  return store.getState()[sliceKey]
}

export function readCommonParams(store) {
  return store.getState().noiseCommonProps
}
