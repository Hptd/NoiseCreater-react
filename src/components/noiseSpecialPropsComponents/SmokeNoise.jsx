import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import { setNoiseOnlyBright, setNoiseDelicate, setNoiseBroken, setNoiseRefrac, setNoiseSharkX, setNoiseSharkY, setNoiseWarp, setNoiseColorGray1, setNoiseColorGray2, setNoiseColorGray3 } from '../../features/SmokeNoiseParamsSlice'

export default function SmokeNoise() {
	const noiseProps = useSelector(state => state.smokeNoiseProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='亮度' minVal={0.3} maxVal={0.9} defaultInputValue={noiseProps.noiseOnlyBright} resetValue={0.5} dispatchFunc={ setNoiseOnlyBright } />
			<InputSlider sliderName='细腻程度' minVal={4} maxVal={20} defaultInputValue={noiseProps.noiseDelicate} resetValue={4} dispatchFunc={ setNoiseDelicate } />
			<InputSlider sliderName='破碎程度' minVal={1} maxVal={8} defaultInputValue={noiseProps.noiseBroken} resetValue={2} dispatchFunc={ setNoiseBroken } />
			<InputSlider sliderName='空气折射率' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseRefrac} resetValue={0.5} dispatchFunc={ setNoiseRefrac } />
			<InputSlider sliderName='X 方向扰动' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseSharkX} resetValue={0.15} dispatchFunc={ setNoiseSharkX } />
			<InputSlider sliderName='Y 方向扰动' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseSharkY} resetValue={0.126} dispatchFunc={ setNoiseSharkY } />
			<InputSlider sliderName='扭曲程度' minVal={0.1} maxVal={30} defaultInputValue={noiseProps.noiseWarp} resetValue={1} dispatchFunc={ setNoiseWarp } />
			<InputSlider sliderName='颜色>灰度1' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseColorGray1} resetValue={0} dispatchFunc={ setNoiseColorGray1 } />
			<InputSlider sliderName='颜色>灰度2' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseColorGray2} resetValue={0.3} dispatchFunc={ setNoiseColorGray2 } />
			<InputSlider sliderName='颜色>灰度3' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseColorGray3} resetValue={0.6} dispatchFunc={ setNoiseColorGray3 } />
    </div>
	)
}