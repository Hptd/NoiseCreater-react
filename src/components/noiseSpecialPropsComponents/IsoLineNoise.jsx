import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputColor from "../InputColor"
import InputCheck from "../InputCheck"
import { setNoiseScale, setNoiseSpeed, setNoiseLevels, setNoiseLayerOffset, setNoiseSkew, setNoiseYScale, setNoiseBias, setNoiseGain, setNoiseEdgeBase, setNoiseEdgeHeight, setNoiseEdgeSharp, setNoiseColor1, setNoiseColor2, setNoiseBgColor, setNoiseRemoveCol } from '../../features/IsoLineNoiseParamsSlice'

export default function IsoLineNoise() {
	const noiseProps = useSelector(state => state.isoLineNoiseProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='噪波缩放' minVal={0.5} maxVal={20} defaultInputValue={noiseProps.noiseScale} resetValue={18} dispatchFunc={ setNoiseScale } />
			<InputSlider sliderName='动画速度' minVal={0} maxVal={3} defaultInputValue={noiseProps.noiseSpeed} resetValue={1} dispatchFunc={ setNoiseSpeed } />
			<InputSlider sliderName='等值线层数' minVal={1} maxVal={50} defaultInputValue={noiseProps.noiseLevels} resetValue={20} dispatchFunc={ setNoiseLevels } />
			<InputSlider sliderName='层间纵向偏移' minVal={-0.5} maxVal={0.5} defaultInputValue={noiseProps.noiseLayerOffset} resetValue={0.1} dispatchFunc={ setNoiseLayerOffset } />
			<InputSlider sliderName='斜切扭曲' minVal={-1} maxVal={1} defaultInputValue={noiseProps.noiseSkew} resetValue={0.1} dispatchFunc={ setNoiseSkew } />
			<InputSlider sliderName='纵向拉伸' minVal={0.1} maxVal={3} defaultInputValue={noiseProps.noiseYScale} resetValue={0.6} dispatchFunc={ setNoiseYScale } />
			<InputSlider sliderName='噪波暗部偏移' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseBias} resetValue={0.2} dispatchFunc={ setNoiseBias } />
			<InputSlider sliderName='噪波对比度' minVal={0.1} maxVal={2} defaultInputValue={noiseProps.noiseGain} resetValue={0.6} dispatchFunc={ setNoiseGain } />
			<InputSlider sliderName='线条基础粗细' minVal={0.1} maxVal={10} defaultInputValue={noiseProps.noiseEdgeBase} resetValue={1.5} dispatchFunc={ setNoiseEdgeBase } />
			<InputSlider sliderName='线宽随高度增强' minVal={0} maxVal={100} defaultInputValue={noiseProps.noiseEdgeHeight} resetValue={20} dispatchFunc={ setNoiseEdgeHeight } />
			<InputSlider sliderName='线条锐度' minVal={0.0005} maxVal={0.05} defaultInputValue={noiseProps.noiseEdgeSharp} resetValue={0.01} dispatchFunc={ setNoiseEdgeSharp } />
			<InputColor colorName='低值颜色' defaultColorIn={noiseProps.noiseColor1} resetColor='#000000' dispatchFunc={ setNoiseColor1 } />
			<InputColor colorName='高值颜色' defaultColorIn={noiseProps.noiseColor2} resetColor='#ffffff' dispatchFunc={ setNoiseColor2 } />
			<InputColor colorName='背景颜色' defaultColorIn={noiseProps.noiseBgColor} resetColor='#000000' dispatchFunc={ setNoiseBgColor } />
			<InputCheck checkName='黑白模式' checkDefaultIn={noiseProps.noiseRemoveCol} dispatchFunc={ setNoiseRemoveCol } />
		</div>
	)
}
