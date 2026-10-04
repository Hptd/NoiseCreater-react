import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputColor from "../InputColor"
import InputCheck from "../InputCheck"
import { setNoiseSpinRotation, setNoiseSpinSpeed, setNoiseSpinEase, setNoiseSpinAmount, setNoiseContrast, setNoiseLighting, setNoisePixelFilter, setNoiseIterations, setNoiseScale, setNoisePaintScale, setNoiseIsRotate, setNoiseColor1, setNoiseColor2, setNoiseColor3, setNoiseRemoveCol } from '../../features/BalatroNoiseParamsSlice'

export default function BalatroNoise() {
	const noiseProps = useSelector(state => state.balatroNoiseProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='旋转量' minVal={-10} maxVal={10} defaultInputValue={noiseProps.noiseSpinRotation} resetValue={-2.0} dispatchFunc={ setNoiseSpinRotation } />
			<InputSlider sliderName='旋转速度' minVal={0} maxVal={20} defaultInputValue={noiseProps.noiseSpinSpeed} resetValue={7.0} dispatchFunc={ setNoiseSpinSpeed } />
			<InputSlider sliderName='旋转缓动' minVal={0} maxVal={3} defaultInputValue={noiseProps.noiseSpinEase} resetValue={1.0} dispatchFunc={ setNoiseSpinEase } />
			<InputSlider sliderName='螺旋强度' minVal={0} maxVal={2} defaultInputValue={noiseProps.noiseSpinAmount} resetValue={0.25} dispatchFunc={ setNoiseSpinAmount } />
			<InputSlider sliderName='对比度' minVal={0.5} maxVal={10} defaultInputValue={noiseProps.noiseContrast} resetValue={3.5} dispatchFunc={ setNoiseContrast } />
			<InputSlider sliderName='光照强度' minVal={0} maxVal={2} defaultInputValue={noiseProps.noiseLighting} resetValue={0.4} dispatchFunc={ setNoiseLighting } />
			<InputSlider sliderName='像素颗粒' minVal={50} maxVal={2000} defaultInputValue={noiseProps.noisePixelFilter} resetValue={745} dispatchFunc={ setNoisePixelFilter } />
			<InputSlider sliderName='迭代次数' minVal={1} maxVal={16} defaultInputValue={noiseProps.noiseIterations} resetValue={5} dispatchFunc={ setNoiseIterations } />
			<InputSlider sliderName='细节缩放' minVal={1} maxVal={100} defaultInputValue={noiseProps.noiseScale} resetValue={30} dispatchFunc={ setNoiseScale } />
			<InputSlider sliderName='颜料粗细' minVal={0.005} maxVal={0.2} defaultInputValue={noiseProps.noisePaintScale} resetValue={0.035} dispatchFunc={ setNoisePaintScale } />
			<InputCheck checkName='随时间旋转' checkDefaultIn={noiseProps.noiseIsRotate} dispatchFunc={ setNoiseIsRotate } />
			<InputColor colorName='颜色-1' defaultColorIn={noiseProps.noiseColor1} resetColor='#de443b' dispatchFunc={ setNoiseColor1 } />
			<InputColor colorName='颜色-2' defaultColorIn={noiseProps.noiseColor2} resetColor='#006bb4' dispatchFunc={ setNoiseColor2 } />
			<InputColor colorName='颜色-3' defaultColorIn={noiseProps.noiseColor3} resetColor='#162325' dispatchFunc={ setNoiseColor3 } />
			<InputCheck checkName='黑白模式' checkDefaultIn={noiseProps.noiseRemoveCol} dispatchFunc={ setNoiseRemoveCol } />
		</div>
	)
}
