import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseSpeed: 1,
  noiseColor1: "#e90b09",
  noiseColor2: "#fab009",
  noiseRemoveCol: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const etherNoiseBParamsSlice = createSlice({
  name: "etherNoiseBParams",
  initialState,
  reducers: {
    setNoiseSpeed: (state, action) => setReducer(state, action, "noiseSpeed"),
    setNoiseColor1:      (state, action) => setReducer(state, action, "noiseColor1"),
    setNoiseColor2:      (state, action) => setReducer(state, action, "noiseColor2"),
    setNoiseRemoveCol:  (state, action) => setReducer(state, action, "noiseRemoveCol")
  }
})

export const {
  setNoiseSpeed,
  setNoiseColor1,
  setNoiseColor2,
  setNoiseRemoveCol
} = etherNoiseBParamsSlice.actions

export default etherNoiseBParamsSlice.reducer