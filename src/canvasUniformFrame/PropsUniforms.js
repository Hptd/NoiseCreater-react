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
      break;

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

    case "hexNoise":
      noiseUniforms = {
        density: { value: noiseSpecialProps.noiseDensity },
        edgeWidth: { value: noiseSpecialProps.noiseEdgeWidth },
        edgeSoft: { value: noiseSpecialProps.noiseEdgeSoft }
      }
      break;

    case "squaresNoise":
      noiseUniforms = {
        gridSize: { value: noiseSpecialProps.noiseGridSize },
        squareSize: { value: noiseSpecialProps.noiseSquareSize },
        sizeAmplitude: { value: noiseSpecialProps.noiseSizeAmplitude },
        speed: { value: noiseSpecialProps.noiseSpeed },
        jitter: { value: noiseSpecialProps.noiseJitter },
        wallThickness: { value: noiseSpecialProps.noiseWallThickness },
        timeScale: { value: noiseSpecialProps.noiseTimeScale },
        bgColor: { value: hexToRgb(noiseSpecialProps.noiseBgColor) },
        colorScale: { value: noiseSpecialProps.noiseColorScale },
        colorBright: { value: noiseSpecialProps.noiseColorBright },
        jitter2: { value: noiseSpecialProps.noiseJitter2 },
        colorRem: { value: noiseSpecialProps.noiseRemoveCol }
      }
      break;

    case "fireNoiseC":
      noiseUniforms = {
        speed: { value: noiseSpecialProps.noiseSpeed },
        rotateSpeed: { value: noiseSpecialProps.noiseRotateSpeed },
        particleSize: { value: noiseSpecialProps.noiseParticleSize },
        layers: { value: noiseSpecialProps.noiseLayers },
        sizeMod: { value: noiseSpecialProps.noiseSizeMod },
        alphaMod: { value: noiseSpecialProps.noiseAlphaMod },
        smokeIntensity: { value: noiseSpecialProps.noiseSmokeIntensity },
        sparkColor: { value: hexToRgb(noiseSpecialProps.noiseSparkColor) },
        smokeColor: { value: hexToRgb(noiseSpecialProps.noiseSmokeColor) },
        colorRem: { value: noiseSpecialProps.noiseRemoveCol }
      }
      break;

    case "gyroidNoise":
      noiseUniforms = {
        scale: { value: noiseSpecialProps.noiseScale },
        speed: { value: noiseSpecialProps.noiseSpeed },
        warp: { value: noiseSpecialProps.noiseWarp },
        bump: { value: noiseSpecialProps.noiseBump },
        specular: { value: noiseSpecialProps.noiseSpecular },
        tintStrength: { value: noiseSpecialProps.noiseTintStrength },
        hue: { value: noiseSpecialProps.noiseHue },
        rimColor: { value: hexToRgb(noiseSpecialProps.noiseRimColor) },
        rimPower: { value: noiseSpecialProps.noiseRimPower },
        colorRem: { value: noiseSpecialProps.noiseRemoveCol }
      }
      break;

    case "hexMazeNoise":
      noiseUniforms = {
        density: { value: noiseSpecialProps.noiseDensity },
        hashFreq: { value: noiseSpecialProps.noiseHashFreq },
        intensity: { value: noiseSpecialProps.noiseIntensity },
        threshold: { value: noiseSpecialProps.noiseThreshold },
        seed: { value: noiseSpecialProps.noiseSeed }
      }
      break;

    case "fireSmokeNoise":
      noiseUniforms = {
        speed: { value: noiseSpecialProps.noiseSpeed },
        fireHeight: { value: noiseSpecialProps.noiseFireHeight },
        warp: { value: noiseSpecialProps.noiseWarp },
        falloff: { value: noiseSpecialProps.noiseFalloff },
        flameDensity: { value: noiseSpecialProps.noiseFlameDensity },
        fireSoftness: { value: noiseSpecialProps.noiseFireSoftness },
        fireBrightness: { value: noiseSpecialProps.noiseFireBrightness },
        smokeAmount: { value: noiseSpecialProps.noiseSmokeAmount },
        sparkDensity: { value: noiseSpecialProps.noiseSparkDensity },
        sparkSpeed: { value: noiseSpecialProps.noiseSparkSpeed },
        detail: { value: noiseSpecialProps.noiseDetail },
        flowStrength: { value: noiseSpecialProps.noiseFlowStrength },
        sparkColor: { value: hexToRgb(noiseSpecialProps.noiseSparkColor) },
        colorRem: { value: noiseSpecialProps.noiseRemoveCol }
      }
      break;

    // case 下一个noise

    case "satisfyNoise":
      noiseUniforms = {
        num: { value: noiseSpecialProps.noiseNum },
        speed: { value: noiseSpecialProps.noiseSpeed },
        thick: { value: noiseSpecialProps.noiseThick },
        paletteR: { value: noiseSpecialProps.noisePaletteR },
        paletteG: { value: noiseSpecialProps.noisePaletteG },
        paletteB: { value: noiseSpecialProps.noisePaletteB },
        mirror: { value: noiseSpecialProps.noiseMirror },
        rotate: { value: noiseSpecialProps.noiseRotate },
        rotOfst: { value: noiseSpecialProps.noiseRotOfst },
        triNoise: { value: noiseSpecialProps.noiseTriNoise },
        colorRem: { value: noiseSpecialProps.noiseRemoveCol }
      }
      break;

    case "petroleumNoise":
      noiseUniforms = {
        speed: { value: noiseSpecialProps.noiseSpeed },
        zoom: { value: noiseSpecialProps.noiseZoom },
        size: { value: noiseSpecialProps.noiseSize },
        intensity: { value: noiseSpecialProps.noiseIntensity },
        quant: { value: noiseSpecialProps.noiseQuant },
        scope: { value: noiseSpecialProps.noiseScope },
        timeNoise: { value: noiseSpecialProps.noiseTimeNoise },
        color1: { value: hexToRgb(noiseSpecialProps.noiseColor1) },
        color2: { value: hexToRgb(noiseSpecialProps.noiseColor2) },
        color3: { value: hexToRgb(noiseSpecialProps.noiseColor3) },
        color4: { value: hexToRgb(noiseSpecialProps.noiseColor4) },
        colorRem: { value: noiseSpecialProps.noiseRemoveCol }
      }
      break;

    case "worleyNoise":
      noiseUniforms = {
        scale: { value: noiseSpecialProps.noiseScale },
        speed: { value: noiseSpecialProps.noiseSpeed },
        cStyle: { value: noiseSpecialProps.noiseCStyle },
        cFreq: { value: noiseSpecialProps.noiseCFreq },
        seedDist: { value: noiseSpecialProps.noiseSeedDist },
        smoothMode: { value: noiseSpecialProps.noiseSmooth },
        altColor: { value: noiseSpecialProps.noiseAltColor },
        colorRem: { value: noiseSpecialProps.noiseRemoveCol }
      }
      break;

    case "haloVoroNoise":
      noiseUniforms = {
        octaves: { value: noiseSpecialProps.noiseOctaves },
        amp: { value: noiseSpecialProps.noiseAmplitude },
        freq: { value: noiseSpecialProps.noiseFrequency },
        freqMult: { value: noiseSpecialProps.noiseFreqMult },
        decay: { value: noiseSpecialProps.noiseDecay },
        jitter: { value: noiseSpecialProps.noiseJitter },
        edge: { value: noiseSpecialProps.noiseEdge },
        detailScale: { value: noiseSpecialProps.noiseDetailScale },
        pulse: { value: noiseSpecialProps.noisePulse },
        power: { value: noiseSpecialProps.noisePower },
        boost: { value: noiseSpecialProps.noiseBoost },
        colorR: { value: noiseSpecialProps.noiseColorR },
        colorG: { value: noiseSpecialProps.noiseColorG },
        colorB: { value: noiseSpecialProps.noiseColorB },
        gain: { value: noiseSpecialProps.noiseGain },
        colorRem: { value: noiseSpecialProps.noiseRemoveCol }
      }
      break;

    case "cloudTunnelNoise":
      noiseUniforms = {
        iterations: { value: noiseSpecialProps.noiseIterations },
        timeSpeed: { value: noiseSpecialProps.noiseTimeSpeed },
        forwardSpeed: { value: noiseSpecialProps.noiseForwardSpeed },
        turbulence: { value: noiseSpecialProps.noiseTurbulence },
        warp: { value: noiseSpecialProps.noiseWarp },
        radius: { value: noiseSpecialProps.noiseRadius },
        noiseStart: { value: noiseSpecialProps.noiseNoiseStart },
        noiseEnd: { value: noiseSpecialProps.noiseNoiseEnd },
        noiseFreq: { value: noiseSpecialProps.noiseNoiseFreq },
        noiseIntensity: { value: noiseSpecialProps.noiseNoiseIntensity },
        rotateSpeed: { value: noiseSpecialProps.noiseRotateSpeed },
        translucency: { value: noiseSpecialProps.noiseTranslucency },
        tone: { value: noiseSpecialProps.noiseTone }
      }
      break;

    case "fbmColorNoise":
      noiseUniforms = {
        color1: { value: hexToRgb(noiseSpecialProps.noiseColor1) },
        color2: { value: hexToRgb(noiseSpecialProps.noiseColor2) },
        color3: { value: hexToRgb(noiseSpecialProps.noiseColor3) },
        color4: { value: hexToRgb(noiseSpecialProps.noiseColor4) },
        timeSpeed: { value: noiseSpecialProps.noiseTimeSpeed },
        scale: { value: noiseSpecialProps.noiseScale },
        mixExp1: { value: noiseSpecialProps.noiseMixExp1 },
        mixExp2: { value: noiseSpecialProps.noiseMixExp2 },
        gamma: { value: noiseSpecialProps.noiseGamma },
        lacunarity: { value: noiseSpecialProps.noiseLacunarity },
        roughness: { value: noiseSpecialProps.noiseRoughness },
        lacunarity2: { value: noiseSpecialProps.noiseLacunarity2 },
        roughness2: { value: noiseSpecialProps.noiseRoughness2 },
        warpStrength: { value: noiseSpecialProps.noiseWarpStrength },
        domainWarp: { value: noiseSpecialProps.noiseDomainWarp },
        colorRem: { value: noiseSpecialProps.noiseRemoveCol }
      }
      break;

    case "dashLineNoise":
      noiseUniforms = {
        speed: { value: noiseSpecialProps.noiseSpeed },
        rowThickness: { value: noiseSpecialProps.noiseRowThickness },
        dashFreq: { value: noiseSpecialProps.noiseDashFreq },
        dashScale: { value: noiseSpecialProps.noiseDashScale },
        moveSpeed: { value: noiseSpecialProps.noiseMoveSpeed },
        xOffsetDiv: { value: noiseSpecialProps.noiseXOffsetDiv },
        dashRatio: { value: noiseSpecialProps.noiseDashRatio },
        lineWidth: { value: noiseSpecialProps.noiseLineWidth }
      }
      break;

    case "causticChromaNoise":
      noiseUniforms = {
        octaves: { value: noiseSpecialProps.noiseOctaves },
        refineSteps: { value: noiseSpecialProps.noiseRefineSteps },
        sepSize: { value: noiseSpecialProps.noiseSepSize },
        sepLight: { value: noiseSpecialProps.noiseSepLight },
        sepAnim: { value: noiseSpecialProps.noiseSepAnim },
        causticStrength: { value: noiseSpecialProps.noiseCausticStrength },
        causticRoughness: { value: noiseSpecialProps.noiseCausticRoughness },
        causticAber: { value: noiseSpecialProps.noiseCausticAber },
        scale: { value: noiseSpecialProps.noiseScale },
        colorRem: { value: noiseSpecialProps.noiseRemoveCol }
      }
      break;

    case "boomSmokeNoise":
      noiseUniforms = {
        boomColor1: { value: hexToRgb(noiseSpecialProps.noiseBoomColor1) },
        boomColor2: { value: hexToRgb(noiseSpecialProps.noiseBoomColor2) },
        boomColor3: { value: hexToRgb(noiseSpecialProps.noiseBoomColor3) },
        boomColor4: { value: hexToRgb(noiseSpecialProps.noiseBoomColor4) },
        smokeColor1: { value: hexToRgb(noiseSpecialProps.noiseSmokeColor1) },
        smokeColor2: { value: hexToRgb(noiseSpecialProps.noiseSmokeColor2) },
        smokeColor3: { value: hexToRgb(noiseSpecialProps.noiseSmokeColor3) },
        bgColor: { value: hexToRgb(noiseSpecialProps.noiseBgColor) },
        cycle: { value: noiseSpecialProps.noiseCycle },
        zoom: { value: noiseSpecialProps.noiseZoom },
        boomDistort: { value: noiseSpecialProps.noiseBoomDistort },
        smokeDistort: { value: noiseSpecialProps.noiseSmokeDistort },
        bubbleW: { value: noiseSpecialProps.noiseBubbleW },
        smokeBubbleW: { value: noiseSpecialProps.noiseSmokeBubbleW },
        borderWidth: { value: noiseSpecialProps.noiseBorderWidth },
        mixThreshold: { value: noiseSpecialProps.noiseMixThreshold },
        colorRem: { value: noiseSpecialProps.noiseRemoveCol }
      }
      break;

    case "synthwaveNoise":
      noiseUniforms = {
        speed: { value: noiseSpecialProps.noiseSpeed },
        height: { value: noiseSpecialProps.noiseHeight },
        iterations: { value: noiseSpecialProps.noiseIterations },
        maxDist: { value: noiseSpecialProps.noiseMaxDist },
        epsilon: { value: noiseSpecialProps.noiseEpsilon },
        fov: { value: noiseSpecialProps.noiseFov },
        camHeight: { value: noiseSpecialProps.noiseCamHeight },
        sunSize: { value: noiseSpecialProps.noiseSunSize },
        sunColor: { value: hexToRgb(noiseSpecialProps.noiseSunColor) },
        skyColor: { value: hexToRgb(noiseSpecialProps.noiseSkyColor) },
        hazeColor: { value: hexToRgb(noiseSpecialProps.noiseHazeColor) },
        surfaceColor: { value: hexToRgb(noiseSpecialProps.noiseSurfaceColor) },
        glowColor: { value: hexToRgb(noiseSpecialProps.noiseGlowColor) },
        fogDensity: { value: noiseSpecialProps.noiseFogDensity },
        waveAmp: { value: noiseSpecialProps.noiseWaveAmp },
        waveFreq: { value: noiseSpecialProps.noiseWaveFreq },
        colorRem: { value: noiseSpecialProps.noiseRemoveCol }
      }
      break;

    case "cloudSkyNoise":
      noiseUniforms = {
        cloudscale: { value: noiseSpecialProps.noiseCloudScale },
        speed: { value: noiseSpecialProps.noiseSpeed },
        clouddark: { value: noiseSpecialProps.noiseCloudDark },
        cloudlight: { value: noiseSpecialProps.noiseCloudLight },
        cloudcover: { value: noiseSpecialProps.noiseCloudCover },
        cloudalpha: { value: noiseSpecialProps.noiseCloudAlpha },
        skytint: { value: noiseSpecialProps.noiseSkyTint },
        skycolour1: { value: hexToRgb(noiseSpecialProps.noiseSkyColor1) },
        skycolour2: { value: hexToRgb(noiseSpecialProps.noiseSkyColor2) },
        cloudcolour: { value: hexToRgb(noiseSpecialProps.noiseCloudColor) },
        warp: { value: noiseSpecialProps.noiseWarp },
        colorRem: { value: noiseSpecialProps.noiseRemoveCol }
      }
      break;

    case "lavaNoise":
      noiseUniforms = {
        speed: { value: noiseSpecialProps.noiseSpeed },
        flowSpeed: { value: noiseSpecialProps.noiseFlowSpeed },
        flowSpeed2: { value: noiseSpecialProps.noiseFlowSpeed2 },
        displacement: { value: noiseSpecialProps.noiseDisplacement },
        advect: { value: noiseSpecialProps.noiseAdvect },
        dispFreq: { value: noiseSpecialProps.noiseDispFreq },
        rotSpeed: { value: noiseSpecialProps.noiseRotSpeed },
        ridgeFreq: { value: noiseSpecialProps.noiseRidgeFreq },
        octaves: { value: noiseSpecialProps.noiseOctaves },
        gain: { value: noiseSpecialProps.noiseGain },
        octaveScale: { value: noiseSpecialProps.noiseOctaveScale },
        baseScale: { value: noiseSpecialProps.noiseBaseScale },
        color1: { value: hexToRgb(noiseSpecialProps.noiseColor) },
        gamma: { value: noiseSpecialProps.noiseGamma },
        colorRem: { value: noiseSpecialProps.noiseRemoveCol }
      }
      break;

    case "sphereNoise":
      noiseUniforms = {
        slices: { value: noiseSpecialProps.noiseSlices },
        amplitude: { value: noiseSpecialProps.noiseAmplitude },
        frequency: { value: noiseSpecialProps.noiseFrequency },
        density: { value: noiseSpecialProps.noiseDensity },
        animSpeed: { value: noiseSpecialProps.noiseAnimSpeed },
        scale: { value: noiseSpecialProps.noiseScale },
        radius: { value: noiseSpecialProps.noiseRadius },
        camZ: { value: noiseSpecialProps.noiseCamZ },
        rotAngle: { value: noiseSpecialProps.noiseRotAngle },
        colorRem: { value: noiseSpecialProps.noiseRemoveCol }
      }
      break;

    case "particleNoise":
      noiseUniforms = {
        particleIterations: { value: noiseSpecialProps.noiseParticleIterations },
        scale: { value: noiseSpecialProps.noiseScale },
        speed: { value: noiseSpecialProps.noiseSpeed },
        displaceFreq: { value: noiseSpecialProps.noiseDisplaceFreq },
        displaceStrength: { value: noiseSpecialProps.noiseDisplaceStrength },
        particleRadius: { value: noiseSpecialProps.noiseParticleRadius },
        particleRadius2: { value: noiseSpecialProps.noiseParticleRadius2 },
        particleSizeVar: { value: noiseSpecialProps.noiseParticleSizeVar },
        randomSize: { value: noiseSpecialProps.noiseRandomSize },
        particleColor: { value: hexToRgb(noiseSpecialProps.noiseParticleColor) },
        partBright: { value: noiseSpecialProps.noiseParticleBright },
        glowThreshold: { value: noiseSpecialProps.noiseGlowThreshold },
        glowPower: { value: noiseSpecialProps.noiseGlowPower },
        blurStrength: { value: noiseSpecialProps.noiseBlurStrength },
        blurRange: { value: noiseSpecialProps.noiseBlurRange },
        colorRem: { value: noiseSpecialProps.noiseRemoveCol }
      }
      break;

    case "balatroNoise":
      noiseUniforms = {
        spinRotation: { value: noiseSpecialProps.noiseSpinRotation },
        spinSpeed: { value: noiseSpecialProps.noiseSpinSpeed },
        spinEase: { value: noiseSpecialProps.noiseSpinEase },
        spinAmount: { value: noiseSpecialProps.noiseSpinAmount },
        contrast: { value: noiseSpecialProps.noiseContrast },
        lighting: { value: noiseSpecialProps.noiseLighting },
        pixelFilter: { value: noiseSpecialProps.noisePixelFilter },
        iterations: { value: noiseSpecialProps.noiseIterations },
        scale: { value: noiseSpecialProps.noiseScale },
        paintScale: { value: noiseSpecialProps.noisePaintScale },
        isRotate: { value: noiseSpecialProps.noiseIsRotate },
        color1: { value: hexToRgb(noiseSpecialProps.noiseColor1) },
        color2: { value: hexToRgb(noiseSpecialProps.noiseColor2) },
        color3: { value: hexToRgb(noiseSpecialProps.noiseColor3) },
        colorRem: { value: noiseSpecialProps.noiseRemoveCol }
      }
      break;

    case "hexTerminalNoise":
      noiseUniforms = {
        color: { value: hexToRgb(noiseSpecialProps.noiseColor) },
        hexDensity: { value: noiseSpecialProps.noiseHexDensity },
        fillScale: { value: noiseSpecialProps.noiseFillScale },
        randOffset: { value: noiseSpecialProps.noiseRandOffset },
        gradSpeed: { value: noiseSpecialProps.noiseGradSpeed },
        borderThreshold: { value: noiseSpecialProps.noiseBorderThreshold },
        borderWidth: { value: noiseSpecialProps.noiseBorderWidth },
        edgeContrast: { value: noiseSpecialProps.noiseEdgeContrast },
        fillSpeed: { value: noiseSpecialProps.noiseFillSpeed },
        fillSharp: { value: noiseSpecialProps.noiseFillSharp },
        bgFreq: { value: noiseSpecialProps.noiseBgFreq },
        bgSpeed: { value: noiseSpecialProps.noiseBgSpeed },
        glow: { value: noiseSpecialProps.noiseGlow },
        exposure: { value: noiseSpecialProps.noiseExposure },
        colorRem: { value: noiseSpecialProps.noiseRemoveCol }
      }
      break;

    case "runeRainNoise":
      noiseUniforms = {
        rows: { value: noiseSpecialProps.noiseRows },
        columns: { value: noiseSpecialProps.noiseColumns },
        zoomSpeed: { value: noiseSpecialProps.noiseZoomSpeed },
        rainSpeed: { value: noiseSpecialProps.noiseRainSpeed },
        rainDensity: { value: noiseSpecialProps.noiseRainDensity },
        rainColor: { value: hexToRgb(noiseSpecialProps.noiseRainColor) },
        maxBright: { value: noiseSpecialProps.noiseMaxBright },
        satPower: { value: noiseSpecialProps.noiseSatPower },
        layerScale: { value: noiseSpecialProps.noiseLayerScale },
        runeThickness: { value: noiseSpecialProps.noiseRuneThickness },
        colorRem: { value: noiseSpecialProps.noiseRemoveCol }
      }
      break;

    case "mountainSunsetNoise":
      noiseUniforms = {
        skyColor: { value: hexToRgb(noiseSpecialProps.noiseSkyColor) },
        sunColor: { value: hexToRgb(noiseSpecialProps.noiseSunColor) },
        birdColor: { value: hexToRgb(noiseSpecialProps.noiseBirdColor) },
        sunSize: { value: noiseSpecialProps.noiseSunSize },
        sunX: { value: noiseSpecialProps.noiseSunX },
        sunY: { value: noiseSpecialProps.noiseSunY },
        noiseFreq: { value: noiseSpecialProps.noiseNoiseFreq },
        mountainAmp: { value: noiseSpecialProps.noiseMountainAmp },
        detailAmp: { value: noiseSpecialProps.noiseDetailAmp },
        mountainThreshold: { value: noiseSpecialProps.noiseMountainThreshold },
        fogStrength: { value: noiseSpecialProps.noiseFogStrength },
        globalSpeed: { value: noiseSpecialProps.noiseGlobalSpeed },
        parallaxSpeed: { value: noiseSpecialProps.noiseParallaxSpeed },
        showBird: { value: noiseSpecialProps.noiseShowBird },
        colorRem: { value: noiseSpecialProps.noiseRemoveCol }
      }
      break;

    case "lightningNoise":
      noiseUniforms = {
        seedVal: { value: noiseSpecialProps.noiseSeed },
        steady: { value: noiseSpecialProps.noiseSteady },
        strikePeriod: { value: noiseSpecialProps.noiseStrikePeriod },
        decay: { value: noiseSpecialProps.noiseDecay },
        branchAmount: { value: noiseSpecialProps.noiseBranchAmount },
        branchLength: { value: noiseSpecialProps.noiseBranchLength },
        distortion: { value: noiseSpecialProps.noiseDistortion },
        noiseScale: { value: noiseSpecialProps.noiseNoiseScale },
        doReveal: { value: noiseSpecialProps.noiseDoReveal },
        coreColor: { value: hexToRgb(noiseSpecialProps.noiseCoreColor) },
        sheathColor: { value: hexToRgb(noiseSpecialProps.noiseSheathColor) },
        glowColor: { value: hexToRgb(noiseSpecialProps.noiseGlowColor) },
        colorRem: { value: noiseSpecialProps.noiseRemoveCol }
      }
      break;

    case "liquidWarpNoise":
      noiseUniforms = {
        frequency: { value: noiseSpecialProps.noiseFrequency },
        amplitude: { value: noiseSpecialProps.noiseAmplitude },
        speed: { value: noiseSpecialProps.noiseSpeed },
        degreeSpeed: { value: noiseSpecialProps.noiseDegreeSpeed },
        rotateStrength: { value: noiseSpecialProps.noiseRotateStrength },
        color1: { value: hexToRgb(noiseSpecialProps.noiseColor1) },
        color2: { value: hexToRgb(noiseSpecialProps.noiseColor2) },
        color3: { value: hexToRgb(noiseSpecialProps.noiseColor3) },
        color4: { value: hexToRgb(noiseSpecialProps.noiseColor4) },
        colorRem: { value: noiseSpecialProps.noiseRemoveCol }
      }
      break;

    case "dynamismNoise":
      noiseUniforms = {
        scale: { value: noiseSpecialProps.noiseScale },
        animSpeed: { value: noiseSpecialProps.noiseSpeed },
        octaves: { value: noiseSpecialProps.noiseOctaves },
        decay: { value: noiseSpecialProps.noiseDecay },
        divScale: { value: noiseSpecialProps.noiseDivScale },
        color1: { value: hexToRgb(noiseSpecialProps.noiseColor1) },
        color2: { value: hexToRgb(noiseSpecialProps.noiseColor2) },
        color3: { value: hexToRgb(noiseSpecialProps.noiseColor3) },
        color4: { value: hexToRgb(noiseSpecialProps.noiseColor4) },
        colorRem: { value: noiseSpecialProps.noiseRemoveCol }
      }
      break;

    case "domainWarpNoise":
      noiseUniforms = {
        scale: { value: noiseSpecialProps.noiseScale },
        speed: { value: noiseSpecialProps.noiseSpeed },
        contrast: { value: noiseSpecialProps.noiseContrast },
        color1: { value: hexToRgb(noiseSpecialProps.noiseColor1) },
        color2: { value: hexToRgb(noiseSpecialProps.noiseColor2) },
        color3: { value: hexToRgb(noiseSpecialProps.noiseColor3) },
        color4: { value: hexToRgb(noiseSpecialProps.noiseColor4) },
        color5: { value: hexToRgb(noiseSpecialProps.noiseColor5) },
        color6: { value: hexToRgb(noiseSpecialProps.noiseColor6) },
        colorRem: { value: noiseSpecialProps.noiseRemoveCol }
      }
      break;

    case "trabeculumNoise":
      noiseUniforms = {
        speed: { value: noiseSpecialProps.noiseSpeed },
        steps: { value: noiseSpecialProps.noiseSteps },
        stepSize: { value: noiseSpecialProps.noiseStepSize },
        scale: { value: noiseSpecialProps.noiseScale },
        grad: { value: noiseSpecialProps.noiseGrad },
        threshold: { value: noiseSpecialProps.noiseThreshold },
        fov: { value: noiseSpecialProps.noiseFov },
        camTheta: { value: noiseSpecialProps.noiseCamTheta },
        camPhi: { value: noiseSpecialProps.noiseCamPhi },
        skyColor: { value: hexToRgb(noiseSpecialProps.noiseSkyColor) },
        colorRem: { value: noiseSpecialProps.noiseRemoveCol }
      }
      break;

    case "starGlowNoise":
      noiseUniforms = {
        speed: { value: noiseSpecialProps.noiseSpeed },
        iterations: { value: noiseSpecialProps.noiseIterations },
        octaves: { value: noiseSpecialProps.noiseOctaves },
        fbmScroll: { value: noiseSpecialProps.noiseFbmScroll },
        radius: { value: noiseSpecialProps.noiseRadius },
        tailNoise: { value: noiseSpecialProps.noiseTailNoise },
        shake: { value: noiseSpecialProps.noiseShake },
        gamma: { value: noiseSpecialProps.noiseGamma },
        exposure: { value: noiseSpecialProps.noiseExposure },
        colorRem: { value: noiseSpecialProps.noiseRemoveCol }
      }
      break;

    case "gaborNoise":
      noiseUniforms = {
        noiseChooseValue: { value: noiseSpecialProps.noiseChooseValue },
        speed: { value: noiseSpecialProps.noiseSpeed },
        dirX: { value: noiseSpecialProps.noiseDirX },
        dirY: { value: noiseSpecialProps.noiseDirY },
        lightX: { value: noiseSpecialProps.noiseLightX },
        lightY: { value: noiseSpecialProps.noiseLightY },
        lightZ: { value: noiseSpecialProps.noiseLightZ },
        colorRem: { value: noiseSpecialProps.noiseRemoveCol }
      }
      break;

    case "galacticCloudNoise":
      noiseUniforms = {
        scales: { value: noiseSpecialProps.noiseScales },
        zoomDistance: { value: noiseSpecialProps.noiseZoomDistance },
        speed: { value: noiseSpecialProps.noiseSpeed },
        firstDivision: { value: noiseSpecialProps.noiseFirstDivision },
        fRatio: { value: noiseSpecialProps.noiseFRatio },
        limitDetails: { value: noiseSpecialProps.noiseLimitDetails },
        smoothZone: { value: noiseSpecialProps.noiseSmoothZone },
        clampLevel: { value: noiseSpecialProps.noiseClampLevel },
        theta: { value: noiseSpecialProps.noiseTheta },
        rotSpeed: { value: noiseSpecialProps.noiseRotSpeed },
        centerX: { value: noiseSpecialProps.noiseCenterX },
        centerY: { value: noiseSpecialProps.noiseCenterY },
        seed: { value: noiseSpecialProps.noiseSeed },
        gazConcentration: { value: noiseSpecialProps.noiseGazConcentration }
      }
      break;

    case "worleyEdgeNoise":
      noiseUniforms = {
        scale: { value: noiseSpecialProps.noiseScale },
        speed: { value: noiseSpecialProps.noiseSpeed },
        distScale: { value: noiseSpecialProps.noiseDistScale },
        edgeGain: { value: noiseSpecialProps.noiseEdgeGain },
        edgeOffset: { value: noiseSpecialProps.noiseEdgeOffset },
        hashRatio: { value: noiseSpecialProps.noiseHashRatio },
        hashSeed: { value: noiseSpecialProps.noiseHashSeed }
      }
      break;

    default:
      break;
  }
  return noiseUniforms;
}