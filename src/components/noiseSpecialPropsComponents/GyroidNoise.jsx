import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputColor from "../InputColor"
import InputCheck from "../InputCheck"
import { setNoiseScale, setNoiseSpeed, setNoiseWarp, setNoiseBump, setNoiseSpecular, setNoiseTintStrength, setNoiseHue, setNoiseRimColor, setNoiseRimPower, setNoiseRemoveCol } from '../../features/GyroidNoiseParamsSlice'

export default function GyroidNoise() {
	const noiseProps = useSelector(state => state.gyroidNoiseProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='图案密度' minVal={0.2} maxVal={5} defaultInputValue={noiseProps.noiseScale} resetValue={1} dispatchFunc={ setNoiseScale } />
			<InputSlider sliderName='动画速度' minVal={0} maxVal={2} defaultInputValue={noiseProps.noiseSpeed} resetValue={0.1} dispatchFunc={ setNoiseSpeed } />
			<InputSlider sliderName='扭曲程度' minVal={0} maxVal={20} defaultInputValue={noiseProps.noiseWarp} resetValue={6} dispatchFunc={ setNoiseWarp } />
			<InputSlider sliderName='凹凸强度' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseBump} resetValue={0.2} dispatchFunc={ setNoiseBump } />
			<InputSlider sliderName='高光强度' minVal={0} maxVal={50} defaultInputValue={noiseProps.noiseSpecular} resetValue={10} dispatchFunc={ setNoiseSpecular } />
			<InputSlider sliderName='彩色光强度' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseTintStrength} resetValue={0.3} dispatchFunc={ setNoiseTintStrength } />
			<InputSlider sliderName='颜色变化频率' minVal={0} maxVal={20} defaultInputValue={noiseProps.noiseHue} resetValue={5} dispatchFunc={ setNoiseHue } />
			<InputSlider sliderName='底部光强度' minVal={0} maxVal={10} defaultInputValue={noiseProps.noiseRimPower} resetValue={2} dispatchFunc={ setNoiseRimPower } />
			<InputColor colorName='底部光颜色' defaultColorIn={noiseProps.noiseRimColor} resetColor='#ff9494' dispatchFunc={ setNoiseRimColor } />
			<InputCheck checkName='黑白模式' checkDefaultIn={noiseProps.noiseRemoveCol} dispatchFunc={ setNoiseRemoveCol } />
		</div>
	)
}