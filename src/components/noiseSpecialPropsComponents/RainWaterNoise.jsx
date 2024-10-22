import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import { setNoiseOnlyBright, setNoiseSingleCircleScale, setNoiseCircleCount, setNoiseBlurScale, setNoiseCount } from '../../features/RainWaterNoiseParamsSlice'

export default function RainWaterNoise() {
	const noiseProps = useSelector(state => state.rainWaterNoiseProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='圆圈明亮度' minVal={0.5} maxVal={8} defaultInputValue={noiseProps.noiseOnlyBright} resetValue={6.5} dispatchFunc={ setNoiseOnlyBright } />
			<InputSlider sliderName='单圆圈尺寸' minVal={0} maxVal={10} defaultInputValue={noiseProps.noiseSingleCircleScale} resetValue={4} dispatchFunc={ setNoiseSingleCircleScale } />
			<InputSlider sliderName='圆圈层数' minVal={1} maxVal={10} defaultInputValue={noiseProps.noiseCircleCount} resetValue={3} dispatchFunc={ setNoiseCircleCount } />
			<InputSlider sliderName='清晰度' minVal={0.1} maxVal={10} defaultInputValue={noiseProps.noiseBlurScale} resetValue={3.5} dispatchFunc={ setNoiseBlurScale } />
			<InputSlider sliderName='疏密度' minVal={0} maxVal={10} defaultInputValue={noiseProps.noiseCount} resetValue={3} dispatchFunc={ setNoiseCount } />
		</div>
	)
}