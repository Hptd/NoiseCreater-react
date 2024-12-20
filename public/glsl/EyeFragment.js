const FragShader = /*glsl*/`
varying vec2 vUv;
uniform float uvScale;
uniform float uvMoveX;
uniform float uvMoveY;
uniform float uvScaleX;
uniform float uvScaleY;
uniform float brightness;
uniform float iTime;

uniform float onlyBri;
uniform float sharkX;
uniform float sharkY;
uniform float speed;
uniform vec3 color1;
uniform vec3 color2;
uniform vec3 color3;
uniform vec3 color4;
uniform vec3 color5;
uniform bool colorRem;

const mat2 m = mat2( 0.80,  0.60, -0.60,  0.80 );

float hash( float n )
{
    return fract(sin(n)*43758.5453);
}

float noise( in vec2 x )
{
    vec2 p = floor(x);
    vec2 f = fract(x);

    f = f*f*(3.0-2.0*f);

    float n = p.x + p.y*57.0;

    return mix(mix( hash(n+  0.0), hash(n+  1.0),f.x),
               mix( hash(n+ 57.0), hash(n+ 58.0),f.x),f.y);
}

float fbm( vec2 p )
{
    float f = 0.0;

    f += 0.50000*noise( p ); p = m*p*2.02;
    f += 0.25000*noise( p ); p = m*p*2.03;
    f += 0.12500*noise( p ); p = m*p*2.01;
    f += 0.06250*noise( p ); p = m*p*2.04;
    f += 0.03125*noise( p );

    return f/0.984375;
}

float length2( vec2 p )
{
    vec2 q = p*p*p*p;
    return pow( q.x + q.y, 1.0/4.0 );
}

void main(){
	vec2 q = vec2(vUv.x*uvScaleX + uvMoveX, vUv.y*uvScaleY + uvMoveY) * uvScale;
    vec2 p = -1.0 + 2.0 * q;
    float r = length( p );
    float a = atan( p.y, p.x );
    float dd = 0.2*sin(iTime*speed);
    float ss = 1.0 + clamp(1.0-r,0.0,1.0)*dd;
    r *= ss;
    vec3 col = color1;
    float f = fbm( 5.0*p );
    col = mix( col, color2, f );
    col = mix( col, color3, 1.0-smoothstep(sharkX,sharkY,r) );
    a += 0.05*fbm( 20.0*p );
    f = smoothstep( 0.3, 1.0, fbm( vec2(20.0*a,6.0*r) ) );
    col = mix( col, color4, f );
    f = smoothstep( 0.4, 0.9, fbm( vec2(15.0*a,10.0*r) ) );
    col *= 1.0-0.5*f;
    col *= vec3(0.8+0.2*cos(r*a));
    f = 1.0-smoothstep( onlyBri, onlyBri+0.05, r );
    col = mix( col, color5, f );
    f = smoothstep( 0.79, 0.82, r );
    col = mix( col, vec3(0.0), f );
    float alpha = 1.0-f;

    col *= 0.5 + 0.5*pow(16.0*q.x*q.y*(1.0-q.x)*(1.0-q.y),0.1);

    if(colorRem){
        float col_wb = dot(col, vec3(0.22, 0.707, 0.071));
        col_wb = max(0., min(1., col_wb + brightness));
        col = vec3(col_wb);
    }

    gl_FragColor = vec4(col, alpha);
}`

export default FragShader