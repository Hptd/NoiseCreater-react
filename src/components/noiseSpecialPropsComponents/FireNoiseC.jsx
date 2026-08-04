import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputColor from "../InputColor"
import InputCheck from "../InputCheck"
import { setNoiseSpeed, setNoiseRotateSpeed, setNoiseParticleSize, setNoiseLayers, setNoiseSizeMod, setNoiseAlphaMod, setNoiseSmokeIntensity, setNoiseSparkColor, setNoiseSmokeColor, setNoiseRemoveCol } from '../../features/FireNoiseCParamsSlice'

export default function FireNoiseC() {
	const noiseProps = useSelector(state => state.fireNoiseCProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='移动速度' minVal={0} maxVal={5} defaultInputValue={noiseProps.noiseSpeed} resetValue={1} dispatchFunc={ setNoiseSpeed } />
			<InputSlider sliderName='粒子旋转速度' minVal={0} maxVal={5} defaultInputValue={noiseProps.noiseRotateSpeed} resetValue={1.5} dispatchFunc={ setNoiseRotateSpeed } />
			<InputSlider sliderName='粒子大小' minVal={0.001} maxVal={0.05} defaultInputValue={noiseProps.noiseParticleSize} resetValue={0.009} dispatchFunc={ setNoiseParticleSize } />
			<InputSlider sliderName='粒子层数' minVal={1} maxVal={32} defaultInputValue={noiseProps.noiseLayers} resetValue={15} dispatchFunc={ setNoiseLayers } />
			<InputSlider sliderName='层间尺寸缩放' minVal={1} maxVal={2} defaultInputValue={noiseProps.noiseSizeMod} resetValue={1.05} dispatchFunc={ setNoiseSizeMod } />
			<InputSlider sliderName='层间亮度衰减' minVal={0.5} maxVal={1} defaultInputValue={noiseProps.noiseAlphaMod} resetValue={0.9} dispatchFunc={ setNoiseAlphaMod } />
			<InputSlider sliderName='烟雾强度' minVal={0} maxVal={2} defaultInputValue={noiseProps.noiseSmokeIntensity} resetValue={0.8} dispatchFunc={ setNoiseSmokeIntensity } />
			<InputColor colorName='火花颜色' defaultColorIn={noiseProps.noiseSparkColor} resetColor='#ff660d' dispatchFunc={ setNoiseSparkColor } />
			<InputColor colorName='烟雾颜色' defaultColorIn={noiseProps.noiseSmokeColor} resetColor='#ff6e1a' dispatchFunc={ setNoiseSmokeColor } />
			<InputCheck checkName='黑白模式' checkDefaultIn={noiseProps.noiseRemoveCol} dispatchFunc={ setNoiseRemoveCol } />
    </div>
	)
}
