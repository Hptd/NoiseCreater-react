// 从 src/app/store.js 自动生成 noiseSliceRegistry.js（勿手改生成物）。
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const storePath = path.join(root, 'src', 'app', 'store.js')
const outPath = path.join(root, 'src', 'nodeEditor', 'runtime', 'noiseSliceRegistry.js')

const text = fs.readFileSync(storePath, 'utf8')

const imports = new Map()
const importRe = /import\s*\{\s*(\w+)\s*\}\s*from\s*['"]([^'"]+)['"]/g
let m
while ((m = importRe.exec(text))) {
  imports.set(m[1], m[2])
}

const entries = []
const entryRe = /(\w+):\s*(\w+)\.reducer/g
while ((m = entryRe.exec(text))) {
  entries.push({ key: m[1], exporter: m[2] })
}

if (!entries.length) {
  console.error('未从 store.js 解析到任何 slice')
  process.exit(1)
}

function toRuntimePath(storeRelative) {
  let p = storeRelative.replace(/^\.\//, '')
  if (p.startsWith('../')) p = '../' + p
  if (!p.endsWith('.js')) p += '.js'
  return p
}

const usedExporters = [...new Set(entries.map(e => e.exporter))]
const importLines = usedExporters
  .map(name => {
    const from = imports.get(name)
    if (!from) throw new Error(`找不到 ${name} 的 import 路径`)
    return `import { ${name} } from '${toRuntimePath(from)}'`
  })
  .join('\n')

const mapLines = entries
  .map(e => `  ${JSON.stringify(e.key)}: ${e.exporter}.reducer,`)
  .join('\n')

const out = `// 自动生成，勿手改。来源：scripts/gen-noise-slice-registry.mjs
${importLines}

const INIT = { type: '@@noiseEditor/init' }

// 节点级公共参数（output 级参数不进节点面板）
export const NODE_LEVEL_COMMON_KEYS = [
  'noiseUvSize', 'noiseOffsetU', 'noiseOffsetV', 'noiseScaleU', 'noiseScaleV',
  'noiseBright', 'noiseInvert', 'noiseAlphaChannel', 'noiseAnimationOC',
]

export const NOISE_SLICES = {
${mapLines}
}

export function getNoiseDefaults(noiseName) {
  const reducer = NOISE_SLICES[noiseName + 'Props']
  return reducer ? reducer(undefined, INIT) : {}
}

export function getCommonDefaults() {
  const full = noiseCommonParams.reducer(undefined, INIT)
  const out = {}
  for (const key of NODE_LEVEL_COMMON_KEYS) out[key] = full[key]
  // 节点编辑器默认静态：新节点的动画开关为关，需要时在节点面板手动开启。
  out.noiseAnimationOC = false
  return out
}
`

fs.mkdirSync(path.dirname(outPath), { recursive: true })
fs.writeFileSync(outPath, out, 'utf8')
console.log(`已生成 ${path.relative(root, outPath)}（${entries.length} 个 slice）`)
