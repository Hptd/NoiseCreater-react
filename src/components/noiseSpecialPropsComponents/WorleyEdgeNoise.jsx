import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import { setNoiseScale, setNoiseSpeed, setNoiseDistScale, setNoiseEdgeGain, setNoiseEdgeOffset, setNoiseHashRatio, setNoiseHashSeed } from '../../features/WorleyEdgeNoiseParamsSlice'

export default function WorleyEdgeNoise() {
	const noiseProps = useSelector(state => state.worleyEdgeNoiseProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='缩放密度' minVal={1} maxVal={20} defaultInputValue={noiseProps.noiseScale} resetValue={5} dispatchFunc={setNoiseScale} />
			<InputSlider sliderName='动画速度' minVal={0} maxVal={5} defaultInputValue={noiseProps.noiseSpeed} resetValue={1} dispatchFunc={setNoiseSpeed} />
			<InputSlider sliderName='距离缩放' minVal={1} maxVal={20} defaultInputValue={noiseProps.noiseDistScale} resetValue={5} dispatchFunc={setNoiseDistScale} />
			<InputSlider sliderName='边缘增益' minVal={0} maxVal={10} defaultInputValue={noiseProps.noiseEdgeGain} resetValue={4} dispatchFunc={setNoiseEdgeGain} />
			<InputSlider sliderName='边缘偏移' minVal={0} maxVal={2} defaultInputValue={noiseProps.noiseEdgeOffset} resetValue={0.5} dispatchFunc={setNoiseEdgeOffset} />
			<InputSlider sliderName='哈希比例' minVal={0.1} maxVal={2} defaultInputValue={noiseProps.noiseHashRatio} resetValue={0.7} dispatchFunc={setNoiseHashRatio} />
			<InputSlider sliderName='随机种子' minVal={0} maxVal={100} defaultInputValue={noiseProps.noiseHashSeed} resetValue={0} dispatchFunc={setNoiseHashSeed} />
		</div>
	)
}
