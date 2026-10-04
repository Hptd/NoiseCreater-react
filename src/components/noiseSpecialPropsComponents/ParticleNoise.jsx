import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputColor from "../InputColor"
import InputCheck from "../InputCheck"
import { setNoiseParticleIterations, setNoiseScale, setNoiseSpeed, setNoiseDisplaceFreq, setNoiseDisplaceStrength, setNoiseParticleRadius, setNoiseParticleRadius2, setNoiseParticleSizeVar, setNoiseRandomSize, setNoiseParticleColor, setNoiseParticleBright, setNoiseGlowThreshold, setNoiseGlowPower, setNoiseBlurStrength, setNoiseBlurRange, setNoiseRemoveCol } from '../../features/ParticleNoiseParamsSlice'

export default function ParticleNoise() {
	const noiseProps = useSelector(state => state.particleNoiseProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='迭代次数' minVal={1} maxVal={16} defaultInputValue={noiseProps.noiseParticleIterations} resetValue={6} dispatchFunc={ setNoiseParticleIterations } />
			<InputSlider sliderName='粒子密度' minVal={10} maxVal={200} defaultInputValue={noiseProps.noiseScale} resetValue={70} dispatchFunc={ setNoiseScale } />
			<InputSlider sliderName='流动速度' minVal={0} maxVal={2} defaultInputValue={noiseProps.noiseSpeed} resetValue={0.3} dispatchFunc={ setNoiseSpeed } />
			<InputSlider sliderName='扰动频率' minVal={0} maxVal={0.5} defaultInputValue={noiseProps.noiseDisplaceFreq} resetValue={0.07} dispatchFunc={ setNoiseDisplaceFreq } />
			<InputSlider sliderName='扰动强度' minVal={0} maxVal={10} defaultInputValue={noiseProps.noiseDisplaceStrength} resetValue={3} dispatchFunc={ setNoiseDisplaceStrength } />
			<InputSlider sliderName='粒子半径' minVal={0.01} maxVal={0.5} defaultInputValue={noiseProps.noiseParticleRadius} resetValue={0.15} dispatchFunc={ setNoiseParticleRadius } />
			<InputSlider sliderName='粒子外缘' minVal={0.05} maxVal={1.0} defaultInputValue={noiseProps.noiseParticleRadius2} resetValue={0.3} dispatchFunc={ setNoiseParticleRadius2 } />
			<InputSlider sliderName='尺寸随机度' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseParticleSizeVar} resetValue={0.2} dispatchFunc={ setNoiseParticleSizeVar } />
			<InputCheck checkName='随机粒子大小' checkDefaultIn={noiseProps.noiseRandomSize} dispatchFunc={ setNoiseRandomSize } />
			<InputColor colorName='粒子颜色' defaultColorIn={noiseProps.noiseParticleColor} resetColor='#4de6e6' dispatchFunc={ setNoiseParticleColor } />
			<InputSlider sliderName='粒子亮度' minVal={0} maxVal={2} defaultInputValue={noiseProps.noiseParticleBright} resetValue={0.45} dispatchFunc={ setNoiseParticleBright } />
			<InputSlider sliderName='辉光半径' minVal={0.01} maxVal={1} defaultInputValue={noiseProps.noiseGlowThreshold} resetValue={0.3} dispatchFunc={ setNoiseGlowThreshold } />
			<InputSlider sliderName='辉光锐度' minVal={1} maxVal={16} defaultInputValue={noiseProps.noiseGlowPower} resetValue={4} dispatchFunc={ setNoiseGlowPower } />
			<InputSlider sliderName='边缘模糊强度' minVal={0} maxVal={3} defaultInputValue={noiseProps.noiseBlurStrength} resetValue={1.0} dispatchFunc={ setNoiseBlurStrength } />
			<InputSlider sliderName='模糊衰减' minVal={0.5} maxVal={8} defaultInputValue={noiseProps.noiseBlurRange} resetValue={2.5} dispatchFunc={ setNoiseBlurRange } />
			<InputCheck checkName='黑白模式' checkDefaultIn={noiseProps.noiseRemoveCol} dispatchFunc={ setNoiseRemoveCol } />
		</div>
	)
}
