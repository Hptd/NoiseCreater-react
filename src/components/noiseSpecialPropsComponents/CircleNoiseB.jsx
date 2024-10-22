import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputCheck from "../InputCheck"
import InputColor from "../InputColor"
import { setNoiseColor1, setNoiseColor2, setNoiseOnlyBright, setNoiseSaturate, setNoiseHue, setNoiseRemoveCol } from '../../features/CircleNoiseBParamsSlice'

export default function CircleNoiseB() {
	const noiseProps = useSelector(state => state.circleNoiseBProps)

	return (
    <div className="params-container">
			<InputColor colorName='背景颜色-1' defaultColorIn={noiseProps.noiseColor1} resetColor='#4C0F4C' dispatchFunc={ setNoiseColor1 } />
			<InputColor colorName='背景颜色-2' defaultColorIn={noiseProps.noiseColor2} resetColor='#1A6680' dispatchFunc={ setNoiseColor2 } />
			<InputSlider sliderName='色相' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseHue} resetValue={0} dispatchFunc={ setNoiseHue } />
			<InputSlider sliderName='饱和度' minVal={0} maxVal={1.5} defaultInputValue={noiseProps.noiseSaturate} resetValue={1} dispatchFunc={ setNoiseSaturate } />
			<InputSlider sliderName='亮度' minVal={0} maxVal={2} defaultInputValue={noiseProps.noiseOnlyBright} resetValue={1} dispatchFunc={ setNoiseOnlyBright } />
      <InputCheck checkName='黑白模式' checkDefaultIn={noiseProps.noiseRemoveCol} dispatchFunc={ setNoiseRemoveCol } />
    </div>
	)
}