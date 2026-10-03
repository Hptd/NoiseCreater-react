import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputColor from "../InputColor"
import InputCheck from "../InputCheck"
import { setNoiseSpeed, setNoiseFlowSpeed, setNoiseFlowSpeed2, setNoiseDisplacement, setNoiseAdvect, setNoiseDispFreq, setNoiseRotSpeed, setNoiseRidgeFreq, setNoiseOctaves, setNoiseGain, setNoiseOctaveScale, setNoiseBaseScale, setNoiseColor, setNoiseGamma, setNoiseRemoveCol } from '../../features/LavaNoiseParamsSlice'

export default function LavaNoise() {
	const noiseProps = useSelector(state => state.lavaNoiseProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='整体速度' minVal={0} maxVal={5} defaultInputValue={noiseProps.noiseSpeed} resetValue={1} dispatchFunc={ setNoiseSpeed } />
			<InputSlider sliderName='主流动速度' minVal={0} maxVal={2} defaultInputValue={noiseProps.noiseFlowSpeed} resetValue={0.6} dispatchFunc={ setNoiseFlowSpeed } />
			<InputSlider sliderName='次流动速度' minVal={0} maxVal={4} defaultInputValue={noiseProps.noiseFlowSpeed2} resetValue={1.9} dispatchFunc={ setNoiseFlowSpeed2 } />
			<InputSlider sliderName='位移强度' minVal={0} maxVal={2} defaultInputValue={noiseProps.noiseDisplacement} resetValue={0.5} dispatchFunc={ setNoiseDisplacement } />
			<InputSlider sliderName='平流混合' minVal={0} maxVal={0.99} defaultInputValue={noiseProps.noiseAdvect} resetValue={0.77} dispatchFunc={ setNoiseAdvect } />
			<InputSlider sliderName='位移场频率' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseDispFreq} resetValue={0.34} dispatchFunc={ setNoiseDispFreq } />
			<InputSlider sliderName='旋转速度' minVal={0} maxVal={20} defaultInputValue={noiseProps.noiseRotSpeed} resetValue={6} dispatchFunc={ setNoiseRotSpeed } />
			<InputSlider sliderName='脊状频率' minVal={0} maxVal={20} defaultInputValue={noiseProps.noiseRidgeFreq} resetValue={7} dispatchFunc={ setNoiseRidgeFreq } />
			<InputSlider sliderName='迭代层数' minVal={1} maxVal={10} defaultInputValue={noiseProps.noiseOctaves} resetValue={6} dispatchFunc={ setNoiseOctaves } />
			<InputSlider sliderName='强度衰减' minVal={1} maxVal={3} defaultInputValue={noiseProps.noiseGain} resetValue={1.4} dispatchFunc={ setNoiseGain } />
			<InputSlider sliderName='八度缩放' minVal={1} maxVal={3} defaultInputValue={noiseProps.noiseOctaveScale} resetValue={2} dispatchFunc={ setNoiseOctaveScale } />
			<InputSlider sliderName='基础缩放' minVal={1} maxVal={3} defaultInputValue={noiseProps.noiseBaseScale} resetValue={1.9} dispatchFunc={ setNoiseBaseScale } />
			<InputColor colorName='熔岩颜色' defaultColorIn={noiseProps.noiseColor} resetColor='#331203' dispatchFunc={ setNoiseColor } />
			<InputSlider sliderName='颜色幂' minVal={0.5} maxVal={3} defaultInputValue={noiseProps.noiseGamma} resetValue={1.4} dispatchFunc={ setNoiseGamma } />
			<InputCheck checkName='黑白模式' checkDefaultIn={noiseProps.noiseRemoveCol} dispatchFunc={ setNoiseRemoveCol } />
		</div>
	)
}
