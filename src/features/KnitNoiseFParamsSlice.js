import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseSharkX: 0.42,
  noiseSharkY: 0.35,
  noiseHue: 0.0225,
  noiseColor1: "#ffffff",
  noiseColor2: "#4c4c4c",
  noiseColor3: "#cccccc",
  noiseRemoveCol: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const knitNoiseFParamsSlice = createSlice({
  name: "knitNoiseFParams",
  initialState,
  reducers: {
    setNoiseSharkY: (state, action) => setReducer(state, action, "noiseSharkY"),
    setNoiseSharkX: (state, action) => setReducer(state, action, "noiseSharkX"),
    setNoiseHue: (state, action) => setReducer(state, action, "noiseHue"),
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
  setNoiseColor1,
  setNoiseColor2,
  setNoiseColor3,
  setNoiseRemoveCol
} = knitNoiseFParamsSlice.actions

export default knitNoiseFParamsSlice.reducer