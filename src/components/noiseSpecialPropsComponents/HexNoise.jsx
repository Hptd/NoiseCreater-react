import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import { setNoiseDensity, setNoiseEdgeWidth, setNoiseEdgeSoft } from '../../features/HexNoiseParamsSlice'

export default function HexNoise() {
	const noiseProps = useSelector(state => state.hexNoiseProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='网格密度' minVal={2} maxVal={40} defaultInputValue={noiseProps.noiseDensity} resetValue={10} dispatchFunc={ setNoiseDensity } />
			<InputSlider sliderName='边缘宽度' minVal={0} maxVal={0.2} defaultInputValue={noiseProps.noiseEdgeWidth} resetValue={0.04} dispatchFunc={ setNoiseEdgeWidth } />
			<InputSlider sliderName='边缘虚化(0=硬边)' minVal={0} maxVal={0.1} defaultInputValue={noiseProps.noiseEdgeSoft} resetValue={0.02} dispatchFunc={ setNoiseEdgeSoft } />
		</div>
	)
}