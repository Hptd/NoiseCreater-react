import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputColor from "../InputColor"
import InputCheck from "../InputCheck"
import { setNoiseScale, setNoiseSpeed, setNoiseSampleDist, setNoiseBumpStrength, setNoiseBaseBright, setNoiseColor, setNoiseRemoveCol } from '../../features/WarpedNoiseParamsSlice'

export default function WarpedNoise() {
	const noiseProps = useSelector(state => state.warpedNoiseProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='噪声缩放' minVal={1} maxVal={20} defaultInputValue={noiseProps.noiseScale} resetValue={6} dispatchFunc={setNoiseScale} />
			<InputSlider sliderName='动画速度' minVal={0} maxVal={3} defaultInputValue={noiseProps.noiseSpeed} resetValue={0.5} dispatchFunc={setNoiseSpeed} />
			<InputSlider sliderName='高光采样距离' minVal={0.001} maxVal={0.1} defaultInputValue={noiseProps.noiseSampleDist} resetValue={0.02} dispatchFunc={setNoiseSampleDist} />
			<InputSlider sliderName='高光强度' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseBumpStrength} resetValue={0.2} dispatchFunc={setNoiseBumpStrength} />
			<InputSlider sliderName='基础亮度' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseBaseBright} resetValue={0.5} dispatchFunc={setNoiseBaseBright} />
			<InputColor colorName='噪波颜色' defaultColorIn={noiseProps.noiseColor} resetColor='#ffb399' dispatchFunc={setNoiseColor} />
			<InputCheck checkName='黑白模式' checkDefaultIn={noiseProps.noiseRemoveCol} dispatchFunc={setNoiseRemoveCol} />
		</div>
	)
}
