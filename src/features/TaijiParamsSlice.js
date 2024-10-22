import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseSharkX: 0.02,
  noiseSharkY: 0.12,
  noiseSpeed: 1
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const taijiParamsSlice = createSlice({
  name: "taijiParams",
  initialState,
  reducers: {
    setNoiseSharkX: (state, action) => setReducer(state, action, "noiseSharkX"),
    setNoiseSharkY: (state, action) => setReducer(state, action, "noiseSharkY"),
    setNoiseSpeed: (state, action) => setReducer(state, action, "noiseSpeed"),
  }
})

export const {
  setNoiseSharkX,
  setNoiseSharkY,
  setNoiseSpeed
} = taijiParamsSlice.actions

export default taijiParamsSlice.reducer