import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, memo } from 'react'
import { useSelector } from 'react-redux'
import { FrameUniforms } from '../canvasUniformFrame/FrameUniform.js'
import { PropsUniforms } from '../canvasUniformFrame/PropsUniforms.js'
import { saveAs } from 'file-saver'
import * as THREE from 'three'
import JSZip from 'jszip'


function Mesh({ VertShader, FragShader, noiseName }) {

	function hexToRgb(hex) {
		let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);   
		result =  result ? {       
				r: parseInt(result[1], 16),              
				g: parseInt(result[2], 16),       
				b: parseInt(result[3], 16)   
		} : null;
		// 非法颜色输入（空串/三位简写等）兜底为白色，避免渲染循环崩溃
		if (!result) return new THREE.Vector3(1, 1, 1)
		return new THREE.Vector3(result.r/255, result.g/255, result.b/255)
	}

	/*
	上述代码直接通过useRef()获取到material的实例，但是此时的material.current为undefined，所以无法直接修改uniforms.noiseBright.value
	所以需要在useFrame()中更新uniforms.noiseBright.value

	一般此Hook配合useEffect()一起使用。
	*/
	const material = useRef()

	const noiseCommonProps = useSelector(state => state.noiseCommonProps)
	const noiseNameMain = noiseName + "Props"
	// console.log(noiseName, noiseNameMain)
	const noiseSpecialProps = useSelector(state => state[noiseNameMain])


  // useMemo()特性:
	// 1. 只在组件渲染时执行一次，返回值会被缓存，避免每次渲染都重新生成
	// 2. 更新依赖值为空，也就是在初始化时，一次将所有依赖值都计算出来，然后缓存起来，之后只要依赖值不变，就直接使用缓存的结果
	//    避免了每次渲染都重新生成新的函数，提高性能，同时为threeJS提供稳定的uniforms

	const uniforms = useMemo(() => ({
		uvScale: { value: noiseCommonProps.noiseUvSize },
		uvMoveX: { value: noiseCommonProps.noiseOffsetU },
		uvMoveY: { value: noiseCommonProps.noiseOffsetV },
		uvScaleX: { value: noiseCommonProps.noiseScaleU },
		uvScaleY: { value: noiseCommonProps.noiseScaleV },
		colorRev: { value: noiseCommonProps.noiseInvert },
		useAlpha: { value: noiseCommonProps.noiseAlphaChannel },
		brightness: { value: noiseCommonProps.noiseBright },

		iTime: { value: 0 },

		...PropsUniforms(noiseName, noiseSpecialProps, hexToRgb)
	}), [])

	useFrame((state, delta) => {
		// useRef()特性，每次渲染时，material.current都会更新，初始值为undefined，所以需要判断
		if (material.current) {
			// 每一帧都会更新uniforms.noiseBright.value
			material.current.uniforms.uvScale.value = noiseCommonProps.noiseUvSize
			material.current.uniforms.uvMoveX.value = noiseCommonProps.noiseOffsetU
			material.current.uniforms.uvMoveY.value = noiseCommonProps.noiseOffsetV
			material.current.uniforms.uvScaleX.value = noiseCommonProps.noiseScaleU
			material.current.uniforms.uvScaleY.value = noiseCommonProps.noiseScaleV
			material.current.uniforms.colorRev.value = noiseCommonProps.noiseInvert
			material.current.uniforms.useAlpha.value = noiseCommonProps.noiseAlphaChannel
			material.current.uniforms.brightness.value = noiseCommonProps.noiseBright

			if (noiseCommonProps.noiseAnimationOC) {
				// 用 delta（真实流逝秒数）推进，避免动画速度依赖显示器刷新率
				material.current.uniforms.iTime.value += delta
			}

			FrameUniforms(material, noiseSpecialProps, noiseName, hexToRgb)
		}
	})

	return (
		<mesh>
			<planeGeometry args={[noiseCommonProps.downLoadSize / 2, noiseCommonProps.downLoadSize / 2]} />
			<shaderMaterial ref={material}
				vertexShader={VertShader}
				fragmentShader={FragShader}
				uniforms={uniforms}
			/>
		</mesh>
	)
}

// 导出帧数上限，到顶自动停止并打包（约 60 秒 @10fps），防止内存无限增长
const MAX_FRAME_COUNT = 600

