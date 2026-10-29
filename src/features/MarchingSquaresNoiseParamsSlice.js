import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseGridScale: 40,
  noiseNoiseFreq: 0.1,
  noiseThreshold: 0,
  noiseSpeed: 1,
  noiseLineWidth: 0.1,
  noiseDotSize: 0.1,
  noiseEdgeSoft: 0,
  noiseLineColor: "#ffffff",
  noiseBgColor: "#000000",
  noiseRemoveCol: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const marchingSquaresNoiseParamsSlice = createSlice({
  name: "marchingSquaresNoiseParams",
  initialState,
  reducers: {
    setNoiseGridScale: (state, action) => setReducer(state, action, "noiseGridScale"),
    setNoiseNoiseFreq: (state, action) => setReducer(state, action, "noiseNoiseFreq"),
    setNoiseThreshold: (state, action) => setReducer(state, action, "noiseThreshold"),
    setNoiseSpeed: (state, action) => setReducer(state, action, "noiseSpeed"),
    setNoiseLineWidth: (state, action) => setReducer(state, action, "noiseLineWidth"),
    setNoiseDotSize: (state, action) => setReducer(state, action, "noiseDotSize"),
    setNoiseEdgeSoft: (state, action) => setReducer(state, action, "noiseEdgeSoft"),
    setNoiseLineColor: (state, action) => setReducer(state, action, "noiseLineColor"),
    setNoiseBgColor: (state, action) => setReducer(state, action, "noiseBgColor"),
    setNoiseRemoveCol: (state, action) => setReducer(state, action, "noiseRemoveCol")
  }
})

export const {
  setNoiseGridScale,
  setNoiseNoiseFreq,
  setNoiseThreshold,
  setNoiseSpeed,
  setNoiseLineWidth,
  setNoiseDotSize,
  setNoiseEdgeSoft,
  setNoiseLineColor,
  setNoiseBgColor,
  setNoiseRemoveCol
} = marchingSquaresNoiseParamsSlice.actions

export default marchingSquaresNoiseParamsSlice.reducer
