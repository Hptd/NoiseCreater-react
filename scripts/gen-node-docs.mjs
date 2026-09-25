// 为所有节点生成帮助说明文件（Markdown）与索引，输出到 public/nodeDocument/。
// 运行：node scripts/gen-node-docs.mjs
import { build } from 'esbuild'
import { pathToFileURL } from 'node:url'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const root = process.cwd()
const outModule = path.join(os.tmpdir(), 'nc-docs-data.mjs')
await build({
  entryPoints: [path.join(root, 'scripts', 'genDocsEntry.js')],
  bundle: true, platform: 'node', format: 'esm', outfile: outModule, logLevel: 'silent',
})
const data = await import(pathToFileURL(outModule).href)
const { NODE_DEFS, NOISE_DEFS, nodeDocSlug, getNoiseDefaults, CATEGORY_ZH, tNode, tParam, setLang } = data
setLang('zh')

const OUT_DIR = path.join(root, 'public', 'nodeDocument')

// 各节点功能介绍（key = `${type}:${op}`）
const DESC = {
  'constant:constant': '输出一个固定数值（广播到 RGBA 各通道），可作为其它节点未连线输入的常量。',
  'constant:integer': '输出一个固定整数。',
  'constant:slider': '带范围约束的数值常量，用于手动调节。',
  'constant:color': '颜色常量，输出该 RGB 颜色图像。',
  'constant:time': '输出全局动画时间（秒），用于驱动数学节点做时间动画。',
  'constant:vector2': '输出二维向量常量。',
  'constant:vector3': '输出三维向量常量。',
  'gradient:gradient': '生成横向渐变色带，可自定义色标。',
  'gradient:sampleGradient': '按输入灰度值在渐变上采样颜色。',
  'math:add': '两个输入逐通道相加。',
  'math:subtract': 'A 减 B。',
  'math:multiply': '两个输入逐通道相乘。',
  'math:divide': 'A 除以 B。',
  'math:power': '以 A 为底、B 为指数求幂。',
  'math:sqrt': '逐通道平方根。',
  'math:absolute': '取绝对值。',
  'math:exponential': '自然指数 e^x。',
  'math:length': '计算向量长度并输出为灰度。',
  'math:log': '以指定底数求对数。',
  'math:modulo': 'A 对 B 取模。',
  'math:negate': '取负。',
  'math:normalize': '归一化向量（保持方向、长度为 1）。',
  'math:posterize': '按色阶数把颜色分级，产生色块效果。',
  'math:reciprocal': '取倒数 1/x。',
  'math:root': '对输入开 n 次方。',
  'math:sign': '取符号（-1 / 0 / 1）。',
  'math:ddx': '屏幕空间 X 方向偏导。',
  'math:ddy': '屏幕空间 Y 方向偏导。',
  'math:ddxy': 'X/Y 方向偏导绝对值之和。',
  'math:lerp': '按系数 t 在 A、B 之间线性插值。',
  'math:inverseLerp': '求 t 在 A、B 区间中的归一化位置。',
  'math:smoothstep': '在起始/结束边缘之间做平滑过渡。',
  'math:clamp': '把值钳制到最小/最大范围。',
  'math:fraction': '取小数部分。',
  'math:maximum': '逐通道取较大值。',
  'math:minimum': '逐通道取较小值。',
  'math:oneMinus': '计算 1 − x。',
  'math:randomRange': '由种子生成范围内伪随机值。',
  'math:remap': '把输入区间映射到输出区间。',
  'math:saturate': '把值限制在 0–1。',
  'math:ceiling': '向上取整。',
  'math:floor': '向下取整。',
  'math:round': '四舍五入。',
  'math:arccosine': '反余弦。',
  'math:arcsine': '反正弦。',
  'math:arctangent': '反正切。',
  'math:arctangent2': '双参反正切 atan(A, B)。',
  'math:cosine': '余弦。',
  'math:sine': '正弦。',
  'math:tangent': '正切。',
  'math:degreesToRadians': '角度转弧度。',
  'math:radiansToDegrees': '弧度转角度。',
  'channel:combine': '把四路灰度分别作为 R/G/B/A 合成一张图像。',
  'channel:split': '把输入图像拆分为 R/G/B/A 四路灰度输出。',
  'channel:flip': '按开关翻转（1−x）指定通道。',
  'channel:swizzle': '重排通道顺序（例如 RGB→BGR）。',
  'artistic:contrast': '调整对比度。',
  'artistic:hue': '旋转色相。',
  'artistic:invertColors': '颜色取反。',
  'artistic:saturation': '调整饱和度。',
  'artistic:luma': '按亮度把彩色转黑白。',
  'artistic:blend': '按所选模式混合两张图，可加遮罩与整体不透明度。',
  'artistic:channelMask': '按通道开关保留或屏蔽通道。',
  'artistic:colorMask': '保留与指定颜色接近的像素，其余变黑。',
  'normal:fromHeight': '由灰度高度图计算法线贴图。',
  'normal:strength': '调整法线强度（X/Y 可分别控制）。',
  'normal:blend': '按 Whiteout 等算法叠加两张法线贴图。',
  'uv:uv': '生成 UV 渐变图（R = u，G = v）。',
  'uv:polar': '极坐标变换，把直角坐标重采样为角度/半径。',
  'uv:radialShear': '径向切变，越远离中心偏移越大。',
  'uv:tilingOffset': '对输入图像做平铺与偏移。',
  'uv:twirl': '绕中心做旋涡扭曲。',
  'shape:ellipse': '生成椭圆形状遮罩。',
  'shape:rectangle': '生成矩形遮罩。',
  'shape:roundedRectangle': '生成圆角矩形遮罩。',
  'shape:polygon': '生成正多边形遮罩。',
  'utility:preview': '预览输入图像，可选择 128 / 256 / 512 的显示与采样尺寸。',
  'output:output': '最终输出节点，控制分辨率与透明通道，并用于导出 PNG。',
}

