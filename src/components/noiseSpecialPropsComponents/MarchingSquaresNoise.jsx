import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputColor from "../InputColor"
import InputCheck from "../InputCheck"
import { setNoiseGridScale, setNoiseNoiseFreq, setNoiseThreshold, setNoiseSpeed, setNoiseLineWidth, setNoiseDotSize, setNoiseEdgeSoft, setNoiseLineColor, setNoiseBgColor, setNoiseRemoveCol } from '../../features/MarchingSquaresNoiseParamsSlice'

export default function MarchingSquaresNoise() {
	const noiseProps = useSelector(state => state.marchingSquaresNoiseProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='网格密度' minVal={1} maxVal={40} defaultInputValue={noiseProps.noiseGridScale} resetValue={40} dispatchFunc={ setNoiseGridScale } />
			<InputSlider sliderName='噪波频率' minVal={0.01} maxVal={0.5} defaultInputValue={noiseProps.noiseNoiseFreq} resetValue={0.1} dispatchFunc={ setNoiseNoiseFreq } />
			<InputSlider sliderName='阈值' minVal={-1} maxVal={1} defaultInputValue={noiseProps.noiseThreshold} resetValue={0} dispatchFunc={ setNoiseThreshold } />
			<InputSlider sliderName='演化速度' minVal={0} maxVal={5} defaultInputValue={noiseProps.noiseSpeed} resetValue={1} dispatchFunc={ setNoiseSpeed } />
			<InputSlider sliderName='线条宽度' minVal={0.01} maxVal={0.5} defaultInputValue={noiseProps.noiseLineWidth} resetValue={0.1} dispatchFunc={ setNoiseLineWidth } />
			<InputSlider sliderName='圆点大小' minVal={0.01} maxVal={0.5} defaultInputValue={noiseProps.noiseDotSize} resetValue={0.1} dispatchFunc={ setNoiseDotSize } />
			<InputSlider sliderName='边缘柔和' minVal={0} maxVal={0.05} defaultInputValue={noiseProps.noiseEdgeSoft} resetValue={0} dispatchFunc={ setNoiseEdgeSoft } />
			<InputColor colorName='线条颜色' defaultColorIn={noiseProps.noiseLineColor} resetColor='#ffffff' dispatchFunc={ setNoiseLineColor } />
			<InputColor colorName='背景颜色' defaultColorIn={noiseProps.noiseBgColor} resetColor='#000000' dispatchFunc={ setNoiseBgColor } />
			<InputCheck checkName='黑白模式' checkDefaultIn={noiseProps.noiseRemoveCol} dispatchFunc={ setNoiseRemoveCol } />
		</div>
	)
}
