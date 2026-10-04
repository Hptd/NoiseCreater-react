import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseParticleIterations: 6,
  noiseScale: 70,
  noiseSpeed: 0.3,
  noiseDisplaceFreq: 0.07,
  noiseDisplaceStrength: 3,
  noiseParticleRadius: 0.15,
  noiseParticleRadius2: 0.3,
  noiseParticleSizeVar: 0.2,
  noiseRandomSize: true,
  noiseParticleColor: "#4de6e6",
  noiseParticleBright: 0.45,
  noiseGlowThreshold: 0.3,
  noiseGlowPower: 4,
  noiseBlurStrength: 1.0,
  noiseBlurRange: 2.5,
  noiseRemoveCol: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const particleNoiseParamsSlice = createSlice({
  name: "particleNoiseParams",
  initialState,
  reducers: {
    setNoiseParticleIterations: (state, action) => setReducer(state, action, "noiseParticleIterations"),
    setNoiseScale: (state, action) => setReducer(state, action, "noiseScale"),
    setNoiseSpeed: (state, action) => setReducer(state, action, "noiseSpeed"),
    setNoiseDisplaceFreq: (state, action) => setReducer(state, action, "noiseDisplaceFreq"),
    setNoiseDisplaceStrength: (state, action) => setReducer(state, action, "noiseDisplaceStrength"),
    setNoiseParticleRadius: (state, action) => setReducer(state, action, "noiseParticleRadius"),
    setNoiseParticleRadius2: (state, action) => setReducer(state, action, "noiseParticleRadius2"),
    setNoiseParticleSizeVar: (state, action) => setReducer(state, action, "noiseParticleSizeVar"),
    setNoiseRandomSize: (state, action) => setReducer(state, action, "noiseRandomSize"),
    setNoiseParticleColor: (state, action) => setReducer(state, action, "noiseParticleColor"),
    setNoiseParticleBright: (state, action) => setReducer(state, action, "noiseParticleBright"),
    setNoiseGlowThreshold: (state, action) => setReducer(state, action, "noiseGlowThreshold"),
    setNoiseGlowPower: (state, action) => setReducer(state, action, "noiseGlowPower"),
    setNoiseBlurStrength: (state, action) => setReducer(state, action, "noiseBlurStrength"),
    setNoiseBlurRange: (state, action) => setReducer(state, action, "noiseBlurRange"),
    setNoiseRemoveCol: (state, action) => setReducer(state, action, "noiseRemoveCol")
  }
})

export const {
  setNoiseParticleIterations,
  setNoiseScale,
  setNoiseSpeed,
  setNoiseDisplaceFreq,
  setNoiseDisplaceStrength,
  setNoiseParticleRadius,
  setNoiseParticleRadius2,
  setNoiseParticleSizeVar,
  setNoiseRandomSize,
  setNoiseParticleColor,
  setNoiseParticleBright,
  setNoiseGlowThreshold,
  setNoiseGlowPower,
  setNoiseBlurStrength,
  setNoiseBlurRange,
  setNoiseRemoveCol
} = particleNoiseParamsSlice.actions

export default particleNoiseParamsSlice.reducer
