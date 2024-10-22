import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputColor from "../InputColor"
import InputCheck from "../InputCheck"
import { setNoiseDetail, setNoiseSharkX, setNoiseSharkY, setNoiseHue, setNoiseSaturate, setNoiseColor1, setNoiseColor2, setNoiseColor3, setNoiseColor4, setNoiseOnlyBright, setNoiseRemoveCol, setNoiseSpeed } from '../../features/FireNoiseAParamsSlice'

export default function FireNoiseA() {
	const noiseProps = useSelector(state => state.fireNoiseAProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='细节分层' minVal={1} maxVal={6} defaultInputValue={noiseProps.noiseDetail} resetValue={4} dispatchFunc={ setNoiseDetail } />
			<InputSlider sliderName='扭曲程度' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseSharkX} resetValue={0.5} dispatchFunc={ setNoiseSharkX } />
			<InputSlider sliderName='明亮度' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseSharkY} resetValue={0.1} dispatchFunc={ setNoiseSharkY } />
			<InputSlider sliderName='亮部移动速度' minVal={0} maxVal={2} defaultInputValue={noiseProps.noiseHue} resetValue={0.7} dispatchFunc={ setNoiseHue } />
			<InputSlider sliderName='暗部移动速度' minVal={0} maxVal={2} defaultInputValue={noiseProps.noiseSaturate} resetValue={0.4} dispatchFunc={ setNoiseSaturate } />
			<InputSlider sliderName='整体移动速度' minVal={0} maxVal={2} defaultInputValue={noiseProps.noiseSpeed} resetValue={0.1} dispatchFunc={ setNoiseSpeed } />
			<InputSlider sliderName='上部虚化程度' minVal={0} maxVal={1.6} defaultInputValue={noiseProps.noiseOnlyBright} resetValue={1.6} dispatchFunc={ setNoiseOnlyBright } />
			<InputColor colorName='颜色-1' defaultColorIn={noiseProps.noiseColor1} resetColor='#800019' dispatchFunc={ setNoiseColor1 } />
			<InputColor colorName='颜色-2' defaultColorIn={noiseProps.noiseColor2} resetColor='#e60000' dispatchFunc={ setNoiseColor2 } />
			<InputColor colorName='颜色-3' defaultColorIn={noiseProps.noiseColor3} resetColor='#330000' dispatchFunc={ setNoiseColor3 } />
			<InputColor colorName='颜色-4' defaultColorIn={noiseProps.noiseColor4} resetColor='#ffe600' dispatchFunc={ setNoiseColor4 } />
      <InputCheck checkName='黑白模式' checkDefaultIn={noiseProps.noiseRemoveCol} dispatchFunc={ setNoiseRemoveCol } />
    </div>
	)
}