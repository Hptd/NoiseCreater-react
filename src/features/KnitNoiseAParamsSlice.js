import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseOnlyBright: 0,
  noiseSharkX: 0.5,
  noiseSharkY: 0.7,
  noiseHue: 0.5,
  noiseSaturate: 2
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const knitNoiseAParamsSlice = createSlice({
  name: "knitNoiseAParams",
  initialState,
  reducers: {
    setNoiseOnlyBright: (state, action) => setReducer(state, action, "noiseOnlyBright"),
    setNoiseSharkX: (state, action) => setReducer(state, action, "noiseSharkX"),
    setNoiseSharkY: (state, action) => setReducer(state, action, "noiseSharkY"),
    setNoiseHue: (state, action) => setReducer(state, action, "noiseHue"),
    setNoiseSaturate: (state, action) => setReducer(state, action, "noiseSaturate")
  }
})

export const {
  setNoiseOnlyBright,
  setNoiseSharkX,
  setNoiseSharkY,
  setNoiseHue,
  setNoiseSaturate
} = knitNoiseAParamsSlice.actions

export default knitNoiseAParamsSlice.reducer