const FragShader = /*glsl*/`
// domain warping based on iq's notes: https://iquilezles.org/articles/warp
// iChannel0 纹理采样替换为 SampleColorNoise 的 hash（h12goldM），单 pass 可运行。
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

uniform float scale;
uniform float speed;
uniform float contrast;
uniform vec3 color1;
uniform vec3 color2;
uniform vec3 color3;
uniform vec3 color4;
uniform vec3 color5;
uniform vec3 color6;
uniform bool colorRem;

const float pi = acos(-1.);
const float Phi = sqrt(5.)*.5 + .5;
const float fha = 14142.1356237;

// SampleColorNoise 的 h12goldM（seed = fha），替代 iChannel0 的纹理随机源
float sampleColorNoise(vec2 coordinate)
{
    return fract(sin(dot(coordinate * fha, vec2(Phi, pi))) * fha);
}

float noise( in vec2 x )
{
    vec2 p = floor(x);
    vec2 f = fract(x);
    f = f*f*(3.0-2.0*f);
    float a = sampleColorNoise(p + vec2(0.5, 0.5));
    float b = sampleColorNoise(p + vec2(1.5, 0.5));
    float c = sampleColorNoise(p + vec2(0.5, 1.5));
    float d = sampleColorNoise(p + vec2(1.5, 1.5));
    return mix(mix( a, b, f.x), mix( c, d, f.x), f.y);
}

const mat2 mtx = mat2( 0.80,  0.60, -0.60,  0.80 );

float fbm( vec2 p )
{
    float f = 0.0;

    f += 0.500000*noise( p ); p = mtx*p*2.02;
    f += 0.250000*noise( p ); p = mtx*p*2.03;
    f += 0.125000*noise( p ); p = mtx*p*2.01;
    f += 0.062500*noise( p ); p = mtx*p*2.04;
    f += 0.031250*noise( p ); p = mtx*p*2.01;
    f += 0.015625*noise( p );

    return f/0.96875;
}

float pattern(in vec2 p, in float t, out vec2 q, out vec2 r, out vec2 g)
{
    q = vec2(fbm(p), fbm(p + vec2(10, 1.3)));

    r = vec2(fbm(p + 4.0 * q + vec2(t) + vec2(1.7, 9.2)), fbm(p + 4.0 * q + vec2(t) + vec2(8.3, 2.8)));
    g = vec2(fbm(p + 2.0 * r + vec2(t * 20.0) + vec2(2, 6)), fbm(p + 2.0 * r + vec2(t * 10.0) + vec2(5, 3)));
    return fbm(p + 5.5 * g + vec2(-t * 7.0));
}

void main(){
    vec2 uv = vec2(vUv.x*uvScaleX + uvMoveX, vUv.y*uvScaleY + uvMoveY) * uvScale;

    vec2 q, r, g;
    float nz = pattern(uv * scale, iTime * 0.007 * speed, q, r, g);

    // base color based on main noise
    vec3 col = mix(color1, color2, smoothstep(0.0, 1.0, nz));

    // other lower-octave colors and mixes
    col = mix(col, color3, dot(q, q) * 1.0);
    col = mix(col, color4, 0.2*g.y*g.y);
    col = mix(col, color5, smoothstep(0.0, .6, 0.6*r.g*r.g));
    col = mix(col, color6, 0.1*g.x);

    // some dark outlines/contrast and different steps
    col = mix(col, vec3(0), smoothstep(0.3, 0.5, nz) * smoothstep(0.5, 0.3, nz));
    col = mix(col, vec3(0), smoothstep(0.7, 0.8, nz) * smoothstep(0.8, 0.7, nz));

    // contrast
    col *= nz*contrast;

    // vignette
    col *= 0.70 + 0.65 * sqrt(max(70.0*uv.x*uv.y*(1.0-uv.x)*(1.0-uv.y), 0.0));

    if(colorRem){
        col = vec3(dot(col, vec3(0.299, 0.587, 0.114)));
    }
    col = max(vec3(0.), min(vec3(1.), col + brightness));
    if(colorRev){
        col = 1.0 - col;
    }
    gl_FragColor = vec4(col, 1.0);
    if(useAlpha){ gl_FragColor.a = col.r; }
}
`

export default FragShader
