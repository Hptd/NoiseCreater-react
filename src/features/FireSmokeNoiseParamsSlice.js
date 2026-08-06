import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseSpeed: 0.5,
  noiseFireHeight: 210,
  noiseWarp: 0.4,
  noiseFalloff: 0.4,
  noiseFlameDensity: 0.3,
  noiseFireSoftness: 8,
  noiseFireBrightness: 1.5,
  noiseSmokeAmount: 0.3,
  noiseSparkDensity: 30,
  noiseSparkSpeed: 190,
  noiseDetail: 2.4,
  noiseFlowStrength: 1,
  noiseSparkColor: "#ff4d00",
  noiseRemoveCol: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const fireSmokeNoiseParamsSlice = createSlice({
  name: "fireSmokeNoiseParams",
  initialState,
  reducers: {
    setNoiseSpeed: (state, action) => setReducer(state, action, "noiseSpeed"),
    setNoiseFireHeight: (state, action) => setReducer(state, action, "noiseFireHeight"),
    setNoiseWarp: (state, action) => setReducer(state, action, "noiseWarp"),
    setNoiseFalloff: (state, action) => setReducer(state, action, "noiseFalloff"),
    setNoiseFlameDensity: (state, action) => setReducer(state, action, "noiseFlameDensity"),
    setNoiseFireSoftness: (state, action) => setReducer(state, action, "noiseFireSoftness"),
    setNoiseFireBrightness: (state, action) => setReducer(state, action, "noiseFireBrightness"),
    setNoiseSmokeAmount: (state, action) => setReducer(state, action, "noiseSmokeAmount"),
    setNoiseSparkDensity: (state, action) => setReducer(state, action, "noiseSparkDensity"),
    setNoiseSparkSpeed: (state, action) => setReducer(state, action, "noiseSparkSpeed"),
    setNoiseDetail: (state, action) => setReducer(state, action, "noiseDetail"),
    setNoiseFlowStrength: (state, action) => setReducer(state, action, "noiseFlowStrength"),
    setNoiseSparkColor: (state, action) => setReducer(state, action, "noiseSparkColor"),
    setNoiseRemoveCol: (state, action) => setReducer(state, action, "noiseRemoveCol")
  }
})

export const {
  setNoiseSpeed,
  setNoiseFireHeight,
  setNoiseWarp,
  setNoiseFalloff,
  setNoiseFlameDensity,
  setNoiseFireSoftness,
  setNoiseFireBrightness,
  setNoiseSmokeAmount,
  setNoiseSparkDensity,
  setNoiseSparkSpeed,
  setNoiseDetail,
  setNoiseFlowStrength,
  setNoiseSparkColor,
  setNoiseRemoveCol
} = fireSmokeNoiseParamsSlice.actions

export default fireSmokeNoiseParamsSlice.reducer
