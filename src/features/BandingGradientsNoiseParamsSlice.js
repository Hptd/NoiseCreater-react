import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseRepeat: 32,
  noiseSpeedNoun: 0.2,
  noiseSpeedOffset: 0.8
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const bandingGradientsNoiseParamsSlice = createSlice({
  name: "bandingGradientsNoiseParams",
  initialState,
  reducers: {
    setNoiseRepeat: (state, action) => setReducer(state, action, "noiseRepeat"),
    setNoiseSpeedNoun: (state, action) => setReducer(state, action, "noiseSpeedNoun"),
    setNoiseSpeedOffset: (state, action) => setReducer(state, action, "noiseSpeedOffset"),
  }
})

export const {
  setNoiseRepeat,
  setNoiseSpeedNoun,
  setNoiseSpeedOffset
} = bandingGradientsNoiseParamsSlice.actions

export default bandingGradientsNoiseParamsSlice.reducer