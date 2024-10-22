import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputColor from "../InputColor"
import InputCheck from "../InputCheck"
import { setNoiseSharkX, setNoiseSharkY, setNoiseHue, setNoiseSaturate, setNoiseColor1, setNoiseColor2, setNoiseRemoveCol } from '../../features/KnitNoiseDParamsSlice'

export default function KnitNoiseD() {
	const noiseProps = useSelector(state => state.knitNoiseDProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='环-对比度' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseSharkY} resetValue={0.7} dispatchFunc={ setNoiseSharkY } />
			<InputSlider sliderName='环-直径宽度' minVal={-0.1} maxVal={0.15} defaultInputValue={noiseProps.noiseSharkX} resetValue={0.1} dispatchFunc={ setNoiseSharkX } />
			<InputSlider sliderName='上下位移偏转' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseHue} resetValue={0.7} dispatchFunc={ setNoiseHue } />
			<InputSlider sliderName='左右位移偏转' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseSaturate} resetValue={0} dispatchFunc={ setNoiseSaturate } />
			<InputColor colorName='暗部颜色' defaultColorIn={noiseProps.noiseColor1} resetColor='#a5ceee' dispatchFunc={ setNoiseColor1 } />
			<InputColor colorName='亮部颜色' defaultColorIn={noiseProps.noiseColor2} resetColor='#ffc0e6' dispatchFunc={ setNoiseColor2 } />
      <InputCheck checkName='黑白模式' checkDefaultIn={noiseProps.noiseRemoveCol} dispatchFunc={ setNoiseRemoveCol } />
    </div>
	)
}