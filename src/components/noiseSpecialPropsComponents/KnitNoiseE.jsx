import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import { setNoiseSharkX, setNoiseSharkY } from '../../features/KnitNoiseEParamsSlice'

export default function KnitNoiseE() {
	const noiseProps = useSelector(state => state.knitNoiseEProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='横向错位调整' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseSharkX} resetValue={1} dispatchFunc={ setNoiseSharkX } />
			<InputSlider sliderName='灯光偏转-对比度' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseSharkY} resetValue={0.5} dispatchFunc={ setNoiseSharkY } />
    </div>
	)
}