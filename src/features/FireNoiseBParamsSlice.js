import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseDetail: 0.5,
  noiseSaturate: 0.5,
  noiseOnlyBright: 0.3,
  noiseSpeed: 4,
  noiseColor1: "#ff6633",
  noiseColor2: "#f21933",
  noiseColor3: "#f24c33",
  noiseColor4: "#f2cc33",
  noiseColor5: "#f29933",
  noiseRemoveCol: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const fireNoiseBParamsSlice = createSlice({
  name: "fireNoiseBParams",
  initialState,
  reducers: {
    setNoiseDetail: (state, action) => setReducer(state, action, "noiseDetail"),
    setNoiseSaturate: (state, action) => setReducer(state, action, "noiseSaturate"),
    setNoiseOnlyBright: (state, action) => setReducer(state, action, "noiseOnlyBright"),
    setNoiseSpeed: (state, action) => setReducer(state, action, "noiseSpeed"),
    setNoiseColor1:      (state, action) => setReducer(state, action, "noiseColor1"),
    setNoiseColor2:      (state, action) => setReducer(state, action, "noiseColor2"),
    setNoiseColor3:      (state, action) => setReducer(state, action, "noiseColor3"),
    setNoiseColor4:      (state, action) => setReducer(state, action, "noiseColor4"),
    setNoiseColor5:      (state, action) => setReducer(state, action, "noiseColor5"),
    setNoiseRemoveCol:  (state, action) => setReducer(state, action, "noiseRemoveCol")
  }
})

export const {
  setNoiseDetail,
  setNoiseSaturate,
  setNoiseSpeed,
  setNoiseOnlyBright,
  setNoiseColor1,
  setNoiseColor2,
  setNoiseColor3,
  setNoiseColor4,
  setNoiseColor5,
  setNoiseRemoveCol
} = fireNoiseBParamsSlice.actions

export default fireNoiseBParamsSlice.reducer