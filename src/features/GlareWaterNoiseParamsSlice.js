import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseOnlyBright: 0,
  noiseElementScale: 1.5,
  noiseDetail: 4,
  noiseAlphaScale: 1,
  noiseColor: "#41d8ec",
  noiseRemoveCol: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const glareWaterNoiseParamsSlice = createSlice({
  name: "glareWaterNoiseParams",
  initialState,
  reducers: {
    setNoiseOnlyBright: (state, action) => setReducer(state, action, "noiseOnlyBright"),
    setNoiseElementScale: (state, action) => setReducer(state, action, "noiseElementScale"),
    setNoiseDetail:    (state, action) => setReducer(state, action, "noiseDetail"),
    setNoiseAlphaScale: (state, action) => setReducer(state, action, "noiseAlphaScale"),
    setNoiseColor:      (state, action) => setReducer(state, action, "noiseColor"),
    setNoiseRemoveCol:  (state, action) => setReducer(state, action, "noiseRemoveCol")
  }
})

export const {
  setNoiseOnlyBright,
  setNoiseElementScale,
  setNoiseDetail,
  setNoiseAlphaScale,
  setNoiseColor,
  setNoiseRemoveCol
} = glareWaterNoiseParamsSlice.actions

export default glareWaterNoiseParamsSlice.reducer