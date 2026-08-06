import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputColor from "../InputColor"
import InputCheck from "../InputCheck"
import { setNoiseSpeed, setNoiseFireHeight, setNoiseWarp, setNoiseFalloff, setNoiseFlameDensity, setNoiseFireSoftness, setNoiseFireBrightness, setNoiseSmokeAmount, setNoiseSparkDensity, setNoiseSparkSpeed, setNoiseDetail, setNoiseFlowStrength, setNoiseSparkColor, setNoiseRemoveCol } from '../../features/FireSmokeNoiseParamsSlice'

export default function FireSmokeNoise() {
	const noiseProps = useSelector(state => state.fireSmokeNoiseProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='动画速度' minVal={0} maxVal={3} defaultInputValue={noiseProps.noiseSpeed} resetValue={0.5} dispatchFunc={ setNoiseSpeed } />
			<InputSlider sliderName='火焰高度' minVal={50} maxVal={800} defaultInputValue={noiseProps.noiseFireHeight} resetValue={210} dispatchFunc={ setNoiseFireHeight } />
			<InputSlider sliderName='扭曲强度' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseWarp} resetValue={0.4} dispatchFunc={ setNoiseWarp } />
			<InputSlider sliderName='分形衰减' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseFalloff} resetValue={0.4} dispatchFunc={ setNoiseFalloff } />
			<InputSlider sliderName='火焰浓度' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseFlameDensity} resetValue={0.3} dispatchFunc={ setNoiseFlameDensity } />
			<InputSlider sliderName='火焰柔和度' minVal={0} maxVal={20} defaultInputValue={noiseProps.noiseFireSoftness} resetValue={8} dispatchFunc={ setNoiseFireSoftness } />
			<InputSlider sliderName='火焰亮度' minVal={0} maxVal={3} defaultInputValue={noiseProps.noiseFireBrightness} resetValue={1.5} dispatchFunc={ setNoiseFireBrightness } />
			<InputSlider sliderName='烟雾浓度' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseSmokeAmount} resetValue={0.3} dispatchFunc={ setNoiseSmokeAmount } />
			<InputSlider sliderName='火花密度' minVal={5} maxVal={100} defaultInputValue={noiseProps.noiseSparkDensity} resetValue={30} dispatchFunc={ setNoiseSparkDensity } />
			<InputSlider sliderName='火花速度' minVal={0} maxVal={500} defaultInputValue={noiseProps.noiseSparkSpeed} resetValue={190} dispatchFunc={ setNoiseSparkSpeed } />
			<InputSlider sliderName='位移细节' minVal={0} maxVal={5} defaultInputValue={noiseProps.noiseDetail} resetValue={2.4} dispatchFunc={ setNoiseDetail } />
			<InputSlider sliderName='对流强度' minVal={0} maxVal={5} defaultInputValue={noiseProps.noiseFlowStrength} resetValue={1} dispatchFunc={ setNoiseFlowStrength } />
			<InputColor colorName='火花颜色' defaultColorIn={noiseProps.noiseSparkColor} resetColor='#ff4d00' dispatchFunc={ setNoiseSparkColor } />
			<InputCheck checkName='黑白模式' checkDefaultIn={noiseProps.noiseRemoveCol} dispatchFunc={ setNoiseRemoveCol } />
		</div>
	)
}