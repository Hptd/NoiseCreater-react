import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseScale: 4,
  noiseSpeed: 1,
  noiseContrast: 2,
  noiseColor1: "#1a6666",
  noiseColor2: "#80b300",
  noiseColor3: "#59001a",
  noiseColor4: "#0033ff",
  noiseColor5: "#4d0000",
  noiseColor6: "#008000",
  noiseRemoveCol: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const domainWarpNoiseParamsSlice = createSlice({
  name: "domainWarpNoiseParams",
  initialState,
  reducers: {
    setNoiseScale: (state, action) => setReducer(state, action, "noiseScale"),
    setNoiseSpeed: (state, action) => setReducer(state, action, "noiseSpeed"),
    setNoiseContrast: (state, action) => setReducer(state, action, "noiseContrast"),
    setNoiseColor1: (state, action) => setReducer(state, action, "noiseColor1"),
    setNoiseColor2: (state, action) => setReducer(state, action, "noiseColor2"),
    setNoiseColor3: (state, action) => setReducer(state, action, "noiseColor3"),
    setNoiseColor4: (state, action) => setReducer(state, action, "noiseColor4"),
    setNoiseColor5: (state, action) => setReducer(state, action, "noiseColor5"),
    setNoiseColor6: (state, action) => setReducer(state, action, "noiseColor6"),
    setNoiseRemoveCol: (state, action) => setReducer(state, action, "noiseRemoveCol")
  }
})

export const {
  setNoiseScale,
  setNoiseSpeed,
  setNoiseContrast,
  setNoiseColor1,
  setNoiseColor2,
  setNoiseColor3,
  setNoiseColor4,
  setNoiseColor5,
  setNoiseColor6,
  setNoiseRemoveCol
} = domainWarpNoiseParamsSlice.actions

export default domainWarpNoiseParamsSlice.reducer
