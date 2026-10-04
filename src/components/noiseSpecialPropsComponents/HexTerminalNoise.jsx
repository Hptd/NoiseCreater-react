import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputColor from "../InputColor"
import InputCheck from "../InputCheck"
import { setNoiseColor, setNoiseHexDensity, setNoiseFillScale, setNoiseRandOffset, setNoiseGradSpeed, setNoiseBorderThreshold, setNoiseBorderWidth, setNoiseEdgeContrast, setNoiseFillSpeed, setNoiseFillSharp, setNoiseBgFreq, setNoiseBgSpeed, setNoiseGlow, setNoiseExposure, setNoiseRemoveCol } from '../../features/HexTerminalNoiseParamsSlice'

export default function HexTerminalNoise() {
	const noiseProps = useSelector(state => state.hexTerminalNoiseProps)

	return (
		<div className="params-container">
			<InputColor colorName='主色调' defaultColorIn={noiseProps.noiseColor} resetColor='#80ccff' dispatchFunc={ setNoiseColor } />
			<InputSlider sliderName='六边形密度' minVal={4} maxVal={120} defaultInputValue={noiseProps.noiseHexDensity} resetValue={42} dispatchFunc={ setNoiseHexDensity } />
			<InputSlider sliderName='填充格密度' minVal={1} maxVal={48} defaultInputValue={noiseProps.noiseFillScale} resetValue={12} dispatchFunc={ setNoiseFillScale } />
			<InputSlider sliderName='随机偏移' minVal={0} maxVal={300} defaultInputValue={noiseProps.noiseRandOffset} resetValue={90} dispatchFunc={ setNoiseRandOffset } />
			<InputSlider sliderName='渐变速度' minVal={0} maxVal={3} defaultInputValue={noiseProps.noiseGradSpeed} resetValue={0.6} dispatchFunc={ setNoiseGradSpeed } />
			<InputSlider sliderName='边框位置' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseBorderThreshold} resetValue={0.1} dispatchFunc={ setNoiseBorderThreshold } />
			<InputSlider sliderName='边框宽度' minVal={0.02} maxVal={1} defaultInputValue={noiseProps.noiseBorderWidth} resetValue={0.21} dispatchFunc={ setNoiseBorderWidth } />
			<InputSlider sliderName='边框对比' minVal={0.1} maxVal={2} defaultInputValue={noiseProps.noiseEdgeContrast} resetValue={0.7} dispatchFunc={ setNoiseEdgeContrast } />
			<InputSlider sliderName='填充速度' minVal={0} maxVal={3} defaultInputValue={noiseProps.noiseFillSpeed} resetValue={0.5} dispatchFunc={ setNoiseFillSpeed } />
			<InputSlider sliderName='填充锐度' minVal={1} maxVal={32} defaultInputValue={noiseProps.noiseFillSharp} resetValue={8} dispatchFunc={ setNoiseFillSharp } />
			<InputSlider sliderName='背景频率' minVal={0} maxVal={20} defaultInputValue={noiseProps.noiseBgFreq} resetValue={5} dispatchFunc={ setNoiseBgFreq } />
			<InputSlider sliderName='背景速度' minVal={0} maxVal={10} defaultInputValue={noiseProps.noiseBgSpeed} resetValue={2} dispatchFunc={ setNoiseBgSpeed } />
			<InputSlider sliderName='发光强度' minVal={0} maxVal={10} defaultInputValue={noiseProps.noiseGlow} resetValue={3} dispatchFunc={ setNoiseGlow } />
			<InputSlider sliderName='曝光' minVal={1} maxVal={6} defaultInputValue={noiseProps.noiseExposure} resetValue={3} dispatchFunc={ setNoiseExposure } />
			<InputCheck checkName='黑白模式' checkDefaultIn={noiseProps.noiseRemoveCol} dispatchFunc={ setNoiseRemoveCol } />
		</div>
	)
}
