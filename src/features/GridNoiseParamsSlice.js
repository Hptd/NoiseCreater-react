import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseMaxSize: 0.04,
  noiseRotateAngle: 0,
  noiseRotate: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const gridNoiseParamsSlice = createSlice({
  name: "gridNoiseParams",
  initialState,
  reducers: {
    setNoiseMaxSize: (state, action) => setReducer(state, action, "noiseMaxSize"),
    setNoiseRotateAngle: (state, action) => setReducer(state, action, "noiseRotateAngle"),
    setNoiseRotate:  (state, action) => setReducer(state, action, "noiseRotate")
  }
})

export const {
  setNoiseMaxSize,
  setNoiseRotateAngle,
  setNoiseRotate
} = gridNoiseParamsSlice.actions

export default gridNoiseParamsSlice.reducer