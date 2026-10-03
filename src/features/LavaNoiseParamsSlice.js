import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseSpeed: 1,
  noiseFlowSpeed: 0.6,
  noiseFlowSpeed2: 1.9,
  noiseDisplacement: 0.5,
  noiseAdvect: 0.77,
  noiseDispFreq: 0.34,
  noiseRotSpeed: 6,
  noiseRidgeFreq: 7,
  noiseOctaves: 6,
  noiseGain: 1.4,
  noiseOctaveScale: 2,
  noiseBaseScale: 1.9,
  noiseColor: "#331203",
  noiseGamma: 1.4,
  noiseRemoveCol: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const lavaNoiseParamsSlice = createSlice({
  name: "lavaNoiseParams",
  initialState,
  reducers: {
    setNoiseSpeed: (state, action) => setReducer(state, action, "noiseSpeed"),
    setNoiseFlowSpeed: (state, action) => setReducer(state, action, "noiseFlowSpeed"),
    setNoiseFlowSpeed2: (state, action) => setReducer(state, action, "noiseFlowSpeed2"),
    setNoiseDisplacement: (state, action) => setReducer(state, action, "noiseDisplacement"),
    setNoiseAdvect: (state, action) => setReducer(state, action, "noiseAdvect"),
    setNoiseDispFreq: (state, action) => setReducer(state, action, "noiseDispFreq"),
    setNoiseRotSpeed: (state, action) => setReducer(state, action, "noiseRotSpeed"),
    setNoiseRidgeFreq: (state, action) => setReducer(state, action, "noiseRidgeFreq"),
    setNoiseOctaves: (state, action) => setReducer(state, action, "noiseOctaves"),
    setNoiseGain: (state, action) => setReducer(state, action, "noiseGain"),
    setNoiseOctaveScale: (state, action) => setReducer(state, action, "noiseOctaveScale"),
    setNoiseBaseScale: (state, action) => setReducer(state, action, "noiseBaseScale"),
    setNoiseColor: (state, action) => setReducer(state, action, "noiseColor"),
    setNoiseGamma: (state, action) => setReducer(state, action, "noiseGamma"),
    setNoiseRemoveCol: (state, action) => setReducer(state, action, "noiseRemoveCol")
  }
})

export const {
  setNoiseSpeed,
  setNoiseFlowSpeed,
  setNoiseFlowSpeed2,
  setNoiseDisplacement,
  setNoiseAdvect,
  setNoiseDispFreq,
  setNoiseRotSpeed,
  setNoiseRidgeFreq,
  setNoiseOctaves,
  setNoiseGain,
  setNoiseOctaveScale,
  setNoiseBaseScale,
  setNoiseColor,
  setNoiseGamma,
  setNoiseRemoveCol
} = lavaNoiseParamsSlice.actions

export default lavaNoiseParamsSlice.reducer
