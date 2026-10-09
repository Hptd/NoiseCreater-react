import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseScales: 22,
  noiseZoomDistance: 10,
  noiseSpeed: 1,
  noiseFirstDivision: 8,
  noiseFRatio: 0.5,
  noiseLimitDetails: 2.5,
  noiseSmoothZone: 100,
  noiseClampLevel: 1,
  noiseTheta: 4,
  noiseRotSpeed: 0.008,
  noiseCenterX: 0.5,
  noiseCenterY: 0.5,
  noiseSeed: 10.7,
  noiseGazConcentration: 0
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const galacticCloudNoiseParamsSlice = createSlice({
  name: "galacticCloudNoiseParams",
  initialState,
  reducers: {
    setNoiseScales: (state, action) => setReducer(state, action, "noiseScales"),
    setNoiseZoomDistance: (state, action) => setReducer(state, action, "noiseZoomDistance"),
    setNoiseSpeed: (state, action) => setReducer(state, action, "noiseSpeed"),
    setNoiseFirstDivision: (state, action) => setReducer(state, action, "noiseFirstDivision"),
    setNoiseFRatio: (state, action) => setReducer(state, action, "noiseFRatio"),
    setNoiseLimitDetails: (state, action) => setReducer(state, action, "noiseLimitDetails"),
    setNoiseSmoothZone: (state, action) => setReducer(state, action, "noiseSmoothZone"),
    setNoiseClampLevel: (state, action) => setReducer(state, action, "noiseClampLevel"),
    setNoiseTheta: (state, action) => setReducer(state, action, "noiseTheta"),
    setNoiseRotSpeed: (state, action) => setReducer(state, action, "noiseRotSpeed"),
    setNoiseCenterX: (state, action) => setReducer(state, action, "noiseCenterX"),
    setNoiseCenterY: (state, action) => setReducer(state, action, "noiseCenterY"),
    setNoiseSeed: (state, action) => setReducer(state, action, "noiseSeed"),
    setNoiseGazConcentration: (state, action) => setReducer(state, action, "noiseGazConcentration")
  }
})

export const {
  setNoiseScales,
  setNoiseZoomDistance,
  setNoiseSpeed,
  setNoiseFirstDivision,
  setNoiseFRatio,
  setNoiseLimitDetails,
  setNoiseSmoothZone,
  setNoiseClampLevel,
  setNoiseTheta,
  setNoiseRotSpeed,
  setNoiseCenterX,
  setNoiseCenterY,
  setNoiseSeed,
  setNoiseGazConcentration
} = galacticCloudNoiseParamsSlice.actions

export default galacticCloudNoiseParamsSlice.reducer
