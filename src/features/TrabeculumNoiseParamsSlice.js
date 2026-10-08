import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseSpeed: 1,
  noiseSteps: 64,
  noiseStepSize: 0.005,
  noiseScale: 10,
  noiseGrad: 0.8,
  noiseThreshold: 0,
  noiseFov: 1.5,
  noiseCamTheta: 0,
  noiseCamPhi: 0,
  noiseSkyColor: "#000000",
  noiseRemoveCol: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const trabeculumNoiseParamsSlice = createSlice({
  name: "trabeculumNoiseParams",
  initialState,
  reducers: {
    setNoiseSpeed: (state, action) => setReducer(state, action, "noiseSpeed"),
    setNoiseSteps: (state, action) => setReducer(state, action, "noiseSteps"),
    setNoiseStepSize: (state, action) => setReducer(state, action, "noiseStepSize"),
    setNoiseScale: (state, action) => setReducer(state, action, "noiseScale"),
    setNoiseGrad: (state, action) => setReducer(state, action, "noiseGrad"),
    setNoiseThreshold: (state, action) => setReducer(state, action, "noiseThreshold"),
    setNoiseFov: (state, action) => setReducer(state, action, "noiseFov"),
    setNoiseCamTheta: (state, action) => setReducer(state, action, "noiseCamTheta"),
    setNoiseCamPhi: (state, action) => setReducer(state, action, "noiseCamPhi"),
    setNoiseSkyColor: (state, action) => setReducer(state, action, "noiseSkyColor"),
    setNoiseRemoveCol: (state, action) => setReducer(state, action, "noiseRemoveCol")
  }
})

export const {
  setNoiseSpeed,
  setNoiseSteps,
  setNoiseStepSize,
  setNoiseScale,
  setNoiseGrad,
  setNoiseThreshold,
  setNoiseFov,
  setNoiseCamTheta,
  setNoiseCamPhi,
  setNoiseSkyColor,
  setNoiseRemoveCol
} = trabeculumNoiseParamsSlice.actions

export default trabeculumNoiseParamsSlice.reducer
