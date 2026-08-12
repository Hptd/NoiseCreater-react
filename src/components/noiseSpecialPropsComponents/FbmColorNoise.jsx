import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputColor from "../InputColor"
import InputCheck from "../InputCheck"
import { setNoiseColor1, setNoiseColor2, setNoiseColor3, setNoiseColor4, setNoiseTimeSpeed, setNoiseScale, setNoiseMixExp1, setNoiseMixExp2, setNoiseGamma, setNoiseLacunarity, setNoiseRoughness, setNoiseLacunarity2, setNoiseRoughness2, setNoiseWarpStrength, setNoiseDomainWarp, setNoiseRemoveCol } from '../../features/FbmColorNoiseParamsSlice'

export default function FbmColorNoise() {
	const noiseProps = useSelector(state => state.fbmColorNoiseProps)

	return (
		<div className="params-container">
			<InputColor colorName='颜色-1' defaultColorIn={noiseProps.noiseColor1} resetColor='#f00508' dispatchFunc={ setNoiseColor1 } />
			<InputColor colorName='颜色-2' defaultColorIn={noiseProps.noiseColor2} resetColor='#0a0a38' dispatchFunc={ setNoiseColor2 } />
			<InputColor colorName='颜色-3' defaultColorIn={noiseProps.noiseColor3} resetColor='#ffccff' dispatchFunc={ setNoiseColor3 } />
			<InputColor colorName='颜色-4' defaultColorIn={noiseProps.noiseColor4} resetColor='#336680' dispatchFunc={ setNoiseColor4 } />
			<InputSlider sliderName='时间速度' minVal={0} maxVal={0.5} defaultInputValue={noiseProps.noiseTimeSpeed} resetValue={0.1} dispatchFunc={ setNoiseTimeSpeed } />
			<InputSlider sliderName='缩放' minVal={0.5} maxVal={10} defaultInputValue={noiseProps.noiseScale} resetValue={3.5} dispatchFunc={ setNoiseScale } />
			<InputSlider sliderName='混合指数1' minVal={0.5} maxVal={8} defaultInputValue={noiseProps.noiseMixExp1} resetValue={4} dispatchFunc={ setNoiseMixExp1 } />
			<InputSlider sliderName='混合指数2' minVal={0.5} maxVal={8} defaultInputValue={noiseProps.noiseMixExp2} resetValue={1.4} dispatchFunc={ setNoiseMixExp2 } />
			<InputSlider sliderName='伽马' minVal={0.5} maxVal={4} defaultInputValue={noiseProps.noiseGamma} resetValue={2} dispatchFunc={ setNoiseGamma } />
			<InputSlider sliderName='频率倍率' minVal={1} maxVal={4} defaultInputValue={noiseProps.noiseLacunarity} resetValue={2} dispatchFunc={ setNoiseLacunarity } />
			<InputSlider sliderName='振幅粗糙度' minVal={0.1} maxVal={1} defaultInputValue={noiseProps.noiseRoughness} resetValue={0.33} dispatchFunc={ setNoiseRoughness } />
			<InputSlider sliderName='频率倍率2' minVal={1} maxVal={4} defaultInputValue={noiseProps.noiseLacunarity2} resetValue={3} dispatchFunc={ setNoiseLacunarity2 } />
			<InputSlider sliderName='振幅粗糙度2' minVal={0.1} maxVal={1} defaultInputValue={noiseProps.noiseRoughness2} resetValue={0.5} dispatchFunc={ setNoiseRoughness2 } />
			<InputSlider sliderName='形变强度' minVal={0} maxVal={3} defaultInputValue={noiseProps.noiseWarpStrength} resetValue={1} dispatchFunc={ setNoiseWarpStrength } />
			<InputSlider sliderName='域扭曲' minVal={0} maxVal={0.05} defaultInputValue={noiseProps.noiseDomainWarp} resetValue={0.006} dispatchFunc={ setNoiseDomainWarp } />
			<InputCheck checkName='黑白模式' checkDefaultIn={noiseProps.noiseRemoveCol} dispatchFunc={ setNoiseRemoveCol } />
		</div>
	)
}
