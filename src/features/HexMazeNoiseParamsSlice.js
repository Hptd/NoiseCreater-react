import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseDensity: 50,
  noiseHashFreq: 100000,
  noiseIntensity: 0.1,
  noiseThreshold: 0.5,
  noiseSeed: 0
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const hexMazeNoiseParamsSlice = createSlice({
  name: "hexMazeNoiseParams",
  initialState,
  reducers: {
    setNoiseDensity: (state, action) => setReducer(state, action, "noiseDensity"),
    setNoiseHashFreq: (state, action) => setReducer(state, action, "noiseHashFreq"),
    setNoiseIntensity: (state, action) => setReducer(state, action, "noiseIntensity"),
    setNoiseThreshold: (state, action) => setReducer(state, action, "noiseThreshold"),
    setNoiseSeed: (state, action) => setReducer(state, action, "noiseSeed")
  }
})

export const {
  setNoiseDensity,
  setNoiseHashFreq,
  setNoiseIntensity,
  setNoiseThreshold,
  setNoiseSeed
} = hexMazeNoiseParamsSlice.actions

export default hexMazeNoiseParamsSlice.reducer
