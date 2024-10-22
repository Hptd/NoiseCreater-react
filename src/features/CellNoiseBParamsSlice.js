import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseWhiteIntensity: 1.5
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const cellNoiseBParamsSlice = createSlice({
  name: "cellNoiseBParams",
  initialState,
  reducers: {
    setNoiseWhiteIntensity: (state, action) => setReducer(state, action, "noiseWhiteIntensity"),
  }
})

export const {
  setNoiseWhiteIntensity
} = cellNoiseBParamsSlice.actions

export default cellNoiseBParamsSlice.reducer