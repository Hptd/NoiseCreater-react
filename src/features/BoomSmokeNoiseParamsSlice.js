import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseBoomColor1: "#33264d",
  noiseBoomColor2: "#e6260d",
  noiseBoomColor3: "#e6801a",
  noiseBoomColor4: "#f2f259",
  noiseSmokeColor1: "#33264d",
  noiseSmokeColor2: "#594d73",
  noiseSmokeColor3: "#807399",
  noiseBgColor: "#808080",
  noiseCycle: 2.0,
  noiseZoom: 7.0,
  noiseBoomDistort: 0.5,
  noiseSmokeDistort: 1.5,
  noiseBubbleW: 0.5,
  noiseSmokeBubbleW: 0.75,
  noiseBorderWidth: 0.02,
  noiseMixThreshold: 1.25,
  noiseRemoveCol: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const boomSmokeNoiseParamsSlice = createSlice({
  name: "boomSmokeNoiseParams",
  initialState,
  reducers: {
    setNoiseBoomColor1: (state, action) => setReducer(state, action, "noiseBoomColor1"),
    setNoiseBoomColor2: (state, action) => setReducer(state, action, "noiseBoomColor2"),
    setNoiseBoomColor3: (state, action) => setReducer(state, action, "noiseBoomColor3"),
    setNoiseBoomColor4: (state, action) => setReducer(state, action, "noiseBoomColor4"),
    setNoiseSmokeColor1: (state, action) => setReducer(state, action, "noiseSmokeColor1"),
    setNoiseSmokeColor2: (state, action) => setReducer(state, action, "noiseSmokeColor2"),
    setNoiseSmokeColor3: (state, action) => setReducer(state, action, "noiseSmokeColor3"),
    setNoiseBgColor: (state, action) => setReducer(state, action, "noiseBgColor"),
    setNoiseCycle: (state, action) => setReducer(state, action, "noiseCycle"),
    setNoiseZoom: (state, action) => setReducer(state, action, "noiseZoom"),
    setNoiseBoomDistort: (state, action) => setReducer(state, action, "noiseBoomDistort"),
    setNoiseSmokeDistort: (state, action) => setReducer(state, action, "noiseSmokeDistort"),
    setNoiseBubbleW: (state, action) => setReducer(state, action, "noiseBubbleW"),
    setNoiseSmokeBubbleW: (state, action) => setReducer(state, action, "noiseSmokeBubbleW"),
    setNoiseBorderWidth: (state, action) => setReducer(state, action, "noiseBorderWidth"),
    setNoiseMixThreshold: (state, action) => setReducer(state, action, "noiseMixThreshold"),
    setNoiseRemoveCol: (state, action) => setReducer(state, action, "noiseRemoveCol")
  }
})

export const {
  setNoiseBoomColor1,
  setNoiseBoomColor2,
  setNoiseBoomColor3,
  setNoiseBoomColor4,
  setNoiseSmokeColor1,
  setNoiseSmokeColor2,
  setNoiseSmokeColor3,
  setNoiseBgColor,
  setNoiseCycle,
  setNoiseZoom,
  setNoiseBoomDistort,
  setNoiseSmokeDistort,
  setNoiseBubbleW,
  setNoiseSmokeBubbleW,
  setNoiseBorderWidth,
  setNoiseMixThreshold,
  setNoiseRemoveCol
} = boomSmokeNoiseParamsSlice.actions

export default boomSmokeNoiseParamsSlice.reducer
