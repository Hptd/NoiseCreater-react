import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseOnlyBright: 0,
  noiseSaturate: 1,
  noiseHue: 0,
  noiseRemoveCol: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const squircleColorNoiseParamsSlice = createSlice({
  name: "squircleColorNoiseParams",
  initialState,
  reducers: {
    setNoiseOnlyBright: (state, action) => setReducer(state, action, "noiseOnlyBright"),
    setNoiseSaturate: (state, action) => setReducer(state, action, "noiseSaturate"),
    setNoiseHue:    (state, action) => setReducer(state, action, "noiseHue"),
    setNoiseRemoveCol:  (state, action) => setReducer(state, action, "noiseRemoveCol")
  }
})

export const {
  setNoiseOnlyBright,
  setNoiseSaturate,
  setNoiseHue,
  setNoiseRemoveCol
} = squircleColorNoiseParamsSlice.actions

export default squircleColorNoiseParamsSlice.reducer