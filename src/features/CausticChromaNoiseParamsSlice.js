import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseOctaves: 24,
  noiseRefineSteps: 10,
  noiseSepSize: 1.2,
  noiseSepLight: 1.9,
  noiseSepAnim: 0.1,
  noiseCausticStrength: 0.008,
  noiseCausticRoughness: 1.3,
  noiseCausticAber: 0.001,
  noiseScale: 3.0,
  noiseRemoveCol: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const causticChromaNoiseParamsSlice = createSlice({
  name: "causticChromaNoiseParams",
  initialState,
  reducers: {
    setNoiseOctaves: (state, action) => setReducer(state, action, "noiseOctaves"),
    setNoiseRefineSteps: (state, action) => setReducer(state, action, "noiseRefineSteps"),
    setNoiseSepSize: (state, action) => setReducer(state, action, "noiseSepSize"),
    setNoiseSepLight: (state, action) => setReducer(state, action, "noiseSepLight"),
    setNoiseSepAnim: (state, action) => setReducer(state, action, "noiseSepAnim"),
    setNoiseCausticStrength: (state, action) => setReducer(state, action, "noiseCausticStrength"),
    setNoiseCausticRoughness: (state, action) => setReducer(state, action, "noiseCausticRoughness"),
    setNoiseCausticAber: (state, action) => setReducer(state, action, "noiseCausticAber"),
    setNoiseScale: (state, action) => setReducer(state, action, "noiseScale"),
    setNoiseRemoveCol: (state, action) => setReducer(state, action, "noiseRemoveCol")
  }
})

export const {
  setNoiseOctaves,
  setNoiseRefineSteps,
  setNoiseSepSize,
  setNoiseSepLight,
  setNoiseSepAnim,
  setNoiseCausticStrength,
  setNoiseCausticRoughness,
  setNoiseCausticAber,
  setNoiseScale,
  setNoiseRemoveCol
} = causticChromaNoiseParamsSlice.actions

export default causticChromaNoiseParamsSlice.reducer
