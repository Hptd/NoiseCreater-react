import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputCheck from "../InputCheck"
import InputColor from "../InputColor"
import { setNoiseColor1, setNoiseColor2, setNoiseOnlyBright, setNoiseSharkX, setNoiseSharkY, setNoiseSaturate, setNoiseHue, setNoiseRemoveCol } from '../../features/CircleNoiseCParamsSlice'

export default function CircleNoiseC() {
	const noiseProps = useSelector(state => state.circleNoiseCProps)

	return (
    <div className="params-container">
			<InputSlider sliderName='单球矩阵切割' minVal={1} maxVal={10} defaultInputValue={noiseProps.noiseSharkX} resetValue={1} dispatchFunc={ setNoiseSharkX } />
			<InputSlider sliderName='错位运动调整' minVal={1} maxVal={10} defaultInputValue={noiseProps.noiseSharkY} resetValue={2} dispatchFunc={ setNoiseSharkY } />
			<InputSlider sliderName='圆圈尺寸' minVal={0.1} maxVal={0.5} defaultInputValue={noiseProps.noiseHue} resetValue={0.5} dispatchFunc={ setNoiseHue } />
			<InputSlider sliderName='去除小圆圈' minVal={0} maxVal={0.5} defaultInputValue={noiseProps.noiseSaturate} resetValue={0.1} dispatchFunc={ setNoiseSaturate } />
			<InputSlider sliderName='圆圈厚度' minVal={0} maxVal={0.9} defaultInputValue={noiseProps.noiseOnlyBright} resetValue={0.1} dispatchFunc={ setNoiseOnlyBright } />
			<InputColor colorName='背景颜色' defaultColorIn={noiseProps.noiseColor1} resetColor='#202b33' dispatchFunc={ setNoiseColor1 } />
			<InputColor colorName='圆圈颜色' defaultColorIn={noiseProps.noiseColor2} resetColor='#ebf1f5' dispatchFunc={ setNoiseColor2 } />
      <InputCheck checkName='黑白模式' checkDefaultIn={noiseProps.noiseRemoveCol} dispatchFunc={ setNoiseRemoveCol } />
    </div>
	)
}