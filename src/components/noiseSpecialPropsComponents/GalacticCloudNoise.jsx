import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import { setNoiseScales, setNoiseZoomDistance, setNoiseSpeed, setNoiseFirstDivision, setNoiseFRatio, setNoiseLimitDetails, setNoiseSmoothZone, setNoiseClampLevel, setNoiseTheta, setNoiseRotSpeed, setNoiseCenterX, setNoiseCenterY, setNoiseSeed, setNoiseGazConcentration } from '../../features/GalacticCloudNoiseParamsSlice'

export default function GalacticCloudNoise() {
	const noiseProps = useSelector(state => state.galacticCloudNoiseProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='缩放层数' minVal={1} maxVal={32} defaultInputValue={noiseProps.noiseScales} resetValue={22} dispatchFunc={setNoiseScales} />
			<InputSlider sliderName='缩放幅度' minVal={0} maxVal={20} defaultInputValue={noiseProps.noiseZoomDistance} resetValue={10} dispatchFunc={setNoiseZoomDistance} />
			<InputSlider sliderName='动画速度' minVal={0} maxVal={5} defaultInputValue={noiseProps.noiseSpeed} resetValue={1} dispatchFunc={setNoiseSpeed} />
			<InputSlider sliderName='初始网格密度' minVal={0} maxVal={12} defaultInputValue={noiseProps.noiseFirstDivision} resetValue={8} dispatchFunc={setNoiseFirstDivision} />
			<InputSlider sliderName='频率比' minVal={0.3} maxVal={0.8} defaultInputValue={noiseProps.noiseFRatio} resetValue={0.5} dispatchFunc={setNoiseFRatio} />
			<InputSlider sliderName='细节精度' minVal={0.5} maxVal={8} defaultInputValue={noiseProps.noiseLimitDetails} resetValue={2.5} dispatchFunc={setNoiseLimitDetails} />
			<InputSlider sliderName='平滑过渡' minVal={10} maxVal={300} defaultInputValue={noiseProps.noiseSmoothZone} resetValue={100} dispatchFunc={setNoiseSmoothZone} />
			<InputSlider sliderName='颜色钳制' minVal={0.1} maxVal={2} defaultInputValue={noiseProps.noiseClampLevel} resetValue={1} dispatchFunc={setNoiseClampLevel} />
			<InputSlider sliderName='旋转基础角' minVal={-10} maxVal={10} defaultInputValue={noiseProps.noiseTheta} resetValue={4} dispatchFunc={setNoiseTheta} />
			<InputSlider sliderName='旋转速度' minVal={0} maxVal={0.05} defaultInputValue={noiseProps.noiseRotSpeed} resetValue={0.008} dispatchFunc={setNoiseRotSpeed} />
			<InputSlider sliderName='中心X' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseCenterX} resetValue={0.5} dispatchFunc={setNoiseCenterX} />
			<InputSlider sliderName='中心Y' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseCenterY} resetValue={0.5} dispatchFunc={setNoiseCenterY} />
			<InputSlider sliderName='噪声偏移' minVal={0} maxVal={30} defaultInputValue={noiseProps.noiseSeed} resetValue={10.7} dispatchFunc={setNoiseSeed} />
			<InputSlider sliderName='气体凝聚' minVal={0} maxVal={4} defaultInputValue={noiseProps.noiseGazConcentration} resetValue={0} dispatchFunc={setNoiseGazConcentration} />
		</div>
	)
}
