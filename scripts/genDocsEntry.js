// 文档生成器入口（供 scripts/gen-node-docs.mjs 用 esbuild 打包后取数据）。
import { NODE_DEFS } from '../src/nodeEditor/graph/nodeRegistry.js'
import { NOISE_DEFS } from '../src/nodeEditor/graph/noiseCatalog.js'
import { nodeDocSlug } from '../src/nodeEditor/graph/nodeDocSlug.js'
import { getNoiseDefaults } from '../src/nodeEditor/runtime/noiseSliceRegistry.js'
import { NODE_LABEL_ZH, CATEGORY_ZH, tNode, tParam, setLang } from '../src/nodeEditor/i18n/index.js'

export { NODE_DEFS, NOISE_DEFS, nodeDocSlug, getNoiseDefaults, NODE_LABEL_ZH, CATEGORY_ZH, tNode, tParam, setLang }
