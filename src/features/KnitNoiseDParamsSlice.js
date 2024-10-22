import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseSharkY: 0.7,
  noiseSharkX: 0.1,
  noiseHue: 0.7,
  noiseSaturate: 0,
  noiseColor1: "#a5ceee",
  noiseColor2: "#ffc0e6",
  noiseRemoveCol: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const knitNoiseDParamsSlice = createSlice({
  name: "knitNoiseDParams",
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
} = knitNoiseDParamsSlice.actions

export default knitNoiseDParamsSlice.reducer