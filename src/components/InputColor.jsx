import { useDispatch } from "react-redux"

export default function InputColor({ colorName, defaultColorIn, resetColor, dispatchFunc }) {
  const dispatch = useDispatch()

  return (
    <div className="inValue">
      <span>{colorName}</span>
      <div className="right">
        <span>{`==>   `}</span>
        <input type="color" id="input-color" value={defaultColorIn} onChange={(event)=>dispatch(dispatchFunc(event.target.value))} />
        <span> {`<==`} </span>
        <button id="btnReSize" onClick={()=>dispatch(dispatchFunc(resetColor))}>重置</button>
      </div>
    </div>
  )
}