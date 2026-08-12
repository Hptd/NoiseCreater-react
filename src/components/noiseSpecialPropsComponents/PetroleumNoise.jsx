import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputColor from "../InputColor"
import InputCheck from "../InputCheck"
import { setNoiseSpeed, setNoiseZoom, setNoiseSize, setNoiseIntensity, setNoiseQuant, setNoiseScope, setNoiseTimeNoise, setNoiseColor1, setNoiseColor2, setNoiseColor3, setNoiseColor4, setNoiseRemoveCol } from '../../features/PetroleumNoiseParamsSlice'

export default function PetroleumNoise() {
	const noiseProps = useSelector(state => state.petroleumNoiseProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='动画速度' minVal={0} maxVal={5} defaultInputValue={noiseProps.noiseSpeed} resetValue={1} dispatchFunc={ setNoiseSpeed } />
			<InputSlider sliderName='斑点缩放' minVal={0.5} maxVal={8} defaultInputValue={noiseProps.noiseZoom} resetValue={2.5} dispatchFunc={ setNoiseZoom } />
			<InputSlider sliderName='斑点大小' minVal={0.001} maxVal={0.2} defaultInputValue={noiseProps.noiseSize} resetValue={0.025} dispatchFunc={ setNoiseSize } />
			<InputSlider sliderName='噪波强度' minVal={0} maxVal={10} defaultInputValue={noiseProps.noiseIntensity} resetValue={4} dispatchFunc={ setNoiseIntensity } />
			<InputSlider sliderName='时间量化' minVal={0.5} maxVal={6} defaultInputValue={noiseProps.noiseQuant} resetValue={2} dispatchFunc={ setNoiseQuant } />
			<InputSlider sliderName='邻域半径' minVal={1} maxVal={3} defaultInputValue={noiseProps.noiseScope} resetValue={2} dispatchFunc={ setNoiseScope } />
			<InputSlider sliderName='时间扰动幅度' minVal={0} maxVal={3} defaultInputValue={noiseProps.noiseTimeNoise} resetValue={1} dispatchFunc={ setNoiseTimeNoise } />
			<InputColor colorName='基色' defaultColorIn={noiseProps.noiseColor1} resetColor='#ffffff' dispatchFunc={ setNoiseColor1 } />
			<InputColor colorName='振幅色' defaultColorIn={noiseProps.noiseColor2} resetColor='#1a1a1a' dispatchFunc={ setNoiseColor2 } />
			<InputColor colorName='频率色' defaultColorIn={noiseProps.noiseColor3} resetColor='#ffffff' dispatchFunc={ setNoiseColor3 } />
			<InputColor colorName='相位色' defaultColorIn={noiseProps.noiseColor4} resetColor='#7f99b3' dispatchFunc={ setNoiseColor4 } />
			<InputCheck checkName='黑白模式' checkDefaultIn={noiseProps.noiseRemoveCol} dispatchFunc={ setNoiseRemoveCol } />
		</div>
	)
}
