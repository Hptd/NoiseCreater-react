import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseColor1: "#f00508",
  noiseColor2: "#0a0a38",
  noiseColor3: "#ffccff",
  noiseColor4: "#336680",
  noiseTimeSpeed: 0.1,
  noiseScale: 3.5,
  noiseMixExp1: 4.0,
  noiseMixExp2: 1.4,
  noiseGamma: 2.0,
  noiseLacunarity: 2.0,
  noiseRoughness: 0.33,
  noiseLacunarity2: 3.0,
  noiseRoughness2: 0.5,
  noiseWarpStrength: 1.0,
  noiseDomainWarp: 0.006,
  noiseRemoveCol: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const fbmColorNoiseParamsSlice = createSlice({
  name: "fbmColorNoiseParams",
  initialState,
  reducers: {
    setNoiseColor1: (state, action) => setReducer(state, action, "noiseColor1"),
    setNoiseColor2: (state, action) => setReducer(state, action, "noiseColor2"),
    setNoiseColor3: (state, action) => setReducer(state, action, "noiseColor3"),
    setNoiseColor4: (state, action) => setReducer(state, action, "noiseColor4"),
    setNoiseTimeSpeed: (state, action) => setReducer(state, action, "noiseTimeSpeed"),
    setNoiseScale: (state, action) => setReducer(state, action, "noiseScale"),
    setNoiseMixExp1: (state, action) => setReducer(state, action, "noiseMixExp1"),
    setNoiseMixExp2: (state, action) => setReducer(state, action, "noiseMixExp2"),
    setNoiseGamma: (state, action) => setReducer(state, action, "noiseGamma"),
    setNoiseLacunarity: (state, action) => setReducer(state, action, "noiseLacunarity"),
    setNoiseRoughness: (state, action) => setReducer(state, action, "noiseRoughness"),
    setNoiseLacunarity2: (state, action) => setReducer(state, action, "noiseLacunarity2"),
    setNoiseRoughness2: (state, action) => setReducer(state, action, "noiseRoughness2"),
    setNoiseWarpStrength: (state, action) => setReducer(state, action, "noiseWarpStrength"),
    setNoiseDomainWarp: (state, action) => setReducer(state, action, "noiseDomainWarp"),
    setNoiseRemoveCol: (state, action) => setReducer(state, action, "noiseRemoveCol")
  }
})

export const {
  setNoiseColor1,
  setNoiseColor2,
  setNoiseColor3,
  setNoiseColor4,
  setNoiseTimeSpeed,
  setNoiseScale,
  setNoiseMixExp1,
  setNoiseMixExp2,
  setNoiseGamma,
  setNoiseLacunarity,
  setNoiseRoughness,
  setNoiseLacunarity2,
  setNoiseRoughness2,
  setNoiseWarpStrength,
  setNoiseDomainWarp,
  setNoiseRemoveCol
} = fbmColorNoiseParamsSlice.actions

export default fbmColorNoiseParamsSlice.reducer
