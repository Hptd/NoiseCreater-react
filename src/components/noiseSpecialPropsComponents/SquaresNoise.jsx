import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputColor from "../InputColor"
import InputCheck from "../InputCheck"
import { setNoiseGridSize, setNoiseSquareSize, setNoiseSizeAmplitude, setNoiseSpeed, setNoiseJitter, setNoiseWallThickness, setNoiseTimeScale, setNoiseBgColor, setNoiseColorScale, setNoiseColorBright, setNoiseJitter2, setNoiseRemoveCol } from '../../features/SquaresNoiseParamsSlice'

export default function SquaresNoise() {
	const noiseProps = useSelector(state => state.squaresNoiseProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='网格密度' minVal={1} maxVal={50} defaultInputValue={noiseProps.noiseGridSize} resetValue={20} dispatchFunc={ setNoiseGridSize } />
			<InputSlider sliderName='方块尺寸' minVal={0.05} maxVal={0.48} defaultInputValue={noiseProps.noiseSquareSize} resetValue={0.3} dispatchFunc={ setNoiseSquareSize } />
			<InputSlider sliderName='尺寸动画幅度' minVal={0} maxVal={0.4} defaultInputValue={noiseProps.noiseSizeAmplitude} resetValue={0.1} dispatchFunc={ setNoiseSizeAmplitude } />
			<InputSlider sliderName='动画速度' minVal={0} maxVal={2} defaultInputValue={noiseProps.noiseSpeed} resetValue={0.4} dispatchFunc={ setNoiseSpeed } />
			<InputSlider sliderName='纵向抖动幅度' minVal={0} maxVal={10} defaultInputValue={noiseProps.noiseJitter} resetValue={5} dispatchFunc={ setNoiseJitter } />
			<InputSlider sliderName='格线粗细' minVal={0} maxVal={0.25} defaultInputValue={noiseProps.noiseWallThickness} resetValue={0.07} dispatchFunc={ setNoiseWallThickness } />
			<InputSlider sliderName='时间倍率' minVal={0} maxVal={20} defaultInputValue={noiseProps.noiseTimeScale} resetValue={10} dispatchFunc={ setNoiseTimeScale } />
			<InputSlider sliderName='方块颜色饱和度' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseColorScale} resetValue={0.5} dispatchFunc={ setNoiseColorScale } />
			<InputSlider sliderName='方块颜色亮度' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseColorBright} resetValue={0.5} dispatchFunc={ setNoiseColorBright } />
			<InputSlider sliderName='纵向次级偏移强度' minVal={0} maxVal={5} defaultInputValue={noiseProps.noiseJitter2} resetValue={1} dispatchFunc={ setNoiseJitter2 } />
			<InputColor colorName='背景颜色' defaultColorIn={noiseProps.noiseBgColor} resetColor='#b3e6cc' dispatchFunc={ setNoiseBgColor } />
			<InputCheck checkName='黑白模式' checkDefaultIn={noiseProps.noiseRemoveCol} dispatchFunc={ setNoiseRemoveCol } />
		</div>
	)
}