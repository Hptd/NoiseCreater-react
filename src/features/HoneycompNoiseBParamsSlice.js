import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseDelicate: 3,
  noiseBroken: 2
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const honeycompNoiseBParamsSlice = createSlice({
  name: "honeycompNoiseBParams",
  initialState,
  reducers: {
    setNoiseDelicate: (state, action) => setReducer(state, action, "noiseDelicate"),
    setNoiseBroken: (state, action) => setReducer(state, action, "noiseBroken")
  }
})

export const {
  setNoiseDelicate,
  setNoiseBroken
} = honeycompNoiseBParamsSlice.actions

export default honeycompNoiseBParamsSlice.reducer