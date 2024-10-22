import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputColor from "../InputColor"
import InputCheck from "../InputCheck"
import { setNoiseOnlyBright, setNoiseColor, setBackgroundColor, setNoiseRemoveCol} from '../../features/CausticsWaterNoiseParamsSlice'

export default function TileableWaterNoise() {
	const noiseProps = useSelector(state => state.causticsWaterNoiseProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='噪波亮度' minVal={0} maxVal={2} defaultInputValue={noiseProps.noiseOnlyBright} resetValue={1} dispatchFunc={ setNoiseOnlyBright } />
      <InputColor colorName='噪波颜色' defaultColorIn={noiseProps.noiseColor} resetColor='#56a2d2' dispatchFunc={ setNoiseColor } />
      <InputColor colorName='背景颜色' defaultColorIn={noiseProps.noiseBackgroundColor} resetColor='#000000' dispatchFunc={ setBackgroundColor } />
      <InputCheck checkName='黑白模式' checkDefaultIn={noiseProps.noiseRemoveCol} dispatchFunc={ setNoiseRemoveCol } />
    </div>
	)
}