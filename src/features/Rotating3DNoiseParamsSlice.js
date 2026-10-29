import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseWarpAmount: 0.2,
  noiseFreq: 14,
  noiseSeed: 72.2815,
  noiseMixSoft: 0.1,
  noiseContrast: 1,
  noiseOctaves: 4
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const rotating3DNoiseParamsSlice = createSlice({
  name: "rotating3DNoiseParams",
  initialState,
  reducers: {
    setNoiseWarpAmount: (state, action) => setReducer(state, action, "noiseWarpAmount"),
    setNoiseFreq:       (state, action) => setReducer(state, action, "noiseFreq"),
    setNoiseSeed:       (state, action) => setReducer(state, action, "noiseSeed"),
    setNoiseMixSoft:    (state, action) => setReducer(state, action, "noiseMixSoft"),
    setNoiseContrast:   (state, action) => setReducer(state, action, "noiseContrast"),
    setNoiseOctaves:    (state, action) => setReducer(state, action, "noiseOctaves")
  }
})

export const {
  setNoiseWarpAmount,
  setNoiseFreq,
  setNoiseSeed,
  setNoiseMixSoft,
  setNoiseContrast,
  setNoiseOctaves
} = rotating3DNoiseParamsSlice.actions

export default rotating3DNoiseParamsSlice.reducer
