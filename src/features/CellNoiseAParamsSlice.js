import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseWhiteIntensity: 1
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const cellNoiseAParamsSlice = createSlice({
  name: "cellNoiseAParams",
  initialState,
  reducers: {
    setNoiseWhiteIntensity: (state, action) => setReducer(state, action, "noiseWhiteIntensity"),
  }
})

export const {
  setNoiseWhiteIntensity
} = cellNoiseAParamsSlice.actions

export default cellNoiseAParamsSlice.reducer