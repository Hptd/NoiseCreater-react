import { useSelector } from "react-redux"
import InputLabel from "../InputLabel"
import InputColor from "../InputColor"
import { setNoiseSharkX, setNoiseColor1, setNoiseColor2 } from '../../features/BrushNoiseAParamsSlice'

export default function BrushNoiseA() {
	const noiseProps = useSelector(state => state.brushNoiseAProps)

	return (
		<div className="params-container">
			<InputLabel labelName='笔刷选择' placeholder='默认1' defaultInputValue={noiseProps.noiseSharkX} resetValue={1} dispatchFunc={ setNoiseSharkX } />
			<InputColor colorName='背景颜色' defaultColorIn={noiseProps.noiseColor1} resetColor='#000000' dispatchFunc={ setNoiseColor1 } />
			<InputColor colorName='笔刷颜色' defaultColorIn={noiseProps.noiseColor2} resetColor='#ffffff' dispatchFunc={ setNoiseColor2 } />
    </div>
	)
}