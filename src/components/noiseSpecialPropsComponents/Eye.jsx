import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputColor from "../InputColor"
import InputCheck from "../InputCheck"
import { setNoiseSharkX, setNoiseSharkY, setNoiseColor1, setNoiseColor2, setNoiseColor3, setNoiseColor4, setNoiseColor5, setNoiseOnlyBright, setNoiseRemoveCol, setNoiseSpeed } from '../../features/EyeParamsSlice'

export default function Eye() {
	const noiseProps = useSelector(state => state.eyeProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='瞳孔尺寸' minVal={0.1} maxVal={0.8} defaultInputValue={noiseProps.noiseOnlyBright} resetValue={0.2} dispatchFunc={ setNoiseOnlyBright } />
			<InputSlider sliderName='瞳孔边缘色边界最小值' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseSharkX} resetValue={0.2} dispatchFunc={ setNoiseSharkX } />
			<InputSlider sliderName='瞳孔边缘色边界最大值' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseSharkY} resetValue={0.6} dispatchFunc={ setNoiseSharkY } />
			<InputSlider sliderName='整体变化速度' minVal={0} maxVal={3} defaultInputValue={noiseProps.noiseSpeed} resetValue={1} dispatchFunc={ setNoiseSpeed } />
			<InputColor colorName='颜色-1' defaultColorIn={noiseProps.noiseColor1} resetColor='#004c66' dispatchFunc={ setNoiseColor1 } />
      <InputColor colorName='颜色-2' defaultColorIn={noiseProps.noiseColor2} resetColor='#337f66' dispatchFunc={ setNoiseColor2 } />
      <InputColor colorName='颜色-3' defaultColorIn={noiseProps.noiseColor3} resetColor='#28766d' dispatchFunc={ setNoiseColor3 } />
      <InputColor colorName='颜色-4' defaultColorIn={noiseProps.noiseColor4} resetColor='#ffffff' dispatchFunc={ setNoiseColor4 } />
      <InputColor colorName='瞳孔颜色' defaultColorIn={noiseProps.noiseColor5} resetColor='#000000' dispatchFunc={ setNoiseColor5 } />
      <InputCheck checkName='黑白模式' checkDefaultIn={noiseProps.noiseRemoveCol} dispatchFunc={ setNoiseRemoveCol } />
    </div>
	)
}