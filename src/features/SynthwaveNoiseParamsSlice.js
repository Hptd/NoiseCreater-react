import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseSpeed: 10,
  noiseHeight: 2,
  noiseIterations: 100,
  noiseMaxDist: 150,
  noiseEpsilon: 0.003,
  noiseFov: 1.3333,
  noiseCamHeight: 1,
  noiseSunSize: 0.2,
  noiseSunColor: "#bf994d",
  noiseSkyColor: "#661ab3",
  noiseHazeColor: "#b31966",
  noiseSurfaceColor: "#1a1c2e",
  noiseGlowColor: "#cc1aeb",
  noiseFogDensity: 1,
  noiseWaveAmp: 0.4,
  noiseWaveFreq: 0.02,
  noiseRemoveCol: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const synthwaveNoiseParamsSlice = createSlice({
  name: "synthwaveNoiseParams",
  initialState,
  reducers: {
    setNoiseSpeed: (state, action) => setReducer(state, action, "noiseSpeed"),
    setNoiseHeight: (state, action) => setReducer(state, action, "noiseHeight"),
    setNoiseIterations: (state, action) => setReducer(state, action, "noiseIterations"),
    setNoiseMaxDist: (state, action) => setReducer(state, action, "noiseMaxDist"),
    setNoiseEpsilon: (state, action) => setReducer(state, action, "noiseEpsilon"),
    setNoiseFov: (state, action) => setReducer(state, action, "noiseFov"),
    setNoiseCamHeight: (state, action) => setReducer(state, action, "noiseCamHeight"),
    setNoiseSunSize: (state, action) => setReducer(state, action, "noiseSunSize"),
    setNoiseSunColor: (state, action) => setReducer(state, action, "noiseSunColor"),
    setNoiseSkyColor: (state, action) => setReducer(state, action, "noiseSkyColor"),
    setNoiseHazeColor: (state, action) => setReducer(state, action, "noiseHazeColor"),
    setNoiseSurfaceColor: (state, action) => setReducer(state, action, "noiseSurfaceColor"),
    setNoiseGlowColor: (state, action) => setReducer(state, action, "noiseGlowColor"),
    setNoiseFogDensity: (state, action) => setReducer(state, action, "noiseFogDensity"),
    setNoiseWaveAmp: (state, action) => setReducer(state, action, "noiseWaveAmp"),
    setNoiseWaveFreq: (state, action) => setReducer(state, action, "noiseWaveFreq"),
    setNoiseRemoveCol: (state, action) => setReducer(state, action, "noiseRemoveCol")
  }
})

export const {
  setNoiseSpeed,
  setNoiseHeight,
  setNoiseIterations,
  setNoiseMaxDist,
  setNoiseEpsilon,
  setNoiseFov,
  setNoiseCamHeight,
  setNoiseSunSize,
  setNoiseSunColor,
  setNoiseSkyColor,
  setNoiseHazeColor,
  setNoiseSurfaceColor,
  setNoiseGlowColor,
  setNoiseFogDensity,
  setNoiseWaveAmp,
  setNoiseWaveFreq,
  setNoiseRemoveCol
} = synthwaveNoiseParamsSlice.actions

export default synthwaveNoiseParamsSlice.reducer
