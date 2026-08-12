import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseSpeed: 0.2,
  noiseRowThickness: 20,
  noiseDashFreq: 4,
  noiseDashScale: 7,
  noiseMoveSpeed: 5.1,
  noiseXOffsetDiv: 3,
  noiseDashRatio: 0.5,
  noiseLineWidth: 0.15
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const dashLineNoiseParamsSlice = createSlice({
  name: "dashLineNoiseParams",
  initialState,
  reducers: {
    setNoiseSpeed: (state, action) => setReducer(state, action, "noiseSpeed"),
    setNoiseRowThickness: (state, action) => setReducer(state, action, "noiseRowThickness"),
    setNoiseDashFreq: (state, action) => setReducer(state, action, "noiseDashFreq"),
    setNoiseDashScale: (state, action) => setReducer(state, action, "noiseDashScale"),
    setNoiseMoveSpeed: (state, action) => setReducer(state, action, "noiseMoveSpeed"),
    setNoiseXOffsetDiv: (state, action) => setReducer(state, action, "noiseXOffsetDiv"),
    setNoiseDashRatio: (state, action) => setReducer(state, action, "noiseDashRatio"),
    setNoiseLineWidth: (state, action) => setReducer(state, action, "noiseLineWidth")
  }
})

export const {
  setNoiseSpeed,
  setNoiseRowThickness,
  setNoiseDashFreq,
  setNoiseDashScale,
  setNoiseMoveSpeed,
  setNoiseXOffsetDiv,
  setNoiseDashRatio,
  setNoiseLineWidth
} = dashLineNoiseParamsSlice.actions

export default dashLineNoiseParamsSlice.reducer
