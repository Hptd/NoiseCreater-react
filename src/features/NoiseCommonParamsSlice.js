import { createSlice } from "@reduxjs/toolkit"

// 公共参数默认参数
const initialState = {
  downLoadSize: 1024,
  noiseUvSize: 1,
  noiseOffsetU: 0,
  noiseOffsetV: 0,
  noiseScaleU: 1,
  noiseScaleV: 1,
  noiseBright: 0,
  noiseInvert: false,
  noiseAlphaChannel: false,
  noiseAnimationOC: true,
  noiseSequenceFrame: 10,
}

function setReducer(state, action, key) {
  state[key] = action.payload
}

export const noiseCommonParams = createSlice({
  name: "noiseCommonParams",
  initialState,
  reducers: {
    setDownLoadSize: (state, action) => setReducer(state, action, 'downLoadSize'),
    setNoiseUvSize: (state, action) => setReducer(state, action, 'noiseUvSize'),
    setNoiseOffsetU: (state, action) => setReducer(state, action, 'noiseOffsetU'),
    setNoiseOffsetV: (state, action) => setReducer(state, action, 'noiseOffsetV'),
    setNoiseScaleU: (state, action) => setReducer(state, action, 'noiseScaleU'),
    setNoiseScaleV: (state, action) => setReducer(state, action, 'noiseScaleV'),
    setNoiseBright: (state, action) => setReducer(state, action, 'noiseBright'),
    setNoiseInvert: (state, action) => setReducer(state, action, 'noiseInvert'),
    setNoiseAlphaChannel: (state, action) => setReducer(state, action, 'noiseAlphaChannel'),
    setNoiseAnimationOC: (state, action) => setReducer(state, action, 'noiseAnimationOC'),
    setNoiseSequenceFrame: (state, action) => setReducer(state, action, 'noiseSequenceFrame'),
  }
})

export const {
  setDownLoadSize,
  setNoiseUvSize,
  setNoiseOffsetU,
  setNoiseOffsetV,
  setNoiseScaleU,
  setNoiseScaleV,
  setNoiseBright,
  setNoiseInvert,
  setNoiseAlphaChannel,
  setNoiseAnimationOC,
  setNoiseSequenceFrame,
} = noiseCommonParams.actions

export default noiseCommonParams.reducer