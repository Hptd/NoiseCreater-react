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

uniform float scales;
uniform float zoomDistance;
uniform float speed;
uniform float firstDivision;
uniform float fRatio;
uniform float limitDetails;
uniform float smoothZone;
uniform float clampLevel;
uniform float theta;
uniform float rotSpeed;
uniform float centerX;
uniform float centerY;
uniform float seed;
uniform float gazConcentration;

// --- Fractal noise simulating heterogeneous density in galactic clouds
// ---   -> help from Fabrice Neyret, https://www.shadertoy.com/user/FabriceNeyret2
// ---   -> noise functions from Inigo Quilez, https://www.shadertoy.com/view/XslGRr

// Id of the lowest displayed scale (debug)
#define FirstScale 0.

// 虚拟分辨率：原 shader 用 iResolution.x 作为抗锯齿阈值基准，此处以固定宽度近似
#define VirtualRes 1024.

// --- noise functions from https://www.shadertoy.com/view/XslGRr
// Created by inigo quilez - iq/2013
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.

vec2 hash( vec2 p ) {  						// rand in [-1,1]
	p = vec2( dot(p,vec2(127.1,311.7)),
			  dot(p,vec2(269.5,183.3)) );
	return -1. + 2.*fract(sin(p+20.)*53758.5453123);
}
float noise( in vec2 p ) {
    vec2 i = floor(p), f = fract(p);
	vec2 u = f*f*(3.-2.*f);
    return mix( mix( dot( hash( i + vec2(0.,0.) ), f - vec2(0.,0.) ), 
                     dot( hash( i + vec2(1.,0.) ), f - vec2(1.,0.) ), u.x),
                mix( dot( hash( i + vec2(0.,1.) ), f - vec2(0.,1.) ), 
                     dot( hash( i + vec2(1.,1.) ), f - vec2(1.,1.) ), u.x), u.y);
}

// -----------------------------------------------

vec3 colormap(float value) {
	float maxv = clampLevel;
	vec3 c1,c2;
	float t;
	if (value < maxv / 3.) {
		c1 = vec3(1.);   	   c2 = vec3(1., 1., .5);
		t =  1./3.;
	} else if (value < maxv * 2. / 3.) {
		c1 = vec3(1., 1., .5); c2 = vec3(1., 0,  0.);
		t =  2./3. ;
	} else {
		c1 = vec3(1., 0., 0.); c2 = vec3(0.);
		t =  1.;
	}
	t = (t*maxv-value)/(maxv/3.);
	return t*c1 + (1.-t)*c2;
}

void main() { // --------------------------------------
    
    float t = iTime * speed;
    
    vec2 uv = vec2(vUv.x*uvScaleX + uvMoveX, vUv.y*uvScaleY + uvMoveY) * uvScale;

	float d = 1.; // initial density

	float cycle = cos(mod(-t,100.)/100.*2.*3.14);
	float n_tiles_level_1 = exp(cycle*cycle*zoomDistance)*pow(2.,firstDivision);
	
	// zoom and centering
	uv = (uv - vec2(centerX,centerY))*n_tiles_level_1 + vec2(centerX,centerY);
	
	float th = theta + rotSpeed*t; // some rotations, not necessary
    mat2 m = fRatio*mat2( cos(th),sin(th), 
					 -sin(th),cos(th) );
		
	// computation of the multiplicative noise
	float q = 1.;
	for (float i = 0.; i < scales; i++) {
		if (d<1e-2) continue;
		
		// multiply the amplitude to maintain the total density
		float c = (i+1. < scales) ? 2. : 1.;
		
		float nn = noise(uv + seed*i*i);

		for (float j = 0.; j < gazConcentration; j++) {
			nn = sin(nn*3.14159265359/2.);
		}

		float n = c* 0.5*(1.+nn);
		
		// compute only the visible scales
		float crit = n_tiles_level_1 *q - VirtualRes/limitDetails;
		if (crit < smoothZone && i >= FirstScale) {
			if (crit>0.) {  // avoid aliasing
				float tt = crit/smoothZone;				
				n = n*(1.-tt);
				n += tt;
			}
			
			d *= n;
		}
	
		uv = m*uv; q*= fRatio; // go to the next octave
	}
	
	d = clamp(d,0.0,d);
	// 默认纯黑白：取 colormap 的亮度作为灰度
	vec3 col = vec3(dot(colormap(exp(-d)), vec3(0.22, 0.707, 0.071)));

	col = max(vec3(0.), min(vec3(1.), col + brightness));
	if(colorRev){
		col = 1.0 - col;
	}

	gl_FragColor = vec4(col, 1.0);
	if(useAlpha){gl_FragColor.a = col.r;}
}`

export default FragShader
