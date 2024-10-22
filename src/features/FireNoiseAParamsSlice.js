import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseDetail: 4,
  noiseSharkX: 0.5,
  noiseSharkY: 0.1,
  noiseHue: 0.7,
  noiseSaturate: 0.4,
  noiseSpeed: 0.1,
  noiseOnlyBright: 1.6,
  noiseColor1: "#800019",
  noiseColor2: "#e60000",
  noiseColor3: "#330000",
  noiseColor4: "#ffe600",
  noiseRemoveCol: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const fireNoiseAParamsSlice = createSlice({
  name: "fireNoiseAParams",
  initialState,
  reducers: {
    setNoiseDetail: (state, action) => setReducer(state, action, "noiseDetail"),
    setNoiseSharkX: (state, action) => setReducer(state, action, "noiseSharkX"),
    setNoiseSharkY: (state, action) => setReducer(state, action, "noiseSharkY"),
    setNoiseHue: (state, action) => setReducer(state, action, "noiseHue"),
    setNoiseSaturate: (state, action) => setReducer(state, action, "noiseSaturate"),
    setNoiseSpeed: (state, action) => setReducer(state, action, "noiseSpeed"),
    setNoiseOnlyBright: (state, action) => setReducer(state, action, "noiseOnlyBright"),
    setNoiseColor1:      (state, action) => setReducer(state, action, "noiseColor1"),
    setNoiseColor2:      (state, action) => setReducer(state, action, "noiseColor2"),
    setNoiseColor3:      (state, action) => setReducer(state, action, "noiseColor3"),
    setNoiseColor4:      (state, action) => setReducer(state, action, "noiseColor4"),
    setNoiseRemoveCol:  (state, action) => setReducer(state, action, "noiseRemoveCol")
  }
})

export const {
  setNoiseDetail,
  setNoiseSharkX,
  setNoiseSharkY,
  setNoiseHue,
  setNoiseSaturate,
  setNoiseSpeed,
  setNoiseOnlyBright,
  setNoiseColor1,
  setNoiseColor2,
  setNoiseColor3,
  setNoiseColor4,
  setNoiseRemoveCol
} = fireNoiseAParamsSlice.actions

export default fireNoiseAParamsSlice.reducer