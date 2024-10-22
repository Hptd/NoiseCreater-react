import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseOnlyBright: 1,
  noiseDelicate: 1.1,
  noiseBroken: 8,
  noiseDetail: 16,
  noiseSilkSize: 1,
  noiseSilkContrast: 8
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const silkNoiseParamsSlice = createSlice({
  name: "silkNoiseParams",
  initialState,
  reducers: {
    setNoiseOnlyBright: (state, action) => setReducer(state, action, "noiseOnlyBright"),
    setNoiseDelicate: (state, action) => setReducer(state, action, "noiseDelicate"),
    setNoiseBroken: (state, action) => setReducer(state, action, "noiseBroken"),
    setNoiseDetail: (state, action) => setReducer(state, action, "noiseDetail"),
    setNoiseSilkSize: (state, action) => setReducer(state, action, "noiseSilkSize"),
    setNoiseSilkContrast: (state, action) => setReducer(state, action, "noiseSilkContrast")
  }
})

export const {
  setNoiseOnlyBright,
  setNoiseDelicate,
  setNoiseBroken,
  setNoiseDetail,
  setNoiseSilkSize,
  setNoiseSilkContrast
} = silkNoiseParamsSlice.actions

export default silkNoiseParamsSlice.reducer