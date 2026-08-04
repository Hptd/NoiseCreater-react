import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseSpeed: 1,
  noiseRotateSpeed: 1.5,
  noiseParticleSize: 0.009,
  noiseLayers: 15,
  noiseSizeMod: 1.05,
  noiseAlphaMod: 0.9,
  noiseSmokeIntensity: 0.8,
  noiseSparkColor: "#ff660d",
  noiseSmokeColor: "#ff6e1a",
  noiseRemoveCol: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const fireNoiseCParamsSlice = createSlice({
  name: "fireNoiseCParams",
  initialState,
  reducers: {
    setNoiseSpeed: (state, action) => setReducer(state, action, "noiseSpeed"),
    setNoiseRotateSpeed: (state, action) => setReducer(state, action, "noiseRotateSpeed"),
    setNoiseParticleSize: (state, action) => setReducer(state, action, "noiseParticleSize"),
    setNoiseLayers: (state, action) => setReducer(state, action, "noiseLayers"),
    setNoiseSizeMod: (state, action) => setReducer(state, action, "noiseSizeMod"),
    setNoiseAlphaMod: (state, action) => setReducer(state, action, "noiseAlphaMod"),
    setNoiseSmokeIntensity: (state, action) => setReducer(state, action, "noiseSmokeIntensity"),
    setNoiseSparkColor: (state, action) => setReducer(state, action, "noiseSparkColor"),
    setNoiseSmokeColor: (state, action) => setReducer(state, action, "noiseSmokeColor"),
    setNoiseRemoveCol: (state, action) => setReducer(state, action, "noiseRemoveCol")
  }
})

export const {
  setNoiseSpeed,
  setNoiseRotateSpeed,
  setNoiseParticleSize,
  setNoiseLayers,
  setNoiseSizeMod,
  setNoiseAlphaMod,
  setNoiseSmokeIntensity,
  setNoiseSparkColor,
  setNoiseSmokeColor,
  setNoiseRemoveCol,
} = fireNoiseCParamsSlice.actions

export default fireNoiseCParamsSlice.reducer
