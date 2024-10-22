import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import { setNoiseOnlyBright, setNoiseDelicate, setNoiseBroken, setNoiseDetail, setNoiseSilkSize, setNoiseSilkContrast} from '../../features/SilkNoiseParamsSlice'

export default function SilkNoise() {
	const noiseProps = useSelector(state => state.silkNoiseProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='亮度' minVal={0.2} maxVal={10} defaultInputValue={noiseProps.noiseOnlyBright} resetValue={1} dispatchFunc={ setNoiseOnlyBright } />
			<InputSlider sliderName='细腻程度' minVal={1} maxVal={1.5} defaultInputValue={noiseProps.noiseDelicate} resetValue={1.1} dispatchFunc={ setNoiseDelicate } />
			<InputSlider sliderName='破碎程度' minVal={0} maxVal={20} defaultInputValue={noiseProps.noiseBroken} resetValue={8} dispatchFunc={ setNoiseBroken } />
			<InputSlider sliderName='细节层次' minVal={5} maxVal={32} defaultInputValue={noiseProps.noiseDetail} resetValue={16} dispatchFunc={ setNoiseDetail } />
			<InputSlider sliderName='游丝大小调整' minVal={0.3} maxVal={10} defaultInputValue={noiseProps.noiseSilkSize} resetValue={1} dispatchFunc={ setNoiseSilkSize } />
			<InputSlider sliderName='游丝黑白比例' minVal={3} maxVal={40} defaultInputValue={noiseProps.noiseSilkContrast} resetValue={8} dispatchFunc={ setNoiseSilkContrast } />
			</div>
	)
}