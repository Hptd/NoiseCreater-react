import { configureStore } from "@reduxjs/toolkit"
import { noiseCommonParams } from "../features/NoiseCommonParamsSlice"
import { voronoiWaterNoiseParamsSlice } from "../features/VoronoiWaterNoiseParamsSlice"
import { sampleNoiseAParamsSlice } from '../features/SampleNoiseABParamsSlice'
import { tileableWaterNoiseParamsSlice } from '../features/TileableWaterNoiseParamsSlice'
import { causticsWaterNoiseParamsSlice } from '../features/CausticsWaterNoiseParamsSlice'
import { glareWaterNoiseParamsSlice } from "../features/GlareWaterNoiseParamsSlice"
import { forkedWaterNoiseParamsSlice } from "../features/ForkedWaterNoiseParamsSlice"
import { rainWaterNoiseParamsSlice } from "../features/RainWaterNoiseParamsSlice"
import { smokeNoiseParamsSlice } from "../features/SmokeNoiseParamsSlice"
import { honeycompNoiseBParamsSlice } from "../features/HoneycompNoiseBParamsSlice"
import { silkNoiseParamsSlice } from "../features/SilkNoiseParamsSlice"
import { gridNoiseParamsSlice } from "../features/GridNoiseParamsSlice"
import { voroNoiseParamsSlice } from "../features/VoroNoiseParamsSlice"
import { cellNoiseAParamsSlice } from "../features/CellNoiseAParamsSlice"
import { cellNoiseBParamsSlice } from "../features/CellNoiseBParamsSlice"
import { cellNoiseCParamsSlice } from "../features/CellNoiseCParamsSlice"
import { bandingGradientsNoiseParamsSlice } from "../features/BandingGradientsNoiseParamsSlice"
import { squircleColorNoiseParamsSlice } from "../features/SquircleColorNoiseParamsSlice"
import { circleNoiseAParamsSlice } from "../features/CircleNoiseAParamsSlice"
import { circleNoiseBParamsSlice } from "../features/CircleNoiseBParamsSlice"
import { circleNoiseCParamsSlice } from "../features/CircleNoiseCParamsSlice"
import { isovaluesNoiseParamsSlice } from "../features/IsovaluesNoiseParamsSlice"
import { knitNoiseAParamsSlice } from "../features/KnitNoiseAParamsSlice"
import { knitNoiseBParamsSlice } from "../features/KnitNoiseBParamsSlice"
import { knitNoiseCParamsSlice } from "../features/KnitNoiseCParamsSlice"
import { knitNoiseDParamsSlice } from "../features/KnitNoiseDParamsSlice"
import { knitNoiseEParamsSlice } from "../features/KnitNoiseEParamsSlice"
import { knitNoiseFParamsSlice } from "../features/KnitNoiseFParamsSlice"
import { fireNoiseAParamsSlice } from "../features/FireNoiseAParamsSlice"
import { fireNoiseBParamsSlice } from "../features/FireNoiseBParamsSlice"
import { etherNoiseAParamsSlice } from "../features/EtherNoiseAParamsSlice"
import { etherNoiseBParamsSlice } from "../features/EtherNoiseBParamsSlice"
import { etherNoiseCParamsSlice } from "../features/EtherNoiseCParamsSlice"
import { taijiParamsSlice } from "../features/TaijiParamsSlice"
import { eyeParamsSlice } from "../features/EyeParamsSlice"
import { brushNoiseAParamsSlice } from "../features/BrushNoiseAParamsSlice"
import { brushNoiseBParamsSlice } from "../features/BrushNoiseBParamsSlice"

export const store = configureStore({
  reducer: {
    noiseCommonProps: noiseCommonParams.reducer,
    voronoiWaterNoiseProps: voronoiWaterNoiseParamsSlice.reducer,
    sampleNoiseABProps: sampleNoiseAParamsSlice.reducer,
    tileableWaterNoiseProps: tileableWaterNoiseParamsSlice.reducer,
    causticsWaterNoiseProps: causticsWaterNoiseParamsSlice.reducer,
    glareWaterNoiseProps: glareWaterNoiseParamsSlice.reducer,
    forkedWaterNoiseProps: forkedWaterNoiseParamsSlice.reducer,
    rainWaterNoiseProps: rainWaterNoiseParamsSlice.reducer,
    smokeNoiseProps: smokeNoiseParamsSlice.reducer,
    honeycompNoiseBProps: honeycompNoiseBParamsSlice.reducer,
    silkNoiseProps: silkNoiseParamsSlice.reducer,
    gridNoiseProps: gridNoiseParamsSlice.reducer,
    voroNoiseProps: voroNoiseParamsSlice.reducer,
    cellNoiseAProps: cellNoiseAParamsSlice.reducer,
    cellNoiseBProps: cellNoiseBParamsSlice.reducer,
    cellNoiseCProps: cellNoiseCParamsSlice.reducer,
    bandingGradientsNoiseProps: bandingGradientsNoiseParamsSlice.reducer,
    squircleColorNoiseProps: squircleColorNoiseParamsSlice.reducer,
    circleNoiseAProps: circleNoiseAParamsSlice.reducer,
    circleNoiseBProps: circleNoiseBParamsSlice.reducer,
    circleNoiseCProps: circleNoiseCParamsSlice.reducer,
    isovaluesNoiseProps: isovaluesNoiseParamsSlice.reducer,
    knitNoiseAProps: knitNoiseAParamsSlice.reducer,
    knitNoiseBProps: knitNoiseBParamsSlice.reducer,
    knitNoiseCProps: knitNoiseCParamsSlice.reducer,
    knitNoiseDProps: knitNoiseDParamsSlice.reducer,
    knitNoiseEProps: knitNoiseEParamsSlice.reducer,
    knitNoiseFProps: knitNoiseFParamsSlice.reducer,
    fireNoiseAProps: fireNoiseAParamsSlice.reducer,
    fireNoiseBProps: fireNoiseBParamsSlice.reducer,
    etherNoiseAProps: etherNoiseAParamsSlice.reducer,
    etherNoiseBProps: etherNoiseBParamsSlice.reducer,
    etherNoiseCProps: etherNoiseCParamsSlice.reducer,
    taijiProps: taijiParamsSlice.reducer,
    eyeProps: eyeParamsSlice.reducer,
    brushNoiseAProps: brushNoiseAParamsSlice.reducer,
    brushNoiseBProps: brushNoiseBParamsSlice.reducer,
  }
})