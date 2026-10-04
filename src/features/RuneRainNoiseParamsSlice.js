import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseRows: 64,
  noiseColumns: 128,
  noiseZoomSpeed: 0.05,
  noiseRainSpeed: 0.05,
  noiseRainDensity: 0.5,
  noiseRainColor: "#00ff80",
  noiseMaxBright: 0.6,
  noiseSatPower: 8,
  noiseLayerScale: 4,
  noiseRuneThickness: 0.1,
  noiseRemoveCol: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const runeRainNoiseParamsSlice = createSlice({
  name: "runeRainNoiseParams",
  initialState,
  reducers: {
    setNoiseRows: (state, action) => setReducer(state, action, "noiseRows"),
    setNoiseColumns: (state, action) => setReducer(state, action, "noiseColumns"),
    setNoiseZoomSpeed: (state, action) => setReducer(state, action, "noiseZoomSpeed"),
    setNoiseRainSpeed: (state, action) => setReducer(state, action, "noiseRainSpeed"),
    setNoiseRainDensity: (state, action) => setReducer(state, action, "noiseRainDensity"),
    setNoiseRainColor: (state, action) => setReducer(state, action, "noiseRainColor"),
    setNoiseMaxBright: (state, action) => setReducer(state, action, "noiseMaxBright"),
    setNoiseSatPower: (state, action) => setReducer(state, action, "noiseSatPower"),
    setNoiseLayerScale: (state, action) => setReducer(state, action, "noiseLayerScale"),
    setNoiseRuneThickness: (state, action) => setReducer(state, action, "noiseRuneThickness"),
    setNoiseRemoveCol: (state, action) => setReducer(state, action, "noiseRemoveCol")
  }
})

export const {
  setNoiseRows,
  setNoiseColumns,
  setNoiseZoomSpeed,
  setNoiseRainSpeed,
  setNoiseRainDensity,
  setNoiseRainColor,
  setNoiseMaxBright,
  setNoiseSatPower,
  setNoiseLayerScale,
  setNoiseRuneThickness,
  setNoiseRemoveCol
} = runeRainNoiseParamsSlice.actions

export default runeRainNoiseParamsSlice.reducer
