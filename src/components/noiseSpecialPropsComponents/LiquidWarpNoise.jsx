import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputColor from "../InputColor"
import InputCheck from "../InputCheck"
import { setNoiseFrequency, setNoiseAmplitude, setNoiseSpeed, setNoiseDegreeSpeed, setNoiseRotateStrength, setNoiseColor1, setNoiseColor2, setNoiseColor3, setNoiseColor4, setNoiseRemoveCol } from '../../features/LiquidWarpNoiseParamsSlice'

export default function LiquidWarpNoise() {
	const noiseProps = useSelector(state => state.liquidWarpNoiseProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='波纹频率' minVal={0} maxVal={20} defaultInputValue={noiseProps.noiseFrequency} resetValue={5} dispatchFunc={ setNoiseFrequency } />
			<InputSlider sliderName='波纹幅度' minVal={1} maxVal={100} defaultInputValue={noiseProps.noiseAmplitude} resetValue={30} dispatchFunc={ setNoiseAmplitude } />
			<InputSlider sliderName='动画速度' minVal={0} maxVal={5} defaultInputValue={noiseProps.noiseSpeed} resetValue={2} dispatchFunc={ setNoiseSpeed } />
			<InputSlider sliderName='噪声流动速度' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseDegreeSpeed} resetValue={0.1} dispatchFunc={ setNoiseDegreeSpeed } />
			<InputSlider sliderName='扭曲旋转强度' minVal={0} maxVal={1440} defaultInputValue={noiseProps.noiseRotateStrength} resetValue={720} dispatchFunc={ setNoiseRotateStrength } />
			<InputColor colorName='颜色-沙黄' defaultColorIn={noiseProps.noiseColor1} resetColor='#f4cd9f' dispatchFunc={ setNoiseColor1 } />
			<InputColor colorName='颜色-深蓝' defaultColorIn={noiseProps.noiseColor2} resetColor='#3162ee' dispatchFunc={ setNoiseColor2 } />
			<InputColor colorName='颜色-品红' defaultColorIn={noiseProps.noiseColor3} resetColor='#e882cc' dispatchFunc={ setNoiseColor3 } />
			<InputColor colorName='颜色-亮蓝' defaultColorIn={noiseProps.noiseColor4} resetColor='#59b5f3' dispatchFunc={ setNoiseColor4 } />
			<InputCheck checkName='黑白模式' checkDefaultIn={noiseProps.noiseRemoveCol} dispatchFunc={ setNoiseRemoveCol } />
		</div>
	)
}
