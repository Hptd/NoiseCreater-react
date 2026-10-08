import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseFrequency: 5,
  noiseAmplitude: 30,
  noiseSpeed: 2,
  noiseDegreeSpeed: 0.1,
  noiseRotateStrength: 720,
  noiseColor1: "#f4cd9f",
  noiseColor2: "#3162ee",
  noiseColor3: "#e882cc",
  noiseColor4: "#59b5f3",
  noiseRemoveCol: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const liquidWarpNoiseParamsSlice = createSlice({
  name: "liquidWarpNoiseParams",
  initialState,
  reducers: {
    setNoiseFrequency: (state, action) => setReducer(state, action, "noiseFrequency"),
    setNoiseAmplitude: (state, action) => setReducer(state, action, "noiseAmplitude"),
    setNoiseSpeed: (state, action) => setReducer(state, action, "noiseSpeed"),
    setNoiseDegreeSpeed: (state, action) => setReducer(state, action, "noiseDegreeSpeed"),
    setNoiseRotateStrength: (state, action) => setReducer(state, action, "noiseRotateStrength"),
    setNoiseColor1: (state, action) => setReducer(state, action, "noiseColor1"),
    setNoiseColor2: (state, action) => setReducer(state, action, "noiseColor2"),
    setNoiseColor3: (state, action) => setReducer(state, action, "noiseColor3"),
    setNoiseColor4: (state, action) => setReducer(state, action, "noiseColor4"),
    setNoiseRemoveCol: (state, action) => setReducer(state, action, "noiseRemoveCol")
  }
})

export const {
  setNoiseFrequency,
  setNoiseAmplitude,
  setNoiseSpeed,
  setNoiseDegreeSpeed,
  setNoiseRotateStrength,
  setNoiseColor1,
  setNoiseColor2,
  setNoiseColor3,
  setNoiseColor4,
  setNoiseRemoveCol
} = liquidWarpNoiseParamsSlice.actions

export default liquidWarpNoiseParamsSlice.reducer