const INPUT_ROLE = {
  in: '输入图像',
  base: '底层（base）图像',
  blend: '混合层（blend）图像',
  mask: '遮罩（mask）图像，可选',
  r: '红通道输入（取灰度）',
  g: '绿通道输入（取灰度）',
  b: '蓝通道输入（取灰度）',
  a: '透明通道输入（取灰度）',
}

// 同名输入在不同节点下的语义不同（如数学的 a/b 与通道的 r/g/b/a）
function inputRole(def, name) {
  if (def.type === 'math') return name === 'a' ? 'A 输入' : name === 'b' ? 'B 输入' : (INPUT_ROLE[name] || `${name} 输入`)
  if (def.type === 'normal' && def.op === 'blend') {
    return name === 'a' ? '底层法线图' : name === 'b' ? '细节层法线图' : (INPUT_ROLE[name] || `${name} 输入`)
  }
  return INPUT_ROLE[name] || `${name} 输入`
}

const USAGE_BY_CATEGORY = {
  Input: '拖入画布后设置数值 / 颜色；也可作为数据节点连接到节点的参数端口，用于外部驱动参数。',
  Math: '把图像或数值连到输入端口；未连线的端口使用面板中的常量。',
  Channel: '连接输入图像后按参数调整。',
  Artistic: '连接输入图像后按参数调整效果。',
  Normal: '连接高度图 / 法线图后按参数调整。',
  UV: '连接输入图像后按坐标变换参数调整。',
  Shape: '无需输入，直接生成形状遮罩，可再接到混合等节点。',
  Utility: '把需要查看的图像连到输入端口。',
  Output: '把最终结果连到输入端口，设置分辨率与透明通道后导出 PNG。',
}

const NOISE_USAGE = '从左侧菜单拖入画布即可生成图案，无需输入图像；在右侧参数面板调节公共参数（尺寸 / 位移 / 缩放 / 明暗 / 反相 / 动画等）与专属参数。'

function fmtDefault(v) {
  if (Array.isArray(v)) return v.join(', ')
  if (v && typeof v === 'object') return JSON.stringify(v)
  if (typeof v === 'boolean') return v ? 'true' : 'false'
  return String(v)
}

function renderInputs(def) {
  if (!def.inputs || def.inputs.length === 0) return '无图像输入。\n'
  return def.inputs.map(input => {
    const role = inputRole(def, input.name)
    const inline = input.inline ? '；未连线时使用面板常量' : ''
    return `- **${input.name}**：${role}${inline}`
  }).join('\n') + '\n'
}

function renderOutputs(def) {
  if (!def.outputs || def.outputs.length === 0) return '无输出。\n'
  return def.outputs.map(port => `- **${port}**：图像输出（RGBA）`).join('\n') + '\n'
}

function renderParams(def) {
  const lines = []
  for (const spec of def.params || []) {
    lines.push(`- ${tParam(def, spec)}（${spec.name}）：默认 ${fmtDefault(spec.default)}`)
  }
  return lines.length ? lines.join('\n') + '\n' : '无专属参数。\n'
}

function nonNoiseDoc(def) {
  const key = `${def.type}:${def.op}`
  const title = tNode(def)
  const en = def.label !== title ? `（${def.label}）` : ''
  const category = CATEGORY_ZH[def.category] || def.category
  const usage = USAGE_BY_CATEGORY[def.category] || '连接输入后按参数调整。'
  return `# ${title}${en}

- 分类：${category}
- 英文标识：${key}

## 功能介绍
${DESC[key] || def.label}

## 如何使用
${usage}

## 输入
${renderInputs(def)}
## 输出
${renderOutputs(def)}
## 参数
${renderParams(def)}`
}

function noiseDoc(def) {
  return `# ${def.label}

- 分类：噪声
- 英文标识：noise:${def.noiseName}

## 功能介绍
生成「${def.label}」噪波图案。

## 如何使用
${NOISE_USAGE}

## 输入
无图像输入（噪波自生成）。公共参数（噪波尺寸 / 横向位移 / 纵向位移 / 横向尺寸 / 纵向尺寸 / 整体明暗 / 颜色取反 / Alpha / 动画）由节点面板统一控制。

## 输出
- **out**：图像输出（RGBA）

## 参数
${Object.entries(getNoiseDefaults(def.noiseName)).map(([k, v]) => `- ${k}：默认 ${fmtDefault(v)}`).join('\n') || '无专属参数。'}
`
}

fs.mkdirSync(OUT_DIR, { recursive: true })
for (const f of fs.readdirSync(OUT_DIR)) if (f.endsWith('.md')) fs.rmSync(path.join(OUT_DIR, f))

const index = []
for (const def of NODE_DEFS) {
  const slug = nodeDocSlug(def)
  fs.writeFileSync(path.join(OUT_DIR, `${slug}.md`), nonNoiseDoc(def), 'utf8')
  index.push({ slug, type: def.type, op: def.op, en: def.label, category: def.category, title: tNode(def) })
}
for (const def of NOISE_DEFS) {
  const slug = nodeDocSlug(def)
  fs.writeFileSync(path.join(OUT_DIR, `${slug}.md`), noiseDoc(def), 'utf8')
  index.push({ slug, type: 'noise', op: def.noiseName, noiseName: def.noiseName, en: def.label, category: 'Noise', title: def.label })
}
fs.writeFileSync(path.join(OUT_DIR, 'index.json'), JSON.stringify(index, null, 1), 'utf8')
console.log(`已生成 ${index.length} 个节点说明文件 -> public/nodeDocument/`)
