import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseOnlyBright: 1,
  noiseLightScale: 0.005,
  noiseSpacing: 4,
  noiseColor: "#005980",
  noiseRemoveCol: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const tileableWaterNoiseParamsSlice = createSlice({
  name: "tileableWaterNoiseParams",
  initialState,
  reducers: {
    setNoiseOnlyBright: (state, action) => setReducer(state, action, "noiseOnlyBright"),
    setNoiseLightScale: (state, action) => setReducer(state, action, "noiseLightScale"),
    setNoiseSpacing:    (state, action) => setReducer(state, action, "noiseSpacing"),
    setNoiseColor:      (state, action) => setReducer(state, action, "noiseColor"),
    setNoiseRemoveCol:  (state, action) => setReducer(state, action, "noiseRemoveCol")
  }
})

export const {
  setNoiseOnlyBright,
  setNoiseLightScale,
  setNoiseSpacing,
  setNoiseColor,
  setNoiseRemoveCol
} = tileableWaterNoiseParamsSlice.actions

export default tileableWaterNoiseParamsSlice.reducer