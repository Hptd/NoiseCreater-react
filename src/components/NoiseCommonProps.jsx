import InputLabel from "./InputLabel.jsx"
import InputSlider from "./InputSlider.jsx"
import InputCheck from "./InputCheck.jsx"
import { useSelector } from "react-redux"
import { setDownLoadSize, setNoiseUvSize, setNoiseOffsetU, setNoiseOffsetV, setNoiseScaleU, setNoiseScaleV, setNoiseBright, setNoiseInvert, setNoiseAlphaChannel, setNoiseAnimationOC, setNoiseSequenceFrame } from '../features/NoiseCommonParamsSlice.js'

export default function NoiseCommonProps() {
  const noiseCommonProps = useSelector(state => state.noiseCommonProps)
  
  return (
    <div className="params-container">
      <InputLabel labelName='噪波尺寸' placeholder='默认1 * 1' defaultInputValue={noiseCommonProps.noiseUvSize} resetValue={1} dispatchFunc={setNoiseUvSize} />
      
      <InputSlider sliderName='噪波横向位移' minVal={-1} maxVal={1} defaultInputValue={noiseCommonProps.noiseOffsetU} resetValue={0} dispatchFunc={setNoiseOffsetU} />
      <InputSlider sliderName='噪波纵向位移' minVal={-1} maxVal={1} defaultInputValue={noiseCommonProps.noiseOffsetV} resetValue={0} dispatchFunc={setNoiseOffsetV} />
      <InputSlider sliderName='噪波横向尺寸' minVal={0.01} maxVal={5} defaultInputValue={noiseCommonProps.noiseScaleU} resetValue={1} dispatchFunc={setNoiseScaleU} />
      <InputSlider sliderName='噪波纵向尺寸' minVal={0.01} maxVal={5} defaultInputValue={noiseCommonProps.noiseScaleV} resetValue={1} dispatchFunc={setNoiseScaleV} />
      <InputSlider sliderName='整体明暗' minVal={-1} maxVal={1} defaultInputValue={noiseCommonProps.noiseBright} resetValue={0} dispatchFunc={setNoiseBright} />
      
      <InputCheck checkName='颜色取反(需开启黑白模式)' checkDefaultIn={noiseCommonProps.noiseInvert} dispatchFunc={setNoiseInvert} />
      <InputCheck checkName='开启Alpha通道(需开启黑白模式)' checkDefaultIn={noiseCommonProps.noiseAlphaChannel} dispatchFunc={setNoiseAlphaChannel} />
      <InputCheck checkName='动画：开始 | 暂停' checkDefaultIn={noiseCommonProps.noiseAnimationOC} dispatchFunc={setNoiseAnimationOC} />
      
      <InputLabel labelName='导出尺寸(先确认效果再修改尺寸保存)' placeholder='默认1024*1024' defaultInputValue={noiseCommonProps.downLoadSize} resetValue={1024} dispatchFunc={setDownLoadSize} />
      <InputLabel labelName='每秒导出序列帧数量(不可大于当前帧率)' placeholder='默认10帧/秒' defaultInputValue={noiseCommonProps.noiseSequenceFrame} resetValue={10} dispatchFunc={setNoiseSequenceFrame} />
    </div>

  )
}