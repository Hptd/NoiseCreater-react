import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputCheck from "../InputCheck"
import { setNoiseSlices, setNoiseAmplitude, setNoiseFrequency, setNoiseDensity, setNoiseAnimSpeed, setNoiseScale, setNoiseRadius, setNoiseCamZ, setNoiseRotAngle, setNoiseRemoveCol } from '../../features/SphereNoiseParamsSlice'

export default function SphereNoise() {
	const noiseProps = useSelector(state => state.sphereNoiseProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='分层数' minVal={10} maxVal={200} defaultInputValue={noiseProps.noiseSlices} resetValue={50} dispatchFunc={ setNoiseSlices } />
			<InputSlider sliderName='噪声振幅' minVal={0.001} maxVal={0.1} defaultInputValue={noiseProps.noiseAmplitude} resetValue={0.01} dispatchFunc={ setNoiseAmplitude } />
			<InputSlider sliderName='噪声频率' minVal={0.1} maxVal={5} defaultInputValue={noiseProps.noiseFrequency} resetValue={1.25} dispatchFunc={ setNoiseFrequency } />
			<InputSlider sliderName='起始密度' minVal={-1} maxVal={1} defaultInputValue={noiseProps.noiseDensity} resetValue={0} dispatchFunc={ setNoiseDensity } />
			<InputSlider sliderName='动画速度' minVal={0} maxVal={0.5} defaultInputValue={noiseProps.noiseAnimSpeed} resetValue={0.075} dispatchFunc={ setNoiseAnimSpeed } />
			<InputSlider sliderName='噪声缩放' minVal={1} maxVal={20} defaultInputValue={noiseProps.noiseScale} resetValue={5} dispatchFunc={ setNoiseScale } />
			<InputSlider sliderName='球体半径' minVal={0.1} maxVal={1.5} defaultInputValue={noiseProps.noiseRadius} resetValue={0.5} dispatchFunc={ setNoiseRadius } />
			<InputSlider sliderName='相机位置Z' minVal={-1} maxVal={2} defaultInputValue={noiseProps.noiseCamZ} resetValue={1} dispatchFunc={ setNoiseCamZ } />
			<InputSlider sliderName='旋转角度' minVal={0} maxVal={6.28} defaultInputValue={noiseProps.noiseRotAngle} resetValue={0} dispatchFunc={ setNoiseRotAngle } />
			<InputCheck checkName='黑白模式' checkDefaultIn={noiseProps.noiseRemoveCol} dispatchFunc={ setNoiseRemoveCol } />
		</div>
	)
}
