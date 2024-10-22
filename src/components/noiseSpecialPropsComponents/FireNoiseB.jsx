import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputColor from "../InputColor"
import InputCheck from "../InputCheck"
import { setNoiseDetail, setNoiseSaturate, setNoiseColor1, setNoiseColor2, setNoiseColor3, setNoiseColor4, setNoiseColor5, setNoiseOnlyBright, setNoiseRemoveCol, setNoiseSpeed } from '../../features/FireNoiseBParamsSlice'

export default function FireNoiseB() {
	const noiseProps = useSelector(state => state.fireNoiseBProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='扰动细节大小' minVal={0} maxVal={2} defaultInputValue={noiseProps.noiseDetail} resetValue={0.5} dispatchFunc={ setNoiseDetail } />
			<InputSlider sliderName='火焰外圈光滑度' minVal={0} maxVal={0.99} defaultInputValue={noiseProps.noiseSaturate} resetValue={0.5} dispatchFunc={ setNoiseSaturate } />
			<InputSlider sliderName='火焰裁剪度' minVal={0} maxVal={1} defaultInputValue={noiseProps.noiseOnlyBright} resetValue={0.3} dispatchFunc={ setNoiseOnlyBright } />
			<InputSlider sliderName='整体速度' minVal={0} maxVal={10} defaultInputValue={noiseProps.noiseSpeed} resetValue={4} dispatchFunc={ setNoiseSpeed } />
			<InputColor colorName='外焰火焰颜色' defaultColorIn={noiseProps.noiseColor1} resetColor='#ff6633' dispatchFunc={ setNoiseColor1 } />
			<InputColor colorName='外焰层颜色' defaultColorIn={noiseProps.noiseColor2} resetColor='#f21933' dispatchFunc={ setNoiseColor2 } />
			<InputColor colorName='中层火焰颜色-上部' defaultColorIn={noiseProps.noiseColor3} resetColor='#f24c33' dispatchFunc={ setNoiseColor3 } />
			<InputColor colorName='中层火焰颜色-下部' defaultColorIn={noiseProps.noiseColor5} resetColor='#f29933' dispatchFunc={ setNoiseColor5 } />
			<InputColor colorName='内层火焰颜色' defaultColorIn={noiseProps.noiseColor4} resetColor='#f2cc33' dispatchFunc={ setNoiseColor4 } />
      <InputCheck checkName='黑白模式' checkDefaultIn={noiseProps.noiseRemoveCol} dispatchFunc={ setNoiseRemoveCol } />
    </div>
	)
}