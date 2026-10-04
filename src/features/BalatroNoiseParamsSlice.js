import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseSpinRotation: -2.0,
  noiseSpinSpeed: 7.0,
  noiseSpinEase: 1.0,
  noiseSpinAmount: 0.25,
  noiseContrast: 3.5,
  noiseLighting: 0.4,
  noisePixelFilter: 745,
  noiseIterations: 5,
  noiseScale: 30,
  noisePaintScale: 0.035,
  noiseIsRotate: false,
  noiseColor1: "#de443b",
  noiseColor2: "#006bb4",
  noiseColor3: "#162325",
  noiseRemoveCol: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const balatroNoiseParamsSlice = createSlice({
  name: "balatroNoiseParams",
  initialState,
  reducers: {
    setNoiseSpinRotation: (state, action) => setReducer(state, action, "noiseSpinRotation"),
    setNoiseSpinSpeed: (state, action) => setReducer(state, action, "noiseSpinSpeed"),
    setNoiseSpinEase: (state, action) => setReducer(state, action, "noiseSpinEase"),
    setNoiseSpinAmount: (state, action) => setReducer(state, action, "noiseSpinAmount"),
    setNoiseContrast: (state, action) => setReducer(state, action, "noiseContrast"),
    setNoiseLighting: (state, action) => setReducer(state, action, "noiseLighting"),
    setNoisePixelFilter: (state, action) => setReducer(state, action, "noisePixelFilter"),
    setNoiseIterations: (state, action) => setReducer(state, action, "noiseIterations"),
    setNoiseScale: (state, action) => setReducer(state, action, "noiseScale"),
    setNoisePaintScale: (state, action) => setReducer(state, action, "noisePaintScale"),
    setNoiseIsRotate: (state, action) => setReducer(state, action, "noiseIsRotate"),
    setNoiseColor1: (state, action) => setReducer(state, action, "noiseColor1"),
    setNoiseColor2: (state, action) => setReducer(state, action, "noiseColor2"),
    setNoiseColor3: (state, action) => setReducer(state, action, "noiseColor3"),
    setNoiseRemoveCol: (state, action) => setReducer(state, action, "noiseRemoveCol")
  }
})

export const {
  setNoiseSpinRotation,
  setNoiseSpinSpeed,
  setNoiseSpinEase,
  setNoiseSpinAmount,
  setNoiseContrast,
  setNoiseLighting,
  setNoisePixelFilter,
  setNoiseIterations,
  setNoiseScale,
  setNoisePaintScale,
  setNoiseIsRotate,
  setNoiseColor1,
  setNoiseColor2,
  setNoiseColor3,
  setNoiseRemoveCol
} = balatroNoiseParamsSlice.actions

export default balatroNoiseParamsSlice.reducer
