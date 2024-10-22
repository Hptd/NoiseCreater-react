import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputColor from "../InputColor"
import InputCheck from "../InputCheck"
import { setNoiseOnlyBright, setNoiseElementScale, setNoiseDetail, setNoiseAlphaScale, setNoiseColor, setNoiseRemoveCol} from '../../features/GlareWaterNoiseParamsSlice'

export default function TileableWaterNoise() {
	const noiseProps = useSelector(state => state.glareWaterNoiseProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='噪波亮度' minVal={-1} maxVal={1} defaultInputValue={noiseProps.noiseOnlyBright} resetValue={0} dispatchFunc={ setNoiseOnlyBright } />
			<InputSlider sliderName='噪波元素大小' minVal={0.3} maxVal={3.5} defaultInputValue={noiseProps.noiseElementScale} resetValue={1.5} dispatchFunc={ setNoiseElementScale } />
			<InputSlider sliderName='多层噪波细节' minVal={1} maxVal={20} defaultInputValue={noiseProps.noiseDetail} resetValue={4} dispatchFunc={ setNoiseDetail } />
			<InputSlider sliderName='噪波透明度' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseAlphaScale} resetValue={1} dispatchFunc={ setNoiseAlphaScale } />
      <InputColor colorName='噪波颜色' defaultColorIn={noiseProps.noiseColor} resetColor='#41d8ec' dispatchFunc={ setNoiseColor } />
      <InputCheck checkName='黑白模式' checkDefaultIn={noiseProps.noiseRemoveCol} dispatchFunc={ setNoiseRemoveCol } />
    </div>
	)
}