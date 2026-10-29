const FragShader = /*glsl*/`
varying vec2 vUv;
uniform float uvScale;
uniform float uvMoveX;
uniform float uvMoveY;
uniform float uvScaleX;
uniform float uvScaleY;
uniform float brightness;
uniform bool colorRev;
uniform bool useAlpha;
uniform float iTime;

uniform float warpAmount;
uniform float freq;
uniform float seed;
uniform float mixSoft;
uniform float contrast;
uniform int octaves;

//////////// Hash functions

uint hash11u(uint x, uint seed) {
    uint y = (~x) >> 3U;
    y ^= (y << 17U); y ^= (y >> 7U); y ^= (y << 5U);
    y ^= (x >> 2U);  y ^= ((seed ^ 82U) >> 3U) << 5U;
    return y;
}

float hash11f(float x, float seed) {
    return float((hash11u(floatBitsToUint(x), floatBitsToUint(seed))) * 55302U) / float(0xFFFFFFFFU);
}

float hash31(vec3 p, float seed) {
    #define FU floatBitsToUint
    uint x = FU(hash11f(p.x, seed)); uint y = FU(hash11f(p.y, seed));
    uint z = FU(hash11f(p.z, seed+p.x+p.y));
    #undef FU
    return float((x ^ y ^ z)*27175U) / float(0xFFFFFFFFU);
}

vec3 hash33(vec3 p, float seed) {
    float x = hash31(p, seed); float y = hash31(p, seed+2.44215+x);
    float z = hash31(p, seed+9.82733+y);
    return vec3(x, y, z);
}

//////////// Noise functions

float noise31(vec3 p, float seed) {
    vec3 id = floor(p);
    vec3 lv = fract(p);
    lv = lv*lv*(3.0-2.0*lv);
    return mix(mix(mix(hash31(id, seed), hash31(id+vec3(1, 0, 0), seed), lv.x),
            mix(hash31(id+vec3(0, 1, 0), seed), hash31(id+vec3(1, 1, 0), seed), lv.x),
           lv.y),mix(mix(hash31(id + vec3(0, 0, 1), seed), hash31(id+vec3(1, 0, 1), seed), lv.x),
           mix(hash31(id+vec3(0, 1, 1), seed), hash31(id+vec3(1, 1, 1), seed), lv.x),lv.y),lv.z);
}

vec3 noise33(vec3 p, float seed) {
    vec3 id = floor(p);
    vec3 lv = fract(p);
    lv = lv*lv*(3.0-2.0*lv);
    return mix(mix(mix(hash33(id, seed), hash33(id+vec3(1, 0, 0), seed), lv.x),
           mix(hash33(id+vec3(0, 1, 0), seed), hash33(id+vec3(1, 1, 0), seed), lv.x),lv.y),
           mix(mix(hash33(id + vec3(0, 0, 1), seed), hash33(id+vec3(1, 0, 1), seed), lv.x),
           mix(hash33(id+vec3(0, 1, 1), seed), hash33(id+vec3(1, 1, 1), seed), lv.x),lv.y),lv.z);
}

float noise31(vec3 p, float seed, float freq, float warp) {
    float amp = 1.0;
    float div = 0.0;
    float n = 0.0;
    int oct = max(octaves, 1);
    for (int i = 0; i < oct; i++) {
        n += amp * noise31(p*freq, seed); div += amp; amp /= 2.0; freq *= 2.0;
        p += vec3(cos(n*6.28), sin(n*6.28), n)*warp;
    }
    return n / div;
}

vec3 noise33(vec3 p, float seed, float freq, float warp) {
    float amp = 1.0;
    float div = 0.0;
    vec3 n = vec3(0.0);
    int oct = max(octaves, 1);
    for (int i = 0; i < oct; i++) {
        n += amp * noise33(p*freq, seed); div += amp; amp /= 2.0; freq *= 2.0;
        p += n*warp;
    }
    return n / div;
}

void main()
{
    // 项目画布为正方形，原式 (fc-0.5*R)/R.y 归一化后等价于 (vUv-0.5)
    vec2 uv = vec2((vUv.x+uvMoveX)*uvScaleX, (vUv.y+uvMoveY)*uvScaleY) * uvScale - 0.5;

    // 已删除旋转速度 / 扭曲脉动速度参数：rd 固定不旋转，扭曲强度不再随时间脉动
    vec3 rd = normalize(vec3(uv.xy, 1.0));

    float w = warpAmount;

    vec3 colA = vec3(0.0); colA += noise31(rd, seed, freq, w);
    vec3 colB = noise33(rd, seed, freq, w);

    float f = mixSoft;
    float cycle = mod(iTime*0.16, 2.0 + f);

    vec3 col = colB;
    col = mix(col, colA, smoothstep(1.0 - f, 1.0 + f, cycle));
    col = mix(col, colB, smoothstep(2.0 - f, 2.0 + f, cycle));

    // 纯黑白：RGB 噪波取亮度，不再提供任何颜色通道设置
    float g = dot(col, vec3(0.299, 0.587, 0.114));
    g = clamp((g - 0.5)*contrast + 0.5, 0.0, 1.0);
    g = clamp(g + brightness, 0.0, 1.0);
    if (colorRev) {
        g = 1.0 - g;
    }

    gl_FragColor = vec4(vec3(g), 1.0);
    if (useAlpha) { gl_FragColor.a = g; }
}`

export default FragShader
