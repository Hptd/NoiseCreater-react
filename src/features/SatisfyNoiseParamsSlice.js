import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseNum: 20,
  noiseSpeed: 1.2,
  noiseThick: 1.1,
  noisePaletteR: 1.5,
  noisePaletteG: 2.9,
  noisePaletteB: 3.5,
  noiseMirror: true,
  noiseRotate: false,
  noiseRotOfst: true,
  noiseTriNoise: true,
  noiseRemoveCol: false
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const satisfyNoiseParamsSlice = createSlice({
  name: "satisfyNoiseParams",
  initialState,
  reducers: {
    setNoiseNum: (state, action) => setReducer(state, action, "noiseNum"),
    setNoiseSpeed: (state, action) => setReducer(state, action, "noiseSpeed"),
    setNoiseThick: (state, action) => setReducer(state, action, "noiseThick"),
    setNoisePaletteR: (state, action) => setReducer(state, action, "noisePaletteR"),
    setNoisePaletteG: (state, action) => setReducer(state, action, "noisePaletteG"),
    setNoisePaletteB: (state, action) => setReducer(state, action, "noisePaletteB"),
    setNoiseMirror: (state, action) => setReducer(state, action, "noiseMirror"),
    setNoiseRotate: (state, action) => setReducer(state, action, "noiseRotate"),
    setNoiseRotOfst: (state, action) => setReducer(state, action, "noiseRotOfst"),
    setNoiseTriNoise: (state, action) => setReducer(state, action, "noiseTriNoise"),
    setNoiseRemoveCol: (state, action) => setReducer(state, action, "noiseRemoveCol")
  }
})

export const {
  setNoiseNum,
  setNoiseSpeed,
  setNoiseThick,
  setNoisePaletteR,
  setNoisePaletteG,
  setNoisePaletteB,
  setNoiseMirror,
  setNoiseRotate,
  setNoiseRotOfst,
  setNoiseTriNoise,
  setNoiseRemoveCol
} = satisfyNoiseParamsSlice.actions

export default satisfyNoiseParamsSlice.reducer
