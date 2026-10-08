const FragShader = /*glsl*/`
// modified from @XorDev
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

uniform float speed;
uniform int iterations;
uniform int octaves;
uniform float fbmScroll;
uniform float radius;
uniform float tailNoise;
uniform float shake;
uniform float gamma;
uniform float exposure;
uniform bool colorRem;

float rand(vec2 n) {
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p){
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u*u*(3.0-2.0*u);

    float res = mix(
        mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
        mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
    return res*res;
}

float fbm(vec2 x) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
    for (int i = 0; i < octaves; ++i) {
        v += a * noise(x);
        x = rot * x * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

void main(){
    float t = iTime * speed;

    vec2 mainUv = vec2((vUv.x + uvMoveX) * uvScaleX, (vUv.y + uvMoveY) * uvScaleY) * uvScale;

    vec2 shakeUv = vec2(sin(t * 1.5) * 0.01 * shake, cos(t * 2.7) * 0.01 * shake);
    vec2 p = (mainUv - 0.5 + shakeUv) * mat2(8.0, -6.0, 6.0, 8.0);

    vec2 v;
    vec4 o = vec4(0.0);

    float f = 3.0 + fbm(p + vec2(t * fbmScroll, 0.0));

    for(float i = 0.0; i++ < float(iterations);)
    {
        v = p + cos(i * i + (t + p.x * 0.1) * 0.03 + i * vec2(11.0, 9.0)) * radius + vec2(sin(t * 4.0 + i) * 0.005, cos(t * 4.5 - i) * 0.005);

        float tailNoiseVal = fbm(v + vec2(t, i)) * (1.0 - (i / float(iterations)));
        vec4 currentContribution = (cos(sin(i) * vec4(1.0, 2.0, 3.0, 1.0)) + 1.0) * exp(sin(i * i + t)) / length(max(v, vec2(v.x * f * 0.02, v.y)));

        float thinnessFactor = smoothstep(0.0, 1.0, i / float(iterations));
        o += currentContribution * (1.0 + tailNoiseVal * tailNoise) * thinnessFactor;
    }

    o = tanh(pow(o / exposure, vec4(gamma)));

    vec3 col = o.rgb;
    if(colorRem){
        col = vec3(dot(col, vec3(0.299, 0.587, 0.114)));
    }
    col = max(vec3(0.0), min(vec3(1.0), col + brightness));
    if(colorRev){
        col = 1.0 - col;
    }
    gl_FragColor = vec4(col, 1.0);
    if(useAlpha){ gl_FragColor.a = max(col.r, max(col.g, col.b)); }
}`
export default FragShader
