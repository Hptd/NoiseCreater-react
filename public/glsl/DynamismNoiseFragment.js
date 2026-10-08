const FragShader = /*glsl*/`
// Dynamism by nimitz (https://www.shadertoy.com/view/MtKSWW)
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License
// 单 pass 近似移植：原 BufferA / BufferB / BufferC 内联到本 shader，
// 直接输出散度彩色场；Image 的径向累加已移除。
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
uniform float animSpeed;
uniform float octaves;
uniform float decay;
uniform float divScale;
uniform vec3 color1;
uniform vec3 color2;
uniform vec3 color3;
uniform vec3 color4;
uniform bool colorRem;

#define time (iTime*animSpeed)
#define time2 (time*2.1 + ((1.0+sin(time + sin(time*0.4+ cos(time*0.1)))))*1.5)
#define time3 (time*1. + ((1.0+sin(time*0.9 + sin(time*0.34+ cos(time*0.21)))))*1.5)
#define time4 (time*0.5 + ((1.0+sin(time*0.8 + sin(time*0.14+ cos(time*0.15)))))*1.2)

// 有限差分步长（原作为 1 像素，这里用与分辨率无关的固定小量）
const float PIXEL = 0.0015;

vec2 hash(vec2 p)
{
	vec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973));
    p3 += dot(p3.zxy, p3.yxz+19.19);
    return -1.0 + 2.0*fract(vec2(p3.x * p3.y, p3.z*p3.x));
}

//2D Simplex noise from iq
float noise(in vec2 p)
{
    p *= 0.45;
    const float K1 = 0.366025404;
    const float K2 = 0.211324865;

	vec2 i = floor( p + (p.x+p.y)*K1 );

    vec2 a = p - i + (i.x+i.y)*K2;
    vec2 o = (a.x>a.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
    vec2 b = a - o + K2;
	vec2 c = a - 1.0 + 2.0*K2;

    vec3 h = max( 0.5-vec3(dot(a,a), dot(b,b), dot(c,c) ), 0.0 );

	vec3 n = h*h*h*h*vec3( dot(a,hash(i+0.0)), dot(b,hash(i+o)), dot(c,hash(i+1.0)));

    return dot( n, vec3(38.0) );
}

mat2 rot(in float a){float c = cos(a), s = sin(a);return mat2(c,s,-s,c);}

float fbm(in vec2 p, in vec2 of)
{
    p *= rot(time3*0.1);
    p += of;
	float z = 2.;
	float rz = 0.;
	for (int i = 1; i <= int(octaves); i++)
	{
        rz += noise(p*rot(float(i)*2.3)+ time*0.5)/z;
		z *= decay;
		p *= 2.0;
	}
	return rz;
}

vec2 grdf(in vec2 p, in vec2 of)
{
    vec2 ep = vec2(0.0,0.0005);
    vec2 d = vec2(fbm(p - ep.yx, of) - fbm(p + ep.yx, of),
                  fbm(p - ep.xy, of) - fbm(p + ep.xy, of));
    d /= length(d);
    return d;
}

// BufferA: vec4(fld, fld2)
vec4 fieldA(vec2 q)
{
    vec2 p = (q - 0.5) * scale;
    float t1 = mod(time2*0.35, 4.);
    float t2 = mod(time2*0.35 + 1., 4.);
    vec2 of = vec2(time4*0.2, 0.0);
    vec2 fld = grdf(p*(4.0-t1), of);
    vec2 fld2 = grdf(p*(4.0-t2), of + 2.2);
    return vec4(fld, fld2);
}

// BufferB: vec4(fld, fld2)
vec4 fieldB(vec2 q)
{
    vec2 p = (q - 0.5) * scale;
    float t3 = mod(time2*0.35 + 2., 4.);
    float t4 = mod(time2*0.35 + 3., 4.);
    vec2 of = vec2(time4*0.2, 0.0);
    vec2 fld = grdf(p*(4.0-t3), of + 4.5);
    vec2 fld2 = grdf(p*(4.0-t4), of + 7.3);
    return vec4(fld, fld2);
}

// BufferC 的散度：对梯度场做有限差分
vec2 divFrom(vec4 n, vec4 s, vec4 e, vec4 w)
{
    float d1 = s.y - n.y - e.x + w.x;
    float d2 = s.w - n.w - e.z + w.z;
    return vec2(d1, d2) * divScale;
}

vec2 divergenceA(vec2 q)
{
    return divFrom(
        fieldA(q + vec2(0.0, PIXEL)),
        fieldA(q - vec2(0.0, PIXEL)),
        fieldA(q + vec2(PIXEL, 0.0)),
        fieldA(q - vec2(PIXEL, 0.0)));
}

vec2 divergenceB(vec2 q)
{
    return divFrom(
        fieldB(q + vec2(0.0, PIXEL)),
        fieldB(q - vec2(0.0, PIXEL)),
        fieldB(q + vec2(PIXEL, 0.0)),
        fieldB(q - vec2(PIXEL, 0.0)));
}

// BufferC 的彩色场
vec3 bufferC(vec2 q)
{
    vec2 dv = divergenceA(q);
    vec2 dv2 = divergenceB(q);

    dv = pow(abs(dv), vec2(.5))*sign(dv);
    dv = clamp(dv, 0., 4.);
    dv2 = pow(abs(dv2), vec2(.5))*sign(dv2);
    dv2 = clamp(dv2, 0., 4.);

    float t1 = mod(time2*0.35, 4.);
    float t2 = mod(time2*0.35 + 1., 4.);
    float t3 = mod(time2*0.35 + 2., 4.);
    float t4 = mod(time2*0.35 + 3., 4.);

    const float ws = 1.1;
    const float wof = 1.8;

    // derivative of the "depth"
    float x = time;
    float drvT = 1.5 * cos(x + sin(0.4*x + cos(0.1*x)))*(cos(0.4*x + cos(0.1*x)) * (0.4 - 0.1*sin(0.1*x)) + 1.0) + 2.1;

    float ofsc = 0.8 + drvT*0.07;
    float t1w = clamp(t1*ws + wof, 0., 10.);
    float t2w = clamp(t2*ws + wof, 0., 10.);
    float t3w = clamp(t3*ws + wof, 0., 10.);
    float t4w = clamp(t4*ws + wof, 0., 10.);

    vec3 col = vec3(0.);

    col += sqrt(t1)*color1*exp2(dv.x*t1w - t1w*ofsc);
    col += sqrt(t2)*color2*exp2(dv.y*t2w - t2w*ofsc);
    col += sqrt(t3)*color3*exp2(dv2.x*t3w - t3w*ofsc);
    col += sqrt(t4)*color4*exp2(dv2.y*t4w - t4w*ofsc);

    col = pow(col, vec3(.6))*1.2;
    col *= smoothstep(vec3(0.), vec3(1.), col);
    return col;
}

void main(){
    vec2 p = vec2(vUv.x*uvScaleX + uvMoveX, vUv.y*uvScaleY + uvMoveY) * uvScale;

    // 直接输出 BufferC 的散度彩色场
    vec3 col = bufferC(p);

    // 角落暗角
    float vg = 16.0*p.x*p.y*(1.0 - p.x)*(1.0 - p.y);
    col *= pow(max(vg, 0.0), 0.4);

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
