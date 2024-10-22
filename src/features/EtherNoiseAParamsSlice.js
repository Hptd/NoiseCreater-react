import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseOnlyBright: 5,
  noiseSharkX: 2,
  noiseSharkY: 0.5,
  noiseHue: 0.4,
  noiseSaturate: 0.3,
  noiseSpeed: 1,
  noiseColor1: "#1A4D66",
  noiseRemoveCol: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const etherNoiseAParamsSlice = createSlice({
  name: "etherNoiseAParams",
  initialState,
  reducers: {
    setNoiseOnlyBright: (state, action) => setReducer(state, action, "noiseOnlyBright"),
    setNoiseSharkX: (state, action) => setReducer(state, action, "noiseSharkX"),
    setNoiseSharkY: (state, action) => setReducer(state, action, "noiseSharkY"),
    setNoiseHue: (state, action) => setReducer(state, action, "noiseHue"),
    setNoiseSaturate: (state, action) => setReducer(state, action, "noiseSaturate"),
    setNoiseSpeed: (state, action) => setReducer(state, action, "noiseSpeed"),
    setNoiseColor1:      (state, action) => setReducer(state, action, "noiseColor1"),
    setNoiseRemoveCol:  (state, action) => setReducer(state, action, "noiseRemoveCol")
  }
})

export const {
  setNoiseSharkX,
  setNoiseSharkY,
  setNoiseHue,
  setNoiseSaturate,
  setNoiseSpeed,
  setNoiseOnlyBright,
  setNoiseColor1,
  setNoiseRemoveCol
} = etherNoiseAParamsSlice.actions

export default etherNoiseAParamsSlice.reducer