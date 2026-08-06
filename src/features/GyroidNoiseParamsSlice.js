import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseScale: 1,
  noiseSpeed: 0.1,
  noiseWarp: 6,
  noiseBump: 0.2,
  noiseSpecular: 10,
  noiseTintStrength: 0.3,
  noiseHue: 5,
  noiseRimColor: "#ff9494",
  noiseRimPower: 2,
  noiseRemoveCol: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const gyroidNoiseParamsSlice = createSlice({
  name: "gyroidNoiseParams",
  initialState,
  reducers: {
    setNoiseScale: (state, action) => setReducer(state, action, "noiseScale"),
    setNoiseSpeed: (state, action) => setReducer(state, action, "noiseSpeed"),
    setNoiseWarp: (state, action) => setReducer(state, action, "noiseWarp"),
    setNoiseBump: (state, action) => setReducer(state, action, "noiseBump"),
    setNoiseSpecular: (state, action) => setReducer(state, action, "noiseSpecular"),
    setNoiseTintStrength: (state, action) => setReducer(state, action, "noiseTintStrength"),
    setNoiseHue: (state, action) => setReducer(state, action, "noiseHue"),
    setNoiseRimColor: (state, action) => setReducer(state, action, "noiseRimColor"),
    setNoiseRimPower: (state, action) => setReducer(state, action, "noiseRimPower"),
    setNoiseRemoveCol: (state, action) => setReducer(state, action, "noiseRemoveCol")
  }
})

export const {
  setNoiseScale,
  setNoiseSpeed,
  setNoiseWarp,
  setNoiseBump,
  setNoiseSpecular,
  setNoiseTintStrength,
  setNoiseHue,
  setNoiseRimColor,
  setNoiseRimPower,
  setNoiseRemoveCol
} = gyroidNoiseParamsSlice.actions

export default gyroidNoiseParamsSlice.reducer
