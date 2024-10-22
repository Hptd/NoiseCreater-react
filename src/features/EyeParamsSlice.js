import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseOnlyBright: 0.2,
  noiseSharkX: 0.2,
  noiseSharkY: 0.6,
  noiseSpeed: 1,
  noiseColor1: "#004c66",
  noiseColor2: "#337f66",
  noiseColor3: "#28766d",
  noiseColor4: "#ffffff",
  noiseColor5: "#000000",
  noiseRemoveCol: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const eyeParamsSlice = createSlice({
  name: "eyeParams",
  initialState,
  reducers: {
    setNoiseOnlyBright: (state, action) => setReducer(state, action, "noiseOnlyBright"),
    setNoiseSharkX: (state, action) => setReducer(state, action, "noiseSharkX"),
    setNoiseSharkY: (state, action) => setReducer(state, action, "noiseSharkY"),
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
  setNoiseSharkX,
  setNoiseSharkY,
  setNoiseSpeed,
  setNoiseOnlyBright,
  setNoiseColor1,
  setNoiseColor2,
  setNoiseColor3,
  setNoiseColor4,
  setNoiseColor5,
  setNoiseRemoveCol
} = eyeParamsSlice.actions

export default eyeParamsSlice.reducer