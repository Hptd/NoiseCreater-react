import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputColor from "../InputColor"
import InputCheck from "../InputCheck"
import { setNoiseScale, setNoiseSpeed, setNoiseContrast, setNoiseColor1, setNoiseColor2, setNoiseColor3, setNoiseColor4, setNoiseColor5, setNoiseColor6, setNoiseRemoveCol } from '../../features/DomainWarpNoiseParamsSlice'

export default function DomainWarpNoise() {
	const noiseProps = useSelector(state => state.domainWarpNoiseProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='整体缩放' minVal={0.5} maxVal={12} defaultInputValue={noiseProps.noiseScale} resetValue={4} dispatchFunc={ setNoiseScale } />
			<InputSlider sliderName='动画速度' minVal={0} maxVal={5} defaultInputValue={noiseProps.noiseSpeed} resetValue={1} dispatchFunc={ setNoiseSpeed } />
			<InputSlider sliderName='对比度' minVal={0} maxVal={4} defaultInputValue={noiseProps.noiseContrast} resetValue={2} dispatchFunc={ setNoiseContrast } />
			<InputColor colorName='底色-1' defaultColorIn={noiseProps.noiseColor1} resetColor='#1a6666' dispatchFunc={ setNoiseColor1 } />
			<InputColor colorName='底色-2' defaultColorIn={noiseProps.noiseColor2} resetColor='#80b300' dispatchFunc={ setNoiseColor2 } />
			<InputColor colorName='叠加色-1' defaultColorIn={noiseProps.noiseColor3} resetColor='#59001a' dispatchFunc={ setNoiseColor3 } />
			<InputColor colorName='叠加色-2' defaultColorIn={noiseProps.noiseColor4} resetColor='#0033ff' dispatchFunc={ setNoiseColor4 } />
			<InputColor colorName='叠加色-3' defaultColorIn={noiseProps.noiseColor5} resetColor='#4d0000' dispatchFunc={ setNoiseColor5 } />
			<InputColor colorName='叠加色-4' defaultColorIn={noiseProps.noiseColor6} resetColor='#008000' dispatchFunc={ setNoiseColor6 } />
			<InputCheck checkName='黑白模式' checkDefaultIn={noiseProps.noiseRemoveCol} dispatchFunc={ setNoiseRemoveCol } />
		</div>
	)
}
