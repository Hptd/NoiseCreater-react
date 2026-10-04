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

uniform int particleIterations;
uniform float scale;
uniform float speed;
uniform float displaceFreq;
uniform float displaceStrength;
uniform float particleRadius;
uniform float particleRadius2;
uniform float particleSizeVar;
uniform bool randomSize;
uniform vec3 particleColor;
uniform float partBright;
uniform float glowThreshold;
uniform float glowPower;
uniform float blurStrength;
uniform float blurRange;
uniform bool colorRem;

// 项目无 iResolution，用固定参考分辨率换算像素尺寸与模糊半径
const float REF_RES = 1024.0;

float hash1_2(in vec2 x)
{
    return fract(sin(dot(x, vec2(52.127, 61.2871))) * 521.582);
}

vec2 hash2_3(in vec3 x)
{
    vec2 h = vec2(dot(x, vec3(20.5283, 24.1994, 70.2913)),
                  dot(x, vec3(89.9132, 57.1454, 45.1211)));
    return fract(sin(h) * 492.194);
}

//Simple interpolated noise
vec2 noise2_3(vec3 coord)
{
    vec3 f = smoothstep(0.0, 1.0, fract(coord));

    vec3 uv000 = floor(coord);
    vec3 uv001 = uv000 + vec3(0,0,1);
    vec3 uv010 = uv000 + vec3(0,1,0);
    vec3 uv011 = uv000 + vec3(0,1,1);
    vec3 uv100 = uv000 + vec3(1,0,0);
    vec3 uv101 = uv000 + vec3(1,0,1);
    vec3 uv110 = uv000 + vec3(1,1,0);
    vec3 uv111 = uv000 + vec3(1,1,1);

    vec2 v000 = hash2_3(uv000);
    vec2 v001 = hash2_3(uv001);
    vec2 v010 = hash2_3(uv010);
    vec2 v011 = hash2_3(uv011);
    vec2 v100 = hash2_3(uv100);
    vec2 v101 = hash2_3(uv101);
    vec2 v110 = hash2_3(uv110);
    vec2 v111 = hash2_3(uv111);

    vec2 v00 = mix(v000, v001, f.z);
    vec2 v01 = mix(v010, v011, f.z);
    vec2 v10 = mix(v100, v101, f.z);
    vec2 v11 = mix(v110, v111, f.z);

    vec2 v0 = mix(v00, v01, f.y);
    vec2 v1 = mix(v10, v11, f.y);
    return mix(v0, v1, f.x);
}

//Simple interpolated noise
float noise1_2(in vec2 uv)
{
    vec2 f = fract(uv);

    vec2 uv00 = floor(uv);
    vec2 uv01 = uv00 + vec2(0,1);
    vec2 uv10 = uv00 + vec2(1,0);
    vec2 uv11 = uv00 + 1.0;

    float v00 = hash1_2(uv00);
    float v01 = hash1_2(uv01);
    float v10 = hash1_2(uv10);
    float v11 = hash1_2(uv11);

    float v0 = mix(v00, v01, f.y);
    float v1 = mix(v10, v11, f.y);
    return mix(v0, v1, f.x);
}

//Calculates particle movement
vec2 cellPointFromRootUV(vec2 rootUV, vec2 originalUV, out float len)
{
    vec2 displacement = (noise2_3(vec3(rootUV * displaceFreq + iTime * speed, 0.5 * (iTime + 0.1) + noise1_2(originalUV * 0.04))) - 0.5);
    len = dot(displacement, displacement);
    return displacement * displaceStrength * float(particleIterations) + 0.5 + rootUV;
}

//Calculates particle size
float particleFromUVAndPoint(in vec2 uv, in vec2 point, in vec2 rootUV, in float pixelSize)
{
    float dist = distance(uv, point);
    dist += (randomSize ? 1.0 : 0.0) * (hash1_2(rootUV * 10.0) - 0.5) * particleSizeVar;
    float particle = 1.0 - smoothstep(particleRadius - dist * 0.05, particleRadius2 - dist * 0.05 + pixelSize, dist);
    return particle * particle;
}

//Particle system
vec3 surfaceParticles(in vec2 uv, in float pixelSize)
{
    vec3 particles = vec3(0.0);
    vec2 rootUV = floor(uv);

    vec2 tempRootUV;
    vec2 pointUV;
    float dist;
    vec3 color;
    for (int x = -particleIterations; x <= particleIterations; x++)
    {
        for (int y = -particleIterations; y <= particleIterations; y++)
        {
            tempRootUV = rootUV + vec2(float(x), float(y));
            pointUV = cellPointFromRootUV(tempRootUV, uv, dist);
            color = mix(vec3(0.0), particleColor, pow(smoothstep(glowThreshold, 0.0, dist), glowPower));
            particles += particleFromUVAndPoint(uv, pointUV, tempRootUV, pixelSize) * color;
        }
    }
    return particles;
}

// 对应原 BufferA：粒子系统 + 后期处理，st 为屏幕 uv(0~1)
vec3 bufferA(in vec2 st)
{
    vec2 uv = (st * 2.0 - 1.0);
    float vignette = 1.0 - smoothstep(0.5, 1.3, length(uv));
    float pixelSize = 1.5 / REF_RES;
    uv *= scale;
    pixelSize *= scale;
    vec3 particles = surfaceParticles(uv, pixelSize) * partBright;
    return smoothstep(-0.2, 0.8, particles * vignette);
}

void main()
{
    vec2 st = vec2((vUv.x + uvMoveX) * uvScaleX, (vUv.y + uvMoveY) * uvScaleY) * uvScale;

    // 内联原 BufferB 的一级 3x3 模糊
    float bStrength = pow(distance(vUv, vec2(0.5)), blurRange) * (REF_RES / 100.0) * blurStrength;
    vec2 pixelStep = vec2(1.0) / REF_RES;
    vec3 col = vec3(0.0);
    for (int x = -1; x <= 1; x++)
    {
        for (int y = -1; y <= 1; y++)
        {
            col += bufferA(st + vec2(float(x), float(y)) * pixelStep * bStrength);
        }
    }
    col /= 9.0;

    if (colorRem) {
        col = vec3(dot(col, vec3(0.299, 0.587, 0.114)));
    }
    col = max(vec3(0.0), min(vec3(1.0), col + brightness));
    if (colorRev) {
        col = 1.0 - col;
    }
    gl_FragColor = vec4(col, 1.0);
    if (useAlpha) { gl_FragColor.a = max(col.r, max(col.g, col.b)); }
}
`
export default FragShader
