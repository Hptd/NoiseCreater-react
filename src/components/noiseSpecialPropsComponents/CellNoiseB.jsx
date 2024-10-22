import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import { setNoiseWhiteIntensity } from "../../features/CellNoiseBParamsSlice"

export default function CellNoiseB() {
	const noiseProps = useSelector(state => state.cellNoiseBProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='白色比例大小' minVal={0} maxVal={20} defaultInputValue={noiseProps.noiseWhiteIntensity } resetValue={1.5} dispatchFunc={ setNoiseWhiteIntensity } />
		</div>
	)
}