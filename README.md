# 进度表
## 20241003 进度 && 使用说明 && 后续工作安排

# 20241011 学习记录
## 一、 Hooks的相关知识和特性
### 1. useState()
- useState() 是一个Hook，它可以让函数组件中的 state 变量拥有内部的状态，并且可以触发重新渲染。
- useState() 返回一个数组，数组的第一个元素是当前的 state 值，第二个元素是一个函数，可以用来更新 state 值。
- useState() 调用次数多于一次时，会返回多个 state 值。
- useState() 不会在组件的生命周期中重新渲染，除非 state 值发生变化。

### 2. useEffect()
- useEffect() 是一个Hook，它可以让函数组件在渲染后执行某些操作，并且可以触发重新渲染。
- useEffect() 可以用来处理副作用，比如订阅和取消订阅，设置定时器，以及执行清理操作。
- useEffect() 通常就是用于根据某个值的变化，产生一些连锁反应，比如请求数据，设置状态，触发重新渲染等。
- 注意：useEffect() 和函数区域内的函数触发顺序为：
    - 优先函数组件区域内的函数；
    - 其次useEffect() 内的函数；
    - 最后useEffect() 外的函数重新执行。
- 基于上述的注意，一般需要在 useEffect() 内使用时加一层判断，这样避免读取到的是空数值或者是无效的函数等等，避免报错。同时需要注意 useEffect() 内的函数的执行时机，useEffect() 内的函数只会在组件渲染后执行一次，如果需要在每次渲染后都执行，需要设置第二个参数为 []。

### 3. useRef()
- useRef() 是一个Hook，它可以保存一个可变的 ref 对象，并返回该对象。
- useRef() 返回的对象保存了对最近渲染过的组件实例或 HTML 元素的引用。
    - 当使用它时，如果直接在函数区域调用"console.log(ref.current)"，则会输出 null。原因是 ref 对象在组件渲染后才被创建，而函数区域在组件渲染前就执行。
    - 所以，如果需要在函数区域使用 ref 对象，需要在 useEffect() 里进行处理。
    - 另外，如果 ref 对象在函数区域被修改，则会触发组件的重新渲染。
    - 注意：不要在 useEffect() 里修改 ref 对象，否则会造成死循环。
    - 一般使用如下代码预先进行处理和判定操作：
        ``` js
        const ref = useRef();
        if (ref.current)
        {
            // 处理 ref 对象
        }
        return(
            <div ref={ref}>
                // 组件内容
            </div>
        )
        ...
        ```
### 4. useMemo()
- useMemo() 是一个Hook，它可以缓存函数的执行结果，避免重复计算。
- useMemo() 和ThreeJs结合使用，当从redux的数据传输过来之后，可以用useMemo()缓存数据，避免每次渲染都重新计算。

另外，useMemo() 的关联更新值为['空白']，这样只在第一次组件渲染的时候进行数据的加载和存储，之后如果数据没有变化，ThreeJS则会持续的从内存内读取 uniforms 数据。

当需要更新值，需要配合 react-three/fiber 的 useFrame() 进行更新。相关代码如下：

``` js
import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { useSelector } from 'react-redux'
import * as THREE from 'three'


function Mesh({ VertShader, FragShader }) {
	const noiseCommonProps = useSelector(state => state.noiseCommonProps)
	const material = useRef()
	/*
	console.log(material.current)
	
	上述代码直接通过useRef()获取到material的实例，但是此时的material.current为undefined，所以无法直接修改uniforms.noiseBright.value
	所以需要在useFrame()中更新uniforms.noiseBright.value

	一般此Hook配合useEffect()一起使用。
	*/
	
	// useMemo()特性:
	// 1. 只在组件渲染时执行一次，返回值会被缓存，避免每次渲染都重新生成
	// 2. 更新依赖值为空，也就是在初始化时，一次将所有依赖值都计算出来，然后缓存起来，之后只要依赖值不变，就直接使用缓存的结果
	//    避免了每次渲染都重新生成新的函数，提高性能，同时为threeJS提供稳定的uniforms
	const uniforms = useMemo(() => ({
		noiseBright: { value: noiseCommonProps.noiseBright },
	}), [])

	useFrame(() => {
		// useRef()特性，每次渲染时，material.current都会更新，初始值为undefined，所以需要判断
		if (material.current) {
			// 每一帧都会更新uniforms.noiseBright.value
			material.current.uniforms.noiseBright.value = noiseCommonProps.noiseBright
		}
	})

	return (
		<mesh>
			<planeGeometry args={[512, 512]} />
			<shaderMaterial ref={material}
				vertexShader={VertShader}
				fragmentShader={FragShader}
				uniforms={uniforms}
			/>
		</mesh>
	)
}
export default function MainCanvas({ VertShader, FragShader }) {

	return (
		<div id='main-canvas'>
			<Canvas camera={{ position: [0, 0, 6.5] }} orthographic={true}>
				<Mesh VertShader={VertShader} FragShader={FragShader} />
			</Canvas>
		</div>
	)
}
```

### 4. useFrame()
- useFrame() 是一个 react-three/fiber 的 Hook，它可以让函数组件在每一帧渲染时执行某些操作。
- useFrame() 通常用来处理动画，比如更新物体的位置、旋转角度、缩放比例等。
- useFrame() 可以传入两个值，分别是 state 和 detale；
    - state 是一个值，具体查看文档所包含的参数意义；
    - detale 是一个时间间隔，单位为秒，表示上一帧和当前帧的时间间隔。重点是此时间间隔是帧之间的时间间隔，随着场景刷新的帧率变化而变化，从而使得动画的画面看起来不会产生撕裂感。
- useFrame() 必须在 Canvas 组件内使用，也就是说需要把 <mesh></mesh> 单独分离为一个独立的组件函数，然后在这个组件函数内使用 useFrame()。
- useFrame() 最后加载到 Canvas 组件内，会自动执行，不需要额外的操作。


# 20241020 日常更新操作记录
### 更新Noise操作顺序：

1. 在 `noiseList.json` 内更新 特性组件路径和 glsl 文件路径；
2. 增加 `noiseName.glsl` 文件；
3. 根据 1 中的引用数据名字，增加 `NoiseName.jsx` 特性组件；
4. 根据 1 中的引用数据名字，增加 `NoiseNameParamsSlice.js` 文件；
5. 根据 2 中的文件名字，在 `store.js` 内做相应的引用配置；
6. 更新 `PropsUniforms.js` 和 `FrameUniforms.js`。