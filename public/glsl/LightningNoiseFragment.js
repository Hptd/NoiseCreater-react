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

uniform float seedVal;
uniform bool steady;
uniform float strikePeriod;
uniform float decay;
uniform float branchAmount;
uniform float branchLength;
uniform float distortion;
uniform float noiseScale;
uniform bool doReveal;
uniform vec3 coreColor;
uniform vec3 sheathColor;
uniform vec3 glowColor;
uniform bool colorRem;

// --- INTERNAL CONSTANTS ---
#define LEVELS        5
#define MAIN_SEG      32
#define BR_LEVELS     3
#define BR_SEG        8
#define MAX_BRANCHES  10
#define H_EXP         0.65
#define DISP          0.35
#define BR_DISP       0.22

vec2 mainPts[MAIN_SEG + 1];
vec2 brPts[MAX_BRANCHES * (BR_SEG + 1)];

float hash11(float p){p=fract(p*0.1031);p*=p+33.33;p*=p+p;return fract(p);}
float hash21(vec2 p){vec3 q=fract(vec3(p.xyx)*0.1031);q+=dot(q,q.yzx+33.33);return fract((q.x+q.y)*q.z);}

// fBm Noise
float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float a = hash21(i);
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0));
    float d = hash21(i + vec2(1.0, 1.0));
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(0.866, -0.5, 0.5, 0.866);
    for (int i = 0; i < 3; i++) {
        v += a * noise(p);
        p = rot * p * 2.0 + vec2(100.0);
        a *= 0.5;
    }
    return v;
}

vec2 perp(vec2 d){ return vec2(-d.y, d.x); }

void buildBolt(float seed, vec2 startPt, vec2 endPt) {
    mainPts[0]        = startPt;
    mainPts[MAIN_SEG] = endPt;

    for (int level = 0; level < LEVELS; level++) {
        int stride = MAIN_SEG >> level;
        int hs     = stride >> 1;
        float amp  = DISP * pow(H_EXP, float(level));
        for (int i = hs; i < MAIN_SEG; i += stride) {
            vec2 a = mainPts[i - hs];
            vec2 b = mainPts[i + hs];
            vec2 mid = 0.5 * (a + b);
            vec2 nrm = normalize(perp(b - a));
            float r = hash21(vec2(float(i), float(level)) + seed) * 2.0 - 1.0;
            mainPts[i] = mid + nrm * amp * r;
        }
    }

    for (int br = 0; br < MAX_BRANCHES; br++) {
        if (float(br) >= branchAmount) break;

        float bf = float(br);
        int   origIdx  = int(mix(6.0, float(MAIN_SEG - 6), hash11(seed + 7.0 + bf * 3.7)));
        vec2  origin   = mainPts[origIdx];
        vec2  mainDir  = normalize(mainPts[origIdx + 1] - mainPts[origIdx - 1]);
        vec2  mainP    = perp(mainDir);
        float side     = hash11(seed + 13.0 + bf * 5.1) > 0.5 ? 1.0 : -1.0;
        float angle    = mix(0.35, 0.95, hash11(seed + 19.0 + bf * 6.3));
        vec2  dir      = normalize(mainDir * cos(angle) + mainP * side * sin(angle));

        float len      = mix(0.25, 0.55, hash11(seed + 23.0 + bf * 7.7)) * branchLength;

        int base = br * (BR_SEG + 1);
        brPts[base]          = origin;
        brPts[base + BR_SEG] = origin + dir * len;

        for (int level = 0; level < BR_LEVELS; level++) {
            int stride = BR_SEG >> level;
            int hs     = stride >> 1;
            float amp  = BR_DISP * pow(H_EXP, float(level));
            for (int i = hs; i < BR_SEG; i += stride) {
                vec2 a = brPts[base + i - hs];
                vec2 b = brPts[base + i + hs];
                vec2 mid = 0.5 * (a + b);
                vec2 nrm = normalize(perp(b - a));
                float r = hash21(vec2(float(i + br * 97), float(level)) + seed * 1.31) * 2.0 - 1.0;
                brPts[base + i] = mid + nrm * amp * r;
            }
        }
    }
}

float segDist(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a;
    vec2 ba = b - a;
    float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-8), 0.0, 1.0);
    return length(pa - ba * h);
}

