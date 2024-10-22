import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import { setNoiseDelicate, setNoiseBroken } from '../../features/HoneycompNoiseBParamsSlice'

export default function HoneycompNoiseB() {
	const noiseProps = useSelector(state => state.honeycompNoiseBProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='细腻程度' minVal={0} maxVal={5} defaultInputValue={noiseProps.noiseDelicate } resetValue={3} dispatchFunc={ setNoiseDelicate } />
			<InputSlider sliderName='破碎程度' minVal={0} maxVal={20} defaultInputValue={noiseProps.noiseBroken } resetValue={2} dispatchFunc={ setNoiseBroken } />
		</div>
	)
}