# NoiseCreaterReact — 噪波 / 着色器参数可视化工具

一个基于 WebGL 的噪波 / 着色器参数可视化工具：用 `react-three-fiber` 将 **41 个 GLSL 片段着色器**渲染到 plane 平面上，通过 Redux 控制每个着色器的 uniform 参数，支持**实时预览、动画播放、PNG 与序列帧导出**。

## ✨ 功能特性

### 1. 内置噪波库（41 种预设）

首页以卡片形式展示全部噪波，点击任意卡片即可进入对应详情页实时调节。噪波大致可分为几类：

| 分类 | 包含噪波 |
| --- | --- |
| 水波纹 | voronoi / tileable / caustics / glare / forked / rain Water Noise |
| 采样噪波 | Sample Noise / Sample Color Noise / Cloud Noise / sample Noise_A、_B |
| 程序化图案 | cell、circle、knit、honeycomp、brush、grid、voro、silk、smoke、isovalues、banding Gradients、squircle color |
| 火焰 / 以太特效 | fire Noise_A、_B / ether Noise_A、_B、_C |
| 文化趣味 | 太极阴阳鱼 / eye |

此外还有 **致谢名单** 与 **更新日志** 两个辅助页面。

### 2. 实时参数调节（所见即所得）

每个噪波详情页都包含：

- **专属参数面板** —— 针对该噪波的独有 uniform（如水的波纹强度、太极的旋转速度等），每个噪波独立配置。
- **公共参数面板** —— 所有噪波共享的通用调节项：
  - 噪波尺寸、横向 / 纵向位移、横向 / 纵向缩放（UV 变换）
  - 整体明暗
  - 颜色取反
  - 开启 Alpha 通道
  - 动画：开始 / 暂停
  - 导出尺寸（默认 1024 × 1024）
  - 每秒导出序列帧数量 fps（默认 10 帧/秒）

所有参数通过 Redux 状态驱动，在 `useFrame` 中逐帧改写 `material.current.uniforms` 的值，调节即时生效，无需重新渲染。

### 3. 动画控制

支持一键开始 / 暂停动画。动画时间 `iTime` 基于**真实流逝时间（delta）**推进，动画速度与显示器刷新率无关，在不同刷新率的屏幕上表现一致。

### 4. 导出 PNG 图片

一键下载当前效果的 PNG 图片，文件名自动命名为噪波名（如 `voronoiWaterNoise.png`）。导出前会强制刷新画布，确保导出的内容与当前画面一致。

### 5. 导出序列帧

点击"开始下载序列帧"后，按设定的 fps（默认 10 帧/秒）逐帧渲染并导出 PNG 序列帧（如 `voronoiWaterNoise_1.png`、`voronoiWaterNoise_2.png`……），可用于后期合成动画或视频。序列帧同样基于真实时间间隔累计，导出速度不受显示器刷新率影响。

## 🖥️ 页面与路由

| 路由 | 页面 | 说明 |
| --- | --- | --- |
| `/` | 首页 | 读取 `noiseList.json` 渲染噪波卡片，点击携带 `id` / `noiseName` 跳转详情页 |
| `/noiseDetail/:name` | 噪波详情 | 渲染公共参数 + 专属参数 + WebGL 画布；实际由路由 state（`id` + `noiseName`）驱动，`URL` 参数仅作刷新 / 收藏时的回退 |
| `/thanksList` | 致谢名单 | 赞助与致谢 |
| `/updateLog` | 更新日志 | 项目更新记录 |

## 🛠️ 技术栈

- React 18 + Vite 5
- Three.js + @react-three/fiber 8 + @react-three/drei
- Redux Toolkit + react-redux
- react-router-dom 6
- file-saver（导出文件）

## 🚀 快速开始

```bash
npm install     # 安装依赖
npm run dev     # 启动开发服务器
npm run build   # 生产构建
npm run preview # 预览构建产物
npm run lint    # ESLint 检查
```

## 📁 项目结构

```
public/
  mySQL/noiseList.json        # 噪波目录（id / 图片 / 标题 / 路由 / 着色器路径）
  glsl/<Noise>Fragment.js     # 片段着色器（模板字符串导出）
  images/                     # 卡片图片
src/
  components/
    HomePage.jsx              # 首页卡片
    NoiseDetail.jsx           # 详情页：专属参数 + 公共参数 + 画布
    NoiseCommonProps.jsx      # 公共参数面板
    MainCanvas.jsx            # WebGL 画布、uniform 更新、图片/序列帧导出
    noiseSpecialPropsComponents/  # 各噪波专属参数 UI
  features/                   # 各噪波专属参数 Redux slice
  canvasUniformFrame/         # PropsUniforms(初始化) / FrameUniform(逐帧更新)
  app/store.js                # Redux store
  router/routerSettings.jsx   # 路由配置
```

## ⚙️ 核心数据流

```
参数 UI --dispatch--> Redux slice --useSelector--> useFrame() 内逐帧改写 material.current.uniforms.xxx.value --> shaderMaterial 重绘
```

- uniforms 只在 `useMemo(..., [])` 中**一次性初始化**，之后每一帧在 `useFrame` 内直接改写 `material.current.uniforms` 的值，避免触发 React 重复渲染。
- 不要在组件函数体内读取 `material.current`（首次渲染时为 `undefined`），必须在 `useFrame` 里加 `if (material.current)` 判断后再操作。
- 颜色类参数经 `hexToRgb`（`#rrggbb` → `THREE.Vector3`）后传入 uniform。
- 导出图片 / 序列帧前先执行 `gl.render(scene, camera)` 强制刷新画布，保证导出帧与当前画面一致。

## 🔧 更新 Noise 操作顺序

1. 在 `noiseList.json` 内更新 特性组件路径和 glsl 文件路径；
2. 增加 `noiseName.glsl` 文件；
3. 根据 1 中的引用数据名字，增加 `NoiseName.jsx` 特性组件；
4. 根据 1 中的引用数据名字，增加 `NoiseNameParamsSlice.js` 文件；
5. 根据 2 中的文件名字，在 `store.js` 内做相应的引用配置；
6. 更新 `PropsUniforms.js` 和 `FrameUniforms.js`。
7. 在 `NoiseDetail.jsx` 内增加特性 Noise 参数组件，并通过函数和 switch 进行选择性加载。

### 命名约定（易错点）

- 专属参数 state 的 key = `noiseName + "Props"`。`noiseName` 取 `routeHref` 的最后一个路径段（如 `voronoiWaterNoise` → `state.voronoiWaterNoiseProps`）。**route slug、store 注册名、`NoiseDetail` 的 switch case、`PropsUniforms`/`FrameUniform` 的 case 四者必须严格一致**。
- 多个目录条目可以共用同一个 `routeHref`（如 `sampleNoise_A` / `sampleNoise_B` 都指向 `noiseDetail/sampleNoiseAB`），共用一个参数组件与 slice。
