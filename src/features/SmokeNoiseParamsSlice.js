import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseOnlyBright: 0.5,
  noiseDelicate: 4,
  noiseBroken: 2,
  noiseRefrac: 0.5,
  noiseSharkX: 0.15,
  noiseSharkY: 0.126,
  noiseWarp: 1,
  noiseColorGray1: 0,
  noiseColorGray2: 0.3,
  noiseColorGray3: 0.6
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const smokeNoiseParamsSlice = createSlice({
  name: "smokeNoiseParams",
  initialState,
  reducers: {
    setNoiseOnlyBright: (state, action) => setReducer(state, action, "noiseOnlyBright"),
    setNoiseDelicate: (state, action) => setReducer(state, action, "noiseDelicate"),
    setNoiseBroken: (state, action) => setReducer(state, action, "noiseBroken"),
    setNoiseRefrac: (state, action) => setReducer(state, action, "noiseRefrac"),
    setNoiseSharkX: (state, action) => setReducer(state, action, "noiseSharkX"),
    setNoiseSharkY: (state, action) => setReducer(state, action, "noiseSharkY"),
    setNoiseWarp: (state, action) => setReducer(state, action, "noiseWarp"),
    setNoiseColorGray1: (state, action) => setReducer(state, action, "noiseColorGray1"),
    setNoiseColorGray2: (state, action) => setReducer(state, action, "noiseColorGray2"),
    setNoiseColorGray3: (state, action) => setReducer(state, action, "noiseColorGray3")
  }
})

export const {
  setNoiseOnlyBright,
  setNoiseDelicate,
  setNoiseBroken,
  setNoiseRefrac,
  setNoiseSharkX,
  setNoiseSharkY,
  setNoiseWarp,
  setNoiseColorGray1,
  setNoiseColorGray2,
  setNoiseColorGray3
} = smokeNoiseParamsSlice.actions

export default smokeNoiseParamsSlice.reducer