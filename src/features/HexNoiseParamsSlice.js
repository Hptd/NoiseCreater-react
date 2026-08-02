import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseDensity: 10,
  noiseEdgeWidth: 0.04,
  noiseEdgeSoft: 0.02
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const hexNoiseParamsSlice = createSlice({
  name: "hexNoiseParams",
  initialState,
  reducers: {
    setNoiseDensity: (state, action) => setReducer(state, action, "noiseDensity"),
    setNoiseEdgeWidth: (state, action) => setReducer(state, action, "noiseEdgeWidth"),
    setNoiseEdgeSoft: (state, action) => setReducer(state, action, "noiseEdgeSoft")
  }
})

export const {
  setNoiseDensity,
  setNoiseEdgeWidth,
  setNoiseEdgeSoft
} = hexNoiseParamsSlice.actions

export default hexNoiseParamsSlice.reducer