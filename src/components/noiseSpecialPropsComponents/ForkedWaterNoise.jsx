import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputColor from "../InputColor"
import InputCheck from "../InputCheck"
import { setNoiseOnlyBright, setNoiseOnlyContrast, setNoiseColor, setBackgroundColor, setNoiseRemoveCol} from '../../features/ForkedWaterNoiseParamsSlice'

export default function ForkedWaterNoise() {
	const noiseProps = useSelector(state => state.forkedWaterNoiseProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='噪波亮度' minVal={-0.5} maxVal={3.5} defaultInputValue={noiseProps.noiseOnlyBright} resetValue={2.5} dispatchFunc={ setNoiseOnlyBright } />
			<InputSlider sliderName='噪波对比度' minVal={0.5} maxVal={4} defaultInputValue={noiseProps.noiseOnlyContrast} resetValue={2.5} dispatchFunc={ setNoiseOnlyContrast } />
      <InputColor colorName='噪波颜色' defaultColorIn={noiseProps.noiseColor} resetColor='#56a2d2' dispatchFunc={ setNoiseColor } />
      <InputColor colorName='背景颜色' defaultColorIn={noiseProps.noiseBackgroundColor} resetColor='#000000' dispatchFunc={ setBackgroundColor } />
      <InputCheck checkName='黑白模式' checkDefaultIn={noiseProps.noiseRemoveCol} dispatchFunc={ setNoiseRemoveCol } />
		</div>
	)
}