import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseOctaves: 3,
  noiseAmplitude: 0.6,
  noiseFrequency: 8,
  noiseFreqMult: 2,
  noiseDecay: 0.6,
  noiseJitter: 1,
  noiseEdge: 0.2,
  noiseDetailScale: 0.5,
  noisePulse: 0.5,
  noisePower: 2,
  noiseBoost: 0.1,
  noiseColorR: 8,
  noiseColorG: 3,
  noiseColorB: 2,
  noiseGain: 2,
  noiseRemoveCol: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const haloVoroNoiseParamsSlice = createSlice({
  name: "haloVoroNoiseParams",
  initialState,
  reducers: {
    setNoiseOctaves: (state, action) => setReducer(state, action, "noiseOctaves"),
    setNoiseAmplitude: (state, action) => setReducer(state, action, "noiseAmplitude"),
    setNoiseFrequency: (state, action) => setReducer(state, action, "noiseFrequency"),
    setNoiseFreqMult: (state, action) => setReducer(state, action, "noiseFreqMult"),
    setNoiseDecay: (state, action) => setReducer(state, action, "noiseDecay"),
    setNoiseJitter: (state, action) => setReducer(state, action, "noiseJitter"),
    setNoiseEdge: (state, action) => setReducer(state, action, "noiseEdge"),
    setNoiseDetailScale: (state, action) => setReducer(state, action, "noiseDetailScale"),
    setNoisePulse: (state, action) => setReducer(state, action, "noisePulse"),
    setNoisePower: (state, action) => setReducer(state, action, "noisePower"),
    setNoiseBoost: (state, action) => setReducer(state, action, "noiseBoost"),
    setNoiseColorR: (state, action) => setReducer(state, action, "noiseColorR"),
    setNoiseColorG: (state, action) => setReducer(state, action, "noiseColorG"),
    setNoiseColorB: (state, action) => setReducer(state, action, "noiseColorB"),
    setNoiseGain: (state, action) => setReducer(state, action, "noiseGain"),
    setNoiseRemoveCol: (state, action) => setReducer(state, action, "noiseRemoveCol")
  }
})

export const {
  setNoiseOctaves,
  setNoiseAmplitude,
  setNoiseFrequency,
  setNoiseFreqMult,
  setNoiseDecay,
  setNoiseJitter,
  setNoiseEdge,
  setNoiseDetailScale,
  setNoisePulse,
  setNoisePower,
  setNoiseBoost,
  setNoiseColorR,
  setNoiseColorG,
  setNoiseColorB,
  setNoiseGain,
  setNoiseRemoveCol
} = haloVoroNoiseParamsSlice.actions

export default haloVoroNoiseParamsSlice.reducer
