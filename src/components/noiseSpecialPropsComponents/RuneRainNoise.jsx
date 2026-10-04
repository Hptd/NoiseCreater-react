import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputColor from "../InputColor"
import InputCheck from "../InputCheck"
import { setNoiseRows, setNoiseColumns, setNoiseZoomSpeed, setNoiseRainSpeed, setNoiseRainDensity, setNoiseRainColor, setNoiseMaxBright, setNoiseSatPower, setNoiseLayerScale, setNoiseRuneThickness, setNoiseRemoveCol } from '../../features/RuneRainNoiseParamsSlice'

export default function RuneRainNoise() {
	const noiseProps = useSelector(state => state.runeRainNoiseProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='行数' minVal={8} maxVal={128} defaultInputValue={noiseProps.noiseRows} resetValue={64} dispatchFunc={ setNoiseRows } />
			<InputSlider sliderName='列数' minVal={8} maxVal={256} defaultInputValue={noiseProps.noiseColumns} resetValue={128} dispatchFunc={ setNoiseColumns } />
			<InputSlider sliderName='缩放速度' minVal={0} maxVal={0.5} defaultInputValue={noiseProps.noiseZoomSpeed} resetValue={0.05} dispatchFunc={ setNoiseZoomSpeed } />
			<InputSlider sliderName='下落速度' minVal={0} maxVal={0.5} defaultInputValue={noiseProps.noiseRainSpeed} resetValue={0.05} dispatchFunc={ setNoiseRainSpeed } />
			<InputSlider sliderName='雨滴密度' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseRainDensity} resetValue={0.5} dispatchFunc={ setNoiseRainDensity } />
			<InputColor colorName='雨滴颜色' defaultColorIn={noiseProps.noiseRainColor} resetColor='#00ff80' dispatchFunc={ setNoiseRainColor } />
			<InputSlider sliderName='最大亮度' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseMaxBright} resetValue={0.6} dispatchFunc={ setNoiseMaxBright } />
			<InputSlider sliderName='饱和锐度' minVal={1} maxVal={32} defaultInputValue={noiseProps.noiseSatPower} resetValue={8} dispatchFunc={ setNoiseSatPower } />
			<InputSlider sliderName='层缩放' minVal={1} maxVal={10} defaultInputValue={noiseProps.noiseLayerScale} resetValue={4} dispatchFunc={ setNoiseLayerScale } />
			<InputSlider sliderName='符文粗细' minVal={0.01} maxVal={0.5} defaultInputValue={noiseProps.noiseRuneThickness} resetValue={0.1} dispatchFunc={ setNoiseRuneThickness } />
			<InputCheck checkName='黑白模式' checkDefaultIn={noiseProps.noiseRemoveCol} dispatchFunc={ setNoiseRemoveCol } />
		</div>
	)
}
