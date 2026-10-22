import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseScale: 6.0,
  noiseSpeed: 0.5,
  noiseSampleDist: 0.02,
  noiseBumpStrength: 0.2,
  noiseBaseBright: 0.5,
  noiseColor: "#ffb399",
  noiseRemoveCol: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const warpedNoiseParamsSlice = createSlice({
  name: "warpedNoiseParams",
  initialState,
  reducers: {
    setNoiseScale: (state, action) => setReducer(state, action, "noiseScale"),
    setNoiseSpeed: (state, action) => setReducer(state, action, "noiseSpeed"),
    setNoiseSampleDist: (state, action) => setReducer(state, action, "noiseSampleDist"),
    setNoiseBumpStrength: (state, action) => setReducer(state, action, "noiseBumpStrength"),
    setNoiseBaseBright: (state, action) => setReducer(state, action, "noiseBaseBright"),
    setNoiseColor: (state, action) => setReducer(state, action, "noiseColor"),
    setNoiseRemoveCol: (state, action) => setReducer(state, action, "noiseRemoveCol")
  }
})

export const {
  setNoiseScale,
  setNoiseSpeed,
  setNoiseSampleDist,
  setNoiseBumpStrength,
  setNoiseBaseBright,
  setNoiseColor,
  setNoiseRemoveCol,
} = warpedNoiseParamsSlice.actions

export default warpedNoiseParamsSlice.reducer
