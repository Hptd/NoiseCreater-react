import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseChooseValue: 3,
  noiseSpeed: 1,
  noiseDirX: 0.7,
  noiseDirY: 0.8,
  noiseLightX: 3,
  noiseLightY: 2,
  noiseLightZ: -1,
  noiseRemoveCol: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const gaborNoiseParamsSlice = createSlice({
  name: "gaborNoiseParams",
  initialState,
  reducers: {
    setNoiseChooseValue: (state, action) => setReducer(state, action, "noiseChooseValue"),
    setNoiseSpeed: (state, action) => setReducer(state, action, "noiseSpeed"),
    setNoiseDirX: (state, action) => setReducer(state, action, "noiseDirX"),
    setNoiseDirY: (state, action) => setReducer(state, action, "noiseDirY"),
    setNoiseLightX: (state, action) => setReducer(state, action, "noiseLightX"),
    setNoiseLightY: (state, action) => setReducer(state, action, "noiseLightY"),
    setNoiseLightZ: (state, action) => setReducer(state, action, "noiseLightZ"),
    setNoiseRemoveCol: (state, action) => setReducer(state, action, "noiseRemoveCol")
  }
})

export const {
  setNoiseChooseValue,
  setNoiseSpeed,
  setNoiseDirX,
  setNoiseDirY,
  setNoiseLightX,
  setNoiseLightY,
  setNoiseLightZ,
  setNoiseRemoveCol
} = gaborNoiseParamsSlice.actions

export default gaborNoiseParamsSlice.reducer
