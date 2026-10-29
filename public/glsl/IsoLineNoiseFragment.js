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

uniform float scale;
uniform float speed;
uniform int levels;
uniform float layerOffset;
uniform float skew;
uniform float yScale;
uniform float bias;
uniform float gain;
uniform float edgeBase;
uniform float edgeHeight;
uniform float edgeSharp;
uniform vec3 color1;
uniform vec3 color2;
uniform vec3 bgColor;
uniform bool colorRem;

// --- noise from procedural pseudo-Perlin (better but not so nice derivatives) ---
// (adapted from IQ, via "isovalues 5" by FabriceNeyret2)
float noise2(vec2 x) {
    vec2 p = floor(x), f = fract(x);

    f = f*f*(3.0-2.0*f);  // or smoothstep     // to make derivative continuous at borders

#define hash2(p)  fract(sin(1e3*dot(p, vec2(1, 57)))*4375.5453)        // rand

    return mix(mix( hash2(p+vec2(0,0)), hash2(p+vec2(1,0)), f.x),     // trilinear interp
               mix( hash2(p+vec2(0,1)), hash2(p+vec2(1,1)), f.x), f.y);
}

#define noise(x) (noise2(x) + noise2(x+11.5)) / 2. // pseudoperlin improvement from foxes idea

void main() {
    // 画布为正方形，vUv 已等价于原式的 U/iResolution.y
    vec2 u = vec2((vUv.x + uvMoveX) * uvScaleX, (vUv.y + uvMoveY) * uvScaleY) * uvScale;
    vec2 U = scale * u - vec2(iTime * speed);

    float safeY = max(yScale, 0.0001);
    float safeGain = max(gain, 0.0001);
    float safeSharp = max(edgeSharp, 0.00001);
    float safeLevels = max(float(levels), 1.0);

    vec3 col = bgColor;

    for (int i = 0; i <= levels; i++) {   // 每层一个等值线
        float z = float(i) / safeLevels;
        float n = (noise(vec2(U.x - U.y * skew, U.y / safeY)) - bias) / safeGain;
        float w = max(edgeBase + edgeHeight * abs(u.y - 0.5), 0.0001);
        float v = smoothstep(0.0, w, (n - z) / safeSharp);
        col = mix(col, mix(color1, color2, clamp(n, 0.0, 1.0)), v);
        U.y -= layerOffset;
    }

    col = clamp(col + brightness, 0.0, 1.0);
    if (colorRem) {
        col = vec3(dot(col, vec3(0.299, 0.587, 0.114)));
    }
    if (colorRev) {
        col = 1.0 - col;
    }
    gl_FragColor = vec4(col, 1.0);
    if (useAlpha) { gl_FragColor.a = max(col.r, max(col.g, col.b)); }
}`

export default FragShader
