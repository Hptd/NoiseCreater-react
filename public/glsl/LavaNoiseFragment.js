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
uniform float flowSpeed;
uniform float flowSpeed2;
uniform float displacement;
uniform float advect;
uniform float dispFreq;
uniform float rotSpeed;
uniform float ridgeFreq;
uniform int octaves;
uniform float gain;
uniform float octaveScale;
uniform float baseScale;
uniform vec3 color1;
uniform float gamma;
uniform bool colorRem;

float hash21(vec2 n){ return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453); }

float valueNoise(vec2 x){
	vec2 i = floor(x);
	vec2 f = fract(x);
	f = f*f*(3.0-2.0*f);
	return mix(mix(hash21(i), hash21(i+vec2(1.0,0.0)), f.x),
	           mix(hash21(i+vec2(0.0,1.0)), hash21(i+vec2(1.0,1.0)), f.x), f.y);
}

float noise(vec2 x){ return valueNoise(x * 2.5); }

mat2 makem2(float theta){ float c = cos(theta); float s = sin(theta); return mat2(c,-s,s,c); }

vec2 gradn(vec2 p){
	float ep = 0.09;
	float gradx = noise(vec2(p.x+ep,p.y)) - noise(vec2(p.x-ep,p.y));
	float grady = noise(vec2(p.x,p.y+ep)) - noise(vec2(p.x,p.y-ep));
	return vec2(gradx,grady);
}

float flow(vec2 p){
	float time = iTime * 0.1 * speed;
	float z = 2.0;
	float rz = 0.0;
	vec2 bp = p;
	for (int i = 1; i < octaves + 1; i++){
		float fi = float(i);
		p += time * flowSpeed;
		bp += time * flowSpeed2;
		vec2 gr = gradn(fi*p*dispFreq + time);
		gr *= makem2(time*rotSpeed - (0.05*p.x + 0.03*p.y)*40.0);
		p += gr * displacement;
		rz += (sin(noise(p)*ridgeFreq)*0.5 + 0.5)/z;
		p = mix(bp, p, advect);
		z *= gain;
		p *= octaveScale;
		bp *= baseScale;
	}
	return rz;
}

void main(){
	vec2 mainUv = vec2((vUv.x+uvMoveX)*uvScaleX, (vUv.y+uvMoveY)*uvScaleY) * uvScale;
	vec2 p = (mainUv - 0.5) * 3.0;
	float rz = flow(p);
	vec3 col = color1 / rz;
	col = pow(col, vec3(gamma));
	if(colorRem){
		col = vec3(dot(col, vec3(0.22, 0.707, 0.071)));
	}
	col = max(vec3(0.0), min(vec3(1.0), col + brightness));
	if(colorRev){
		col = 1.0 - col;
	}
	gl_FragColor = vec4(col, 1.0);
	if(useAlpha){ gl_FragColor.a = col.r; }
}
`

export default FragShader
