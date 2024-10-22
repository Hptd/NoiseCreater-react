import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import { setNoiseDelicate } from '../../features/VoroNoiseParamsSlice'

export default function VoroNoise() {
	const noiseProps = useSelector(state => state.voroNoiseProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='形变程度' minVal={0} maxVal={6} defaultInputValue={noiseProps.noiseDelicate } resetValue={5.5} dispatchFunc={ setNoiseDelicate } />
		</div>
	)
}