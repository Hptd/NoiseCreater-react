import { useSelector } from "react-redux"
import InputLabel from "../InputLabel"
import InputSlider from "../InputSlider"
import { setNoiseOnlyBright,
  setNoiseOnlyContrast,
  setNoiseSubdivide,
  setNoiseCellScale,
  setNoiseWhiteScale } from '../../features/VoronoiWaterNoiseParamsSlice'

export default function VoronoiWaterNoise() {
	const noiseProps = useSelector(state => state.voronoiWaterNoiseProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='噪波亮度' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseOnlyBright} resetValue={0} dispatchFunc={ setNoiseOnlyBright } />
			<InputSlider sliderName='噪波对比度' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseOnlyContrast} resetValue={0.4} dispatchFunc={ setNoiseOnlyContrast } />
			<InputLabel labelName='噪波细分程度' placeholder='默认值：3' defaultInputValue={noiseProps.noiseSubdivide} resetValue={3} dispatchFunc={ setNoiseSubdivide } />
			<InputSlider sliderName='单细胞密集度' minVal={0} maxVal={4} defaultInputValue={noiseProps.noiseCellScale} resetValue={2} dispatchFunc={ setNoiseCellScale } />
			<InputSlider sliderName='纯白侵略度' minVal={0} maxVal={8} defaultInputValue={noiseProps.noiseWhiteScale} resetValue={0.5} dispatchFunc={ setNoiseWhiteScale } />
		</div>
	)
}