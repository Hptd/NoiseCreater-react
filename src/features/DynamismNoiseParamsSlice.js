import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseScale: 1.75,
  noiseSpeed: 1,
  noiseOctaves: 4,
  noiseDecay: 3.2,
  noiseDivScale: 1.8,
  noiseColor1: "#473026",
  noiseColor2: "#1a213b",
  noiseColor3: "#451212",
  noiseColor4: "#1a2e40",
  noiseRemoveCol: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const dynamismNoiseParamsSlice = createSlice({
  name: "dynamismNoiseParams",
  initialState,
  reducers: {
    setNoiseScale: (state, action) => setReducer(state, action, "noiseScale"),
    setNoiseSpeed: (state, action) => setReducer(state, action, "noiseSpeed"),
    setNoiseOctaves: (state, action) => setReducer(state, action, "noiseOctaves"),
    setNoiseDecay: (state, action) => setReducer(state, action, "noiseDecay"),
    setNoiseDivScale: (state, action) => setReducer(state, action, "noiseDivScale"),
    setNoiseColor1: (state, action) => setReducer(state, action, "noiseColor1"),
    setNoiseColor2: (state, action) => setReducer(state, action, "noiseColor2"),
    setNoiseColor3: (state, action) => setReducer(state, action, "noiseColor3"),
    setNoiseColor4: (state, action) => setReducer(state, action, "noiseColor4"),
    setNoiseRemoveCol: (state, action) => setReducer(state, action, "noiseRemoveCol")
  }
})

export const {
  setNoiseScale,
  setNoiseSpeed,
  setNoiseOctaves,
  setNoiseDecay,
  setNoiseDivScale,
  setNoiseColor1,
  setNoiseColor2,
  setNoiseColor3,
  setNoiseColor4,
  setNoiseRemoveCol
} = dynamismNoiseParamsSlice.actions

export default dynamismNoiseParamsSlice.reducer
