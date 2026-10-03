import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseCloudScale: 1.1,
  noiseSpeed: 0.03,
  noiseCloudDark: 0.5,
  noiseCloudLight: 0.3,
  noiseCloudCover: 0.2,
  noiseCloudAlpha: 8.0,
  noiseSkyTint: 0.5,
  noiseSkyColor1: "#336699",
  noiseSkyColor2: "#66b3ff",
  noiseCloudColor: "#ffffe6",
  noiseWarp: 1.0,
  noiseRemoveCol: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const cloudSkyNoiseParamsSlice = createSlice({
  name: "cloudSkyNoiseParams",
  initialState,
  reducers: {
    setNoiseCloudScale: (state, action) => setReducer(state, action, "noiseCloudScale"),
    setNoiseSpeed: (state, action) => setReducer(state, action, "noiseSpeed"),
    setNoiseCloudDark: (state, action) => setReducer(state, action, "noiseCloudDark"),
    setNoiseCloudLight: (state, action) => setReducer(state, action, "noiseCloudLight"),
    setNoiseCloudCover: (state, action) => setReducer(state, action, "noiseCloudCover"),
    setNoiseCloudAlpha: (state, action) => setReducer(state, action, "noiseCloudAlpha"),
    setNoiseSkyTint: (state, action) => setReducer(state, action, "noiseSkyTint"),
    setNoiseSkyColor1: (state, action) => setReducer(state, action, "noiseSkyColor1"),
    setNoiseSkyColor2: (state, action) => setReducer(state, action, "noiseSkyColor2"),
    setNoiseCloudColor: (state, action) => setReducer(state, action, "noiseCloudColor"),
    setNoiseWarp: (state, action) => setReducer(state, action, "noiseWarp"),
    setNoiseRemoveCol: (state, action) => setReducer(state, action, "noiseRemoveCol")
  }
})

export const {
  setNoiseCloudScale,
  setNoiseSpeed,
  setNoiseCloudDark,
  setNoiseCloudLight,
  setNoiseCloudCover,
  setNoiseCloudAlpha,
  setNoiseSkyTint,
  setNoiseSkyColor1,
  setNoiseSkyColor2,
  setNoiseCloudColor,
  setNoiseWarp,
  setNoiseRemoveCol
} = cloudSkyNoiseParamsSlice.actions

export default cloudSkyNoiseParamsSlice.reducer
