import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseSharkX: 1,
  noiseSharkY: 0.5
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const knitNoiseEParamsSlice = createSlice({
  name: "knitNoiseEParams",
  initialState,
  reducers: {
    setNoiseSharkX: (state, action) => setReducer(state, action, "noiseSharkX"),
    setNoiseSharkY: (state, action) => setReducer(state, action, "noiseSharkY")
  }
})

export const {
  setNoiseSharkX,
  setNoiseSharkY
} = knitNoiseEParamsSlice.actions

export default knitNoiseEParamsSlice.reducer