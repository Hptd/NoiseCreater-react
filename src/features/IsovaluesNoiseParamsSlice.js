import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseLineSize: 260,
  noiseSharkX: 20,
  noiseSharkY: 20,
  noiseSpeed: 0.1,
  noiseRemoveCol: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const isovaluesNoiseParamsSlice = createSlice({
  name: "isovaluesNoiseParams",
  initialState,
  reducers: {
    setNoiseLineSize: (state, action) => setReducer(state, action, "noiseLineSize"),
    setNoiseSharkX:    (state, action) => setReducer(state, action, "noiseSharkX"),
    setNoiseSharkY:    (state, action) => setReducer(state, action, "noiseSharkY"),
    setNoiseSpeed:     (state, action) => setReducer(state, action, "noiseSpeed"),
    setNoiseRemoveCol:  (state, action) => setReducer(state, action, "noiseRemoveCol")
  }
})

export const {
  setNoiseLineSize,
  setNoiseSharkX,
  setNoiseSharkY,
  setNoiseSpeed,
  setNoiseRemoveCol
} = isovaluesNoiseParamsSlice.actions

export default isovaluesNoiseParamsSlice.reducer