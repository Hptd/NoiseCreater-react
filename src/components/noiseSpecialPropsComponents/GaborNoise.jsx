import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputLabel from "../InputLabel"
import InputCheck from "../InputCheck"
import { setNoiseChooseValue, setNoiseSpeed, setNoiseDirX, setNoiseDirY, setNoiseLightX, setNoiseLightY, setNoiseLightZ, setNoiseRemoveCol } from '../../features/GaborNoiseParamsSlice'

export default function GaborNoise() {
	const noiseProps = useSelector(state => state.gaborNoiseProps)

	return (
		<div className="params-container">
			<InputLabel labelName='图案模式(0~3)' placeholder='0或1或2或3' defaultInputValue={noiseProps.noiseChooseValue} resetValue={3} dispatchFunc={setNoiseChooseValue} />
			<InputSlider sliderName='动画速度' minVal={0} maxVal={5} defaultInputValue={noiseProps.noiseSpeed} resetValue={1} dispatchFunc={setNoiseSpeed} />
			<InputSlider sliderName='方向X' minVal={-1} maxVal={1} defaultInputValue={noiseProps.noiseDirX} resetValue={0.7} dispatchFunc={setNoiseDirX} />
			<InputSlider sliderName='方向Y' minVal={-1} maxVal={1} defaultInputValue={noiseProps.noiseDirY} resetValue={0.8} dispatchFunc={setNoiseDirY} />
			<InputSlider sliderName='光照X' minVal={-5} maxVal={5} defaultInputValue={noiseProps.noiseLightX} resetValue={3} dispatchFunc={setNoiseLightX} />
			<InputSlider sliderName='光照Y' minVal={-5} maxVal={5} defaultInputValue={noiseProps.noiseLightY} resetValue={2} dispatchFunc={setNoiseLightY} />
			<InputSlider sliderName='光照Z' minVal={-5} maxVal={5} defaultInputValue={noiseProps.noiseLightZ} resetValue={-1} dispatchFunc={setNoiseLightZ} />
			<InputCheck checkName='黑白模式' checkDefaultIn={noiseProps.noiseRemoveCol} dispatchFunc={setNoiseRemoveCol} />
		</div>
	)
}
