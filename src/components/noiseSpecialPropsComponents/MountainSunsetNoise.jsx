import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputColor from "../InputColor"
import InputCheck from "../InputCheck"
import { setNoiseSkyColor, setNoiseSunColor, setNoiseBirdColor, setNoiseSunSize, setNoiseSunX, setNoiseSunY, setNoiseNoiseFreq, setNoiseMountainAmp, setNoiseDetailAmp, setNoiseMountainThreshold, setNoiseFogStrength, setNoiseGlobalSpeed, setNoiseParallaxSpeed, setNoiseShowBird, setNoiseRemoveCol } from '../../features/MountainSunsetNoiseParamsSlice'

export default function MountainSunsetNoise() {
	const noiseProps = useSelector(state => state.mountainSunsetNoiseProps)

	return (
		<div className="params-container">
			<InputColor colorName='天空颜色' defaultColorIn={noiseProps.noiseSkyColor} resetColor='#ffffff' dispatchFunc={ setNoiseSkyColor } />
			<InputColor colorName='太阳颜色' defaultColorIn={noiseProps.noiseSunColor} resetColor='#ff3300' dispatchFunc={ setNoiseSunColor } />
			<InputColor colorName='飞鸟颜色' defaultColorIn={noiseProps.noiseBirdColor} resetColor='#a6a6a6' dispatchFunc={ setNoiseBirdColor } />
			<InputSlider sliderName='太阳大小' minVal={0.02} maxVal={0.5} defaultInputValue={noiseProps.noiseSunSize} resetValue={0.1} dispatchFunc={ setNoiseSunSize } />
			<InputSlider sliderName='太阳横向' minVal={-1} maxVal={1} defaultInputValue={noiseProps.noiseSunX} resetValue={0.5} dispatchFunc={ setNoiseSunX } />
			<InputSlider sliderName='太阳纵向' minVal={-1} maxVal={1} defaultInputValue={noiseProps.noiseSunY} resetValue={0.3} dispatchFunc={ setNoiseSunY } />
			<InputSlider sliderName='噪声频率' minVal={0.5} maxVal={16} defaultInputValue={noiseProps.noiseNoiseFreq} resetValue={4} dispatchFunc={ setNoiseNoiseFreq } />
			<InputSlider sliderName='山体起伏' minVal={0} maxVal={0.5} defaultInputValue={noiseProps.noiseMountainAmp} resetValue={0.1} dispatchFunc={ setNoiseMountainAmp } />
			<InputSlider sliderName='细节幅度' minVal={0} maxVal={0.05} defaultInputValue={noiseProps.noiseDetailAmp} resetValue={0.005} dispatchFunc={ setNoiseDetailAmp } />
			<InputSlider sliderName='山体阈值' minVal={0.1} maxVal={0.9} defaultInputValue={noiseProps.noiseMountainThreshold} resetValue={0.48} dispatchFunc={ setNoiseMountainThreshold } />
			<InputSlider sliderName='雾气强度' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseFogStrength} resetValue={0.2} dispatchFunc={ setNoiseFogStrength } />
			<InputSlider sliderName='全局速度' minVal={0} maxVal={3} defaultInputValue={noiseProps.noiseGlobalSpeed} resetValue={0.5} dispatchFunc={ setNoiseGlobalSpeed } />
			<InputSlider sliderName='视差速度' minVal={0} maxVal={5} defaultInputValue={noiseProps.noiseParallaxSpeed} resetValue={1} dispatchFunc={ setNoiseParallaxSpeed } />
			<InputCheck checkName='显示飞鸟' checkDefaultIn={noiseProps.noiseShowBird} dispatchFunc={ setNoiseShowBird } />
			<InputCheck checkName='黑白模式' checkDefaultIn={noiseProps.noiseRemoveCol} dispatchFunc={ setNoiseRemoveCol } />
		</div>
	)
}
