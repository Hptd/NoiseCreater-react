import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputColor from "../InputColor"
import InputCheck from "../InputCheck"
import { setNoiseBoomColor1, setNoiseBoomColor2, setNoiseBoomColor3, setNoiseBoomColor4, setNoiseSmokeColor1, setNoiseSmokeColor2, setNoiseSmokeColor3, setNoiseBgColor, setNoiseCycle, setNoiseZoom, setNoiseBoomDistort, setNoiseSmokeDistort, setNoiseBubbleW, setNoiseSmokeBubbleW, setNoiseBorderWidth, setNoiseMixThreshold, setNoiseRemoveCol } from '../../features/BoomSmokeNoiseParamsSlice'

export default function BoomSmokeNoise() {
	const noiseProps = useSelector(state => state.boomSmokeNoiseProps)

	return (
		<div className="params-container">
			<InputColor colorName='爆炸色-1' defaultColorIn={noiseProps.noiseBoomColor1} resetColor='#33264d' dispatchFunc={ setNoiseBoomColor1 } />
			<InputColor colorName='爆炸色-2' defaultColorIn={noiseProps.noiseBoomColor2} resetColor='#e6260d' dispatchFunc={ setNoiseBoomColor2 } />
			<InputColor colorName='爆炸色-3' defaultColorIn={noiseProps.noiseBoomColor3} resetColor='#e6801a' dispatchFunc={ setNoiseBoomColor3 } />
			<InputColor colorName='爆炸色-4' defaultColorIn={noiseProps.noiseBoomColor4} resetColor='#f2f259' dispatchFunc={ setNoiseBoomColor4 } />
			<InputColor colorName='烟雾色-1' defaultColorIn={noiseProps.noiseSmokeColor1} resetColor='#33264d' dispatchFunc={ setNoiseSmokeColor1 } />
			<InputColor colorName='烟雾色-2' defaultColorIn={noiseProps.noiseSmokeColor2} resetColor='#594d73' dispatchFunc={ setNoiseSmokeColor2 } />
			<InputColor colorName='烟雾色-3' defaultColorIn={noiseProps.noiseSmokeColor3} resetColor='#807399' dispatchFunc={ setNoiseSmokeColor3 } />
			<InputColor colorName='背景色' defaultColorIn={noiseProps.noiseBgColor} resetColor='#808080' dispatchFunc={ setNoiseBgColor } />
			<InputSlider sliderName='周期' minVal={0.5} maxVal={5} defaultInputValue={noiseProps.noiseCycle} resetValue={2} dispatchFunc={ setNoiseCycle } />
			<InputSlider sliderName='缩放' minVal={1} maxVal={20} defaultInputValue={noiseProps.noiseZoom} resetValue={7} dispatchFunc={ setNoiseZoom } />
			<InputSlider sliderName='爆炸扭曲' minVal={0} maxVal={2} defaultInputValue={noiseProps.noiseBoomDistort} resetValue={0.5} dispatchFunc={ setNoiseBoomDistort } />
			<InputSlider sliderName='烟雾扭曲' minVal={0} maxVal={4} defaultInputValue={noiseProps.noiseSmokeDistort} resetValue={1.5} dispatchFunc={ setNoiseSmokeDistort } />
			<InputSlider sliderName='爆炸气泡权重' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseBubbleW} resetValue={0.5} dispatchFunc={ setNoiseBubbleW } />
			<InputSlider sliderName='烟雾气泡权重' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseSmokeBubbleW} resetValue={0.75} dispatchFunc={ setNoiseSmokeBubbleW } />
			<InputSlider sliderName='描边宽度' minVal={0.005} maxVal={0.1} defaultInputValue={noiseProps.noiseBorderWidth} resetValue={0.02} dispatchFunc={ setNoiseBorderWidth } />
			<InputSlider sliderName='混合阈值' minVal={0.5} maxVal={2} defaultInputValue={noiseProps.noiseMixThreshold} resetValue={1.25} dispatchFunc={ setNoiseMixThreshold } />
			<InputCheck checkName='黑白模式' checkDefaultIn={noiseProps.noiseRemoveCol} dispatchFunc={ setNoiseRemoveCol } />
		</div>
	)
}
