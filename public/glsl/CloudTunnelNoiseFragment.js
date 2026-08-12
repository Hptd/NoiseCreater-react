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

uniform int iterations;
uniform float timeSpeed;
uniform float forwardSpeed;
uniform float turbulence;
uniform float warp;
uniform float radius;
uniform float noiseStart;
uniform float noiseEnd;
uniform float noiseFreq;
uniform float noiseIntensity;
uniform float rotateSpeed;
uniform float translucency;
uniform float tone;

void main(){
	vec2 mainUv = vec2((vUv.x + uvMoveX) * uvScaleX, (vUv.y + uvMoveY) * uvScaleY) * uvScale;
    vec2 u = 2.0 * mainUv - 1.0;
    float t = iTime * timeSpeed;

    float d, s, n;
    d = 0.0;
    vec3 p = vec3(0.0);
    vec4 o = vec4(0.0);

    for(int it = 0; it < iterations; it++){
        p = vec3(u * d, d + t * forwardSpeed);
        p += cos(p.z + t + p.yzx * warp) * turbulence;
        s = radius - length(p.xy);
        for(n = noiseStart; n < noiseEnd; n += n){
            p.xy *= mat2(cos(t * rotateSpeed + vec4(0.0, 33.0, 11.0, 0.0)));
            s -= abs(dot(sin(p.z + t + p * n * noiseFreq), vec3(noiseIntensity))) / n;
        }
        d += s = 0.02 + abs(s) * translucency;
        o += 1.0 / s;
    }

    o = tanh(o / d / tone / length(u));

    vec3 col = o.rgb;
    col = max(vec3(0.), min(vec3(1.), col + brightness));
    if(colorRev){
        col = 1.0 - col;
    }

    gl_FragColor = vec4(col, 1.0);
    if(useAlpha){gl_FragColor.a = col.r;}
}`

export default FragShader
