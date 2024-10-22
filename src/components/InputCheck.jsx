import { useDispatch } from "react-redux"

export default function InputCheck({checkName, checkDefaultIn, dispatchFunc}) {
  const dispatch = useDispatch()

  const mainStyle = {
    'paddingRight': '56px'
  }

  return (
    <div className="inValue">
      <span>{checkName}</span>
      <div className="right" style={mainStyle}>
        <span>{`==>   `}</span>
        <input id="input-check" type="checkbox" checked={checkDefaultIn} onChange={(e)=>{dispatch(dispatchFunc(e.target.checked))}} />
        <span> {`<==`} </span>
      </div>
    </div>
  )
}