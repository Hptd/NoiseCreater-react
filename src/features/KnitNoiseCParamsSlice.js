import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseSharkY: 0.25,
  noiseSharkX: 0.25,
  noiseHue: 0.1,
  noiseSaturate: 0.5,
  noiseColor1: "#ff0080",
  noiseColor2: "#ffcc33",
  noiseRemoveCol: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const knitNoiseCParamsSlice = createSlice({
  name: "knitNoiseCParams",
  initialState,
  reducers: {
    setNoiseSharkY: (state, action) => setReducer(state, action, "noiseSharkY"),
    setNoiseSharkX: (state, action) => setReducer(state, action, "noiseSharkX"),
    setNoiseHue: (state, action) => setReducer(state, action, "noiseHue"),
    setNoiseSaturate: (state, action) => setReducer(state, action, "noiseSaturate"),
    setNoiseColor1:      (state, action) => setReducer(state, action, "noiseColor1"),
    setNoiseColor2:      (state, action) => setReducer(state, action, "noiseColor2"),
    setNoiseRemoveCol:  (state, action) => setReducer(state, action, "noiseRemoveCol")
  }
})

export const {
  setNoiseSharkX,
  setNoiseSharkY,
  setNoiseHue,
  setNoiseSaturate,
  setNoiseColor1,
  setNoiseColor2,
  setNoiseRemoveCol
} = knitNoiseCParamsSlice.actions

export default knitNoiseCParamsSlice.reducer