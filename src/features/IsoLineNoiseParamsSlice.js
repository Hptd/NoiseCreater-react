import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseScale: 18,
  noiseSpeed: 1,
  noiseLevels: 20,
  noiseLayerOffset: 0.1,
  noiseSkew: 0.1,
  noiseYScale: 0.6,
  noiseBias: 0.2,
  noiseGain: 0.6,
  noiseEdgeBase: 1.5,
  noiseEdgeHeight: 20,
  noiseEdgeSharp: 0.01,
  noiseColor1: "#000000",
  noiseColor2: "#ffffff",
  noiseBgColor: "#000000",
  noiseRemoveCol: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const isoLineNoiseParamsSlice = createSlice({
  name: "isoLineNoiseParams",
  initialState,
  reducers: {
    setNoiseScale:       (state, action) => setReducer(state, action, "noiseScale"),
    setNoiseSpeed:       (state, action) => setReducer(state, action, "noiseSpeed"),
    setNoiseLevels:      (state, action) => setReducer(state, action, "noiseLevels"),
    setNoiseLayerOffset: (state, action) => setReducer(state, action, "noiseLayerOffset"),
    setNoiseSkew:        (state, action) => setReducer(state, action, "noiseSkew"),
    setNoiseYScale:      (state, action) => setReducer(state, action, "noiseYScale"),
    setNoiseBias:        (state, action) => setReducer(state, action, "noiseBias"),
    setNoiseGain:        (state, action) => setReducer(state, action, "noiseGain"),
    setNoiseEdgeBase:    (state, action) => setReducer(state, action, "noiseEdgeBase"),
    setNoiseEdgeHeight:  (state, action) => setReducer(state, action, "noiseEdgeHeight"),
    setNoiseEdgeSharp:   (state, action) => setReducer(state, action, "noiseEdgeSharp"),
    setNoiseColor1:      (state, action) => setReducer(state, action, "noiseColor1"),
    setNoiseColor2:      (state, action) => setReducer(state, action, "noiseColor2"),
    setNoiseBgColor:     (state, action) => setReducer(state, action, "noiseBgColor"),
    setNoiseRemoveCol:   (state, action) => setReducer(state, action, "noiseRemoveCol")
  }
})

export const {
  setNoiseScale,
  setNoiseSpeed,
  setNoiseLevels,
  setNoiseLayerOffset,
  setNoiseSkew,
  setNoiseYScale,
  setNoiseBias,
  setNoiseGain,
  setNoiseEdgeBase,
  setNoiseEdgeHeight,
  setNoiseEdgeSharp,
  setNoiseColor1,
  setNoiseColor2,
  setNoiseBgColor,
  setNoiseRemoveCol
} = isoLineNoiseParamsSlice.actions

export default isoLineNoiseParamsSlice.reducer
