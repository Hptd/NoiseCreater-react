import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseSkyColor: "#ffffff",
  noiseSunColor: "#ff3300",
  noiseBirdColor: "#a6a6a6",
  noiseSunSize: 0.1,
  noiseSunX: 0.5,
  noiseSunY: 0.3,
  noiseNoiseFreq: 4,
  noiseMountainAmp: 0.1,
  noiseDetailAmp: 0.005,
  noiseMountainThreshold: 0.48,
  noiseFogStrength: 0.2,
  noiseGlobalSpeed: 0.5,
  noiseParallaxSpeed: 1,
  noiseShowBird: true,
  noiseRemoveCol: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const mountainSunsetNoiseParamsSlice = createSlice({
  name: "mountainSunsetNoiseParams",
  initialState,
  reducers: {
    setNoiseSkyColor: (state, action) => setReducer(state, action, "noiseSkyColor"),
    setNoiseSunColor: (state, action) => setReducer(state, action, "noiseSunColor"),
    setNoiseBirdColor: (state, action) => setReducer(state, action, "noiseBirdColor"),
    setNoiseSunSize: (state, action) => setReducer(state, action, "noiseSunSize"),
    setNoiseSunX: (state, action) => setReducer(state, action, "noiseSunX"),
    setNoiseSunY: (state, action) => setReducer(state, action, "noiseSunY"),
    setNoiseNoiseFreq: (state, action) => setReducer(state, action, "noiseNoiseFreq"),
    setNoiseMountainAmp: (state, action) => setReducer(state, action, "noiseMountainAmp"),
    setNoiseDetailAmp: (state, action) => setReducer(state, action, "noiseDetailAmp"),
    setNoiseMountainThreshold: (state, action) => setReducer(state, action, "noiseMountainThreshold"),
    setNoiseFogStrength: (state, action) => setReducer(state, action, "noiseFogStrength"),
    setNoiseGlobalSpeed: (state, action) => setReducer(state, action, "noiseGlobalSpeed"),
    setNoiseParallaxSpeed: (state, action) => setReducer(state, action, "noiseParallaxSpeed"),
    setNoiseShowBird: (state, action) => setReducer(state, action, "noiseShowBird"),
    setNoiseRemoveCol: (state, action) => setReducer(state, action, "noiseRemoveCol")
  }
})

export const {
  setNoiseSkyColor,
  setNoiseSunColor,
  setNoiseBirdColor,
  setNoiseSunSize,
  setNoiseSunX,
  setNoiseSunY,
  setNoiseNoiseFreq,
  setNoiseMountainAmp,
  setNoiseDetailAmp,
  setNoiseMountainThreshold,
  setNoiseFogStrength,
  setNoiseGlobalSpeed,
  setNoiseParallaxSpeed,
  setNoiseShowBird,
  setNoiseRemoveCol
} = mountainSunsetNoiseParamsSlice.actions

export default mountainSunsetNoiseParamsSlice.reducer
