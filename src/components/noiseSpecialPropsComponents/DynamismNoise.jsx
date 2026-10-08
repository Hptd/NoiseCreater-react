import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputColor from "../InputColor"
import InputCheck from "../InputCheck"
import { setNoiseScale, setNoiseSpeed, setNoiseOctaves, setNoiseDecay, setNoiseDivScale, setNoiseColor1, setNoiseColor2, setNoiseColor3, setNoiseColor4, setNoiseRemoveCol } from '../../features/DynamismNoiseParamsSlice'

export default function DynamismNoise() {
	const noiseProps = useSelector(state => state.dynamismNoiseProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='整体缩放' minVal={0.5} maxVal={4} defaultInputValue={noiseProps.noiseScale} resetValue={1.75} dispatchFunc={ setNoiseScale } />
			<InputSlider sliderName='动画速度' minVal={0} maxVal={3} defaultInputValue={noiseProps.noiseSpeed} resetValue={1} dispatchFunc={ setNoiseSpeed } />
			<InputSlider sliderName='细节层数' minVal={1} maxVal={8} defaultInputValue={noiseProps.noiseOctaves} resetValue={4} dispatchFunc={ setNoiseOctaves } />
			<InputSlider sliderName='层衰减' minVal={1} maxVal={6} defaultInputValue={noiseProps.noiseDecay} resetValue={3.2} dispatchFunc={ setNoiseDecay } />
			<InputSlider sliderName='散度强度' minVal={0} maxVal={4} defaultInputValue={noiseProps.noiseDivScale} resetValue={1.8} dispatchFunc={ setNoiseDivScale } />
			<InputColor colorName='颜色-1' defaultColorIn={noiseProps.noiseColor1} resetColor='#473026' dispatchFunc={ setNoiseColor1 } />
			<InputColor colorName='颜色-2' defaultColorIn={noiseProps.noiseColor2} resetColor='#1a213b' dispatchFunc={ setNoiseColor2 } />
			<InputColor colorName='颜色-3' defaultColorIn={noiseProps.noiseColor3} resetColor='#451212' dispatchFunc={ setNoiseColor3 } />
			<InputColor colorName='颜色-4' defaultColorIn={noiseProps.noiseColor4} resetColor='#1a2e40' dispatchFunc={ setNoiseColor4 } />
			<InputCheck checkName='黑白模式' checkDefaultIn={noiseProps.noiseRemoveCol} dispatchFunc={ setNoiseRemoveCol } />
		</div>
	)
}
