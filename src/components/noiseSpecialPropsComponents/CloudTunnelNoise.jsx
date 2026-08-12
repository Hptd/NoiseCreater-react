import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import { setNoiseIterations, setNoiseTimeSpeed, setNoiseForwardSpeed, setNoiseTurbulence, setNoiseWarp, setNoiseRadius, setNoiseNoiseStart, setNoiseNoiseEnd, setNoiseNoiseFreq, setNoiseNoiseIntensity, setNoiseRotateSpeed, setNoiseTranslucency, setNoiseTone } from '../../features/CloudTunnelNoiseParamsSlice'

export default function CloudTunnelNoise() {
	const noiseProps = useSelector(state => state.cloudTunnelNoiseProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='迭代次数' minVal={50} maxVal={200} defaultInputValue={noiseProps.noiseIterations} resetValue={100} dispatchFunc={ setNoiseIterations } />
			<InputSlider sliderName='时间速度' minVal={0} maxVal={0.5} defaultInputValue={noiseProps.noiseTimeSpeed} resetValue={0.05} dispatchFunc={ setNoiseTimeSpeed } />
			<InputSlider sliderName='前进速度' minVal={0} maxVal={10} defaultInputValue={noiseProps.noiseForwardSpeed} resetValue={4} dispatchFunc={ setNoiseForwardSpeed } />
			<InputSlider sliderName='湍流幅度' minVal={0} maxVal={1.5} defaultInputValue={noiseProps.noiseTurbulence} resetValue={0.5} dispatchFunc={ setNoiseTurbulence } />
			<InputSlider sliderName='湍流扭曲' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseWarp} resetValue={0.5} dispatchFunc={ setNoiseWarp } />
			<InputSlider sliderName='管道半径' minVal={1} maxVal={10} defaultInputValue={noiseProps.noiseRadius} resetValue={5} dispatchFunc={ setNoiseRadius } />
			<InputSlider sliderName='噪波起始频率' minVal={0.01} maxVal={0.5} defaultInputValue={noiseProps.noiseNoiseStart} resetValue={0.06} dispatchFunc={ setNoiseNoiseStart } />
			<InputSlider sliderName='噪波终止频率' minVal={0.5} maxVal={8} defaultInputValue={noiseProps.noiseNoiseEnd} resetValue={2} dispatchFunc={ setNoiseNoiseEnd } />
			<InputSlider sliderName='噪波频率' minVal={5} maxVal={50} defaultInputValue={noiseProps.noiseNoiseFreq} resetValue={20} dispatchFunc={ setNoiseNoiseFreq } />
			<InputSlider sliderName='噪波强度' minVal={0} maxVal={0.5} defaultInputValue={noiseProps.noiseNoiseIntensity} resetValue={0.05} dispatchFunc={ setNoiseNoiseIntensity } />
			<InputSlider sliderName='旋转速度' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseRotateSpeed} resetValue={0.1} dispatchFunc={ setNoiseRotateSpeed } />
			<InputSlider sliderName='透光度' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseTranslucency} resetValue={0.1} dispatchFunc={ setNoiseTranslucency } />
			<InputSlider sliderName='色调压暗' minVal={100} maxVal={5000} defaultInputValue={noiseProps.noiseTone} resetValue={900} dispatchFunc={ setNoiseTone } />
		</div>
	)
}
