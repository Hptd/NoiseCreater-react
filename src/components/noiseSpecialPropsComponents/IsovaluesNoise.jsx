import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputCheck from "../InputCheck"
import { setNoiseLineSize, setNoiseSharkX, setNoiseSharkY, setNoiseSpeed, setNoiseRemoveCol } from '../../features/IsovaluesNoiseParamsSlice'

export default function IsovaluesNoise() {
	const noiseProps = useSelector(state => state.isovaluesNoiseProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='线条细节粗细' minVal={1} maxVal={512} defaultInputValue={noiseProps.noiseLineSize} resetValue={260} dispatchFunc={ setNoiseLineSize } />
			<InputSlider sliderName='颜色过渡边界软硬度' minVal={0.1} maxVal={50} defaultInputValue={noiseProps.noiseSharkX} resetValue={20} dispatchFunc={ setNoiseSharkX } />
			<InputSlider sliderName='颜色抽象层数' minVal={0} maxVal={40} defaultInputValue={noiseProps.noiseSharkY} resetValue={20} dispatchFunc={ setNoiseSharkY } />
			<InputSlider sliderName='整体变化速度' minVal={0} maxVal={1.5} defaultInputValue={noiseProps.noiseSpeed} resetValue={0.1} dispatchFunc={ setNoiseSpeed } />
      <InputCheck checkName='黑白模式' checkDefaultIn={noiseProps.noiseRemoveCol} dispatchFunc={ setNoiseRemoveCol } />
    </div>
	)
}