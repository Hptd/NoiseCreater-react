import { useSelector } from "react-redux"
import Inputlabel from "../InputLabel"
import { setNoiseType } from '../../features/SampleNoiseABParamsSlice.js'


export default function SampleNoiseAB(){
  const sampleNoiseABProps = useSelector(state => state.sampleNoiseABProps)

  return(
    <div className="params-container">
      <Inputlabel labelName='噪波类型(三种：1、2、3)' placeholder='1或2或3' defaultInputValue={sampleNoiseABProps.noiseType} resetValue={1} dispatchFunc={setNoiseType} />
    </div>
  )
}