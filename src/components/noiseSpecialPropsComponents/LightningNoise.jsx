import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputColor from "../InputColor"
import InputCheck from "../InputCheck"
import { setNoiseSeed, setNoiseSteady, setNoiseStrikePeriod, setNoiseDecay, setNoiseBranchAmount, setNoiseBranchLength, setNoiseDistortion, setNoiseNoiseScale, setNoiseDoReveal, setNoiseCoreColor, setNoiseSheathColor, setNoiseGlowColor, setNoiseRemoveCol } from '../../features/LightningNoiseParamsSlice'

export default function LightningNoise() {
	const noiseProps = useSelector(state => state.lightningNoiseProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='随机种子' minVal={0} maxVal={1000} defaultInputValue={noiseProps.noiseSeed} resetValue={0} dispatchFunc={ setNoiseSeed } />
			<InputCheck checkName='常亮模式' checkDefaultIn={noiseProps.noiseSteady} dispatchFunc={ setNoiseSteady } />
			<InputSlider sliderName='闪电间隔' minVal={0.3} maxVal={5} defaultInputValue={noiseProps.noiseStrikePeriod} resetValue={1.4} dispatchFunc={ setNoiseStrikePeriod } />
			<InputSlider sliderName='衰减速度' minVal={1} maxVal={15} defaultInputValue={noiseProps.noiseDecay} resetValue={5} dispatchFunc={ setNoiseDecay } />
			<InputSlider sliderName='分支数量' minVal={0} maxVal={10} defaultInputValue={noiseProps.noiseBranchAmount} resetValue={3} dispatchFunc={ setNoiseBranchAmount } />
			<InputSlider sliderName='分支长度' minVal={0} maxVal={3} defaultInputValue={noiseProps.noiseBranchLength} resetValue={1.4} dispatchFunc={ setNoiseBranchLength } />
			<InputSlider sliderName='扭曲强度' minVal={0} maxVal={0.3} defaultInputValue={noiseProps.noiseDistortion} resetValue={0.06} dispatchFunc={ setNoiseDistortion } />
			<InputSlider sliderName='扭曲噪波缩放' minVal={1} maxVal={64} defaultInputValue={noiseProps.noiseNoiseScale} resetValue={16} dispatchFunc={ setNoiseNoiseScale } />
			<InputCheck checkName='充能揭示动画' checkDefaultIn={noiseProps.noiseDoReveal} dispatchFunc={ setNoiseDoReveal } />
			<InputColor colorName='核心颜色' defaultColorIn={noiseProps.noiseCoreColor} resetColor='#ffffff' dispatchFunc={ setNoiseCoreColor } />
			<InputColor colorName='电晕颜色' defaultColorIn={noiseProps.noiseSheathColor} resetColor='#a6d9ff' dispatchFunc={ setNoiseSheathColor } />
			<InputColor colorName='辉光颜色' defaultColorIn={noiseProps.noiseGlowColor} resetColor='#6666f2' dispatchFunc={ setNoiseGlowColor } />
			<InputCheck checkName='黑白模式' checkDefaultIn={noiseProps.noiseRemoveCol} dispatchFunc={ setNoiseRemoveCol } />
		</div>
	)
}
