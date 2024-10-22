import { useSelector } from "react-redux"
import InputLabel from "../InputLabel"
import InputSlider from "../InputSlider"
import InputColor from "../InputColor"
import { setNoiseCount, setNoiseHeng, setNoiseZong, setNoiseSharkX, setNoiseColor1, setNoiseColor2 } from '../../features/BrushNoiseBParamsSlice'

export default function BrushNoiseB() {
	const noiseProps = useSelector(state => state.brushNoiseBProps)

	return (
		<div className="params-container">
			<InputLabel labelName='单页包含行列数' placeholder='默认1' defaultInputValue={noiseProps.noiseCount} resetValue={1} dispatchFunc={setNoiseCount} />
			<InputLabel labelName='横向页码' placeholder='默认0' defaultInputValue={noiseProps.noiseHeng} resetValue={0} dispatchFunc={setNoiseHeng} />
			<InputLabel labelName='纵向页码' placeholder='默认0' defaultInputValue={noiseProps.noiseZong} resetValue={0} dispatchFunc={setNoiseZong} />
			<InputSlider sliderName='形变程度' minVal={0.01} maxVal={2} defaultInputValue={noiseProps.noiseSharkX} resetValue={0.5} dispatchFunc={setNoiseSharkX} />
			<InputColor colorName='背景颜色' defaultColorIn={noiseProps.noiseColor1} resetColor='#000000' dispatchFunc={setNoiseColor1} />
			<InputColor colorName='笔刷颜色' defaultColorIn={noiseProps.noiseColor2} resetColor='#ffffff' dispatchFunc={setNoiseColor2} />
			<span id="brush-b-infor">数值介绍:
				每页包含行列数量：显示总个数 = “单页包含行列数”的平方；<br />
				横向页码：以当前每页显示数量作为一页，+1 即向后翻页；<br />
				纵向页码：以当前每页显示数量作为一页，+1 即向上翻页；<br />
				<br />
				举例使用说明：<br />
				当 “每页包含行列数量 = 3”，此时每页有9个结果；<br />
				每一页的左下角噪波坐标为(0, 0);<br />
				此页无满意结果，“横向页码 = 1”(即从0变为1)；<br />
				此时对本页坐标为(1, 1)的噪波满意，选中操作如下：<br />
				0. 记录值：“每页包含行列数量” | “横向页码” | “纵向页码”；<br />
				1. 重置：“每页包含行列数量” | “横向页码” | “纵向页码”；<br />
				2. 横向坐标 = “每页包含行列数量” * “横向页码” + 1；<br />
				3. 纵向坐标 = “每页包含行列数量” * “纵向页码” + 1；<br />
				4.按照公式计算，此时输入：<br />
				“横向页码” = 横向坐标；“纵向页码” = 纵向坐标；<br />
				当前案例结果为：“横向页码” = 4；“纵向页码” = 1；<br />
			</span>
		</div>
	)
}