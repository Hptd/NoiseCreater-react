import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputCheck from "../InputCheck"
import { setNoiseSingleSize, setNoiseBroken, setNoiseRefrac, setNoiseSharkX, setNoiseSharkY, setNoiseOnlyBright, setNoiseSaturate, setNoiseHue, setNoiseRemoveCol } from '../../features/CircleNoiseAParamsSlice'

export default function CircleNoiseA() {
	const noiseProps = useSelector(state => state.circleNoiseAProps)

	return (
    <div className="params-container">
			<InputSlider sliderName='单圆球尺寸' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseSingleSize} resetValue={0.4} dispatchFunc={ setNoiseSingleSize } />
			<InputSlider sliderName='马赛克球体' minVal={1} maxVal={20} defaultInputValue={noiseProps.noiseBroken} resetValue={1} dispatchFunc={ setNoiseBroken } />
			<InputSlider sliderName='边缘模糊程度' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseRefrac} resetValue={0.01} dispatchFunc={ setNoiseRefrac } />
			<InputSlider sliderName='单球矩阵切割' minVal={1} maxVal={10} defaultInputValue={noiseProps.noiseSharkX} resetValue={1} dispatchFunc={ setNoiseSharkX } />
			<InputSlider sliderName='错位运动调整' minVal={1} maxVal={10} defaultInputValue={noiseProps.noiseSharkY} resetValue={2} dispatchFunc={ setNoiseSharkY } />
			<InputSlider sliderName='色相' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseHue} resetValue={0} dispatchFunc={ setNoiseHue } />
			<InputSlider sliderName='饱和度' minVal={0} maxVal={1.5} defaultInputValue={noiseProps.noiseSaturate} resetValue={1} dispatchFunc={ setNoiseSaturate } />
			<InputSlider sliderName='亮度' minVal={-1} maxVal={1} defaultInputValue={noiseProps.noiseOnlyBright} resetValue={0} dispatchFunc={ setNoiseOnlyBright } />
      <InputCheck checkName='黑白模式' checkDefaultIn={noiseProps.noiseRemoveCol} dispatchFunc={ setNoiseRemoveCol } />
    </div>
	)
}