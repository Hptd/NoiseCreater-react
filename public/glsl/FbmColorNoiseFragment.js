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

uniform vec3 color1;
uniform vec3 color2;
uniform vec3 color3;
uniform vec3 color4;
uniform float timeSpeed;
uniform float scale;
uniform float mixExp1;
uniform float mixExp2;
uniform float gamma;
uniform float lacunarity;
uniform float roughness;
uniform float lacunarity2;
uniform float roughness2;
uniform float warpStrength;
uniform float domainWarp;
uniform bool colorRem;

vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
    return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
    return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v)
{ 
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 =   v - i + dot(i, C.xxx) ;

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i); 
    vec4 p = 
        permute
        (
            permute
            ( 
                permute
                (
                    i.z + vec4(0.0, i1.z, i2.z, 1.0)
                )
                + i.y + vec4(0.0, i1.y, i2.y, 1.0 )
            )
            + i.x + vec4(0.0, i1.x, i2.x, 1.0 )
        );

    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
}

float fbm4(vec3 p, float theta, float f, float lac, float r)
{
    mat3 mtx = mat3(
        cos(theta), -sin(theta), 0.0,
        sin(theta), cos(theta), 0.0,
        0.0, 0.0, 1.0);

    float la = lac;
    float ro = r;
    float amp = 1.0;
    float total_amp = 0.0;

    float accum = 0.0;
    vec3 X = p * f;
    for(int i = 0; i < 4; i++)
    {
        accum += amp * snoise(X);
        X *= (la + (snoise(X) + 0.1) * domainWarp);
        X = mtx * X;

        total_amp += amp;
        amp *= ro;
    }

    return accum / total_amp;
}

float fbm8(vec3 p, float theta, float f, float lac, float r)
{
    mat3 mtx = mat3(
        cos(theta), -sin(theta), 0.0,
        sin(theta), cos(theta), 0.0,
        0.0, 0.0, 1.0);

    float la = lac;
    float ro = r;
    float amp = 1.0;
    float total_amp = 0.0;

    float accum = 0.0;
    vec3 X = p * f;
    for(int i = 0; i < 8; i++)
    {
        accum += amp * snoise(X);
        X *= (la + (snoise(X) + 0.1) * domainWarp);
        X = mtx * X;

        total_amp += amp;
        amp *= ro;
    }

    return accum / total_amp;
}

float turbulence(float val)
{
    float n = 1.0 - abs(val);
    return n * n;
}

float pattern(in vec3 p, inout vec3 q, inout vec3 r)
{
    q.x = fbm4( p + 0.0, 0.0, 1.0, lacunarity, roughness );
    q.y = fbm4( p + 6.0, 0.0, 1.0, lacunarity, roughness );

    r.x = fbm8( p + q - 2.4, 0.0, 1.0, lacunarity2, roughness2 );
    r.y = fbm8( p + q + 8.2, 0.0, 1.0, lacunarity2, roughness2 );

    q.x = turbulence( q.x );
    q.y = turbulence( q.y );

    float f = fbm4( p + (warpStrength * r), 0.0, 1.0, lacunarity, roughness2);

    return f;
}

void main(){
	vec2 mainUv = vec2((vUv.x + uvMoveX) * uvScaleX, (vUv.y + uvMoveY) * uvScaleY) * uvScale;
    vec2 uv = mainUv;

    float t = iTime * timeSpeed;

    uv -= 0.5;
    uv *= scale;

    vec3 p = vec3(uv.x, uv.y, t);
    vec3 q = vec3(0.0);
    vec3 r = vec3(0.0);
    float f = pattern(p, q, r);

    vec3 color = vec3(0.0);
    color = mix(color2, color4, pow(length(q), mixExp1));
    color = mix(color, color1, pow(length(r), mixExp2));
    color = mix(color, color3, f);

    color = pow(color, vec3(gamma));

    if(colorRem){
        color = vec3(dot(color, vec3(0.22, 0.707, 0.071)));
    }
    color = max(vec3(0.), min(vec3(1.), color + brightness));
    if(colorRev){
        color = 1.0 - color;
    }

    gl_FragColor = vec4(color, 1.0);
    if(useAlpha){gl_FragColor.a = color.r;}
}`

export default FragShader
