import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseDelicate: 40,
  noiseBroken: 1
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const cellNoiseCParamsSlice = createSlice({
  name: "cellNoiseCParams",
  initialState,
  reducers: {
    setNoiseDelicate: (state, action) => setReducer(state, action, "noiseDelicate"),
    setNoiseBroken: (state, action) => setReducer(state, action, "noiseBroken"),
  }
})

export const {
  setNoiseDelicate,
  setNoiseBroken
} = cellNoiseCParamsSlice.actions

export default cellNoiseCParamsSlice.reducer