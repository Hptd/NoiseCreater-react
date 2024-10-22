import { useDispatch } from "react-redux"

export default function InputLabel({ labelName, placeholder, defaultInputValue, resetValue, dispatchFunc }) {

  const dispatch = useDispatch()

  return (
    <div className="inValue">
      <span>{labelName}</span>
      <div className="right">
        <span>{`==>   `}</span>
        <input id="input-label" type="text" placeholder={placeholder} value={defaultInputValue} onChange={(event)=>dispatch(dispatchFunc(event.target.value))} />
        <span> {`<==`} </span>
        <button id="btnReSize" onClick={()=>dispatch(dispatchFunc(resetValue))}>重置</button>
      </div>
    </div>
  )
}