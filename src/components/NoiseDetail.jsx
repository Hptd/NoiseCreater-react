import { useLocation, useParams, Link } from "react-router-dom"
import NoiseCommonProps from "./NoiseCommonProps.jsx"
import Sponsor from "./Sponsor.jsx"
import noiseListInformations from '../../public/mySQL/noiseList.json'
import { useState, useEffect, useCallback } from "react"
import { useSelector } from "react-redux"

import MainCanvas from "./MainCanvas.jsx"
import VertShader from '../../public/glsl/NoiseVertexShader.js'

import SampleNoiseAB from './noiseSpecialPropsComponents/SampleNoiseAB.jsx'
import VoronoiWaterNoise from './noiseSpecialPropsComponents/VoronoiWaterNoise.jsx'
import TileableWaterNoise from './noiseSpecialPropsComponents/TileableWaterNoise.jsx'
import CausticsWaterNoise from './noiseSpecialPropsComponents/CausticsWaterNoise.jsx'
import GlareWaterNoise from './noiseSpecialPropsComponents/GlareWaterNoise.jsx'
import ForkedWaterNoise from './noiseSpecialPropsComponents/ForkedWaterNoise.jsx'
import RainWaterNoise from './noiseSpecialPropsComponents/RainWaterNoise.jsx'
import SmokeNoise from './noiseSpecialPropsComponents/SmokeNoise.jsx'
import HoneycompNoiseB from './noiseSpecialPropsComponents/HoneycompNoiseB.jsx'
import SilkNoise from './noiseSpecialPropsComponents/SilkNoise.jsx'
import GridNoise from './noiseSpecialPropsComponents/GridNoise.jsx'
import VoroNoise from './noiseSpecialPropsComponents/VoroNoise.jsx'
import CellNoiseA from './noiseSpecialPropsComponents/CellNoiseA.jsx'
import CellNoiseB from './noiseSpecialPropsComponents/CellNoiseB.jsx'
import CellNoiseC from './noiseSpecialPropsComponents/CellNoiseC.jsx'
import BandingGradientsNoise from './noiseSpecialPropsComponents/BandingGradientsNoise.jsx'
import SquircleColorNoise from './noiseSpecialPropsComponents/SquircleColorNoise.jsx'
import CircleNoiseA from './noiseSpecialPropsComponents/CircleNoiseA.jsx'
import CircleNoiseB from './noiseSpecialPropsComponents/CircleNoiseB.jsx'
import CircleNoiseC from './noiseSpecialPropsComponents/CircleNoiseC.jsx'
import IsovaluesNoise from './noiseSpecialPropsComponents/IsovaluesNoise.jsx'
import KnitNoiseA from './noiseSpecialPropsComponents/KnitNoiseA.jsx'
import KnitNoiseB from './noiseSpecialPropsComponents/KnitNoiseB.jsx'
import KnitNoiseC from './noiseSpecialPropsComponents/KnitNoiseC.jsx'
import KnitNoiseD from './noiseSpecialPropsComponents/KnitNoiseD.jsx'
import KnitNoiseE from './noiseSpecialPropsComponents/KnitNoiseE.jsx'
import KnitNoiseF from './noiseSpecialPropsComponents/KnitNoiseF.jsx'
import FireNoiseA from './noiseSpecialPropsComponents/FireNoiseA.jsx'
import FireNoiseB from './noiseSpecialPropsComponents/FireNoiseB.jsx'
import FireNoiseC from './noiseSpecialPropsComponents/FireNoiseC.jsx'
import EtherNoiseA from './noiseSpecialPropsComponents/EtherNoiseA.jsx'
import EtherNoiseB from './noiseSpecialPropsComponents/EtherNoiseB.jsx'
import EtherNoiseC from './noiseSpecialPropsComponents/EtherNoiseC.jsx'
import Taiji from './noiseSpecialPropsComponents/Taiji.jsx'
import Eye from './noiseSpecialPropsComponents/Eye.jsx'
import BrushNoiseA from './noiseSpecialPropsComponents/BrushNoiseA.jsx'
import BrushNoiseB from './noiseSpecialPropsComponents/BrushNoiseB.jsx'
import HexNoise from './noiseSpecialPropsComponents/HexNoise.jsx'
import SquaresNoise from './noiseSpecialPropsComponents/SquaresNoise.jsx'
import GyroidNoise from './noiseSpecialPropsComponents/GyroidNoise.jsx'
import HexMazeNoise from './noiseSpecialPropsComponents/HexMazeNoise.jsx'


