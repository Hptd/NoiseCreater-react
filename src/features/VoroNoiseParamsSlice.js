import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseDelicate: 5.5
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const voroNoiseParamsSlice = createSlice({
  name: "voroNoiseParams",
  initialState,
  reducers: {
    setNoiseDelicate: (state, action) => setReducer(state, action, "noiseDelicate")
  }
})

export const {
  setNoiseDelicate,
} = voroNoiseParamsSlice.actions

export default voroNoiseParamsSlice.reducer