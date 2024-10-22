import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputColor from "../InputColor"
import InputCheck from "../InputCheck"
import { setNoiseSharkX, setNoiseSharkY, setNoiseHue, setNoiseSaturate, setNoiseColor1, setNoiseOnlyBright, setNoiseRemoveCol, setNoiseSpeed } from '../../features/EtherNoiseAParamsSlice'

export default function EtherNoiseA() {
	const noiseProps = useSelector(state => state.etherNoiseAProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='涟漪层次' minVal={1} maxVal={10} defaultInputValue={noiseProps.noiseOnlyBright} resetValue={5} dispatchFunc={ setNoiseOnlyBright } />
			<InputSlider sliderName='细节清晰' minVal={0.1} maxVal={5} defaultInputValue={noiseProps.noiseSharkX} resetValue={2} dispatchFunc={ setNoiseSharkX } />
			<InputSlider sliderName='抽象程度' minVal={0.5} maxVal={2.5} defaultInputValue={noiseProps.noiseSharkY} resetValue={0.5} dispatchFunc={ setNoiseSharkY } />
			<InputSlider sliderName='横轴变化速度' minVal={0} maxVal={3} defaultInputValue={noiseProps.noiseHue} resetValue={0.4} dispatchFunc={ setNoiseHue } />
			<InputSlider sliderName='纵轴变化速度' minVal={0} maxVal={3} defaultInputValue={noiseProps.noiseSaturate} resetValue={0.3} dispatchFunc={ setNoiseSaturate } />
			<InputSlider sliderName='整体变化速度' minVal={0} maxVal={3} defaultInputValue={noiseProps.noiseSpeed} resetValue={1} dispatchFunc={ setNoiseSpeed } />
			<InputColor colorName='主色调' defaultColorIn={noiseProps.noiseColor1} resetColor='#1A4D66' dispatchFunc={ setNoiseColor1 } />
      <InputCheck checkName='黑白模式' checkDefaultIn={noiseProps.noiseRemoveCol} dispatchFunc={ setNoiseRemoveCol } />
    </div>
	)
}