import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseCount: 1,
  noiseHeng: 0,
  noiseZong: 0,
  noiseSharkX: 0.5,
  noiseColor1: "#000000",
  noiseColor2: "#ffffff"
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const brushNoiseBParamsSlice = createSlice({
  name: "brushNoiseBParams",
  initialState,
  reducers: {
    setNoiseCount:       (state, action) => setReducer(state, action, "noiseCount"),
    setNoiseHeng:        (state, action) => setReducer(state, action, "noiseHeng"),
    setNoiseZong:        (state, action) => setReducer(state, action, "noiseZong"),
    setNoiseSharkX: (state, action) => setReducer(state, action, "noiseSharkX"),
    setNoiseColor1:      (state, action) => setReducer(state, action, "noiseColor1"),
    setNoiseColor2:      (state, action) => setReducer(state, action, "noiseColor2")
  }
})

export const {
  setNoiseSharkX,
  setNoiseCount,
  setNoiseHeng,
  setNoiseZong,
  setNoiseColor1,
  setNoiseColor2,
} = brushNoiseBParamsSlice.actions

export default brushNoiseBParamsSlice.reducer