// 把 canvas 导出的 dataURL 解码为二进制：比 base64 字符串省内存，且让 JSZip 可靠写入二进制
function dataURLToUint8Array(dataURL) {
	const base64 = dataURL.split(',')[1]
	const binary = atob(base64)
	const bytes = new Uint8Array(binary.length)
	for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
	return bytes
}

// 图片和序列帧保存逻辑
function FileSave({ clickedImg, videoDownload, noiseName, onFrameCountChange, onPackingChange, onCapReached }) {
	const { gl, scene, camera } = useThree()

	// 图片保存逻辑
	useEffect(() => {
		// 强制重新刷新canvas，使得图片更新
		gl.render(scene, camera)
		const url = gl.domElement.toDataURL('image/png')
		if (clickedImg !== 0) {
			saveAs(url, `${noiseName}.png`)
		}
	}, [clickedImg])

	// 序列帧保存逻辑：先逐帧缓存到内存，停止后再统一打包成 zip 下载
	const imageCount = useRef(0)
	const frameAccumulator = useRef(0)
	const framesRef = useRef([])
	const isPackingRef = useRef(false)
	const fps = Number(useSelector(state => state.noiseCommonProps.noiseSequenceFrame))

	useFrame((state, delta) => {
		// 打包期间停止收集，避免与打包的帧数据冲突
		if (videoDownload && fps > 0 && !isPackingRef.current) {
			// 按真实流逝时间累加，导出速度与显示器刷新率无关
			frameAccumulator.current += delta
			const interval = 1 / fps
			while (frameAccumulator.current >= interval) {
				frameAccumulator.current -= interval
				imageCount.current += 1
				gl.render(scene, camera)
				const url = gl.domElement.toDataURL('image/png')
				framesRef.current.push(dataURLToUint8Array(url))
				onFrameCountChange(imageCount.current)
				// 达到上限立即停止收集并通知父组件走统一打包流程
				if (framesRef.current.length >= MAX_FRAME_COUNT) {
					isPackingRef.current = true
					onCapReached?.()
					break
				}
			}
		}
	})

	// videoDownload 由 true 变 false 时，把已收集的帧打包成 zip 下载
	useEffect(() => {
		if (videoDownload || framesRef.current.length === 0) {
			if (!videoDownload) {
				// 已停止但无帧（mount / 开始后立刻停止）：复位并结束打包态
				imageCount.current = 0
				frameAccumulator.current = 0
				onFrameCountChange?.(0)
				onPackingChange?.(false)
			} else {
				// 开始新一段记录时解除打包守卫
				isPackingRef.current = false
			}
			return
		}

		// 快照并立即清空，杜绝打包期间被 useFrame 追加导致竞态
		const frames = framesRef.current
		framesRef.current = []
		imageCount.current = 0
		frameAccumulator.current = 0
		isPackingRef.current = true
		onPackingChange?.(true)

		const zip = new JSZip()
		const pad = String(frames.length).length
		frames.forEach((bytes, i) => {
			zip.file(`${noiseName}_${String(i + 1).padStart(pad, '0')}.png`, bytes)
		})

		// PNG 已被 zlib 压缩过，用 STORE 避免二次压缩徒增 CPU 与内存占用
		zip.generateAsync({ type: 'blob', compression: 'STORE' })
			.then(blob => saveAs(blob, `${noiseName}_序列帧.zip`))
			.catch(err => console.error('序列帧打包失败：', err))
			.finally(() => {
				isPackingRef.current = false
				onFrameCountChange?.(0)
				onPackingChange?.(false)
			})
	}, [videoDownload, noiseName, onPackingChange, onFrameCountChange])

	return null
}

function MainCanvas({ VertShader, FragShader, noiseName, clickedImg, videoDownload, onFrameCountChange, onPackingChange, onCapReached }) {

	const canvasSize = useSelector(state => state.noiseCommonProps.downLoadSize) / 2
	const canvasStyle = { 'width': canvasSize, 'height': canvasSize }

	return (
		<div id='main-canvas' style={canvasStyle}>
			<Canvas camera={{ position: [0, 0, 6.5] }} orthographic={true}>
				<Mesh VertShader={VertShader} FragShader={FragShader} noiseName={noiseName} />
				<FileSave
					clickedImg={clickedImg}
					videoDownload={videoDownload}
					noiseName={noiseName}
					onFrameCountChange={onFrameCountChange}
					onPackingChange={onPackingChange}
					onCapReached={onCapReached}
				/>
			</Canvas>
		</div>

	)
}

export default memo(MainCanvas)