function SpecialComponentChoose({ noiseName }) {
  switch (noiseName) {
    case "voronoiWaterNoise":
      return <VoronoiWaterNoise />
    case "sampleNoiseAB":
      return <SampleNoiseAB />
    case "tileableWaterNoise":
      return <TileableWaterNoise />
    case "causticsWaterNoise":
      return <CausticsWaterNoise />
    case "glareWaterNoise":
      return <GlareWaterNoise />
    case "forkedWaterNoise":
      return <ForkedWaterNoise />
    case "rainWaterNoise":
      return <RainWaterNoise />
    case "smokeNoise":
      return <SmokeNoise />
    case "honeycompNoiseB":
      return <HoneycompNoiseB />
    case "silkNoise":
      return <SilkNoise />
    case "gridNoise":
      return <GridNoise />
    case "voroNoise":
      return <VoroNoise />
    case "cellNoiseA":
      return <CellNoiseA />
    case "cellNoiseB":
      return <CellNoiseB />
    case "cellNoiseC":
      return <CellNoiseC />
    case "bandingGradientsNoise":
      return <BandingGradientsNoise />
    case "squircleColorNoise":
      return <SquircleColorNoise />
    case "circleNoiseA":
      return <CircleNoiseA />
    case "circleNoiseB":
      return <CircleNoiseB />
    case "circleNoiseC":
      return <CircleNoiseC />
    case "isovaluesNoise":
      return <IsovaluesNoise />
    case "knitNoiseA":
      return <KnitNoiseA />
    case "knitNoiseB":
      return <KnitNoiseB />
    case "knitNoiseC":
      return <KnitNoiseC />
    case "knitNoiseD":
      return <KnitNoiseD />
    case "knitNoiseE":
      return <KnitNoiseE />
    case "knitNoiseF":
      return <KnitNoiseF />
    case "fireNoiseA":
      return <FireNoiseA />
    case "fireNoiseB":
      return <FireNoiseB />
    case "fireNoiseC":
      return <FireNoiseC />
    case "etherNoiseA":
      return <EtherNoiseA />
    case "etherNoiseB":
      return <EtherNoiseB />
    case "etherNoiseC":
      return <EtherNoiseC />
    case "taiji":
      return <Taiji />
    case "eye":
      return <Eye />
    case "brushNoiseA":
      return <BrushNoiseA />
    case "brushNoiseB":
      return <BrushNoiseB />
    case "hexNoise":
      return <HexNoise />
    case "squaresNoise":
      return <SquaresNoise />
    case "gyroidNoise":
      return <GyroidNoise />
    case "hexMazeNoise":
      return <HexMazeNoise />
    default:
      return (<div className="params-container">此Noise无特性参数</div>)
  }
}

export default function NoiseDetail() {
  const location = useLocation()
  const { name } = useParams()
  // 直接输入URL/刷新/收藏时 location.state 为 undefined，回退用路由 :name 参数反查
  const noiseName = location.state?.noiseName ?? name
  const noiseInfo = noiseListInformations.find(item => item.routeHref === `noiseDetail/${noiseName}`)
  const id = location.state?.id ?? noiseInfo?.id
  // 未找到时的提示框尺寸与画布一致，占据画布位置
  const canvasSize = useSelector(state => state.noiseCommonProps.downLoadSize) / 2

  const [fragmentShader, setFragmentShader] = useState()
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchShader = async () => {
      setIsLoading(true);
      try {
        const info = noiseListInformations.find(item => item.id === id)
        if (!info) { setNotFound(true); return }
        const response = await fetch(info.FragmentShaderPath)
        const text = await response.text()
        const startIndex = text.indexOf('`') + 1
      const endIndex = text.lastIndexOf('`')
        setFragmentShader(text.substring(startIndex, endIndex))
      } catch (error) {
        console.error('Failed to fetch shader:', error)
        // 处理错误，例如显示错误提示
      } finally {
        setIsLoading(false)
      }
    }

    fetchShader();
  }, [id, noiseName])

  // 处理下载图片的逻辑
  const [clicked, setClicked] = useState(0)
  function clickDownloadImg() {
    setClicked(clicked + 1)
  }

  // 视频下载处理逻辑
  const [videoDownload, setVideoDownload] = useState(false)
  const [frameCount, setFrameCount] = useState(0)
  const [isPacking, setIsPacking] = useState(false)
  const handleFrameCountChange = useCallback(count => setFrameCount(count), [])
  const handlePackingChange = useCallback(packing => setIsPacking(packing), [])
  const handleCapReached = useCallback(() => {
    setVideoDownload(false)
    setIsPacking(true)
  }, [])
  function handleDownloadVideo() {
    if (videoDownload) {
      // 停止收集，FileSave 收到 videoDownload=false 后统一打包
      setVideoDownload(false)
      setIsPacking(true)
    } else {
      // 开始记录
      setVideoDownload(true)
      setFrameCount(0)
      setIsPacking(false)
    }
  }


  return (
    <>
      <SpecialComponentChoose noiseName={noiseName} />

      <NoiseCommonProps />

      <div className="params-container" style={{ textAlign: 'center' }}>
        <button id="btnReSize" style={{ marginLeft: '50px', marginRight: '70px' }} onClick={handleDownloadVideo} disabled={isPacking}>{videoDownload ? '停止并打包下载' : (isPacking ? '正在打包...' : '开始下载序列帧')}</button>
        <button id="btnReSize" style={{ marginLeft: '70px', marginRight: '50px' }} onClick={clickDownloadImg}>下载图片</button>
      </div>
      {videoDownload && <div className="params-container" style={{ textAlign: 'center' }}>已准备 {frameCount} 张</div>}
      {isPacking && <div className="params-container" style={{ textAlign: 'center' }}>正在打包 {frameCount} 张...</div>}

      <Sponsor />

      {isLoading ? <div>Loading...</div> :
        notFound ? <div className="noise-not-found" style={{ width: canvasSize, height: canvasSize }}>未找到该噪波，请返回<Link to="/" className="back-home">首页</Link></div> :
          <MainCanvas
            VertShader={`${VertShader}`} FragShader={`${fragmentShader}`} noiseName={noiseName}
            clickedImg={clicked} videoDownload={videoDownload}
            onFrameCountChange={handleFrameCountChange} onPackingChange={handlePackingChange} onCapReached={handleCapReached}
          />}
    </>
  )
}