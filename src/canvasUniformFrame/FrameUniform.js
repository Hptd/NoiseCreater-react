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

    case "causticChromaNoise":
      material.current.uniforms.octaves.value = noiseSpecialProps.noiseOctaves
      material.current.uniforms.refineSteps.value = noiseSpecialProps.noiseRefineSteps
      material.current.uniforms.sepSize.value = noiseSpecialProps.noiseSepSize
      material.current.uniforms.sepLight.value = noiseSpecialProps.noiseSepLight
      material.current.uniforms.sepAnim.value = noiseSpecialProps.noiseSepAnim
      material.current.uniforms.causticStrength.value = noiseSpecialProps.noiseCausticStrength
      material.current.uniforms.causticRoughness.value = noiseSpecialProps.noiseCausticRoughness
      material.current.uniforms.causticAber.value = noiseSpecialProps.noiseCausticAber
      material.current.uniforms.scale.value = noiseSpecialProps.noiseScale
      material.current.uniforms.colorRem.value = noiseSpecialProps.noiseRemoveCol
      break;

    case "boomSmokeNoise":
      material.current.uniforms.boomColor1.value = hexToRgb(noiseSpecialProps.noiseBoomColor1)
      material.current.uniforms.boomColor2.value = hexToRgb(noiseSpecialProps.noiseBoomColor2)
      material.current.uniforms.boomColor3.value = hexToRgb(noiseSpecialProps.noiseBoomColor3)
      material.current.uniforms.boomColor4.value = hexToRgb(noiseSpecialProps.noiseBoomColor4)
      material.current.uniforms.smokeColor1.value = hexToRgb(noiseSpecialProps.noiseSmokeColor1)
      material.current.uniforms.smokeColor2.value = hexToRgb(noiseSpecialProps.noiseSmokeColor2)
      material.current.uniforms.smokeColor3.value = hexToRgb(noiseSpecialProps.noiseSmokeColor3)
      material.current.uniforms.bgColor.value = hexToRgb(noiseSpecialProps.noiseBgColor)
      material.current.uniforms.cycle.value = noiseSpecialProps.noiseCycle
      material.current.uniforms.zoom.value = noiseSpecialProps.noiseZoom
      material.current.uniforms.boomDistort.value = noiseSpecialProps.noiseBoomDistort
      material.current.uniforms.smokeDistort.value = noiseSpecialProps.noiseSmokeDistort
      material.current.uniforms.bubbleW.value = noiseSpecialProps.noiseBubbleW
      material.current.uniforms.smokeBubbleW.value = noiseSpecialProps.noiseSmokeBubbleW
      material.current.uniforms.borderWidth.value = noiseSpecialProps.noiseBorderWidth
      material.current.uniforms.mixThreshold.value = noiseSpecialProps.noiseMixThreshold
      material.current.uniforms.colorRem.value = noiseSpecialProps.noiseRemoveCol
      break;

    case "synthwaveNoise":
      material.current.uniforms.speed.value = noiseSpecialProps.noiseSpeed
      material.current.uniforms.height.value = noiseSpecialProps.noiseHeight
      material.current.uniforms.iterations.value = noiseSpecialProps.noiseIterations
      material.current.uniforms.maxDist.value = noiseSpecialProps.noiseMaxDist
      material.current.uniforms.epsilon.value = noiseSpecialProps.noiseEpsilon
      material.current.uniforms.fov.value = noiseSpecialProps.noiseFov
      material.current.uniforms.camHeight.value = noiseSpecialProps.noiseCamHeight
      material.current.uniforms.sunSize.value = noiseSpecialProps.noiseSunSize
      material.current.uniforms.sunColor.value = hexToRgb(noiseSpecialProps.noiseSunColor)
      material.current.uniforms.skyColor.value = hexToRgb(noiseSpecialProps.noiseSkyColor)
      material.current.uniforms.hazeColor.value = hexToRgb(noiseSpecialProps.noiseHazeColor)
      material.current.uniforms.surfaceColor.value = hexToRgb(noiseSpecialProps.noiseSurfaceColor)
      material.current.uniforms.glowColor.value = hexToRgb(noiseSpecialProps.noiseGlowColor)
      material.current.uniforms.fogDensity.value = noiseSpecialProps.noiseFogDensity
      material.current.uniforms.waveAmp.value = noiseSpecialProps.noiseWaveAmp
      material.current.uniforms.waveFreq.value = noiseSpecialProps.noiseWaveFreq
      material.current.uniforms.colorRem.value = noiseSpecialProps.noiseRemoveCol
      break;

    case "cloudSkyNoise":
      material.current.uniforms.cloudscale.value = noiseSpecialProps.noiseCloudScale
      material.current.uniforms.speed.value = noiseSpecialProps.noiseSpeed
      material.current.uniforms.clouddark.value = noiseSpecialProps.noiseCloudDark
      material.current.uniforms.cloudlight.value = noiseSpecialProps.noiseCloudLight
      material.current.uniforms.cloudcover.value = noiseSpecialProps.noiseCloudCover
      material.current.uniforms.cloudalpha.value = noiseSpecialProps.noiseCloudAlpha
      material.current.uniforms.skytint.value = noiseSpecialProps.noiseSkyTint
      material.current.uniforms.skycolour1.value = hexToRgb(noiseSpecialProps.noiseSkyColor1)
      material.current.uniforms.skycolour2.value = hexToRgb(noiseSpecialProps.noiseSkyColor2)
      material.current.uniforms.cloudcolour.value = hexToRgb(noiseSpecialProps.noiseCloudColor)
      material.current.uniforms.warp.value = noiseSpecialProps.noiseWarp
      material.current.uniforms.colorRem.value = noiseSpecialProps.noiseRemoveCol
      break;

    case "lavaNoise":
      material.current.uniforms.speed.value = noiseSpecialProps.noiseSpeed
      material.current.uniforms.flowSpeed.value = noiseSpecialProps.noiseFlowSpeed
      material.current.uniforms.flowSpeed2.value = noiseSpecialProps.noiseFlowSpeed2
      material.current.uniforms.displacement.value = noiseSpecialProps.noiseDisplacement
      material.current.uniforms.advect.value = noiseSpecialProps.noiseAdvect
      material.current.uniforms.dispFreq.value = noiseSpecialProps.noiseDispFreq
      material.current.uniforms.rotSpeed.value = noiseSpecialProps.noiseRotSpeed
      material.current.uniforms.ridgeFreq.value = noiseSpecialProps.noiseRidgeFreq
      material.current.uniforms.octaves.value = noiseSpecialProps.noiseOctaves
      material.current.uniforms.gain.value = noiseSpecialProps.noiseGain
      material.current.uniforms.octaveScale.value = noiseSpecialProps.noiseOctaveScale
      material.current.uniforms.baseScale.value = noiseSpecialProps.noiseBaseScale
      material.current.uniforms.color1.value = hexToRgb(noiseSpecialProps.noiseColor)
      material.current.uniforms.gamma.value = noiseSpecialProps.noiseGamma
      material.current.uniforms.colorRem.value = noiseSpecialProps.noiseRemoveCol
      break;

    case "sphereNoise":
      material.current.uniforms.slices.value = noiseSpecialProps.noiseSlices
      material.current.uniforms.amplitude.value = noiseSpecialProps.noiseAmplitude
      material.current.uniforms.frequency.value = noiseSpecialProps.noiseFrequency
      material.current.uniforms.density.value = noiseSpecialProps.noiseDensity
      material.current.uniforms.animSpeed.value = noiseSpecialProps.noiseAnimSpeed
      material.current.uniforms.scale.value = noiseSpecialProps.noiseScale
      material.current.uniforms.radius.value = noiseSpecialProps.noiseRadius
      material.current.uniforms.camZ.value = noiseSpecialProps.noiseCamZ
      material.current.uniforms.rotAngle.value = noiseSpecialProps.noiseRotAngle
      material.current.uniforms.colorRem.value = noiseSpecialProps.noiseRemoveCol
      break;

    case "particleNoise":
      material.current.uniforms.particleIterations.value = noiseSpecialProps.noiseParticleIterations
      material.current.uniforms.scale.value = noiseSpecialProps.noiseScale
      material.current.uniforms.speed.value = noiseSpecialProps.noiseSpeed
      material.current.uniforms.displaceFreq.value = noiseSpecialProps.noiseDisplaceFreq
      material.current.uniforms.displaceStrength.value = noiseSpecialProps.noiseDisplaceStrength
      material.current.uniforms.particleRadius.value = noiseSpecialProps.noiseParticleRadius
      material.current.uniforms.particleRadius2.value = noiseSpecialProps.noiseParticleRadius2
      material.current.uniforms.particleSizeVar.value = noiseSpecialProps.noiseParticleSizeVar
      material.current.uniforms.randomSize.value = noiseSpecialProps.noiseRandomSize
      material.current.uniforms.particleColor.value = hexToRgb(noiseSpecialProps.noiseParticleColor)
      material.current.uniforms.partBright.value = noiseSpecialProps.noiseParticleBright
      material.current.uniforms.glowThreshold.value = noiseSpecialProps.noiseGlowThreshold
      material.current.uniforms.glowPower.value = noiseSpecialProps.noiseGlowPower
      material.current.uniforms.blurStrength.value = noiseSpecialProps.noiseBlurStrength
      material.current.uniforms.blurRange.value = noiseSpecialProps.noiseBlurRange
      material.current.uniforms.colorRem.value = noiseSpecialProps.noiseRemoveCol
      break;

    case "balatroNoise":
      material.current.uniforms.spinRotation.value = noiseSpecialProps.noiseSpinRotation
      material.current.uniforms.spinSpeed.value = noiseSpecialProps.noiseSpinSpeed
      material.current.uniforms.spinEase.value = noiseSpecialProps.noiseSpinEase
      material.current.uniforms.spinAmount.value = noiseSpecialProps.noiseSpinAmount
      material.current.uniforms.contrast.value = noiseSpecialProps.noiseContrast
      material.current.uniforms.lighting.value = noiseSpecialProps.noiseLighting
      material.current.uniforms.pixelFilter.value = noiseSpecialProps.noisePixelFilter
      material.current.uniforms.iterations.value = noiseSpecialProps.noiseIterations
      material.current.uniforms.scale.value = noiseSpecialProps.noiseScale
      material.current.uniforms.paintScale.value = noiseSpecialProps.noisePaintScale
      material.current.uniforms.isRotate.value = noiseSpecialProps.noiseIsRotate
      material.current.uniforms.color1.value = hexToRgb(noiseSpecialProps.noiseColor1)
      material.current.uniforms.color2.value = hexToRgb(noiseSpecialProps.noiseColor2)
      material.current.uniforms.color3.value = hexToRgb(noiseSpecialProps.noiseColor3)
      material.current.uniforms.colorRem.value = noiseSpecialProps.noiseRemoveCol
      break;

    case "hexTerminalNoise":
      material.current.uniforms.color.value = hexToRgb(noiseSpecialProps.noiseColor)
      material.current.uniforms.hexDensity.value = noiseSpecialProps.noiseHexDensity
      material.current.uniforms.fillScale.value = noiseSpecialProps.noiseFillScale
      material.current.uniforms.randOffset.value = noiseSpecialProps.noiseRandOffset
      material.current.uniforms.gradSpeed.value = noiseSpecialProps.noiseGradSpeed
      material.current.uniforms.borderThreshold.value = noiseSpecialProps.noiseBorderThreshold
      material.current.uniforms.borderWidth.value = noiseSpecialProps.noiseBorderWidth
      material.current.uniforms.edgeContrast.value = noiseSpecialProps.noiseEdgeContrast
      material.current.uniforms.fillSpeed.value = noiseSpecialProps.noiseFillSpeed
      material.current.uniforms.fillSharp.value = noiseSpecialProps.noiseFillSharp
      material.current.uniforms.bgFreq.value = noiseSpecialProps.noiseBgFreq
      material.current.uniforms.bgSpeed.value = noiseSpecialProps.noiseBgSpeed
      material.current.uniforms.glow.value = noiseSpecialProps.noiseGlow
      material.current.uniforms.exposure.value = noiseSpecialProps.noiseExposure
      material.current.uniforms.colorRem.value = noiseSpecialProps.noiseRemoveCol
      break;

    case "runeRainNoise":
      material.current.uniforms.rows.value = noiseSpecialProps.noiseRows
      material.current.uniforms.columns.value = noiseSpecialProps.noiseColumns
      material.current.uniforms.zoomSpeed.value = noiseSpecialProps.noiseZoomSpeed
      material.current.uniforms.rainSpeed.value = noiseSpecialProps.noiseRainSpeed
      material.current.uniforms.rainDensity.value = noiseSpecialProps.noiseRainDensity
      material.current.uniforms.rainColor.value = hexToRgb(noiseSpecialProps.noiseRainColor)
      material.current.uniforms.maxBright.value = noiseSpecialProps.noiseMaxBright
      material.current.uniforms.satPower.value = noiseSpecialProps.noiseSatPower
      material.current.uniforms.layerScale.value = noiseSpecialProps.noiseLayerScale
      material.current.uniforms.runeThickness.value = noiseSpecialProps.noiseRuneThickness
      material.current.uniforms.colorRem.value = noiseSpecialProps.noiseRemoveCol
      break;

    case "mountainSunsetNoise":
      material.current.uniforms.skyColor.value = hexToRgb(noiseSpecialProps.noiseSkyColor)
      material.current.uniforms.sunColor.value = hexToRgb(noiseSpecialProps.noiseSunColor)
      material.current.uniforms.birdColor.value = hexToRgb(noiseSpecialProps.noiseBirdColor)
      material.current.uniforms.sunSize.value = noiseSpecialProps.noiseSunSize
      material.current.uniforms.sunX.value = noiseSpecialProps.noiseSunX
      material.current.uniforms.sunY.value = noiseSpecialProps.noiseSunY
      material.current.uniforms.noiseFreq.value = noiseSpecialProps.noiseNoiseFreq
      material.current.uniforms.mountainAmp.value = noiseSpecialProps.noiseMountainAmp
      material.current.uniforms.detailAmp.value = noiseSpecialProps.noiseDetailAmp
      material.current.uniforms.mountainThreshold.value = noiseSpecialProps.noiseMountainThreshold
      material.current.uniforms.fogStrength.value = noiseSpecialProps.noiseFogStrength
      material.current.uniforms.globalSpeed.value = noiseSpecialProps.noiseGlobalSpeed
      material.current.uniforms.parallaxSpeed.value = noiseSpecialProps.noiseParallaxSpeed
      material.current.uniforms.showBird.value = noiseSpecialProps.noiseShowBird
      material.current.uniforms.colorRem.value = noiseSpecialProps.noiseRemoveCol
      break;

    case "lightningNoise":
      material.current.uniforms.seedVal.value = noiseSpecialProps.noiseSeed
      material.current.uniforms.steady.value = noiseSpecialProps.noiseSteady
      material.current.uniforms.strikePeriod.value = noiseSpecialProps.noiseStrikePeriod
      material.current.uniforms.decay.value = noiseSpecialProps.noiseDecay
      material.current.uniforms.branchAmount.value = noiseSpecialProps.noiseBranchAmount
      material.current.uniforms.branchLength.value = noiseSpecialProps.noiseBranchLength
      material.current.uniforms.distortion.value = noiseSpecialProps.noiseDistortion
      material.current.uniforms.noiseScale.value = noiseSpecialProps.noiseNoiseScale
      material.current.uniforms.doReveal.value = noiseSpecialProps.noiseDoReveal
      material.current.uniforms.coreColor.value = hexToRgb(noiseSpecialProps.noiseCoreColor)
      material.current.uniforms.sheathColor.value = hexToRgb(noiseSpecialProps.noiseSheathColor)
      material.current.uniforms.glowColor.value = hexToRgb(noiseSpecialProps.noiseGlowColor)
      material.current.uniforms.colorRem.value = noiseSpecialProps.noiseRemoveCol
      break;

    default:
      break;
  }
}