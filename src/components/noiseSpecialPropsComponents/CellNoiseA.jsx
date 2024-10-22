import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import { setNoiseWhiteIntensity } from "../../features/CellNoiseAParamsSlice"

export default function CellNoiseA() {
	const noiseProps = useSelector(state => state.cellNoiseAProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='白色比例大小' minVal={0.1} maxVal={5} defaultInputValue={noiseProps.noiseWhiteIntensity } resetValue={1} dispatchFunc={ setNoiseWhiteIntensity } />
		</div>
	)
}