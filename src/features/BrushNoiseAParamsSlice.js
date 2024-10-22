import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseSharkX: 1,
  noiseColor1: "#000000",
  noiseColor2: "#ffffff"
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const brushNoiseAParamsSlice = createSlice({
  name: "brushNoiseAParams",
  initialState,
  reducers: {
    setNoiseSharkX: (state, action) => setReducer(state, action, "noiseSharkX"),
    setNoiseColor1:      (state, action) => setReducer(state, action, "noiseColor1"),
    setNoiseColor2:      (state, action) => setReducer(state, action, "noiseColor2")
  }
})

export const {
  setNoiseSharkX,
  setNoiseColor1,
  setNoiseColor2,
} = brushNoiseAParamsSlice.actions

export default brushNoiseAParamsSlice.reducer