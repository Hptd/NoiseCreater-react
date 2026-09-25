// 自动生成，勿手改。来源：scripts/gen-noise-slice-registry.mjs
import { noiseCommonParams } from '../../features/NoiseCommonParamsSlice.js'
import { voronoiWaterNoiseParamsSlice } from '../../features/VoronoiWaterNoiseParamsSlice.js'
import { sampleNoiseAParamsSlice } from '../../features/SampleNoiseABParamsSlice.js'
import { tileableWaterNoiseParamsSlice } from '../../features/TileableWaterNoiseParamsSlice.js'
import { causticsWaterNoiseParamsSlice } from '../../features/CausticsWaterNoiseParamsSlice.js'
import { glareWaterNoiseParamsSlice } from '../../features/GlareWaterNoiseParamsSlice.js'
import { forkedWaterNoiseParamsSlice } from '../../features/ForkedWaterNoiseParamsSlice.js'
import { rainWaterNoiseParamsSlice } from '../../features/RainWaterNoiseParamsSlice.js'
import { smokeNoiseParamsSlice } from '../../features/SmokeNoiseParamsSlice.js'
import { honeycompNoiseBParamsSlice } from '../../features/HoneycompNoiseBParamsSlice.js'
import { silkNoiseParamsSlice } from '../../features/SilkNoiseParamsSlice.js'
import { gridNoiseParamsSlice } from '../../features/GridNoiseParamsSlice.js'
import { voroNoiseParamsSlice } from '../../features/VoroNoiseParamsSlice.js'
import { cellNoiseAParamsSlice } from '../../features/CellNoiseAParamsSlice.js'
import { cellNoiseBParamsSlice } from '../../features/CellNoiseBParamsSlice.js'
import { cellNoiseCParamsSlice } from '../../features/CellNoiseCParamsSlice.js'
import { bandingGradientsNoiseParamsSlice } from '../../features/BandingGradientsNoiseParamsSlice.js'
import { squircleColorNoiseParamsSlice } from '../../features/SquircleColorNoiseParamsSlice.js'
import { circleNoiseAParamsSlice } from '../../features/CircleNoiseAParamsSlice.js'
import { circleNoiseBParamsSlice } from '../../features/CircleNoiseBParamsSlice.js'
import { circleNoiseCParamsSlice } from '../../features/CircleNoiseCParamsSlice.js'
import { isovaluesNoiseParamsSlice } from '../../features/IsovaluesNoiseParamsSlice.js'
import { knitNoiseAParamsSlice } from '../../features/KnitNoiseAParamsSlice.js'
import { knitNoiseBParamsSlice } from '../../features/KnitNoiseBParamsSlice.js'
import { knitNoiseCParamsSlice } from '../../features/KnitNoiseCParamsSlice.js'
import { knitNoiseDParamsSlice } from '../../features/KnitNoiseDParamsSlice.js'
import { knitNoiseEParamsSlice } from '../../features/KnitNoiseEParamsSlice.js'
import { knitNoiseFParamsSlice } from '../../features/KnitNoiseFParamsSlice.js'
import { fireNoiseAParamsSlice } from '../../features/FireNoiseAParamsSlice.js'
import { fireNoiseBParamsSlice } from '../../features/FireNoiseBParamsSlice.js'
import { fireNoiseCParamsSlice } from '../../features/FireNoiseCParamsSlice.js'
import { etherNoiseAParamsSlice } from '../../features/EtherNoiseAParamsSlice.js'
import { etherNoiseBParamsSlice } from '../../features/EtherNoiseBParamsSlice.js'
import { etherNoiseCParamsSlice } from '../../features/EtherNoiseCParamsSlice.js'
import { taijiParamsSlice } from '../../features/TaijiParamsSlice.js'
import { eyeParamsSlice } from '../../features/EyeParamsSlice.js'
import { brushNoiseAParamsSlice } from '../../features/BrushNoiseAParamsSlice.js'
import { brushNoiseBParamsSlice } from '../../features/BrushNoiseBParamsSlice.js'
import { hexNoiseParamsSlice } from '../../features/HexNoiseParamsSlice.js'
import { squaresNoiseParamsSlice } from '../../features/SquaresNoiseParamsSlice.js'
import { gyroidNoiseParamsSlice } from '../../features/GyroidNoiseParamsSlice.js'
import { hexMazeNoiseParamsSlice } from '../../features/HexMazeNoiseParamsSlice.js'
import { fireSmokeNoiseParamsSlice } from '../../features/FireSmokeNoiseParamsSlice.js'
import { satisfyNoiseParamsSlice } from '../../features/SatisfyNoiseParamsSlice.js'
import { petroleumNoiseParamsSlice } from '../../features/PetroleumNoiseParamsSlice.js'
import { worleyNoiseParamsSlice } from '../../features/WorleyNoiseParamsSlice.js'
import { haloVoroNoiseParamsSlice } from '../../features/HaloVoroNoiseParamsSlice.js'
import { cloudTunnelNoiseParamsSlice } from '../../features/CloudTunnelNoiseParamsSlice.js'
import { fbmColorNoiseParamsSlice } from '../../features/FbmColorNoiseParamsSlice.js'
import { dashLineNoiseParamsSlice } from '../../features/DashLineNoiseParamsSlice.js'
import { causticChromaNoiseParamsSlice } from '../../features/CausticChromaNoiseParamsSlice.js'
import { boomSmokeNoiseParamsSlice } from '../../features/BoomSmokeNoiseParamsSlice.js'

