import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseSharkX: 0.45,
  noiseSharkY: 0.2,
  noiseHue: 0.15,
  noiseSaturate: 2,
  noiseColor1: "#ffffff",
  noiseColor2: "#ffc0e6",
  noiseColor3: "#000000",
  noiseRemoveCol: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const knitNoiseBParamsSlice = createSlice({
  name: "knitNoiseBParams",
  initialState,
  reducers: {
    setNoiseSharkX: (state, action) => setReducer(state, action, "noiseSharkX"),
    setNoiseSharkY: (state, action) => setReducer(state, action, "noiseSharkY"),
    setNoiseHue: (state, action) => setReducer(state, action, "noiseHue"),
    setNoiseSaturate: (state, action) => setReducer(state, action, "noiseSaturate"),
    setNoiseColor1:      (state, action) => setReducer(state, action, "noiseColor1"),
    setNoiseColor2:      (state, action) => setReducer(state, action, "noiseColor2"),
    setNoiseColor3:      (state, action) => setReducer(state, action, "noiseColor3"),
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
  setNoiseColor3,
  setNoiseRemoveCol
} = knitNoiseBParamsSlice.actions

export default knitNoiseBParamsSlice.reducer