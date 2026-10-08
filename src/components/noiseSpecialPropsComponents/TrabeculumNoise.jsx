import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputColor from "../InputColor"
import InputCheck from "../InputCheck"
import { setNoiseSpeed, setNoiseSteps, setNoiseStepSize, setNoiseScale, setNoiseGrad, setNoiseThreshold, setNoiseFov, setNoiseCamTheta, setNoiseCamPhi, setNoiseSkyColor, setNoiseRemoveCol } from '../../features/TrabeculumNoiseParamsSlice'

export default function TrabeculumNoise() {
	const noiseProps = useSelector(state => state.trabeculumNoiseProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='动画速度' minVal={0} maxVal={3} defaultInputValue={noiseProps.noiseSpeed} resetValue={1} dispatchFunc={ setNoiseSpeed } />
			<InputSlider sliderName='光线步数' minVal={16} maxVal={200} defaultInputValue={noiseProps.noiseSteps} resetValue={64} dispatchFunc={ setNoiseSteps } />
			<InputSlider sliderName='步长' minVal={0.002} maxVal={0.02} defaultInputValue={noiseProps.noiseStepSize} resetValue={0.005} dispatchFunc={ setNoiseStepSize } />
			<InputSlider sliderName='噪声缩放' minVal={1} maxVal={30} defaultInputValue={noiseProps.noiseScale} resetValue={10} dispatchFunc={ setNoiseScale } />
			<InputSlider sliderName='边缘锐度' minVal={0.05} maxVal={2} defaultInputValue={noiseProps.noiseGrad} resetValue={0.8} dispatchFunc={ setNoiseGrad } />
			<InputSlider sliderName='阈值偏移' minVal={-0.5} maxVal={0.5} defaultInputValue={noiseProps.noiseThreshold} resetValue={0} dispatchFunc={ setNoiseThreshold } />
			<InputSlider sliderName='视野' minVal={0.5} maxVal={3} defaultInputValue={noiseProps.noiseFov} resetValue={1.5} dispatchFunc={ setNoiseFov } />
			<InputSlider sliderName='相机水平角' minVal={0} maxVal={6.283} defaultInputValue={noiseProps.noiseCamTheta} resetValue={0} dispatchFunc={ setNoiseCamTheta } />
			<InputSlider sliderName='相机垂直角' minVal={-1.571} maxVal={1.571} defaultInputValue={noiseProps.noiseCamPhi} resetValue={0} dispatchFunc={ setNoiseCamPhi } />
			<InputColor colorName='背景色' defaultColorIn={noiseProps.noiseSkyColor} resetColor='#000000' dispatchFunc={ setNoiseSkyColor } />
			<InputCheck checkName='黑白模式' checkDefaultIn={noiseProps.noiseRemoveCol} dispatchFunc={ setNoiseRemoveCol } />
		</div>
	)
}
