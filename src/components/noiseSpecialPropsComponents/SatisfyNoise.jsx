import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputCheck from "../InputCheck"
import { setNoiseNum, setNoiseSpeed, setNoiseThick, setNoisePaletteR, setNoisePaletteG, setNoisePaletteB, setNoiseMirror, setNoiseRotate, setNoiseRotOfst, setNoiseTriNoise, setNoiseRemoveCol } from '../../features/SatisfyNoiseParamsSlice'

export default function SatisfyNoise() {
	const noiseProps = useSelector(state => state.satisfyNoiseProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='圆环数量' minVal={1} maxVal={40} defaultInputValue={noiseProps.noiseNum} resetValue={20} dispatchFunc={ setNoiseNum } />
			<InputSlider sliderName='动画速度' minVal={0} maxVal={5} defaultInputValue={noiseProps.noiseSpeed} resetValue={1.2} dispatchFunc={ setNoiseSpeed } />
			<InputSlider sliderName='圆环粗细' minVal={0.1} maxVal={5} defaultInputValue={noiseProps.noiseThick} resetValue={1.1} dispatchFunc={ setNoiseThick } />
			<InputSlider sliderName='色相偏移R' minVal={0} maxVal={6.28} defaultInputValue={noiseProps.noisePaletteR} resetValue={1.5} dispatchFunc={ setNoisePaletteR } />
			<InputSlider sliderName='色相偏移G' minVal={0} maxVal={6.28} defaultInputValue={noiseProps.noisePaletteG} resetValue={2.9} dispatchFunc={ setNoisePaletteG } />
			<InputSlider sliderName='色相偏移B' minVal={0} maxVal={6.28} defaultInputValue={noiseProps.noisePaletteB} resetValue={3.5} dispatchFunc={ setNoisePaletteB } />
			<InputCheck checkName='镜像对称' checkDefaultIn={noiseProps.noiseMirror} dispatchFunc={ setNoiseMirror } />
			<InputCheck checkName='整体旋转' checkDefaultIn={noiseProps.noiseRotate} dispatchFunc={ setNoiseRotate } />
			<InputCheck checkName='逐环错位旋转' checkDefaultIn={noiseProps.noiseRotOfst} dispatchFunc={ setNoiseRotOfst } />
			<InputCheck checkName='三角噪波纹理' checkDefaultIn={noiseProps.noiseTriNoise} dispatchFunc={ setNoiseTriNoise } />
			<InputCheck checkName='黑白模式' checkDefaultIn={noiseProps.noiseRemoveCol} dispatchFunc={ setNoiseRemoveCol } />
		</div>
	)
}
