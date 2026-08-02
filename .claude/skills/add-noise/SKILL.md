---
name: add-noise
description: 新增一个 GLSL noise 噪波到项目。当你提供新的 GLSL 着色器代码、已创建 public/glsl/<Noise>Fragment.js、或提到"新增噪波/新增noise/加一个shader/分析shader可调参数/查询某个noise的参数/调整参数"时使用。流程：分析shader可调参数 → 阻塞式交互确认参数增删改查 → 审核通过后修改源文件完成noise添加。
---

# 新增 Noise（add-noise）

## 流程总览

本 skill 分 4 步，第 ②③ 步会循环直到参数审核通过，未通过前**不得修改任何源文件**：

```
① 前置：读代码结构，掌握操作顺序
② 分析输入 shader，提取"可调整参数"候选
③ 阻塞式交互（AskUserQuestion）确认参数的增/删/改/查，循环直到通过
④ 审核通过 → 修改源文件完成 noise 新增
```

---

## ① 前置：了解代码结构与操作顺序

每次调用本 skill 都应重新读以下文件建立模式认知（代码可能已变化）：

- `public/mySQL/noiseList.json` — 条目字段、共享 routeHref 的例子（如 sampleNoise_A / _B 指向同一 `noiseDetail/sampleNoiseAB`）
- `src/components/MainCanvas.jsx` — 固定 uniform 组装、`PropsUniforms`/`FrameUniforms` 调用处、组件内本地 `hexToRgb`
- `src/canvasUniformFrame/PropsUniforms.js`、`src/canvasUniformFrame/FrameUniform.js` — switch case 骨架（**两处字段必须一致**）
- 挑 1 个简单例子（`src/features/VoroNoiseParamsSlice.js` + `src/components/noiseSpecialPropsComponents/VoroNoise.jsx`）和 1 个含颜色/布尔例子（`EyeParamsSlice.js` / `Eye.jsx`）
- `src/app/store.js`、`src/components/NoiseDetail.jsx`（SpecialComponentChoose 的 switch）
- `src/components/InputSlider.jsx` / `InputColor.jsx` / `InputCheck.jsx` / `InputLabel.jsx` 的 props 签名

### 操作顺序清单

有特性参数时全做；无特性参数时只做 1、2、可选 9（参照 `cloudNoise`）。

| # | 文件 | 动作 |
|---|---|---|
| 1 | `public/glsl/<NoiseName>Fragment.js` | （用户已提供）必要时为"提升常量"补 `uniform` 声明并替换硬编码值 |
| 2 | `public/mySQL/noiseList.json` | 末尾加条目 `{ id, imgSrc, title, routeHref: "noiseDetail/<noiseName>", FragmentShaderPath }` |
| 3 | `src/features/<NoiseName>ParamsSlice.js` | 新建专属参数 slice |
| 4 | `src/app/store.js` | import + `reducer` 加 `<noiseName>Props: ...reducer` |
| 5 | `src/components/noiseSpecialPropsComponents/<NoiseName>.jsx` | 新建专属参数 UI 组件 |
| 6 | `src/components/NoiseDetail.jsx` | SpecialComponentChoose 加 import + case |
| 7 | `src/canvasUniformFrame/PropsUniforms.js` | 加 case 初始化 uniform |
| 8 | `src/canvasUniformFrame/FrameUniform.js` | 加 case 逐帧更新 uniform |
| 9 | `public/images/xxx.png` | 缩略图（可选，缺图 404） |
| 10 | 路由 / 首页 | **无需改动**（动态路由 `/noiseDetail/:name` 已存在，首页自动从 noiseList 生成入口） |

### 命名约定（必须严格遵守）

- `noiseName` = `routeHref` 最后一段（如 `voroNoise`，小驼峰）。用户提供 shader 文件时由文件名推导（去掉 `Fragment` 后缀，首字母小写）或询问用户。
- Slice 文件 `<NoiseName>ParamsSlice.js`（首字母大写）；导出常量 `<noiseName>ParamsSlice`（小驼峰）；`name: "<noiseName>Params"`
- store key = `<noiseName>Props`。MainCanvas 用 `state[noiseName + "Props"]` 取值，**拼错就取不到**
- redux 字段 `noise<语义>`（小驼峰，如 `noiseDelicate`）；action `set<字段>`（如 `setNoiseDelicate`）
- shader uniform key = 短小驼峰（通常去掉 `noise` 前缀，如 `delicate`）；redux 字段与 uniform key 是**两套命名**，靠 PropsUniforms / FrameUniform 手写映射
- UI 中文标签与代码命名无关，简短语义即可
- 多个目录条目可共享同一 `routeHref`（如 sampleNoiseAB），共用同一组件与 slice，用 shader 内 uniform（如 `noiseChooseValue`）区分