const INIT = { type: '@@noiseEditor/init' }

// 节点级公共参数（output 级参数不进节点面板）
export const NODE_LEVEL_COMMON_KEYS = [
  'noiseUvSize', 'noiseOffsetU', 'noiseOffsetV', 'noiseScaleU', 'noiseScaleV',
  'noiseBright', 'noiseInvert', 'noiseAlphaChannel', 'noiseAnimationOC',
]

export const NOISE_SLICES = {
  "noiseCommonProps": noiseCommonParams.reducer,
  "voronoiWaterNoiseProps": voronoiWaterNoiseParamsSlice.reducer,
  "sampleNoiseABProps": sampleNoiseAParamsSlice.reducer,
  "tileableWaterNoiseProps": tileableWaterNoiseParamsSlice.reducer,
  "causticsWaterNoiseProps": causticsWaterNoiseParamsSlice.reducer,
  "glareWaterNoiseProps": glareWaterNoiseParamsSlice.reducer,
  "forkedWaterNoiseProps": forkedWaterNoiseParamsSlice.reducer,
  "rainWaterNoiseProps": rainWaterNoiseParamsSlice.reducer,
  "smokeNoiseProps": smokeNoiseParamsSlice.reducer,
  "honeycompNoiseBProps": honeycompNoiseBParamsSlice.reducer,
  "silkNoiseProps": silkNoiseParamsSlice.reducer,
  "gridNoiseProps": gridNoiseParamsSlice.reducer,
  "voroNoiseProps": voroNoiseParamsSlice.reducer,
  "cellNoiseAProps": cellNoiseAParamsSlice.reducer,
  "cellNoiseBProps": cellNoiseBParamsSlice.reducer,
  "cellNoiseCProps": cellNoiseCParamsSlice.reducer,
  "bandingGradientsNoiseProps": bandingGradientsNoiseParamsSlice.reducer,
  "squircleColorNoiseProps": squircleColorNoiseParamsSlice.reducer,
  "circleNoiseAProps": circleNoiseAParamsSlice.reducer,
  "circleNoiseBProps": circleNoiseBParamsSlice.reducer,
  "circleNoiseCProps": circleNoiseCParamsSlice.reducer,
  "isovaluesNoiseProps": isovaluesNoiseParamsSlice.reducer,
  "knitNoiseAProps": knitNoiseAParamsSlice.reducer,
  "knitNoiseBProps": knitNoiseBParamsSlice.reducer,
  "knitNoiseCProps": knitNoiseCParamsSlice.reducer,
  "knitNoiseDProps": knitNoiseDParamsSlice.reducer,
  "knitNoiseEProps": knitNoiseEParamsSlice.reducer,
  "knitNoiseFProps": knitNoiseFParamsSlice.reducer,
  "fireNoiseAProps": fireNoiseAParamsSlice.reducer,
  "fireNoiseBProps": fireNoiseBParamsSlice.reducer,
  "fireNoiseCProps": fireNoiseCParamsSlice.reducer,
  "etherNoiseAProps": etherNoiseAParamsSlice.reducer,
  "etherNoiseBProps": etherNoiseBParamsSlice.reducer,
  "etherNoiseCProps": etherNoiseCParamsSlice.reducer,
  "taijiProps": taijiParamsSlice.reducer,
  "eyeProps": eyeParamsSlice.reducer,
  "brushNoiseAProps": brushNoiseAParamsSlice.reducer,
  "brushNoiseBProps": brushNoiseBParamsSlice.reducer,
  "hexNoiseProps": hexNoiseParamsSlice.reducer,
  "squaresNoiseProps": squaresNoiseParamsSlice.reducer,
  "gyroidNoiseProps": gyroidNoiseParamsSlice.reducer,
  "hexMazeNoiseProps": hexMazeNoiseParamsSlice.reducer,
  "fireSmokeNoiseProps": fireSmokeNoiseParamsSlice.reducer,
  "satisfyNoiseProps": satisfyNoiseParamsSlice.reducer,
  "petroleumNoiseProps": petroleumNoiseParamsSlice.reducer,
  "worleyNoiseProps": worleyNoiseParamsSlice.reducer,
  "haloVoroNoiseProps": haloVoroNoiseParamsSlice.reducer,
  "cloudTunnelNoiseProps": cloudTunnelNoiseParamsSlice.reducer,
  "fbmColorNoiseProps": fbmColorNoiseParamsSlice.reducer,
  "dashLineNoiseProps": dashLineNoiseParamsSlice.reducer,
  "causticChromaNoiseProps": causticChromaNoiseParamsSlice.reducer,
  "boomSmokeNoiseProps": boomSmokeNoiseParamsSlice.reducer,
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
