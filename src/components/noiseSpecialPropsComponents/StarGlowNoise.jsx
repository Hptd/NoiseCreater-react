import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputCheck from "../InputCheck"
import { setNoiseSpeed, setNoiseIterations, setNoiseOctaves, setNoiseFbmScroll, setNoiseRadius, setNoiseTailNoise, setNoiseShake, setNoiseGamma, setNoiseExposure, setNoiseRemoveCol } from '../../features/StarGlowNoiseParamsSlice'

export default function StarGlowNoise() {
	const noiseProps = useSelector(state => state.starGlowNoiseProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='整体变化速度' minVal={0} maxVal={3} defaultInputValue={noiseProps.noiseSpeed} resetValue={1} dispatchFunc={ setNoiseSpeed } />
			<InputSlider sliderName='光芒层数' minVal={1} maxVal={100} defaultInputValue={noiseProps.noiseIterations} resetValue={50} dispatchFunc={ setNoiseIterations } />
			<InputSlider sliderName='噪波细节层数' minVal={1} maxVal={8} defaultInputValue={noiseProps.noiseOctaves} resetValue={5} dispatchFunc={ setNoiseOctaves } />
			<InputSlider sliderName='噪波流动速度' minVal={0} maxVal={20} defaultInputValue={noiseProps.noiseFbmScroll} resetValue={7} dispatchFunc={ setNoiseFbmScroll } />
			<InputSlider sliderName='光环半径' minVal={1} maxVal={10} defaultInputValue={noiseProps.noiseRadius} resetValue={5} dispatchFunc={ setNoiseRadius } />
			<InputSlider sliderName='尾迹噪波强度' minVal={0} maxVal={5} defaultInputValue={noiseProps.noiseTailNoise} resetValue={2} dispatchFunc={ setNoiseTailNoise } />
			<InputSlider sliderName='画面抖动强度' minVal={0} maxVal={5} defaultInputValue={noiseProps.noiseShake} resetValue={1} dispatchFunc={ setNoiseShake } />
			<InputSlider sliderName='伽马对比度' minVal={0.5} maxVal={3} defaultInputValue={noiseProps.noiseGamma} resetValue={1.5} dispatchFunc={ setNoiseGamma } />
			<InputSlider sliderName='曝光强度' minVal={10} maxVal={500} defaultInputValue={noiseProps.noiseExposure} resetValue={100} dispatchFunc={ setNoiseExposure } />
			<InputCheck checkName='黑白模式' checkDefaultIn={noiseProps.noiseRemoveCol} dispatchFunc={ setNoiseRemoveCol } />
		</div>
	)
}
