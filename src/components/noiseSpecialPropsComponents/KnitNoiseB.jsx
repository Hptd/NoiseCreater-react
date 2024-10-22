import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputColor from "../InputColor"
import InputCheck from "../InputCheck"
import { setNoiseSharkX, setNoiseSharkY, setNoiseHue, setNoiseSaturate, setNoiseColor1, setNoiseColor2, setNoiseColor3, setNoiseRemoveCol } from '../../features/KnitNoiseBParamsSlice'

export default function KnitNoiseB() {
	const noiseProps = useSelector(state => state.knitNoiseBProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='边缘调整参数 A' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseSharkX} resetValue={0.45} dispatchFunc={ setNoiseSharkX } />
			<InputSlider sliderName='边缘调整参数 B' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseSharkY} resetValue={0.2} dispatchFunc={ setNoiseSharkY } />
			<InputSlider sliderName='边缘调整参数 C' minVal={0.01} maxVal={1} defaultInputValue={noiseProps.noiseHue} resetValue={0.15} dispatchFunc={ setNoiseHue } />
			<InputSlider sliderName='编织样式' minVal={1} maxVal={10} defaultInputValue={noiseProps.noiseSaturate} resetValue={2} dispatchFunc={ setNoiseSaturate } />
			<InputColor colorName='背景颜色' defaultColorIn={noiseProps.noiseColor1} resetColor='#ffffff' dispatchFunc={ setNoiseColor1 } />
			<InputColor colorName='编制杠颜色' defaultColorIn={noiseProps.noiseColor2} resetColor='#ffc0e6' dispatchFunc={ setNoiseColor2 } />
			<InputColor colorName='编制边缘色' defaultColorIn={noiseProps.noiseColor3} resetColor='#000000' dispatchFunc={ setNoiseColor3 } />
      <InputCheck checkName='黑白模式' checkDefaultIn={noiseProps.noiseRemoveCol} dispatchFunc={ setNoiseRemoveCol } />
    </div>
	)
}