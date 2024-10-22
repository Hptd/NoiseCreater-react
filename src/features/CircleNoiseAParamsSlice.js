import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseSingleSize: 0.4,
  noiseBroken: 1,
  noiseRefrac: 0.01,
  noiseSharkX: 1,
  noiseSharkY: 2,
  noiseHue: 0,
  noiseSaturate: 1,
  noiseOnlyBright: 0,
  noiseRemoveCol: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const circleNoiseAParamsSlice = createSlice({
  name: "circleNoiseAParams",
  initialState,
  reducers: {
    setNoiseSingleSize: (state, action) => setReducer(state, action, "noiseSingleSize"),
    setNoiseBroken: (state, action) => setReducer(state, action, "noiseBroken"),
    setNoiseRefrac: (state, action) => setReducer(state, action, "noiseRefrac"),
    setNoiseSharkX: (state, action) => setReducer(state, action, "noiseSharkX"),
    setNoiseSharkY: (state, action) => setReducer(state, action, "noiseSharkY"),
    setNoiseHue: (state, action) => setReducer(state, action, "noiseHue"),
    setNoiseSaturate: (state, action) => setReducer(state, action, "noiseSaturate"),
    setNoiseOnlyBright: (state, action) => setReducer(state, action, "noiseOnlyBright"),
    setNoiseRemoveCol:  (state, action) => setReducer(state, action, "noiseRemoveCol")
  }
})

export const {
  setNoiseSingleSize,
  setNoiseBroken,
  setNoiseRefrac,
  setNoiseSharkX,
  setNoiseSharkY,
  setNoiseHue,
  setNoiseSaturate,
  setNoiseOnlyBright,
  setNoiseRemoveCol
} = circleNoiseAParamsSlice.actions

export default circleNoiseAParamsSlice.reducer