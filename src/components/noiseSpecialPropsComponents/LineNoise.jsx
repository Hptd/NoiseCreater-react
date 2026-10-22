import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import { setNoiseWidth, setNoiseBorder, setNoiseFreq, setNoiseStrength, setNoiseSpeed, setNoiseGrow, setNoiseSeed } from '../../features/LineNoiseParamsSlice'

export default function LineNoise() {
	const noiseProps = useSelector(state => state.lineNoiseProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='线条宽度' minVal={0.001} maxVal={0.5} defaultInputValue={noiseProps.noiseWidth} resetValue={0.05} dispatchFunc={setNoiseWidth} />
			<InputSlider sliderName='边框宽度' minVal={0.0005} maxVal={0.05} defaultInputValue={noiseProps.noiseBorder} resetValue={0.003} dispatchFunc={setNoiseBorder} />
			<InputSlider sliderName='噪声频率' minVal={1} maxVal={200} defaultInputValue={noiseProps.noiseFreq} resetValue={50} dispatchFunc={setNoiseFreq} />
			<InputSlider sliderName='噪声强度' minVal={0} maxVal={0.5} defaultInputValue={noiseProps.noiseStrength} resetValue={0.01} dispatchFunc={setNoiseStrength} />
			<InputSlider sliderName='模拟速度' minVal={0} maxVal={20} defaultInputValue={noiseProps.noiseSpeed} resetValue={5} dispatchFunc={setNoiseSpeed} />
			<InputSlider sliderName='生长时间占比' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseGrow} resetValue={0.5} dispatchFunc={setNoiseGrow} />
			<InputSlider sliderName='随机种子' minVal={0} maxVal={100} defaultInputValue={noiseProps.noiseSeed} resetValue={0} dispatchFunc={setNoiseSeed} />
		</div>
	)
}
