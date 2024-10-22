import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseOnlyBright: 2.5,
  noiseOnlyContrast: 2.5,
  noiseColor: "#56a2d2",
  noiseBackgroundColor: "#000000",
  noiseRemoveCol: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const forkedWaterNoiseParamsSlice = createSlice({
  name: "causticsWaterNoiseParams",
  initialState,
  reducers: {
    setNoiseOnlyBright: (state, action) => setReducer(state, action, "noiseOnlyBright"),
    setNoiseOnlyContrast: (state, action) => setReducer(state, action, "noiseOnlyContrast"),
    setNoiseColor:      (state, action) => setReducer(state, action, "noiseColor"),
    setBackgroundColor:      (state, action) => setReducer(state, action, "noiseBackgroundColor"),
    setNoiseRemoveCol:  (state, action) => setReducer(state, action, "noiseRemoveCol")
  }
})

export const {
  setNoiseOnlyBright,
  setNoiseOnlyContrast,
  setNoiseColor,
  setBackgroundColor,
  setNoiseRemoveCol
} = forkedWaterNoiseParamsSlice.actions

export default forkedWaterNoiseParamsSlice.reducer