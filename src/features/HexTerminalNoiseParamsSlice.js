import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseColor: "#80ccff",
  noiseHexDensity: 42,
  noiseFillScale: 12,
  noiseRandOffset: 90,
  noiseGradSpeed: 0.6,
  noiseBorderThreshold: 0.1,
  noiseBorderWidth: 0.21,
  noiseEdgeContrast: 0.7,
  noiseFillSpeed: 0.5,
  noiseFillSharp: 8,
  noiseBgFreq: 5,
  noiseBgSpeed: 2,
  noiseGlow: 3,
  noiseExposure: 3,
  noiseRemoveCol: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const hexTerminalNoiseParamsSlice = createSlice({
  name: "hexTerminalNoiseParams",
  initialState,
  reducers: {
    setNoiseColor: (state, action) => setReducer(state, action, "noiseColor"),
    setNoiseHexDensity: (state, action) => setReducer(state, action, "noiseHexDensity"),
    setNoiseFillScale: (state, action) => setReducer(state, action, "noiseFillScale"),
    setNoiseRandOffset: (state, action) => setReducer(state, action, "noiseRandOffset"),
    setNoiseGradSpeed: (state, action) => setReducer(state, action, "noiseGradSpeed"),
    setNoiseBorderThreshold: (state, action) => setReducer(state, action, "noiseBorderThreshold"),
    setNoiseBorderWidth: (state, action) => setReducer(state, action, "noiseBorderWidth"),
    setNoiseEdgeContrast: (state, action) => setReducer(state, action, "noiseEdgeContrast"),
    setNoiseFillSpeed: (state, action) => setReducer(state, action, "noiseFillSpeed"),
    setNoiseFillSharp: (state, action) => setReducer(state, action, "noiseFillSharp"),
    setNoiseBgFreq: (state, action) => setReducer(state, action, "noiseBgFreq"),
    setNoiseBgSpeed: (state, action) => setReducer(state, action, "noiseBgSpeed"),
    setNoiseGlow: (state, action) => setReducer(state, action, "noiseGlow"),
    setNoiseExposure: (state, action) => setReducer(state, action, "noiseExposure"),
    setNoiseRemoveCol: (state, action) => setReducer(state, action, "noiseRemoveCol")
  }
})

export const {
  setNoiseColor,
  setNoiseHexDensity,
  setNoiseFillScale,
  setNoiseRandOffset,
  setNoiseGradSpeed,
  setNoiseBorderThreshold,
  setNoiseBorderWidth,
  setNoiseEdgeContrast,
  setNoiseFillSpeed,
  setNoiseFillSharp,
  setNoiseBgFreq,
  setNoiseBgSpeed,
  setNoiseGlow,
  setNoiseExposure,
  setNoiseRemoveCol
} = hexTerminalNoiseParamsSlice.actions

export default hexTerminalNoiseParamsSlice.reducer
