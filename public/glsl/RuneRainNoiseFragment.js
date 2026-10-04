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

uniform float rows;
uniform float columns;
uniform float zoomSpeed;
uniform float rainSpeed;
uniform float rainDensity;
uniform vec3 rainColor;
uniform float maxBright;
uniform float satPower;
uniform float layerScale;
uniform float runeThickness;
uniform bool colorRem;

vec4 hash4(vec2 v) {
    // 原 mat4x2(v * mat...) 等价展开，避免 GLSL ES 1.0 不支持非方阵
    vec4 p = vec4(
        dot(v, vec2(127.1, 311.7)),
        dot(v, vec2(269.5, 183.3)),
        dot(v, vec2(113.5, 271.9)),
        dot(v, vec2(246.1, 124.6))
    );
    return fract(sin(p) * 43758.5453123);
}

float rune_line(vec2 p, vec2 a, vec2 b) {
    p -= a; b -= a;
    float h = clamp(dot(p, b) / dot(b, b), 0., 1.);
    return length(p - b * h);
}

float rune(vec2 U, vec2 seed) {
    float d = 1e5;
    for (int i = 0; i < 4; i++) {
        vec4 pos = hash4(seed);
        seed += 1.;
        if (i == 0) pos.y = .0;
        if (i == 1) pos.x = .999;
        if (i == 2) pos.x = .0;
        if (i == 3) pos.y = .999;
        vec4 snaps = vec4(2, 3, 2, 3);
        pos = (floor(pos * snaps) + .5) / snaps;
        if (pos.xy != pos.zw) {
            d = min(d, rune_line(U, pos.xy, pos.zw + .001));
        }
    }
    return smoothstep(runeThickness, 0., d);
}

float random01(float seed) {
    return fract(sin(dot(vec2(seed), vec2(12.9898, 78.233))) * 43758.5453);
}

float clamp01(float t) {
    return clamp(t, 0., 1.);
}

vec2 clamp01(vec2 t) {
    return clamp(t, 0., 1.);
}

float gridRows(float t) {
    return fract(ceil(t * rows) / rows);
}

float gridColumns(float t) {
    return fract(ceil(t * columns) / columns);
}

vec2 grid(vec2 t) {
    return vec2(gridColumns(t.x), gridRows(t.y));
}

vec2 gridUV(vec2 t) {
    return vec2(fract(t.x * columns), fract(t.y * rows));
}

float leader(vec2 uv, float xpos, float yOffset) {
    xpos = gridColumns(xpos);
    uv.x = gridColumns(uv.x);
    float leader = floor((fract(abs(-yOffset - 1. / rows - uv.y)) + 1. / rows));
    leader *= floor(1. - (abs(xpos - uv.x)));
    return clamp01(leader);
}

float trail(vec2 uv, float xpos, float yOffset) {
    uv = grid(uv);
    xpos = gridColumns(xpos);
    yOffset = gridRows(yOffset);
    float trail = 1. - (fract(abs(-yOffset - uv.y)) + 1. / rows);
    trail = clamp01(trail * 2. - 1.);
    trail *= floor(1. - (abs(xpos - uv.x)));
    return trail;
}

float character(vec2 screenUV, vec2 uv, float index) {
    float id = floor(screenUV.x * columns);
    id += floor((iTime) * rainSpeed * columns * 0.2);
    vec2 seed = vec2(id, index * 100.0);
    vec2 charUV = uv * 1.2 - 0.1;
    return rune(charUV, seed);
}

float trailCharacter(vec2 uv) {
    return character(uv, gridUV(uv), grid(uv).y);
}

float leaderCharacter(vec2 uv, vec2 timeOff) {
    return character(uv, gridUV(uv + fract(timeOff * rows) / rows), grid(uv + fract(timeOff * rows) / rows).y);
}

float func(float t) {
    t = t * 2. - 1.;
    return 1. - pow(max(0., abs(t) * 2. - 1.), 2.5);
}

void main() {
    vec2 st = vec2((vUv.x + uvMoveX) * uvScaleX, (vUv.y + uvMoveY) * uvScaleY) * uvScale;
    vec2 screenUV = st;
    vec2 uv = screenUV;
    vec2 uv2 = screenUV;
    vec2 uv3 = screenUV;

    float t = fract(iTime * zoomSpeed * 2.);
    float t2 = fract(iTime * zoomSpeed * 2. + 0.33);
    float t3 = fract(iTime * zoomSpeed * 2. + 0.66);

    float alpha = (zoomSpeed == 0.0) ? 1.0 : func(t);
    float alpha2 = (zoomSpeed == 0.0) ? 0.5 : func(t2);
    float alpha3 = (zoomSpeed == 0.0) ? 0.25 : func(t3);

    uv *= (1. - t) * layerScale;
    uv += (0.5 * t) * layerScale;
    uv2 *= (1. - t2) * layerScale;
    uv2 += (0.5 * t2) * layerScale;
    uv3 *= (1. - t3) * layerScale;
    uv3 += (0.5 * t3) * layerScale;

    vec2 timeOff = vec2(0., 1.) * iTime * rainSpeed;
    float layer = 0.;

    float mask1 = step(random01(gridColumns(uv.x) * 1337.0), rainDensity);
    layer += trail(uv, uv.x, timeOff.y + random01(gridColumns(uv.x) * 321.421)) * trailCharacter(uv) * alpha * 0.5 * mask1;
    layer += leader(uv, uv.x, timeOff.y + random01(gridColumns(uv.x) * 321.421)) * leaderCharacter(uv, timeOff) * alpha * 1.0 * mask1;

    float mask2 = step(random01(gridColumns(uv2.x) * 1337.0), rainDensity);
    layer += trail(uv2, uv2.x, timeOff.y + random01(gridColumns(uv2.x) * 321.421)) * trailCharacter(uv2) * alpha2 * 0.5 * mask2;
    layer += leader(uv2, uv2.x, timeOff.y + random01(gridColumns(uv2.x) * 321.421)) * leaderCharacter(uv2, timeOff) * alpha2 * 1.0 * mask2;

    float mask3 = step(random01(gridColumns(uv3.x) * 1337.0), rainDensity);
    layer += trail(uv3, uv3.x, timeOff.y + random01(gridColumns(uv3.x) * 321.421)) * trailCharacter(uv3) * alpha3 * 0.5 * mask3;
    layer += leader(uv3, uv3.x, timeOff.y + random01(gridColumns(uv3.x) * 321.421)) * leaderCharacter(uv3, timeOff) * alpha3 * 1.0 * mask3;

    float fin = clamp(layer, 0.0, maxBright);

    float saturation = clamp(1. - pow(fin, satPower), 0., 1.);
    vec3 result = mix(vec3(1.0), rainColor, saturation) * fin;

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
