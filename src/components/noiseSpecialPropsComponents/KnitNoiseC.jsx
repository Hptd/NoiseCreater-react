import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputColor from "../InputColor"
import InputCheck from "../InputCheck"
import { setNoiseSharkX, setNoiseSharkY, setNoiseHue, setNoiseSaturate, setNoiseColor1, setNoiseColor2, setNoiseRemoveCol } from '../../features/KnitNoiseCParamsSlice'

export default function KnitNoiseC() {
	const noiseProps = useSelector(state => state.knitNoiseCProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='旋转角度' minVal={0.25} maxVal={0.5} defaultInputValue={noiseProps.noiseSharkY} resetValue={0.25} dispatchFunc={ setNoiseSharkY } />
			<InputSlider sliderName='编织带宽度' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseSharkX} resetValue={0.25} dispatchFunc={ setNoiseSharkX } />
			<InputSlider sliderName='编织阴影参数 A' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseHue} resetValue={0.5} dispatchFunc={ setNoiseHue } />
			<InputSlider sliderName='编织阴影参数 B' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseSaturate} resetValue={0.5} dispatchFunc={ setNoiseSaturate } />
			<InputColor colorName='编织色-1' defaultColorIn={noiseProps.noiseColor1} resetColor='#ff0080' dispatchFunc={ setNoiseColor1 } />
			<InputColor colorName='编织色-2' defaultColorIn={noiseProps.noiseColor2} resetColor='#ffcc33' dispatchFunc={ setNoiseColor2 } />
      <InputCheck checkName='黑白模式' checkDefaultIn={noiseProps.noiseRemoveCol} dispatchFunc={ setNoiseRemoveCol } />
    </div>
	)
}