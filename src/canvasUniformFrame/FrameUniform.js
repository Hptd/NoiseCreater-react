export function FrameUniforms(material, noiseSpecialProps, noiseName, hexToRgb) {
  switch (noiseName) {
    case "voronoiWaterNoise":
      material.current.uniforms.noiseOnlyBright.value = noiseSpecialProps.noiseOnlyBright
      material.current.uniforms.noiseOnlyContrast.value = noiseSpecialProps.noiseOnlyContrast
      material.current.uniforms.noiseSubdivide.value = noiseSpecialProps.noiseSubdivide
      material.current.uniforms.noiseCellScale.value = noiseSpecialProps.noiseCellScale
      material.current.uniforms.noiseWhiteScale.value = noiseSpecialProps.noiseWhiteScale
      break;

    case "sampleNoiseAB":
      material.current.uniforms.noiseChooseValue.value = noiseSpecialProps.noiseType
      break;

    case "tileableWaterNoise":
      material.current.uniforms.onlyBri.value = noiseSpecialProps.noiseOnlyBright
      material.current.uniforms.lightScale.value = noiseSpecialProps.noiseLightScale
      material.current.uniforms.spacing.value = noiseSpecialProps.noiseSpacing
      material.current.uniforms.color1.value = hexToRgb(noiseSpecialProps.noiseColor)
      material.current.uniforms.colorRem.value = noiseSpecialProps.noiseRemoveCol
      break;

    case "causticsWaterNoise":
      material.current.uniforms.onlyBri.value = noiseSpecialProps.noiseOnlyBright
      material.current.uniforms.color1.value = hexToRgb(noiseSpecialProps.noiseColor)
      material.current.uniforms.color2.value = hexToRgb(noiseSpecialProps.noiseBackgroundColor)
      material.current.uniforms.colorRem.value = noiseSpecialProps.noiseRemoveCol
      break;

    case "glareWaterNoise":
      material.current.uniforms.onlyBri.value = noiseSpecialProps.noiseOnlyBright
      material.current.uniforms.eleSize.value = noiseSpecialProps.noiseElementScale
      material.current.uniforms.detail.value = noiseSpecialProps.noiseDetail
      material.current.uniforms.alpha.value = noiseSpecialProps.noiseAlphaScale
      material.current.uniforms.color.value = hexToRgb(noiseSpecialProps.noiseColor)
      material.current.uniforms.colorRem.value = noiseSpecialProps.noiseRemoveCol
      break;

    case "forkedWaterNoise":
      material.current.uniforms.onlyBri.value = noiseSpecialProps.noiseOnlyBright
      material.current.uniforms.contrast.value = noiseSpecialProps.noiseOnlyContrast
      material.current.uniforms.color1.value = hexToRgb(noiseSpecialProps.noiseColor)
      material.current.uniforms.color2.value = hexToRgb(noiseSpecialProps.noiseBackgroundColor)
      material.current.uniforms.colorRem.value = noiseSpecialProps.noiseRemoveCol
      break;

    case "rainWaterNoise":
      material.current.uniforms.onlyBri.value = noiseSpecialProps.noiseOnlyBright
      material.current.uniforms.eleSize.value = noiseSpecialProps.noiseSingleCircleScale
      material.current.uniforms.alpha.value = noiseSpecialProps.noiseBlurScale
      material.current.uniforms.detail.value = noiseSpecialProps.noiseCircleCount
      material.current.uniforms.density.value = noiseSpecialProps.noiseCount
      break;

    case "smokeNoise":
      material.current.uniforms.onlyBri.value = noiseSpecialProps.noiseOnlyBright
      material.current.uniforms.delicate.value = noiseSpecialProps.noiseDelicate
      material.current.uniforms.broken.value = noiseSpecialProps.noiseBroken
      material.current.uniforms.refrac.value = noiseSpecialProps.noiseRefrac
      material.current.uniforms.sharkX.value = noiseSpecialProps.noiseSharkX
      material.current.uniforms.sharkY.value = noiseSpecialProps.noiseSharkY
      material.current.uniforms.warp.value = noiseSpecialProps.noiseWarp
      material.current.uniforms.colorGray1.value = noiseSpecialProps.noiseColorGray1
      material.current.uniforms.colorGray2.value = noiseSpecialProps.noiseColorGray2
      material.current.uniforms.colorGray3.value = noiseSpecialProps.noiseColorGray3
      break;

    case "honeycompNoiseB":
      material.current.uniforms.delicate.value = noiseSpecialProps.noiseDelicate
      material.current.uniforms.broken.value = noiseSpecialProps.noiseBroken
      break;

    case "silkNoise":
      material.current.uniforms.onlyBri.value = noiseSpecialProps.noiseOnlyBright
      material.current.uniforms.delicate.value = noiseSpecialProps.noiseDelicate
      material.current.uniforms.broken.value = noiseSpecialProps.noiseBroken
      material.current.uniforms.detail.value = noiseSpecialProps.noiseDetail
      material.current.uniforms.silkSize.value = noiseSpecialProps.noiseSilkSize
      material.current.uniforms.silkContrast.value = noiseSpecialProps.noiseSilkContrast
      break;

    case "gridNoise":
      material.current.uniforms.maxSize.value = noiseSpecialProps.noiseMaxSize
      material.current.uniforms.rotateAngle.value = noiseSpecialProps.noiseRotateAngle
      material.current.uniforms.rotate.value = noiseSpecialProps.noiseRotate
      break;

    case "voroNoise":
      material.current.uniforms.delicate.value = noiseSpecialProps.noiseDelicate
      break;

    case "cellNoiseA":
      material.current.uniforms.whiteIntensity.value = noiseSpecialProps.noiseWhiteIntensity
      break;

    case "cellNoiseB":
      material.current.uniforms.whiteIntensity.value = noiseSpecialProps.noiseWhiteIntensity
      break;

    case "cellNoiseC":
      material.current.uniforms.delicate.value = noiseSpecialProps.noiseDelicate
      material.current.uniforms.broken.value = noiseSpecialProps.noiseBroken
      break;

    case "bandingGradientsNoise":
      material.current.uniforms.repeat.value = noiseSpecialProps.noiseRepeat
      material.current.uniforms.speedNoun.value = noiseSpecialProps.noiseSpeedNoun
      material.current.uniforms.speedOffset.value = noiseSpecialProps.noiseSpeedOffset
      break;

    case "squircleColorNoise":
      material.current.uniforms.onlyBri.value = noiseSpecialProps.noiseOnlyBright
      material.current.uniforms.saturate.value = noiseSpecialProps.noiseSaturate
      material.current.uniforms.hue.value = noiseSpecialProps.noiseHue
      material.current.uniforms.colorRem.value = noiseSpecialProps.noiseRemoveCol
      break;

    case "circleNoiseA":
      material.current.uniforms.singleSize.value = noiseSpecialProps.noiseSingleSize
      material.current.uniforms.broken.value = noiseSpecialProps.noiseBroken
      material.current.uniforms.refrac.value = noiseSpecialProps.noiseRefrac
      material.current.uniforms.sharkX.value = noiseSpecialProps.noiseSharkX
      material.current.uniforms.sharkY.value = noiseSpecialProps.noiseSharkY
      material.current.uniforms.onlyBri.value = noiseSpecialProps.noiseOnlyBright
      material.current.uniforms.hue.value = noiseSpecialProps.noiseHue
      material.current.uniforms.saturate.value = noiseSpecialProps.noiseSaturate
      material.current.uniforms.colorRem.value = noiseSpecialProps.noiseRemoveCol
      break;

    case "circleNoiseB":
      material.current.uniforms.color1.value = hexToRgb(noiseSpecialProps.noiseColor1)
      material.current.uniforms.color2.value = hexToRgb(noiseSpecialProps.noiseColor2)
      material.current.uniforms.hue.value = noiseSpecialProps.noiseHue
      material.current.uniforms.saturate.value = noiseSpecialProps.noiseSaturate
      material.current.uniforms.onlyBri.value = noiseSpecialProps.noiseOnlyBright
      material.current.uniforms.colorRem.value = noiseSpecialProps.noiseRemoveCol
      break;

    case "circleNoiseC":
      material.current.uniforms.color1.value = hexToRgb(noiseSpecialProps.noiseColor1)
      material.current.uniforms.color2.value = hexToRgb(noiseSpecialProps.noiseColor2)
      material.current.uniforms.sharkX.value = noiseSpecialProps.noiseSharkX
      material.current.uniforms.sharkY.value = noiseSpecialProps.noiseSharkY
      material.current.uniforms.hue.value = noiseSpecialProps.noiseHue
      material.current.uniforms.saturate.value = noiseSpecialProps.noiseSaturate
      material.current.uniforms.onlyBri.value = noiseSpecialProps.noiseOnlyBright
      material.current.uniforms.colorRem.value = noiseSpecialProps.noiseRemoveCol
      break;

    case "isovaluesNoise":
      material.current.uniforms.lineSize.value = noiseSpecialProps.noiseLineSize
      material.current.uniforms.sharkX.value = noiseSpecialProps.noiseSharkX
      material.current.uniforms.sharkY.value = noiseSpecialProps.noiseSharkY
      material.current.uniforms.speed.value = noiseSpecialProps.noiseSpeed
      material.current.uniforms.colorRem.value = noiseSpecialProps.noiseRemoveCol
      break;

    case "knitNoiseA":
      material.current.uniforms.onlyBri.value = noiseSpecialProps.noiseOnlyBright
      material.current.uniforms.sharkX.value = noiseSpecialProps.noiseSharkX
      material.current.uniforms.sharkY.value = noiseSpecialProps.noiseSharkY
      material.current.uniforms.hue.value = noiseSpecialProps.noiseHue
      material.current.uniforms.saturate.value = noiseSpecialProps.noiseSaturate
      break;

    case "knitNoiseB":
      material.current.uniforms.sharkX.value = noiseSpecialProps.noiseSharkX
      material.current.uniforms.sharkY.value = noiseSpecialProps.noiseSharkY
      material.current.uniforms.hue.value = noiseSpecialProps.noiseHue
      material.current.uniforms.saturate.value = noiseSpecialProps.noiseSaturate
      material.current.uniforms.color1.value = hexToRgb(noiseSpecialProps.noiseColor1)
      material.current.uniforms.color2.value = hexToRgb(noiseSpecialProps.noiseColor2)
      material.current.uniforms.color3.value = hexToRgb(noiseSpecialProps.noiseColor3)
      material.current.uniforms.colorRem.value = noiseSpecialProps.noiseRemoveCol
      break;

    case "knitNoiseC":
      material.current.uniforms.sharkX.value = noiseSpecialProps.noiseSharkX
      material.current.uniforms.sharkY.value = noiseSpecialProps.noiseSharkY
      material.current.uniforms.hue.value = noiseSpecialProps.noiseHue
      material.current.uniforms.saturate.value = noiseSpecialProps.noiseSaturate
      material.current.uniforms.color1.value = hexToRgb(noiseSpecialProps.noiseColor1)
      material.current.uniforms.color2.value = hexToRgb(noiseSpecialProps.noiseColor2)
      material.current.uniforms.colorRem.value = noiseSpecialProps.noiseRemoveCol
      break;

    case "knitNoiseD":
      material.current.uniforms.sharkX.value = noiseSpecialProps.noiseSharkX
      material.current.uniforms.sharkY.value = noiseSpecialProps.noiseSharkY
      material.current.uniforms.hue.value = noiseSpecialProps.noiseHue
      material.current.uniforms.saturate.value = noiseSpecialProps.noiseSaturate
      material.current.uniforms.color1.value = hexToRgb(noiseSpecialProps.noiseColor1)
      material.current.uniforms.color2.value = hexToRgb(noiseSpecialProps.noiseColor2)
      material.current.uniforms.colorRem.value = noiseSpecialProps.noiseRemoveCol
      break;

    case "knitNoiseE":
      material.current.uniforms.sharkX.value = noiseSpecialProps.noiseSharkX
      material.current.uniforms.sharkY.value = noiseSpecialProps.noiseSharkY
      break;

    case "knitNoiseF":
      material.current.uniforms.sharkX.value = noiseSpecialProps.noiseSharkX
      material.current.uniforms.sharkY.value = noiseSpecialProps.noiseSharkY
      material.current.uniforms.hue.value = noiseSpecialProps.noiseHue
      material.current.uniforms.color1.value = hexToRgb(noiseSpecialProps.noiseColor1)
      material.current.uniforms.color2.value = hexToRgb(noiseSpecialProps.noiseColor2)
      material.current.uniforms.color3.value = hexToRgb(noiseSpecialProps.noiseColor3)
      material.current.uniforms.colorRem.value = noiseSpecialProps.noiseRemoveCol
      break;

    case "fireNoiseA":
      material.current.uniforms.detail.value = noiseSpecialProps.noiseDetail
      material.current.uniforms.onlyBri.value = noiseSpecialProps.noiseOnlyBright
      material.current.uniforms.sharkX.value = noiseSpecialProps.noiseSharkX
      material.current.uniforms.sharkY.value = noiseSpecialProps.noiseSharkY
      material.current.uniforms.hue.value = noiseSpecialProps.noiseHue
      material.current.uniforms.saturate.value = noiseSpecialProps.noiseSaturate
      material.current.uniforms.speed.value = noiseSpecialProps.noiseSpeed
      material.current.uniforms.color1.value = hexToRgb(noiseSpecialProps.noiseColor1)
      material.current.uniforms.color2.value = hexToRgb(noiseSpecialProps.noiseColor2)
      material.current.uniforms.color3.value = hexToRgb(noiseSpecialProps.noiseColor3)
      material.current.uniforms.color4.value = hexToRgb(noiseSpecialProps.noiseColor4)
      material.current.uniforms.colorRem.value = noiseSpecialProps.noiseRemoveCol
      break;

    case "fireNoiseB":
      material.current.uniforms.detail.value = noiseSpecialProps.noiseDetail
      material.current.uniforms.onlyBri.value = noiseSpecialProps.noiseOnlyBright
      material.current.uniforms.saturate.value = noiseSpecialProps.noiseSaturate
      material.current.uniforms.speed.value = noiseSpecialProps.noiseSpeed
      material.current.uniforms.color1.value = hexToRgb(noiseSpecialProps.noiseColor1)
      material.current.uniforms.color2.value = hexToRgb(noiseSpecialProps.noiseColor2)
      material.current.uniforms.color3.value = hexToRgb(noiseSpecialProps.noiseColor3)
      material.current.uniforms.color4.value = hexToRgb(noiseSpecialProps.noiseColor4)
      material.current.uniforms.color5.value = hexToRgb(noiseSpecialProps.noiseColor5)
      material.current.uniforms.colorRem.value = noiseSpecialProps.noiseRemoveCol
      break;

    case "etherNoiseA":
      material.current.uniforms.onlyBri.value = noiseSpecialProps.noiseOnlyBright
      material.current.uniforms.sharkX.value = noiseSpecialProps.noiseSharkX
      material.current.uniforms.sharkY.value = noiseSpecialProps.noiseSharkY
      material.current.uniforms.hue.value = noiseSpecialProps.noiseHue
      material.current.uniforms.saturate.value = noiseSpecialProps.noiseSaturate
      material.current.uniforms.speed.value = noiseSpecialProps.noiseSpeed
      material.current.uniforms.color1.value = hexToRgb(noiseSpecialProps.noiseColor1)
      material.current.uniforms.colorRem.value = noiseSpecialProps.noiseRemoveCol
      break;

    case "etherNoiseB":
      material.current.uniforms.speed.value = noiseSpecialProps.noiseSpeed
      material.current.uniforms.color1.value = hexToRgb(noiseSpecialProps.noiseColor1)
      material.current.uniforms.color2.value = hexToRgb(noiseSpecialProps.noiseColor2)
      material.current.uniforms.colorRem.value = noiseSpecialProps.noiseRemoveCol
      break;

    case "etherNoiseC":
      material.current.uniforms.onlyBri.value = noiseSpecialProps.noiseOnlyBright
      material.current.uniforms.sharkX.value = noiseSpecialProps.noiseSharkX
      material.current.uniforms.sharkY.value = noiseSpecialProps.noiseSharkY
      material.current.uniforms.sharkZ.value = noiseSpecialProps.noiseSharkZ
      material.current.uniforms.hue.value = noiseSpecialProps.noiseHue
      material.current.uniforms.saturate.value = noiseSpecialProps.noiseSaturate
      material.current.uniforms.speed.value = noiseSpecialProps.noiseSpeed
      material.current.uniforms.colorRem.value = noiseSpecialProps.noiseRemoveCol
      break;

    case "taiji":
      material.current.uniforms.sharkX.value = noiseSpecialProps.noiseSharkX
      material.current.uniforms.sharkY.value = noiseSpecialProps.noiseSharkY
      material.current.uniforms.speed.value = noiseSpecialProps.noiseSpeed
      break;

    case "eye":
      material.current.uniforms.onlyBri.value = noiseSpecialProps.noiseOnlyBright
      material.current.uniforms.sharkX.value = noiseSpecialProps.noiseSharkX
      material.current.uniforms.sharkY.value = noiseSpecialProps.noiseSharkY
      material.current.uniforms.speed.value = noiseSpecialProps.noiseSpeed
      material.current.uniforms.color1.value = hexToRgb(noiseSpecialProps.noiseColor1)
      material.current.uniforms.color2.value = hexToRgb(noiseSpecialProps.noiseColor2)
      material.current.uniforms.color3.value = hexToRgb(noiseSpecialProps.noiseColor3)
      material.current.uniforms.color4.value = hexToRgb(noiseSpecialProps.noiseColor4)
      material.current.uniforms.color5.value = hexToRgb(noiseSpecialProps.noiseColor5)
      material.current.uniforms.colorRem.value = noiseSpecialProps.noiseRemoveCol
      break;

    case "brushNoiseA":
      material.current.uniforms.sharkX.value = noiseSpecialProps.noiseSharkX
      material.current.uniforms.color1.value = hexToRgb(noiseSpecialProps.noiseColor1)
      material.current.uniforms.color2.value = hexToRgb(noiseSpecialProps.noiseColor2)
      break;
    
    case "brushNoiseB":
      material.current.uniforms.count.value = noiseSpecialProps.noiseCount
      material.current.uniforms.heng.value = noiseSpecialProps.noiseHeng
      material.current.uniforms.zong.value = noiseSpecialProps.noiseZong
      material.current.uniforms.sharkX.value = noiseSpecialProps.noiseSharkX
      material.current.uniforms.color1.value = hexToRgb(noiseSpecialProps.noiseColor1)
      material.current.uniforms.color2.value = hexToRgb(noiseSpecialProps.noiseColor2)
      break;

    case "hexNoise":
      material.current.uniforms.density.value = noiseSpecialProps.noiseDensity
      material.current.uniforms.edgeWidth.value = noiseSpecialProps.noiseEdgeWidth
      material.current.uniforms.edgeSoft.value = noiseSpecialProps.noiseEdgeSoft
      break;

    case "squaresNoise":
      material.current.uniforms.gridSize.value = noiseSpecialProps.noiseGridSize
      material.current.uniforms.squareSize.value = noiseSpecialProps.noiseSquareSize
      material.current.uniforms.sizeAmplitude.value = noiseSpecialProps.noiseSizeAmplitude
      material.current.uniforms.speed.value = noiseSpecialProps.noiseSpeed
      material.current.uniforms.jitter.value = noiseSpecialProps.noiseJitter
      material.current.uniforms.wallThickness.value = noiseSpecialProps.noiseWallThickness
      material.current.uniforms.timeScale.value = noiseSpecialProps.noiseTimeScale
      material.current.uniforms.bgColor.value = hexToRgb(noiseSpecialProps.noiseBgColor)
      material.current.uniforms.colorScale.value = noiseSpecialProps.noiseColorScale
      material.current.uniforms.colorBright.value = noiseSpecialProps.noiseColorBright
      material.current.uniforms.jitter2.value = noiseSpecialProps.noiseJitter2
      material.current.uniforms.colorRem.value = noiseSpecialProps.noiseRemoveCol
      break;

    case "fireNoiseC":
      material.current.uniforms.speed.value = noiseSpecialProps.noiseSpeed
      material.current.uniforms.rotateSpeed.value = noiseSpecialProps.noiseRotateSpeed
      material.current.uniforms.particleSize.value = noiseSpecialProps.noiseParticleSize
      material.current.uniforms.layers.value = noiseSpecialProps.noiseLayers
      material.current.uniforms.sizeMod.value = noiseSpecialProps.noiseSizeMod
      material.current.uniforms.alphaMod.value = noiseSpecialProps.noiseAlphaMod
      material.current.uniforms.smokeIntensity.value = noiseSpecialProps.noiseSmokeIntensity
      material.current.uniforms.sparkColor.value = hexToRgb(noiseSpecialProps.noiseSparkColor)
      material.current.uniforms.smokeColor.value = hexToRgb(noiseSpecialProps.noiseSmokeColor)
      material.current.uniforms.colorRem.value = noiseSpecialProps.noiseRemoveCol
      break;

    case "gyroidNoise":
      material.current.uniforms.scale.value = noiseSpecialProps.noiseScale
      material.current.uniforms.speed.value = noiseSpecialProps.noiseSpeed
      material.current.uniforms.warp.value = noiseSpecialProps.noiseWarp
      material.current.uniforms.bump.value = noiseSpecialProps.noiseBump
      material.current.uniforms.specular.value = noiseSpecialProps.noiseSpecular
      material.current.uniforms.tintStrength.value = noiseSpecialProps.noiseTintStrength
      material.current.uniforms.hue.value = noiseSpecialProps.noiseHue
      material.current.uniforms.rimColor.value = hexToRgb(noiseSpecialProps.noiseRimColor)
      material.current.uniforms.rimPower.value = noiseSpecialProps.noiseRimPower
      material.current.uniforms.colorRem.value = noiseSpecialProps.noiseRemoveCol
      break;

    case "hexMazeNoise":
      material.current.uniforms.density.value = noiseSpecialProps.noiseDensity
      material.current.uniforms.hashFreq.value = noiseSpecialProps.noiseHashFreq
      material.current.uniforms.intensity.value = noiseSpecialProps.noiseIntensity
      material.current.uniforms.threshold.value = noiseSpecialProps.noiseThreshold
      material.current.uniforms.seed.value = noiseSpecialProps.noiseSeed
      break;

    case "fireSmokeNoise":
      material.current.uniforms.speed.value = noiseSpecialProps.noiseSpeed
      material.current.uniforms.fireHeight.value = noiseSpecialProps.noiseFireHeight
      material.current.uniforms.warp.value = noiseSpecialProps.noiseWarp
      material.current.uniforms.falloff.value = noiseSpecialProps.noiseFalloff
      material.current.uniforms.flameDensity.value = noiseSpecialProps.noiseFlameDensity
      material.current.uniforms.fireSoftness.value = noiseSpecialProps.noiseFireSoftness
      material.current.uniforms.fireBrightness.value = noiseSpecialProps.noiseFireBrightness
      material.current.uniforms.smokeAmount.value = noiseSpecialProps.noiseSmokeAmount
      material.current.uniforms.sparkDensity.value = noiseSpecialProps.noiseSparkDensity
      material.current.uniforms.sparkSpeed.value = noiseSpecialProps.noiseSparkSpeed
      material.current.uniforms.detail.value = noiseSpecialProps.noiseDetail
      material.current.uniforms.flowStrength.value = noiseSpecialProps.noiseFlowStrength
      material.current.uniforms.sparkColor.value = hexToRgb(noiseSpecialProps.noiseSparkColor)
      material.current.uniforms.colorRem.value = noiseSpecialProps.noiseRemoveCol
      break;

    // 下一个noise参数

    case "satisfyNoise":
      material.current.uniforms.num.value = noiseSpecialProps.noiseNum
      material.current.uniforms.speed.value = noiseSpecialProps.noiseSpeed
      material.current.uniforms.thick.value = noiseSpecialProps.noiseThick
      material.current.uniforms.paletteR.value = noiseSpecialProps.noisePaletteR
      material.current.uniforms.paletteG.value = noiseSpecialProps.noisePaletteG
      material.current.uniforms.paletteB.value = noiseSpecialProps.noisePaletteB
      material.current.uniforms.mirror.value = noiseSpecialProps.noiseMirror
      material.current.uniforms.rotate.value = noiseSpecialProps.noiseRotate
      material.current.uniforms.rotOfst.value = noiseSpecialProps.noiseRotOfst
      material.current.uniforms.triNoise.value = noiseSpecialProps.noiseTriNoise
      material.current.uniforms.colorRem.value = noiseSpecialProps.noiseRemoveCol
      break;

    case "petroleumNoise":
      material.current.uniforms.speed.value = noiseSpecialProps.noiseSpeed
      material.current.uniforms.zoom.value = noiseSpecialProps.noiseZoom
      material.current.uniforms.size.value = noiseSpecialProps.noiseSize
      material.current.uniforms.intensity.value = noiseSpecialProps.noiseIntensity
      material.current.uniforms.quant.value = noiseSpecialProps.noiseQuant
      material.current.uniforms.scope.value = noiseSpecialProps.noiseScope
      material.current.uniforms.timeNoise.value = noiseSpecialProps.noiseTimeNoise
      material.current.uniforms.color1.value = hexToRgb(noiseSpecialProps.noiseColor1)
      material.current.uniforms.color2.value = hexToRgb(noiseSpecialProps.noiseColor2)
      material.current.uniforms.color3.value = hexToRgb(noiseSpecialProps.noiseColor3)
      material.current.uniforms.color4.value = hexToRgb(noiseSpecialProps.noiseColor4)
      material.current.uniforms.colorRem.value = noiseSpecialProps.noiseRemoveCol
      break;

    case "worleyNoise":
      material.current.uniforms.scale.value = noiseSpecialProps.noiseScale
      material.current.uniforms.speed.value = noiseSpecialProps.noiseSpeed
      material.current.uniforms.cStyle.value = noiseSpecialProps.noiseCStyle
      material.current.uniforms.cFreq.value = noiseSpecialProps.noiseCFreq
      material.current.uniforms.seedDist.value = noiseSpecialProps.noiseSeedDist
      material.current.uniforms.smoothMode.value = noiseSpecialProps.noiseSmooth
      material.current.uniforms.altColor.value = noiseSpecialProps.noiseAltColor
      material.current.uniforms.colorRem.value = noiseSpecialProps.noiseRemoveCol
      break;

    case "haloVoroNoise":
      material.current.uniforms.octaves.value = noiseSpecialProps.noiseOctaves
      material.current.uniforms.amp.value = noiseSpecialProps.noiseAmplitude
      material.current.uniforms.freq.value = noiseSpecialProps.noiseFrequency
      material.current.uniforms.freqMult.value = noiseSpecialProps.noiseFreqMult
      material.current.uniforms.decay.value = noiseSpecialProps.noiseDecay
      material.current.uniforms.jitter.value = noiseSpecialProps.noiseJitter
      material.current.uniforms.edge.value = noiseSpecialProps.noiseEdge
      material.current.uniforms.detailScale.value = noiseSpecialProps.noiseDetailScale
      material.current.uniforms.pulse.value = noiseSpecialProps.noisePulse
      material.current.uniforms.power.value = noiseSpecialProps.noisePower
      material.current.uniforms.boost.value = noiseSpecialProps.noiseBoost
      material.current.uniforms.colorR.value = noiseSpecialProps.noiseColorR
      material.current.uniforms.colorG.value = noiseSpecialProps.noiseColorG
      material.current.uniforms.colorB.value = noiseSpecialProps.noiseColorB
      material.current.uniforms.gain.value = noiseSpecialProps.noiseGain
      material.current.uniforms.colorRem.value = noiseSpecialProps.noiseRemoveCol
      break;

    case "cloudTunnelNoise":
      material.current.uniforms.iterations.value = noiseSpecialProps.noiseIterations
      material.current.uniforms.timeSpeed.value = noiseSpecialProps.noiseTimeSpeed
      material.current.uniforms.forwardSpeed.value = noiseSpecialProps.noiseForwardSpeed
      material.current.uniforms.turbulence.value = noiseSpecialProps.noiseTurbulence
      material.current.uniforms.warp.value = noiseSpecialProps.noiseWarp
      material.current.uniforms.radius.value = noiseSpecialProps.noiseRadius
      material.current.uniforms.noiseStart.value = noiseSpecialProps.noiseNoiseStart
      material.current.uniforms.noiseEnd.value = noiseSpecialProps.noiseNoiseEnd
      material.current.uniforms.noiseFreq.value = noiseSpecialProps.noiseNoiseFreq
      material.current.uniforms.noiseIntensity.value = noiseSpecialProps.noiseNoiseIntensity
      material.current.uniforms.rotateSpeed.value = noiseSpecialProps.noiseRotateSpeed
      material.current.uniforms.translucency.value = noiseSpecialProps.noiseTranslucency
      material.current.uniforms.tone.value = noiseSpecialProps.noiseTone
      break;

    case "fbmColorNoise":
      material.current.uniforms.color1.value = hexToRgb(noiseSpecialProps.noiseColor1)
      material.current.uniforms.color2.value = hexToRgb(noiseSpecialProps.noiseColor2)
      material.current.uniforms.color3.value = hexToRgb(noiseSpecialProps.noiseColor3)
      material.current.uniforms.color4.value = hexToRgb(noiseSpecialProps.noiseColor4)
      material.current.uniforms.timeSpeed.value = noiseSpecialProps.noiseTimeSpeed
      material.current.uniforms.scale.value = noiseSpecialProps.noiseScale
      material.current.uniforms.mixExp1.value = noiseSpecialProps.noiseMixExp1
      material.current.uniforms.mixExp2.value = noiseSpecialProps.noiseMixExp2
      material.current.uniforms.gamma.value = noiseSpecialProps.noiseGamma
      material.current.uniforms.lacunarity.value = noiseSpecialProps.noiseLacunarity
      material.current.uniforms.roughness.value = noiseSpecialProps.noiseRoughness
      material.current.uniforms.lacunarity2.value = noiseSpecialProps.noiseLacunarity2
      material.current.uniforms.roughness2.value = noiseSpecialProps.noiseRoughness2
      material.current.uniforms.warpStrength.value = noiseSpecialProps.noiseWarpStrength
      material.current.uniforms.domainWarp.value = noiseSpecialProps.noiseDomainWarp
      material.current.uniforms.colorRem.value = noiseSpecialProps.noiseRemoveCol
      break;

    case "dashLineNoise":
      material.current.uniforms.speed.value = noiseSpecialProps.noiseSpeed
      material.current.uniforms.rowThickness.value = noiseSpecialProps.noiseRowThickness
      material.current.uniforms.dashFreq.value = noiseSpecialProps.noiseDashFreq
      material.current.uniforms.dashScale.value = noiseSpecialProps.noiseDashScale
      material.current.uniforms.moveSpeed.value = noiseSpecialProps.noiseMoveSpeed
      material.current.uniforms.xOffsetDiv.value = noiseSpecialProps.noiseXOffsetDiv
      material.current.uniforms.dashRatio.value = noiseSpecialProps.noiseDashRatio
      material.current.uniforms.lineWidth.value = noiseSpecialProps.noiseLineWidth
      break;

    default:
      break;
  }
}