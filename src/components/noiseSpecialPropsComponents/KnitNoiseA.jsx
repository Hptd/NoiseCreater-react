import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import { setNoiseOnlyBright, setNoiseSharkX, setNoiseSharkY, setNoiseHue, setNoiseSaturate } from '../../features/KnitNoiseAParamsSlice'

export default function KnitNoiseA() {
	const noiseProps = useSelector(state => state.knitNoiseAProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='背景亮度' minVal={-1} maxVal={2} defaultInputValue={noiseProps.noiseOnlyBright} resetValue={0} dispatchFunc={ setNoiseOnlyBright } />
			<InputSlider sliderName='形变 X方向' minVal={0.01} maxVal={1} defaultInputValue={noiseProps.noiseSharkX} resetValue={0.5} dispatchFunc={ setNoiseSharkX } />
			<InputSlider sliderName='形变 Y方向' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseSharkY} resetValue={0.7} dispatchFunc={ setNoiseSharkY } />
			<InputSlider sliderName='相位扭曲' minVal={0} maxVal={6} defaultInputValue={noiseProps.noiseHue} resetValue={0.5} dispatchFunc={ setNoiseHue } />
			<InputSlider sliderName='层次细分' minVal={0.1} maxVal={4} defaultInputValue={noiseProps.noiseSaturate} resetValue={2} dispatchFunc={ setNoiseSaturate } />
    </div>
	)
}