import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import { setNoiseSpeed, setNoiseRowThickness, setNoiseDashFreq, setNoiseDashScale, setNoiseMoveSpeed, setNoiseXOffsetDiv, setNoiseDashRatio, setNoiseLineWidth } from '../../features/DashLineNoiseParamsSlice'

export default function DashLineNoise() {
	const noiseProps = useSelector(state => state.dashLineNoiseProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='时间速度' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseSpeed} resetValue={0.2} dispatchFunc={ setNoiseSpeed } />
			<InputSlider sliderName='行数' minVal={1} maxVal={50} defaultInputValue={noiseProps.noiseRowThickness} resetValue={20} dispatchFunc={ setNoiseRowThickness } />
			<InputSlider sliderName='虚线密度' minVal={1} maxVal={20} defaultInputValue={noiseProps.noiseDashFreq} resetValue={4} dispatchFunc={ setNoiseDashFreq } />
			<InputSlider sliderName='虚线长度' minVal={1} maxVal={20} defaultInputValue={noiseProps.noiseDashScale} resetValue={7} dispatchFunc={ setNoiseDashScale } />
			<InputSlider sliderName='横向移动速度' minVal={0} maxVal={20} defaultInputValue={noiseProps.noiseMoveSpeed} resetValue={5.1} dispatchFunc={ setNoiseMoveSpeed } />
			<InputSlider sliderName='行错位' minVal={1} maxVal={10} defaultInputValue={noiseProps.noiseXOffsetDiv} resetValue={3} dispatchFunc={ setNoiseXOffsetDiv } />
			<InputSlider sliderName='占空比' minVal={0.1} maxVal={0.9} defaultInputValue={noiseProps.noiseDashRatio} resetValue={0.5} dispatchFunc={ setNoiseDashRatio } />
			<InputSlider sliderName='线条宽度' minVal={0.01} maxVal={0.5} defaultInputValue={noiseProps.noiseLineWidth} resetValue={0.15} dispatchFunc={ setNoiseLineWidth } />
		</div>
	)
}