---

## ② 分析 GLSL shader 的可调参数

输入形式：用户粘贴的 shader 代码 / 已存在的 `public/glsl/<Noise>Fragment.js` / 查询某个已存在 noise 的参数。若用户尚未提供 shader，先询问其粘贴代码或指定文件。

### 识别候选参数

1. **声明的 `uniform`**：GLSL 里 `uniform float/int/bool/vec2/vec3 xxx;` 声明（去掉固定公共 uniform）——直接候选，每个都映射一个可调参数。
2. **魔法数字**：main() 里的硬编码常量（如 `float f = 5.0;`、`vec3 col = vec3(...)`、迭代次数、`iTime * x` 的系数 x、`step(x)` / `smoothstep(x, y, ...)` 的阈值）——提升候选，可转为 uniform 让用户调。
3. **固定公共 uniform 不重复添加**：`uvScale / uvMoveX / uvMoveY / uvScaleX / uvScaleY / brightness / colorRev / useAlpha / iTime` 由 NoiseCommonProps 统一控制，不要当成专属参数；`iTime` 是帧动画时间，不由用户调。

### 每个候选参数要确定的元信息

| 项 | 说明 |
|---|---|
| redux 字段 | `noise` + 语义，小驼峰 |
| uniform key | 短小驼峰（通常去 noise 前缀） |
| 类型 | `float`→InputSlider / `bool`→InputCheck / `vec3` 颜色→InputColor（redux 存 `#rrggbb` hex 字符串） |
| 默认值 | 取 shader 当前硬编码值（提升常量时），或合理值 |
| 滑杆范围 | 对照同类参数惯例（次数 1~32、比例 0~1、坐标 -10~10、速度 0~5），不确定给合理宽范围 |
| UI 中文标签 | 简短中文语义 |

分析完把候选整理成表格（含上述元信息）展示在回复正文中。

---

## ③ 阻塞式交互确认参数（增/删/改/查）

**这是强制阻塞环节**：先在回复正文用表格完整列出候选参数，再调用 `AskUserQuestion`。每次循环都要先展示最新参数表再重问，用户未确认"全部通过"前不得改任何文件。

主确认问题（每次循环重新问，保持选项结构一致）：

```
question: "我建议把以下 N 个参数设为可调：<参数摘要>。确认吗？"
header: "参数确认"
multiSelect: false
options:
  - "全部确认，开始修改"（推荐）→ 进入步骤 ④
  - "修改参数"      → 修改默认值 / 范围 / 名称
  - "删除参数"      → 删掉部分参数
  - "增加参数"      → 把更多常量提升为可调 / 新增 uniform
```

分支处理：

- **修改参数**：再问一次 `AskUserQuestion`"要改哪个参数？"（把参数列表作为选项；超过 3 个时让用户用 Other 自由说明），随后问"改成什么？"（新默认值/范围/名称，用 Other 填写）。按答复更新参数表，回到主确认问题重问。
- **删除参数**：`AskUserQuestion`（multiSelect）列出参数让用户勾选要删的，更新参数表，回到主确认问题重问。
- **增加参数**：`AskUserQuestion` 问"要增加什么？"（选项可含"把 <某常量> 提升为可调"，或用户 Other 描述）。把新增项补进候选表（补齐类型/默认/范围/标签），回到主确认问题重问。
- 用户的详细修改指令（指定参数名、新默认值、新范围）通常出现在 Other 自由文本里，照做并更新参数表。
- **查询**（不改文件）：若用户只想"了解某个已有 noise 的可调参数"，按下方只读查询流程处理，不进入修改循环。

循环结束条件：用户选择"全部确认，开始修改"或明确表示参数就这些。

### 查询已有 noise 参数（只读，不修改）

