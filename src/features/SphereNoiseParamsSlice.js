import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseSlices: 50,
  noiseAmplitude: 0.01,
  noiseFrequency: 1.25,
  noiseDensity: 0,
  noiseAnimSpeed: 0.075,
  noiseScale: 5,
  noiseRadius: 0.5,
  noiseCamZ: 1,
  noiseRotAngle: 0,
  noiseRemoveCol: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const sphereNoiseParamsSlice = createSlice({
  name: "sphereNoiseParams",
  initialState,
  reducers: {
    setNoiseSlices: (state, action) => setReducer(state, action, "noiseSlices"),
    setNoiseAmplitude: (state, action) => setReducer(state, action, "noiseAmplitude"),
    setNoiseFrequency: (state, action) => setReducer(state, action, "noiseFrequency"),
    setNoiseDensity: (state, action) => setReducer(state, action, "noiseDensity"),
    setNoiseAnimSpeed: (state, action) => setReducer(state, action, "noiseAnimSpeed"),
    setNoiseScale: (state, action) => setReducer(state, action, "noiseScale"),
    setNoiseRadius: (state, action) => setReducer(state, action, "noiseRadius"),
    setNoiseCamZ: (state, action) => setReducer(state, action, "noiseCamZ"),
    setNoiseRotAngle: (state, action) => setReducer(state, action, "noiseRotAngle"),
    setNoiseRemoveCol: (state, action) => setReducer(state, action, "noiseRemoveCol")
  }
})

export const {
  setNoiseSlices,
  setNoiseAmplitude,
  setNoiseFrequency,
  setNoiseDensity,
  setNoiseAnimSpeed,
  setNoiseScale,
  setNoiseRadius,
  setNoiseCamZ,
  setNoiseRotAngle,
  setNoiseRemoveCol
} = sphereNoiseParamsSlice.actions

export default sphereNoiseParamsSlice.reducer
