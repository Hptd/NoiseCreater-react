import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputCheck from "../InputCheck"
import { setNoiseSharkX, setNoiseSharkY, setNoiseSharkZ, setNoiseHue, setNoiseSaturate, setNoiseOnlyBright, setNoiseRemoveCol, setNoiseSpeed } from '../../features/EtherNoiseCParamsSlice'

export default function EtherNoiseC() {
	const noiseProps = useSelector(state => state.etherNoiseCProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='圆度(须配合噪波尺寸参数)' minVal={0} maxVal={2} defaultInputValue={noiseProps.noiseOnlyBright} resetValue={0.35} dispatchFunc={ setNoiseOnlyBright } />
			<InputSlider sliderName='线条宽度' minVal={0} maxVal={0.08} defaultInputValue={noiseProps.noiseSharkX} resetValue={0.01} dispatchFunc={ setNoiseSharkX } />
			<InputSlider sliderName='光晕大小' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseSharkY} resetValue={0.1} dispatchFunc={ setNoiseSharkY } />
			<InputSlider sliderName='光晕范围' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseSharkZ} resetValue={0.7} dispatchFunc={ setNoiseSharkZ } />
			<InputSlider sliderName='横轴变化速度' minVal={0} maxVal={5} defaultInputValue={noiseProps.noiseHue} resetValue={2} dispatchFunc={ setNoiseHue } />
			<InputSlider sliderName='纵轴变化速度' minVal={0} maxVal={5} defaultInputValue={noiseProps.noiseSaturate} resetValue={2} dispatchFunc={ setNoiseSaturate } />
			<InputSlider sliderName='轮转变化速度' minVal={0} maxVal={5} defaultInputValue={noiseProps.noiseSpeed} resetValue={2} dispatchFunc={ setNoiseSpeed } />
      <InputCheck checkName='黑白模式' checkDefaultIn={noiseProps.noiseRemoveCol} dispatchFunc={ setNoiseRemoveCol } />
    </div>
	)
}