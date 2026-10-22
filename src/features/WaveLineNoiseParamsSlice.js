import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseLineScale: 1,
  noiseLineCount: 100,
  noiseWarpStrength: 5,
  noiseNoiseFreq: 0.1429,
  noiseAnimSpeed: 0.5,
  noiseLightColor: "#ebf1f5",
  noiseDarkColor: "#10161a",
  noiseRemoveCol: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const waveLineNoiseParamsSlice = createSlice({
  name: "waveLineNoiseParams",
  initialState,
  reducers: {
    setNoiseLineScale: (state, action) => setReducer(state, action, "noiseLineScale"),
    setNoiseLineCount: (state, action) => setReducer(state, action, "noiseLineCount"),
    setNoiseWarpStrength: (state, action) => setReducer(state, action, "noiseWarpStrength"),
    setNoiseNoiseFreq: (state, action) => setReducer(state, action, "noiseNoiseFreq"),
    setNoiseAnimSpeed: (state, action) => setReducer(state, action, "noiseAnimSpeed"),
    setNoiseLightColor: (state, action) => setReducer(state, action, "noiseLightColor"),
    setNoiseDarkColor: (state, action) => setReducer(state, action, "noiseDarkColor"),
    setNoiseRemoveCol: (state, action) => setReducer(state, action, "noiseRemoveCol")
  }
})

export const {
  setNoiseLineScale,
  setNoiseLineCount,
  setNoiseWarpStrength,
  setNoiseNoiseFreq,
  setNoiseAnimSpeed,
  setNoiseLightColor,
  setNoiseDarkColor,
  setNoiseRemoveCol
} = waveLineNoiseParamsSlice.actions

export default waveLineNoiseParamsSlice.reducer
