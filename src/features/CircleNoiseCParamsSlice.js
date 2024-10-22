import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseSharkX: 1,
  noiseSharkY: 2,
  noiseHue: 0.5,
  noiseSaturate: 0.1,
  noiseOnlyBright: 0.1,
  noiseColor1: '#202b33',
  noiseColor2: '#ebf1f5',
  noiseRemoveCol: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const circleNoiseCParamsSlice = createSlice({
  name: "circleNoiseCParams",
  initialState,
  reducers: {
    setNoiseOnlyBright: (state, action) => setReducer(state, action, "noiseOnlyBright"),
    setNoiseSaturate: (state, action) => setReducer(state, action, "noiseSaturate"),
    setNoiseHue: (state, action) => setReducer(state, action, "noiseHue"),
    setNoiseSharkX: (state, action) => setReducer(state, action, "noiseSharkX"),
    setNoiseSharkY: (state, action) => setReducer(state, action, "noiseSharkY"),
    setNoiseColor1: (state, action) => setReducer(state, action, "noiseColor1"),
    setNoiseColor2: (state, action) => setReducer(state, action, "noiseColor2"),
    setNoiseRemoveCol:  (state, action) => setReducer(state, action, "noiseRemoveCol")
  }
})

export const {
  setNoiseColor1,
  setNoiseColor2,
  setNoiseHue,
  setNoiseSharkX,
  setNoiseSharkY,
  setNoiseSaturate,
  setNoiseOnlyBright,
  setNoiseRemoveCol
} = circleNoiseCParamsSlice.actions

export default circleNoiseCParamsSlice.reducer