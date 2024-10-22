import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseColor1: '#4C0F4C',
  noiseColor2: '#1A6680',
  noiseHue: 0,
  noiseSaturate: 1,
  noiseOnlyBright: 1,
  noiseRemoveCol: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const circleNoiseBParamsSlice = createSlice({
  name: "circleNoiseBParams",
  initialState,
  reducers: {
    setNoiseColor1: (state, action) => setReducer(state, action, "noiseColor1"),
    setNoiseColor2: (state, action) => setReducer(state, action, "noiseColor2"),
    setNoiseHue: (state, action) => setReducer(state, action, "noiseHue"),
    setNoiseSaturate: (state, action) => setReducer(state, action, "noiseSaturate"),
    setNoiseOnlyBright: (state, action) => setReducer(state, action, "noiseOnlyBright"),
    setNoiseRemoveCol:  (state, action) => setReducer(state, action, "noiseRemoveCol")
  }
})

export const {
  setNoiseColor1,
  setNoiseColor2,
  setNoiseHue,
  setNoiseSaturate,
  setNoiseOnlyBright,
  setNoiseRemoveCol
} = circleNoiseBParamsSlice.actions

export default circleNoiseBParamsSlice.reducer