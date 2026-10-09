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

uniform float noiseChooseValue;
uniform float speed;
uniform float dirX;
uniform float dirY;
uniform float lightX;
uniform float lightY;
uniform float lightZ;
uniform bool colorRem;

// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
// Created by S.Guillitte
// Based on Voronoise by iq :https://www.shadertoy.com/view/Xd23Dh
// and Gabor 4: normalized by FabriceNeyret2 : https://www.shadertoy.com/view/XlsGDs

#define PI 3.14159265358979

float hash( in vec2 p ) 
{
    return fract(sin(p.x*15.32+p.y*5.78) * 43758.236237153);
}

vec2 hash2(vec2 p)
{
	return vec2(hash(p*.754),hash(1.5743*p.yx+4.5891))-.5;
}

vec2 hash2b( vec2 p )
{
    vec2 q = vec2( dot(p,vec2(127.1,311.7)), 
				   dot(p,vec2(269.5,183.3)) );
	return fract(sin(q)*43758.5453)-.5;
}

mat2 m2= mat2(.8,.6,-.6,.8);

// Gabor/Voronoi mix 3x3 kernel (some artifacts for v=1.)
float gavoronoi3(in vec2 p)
{    
    vec2 ip = floor(p);
    vec2 fp = fract(p);
    float f = 2.*PI;//frequency
    float v = .8;//cell variability <1.
    float dv = .4;//direction variability <1.
    vec2 dir = vec2(dirX,dirY);
    float va = 0.0;
   	float wt = 0.0;
    for (int i=-1; i<=1; i++) 
	for (int j=-1; j<=1; j++) 
	{		
        vec2 o = vec2(i, j)-.5;
        vec2 h = hash2(ip - o);
        vec2 pp = fp +o  -h;
        float d = dot(pp, pp);
        float w = exp(-d*4.);
        wt +=w;
        h = dv*h+dir;//h=normalize(h+dir);
        va += cos(dot(pp,h)*f/v)*w;
	}    
    return va/wt;
}

// Gabor/Voronoi mix 4x4 kernel (clean but slower)
float gavoronoi4(in vec2 p)
{    
    vec2 ip = floor(p);
    vec2 fp = fract(p);
    vec2 dir = vec2(dirX,dirY);
    float f = 2.*PI;//frequency
    float v = 1.;//cell variability <1.
    float dv = .7;//direction variability <1.
    float va = 0.0;
   	float wt = 0.0;
    for (int i=-2; i<=1; i++) 
	for (int j=-2; j<=1; j++) 
	{		
        vec2 o = vec2(i, j);
        vec2 h = hash2(ip - o);
        vec2 pp = fp +o  -v*h;
        float d = dot(pp, pp);
        float w = exp(-d*2.);
        wt +=w;
      	h= dv*h+dir;//h=normalize(h+dir);
        va +=cos(dot(pp,h)*f)*w;
	}    
    return va/wt;
}

// Gabor/Voronoi mix 5x5 kernel (even slower but suitable for large wavelets)
float gavoronoi5(in vec2 p) 
{    
    vec2 ip = floor(p);
    vec2 fp = fract(p);
    float f = 2.*PI;//frequency
    float v = .8;//cell variability <1.
    float dv = .8;//direction variability <1.
    vec2 dir = vec2(dirX,dirY);
    float va = 0.0;
   	float wt = 0.0;
    for (int i=-2; i<=2; i++) 
	for (int j=-2; j<=2; j++) 
	{		
        vec2 o = vec2(i, j)-.5;
        vec2 h = hash2(ip - o);
        vec2 pp = fp +o  -h;
        float d = dot(pp, pp);
        float w = exp(-d*1.);
        wt +=w;
        h = dv*h+dir;//h=normalize(h+dir);
        va += cos(dot(pp,h)*f/v)*w;
	}    
    return va/wt;
}

//concentric waves variant
float gavoronoi3b(in vec2 p)
{    
    vec2 ip = floor(p);
    vec2 fp = fract(p);
    float f = 5.*PI;//frequency
    float v = 1.;//cell variability <1.
    float va = 0.0;
    float wt = 0.0;
    for (int i=-1; i<=1; i++) 
	for (int j=-1; j<=1; j++) 
	{		
        vec2 o = vec2(i, j)-.5;       		
        vec2 pp = fp +o  - v*hash2(ip - o);
        float d = dot(pp, pp);
        float w = exp(-d*4.);
        wt +=w;
        va +=cos(sqrt(d)*f)*w;
	}    
    return va/wt;
}

float noise( vec2 p)
{   
    return gavoronoi4(p);
}

float fbmabs( vec2 p ) {
	
	float f=1.;
   
	float r = 0.0;	
    for(int i = 0;i<6;i++){	
		r += abs(noise( p*f ))/f;       
	    f *=2.2;
        p+=vec2(-.01,.07)*r+.2*vec2(dirX,dirY)*iTime*speed/(.1-f);
	}
	return r;
}

float fbm( vec2 p ) {
	
	float f=1.;
   
	float r = 0.0;	
    for(int i = 0;i<8;i++){	
		r += noise( p*f )/f;       
	    f *=2.;
        p+=vec2(.01,-.05)*r+.2*vec2(dirX,dirY)*iTime*speed/(.1-f);
	}
	return r;
}

float map(vec2 p){

    if(noiseChooseValue < 0.5)return noise(p*10.);
    if(noiseChooseValue < 1.5)return 2.*abs( noise(p*10.));
	if(noiseChooseValue < 2.5)return fbm(p)+1.;
    return 1.-fbmabs(p);
}

vec3 nor(in vec2 p)
{
	const vec2 e = vec2(0.002, 0.0);
	return -normalize(vec3(
		map(p + e.xy) - map(p - e.xy),
		map(p + e.yx) - map(p - e.yx),
		.15));
}

void main() {
	
	vec2 q = vec2(vUv.x*uvScaleX + uvMoveX, vUv.y*uvScaleY + uvMoveY) * uvScale;
	vec2 p = -1.0 + 2.0 * q;

    // 原 shadertoy 用 iMouse 控制方向，此处改为 dirX/dirY 控制
    p += .2*vec2(dirX,dirY)*iTime*speed;
    vec3 light = normalize(vec3(lightX, lightY, lightZ));
	float r;
    r = max(dot(nor(p), light),0.25);
    float k=map(p)*.8+.15;
    vec3 col = clamp(vec3(r*k*k, r*k, r*sqrt(max(k,0.))),0.,1.);

    if(colorRem){
        float col_wb = dot(col, vec3(0.22, 0.707, 0.071));
        col_wb = max(0., min(1., col_wb + brightness));
        col = vec3(col_wb);
    }

    if(colorRev){
        col = 1.0 - col;
    }

    gl_FragColor = vec4(col, 1.0);
    if(useAlpha){gl_FragColor.a = r;}
}`

export default FragShader
