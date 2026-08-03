import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseGridSize: 20,
  noiseSquareSize: 0.3,
  noiseSizeAmplitude: 0.1,
  noiseSpeed: 0.4,
  noiseJitter: 5,
  noiseWallThickness: 0.07,
  noiseTimeScale: 10,
  noiseBgColor: "#b3e6cc",
  noiseColorScale: 0.5,
  noiseColorBright: 0.5,
  noiseJitter2: 1,
  noiseRemoveCol: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const squaresNoiseParamsSlice = createSlice({
  name: "squaresNoiseParams",
  initialState,
  reducers: {
    setNoiseGridSize: (state, action) => setReducer(state, action, "noiseGridSize"),
    setNoiseSquareSize: (state, action) => setReducer(state, action, "noiseSquareSize"),
    setNoiseSizeAmplitude: (state, action) => setReducer(state, action, "noiseSizeAmplitude"),
    setNoiseSpeed: (state, action) => setReducer(state, action, "noiseSpeed"),
    setNoiseJitter: (state, action) => setReducer(state, action, "noiseJitter"),
    setNoiseWallThickness: (state, action) => setReducer(state, action, "noiseWallThickness"),
    setNoiseTimeScale: (state, action) => setReducer(state, action, "noiseTimeScale"),
    setNoiseBgColor: (state, action) => setReducer(state, action, "noiseBgColor"),
    setNoiseColorScale: (state, action) => setReducer(state, action, "noiseColorScale"),
    setNoiseColorBright: (state, action) => setReducer(state, action, "noiseColorBright"),
    setNoiseJitter2: (state, action) => setReducer(state, action, "noiseJitter2"),
    setNoiseRemoveCol: (state, action) => setReducer(state, action, "noiseRemoveCol")
  }
})

export const {
  setNoiseGridSize,
  setNoiseSquareSize,
  setNoiseSizeAmplitude,
  setNoiseSpeed,
  setNoiseJitter,
  setNoiseWallThickness,
  setNoiseTimeScale,
  setNoiseBgColor,
  setNoiseColorScale,
  setNoiseColorBright,
  setNoiseJitter2,
  setNoiseRemoveCol
} = squaresNoiseParamsSlice.actions

export default squaresNoiseParamsSlice.reducer
