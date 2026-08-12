import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseIterations: 100,
  noiseTimeSpeed: 0.05,
  noiseForwardSpeed: 4,
  noiseTurbulence: 0.5,
  noiseWarp: 0.5,
  noiseRadius: 5,
  noiseNoiseStart: 0.06,
  noiseNoiseEnd: 2,
  noiseNoiseFreq: 20,
  noiseNoiseIntensity: 0.05,
  noiseRotateSpeed: 0.1,
  noiseTranslucency: 0.1,
  noiseTone: 900
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const cloudTunnelNoiseParamsSlice = createSlice({
  name: "cloudTunnelNoiseParams",
  initialState,
  reducers: {
    setNoiseIterations: (state, action) => setReducer(state, action, "noiseIterations"),
    setNoiseTimeSpeed: (state, action) => setReducer(state, action, "noiseTimeSpeed"),
    setNoiseForwardSpeed: (state, action) => setReducer(state, action, "noiseForwardSpeed"),
    setNoiseTurbulence: (state, action) => setReducer(state, action, "noiseTurbulence"),
    setNoiseWarp: (state, action) => setReducer(state, action, "noiseWarp"),
    setNoiseRadius: (state, action) => setReducer(state, action, "noiseRadius"),
    setNoiseNoiseStart: (state, action) => setReducer(state, action, "noiseNoiseStart"),
    setNoiseNoiseEnd: (state, action) => setReducer(state, action, "noiseNoiseEnd"),
    setNoiseNoiseFreq: (state, action) => setReducer(state, action, "noiseNoiseFreq"),
    setNoiseNoiseIntensity: (state, action) => setReducer(state, action, "noiseNoiseIntensity"),
    setNoiseRotateSpeed: (state, action) => setReducer(state, action, "noiseRotateSpeed"),
    setNoiseTranslucency: (state, action) => setReducer(state, action, "noiseTranslucency"),
    setNoiseTone: (state, action) => setReducer(state, action, "noiseTone")
  }
})

export const {
  setNoiseIterations,
  setNoiseTimeSpeed,
  setNoiseForwardSpeed,
  setNoiseTurbulence,
  setNoiseWarp,
  setNoiseRadius,
  setNoiseNoiseStart,
  setNoiseNoiseEnd,
  setNoiseNoiseFreq,
  setNoiseNoiseIntensity,
  setNoiseRotateSpeed,
  setNoiseTranslucency,
  setNoiseTone
} = cloudTunnelNoiseParamsSlice.actions

export default cloudTunnelNoiseParamsSlice.reducer
