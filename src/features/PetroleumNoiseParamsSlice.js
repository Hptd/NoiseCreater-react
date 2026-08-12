import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseSpeed: 1,
  noiseZoom: 2.5,
  noiseSize: 0.025,
  noiseIntensity: 4,
  noiseQuant: 2,
  noiseScope: 2,
  noiseTimeNoise: 1,
  noiseColor1: "#ffffff",
  noiseColor2: "#1a1a1a",
  noiseColor3: "#ffffff",
  noiseColor4: "#7f99b3",
  noiseRemoveCol: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const petroleumNoiseParamsSlice = createSlice({
  name: "petroleumNoiseParams",
  initialState,
  reducers: {
    setNoiseSpeed: (state, action) => setReducer(state, action, "noiseSpeed"),
    setNoiseZoom: (state, action) => setReducer(state, action, "noiseZoom"),
    setNoiseSize: (state, action) => setReducer(state, action, "noiseSize"),
    setNoiseIntensity: (state, action) => setReducer(state, action, "noiseIntensity"),
    setNoiseQuant: (state, action) => setReducer(state, action, "noiseQuant"),
    setNoiseScope: (state, action) => setReducer(state, action, "noiseScope"),
    setNoiseTimeNoise: (state, action) => setReducer(state, action, "noiseTimeNoise"),
    setNoiseColor1: (state, action) => setReducer(state, action, "noiseColor1"),
    setNoiseColor2: (state, action) => setReducer(state, action, "noiseColor2"),
    setNoiseColor3: (state, action) => setReducer(state, action, "noiseColor3"),
    setNoiseColor4: (state, action) => setReducer(state, action, "noiseColor4"),
    setNoiseRemoveCol: (state, action) => setReducer(state, action, "noiseRemoveCol")
  }
})

export const {
  setNoiseSpeed,
  setNoiseZoom,
  setNoiseSize,
  setNoiseIntensity,
  setNoiseQuant,
  setNoiseScope,
  setNoiseTimeNoise,
  setNoiseColor1,
  setNoiseColor2,
  setNoiseColor3,
  setNoiseColor4,
  setNoiseRemoveCol
} = petroleumNoiseParamsSlice.actions

export default petroleumNoiseParamsSlice.reducer
