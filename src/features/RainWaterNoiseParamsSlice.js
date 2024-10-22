import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseOnlyBright: 6.5,
  noiseSingleCircleScale: 4,
  noiseCircleCount: 3,
  noiseBlurScale: 3.5,
  noiseCount: 3
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const rainWaterNoiseParamsSlice = createSlice({
  name: "rainWaterNoiseParams",
  initialState,
  reducers: {
    setNoiseOnlyBright: (state, action) => setReducer(state, action, "noiseOnlyBright"),
    setNoiseSingleCircleScale: (state, action) => setReducer(state, action, "noiseSingleCircleScale"),
    setNoiseCircleCount: (state, action) => setReducer(state, action, "noiseCircleCount"),
    setNoiseBlurScale: (state, action) => setReducer(state, action, "noiseBlurScale"),
    setNoiseCount: (state, action) => setReducer(state, action, "noiseCount")
  }
})

export const {
  setNoiseOnlyBright,
  setNoiseSingleCircleScale,
  setNoiseCircleCount,
  setNoiseBlurScale,
  setNoiseCount
} = rainWaterNoiseParamsSlice.actions

export default rainWaterNoiseParamsSlice.reducer