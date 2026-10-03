import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputColor from "../InputColor"
import InputCheck from "../InputCheck"
import { setNoiseCloudScale, setNoiseSpeed, setNoiseCloudDark, setNoiseCloudLight, setNoiseCloudCover, setNoiseCloudAlpha, setNoiseSkyTint, setNoiseSkyColor1, setNoiseSkyColor2, setNoiseCloudColor, setNoiseWarp, setNoiseRemoveCol } from '../../features/CloudSkyNoiseParamsSlice'

export default function CloudSkyNoise() {
	const noiseProps = useSelector(state => state.cloudSkyNoiseProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='云层缩放' minVal={0.2} maxVal={4} defaultInputValue={noiseProps.noiseCloudScale} resetValue={1.1} dispatchFunc={ setNoiseCloudScale } />
			<InputSlider sliderName='流动速度' minVal={0} maxVal={0.2} defaultInputValue={noiseProps.noiseSpeed} resetValue={0.03} dispatchFunc={ setNoiseSpeed } />
			<InputSlider sliderName='云层暗部' minVal={0} maxVal={1.5} defaultInputValue={noiseProps.noiseCloudDark} resetValue={0.5} dispatchFunc={ setNoiseCloudDark } />
			<InputSlider sliderName='云层亮部' minVal={0} maxVal={1.5} defaultInputValue={noiseProps.noiseCloudLight} resetValue={0.3} dispatchFunc={ setNoiseCloudLight } />
			<InputSlider sliderName='云量覆盖' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseCloudCover} resetValue={0.2} dispatchFunc={ setNoiseCloudCover } />
			<InputSlider sliderName='云层浓度' minVal={0} maxVal={20} defaultInputValue={noiseProps.noiseCloudAlpha} resetValue={8} dispatchFunc={ setNoiseCloudAlpha } />
			<InputSlider sliderName='天空染色' minVal={0} maxVal={1.5} defaultInputValue={noiseProps.noiseSkyTint} resetValue={0.5} dispatchFunc={ setNoiseSkyTint } />
			<InputSlider sliderName='云层扭曲' minVal={0.2} maxVal={2} defaultInputValue={noiseProps.noiseWarp} resetValue={1} dispatchFunc={ setNoiseWarp } />
			<InputColor colorName='天空颜色-1' defaultColorIn={noiseProps.noiseSkyColor1} resetColor='#336699' dispatchFunc={ setNoiseSkyColor1 } />
			<InputColor colorName='天空颜色-2' defaultColorIn={noiseProps.noiseSkyColor2} resetColor='#66b3ff' dispatchFunc={ setNoiseSkyColor2 } />
			<InputColor colorName='云层颜色' defaultColorIn={noiseProps.noiseCloudColor} resetColor='#ffffe6' dispatchFunc={ setNoiseCloudColor } />
			<InputCheck checkName='黑白模式' checkDefaultIn={noiseProps.noiseRemoveCol} dispatchFunc={ setNoiseRemoveCol } />
		</div>
	)
}
