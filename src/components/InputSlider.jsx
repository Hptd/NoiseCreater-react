import { useState } from "react"
import { useDispatch } from "react-redux"

export default function InputSlider({ sliderName, minVal, maxVal, defaultInputValue, resetValue, dispatchFunc }) {
	// 数值状态更新
	const [minValue, setMinValue] = useState(minVal)
	const [maxValue, setMaxValue] = useState(maxVal)

	const dispatch = useDispatch()

  function handleMinValChange(event) {
    setMinValue(event.target.value)
  }
  function handleMaxValChange(event) {
    setMaxValue(event.target.value)
  }

	return (
		<div className="inValue">
			<span>{sliderName}</span>
			<div className="right">
				<span>{`==>`}</span>
				<input id="slider-bounder" type="text" placeholder={minVal} value={minValue} onChange={handleMinValChange} />
				<input className="slider" type="range" min={minValue} max={maxValue} value={defaultInputValue} step="0.0001" onChange={(event)=>dispatch(dispatchFunc(event.target.value))}/>
				<input id="slider-bounder" type="text" placeholder={maxVal} value={maxValue} onChange={handleMaxValChange} />
				<span>{`<==`}</span>
				<button id="btnReSize" onClick={()=>dispatch(dispatchFunc(resetValue))}>重置</button>
			</div>
		</div>
	)
}