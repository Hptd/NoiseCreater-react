import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import { setNoiseWarpAmount, setNoiseFreq, setNoiseSeed, setNoiseMixSoft, setNoiseContrast, setNoiseOctaves } from '../../features/Rotating3DNoiseParamsSlice'

export default function Rotating3DNoise() {
	const noiseProps = useSelector(state => state.rotating3DNoiseProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='扭曲强度' minVal={0} maxVal={3} defaultInputValue={noiseProps.noiseWarpAmount} resetValue={0.2} dispatchFunc={ setNoiseWarpAmount } />
			<InputSlider sliderName='噪波频率' minVal={0.5} maxVal={20} defaultInputValue={noiseProps.noiseFreq} resetValue={14} dispatchFunc={ setNoiseFreq } />
			<InputSlider sliderName='随机种子' minVal={0} maxVal={100} defaultInputValue={noiseProps.noiseSeed} resetValue={72.2815} dispatchFunc={ setNoiseSeed } />
			<InputSlider sliderName='交替过渡柔化' minVal={0.01} maxVal={0.5} defaultInputValue={noiseProps.noiseMixSoft} resetValue={0.1} dispatchFunc={ setNoiseMixSoft } />
			<InputSlider sliderName='黑白对比度' minVal={0} maxVal={3} defaultInputValue={noiseProps.noiseContrast} resetValue={1} dispatchFunc={ setNoiseContrast } />
			<InputSlider sliderName='噪波层数' minVal={1} maxVal={6} defaultInputValue={noiseProps.noiseOctaves} resetValue={4} dispatchFunc={ setNoiseOctaves } />
		</div>
	)
}
