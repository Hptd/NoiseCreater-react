import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseOnlyBright: 0.35,
  noiseSharkX: 0.01,
  noiseSharkY: 0.1,
  noiseSharkZ: 0.7,
  noiseHue: 2,
  noiseSaturate: 2,
  noiseSpeed: 2,
  noiseRemoveCol: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const etherNoiseCParamsSlice = createSlice({
  name: "etherNoiseCParams",
  initialState,
  reducers: {
    setNoiseOnlyBright: (state, action) => setReducer(state, action, "noiseOnlyBright"),
    setNoiseSharkX: (state, action) => setReducer(state, action, "noiseSharkX"),
    setNoiseSharkY: (state, action) => setReducer(state, action, "noiseSharkY"),
    setNoiseSharkZ: (state, action) => setReducer(state, action, "noiseSharkZ"),
    setNoiseHue: (state, action) => setReducer(state, action, "noiseHue"),
    setNoiseSaturate: (state, action) => setReducer(state, action, "noiseSaturate"),
    setNoiseSpeed: (state, action) => setReducer(state, action, "noiseSpeed"),
    setNoiseRemoveCol:  (state, action) => setReducer(state, action, "noiseRemoveCol")
  }
})

export const {
  setNoiseSharkX,
  setNoiseSharkY,
  setNoiseSharkZ,
  setNoiseHue,
  setNoiseSaturate,
  setNoiseSpeed,
  setNoiseOnlyBright,
  setNoiseRemoveCol
} = etherNoiseCParamsSlice.actions

export default etherNoiseCParamsSlice.reducer