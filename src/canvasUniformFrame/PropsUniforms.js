export function PropsUniforms(noiseName, noiseSpecialProps, hexToRgb) {
  let noiseUniforms = {}
  switch (noiseName) {
    case "voronoiWaterNoise":
      noiseUniforms = {
        noiseOnlyBright: { value: noiseSpecialProps.noiseOnlyBright },
        noiseOnlyContrast: { value: noiseSpecialProps.noiseOnlyContrast },
        noiseSubdivide: { value: noiseSpecialProps.noiseSubdivide },
        noiseCellScale: { value: noiseSpecialProps.noiseCellScale },
        noiseWhiteScale: { value: noiseSpecialProps.noiseWhiteScale },
      }
      break;

    case "sampleNoiseAB":
      noiseUniforms = {
        noiseChooseValue: { value: noiseSpecialProps.noiseType }
      }
      break;

    case "tileableWaterNoise":
      noiseUniforms = {
        onlyBri: { value: noiseSpecialProps.noiseOnlyBright },
        lightScale: { value: noiseSpecialProps.noiseLightScale },
        spacing: { value: noiseSpecialProps.noiseSpacing },
        color1: { value: hexToRgb(noiseSpecialProps.noiseColor) },
        colorRem: { value: noiseSpecialProps.noiseRemoveCol }
      }
      break;
    case "causticsWaterNoise":
      noiseUniforms = {
        onlyBri: { value: noiseSpecialProps.noiseOnlyBright },
        color1: { value: hexToRgb(noiseSpecialProps.noiseColor) },
        color2: { value: hexToRgb(noiseSpecialProps.noiseBackgroundColor) },
        colorRem: { value: noiseSpecialProps.noiseRemoveCol }
      }
      break;

    case "glareWaterNoise":
      noiseUniforms = {
        onlyBri: { value: noiseSpecialProps.noiseOnlyBright },
        eleSize: { value: noiseSpecialProps.noiseElementScale },
        detail: { value: noiseSpecialProps.noiseDetail },
        alpha: { value: noiseSpecialProps.noiseAlphaScale },
        color: { value: hexToRgb(noiseSpecialProps.noiseColor) },
        colorRem: { value: noiseSpecialProps.noiseRemoveCol }
      }
      break;

    case "forkedWaterNoise":
      noiseUniforms = {
        onlyBri: { value: noiseSpecialProps.noiseOnlyBright },
        contrast: { value: noiseSpecialProps.noiseOnlyContrast },
        color1: { value: hexToRgb(noiseSpecialProps.noiseColor) },
        color2: { value: hexToRgb(noiseSpecialProps.noiseBackgroundColor) },
        colorRem: { value: noiseSpecialProps.noiseRemoveCol }
      }
      break;

    case "rainWaterNoise":
      noiseUniforms = {
        onlyBri: { value: noiseSpecialProps.noiseOnlyBright },
        eleSize: { value: noiseSpecialProps.noiseSingleCircleScale },
        alpha: { value: noiseSpecialProps.noiseBlurScale },
        detail: { value: noiseSpecialProps.noiseCircleCount },
        density: { value: noiseSpecialProps.noiseCount }
      }
      break;

    case "smokeNoise":
      noiseUniforms = {
        onlyBri: { value: noiseSpecialProps.noiseOnlyBright },
        delicate: { value: noiseSpecialProps.noiseDelicate },
        broken: { value: noiseSpecialProps.noiseBroken },
        refrac: { value: noiseSpecialProps.noiseRefrac },
        sharkX: { value: noiseSpecialProps.noiseSharkX },
        sharkY: { value: noiseSpecialProps.noiseSharkY },
        warp: { value: noiseSpecialProps.noiseWarp },
        colorGray1: { value: noiseSpecialProps.noiseColorGray1 },
        colorGray2: { value: noiseSpecialProps.noiseColorGray2 },
        colorGray3: { value: noiseSpecialProps.noiseColorGray3 }
      }
      break;

    case "honeycompNoiseB":
      noiseUniforms = {
        delicate: { value: noiseSpecialProps.noiseDelicate },
        broken: { value: noiseSpecialProps.noiseBroken }
      }
      break;

    case "silkNoise":
      noiseUniforms = {
        onlyBri: { value: noiseSpecialProps.noiseOnlyBright },
        delicate: { value: noiseSpecialProps.noiseDelicate },
        broken: { value: noiseSpecialProps.noiseBroken },
        detail: { value: noiseSpecialProps.noiseDetail },
        silkSize: { value: noiseSpecialProps.noiseSilkSize },
        silkContrast: { value: noiseSpecialProps.noiseSilkContrast }
      }
      break;

    case "gridNoise":
      noiseUniforms = {
        maxSize: { value: noiseSpecialProps.noiseMaxSize },
        rotateAngle: { value: noiseSpecialProps.noiseRotateAngle },
        rotate: { value: noiseSpecialProps.noiseRotate }
      }
      break;
    case "voroNoise":
      noiseUniforms = {
        delicate: { value: noiseSpecialProps.noiseDelicate }
      }
      break;

    case "cellNoiseA":
      noiseUniforms = {
        whiteIntensity: { value: noiseSpecialProps.noiseWhiteIntensity }
      }
      break;

    case "cellNoiseB":
      noiseUniforms = {
        whiteIntensity: { value: noiseSpecialProps.noiseWhiteIntensity }
      }
      break;

    case "cellNoiseC":
      noiseUniforms = {
        delicate: { value: noiseSpecialProps.noiseDelicate },
        broken: { value: noiseSpecialProps.noiseBroken }
      }
      break;

    case "bandingGradientsNoise":
      noiseUniforms = {
        repeat: { value: noiseSpecialProps.noiseRepeat },
        speedNoun: { value: noiseSpecialProps.noiseSpeedNoun },
        speedOffset: { value: noiseSpecialProps.noiseSpeedOffset }
      }
      break;

    case "squircleColorNoise":
      noiseUniforms = {
        onlyBri: { value: noiseSpecialProps.noiseOnlyBright },
        saturate: { value: noiseSpecialProps.noiseSaturate },
        hue: { value: noiseSpecialProps.noiseHue },
        colorRem: { value: noiseSpecialProps.noiseRemoveCol }
      }
      break;

    case "circleNoiseA":
      noiseUniforms = {
        singleSize: { value: noiseSpecialProps.noiseSingleSize },
        broken: { value: noiseSpecialProps.noiseBroken },
        refrac: { value: noiseSpecialProps.noiseRefrac },
        sharkX: { value: noiseSpecialProps.noiseSharkX },
        sharkY: { value: noiseSpecialProps.noiseSharkY },
        onlyBri: { value: noiseSpecialProps.noiseOnlyBright },
        hue: { value: noiseSpecialProps.noiseHue },
        saturate: { value: noiseSpecialProps.noiseSaturate },
        colorRem: { value: noiseSpecialProps.noiseRemoveCol }
      }
      break;

    case "circleNoiseB":
      noiseUniforms = {
        color1: { value: hexToRgb(noiseSpecialProps.noiseColor1) },
        color2: { value: hexToRgb(noiseSpecialProps.noiseColor2) },
        hue: { value: noiseSpecialProps.noiseHue },
        saturate: { value: noiseSpecialProps.noiseSaturate },
        onlyBri: { value: noiseSpecialProps.noiseOnlyBright },
        colorRem: { value: noiseSpecialProps.noiseRemoveCol }
      }

    case "circleNoiseC":
      noiseUniforms = {
        color1: { value: hexToRgb(noiseSpecialProps.noiseColor1) },
        color2: { value: hexToRgb(noiseSpecialProps.noiseColor2) },
        sharkX: { value: noiseSpecialProps.noiseSharkX },
        sharkY: { value: noiseSpecialProps.noiseSharkY },
        hue: { value: noiseSpecialProps.noiseHue },
        saturate: { value: noiseSpecialProps.noiseSaturate },
        onlyBri: { value: noiseSpecialProps.noiseOnlyBright },
        colorRem: { value: noiseSpecialProps.noiseRemoveCol }
      }
      break;

    case "isovaluesNoise":
      noiseUniforms = {
        lineSize: { value: noiseSpecialProps.noiseLineSize },
        sharkX: { value: noiseSpecialProps.noiseSharkX },
        sharkY: { value: noiseSpecialProps.noiseSharkY },
        speed: { value: noiseSpecialProps.noiseSpeed },
        colorRem: { value: noiseSpecialProps.noiseRemoveCol }
      }
      break;

    case "knitNoiseA":
      noiseUniforms = {
        onlyBri: { value: noiseSpecialProps.noiseOnlyBright },
        sharkX: { value: noiseSpecialProps.noiseSharkX },
        sharkY: { value: noiseSpecialProps.noiseSharkY },
        hue: { value: noiseSpecialProps.noiseHue },
        saturate: { value: noiseSpecialProps.noiseSaturate }
      }
      break;

    case "knitNoiseB":
      noiseUniforms = {
        sharkX: { value: noiseSpecialProps.noiseSharkX },
        sharkY: { value: noiseSpecialProps.noiseSharkY },
        hue: { value: noiseSpecialProps.noiseHue },
        saturate: { value: noiseSpecialProps.noiseSaturate },
        color1: { value: hexToRgb(noiseSpecialProps.noiseColor1) },
        color2: { value: hexToRgb(noiseSpecialProps.noiseColor2) },
        color3: { value: hexToRgb(noiseSpecialProps.noiseColor3) },
        colorRem: { value: noiseSpecialProps.noiseRemoveCol }
      }
      break;

    case "knitNoiseC":
      noiseUniforms = {
        sharkX: { value: noiseSpecialProps.noiseSharkX },
        sharkY: { value: noiseSpecialProps.noiseSharkY },
        hue: { value: noiseSpecialProps.noiseHue },
        saturate: { value: noiseSpecialProps.noiseSaturate },
        color1: { value: hexToRgb(noiseSpecialProps.noiseColor1) },
        color2: { value: hexToRgb(noiseSpecialProps.noiseColor2) },
        colorRem: { value: noiseSpecialProps.noiseRemoveCol }
      }
      break;

    case "knitNoiseD":
      noiseUniforms = {
        sharkX: { value: noiseSpecialProps.noiseSharkX },
        sharkY: { value: noiseSpecialProps.noiseSharkY },
        hue: { value: noiseSpecialProps.noiseHue },
        saturate: { value: noiseSpecialProps.noiseSaturate },
        color1: { value: hexToRgb(noiseSpecialProps.noiseColor1) },
        color2: { value: hexToRgb(noiseSpecialProps.noiseColor2) },
        colorRem: { value: noiseSpecialProps.noiseRemoveCol }
      }
      break;

    case "knitNoiseE":
      noiseUniforms = {
        sharkX: { value: noiseSpecialProps.noiseSharkX },
        sharkY: { value: noiseSpecialProps.noiseSharkY }
      }
      break;

    case "knitNoiseF":
      noiseUniforms = {
        sharkX: { value: noiseSpecialProps.noiseSharkX },
        sharkY: { value: noiseSpecialProps.noiseSharkY },
        hue: { value: noiseSpecialProps.noiseHue },
        color1: { value: hexToRgb(noiseSpecialProps.noiseColor1) },
        color2: { value: hexToRgb(noiseSpecialProps.noiseColor2) },
        color3: { value: hexToRgb(noiseSpecialProps.noiseColor3) },
        colorRem: { value: noiseSpecialProps.noiseRemoveCol }
      }
      break;

    case "fireNoiseA":
      noiseUniforms = {
        detail: { value: noiseSpecialProps.noiseDetail },
        sharkX: { value: noiseSpecialProps.noiseSharkX },
        sharkY: { value: noiseSpecialProps.noiseSharkY },
        hue: { value: noiseSpecialProps.noiseHue },
        saturate: { value: noiseSpecialProps.noiseSaturate },
        onlyBri: { value: noiseSpecialProps.noiseOnlyBright },
        speed: { value: noiseSpecialProps.noiseSpeed },
        color1: { value: hexToRgb(noiseSpecialProps.noiseColor1) },
        color2: { value: hexToRgb(noiseSpecialProps.noiseColor2) },
        color3: { value: hexToRgb(noiseSpecialProps.noiseColor3) },
        color4: { value: hexToRgb(noiseSpecialProps.noiseColor4) },
        colorRem: { value: noiseSpecialProps.noiseRemoveCol }
      }
      break;

    case "fireNoiseB":
      noiseUniforms = {
        detail: { value: noiseSpecialProps.noiseDetail },
        saturate: { value: noiseSpecialProps.noiseSaturate },
        onlyBri: { value: noiseSpecialProps.noiseOnlyBright },
        speed: { value: noiseSpecialProps.noiseSpeed },
        color1: { value: hexToRgb(noiseSpecialProps.noiseColor1) },
        color2: { value: hexToRgb(noiseSpecialProps.noiseColor2) },
        color3: { value: hexToRgb(noiseSpecialProps.noiseColor3) },
        color4: { value: hexToRgb(noiseSpecialProps.noiseColor4) },
        color5: { value: hexToRgb(noiseSpecialProps.noiseColor5) },
        colorRem: { value: noiseSpecialProps.noiseRemoveCol }
      }
      break;

    case "etherNoiseA":
      noiseUniforms = {
        sharkX: { value: noiseSpecialProps.noiseSharkX },
        sharkY: { value: noiseSpecialProps.noiseSharkY },
        hue: { value: noiseSpecialProps.noiseHue },
        saturate: { value: noiseSpecialProps.noiseSaturate },
        onlyBri: { value: noiseSpecialProps.noiseOnlyBright },
        speed: { value: noiseSpecialProps.noiseSpeed },
        color1: { value: hexToRgb(noiseSpecialProps.noiseColor1) },
        colorRem: { value: noiseSpecialProps.noiseRemoveCol }
      }
      break;

    case "etherNoiseB":
      noiseUniforms = {
        speed: { value: noiseSpecialProps.noiseSpeed },
        color1: { value: hexToRgb(noiseSpecialProps.noiseColor1) },
        color2: { value: hexToRgb(noiseSpecialProps.noiseColor2) },
        colorRem: { value: noiseSpecialProps.noiseRemoveCol }
      }
      break;

    case "etherNoiseC":
      noiseUniforms = {
        sharkX: { value: noiseSpecialProps.noiseSharkX },
        sharkY: { value: noiseSpecialProps.noiseSharkY },
        sharkZ: { value: noiseSpecialProps.noiseSharkZ },
        hue: { value: noiseSpecialProps.noiseHue },
        saturate: { value: noiseSpecialProps.noiseSaturate },
        onlyBri: { value: noiseSpecialProps.noiseOnlyBright },
        speed: { value: noiseSpecialProps.noiseSpeed },
        colorRem: { value: noiseSpecialProps.noiseRemoveCol }
      }
      break;

    case "taiji":
      noiseUniforms = {
        sharkX: { value: noiseSpecialProps.noiseSharkX },
        sharkY: { value: noiseSpecialProps.noiseSharkY },
        speed: { value: noiseSpecialProps.noiseSpeed }
      }
      break;

    case "eye":
      noiseUniforms = {
        onlyBri: { value: noiseSpecialProps.noiseOnlyBright },
        sharkX: { value: noiseSpecialProps.noiseSharkX },
        sharkY: { value: noiseSpecialProps.noiseSharkY },
        speed: { value: noiseSpecialProps.noiseSpeed },
        color1: { value: hexToRgb(noiseSpecialProps.noiseColor1) },
        color2: { value: hexToRgb(noiseSpecialProps.noiseColor2) },
        color3: { value: hexToRgb(noiseSpecialProps.noiseColor3) },
        color4: { value: hexToRgb(noiseSpecialProps.noiseColor4) },
        color5: { value: hexToRgb(noiseSpecialProps.noiseColor5) },
        colorRem: { value: noiseSpecialProps.noiseRemoveCol }
      }
      break;

    case "brushNoiseA":
      noiseUniforms = {
        sharkX: { value: noiseSpecialProps.noiseSharkX },
        color1: { value: hexToRgb(noiseSpecialProps.noiseColor1) },
        color2: { value: hexToRgb(noiseSpecialProps.noiseColor2) }
      }
      break;

    case "brushNoiseB":
      noiseUniforms = {
        count: { value: noiseSpecialProps.noiseCount },
        heng: { value: noiseSpecialProps.noiseHeng },
        zong: { value: noiseSpecialProps.noiseZong },
        sharkX: { value: noiseSpecialProps.noiseSharkX },
        color1: { value: hexToRgb(noiseSpecialProps.noiseColor1) },
        color2: { value: hexToRgb(noiseSpecialProps.noiseColor2) }
      }
      break;

    // case 下一个noise

    default:
      break;
  }
  return noiseUniforms;
}