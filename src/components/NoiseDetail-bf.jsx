import { useLocation } from "react-router-dom"
import NoiseCommonProps from "./NoiseCommonProps.jsx"
import Sponsor from "./Sponsor.jsx"
import noiseListInformations from '../../public/mySQL/noiseList.json'
import { lazy, Suspense, useState, useEffect } from "react"

import MainCanvas from "./MainCanvas.jsx"
import VertShader from '../../public/glsl/NoiseVertexShader.js'


export default function NoiseDetail() {
  const location = useLocation()
  const id = location.state.id
  const noiseName = location.state.noiseName

  const specialNoiseComponentPath = noiseListInformations.find(item => item.id === id).SpecialNoiseComponentPath

  const [Component, setComponent] = useState()
  const [fragmentShader, setFragmentShader] = useState()
  const [loadingOver, setLoadingOver] = useState(false)

  useEffect(() => {
    // 获取特定噪声片段着色器的路径
    const specialNoiseFragShaderPath = noiseListInformations.find(item => item.id === id).FragmentShaderPath

    // 从指定路径获取片段着色器的文本内容
    fetch(specialNoiseFragShaderPath)
      .then(response => response.text()) // 解析响应为文本
      .then(text => {
        // 找到反引号的起始和结束索引
        const startIndex = text.indexOf('`') + 1
        const endIndex = text.lastIndexOf('`')
        // 设置片段着色器的状态值，取出反引号之间的内容
        setFragmentShader(text.substring(startIndex, endIndex))
      })

    // 如果特定噪声组件路径不存在则返回
    if (!specialNoiseComponentPath) return

    // 动态导入特定噪声组件，并设置组件状态
    setComponent(lazy(() => import(specialNoiseComponentPath)))
    // 标记加载结束状态
    setLoadingOver(true)
  }, [specialNoiseComponentPath])

  // 处理下载图片的逻辑
  const [ clicked, setClicked ] = useState(0)
  function clickDownloadImg(){
    setClicked(clicked+1)
  }

  // 视频下载处理逻辑
  const [ videoDownload, setVideoDownload ] = useState(false)
  function handleDownloadVideo(){
    setVideoDownload(!videoDownload)
  }


  return (
    <>
      <div>
        <Suspense >
          {loadingOver ? Component && <Component /> : <div className="params-container">此Noise无特性参数</div>}
        </Suspense>
      </div>

      <NoiseCommonProps />

      <div className="params-container" style={{ textAlign: 'center' }}>
        <button id="btnReSize" style={{marginLeft: '50px', marginRight: '70px'}} onClick={handleDownloadVideo}>{videoDownload? '停止下载序列帧' : '开始下载序列帧'}</button>
        <button id="btnReSize" style={{ marginLeft: '70px', marginRight: '50px' }} onClick={clickDownloadImg}>下载图片</button>
      </div>

      <Sponsor />

      <MainCanvas VertShader={`${VertShader}`} FragShader={`${fragmentShader}`} noiseName={noiseName} clickedImg={clicked} videoDownload={videoDownload} />
    </>
  )
}