const FragShader = /*glsl*/`
varying vec2 vUv;
uniform float uvScale;
uniform float uvMoveX;
uniform float uvMoveY;
uniform float uvScaleX;
uniform float uvScaleY;
uniform float brightness;
uniform float iTime;
uniform bool colorRev;
uniform bool useAlpha;

uniform vec3 color;
uniform float hexDensity;
uniform float fillScale;
uniform float randOffset;
uniform float gradSpeed;
uniform float borderThreshold;
uniform float borderWidth;
uniform float edgeContrast;
uniform float fillSpeed;
uniform float fillSharp;
uniform float bgFreq;
uniform float bgSpeed;
uniform float glow;
uniform float exposure;
uniform bool colorRem;

#define PI 3.141592
#define SC 1.732050

//Simple hash
float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

// Distance to beehive hex border
float beehive_dist(vec2 p) {
    vec2 s = vec2(1.0, SC);
    p = abs(p);
    return max(dot(p, s * 0.5), p.x);
}

// Finds the closest hexagon center
vec4 beehive_center(vec2 p) {
    vec2 s = vec2(1.0, SC);
    vec4 hC = floor(vec4(p, p - vec2(0.5, 1.0)) / vec4(s, s)) + 0.5;
    vec4 h = vec4(p - hC.xy * s, p - (hC.zw + 0.5) * s);
    return (dot(h.xy, h.xy) < dot(h.zw, h.zw))
        ? vec4(h.xy, hC.xy)
        : vec4(h.zw, hC.zw + 9.73);
}

// https://www.shadertoy.com/view/XsGfWV
vec3 aces_tonemap(vec3 colorIn) {
    mat3 m1 = mat3(
        0.59719, 0.07600, 0.02840,
        0.35458, 0.90834, 0.13383,
        0.04823, 0.01566, 0.83777
    );
    mat3 m2 = mat3(
        1.60475, -0.10208, -0.00327,
        -0.53108,  1.10813, -0.07276,
        -0.07367, -0.00605,  1.07602
    );
    vec3 v = m1 * colorIn;
    vec3 a = v * (v + 0.0245786) - 0.000090537;
    vec3 b = v * (0.983729 * v + 0.4329510) + 0.238081;
    return pow(clamp(m2 * (a / b), 0.0, 1.0), vec3(1.0 / 2.2));
}

void main() {
    vec2 st = vec2((vUv.x + uvMoveX) * uvScaleX, (vUv.y + uvMoveY) * uvScaleY) * uvScale;
    // 原式 (2*fragCoord - iResolution.xy)/iResolution.y*0.5，方形平面下等价
    vec2 uv = (2.0 * st - 1.0) * 0.5;

    //Vignette
    vec2 edge = 1.0 - max(1.0 - uv * uv, vec2(0.0));
    float vignette = pow(edge.x * edge.y, 0.45);

    //Map into beehive
    vec2 hexRes = vec2(hexDensity, hexDensity * (32.0 / 42.0) * SC);
    vec4 p = beehive_center(uv * hexRes);

    vec2 fillRes = vec2(fillScale, fillScale * (7.0 / 12.0) * SC);
    vec4 b = fract(
        vec4(
            uv * fillRes - p.xy - vec2(0.5, 0.57735),
            vec2(1.0, 1.1547)
        ) / fillRes.xyxy
    );

    //Random cell offset
    float randOff = hash(p.zw) * randOffset;

    //Circular gradient inside each hex cell
    float angle = -atan(p.y, p.x) / (2.0 * PI) + 0.5;
    float gradient = fract(angle - gradSpeed * iTime + randOff);

    //Beehive
    float g = 1.0 - 2.0 * beehive_dist(p.xy);
    float col = clamp(0.5 + (g - borderThreshold) / borderWidth, 0.0, 1.0);
    col = clamp((min(col, 1.0 - col) * 2.0) / edgeContrast, 0.0, 1.0);

    //Fill effect
    float fill = length(fract(b.xy + 0.5 * b.zw) - vec2(0.5));
    fill = pow(fract(fill - iTime * fillSpeed), fillSharp);

    //Background
    float bg = length(sin(bgFreq * b.zw * randOff + iTime * bgSpeed));

    //Colorize
    vec3 mask = vec3(col * gradient * fill * glow + fill) * color;
    vec3 background = vec3(color * gradient * col + (bg * color)) * vignette;

    //Final Render
    vec3 f = mask + background;
    f = pow(f, vec3(exposure));
    vec3 result = aces_tonemap(f);

    if (colorRem) {
        result = vec3(dot(result, vec3(0.299, 0.587, 0.114)));
    }
    result = max(vec3(0.0), min(vec3(1.0), result + brightness));
    if (colorRev) {
        result = 1.0 - result;
    }
    gl_FragColor = vec4(result, 1.0);
    if (useAlpha) { gl_FragColor.a = max(result.r, max(result.g, result.b)); }
}
`
export default FragShader
