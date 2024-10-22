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

    // 下一个noise参数

    default:
      break;
  }
}