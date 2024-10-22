import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import { setNoiseRepeat, setNoiseSpeedNoun, setNoiseSpeedOffset } from '../../features/BandingGradientsNoiseParamsSlice'

export default function BandingGradientsNoise() {
	const noiseProps = useSelector(state => state.bandingGradientsNoiseProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='横格数量' minVal={0} maxVal={64} defaultInputValue={noiseProps.noiseRepeat } resetValue={32} dispatchFunc={ setNoiseRepeat } />
			<InputSlider sliderName='节奏速度' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseSpeedNoun } resetValue={0.2} dispatchFunc={ setNoiseSpeedNoun } />
			<InputSlider sliderName='横向位移速度' minVal={0} maxVal={2} defaultInputValue={noiseProps.noiseSpeedOffset } resetValue={0.8} dispatchFunc={ setNoiseSpeedOffset } />
		</div>
	)
}