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

uniform vec3 skyColor;
uniform vec3 sunColor;
uniform vec3 birdColor;
uniform float sunSize;
uniform float sunX;
uniform float sunY;
uniform float noiseFreq;
uniform float mountainAmp;
uniform float detailAmp;
uniform float mountainThreshold;
uniform float fogStrength;
uniform float globalSpeed;
uniform float parallaxSpeed;
uniform bool showBird;
uniform bool colorRem;

#define S smoothstep

//noise funtion abstract from https://www.shadertoy.com/view/4sc3z2
vec2 hash22(vec2 p)
{
    p = vec2(dot(p, vec2(127.1, 311.7)),
             dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float simplex_noise(vec2 p)
{
    const float K1 = 0.366025404; // (sqrt(3)-1)/2;
    const float K2 = 0.211324865; // (3-sqrt(3))/6;

    vec2 i = floor(p + (p.x + p.y) * K1);

    vec2 a = p - (i - (i.x + i.y) * K2);
    vec2 o = (a.x < a.y) ? vec2(0.0, 1.0) : vec2(1.0, 0.0);
    vec2 b = a - (o - K2);
    vec2 c = a - (1.0 - 2.0 * K2);

    vec3 h = max(0.5 - vec3(dot(a, a), dot(b, b), dot(c, c)), 0.0);
    vec3 n = h * h * h * h * vec3(dot(a, hash22(i)), dot(b, hash22(i + o)), dot(c, hash22(i + 1.0)));

    return dot(vec3(70.0, 70.0, 70.0), n);
}

float noise_sum(vec2 p)
{
    float f = 0.0;
    p = p * noiseFreq;
    f += 1.0000 * simplex_noise(p); p = 2.0 * p;
    f += 0.5000 * simplex_noise(p); p = 2.0 * p;
    f += 0.2500 * simplex_noise(p); p = 2.0 * p;
    f += 0.1250 * simplex_noise(p); p = 2.0 * p;
    f += 0.0625 * simplex_noise(p); p = 2.0 * p;

    return f;
}

vec2 drawMountain(vec2 uv, float f, float d)
{
    float Side = uv.y + noise_sum(vec2(uv.x, mix(uv.y, 0., uv.y)) * f) * mountainAmp;
    float detal = noise_sum(vec2(uv.x, uv.y) * 8.) * detailAmp;
    Side += detal;

    float Mountain = S(mountainThreshold, mountainThreshold + 0.01, Side);
    float fog = S(d, noise_sum(vec2(uv.x + iTime * 0.06, uv.y) * 0.2) * fogStrength, Side);

    return clamp(vec2(Side + fog, Mountain), 0., 1.);
}

float drawSun(vec2 uv)
{
    vec2 u = uv;
    u -= 0.5;

    float Sun = S(sunSize - 0.01, sunSize, length(vec2(u.x - sunX, u.y - sunY)));

    float fog = S(0.7, noise_sum(vec2(uv.x + iTime * 0.001, uv.y) * 2.) * 0.05, u.y) * 1.4;

    return clamp(Sun + fog, 0., 1.);
}

float drawBird(vec2 uv)
{
    uv = (uv - .5) * 20.;
    uv.x -= uv.y;

    uv.y = uv.y + .45 + (sin((iTime * 0.5 - abs(uv.x)) * 3.) - 1.) * abs(uv.x) * 0.5;

    float S1 = smoothstep(0.45, 0.4, length(uv));

    uv.y += .1;
    float S2 = smoothstep(0.5, 0.45, length(uv));

    float birdShape = S1 - S2;
    return birdShape;
}

void main()
{
    // 平面(planeSide=max(W,H))比相机视口(W/2,H/2)大 2 倍，可见 vUv 只有中间 [0.25,0.75]。
    // 这里先按 1:1 把可见区映到 [0,1]，默认即可看到整幅构图；公共尺寸/位移仍在此之上微调。
    vec2 fitUv = (vUv - 0.25) * 2.0;
    vec2 st = vec2((fitUv.x + uvMoveX) * uvScaleX, (fitUv.y + uvMoveY) * uvScaleY) * uvScale;
    vec2 uv = st;

    float t = iTime * globalSpeed;

    vec3 c = skyColor;

    float Sun = drawSun(uv);
    c = mix(sunColor, c, Sun);

    float Bird = drawBird(vec2(uv.x - .15, uv.y - .4));
    c = mix(c, birdColor, Bird * (showBird ? 1.0 : 0.0));

    uv.y -= .2;
    uv.x += t * 0.001 * parallaxSpeed;
    vec2 Mountain1 = drawMountain(uv, .4, 1.);
    c = mix(vec3(Mountain1.r), c, Mountain1.g);

    uv.y += .1;
    uv.x += 1.;
    uv.x += t * 0.005 * parallaxSpeed;
    Mountain1 = drawMountain(uv, .3, .8);
    c = mix(vec3(Mountain1.r), c, Mountain1.g);

    uv.y += .1;
    uv.x += 2.42;
    uv.x += t * 0.01 * parallaxSpeed;
    Mountain1 = drawMountain(uv, .2, 0.6);
    c = mix(vec3(Mountain1.r), c, Mountain1.g);

    uv.y += .1;
    uv.x += 12.84;
    uv.x += t * 0.05 * parallaxSpeed;
    Mountain1 = drawMountain(uv, .2, 0.4);
    c = mix(vec3(Mountain1.r) - 0.01, c, Mountain1.g);

    vec3 result = vec3(c);

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
