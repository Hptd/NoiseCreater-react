import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputCheck from "../InputCheck"
import { setNoiseScale, setNoiseSpeed, setNoiseCStyle, setNoiseCFreq, setNoiseSeedDist, setNoiseSmooth, setNoiseAltColor, setNoiseRemoveCol } from '../../features/WorleyNoiseParamsSlice'

export default function WorleyNoise() {
	const noiseProps = useSelector(state => state.worleyNoiseProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='细胞缩放' minVal={1} maxVal={20} defaultInputValue={noiseProps.noiseScale} resetValue={5} dispatchFunc={ setNoiseScale } />
			<InputSlider sliderName='运动速度' minVal={0} maxVal={20} defaultInputValue={noiseProps.noiseSpeed} resetValue={5} dispatchFunc={ setNoiseSpeed } />
			<InputSlider sliderName='样式选择(0环带/1边界/2小梁)' minVal={0} maxVal={2} defaultInputValue={noiseProps.noiseCStyle} resetValue={0} dispatchFunc={ setNoiseCStyle } />
			<InputSlider sliderName='条纹频率' minVal={0} maxVal={20} defaultInputValue={noiseProps.noiseCFreq} resetValue={5} dispatchFunc={ setNoiseCFreq } />
			<InputSlider sliderName='中心白色半径' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseSeedDist} resetValue={0.3} dispatchFunc={ setNoiseSeedDist } />
			<InputCheck checkName='平滑渐变' checkDefaultIn={noiseProps.noiseSmooth} dispatchFunc={ setNoiseSmooth } />
			<InputCheck checkName='交替反色' checkDefaultIn={noiseProps.noiseAltColor} dispatchFunc={ setNoiseAltColor } />
			<InputCheck checkName='黑白模式' checkDefaultIn={noiseProps.noiseRemoveCol} dispatchFunc={ setNoiseRemoveCol } />
		</div>
	)
}
