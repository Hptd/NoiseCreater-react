import { useDispatch } from "react-redux"

export default function InputSelect({ labelName, options, defaultInputValue, resetValue, dispatchFunc }) {

  const dispatch = useDispatch()

  return (
    <div className="inValue">
      <span>{labelName}</span>
      <div className="right">
        <span>{`==>   `}</span>
        <select id="input-label" value={defaultInputValue} onChange={(event) => dispatch(dispatchFunc(event.target.value))}>
          {options.map(option => <option key={option} value={option}>{option}</option>)}
        </select>
        <span> {`<==`} </span>
        <button id="btnReSize" onClick={() => dispatch(dispatchFunc(resetValue))}>重置</button>
      </div>
    </div>
  )
}
