import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseOnlyBright: 0,
  noiseOnlyContrast: 0.4,
  noiseSubdivide: 3,
  noiseCellScale: 2,
  noiseWhiteScale: 0.5
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const voronoiWaterNoiseParamsSlice = createSlice({
  name: "voronoiWaterNoiseParams",
  initialState,
  reducers: {
    setNoiseOnlyBright: (state, action) => setReducer(state, action, "noiseOnlyBright"),
    setNoiseOnlyContrast: (state, action) => setReducer(state, action, "noiseOnlyContrast"),
    setNoiseSubdivide: (state, action) => setReducer(state, action, "noiseSubdivide"),
    setNoiseCellScale: (state, action) => setReducer(state, action, "noiseCellScale"),
    setNoiseWhiteScale: (state, action) => setReducer(state, action, "noiseWhiteScale")
  }
})

export const {
  setNoiseOnlyBright,
  setNoiseOnlyContrast,
  setNoiseSubdivide,
  setNoiseCellScale,
  setNoiseWhiteScale
} = voronoiWaterNoiseParamsSlice.actions

export default voronoiWaterNoiseParamsSlice.reducer