import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputColor from "../InputColor"
import InputCheck from "../InputCheck"
import { setNoiseLineScale, setNoiseLineCount, setNoiseWarpStrength, setNoiseNoiseFreq, setNoiseAnimSpeed, setNoiseLightColor, setNoiseDarkColor, setNoiseRemoveCol } from '../../features/WaveLineNoiseParamsSlice'

export default function WaveLineNoise() {
	const noiseProps = useSelector(state => state.waveLineNoiseProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='线条缩放' minVal={0.1} maxVal={5} defaultInputValue={noiseProps.noiseLineScale} resetValue={1} dispatchFunc={ setNoiseLineScale } />
			<InputSlider sliderName='线条行数' minVal={10} maxVal={300} defaultInputValue={noiseProps.noiseLineCount} resetValue={100} dispatchFunc={ setNoiseLineCount } />
			<InputSlider sliderName='扭曲强度' minVal={0} maxVal={20} defaultInputValue={noiseProps.noiseWarpStrength} resetValue={5} dispatchFunc={ setNoiseWarpStrength } />
			<InputSlider sliderName='噪声频率' minVal={0.01} maxVal={1} defaultInputValue={noiseProps.noiseNoiseFreq} resetValue={0.1429} dispatchFunc={ setNoiseNoiseFreq } />
			<InputSlider sliderName='动画速度' minVal={0} maxVal={5} defaultInputValue={noiseProps.noiseAnimSpeed} resetValue={0.5} dispatchFunc={ setNoiseAnimSpeed } />
			<InputColor colorName='亮色' defaultColorIn={noiseProps.noiseLightColor} resetColor='#ebf1f5' dispatchFunc={ setNoiseLightColor } />
			<InputColor colorName='暗色' defaultColorIn={noiseProps.noiseDarkColor} resetColor='#10161a' dispatchFunc={ setNoiseDarkColor } />
			<InputCheck checkName='黑白模式' checkDefaultIn={noiseProps.noiseRemoveCol} dispatchFunc={ setNoiseRemoveCol } />
		</div>
	)
}
