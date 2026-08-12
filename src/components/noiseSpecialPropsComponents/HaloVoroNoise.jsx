import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputCheck from "../InputCheck"
import { setNoiseOctaves, setNoiseAmplitude, setNoiseFrequency, setNoiseFreqMult, setNoiseDecay, setNoiseJitter, setNoiseEdge, setNoiseDetailScale, setNoisePulse, setNoisePower, setNoiseBoost, setNoiseColorR, setNoiseColorG, setNoiseColorB, setNoiseGain, setNoiseRemoveCol } from '../../features/HaloVoroNoiseParamsSlice'

export default function HaloVoroNoise() {
	const noiseProps = useSelector(state => state.haloVoroNoiseProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='迭代层数' minVal={1} maxVal={6} defaultInputValue={noiseProps.noiseOctaves} resetValue={3} dispatchFunc={ setNoiseOctaves } />
			<InputSlider sliderName='基础振幅' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseAmplitude} resetValue={0.6} dispatchFunc={ setNoiseAmplitude } />
			<InputSlider sliderName='基础频率' minVal={1} maxVal={32} defaultInputValue={noiseProps.noiseFrequency} resetValue={8} dispatchFunc={ setNoiseFrequency } />
			<InputSlider sliderName='频率倍率' minVal={1} maxVal={4} defaultInputValue={noiseProps.noiseFreqMult} resetValue={2} dispatchFunc={ setNoiseFreqMult } />
			<InputSlider sliderName='振幅衰减' minVal={0.1} maxVal={1} defaultInputValue={noiseProps.noiseDecay} resetValue={0.6} dispatchFunc={ setNoiseDecay } />
			<InputSlider sliderName='抖动幅度' minVal={0} maxVal={1.5} defaultInputValue={noiseProps.noiseJitter} resetValue={1} dispatchFunc={ setNoiseJitter } />
			<InputSlider sliderName='边缘宽度' minVal={0.01} maxVal={0.5} defaultInputValue={noiseProps.noiseEdge} resetValue={0.2} dispatchFunc={ setNoiseEdge } />
			<InputSlider sliderName='细节缩放' minVal={0} maxVal={2} defaultInputValue={noiseProps.noiseDetailScale} resetValue={0.5} dispatchFunc={ setNoiseDetailScale } />
			<InputSlider sliderName='脉冲强度' minVal={0} maxVal={1} defaultInputValue={noiseProps.noisePulse} resetValue={0.5} dispatchFunc={ setNoisePulse } />
			<InputSlider sliderName='辉光强度' minVal={0.5} maxVal={4} defaultInputValue={noiseProps.noisePower} resetValue={2} dispatchFunc={ setNoisePower } />
			<InputSlider sliderName='环境亮度' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseBoost} resetValue={0.1} dispatchFunc={ setNoiseBoost } />
			<InputSlider sliderName='红色指数' minVal={0.5} maxVal={16} defaultInputValue={noiseProps.noiseColorR} resetValue={8} dispatchFunc={ setNoiseColorR } />
			<InputSlider sliderName='绿色指数' minVal={0.5} maxVal={16} defaultInputValue={noiseProps.noiseColorG} resetValue={3} dispatchFunc={ setNoiseColorG } />
			<InputSlider sliderName='蓝色指数' minVal={0.5} maxVal={16} defaultInputValue={noiseProps.noiseColorB} resetValue={2} dispatchFunc={ setNoiseColorB } />
			<InputSlider sliderName='输出增益' minVal={0.1} maxVal={5} defaultInputValue={noiseProps.noiseGain} resetValue={2} dispatchFunc={ setNoiseGain } />
			<InputCheck checkName='黑白模式' checkDefaultIn={noiseProps.noiseRemoveCol} dispatchFunc={ setNoiseRemoveCol } />
		</div>
	)
}