读该 noise 的 slice + UI 组件 + Fragment shader，输出表格：`redux 字段 / uniform key / 类型 / 默认值 / 滑杆范围 / UI 标签`。只读报告即可，不进修改流程。

---

## ④ 审核通过后修改源文件

按"操作顺序清单"逐项落地。以 VoroNoise / Eye 为模板，**每加一个参数要同步写全 6 处**：

1. shader 声明 `uniform <type> <uniformKey>;` 并替换魔法数字（若提升常量）
2. slice：`initialState.<字段> = 默认值` + `set<字段>` reducer
3. store：`<noiseName>Props: <noiseName>ParamsSlice.reducer`
4. UI 组件：`<InputSlider/InputColor/InputCheck dispatchFunc={set<字段>} .../>`
5. `PropsUniforms.js` case：`<uniformKey>: { value: noiseSpecialProps.<字段> }`（颜色走 `hexToRgb`）
6. `FrameUniform.js` case：`material.current.uniforms.<uniformKey>.value = noiseSpecialProps.<字段>`（颜色走 `hexToRgb`）

### 代码模板（以 fooNoise / noiseBar / uniform bar 为例）

**Slice** `src/features/FooNoiseParamsSlice.js`：
```js
import { createSlice } from "@reduxjs/toolkit"
const initialState = { noiseBar: 1 }
function setReducer(state, action, key){ state[key] = action.payload }
export const fooNoiseParamsSlice = createSlice({
  name: "fooNoiseParams",
  initialState,
  reducers: { setNoiseBar: (state, action) => setReducer(state, action, "noiseBar") }
})
export const { setNoiseBar } = fooNoiseParamsSlice.actions
export default fooNoiseParamsSlice.reducer
```

**store** `src/app/store.js`：import + `fooNoiseProps: fooNoiseParamsSlice.reducer,`

**UI** `src/components/noiseSpecialPropsComponents/FooNoise.jsx`：
```jsx
import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import { setNoiseBar } from '../../features/FooNoiseParamsSlice'
export default function FooNoise() {
  const noiseProps = useSelector(state => state.fooNoiseProps)
  return (
    <div className="params-container">
      <InputSlider sliderName='某参数' minVal={0} maxVal={10} defaultInputValue={noiseProps.noiseBar} resetValue={1} dispatchFunc={setNoiseBar} />
    </div>
  )
}
```

**NoiseDetail.jsx**：`import FooNoise from './noiseSpecialPropsComponents/FooNoise.jsx'` + `case "fooNoise": return <FooNoise />`

**PropsUniforms.js**：
```js
case "fooNoise":
  noiseUniforms = { bar: { value: noiseSpecialProps.noiseBar } }
  break;
```

**FrameUniform.js**：
```js
case "fooNoise":
  material.current.uniforms.bar.value = noiseSpecialProps.noiseBar
  break;
```

**noiseList.json**：
```json
{ "id": <下一个id>, "imgSrc": "../images/<noiseName>.png", "title": "<中文标题>", "routeHref": "noiseDetail/fooNoise", "FragmentShaderPath": "../glsl/FooNoiseFragment.js" }
```

---

## 易错点

- `PropsUniforms.js` 与 `FrameUniform.js` 是两份手写副本，**每加一个参数必须同时改这两处 + shader 声明**，否则 uniform 值不更新或渲染报错。
- 颜色参数（redux 存 hex 字符串）必须经 `hexToRgb`（定义在 MainCanvas.jsx，靠实参传入），数值/布尔直接透传。
- 布尔参数 shader 声明为 `uniform bool xxx;`。
- 4 处 key 必须严格等于 routeHref 最后一段（大小写敏感）：store key、NoiseDetail case、PropsUniforms case、FrameUniform case。
- 把常量提升为 uniform 时，必须同时在 shader 里补声明并替换原硬编码值，否则 GLSL 编译失败。
- 无特性参数（shader 只有公共 uniform）时跳过 3~8 步，参照 `cloudNoise` / `sampleNoise`。
- InputSlider 的 range 值默认是字符串，项目现状如此；如影响 shader 数值需在 dispatch 前 `Number()`，与现有代码保持一致，除非必要。
- 禁止运行 `npm run dev` / `npm run build`（项目约定）；完成后可运行 `npm run lint` 检查，并人工核对上述 4 处 key 一致。
