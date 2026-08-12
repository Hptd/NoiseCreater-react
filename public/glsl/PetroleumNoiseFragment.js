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

uniform float speed;
uniform float zoom;
uniform float size;
uniform float intensity;
uniform float quant;
uniform float scope;
uniform float timeNoise;
uniform vec3 color1;
uniform vec3 color2;
uniform vec3 color3;
uniform vec3 color4;
uniform bool colorRem;

#define PI 3.14159265359
#define TWO_PI 6.28318530718

float rand(in float x,in int s){
    return fract(sin(x+float(s))*43758.5453123);
}

float rand(in float x){
    return rand(x,0);
}

float rand(in vec2 uv,in int seed){
    return fract(sin(dot(uv.xy,vec2(12.9898,78.233))+float(seed))*43758.5453123);
}

float rand(in vec2 uv){
    return rand(uv,0);
}

float noise(in float x,in int s){
    float xi=floor(x);
    float xf=fract(x);
    return mix(rand(xi,s),rand(xi+1.,s),smoothstep(0.,1.,xf));
}

float noise(in float x){
    return noise(x,0);
}

float noise(in vec2 p,in int s){
    vec2 pi=floor(p);
    vec2 pf=fract(p);
    
    vec2 o=vec2(0,1);
    
    float bl=rand(pi,s);
    float br=rand(pi+o.yx,s);
    float tl=rand(pi+o.xy,s);
    float tr=rand(pi+o.yy,s);
    
    vec2 w=smoothstep(0.,1.,pf);
    
    float t=mix(tl,tr,w.x);
    float b=mix(bl,br,w.x);
    
    return mix(b,t,w.y);
}

float noise(in vec2 p){
    return noise(p,0);
}

float cosine(in float x,in float s){
    float y=cos(fract(x)*PI);
    return floor(x)+.5-(.5*pow(abs(y),1./s)*sign(y));
}

vec3 gradient(in float t,in vec3 a,in vec3 b,in vec3 c,in vec3 d){
	return a+b*cos(TWO_PI*(c*t+d));
}

void main(){
	vec2 mainUv = vec2((vUv.x+uvMoveX)*uvScaleX, (vUv.y+uvMoveY)*uvScaleY) * uvScale;
	vec2 uv = -1.0 + 2.0 * mainUv;

	float t=iTime*speed/16.;
	t+=noise(t)*timeNoise;
	t+=cosine(t,quant);
	uv*=zoom;
	vec2 uvf=fract(uv)-.5;
	vec2 uvi=floor(uv);
	vec2 n2=(vec2(noise(uv+t,0),noise(uv-t,1))-.5)*scope;
	uvi+=n2;
	
	vec3 col=vec3(0);
	
	int sc=int(scope);
	for(int i=-sc;i<=sc;i++){
		for(int j=-sc;j<=sc;j++){
			vec2 off=vec2(float(i),float(j));
			float n=noise(uvi-off+t*2.)*intensity;
			float s=exp2(n);
			float d=length(uvf+off+n2);
			d=size/d/s;
			col=max(col,gradient(d+uvi.x+uvi.y,color1,color2,color3,color4)*sqrt(d));
		}
	}
	
	if(colorRem){
		col = vec3(dot(col,vec3(0.22, 0.707, 0.071)));
	}

	col = max(vec3(0.), min(vec3(1.), col + brightness));
	if(colorRev){
		col = 1.0 - col;
	}

	gl_FragColor = vec4(col, 1.);
	if(useAlpha){
		gl_FragColor.a = col.r;
	}
}`

export default FragShader
