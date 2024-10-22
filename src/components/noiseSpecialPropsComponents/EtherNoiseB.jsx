import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputColor from "../InputColor"
import InputCheck from "../InputCheck"
import { setNoiseColor1, setNoiseColor2, setNoiseRemoveCol, setNoiseSpeed } from '../../features/EtherNoiseBParamsSlice'

export default function EtherNoiseB() {
	const noiseProps = useSelector(state => state.etherNoiseBProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='整体变化速度' minVal={0} maxVal={3} defaultInputValue={noiseProps.noiseSpeed} resetValue={1} dispatchFunc={ setNoiseSpeed } />
			<InputColor colorName='主体颜色' defaultColorIn={noiseProps.noiseColor1} resetColor='#e90b09' dispatchFunc={ setNoiseColor1 } />
			<InputColor colorName='边缘颜色' defaultColorIn={noiseProps.noiseColor2} resetColor='#fab009' dispatchFunc={ setNoiseColor2 } />
      <InputCheck checkName='黑白模式' checkDefaultIn={noiseProps.noiseRemoveCol} dispatchFunc={ setNoiseRemoveCol } />
    </div>
	)
}