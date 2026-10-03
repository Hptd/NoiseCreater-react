import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputColor from "../InputColor"
import InputCheck from "../InputCheck"
import { setNoiseSpeed, setNoiseHeight, setNoiseIterations, setNoiseMaxDist, setNoiseEpsilon, setNoiseFov, setNoiseCamHeight, setNoiseSunSize, setNoiseSunColor, setNoiseSkyColor, setNoiseHazeColor, setNoiseSurfaceColor, setNoiseGlowColor, setNoiseFogDensity, setNoiseWaveAmp, setNoiseWaveFreq, setNoiseRemoveCol } from '../../features/SynthwaveNoiseParamsSlice'

export default function SynthwaveNoise() {
	const noiseProps = useSelector(state => state.synthwaveNoiseProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='前进速度' minVal={0} maxVal={40} defaultInputValue={noiseProps.noiseSpeed} resetValue={10} dispatchFunc={ setNoiseSpeed } />
			<InputSlider sliderName='地形起伏' minVal={0} maxVal={8} defaultInputValue={noiseProps.noiseHeight} resetValue={2} dispatchFunc={ setNoiseHeight } />
			<InputSlider sliderName='光线迭代' minVal={10} maxVal={500} defaultInputValue={noiseProps.noiseIterations} resetValue={100} dispatchFunc={ setNoiseIterations } />
			<InputSlider sliderName='最远距离' minVal={50} maxVal={300} defaultInputValue={noiseProps.noiseMaxDist} resetValue={150} dispatchFunc={ setNoiseMaxDist } />
			<InputSlider sliderName='表面精度' minVal={0.0005} maxVal={0.01} defaultInputValue={noiseProps.noiseEpsilon} resetValue={0.003} dispatchFunc={ setNoiseEpsilon } />
			<InputSlider sliderName='视野' minVal={0.5} maxVal={3} defaultInputValue={noiseProps.noiseFov} resetValue={1.3333} dispatchFunc={ setNoiseFov } />
			<InputSlider sliderName='相机高度' minVal={0} maxVal={3} defaultInputValue={noiseProps.noiseCamHeight} resetValue={1} dispatchFunc={ setNoiseCamHeight } />
			<InputSlider sliderName='太阳大小' minVal={0.02} maxVal={1} defaultInputValue={noiseProps.noiseSunSize} resetValue={0.2} dispatchFunc={ setNoiseSunSize } />
			<InputSlider sliderName='雾气浓度' minVal={0.1} maxVal={5} defaultInputValue={noiseProps.noiseFogDensity} resetValue={1} dispatchFunc={ setNoiseFogDensity } />
			<InputSlider sliderName='波形幅度' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseWaveAmp} resetValue={0.4} dispatchFunc={ setNoiseWaveAmp } />
			<InputSlider sliderName='波形频率' minVal={0} maxVal={0.2} defaultInputValue={noiseProps.noiseWaveFreq} resetValue={0.02} dispatchFunc={ setNoiseWaveFreq } />
			<InputColor colorName='太阳颜色' defaultColorIn={noiseProps.noiseSunColor} resetColor='#bf994d' dispatchFunc={ setNoiseSunColor } />
			<InputColor colorName='天空颜色' defaultColorIn={noiseProps.noiseSkyColor} resetColor='#661ab3' dispatchFunc={ setNoiseSkyColor } />
			<InputColor colorName='雾霾颜色' defaultColorIn={noiseProps.noiseHazeColor} resetColor='#b31966' dispatchFunc={ setNoiseHazeColor } />
			<InputColor colorName='地表颜色' defaultColorIn={noiseProps.noiseSurfaceColor} resetColor='#1a1c2e' dispatchFunc={ setNoiseSurfaceColor } />
			<InputColor colorName='地形辉光' defaultColorIn={noiseProps.noiseGlowColor} resetColor='#cc1aeb' dispatchFunc={ setNoiseGlowColor } />
			<InputCheck checkName='黑白模式' checkDefaultIn={noiseProps.noiseRemoveCol} dispatchFunc={ setNoiseRemoveCol } />
		</div>
	)
}