float distBolt(vec2 p) {
    float d = 1e9;
    for (int i = 0; i < MAIN_SEG; i++)
        d = min(d, segDist(p, mainPts[i], mainPts[i + 1]));

    for (int br = 0; br < MAX_BRANCHES; br++) {
        if (float(br) >= branchAmount) break;
        int base = br * (BR_SEG + 1);
        for (int i = 0; i < BR_SEG; i++)
            d = min(d, segDist(p, brPts[base + i], brPts[base + i + 1]));
    }
    return d;
}

void main() {
    vec2 uv = vec2((vUv.x + uvMoveX) * uvScaleX, (vUv.y + uvMoveY) * uvScaleY) * uvScale;
    // 6.0 使可见范围约 ±3.0，闪电在画面中约占一半，默认居中（3.0 为原始适配尺寸）
    uv = (uv - 0.5) * 5.0;

    float t = fract(iTime / strikePeriod) * strikePeriod;
    float tNorm = t / strikePeriod;

    vec2 startCoord = vec2(0.0, 1.2);
    vec2 endCoord   = vec2(0.0, -1.2);

    startCoord.x += (hash11(seedVal)       - 0.5) * 0.4;
    endCoord.x   += (hash11(seedVal + 1.0) - 0.5) * 0.6;

    buildBolt(seedVal, startCoord, endCoord);

    vec2 noiseUV = uv * noiseScale;
    float nx = fbm(noiseUV + seedVal * 13.37);
    float ny = fbm(noiseUV - seedVal * 7.31);
    vec2 distortedUV = uv + (vec2(nx, ny) - 0.5) * distortion;

    float d = distBolt(distortedUV);

    float core   = exp(-d * 400.0);
    float sheath = exp(-d * 35.0);
    float glow   = exp(-d * 6.0);

    vec3 col = coreColor   * core   * 2.0
             + sheathColor * sheath * 0.9
             + glowColor   * glow   * 0.4;

    float env = 0.0;

    if (steady) {
        env = 1.3;
    } else if (doReveal) {
        float revealDuration = 0.2 * strikePeriod;
        if (t < revealDuration) {
            float chargeT = t / revealDuration;
            vec2 mainVec = endCoord - startCoord;
            float proj = dot(distortedUV - startCoord, mainVec) / dot(mainVec, mainVec);
            float mask = smoothstep(chargeT + 0.01, chargeT - 0.01, proj);
            env = 0.3 * mask;
            float tip = exp(-abs(proj - chargeT) * 30.0) * step(proj, chargeT);
            env += tip * 1.5;
        } else {
            float flashT = tNorm - 0.2;
            env  = 1.5 * exp(-flashT * decay);
            env += 0.40 * exp(-pow((flashT - 0.05) * (decay * 4.4), 2.0));
            env += 0.30 * exp(-pow((flashT - 0.11) * (decay * 4.4), 2.0));
            env += 0.20 * exp(-pow((flashT - 0.18) * (decay * 4.4), 2.0));
            env *= smoothstep(0.0, 0.003, flashT);
        }
    } else {
        env  = 1.5 * exp(-tNorm * decay);
        env += 0.40 * exp(-pow((tNorm - 0.05) * (decay * 4.4), 2.0));
        env += 0.30 * exp(-pow((tNorm - 0.11) * (decay * 4.4), 2.0));
        env += 0.20 * exp(-pow((tNorm - 0.18) * (decay * 4.4), 2.0));
        env *= smoothstep(0.0, 0.003, tNorm);
    }

    col *= env;

    float ambientEnv = env;
    if (!steady && doReveal && t < 0.2 * strikePeriod) ambientEnv = 0.05;
    col += vec3(0.03, 0.04, 0.08) * ambientEnv * 0.5;

    if (colorRem) {
        col = vec3(dot(col, vec3(0.299, 0.587, 0.114)));
    }
    col = max(vec3(0.0), min(vec3(1.0), col + brightness));
    if (colorRev) { col = 1.0 - col; }
    gl_FragColor = vec4(col, 1.0);
    if (useAlpha) { gl_FragColor.a = max(col.r, max(col.g, col.b)); }
}
`

export default FragShader
