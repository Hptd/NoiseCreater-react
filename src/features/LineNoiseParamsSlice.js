import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseWidth: 0.05,
  noiseBorder: 0.003,
  noiseFreq: 50.0,
  noiseStrength: 0.01,
  noiseSpeed: 5.0,
  noiseGrow: 0.5,
  noiseSeed: 0.0
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const lineNoiseParamsSlice = createSlice({
  name: "lineNoiseParams",
  initialState,
  reducers: {
    setNoiseWidth: (state, action) => setReducer(state, action, "noiseWidth"),
    setNoiseBorder: (state, action) => setReducer(state, action, "noiseBorder"),
    setNoiseFreq: (state, action) => setReducer(state, action, "noiseFreq"),
    setNoiseStrength: (state, action) => setReducer(state, action, "noiseStrength"),
    setNoiseSpeed: (state, action) => setReducer(state, action, "noiseSpeed"),
    setNoiseGrow: (state, action) => setReducer(state, action, "noiseGrow"),
    setNoiseSeed: (state, action) => setReducer(state, action, "noiseSeed")
  }
})

export const {
  setNoiseWidth,
  setNoiseBorder,
  setNoiseFreq,
  setNoiseStrength,
  setNoiseSpeed,
  setNoiseGrow,
  setNoiseSeed,
} = lineNoiseParamsSlice.actions

export default lineNoiseParamsSlice.reducer
