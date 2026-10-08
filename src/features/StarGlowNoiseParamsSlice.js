import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseSpeed: 1,
  noiseIterations: 50,
  noiseOctaves: 5,
  noiseFbmScroll: 7,
  noiseRadius: 5,
  noiseTailNoise: 2,
  noiseShake: 1,
  noiseGamma: 1.5,
  noiseExposure: 100,
  noiseRemoveCol: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const starGlowNoiseParamsSlice = createSlice({
  name: "starGlowNoiseParams",
  initialState,
  reducers: {
    setNoiseSpeed: (state, action) => setReducer(state, action, "noiseSpeed"),
    setNoiseIterations: (state, action) => setReducer(state, action, "noiseIterations"),
    setNoiseOctaves: (state, action) => setReducer(state, action, "noiseOctaves"),
    setNoiseFbmScroll: (state, action) => setReducer(state, action, "noiseFbmScroll"),
    setNoiseRadius: (state, action) => setReducer(state, action, "noiseRadius"),
    setNoiseTailNoise: (state, action) => setReducer(state, action, "noiseTailNoise"),
    setNoiseShake: (state, action) => setReducer(state, action, "noiseShake"),
    setNoiseGamma: (state, action) => setReducer(state, action, "noiseGamma"),
    setNoiseExposure: (state, action) => setReducer(state, action, "noiseExposure"),
    setNoiseRemoveCol: (state, action) => setReducer(state, action, "noiseRemoveCol")
  }
})

export const {
  setNoiseSpeed,
  setNoiseIterations,
  setNoiseOctaves,
  setNoiseFbmScroll,
  setNoiseRadius,
  setNoiseTailNoise,
  setNoiseShake,
  setNoiseGamma,
  setNoiseExposure,
  setNoiseRemoveCol
} = starGlowNoiseParamsSlice.actions

export default starGlowNoiseParamsSlice.reducer
