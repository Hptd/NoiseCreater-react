import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseSeed: 0,
  noiseSteady: true,
  noiseStrikePeriod: 1.4,
  noiseDecay: 5.0,
  noiseBranchAmount: 3,
  noiseBranchLength: 1.4,
  noiseDistortion: 0.06,
  noiseNoiseScale: 16,
  noiseDoReveal: false,
  noiseCoreColor: "#ffffff",
  noiseSheathColor: "#a6d9ff",
  noiseGlowColor: "#6666f2",
  noiseRemoveCol: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const lightningNoiseParamsSlice = createSlice({
  name: "lightningNoiseParams",
  initialState,
  reducers: {
    setNoiseSeed: (state, action) => setReducer(state, action, "noiseSeed"),
    setNoiseSteady: (state, action) => setReducer(state, action, "noiseSteady"),
    setNoiseStrikePeriod: (state, action) => setReducer(state, action, "noiseStrikePeriod"),
    setNoiseDecay: (state, action) => setReducer(state, action, "noiseDecay"),
    setNoiseBranchAmount: (state, action) => setReducer(state, action, "noiseBranchAmount"),
    setNoiseBranchLength: (state, action) => setReducer(state, action, "noiseBranchLength"),
    setNoiseDistortion: (state, action) => setReducer(state, action, "noiseDistortion"),
    setNoiseNoiseScale: (state, action) => setReducer(state, action, "noiseNoiseScale"),
    setNoiseDoReveal: (state, action) => setReducer(state, action, "noiseDoReveal"),
    setNoiseCoreColor: (state, action) => setReducer(state, action, "noiseCoreColor"),
    setNoiseSheathColor: (state, action) => setReducer(state, action, "noiseSheathColor"),
    setNoiseGlowColor: (state, action) => setReducer(state, action, "noiseGlowColor"),
    setNoiseRemoveCol: (state, action) => setReducer(state, action, "noiseRemoveCol")
  }
})

export const {
  setNoiseSeed,
  setNoiseSteady,
  setNoiseStrikePeriod,
  setNoiseDecay,
  setNoiseBranchAmount,
  setNoiseBranchLength,
  setNoiseDistortion,
  setNoiseNoiseScale,
  setNoiseDoReveal,
  setNoiseCoreColor,
  setNoiseSheathColor,
  setNoiseGlowColor,
  setNoiseRemoveCol
} = lightningNoiseParamsSlice.actions

export default lightningNoiseParamsSlice.reducer
