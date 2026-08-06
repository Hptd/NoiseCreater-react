import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import { setNoiseDensity, setNoiseHashFreq, setNoiseIntensity, setNoiseThreshold, setNoiseSeed } from '../../features/HexMazeNoiseParamsSlice'

export default function HexMazeNoise() {
	const noiseProps = useSelector(state => state.hexMazeNoiseProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='网格密度' minVal={5} maxVal={300} defaultInputValue={noiseProps.noiseDensity} resetValue={50} dispatchFunc={ setNoiseDensity } />
			<InputSlider sliderName='哈希频率' minVal={1000} maxVal={1000000} defaultInputValue={noiseProps.noiseHashFreq} resetValue={100000} dispatchFunc={ setNoiseHashFreq } />
			<InputSlider sliderName='线条亮度' minVal={0.01} maxVal={1} defaultInputValue={noiseProps.noiseIntensity} resetValue={0.1} dispatchFunc={ setNoiseIntensity } />
			<InputSlider sliderName='方向阈值' minVal={0.1} maxVal={1} defaultInputValue={noiseProps.noiseThreshold} resetValue={0.5} dispatchFunc={ setNoiseThreshold } />
			<InputSlider sliderName='随机种子' minVal={0} maxVal={100} defaultInputValue={noiseProps.noiseSeed} resetValue={0} dispatchFunc={ setNoiseSeed } />
		</div>
	)
}