import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  noiseType: 1
}

function setReducer(state, action, key){
  state[key] = action.payload
}

export const sampleNoiseAParamsSlice = createSlice({
  name: "sampleNoiseAParams",
  initialState,
  reducers: {
    setNoiseType: (state, action) => setReducer(state, action, "noiseType")
  }
})

export const { setNoiseType } = sampleNoiseAParamsSlice.actions

export default sampleNoiseAParamsSlice.reducer