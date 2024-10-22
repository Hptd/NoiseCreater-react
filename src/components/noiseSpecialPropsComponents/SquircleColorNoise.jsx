import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputCheck from "../InputCheck"
import { setNoiseOnlyBright, setNoiseSaturate, setNoiseHue, setNoiseRemoveCol} from '../../features/SquircleColorNoiseParamsSlice'

export default function SquircleColorNoise() {
	const noiseProps = useSelector(state => state.squircleColorNoiseProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='色相' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseHue} resetValue={0} dispatchFunc={ setNoiseHue } />
			<InputSlider sliderName='饱和度' minVal={0} maxVal={1.5} defaultInputValue={noiseProps.noiseSaturate} resetValue={1} dispatchFunc={ setNoiseSaturate } />
			<InputSlider sliderName='亮度' minVal={-1} maxVal={1} defaultInputValue={noiseProps.noiseOnlyBright} resetValue={0} dispatchFunc={ setNoiseOnlyBright } />
      <InputCheck checkName='黑白模式' checkDefaultIn={noiseProps.noiseRemoveCol} dispatchFunc={ setNoiseRemoveCol } />
    </div>
	)
}