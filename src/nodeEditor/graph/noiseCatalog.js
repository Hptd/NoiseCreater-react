// 噪波节点目录：从 noiseList.json 派生，增删噪波无需改这里。
// 节点名保留原始英文标识（routeHref 最后一段），不做中文翻译。
import noiseListInformations from '../../../public/mySQL/noiseList.json'
import { registerNoiseDefs } from './nodeRegistry.js'

export function deriveNoiseDefs(noiseList) {
  const byName = new Map()
  for (const item of noiseList || []) {
    const routeHref = item.routeHref || ''
    if (!routeHref.startsWith('noiseDetail/')) continue
    const noiseName = routeHref.split('/').pop()
    if (!noiseName) continue
    if (!byName.has(noiseName)) {
      byName.set(noiseName, {
        type: 'noise',
        op: noiseName,
        noiseName,
        label: item.title || noiseName,
        imgSrc: item.imgSrc || '',
        category: 'Noise',
        shader: 'noise',
        shaderPath: item.FragmentShaderPath,
        shaderPaths: [],
        inputs: [],
        outputs: ['out'],
        params: [],
      })
    }
    const def = byName.get(noiseName)
    if (item.FragmentShaderPath && !def.shaderPaths.includes(item.FragmentShaderPath)) {
      def.shaderPaths.push(item.FragmentShaderPath)
    }
  }
  return [...byName.values()]
}

export const NOISE_DEFS = deriveNoiseDefs(noiseListInformations)

registerNoiseDefs(NOISE_DEFS)
