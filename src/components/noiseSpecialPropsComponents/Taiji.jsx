import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import { setNoiseSharkX, setNoiseSharkY, setNoiseSpeed } from '../../features/TaijiParamsSlice'

export default function Taiji() {
	const noiseProps = useSelector(state => state.taijiProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='边界宽度' minVal={0} maxVal={0.2} defaultInputValue={noiseProps.noiseSharkX} resetValue={0.02} dispatchFunc={ setNoiseSharkX } />
			<InputSlider sliderName='阴阳眼大小' minVal={0} maxVal={0.4} defaultInputValue={noiseProps.noiseSharkY} resetValue={0.12} dispatchFunc={ setNoiseSharkY } />
			<InputSlider sliderName='旋转速度' minVal={0} maxVal={3} defaultInputValue={noiseProps.noiseSpeed} resetValue={1} dispatchFunc={ setNoiseSpeed } />
    </div>
	)
}