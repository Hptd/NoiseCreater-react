import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseScale: 5,
  noiseSpeed: 5,
  noiseCStyle: 0,
  noiseCFreq: 5,
  noiseSeedDist: 0.3,
  noiseSmooth: false,
  noiseAltColor: true,
  noiseRemoveCol: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const worleyNoiseParamsSlice = createSlice({
  name: "worleyNoiseParams",
  initialState,
  reducers: {
    setNoiseScale: (state, action) => setReducer(state, action, "noiseScale"),
    setNoiseSpeed: (state, action) => setReducer(state, action, "noiseSpeed"),
    setNoiseCStyle: (state, action) => setReducer(state, action, "noiseCStyle"),
    setNoiseCFreq: (state, action) => setReducer(state, action, "noiseCFreq"),
    setNoiseSeedDist: (state, action) => setReducer(state, action, "noiseSeedDist"),
    setNoiseSmooth: (state, action) => setReducer(state, action, "noiseSmooth"),
    setNoiseAltColor: (state, action) => setReducer(state, action, "noiseAltColor"),
    setNoiseRemoveCol: (state, action) => setReducer(state, action, "noiseRemoveCol")
  }
})

export const {
  setNoiseScale,
  setNoiseSpeed,
  setNoiseCStyle,
  setNoiseCFreq,
  setNoiseSeedDist,
  setNoiseSmooth,
  setNoiseAltColor,
  setNoiseRemoveCol
} = worleyNoiseParamsSlice.actions

export default worleyNoiseParamsSlice.reducer
