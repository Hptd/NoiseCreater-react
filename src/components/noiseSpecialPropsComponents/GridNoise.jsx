import { useSelector } from "react-redux"
import InputSlider from "../InputSlider"
import InputCheck from "../InputCheck"
import { setNoiseMaxSize, setNoiseRotateAngle, setNoiseRotate } from '../../features/GridNoiseParamsSlice'

export default function GridNoise() {
	const noiseProps = useSelector(state => state.gridNoiseProps)

	return (
		<div className="params-container">
			<InputSlider sliderName='单体最大尺寸' minVal={0.002} maxVal={0.05} defaultInputValue={noiseProps.noiseMaxSize} resetValue={0.04} dispatchFunc={ setNoiseMaxSize } />
			<InputSlider sliderName='旋转角度' minVal={0} maxVal={1.6} defaultInputValue={noiseProps.noiseRotateAngle} resetValue={0} dispatchFunc={ setNoiseRotateAngle } />
      <InputCheck checkName='开始旋转' checkDefaultIn={noiseProps.noiseRotate} dispatchFunc={ setNoiseRotate } />
		</div>
	)
}