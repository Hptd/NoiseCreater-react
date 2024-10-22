import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputColor from "../InputColor"
import InputCheck from "../InputCheck"
import { setNoiseOnlyBright, setNoiseLightScale, setNoiseSpacing, setNoiseColor, setNoiseRemoveCol} from '../../features/TileableWaterNoiseParamsSlice'

export default function TileableWaterNoise() {
	const noiseProps = useSelector(state => state.tileableWaterNoiseProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='噪波亮度' minVal={0} maxVal={2} defaultInputValue={noiseProps.noiseOnlyBright} resetValue={1} dispatchFunc={ setNoiseOnlyBright } />
			<InputSlider sliderName='光晕大小' minVal={0.002} maxVal={0.03} defaultInputValue={noiseProps.noiseLightScale} resetValue={0.005} dispatchFunc={ setNoiseLightScale } />
			<InputSlider sliderName='噪波疏密度' minVal={1} maxVal={20} defaultInputValue={noiseProps.noiseSpacing} resetValue={4} dispatchFunc={ setNoiseSpacing } />
      <InputColor colorName='背景颜色' defaultColorIn={noiseProps.noiseColor} resetColor='#005980' dispatchFunc={ setNoiseColor } />
      <InputCheck checkName='黑白模式' checkDefaultIn={noiseProps.noiseRemoveCol} dispatchFunc={ setNoiseRemoveCol } />
    </div>
	)
}