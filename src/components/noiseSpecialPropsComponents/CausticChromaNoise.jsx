import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputCheck from "../InputCheck"
import { setNoiseOctaves, setNoiseRefineSteps, setNoiseSepSize, setNoiseSepLight, setNoiseSepAnim, setNoiseCausticStrength, setNoiseCausticRoughness, setNoiseCausticAber, setNoiseScale, setNoiseRemoveCol } from '../../features/CausticChromaNoiseParamsSlice'

export default function CausticChromaNoise() {
	const noiseProps = useSelector(state => state.causticChromaNoiseProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='迭代层数' minVal={1} maxVal={40} defaultInputValue={noiseProps.noiseOctaves} resetValue={24} dispatchFunc={ setNoiseOctaves } />
			<InputSlider sliderName='细化迭代' minVal={1} maxVal={20} defaultInputValue={noiseProps.noiseRefineSteps} resetValue={10} dispatchFunc={ setNoiseRefineSteps } />
			<InputSlider sliderName='尺度指数' minVal={0.5} maxVal={3} defaultInputValue={noiseProps.noiseSepSize} resetValue={1.2} dispatchFunc={ setNoiseSepSize } />
			<InputSlider sliderName='光照衰减' minVal={0.5} maxVal={4} defaultInputValue={noiseProps.noiseSepLight} resetValue={1.9} dispatchFunc={ setNoiseSepLight } />
			<InputSlider sliderName='动画强度' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseSepAnim} resetValue={0.1} dispatchFunc={ setNoiseSepAnim } />
			<InputSlider sliderName='焦散强度' minVal={0} maxVal={0.05} defaultInputValue={noiseProps.noiseCausticStrength} resetValue={0.008} dispatchFunc={ setNoiseCausticStrength } />
			<InputSlider sliderName='焦散粗糙度' minVal={0.5} maxVal={4} defaultInputValue={noiseProps.noiseCausticRoughness} resetValue={1.3} dispatchFunc={ setNoiseCausticRoughness } />
			<InputSlider sliderName='色差' minVal={0} maxVal={0.01} defaultInputValue={noiseProps.noiseCausticAber} resetValue={0.001} dispatchFunc={ setNoiseCausticAber } />
			<InputSlider sliderName='缩放' minVal={1} maxVal={8} defaultInputValue={noiseProps.noiseScale} resetValue={3} dispatchFunc={ setNoiseScale } />
			<InputCheck checkName='黑白模式' checkDefaultIn={noiseProps.noiseRemoveCol} dispatchFunc={ setNoiseRemoveCol } />
		</div>
	)
}
