import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputColor from "../InputColor"
import InputCheck from "../InputCheck"
import { setNoiseSharkX, setNoiseSharkY, setNoiseHue, setNoiseColor1, setNoiseColor2, setNoiseColor3, setNoiseRemoveCol } from '../../features/KnitNoiseFParamsSlice'

export default function KnitNoiseF() {
	const noiseProps = useSelector(state => state.knitNoiseFProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='边缘调整参数 A' minVal={0.35} maxVal={0.5} defaultInputValue={noiseProps.noiseSharkX} resetValue={0.42} dispatchFunc={ setNoiseSharkX } />
			<InputSlider sliderName='边缘调整参数 B' minVal={0.3} maxVal={0.5} defaultInputValue={noiseProps.noiseSharkY} resetValue={0.35} dispatchFunc={ setNoiseSharkY } />
			<InputSlider sliderName='边缘调整参数 C' minVal={0} maxVal={0.4} defaultInputValue={noiseProps.noiseHue} resetValue={0.0225} dispatchFunc={ setNoiseHue } />
			<InputColor colorName='暗部颜色' defaultColorIn={noiseProps.noiseColor1} resetColor='#ffffff' dispatchFunc={ setNoiseColor1 } />
			<InputColor colorName='亮部颜色' defaultColorIn={noiseProps.noiseColor2} resetColor='#4c4c4c' dispatchFunc={ setNoiseColor2 } />
			<InputColor colorName='亮部颜色' defaultColorIn={noiseProps.noiseColor3} resetColor='#cccccc' dispatchFunc={ setNoiseColor3 } />
      <InputCheck checkName='黑白模式' checkDefaultIn={noiseProps.noiseRemoveCol} dispatchFunc={ setNoiseRemoveCol } />
    </div>
	)
}