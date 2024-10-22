import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import { setNoiseBroken, setNoiseDelicate } from "../../features/CellNoiseCParamsSlice"

export default function CellNoiseC() {
	const noiseProps = useSelector(state => state.cellNoiseCProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='细胞密度' minVal={2} maxVal={100} defaultInputValue={noiseProps.noiseDelicate } resetValue={40} dispatchFunc={ setNoiseDelicate } />
			<InputSlider sliderName='离散程度' minVal={1} maxVal={10} defaultInputValue={noiseProps.noiseBroken } resetValue={1} dispatchFunc={ setNoiseBroken } />
		</div>
	)
}