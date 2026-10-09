import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseScale: 5,
  noiseSpeed: 1,
  noiseDistScale: 5,
  noiseEdgeGain: 4,
  noiseEdgeOffset: 0.5,
  noiseHashRatio: 0.7,
  noiseHashSeed: 0
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const worleyEdgeNoiseParamsSlice = createSlice({
  name: "worleyEdgeNoiseParams",
  initialState,
  reducers: {
    setNoiseScale: (state, action) => setReducer(state, action, "noiseScale"),
    setNoiseSpeed: (state, action) => setReducer(state, action, "noiseSpeed"),
    setNoiseDistScale: (state, action) => setReducer(state, action, "noiseDistScale"),
    setNoiseEdgeGain: (state, action) => setReducer(state, action, "noiseEdgeGain"),
    setNoiseEdgeOffset: (state, action) => setReducer(state, action, "noiseEdgeOffset"),
    setNoiseHashRatio: (state, action) => setReducer(state, action, "noiseHashRatio"),
    setNoiseHashSeed: (state, action) => setReducer(state, action, "noiseHashSeed")
  }
})

export const {
  setNoiseScale,
  setNoiseSpeed,
  setNoiseDistScale,
  setNoiseEdgeGain,
  setNoiseEdgeOffset,
  setNoiseHashRatio,
  setNoiseHashSeed
} = worleyEdgeNoiseParamsSlice.actions

export default worleyEdgeNoiseParamsSlice.reducer
