import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseOnlyBright: 1,
  noiseColor: "#56a2d2",
  noiseBackgroundColor: "#000000",
  noiseRemoveCol: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const causticsWaterNoiseParamsSlice = createSlice({
  name: "causticsWaterNoiseParams",
  initialState,
  reducers: {
    setNoiseOnlyBright: (state, action) => setReducer(state, action, "noiseOnlyBright"),
    setNoiseColor:      (state, action) => setReducer(state, action, "noiseColor"),
    setBackgroundColor:      (state, action) => setReducer(state, action, "noiseBackgroundColor"),
    setNoiseRemoveCol:  (state, action) => setReducer(state, action, "noiseRemoveCol")
  }
})

export const {
  setNoiseOnlyBright,
  setNoiseColor,
  setBackgroundColor,
  setNoiseRemoveCol
} = causticsWaterNoiseParamsSlice.actions

export default causticsWaterNoiseParamsSlice.reducer