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

uniform float cloudscale;
uniform float speed;
uniform float clouddark;
uniform float cloudlight;
uniform float cloudcover;
uniform float cloudalpha;
uniform float skytint;
uniform vec3 skycolour1;
uniform vec3 skycolour2;
uniform vec3 cloudcolour;
uniform float warp;
uniform bool colorRem;

vec2 hash( vec2 p ) {
	p = vec2(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)));
	return -1.0 + 2.0*fract(sin(p)*43758.5453123);
}

float noise( in vec2 p ) {
    const float K1 = 0.366025404;
    const float K2 = 0.211324865;
	vec2 i = floor(p + (p.x+p.y)*K1);
    vec2 a = p - i + (i.x+i.y)*K2;
    vec2 o = (a.x>a.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
    vec2 b = a - o + K2;
	vec2 c = a - 1.0 + 2.0*K2;
    vec3 h = max(0.5-vec3(dot(a,a), dot(b,b), dot(c,c) ), 0.0 );
	vec3 n = h*h*h*h*vec3( dot(a,hash(i+0.0)), dot(b,hash(i+o)), dot(c,hash(i+1.0)));
    return dot(n, vec3(70.0));
}

float fbm(vec2 n) {
    mat2 m = mat2(1.6, 1.2, -1.2, 1.6) * warp;
	float total = 0.0, amplitude = 0.1;
	for (int i = 0; i < 7; i++) {
		total += noise(n) * amplitude;
		n = m * n;
		amplitude *= 0.4;
	}
	return total;
}

void main() {
    vec2 mainUv = vec2((vUv.x+uvMoveX)*uvScaleX, (vUv.y+uvMoveY)*uvScaleY) * uvScale;
    vec2 p = mainUv;
	vec2 uv = p;

    mat2 m = mat2(1.6, 1.2, -1.2, 1.6) * warp;

    float time = iTime * speed;
    float q = fbm(uv * cloudscale * 0.5);

    //ridged noise shape
	float r = 0.0;
	uv *= cloudscale;
    uv -= q - time;
    float weight = 0.8;
    for (int i=0; i<8; i++){
		r += abs(weight*noise( uv ));
        uv = m*uv + time;
		weight *= 0.7;
    }

    //noise shape
	float f = 0.0;
    uv = p;
	uv *= cloudscale;
    uv -= q - time;
    weight = 0.7;
    for (int i=0; i<8; i++){
		f += weight*noise( uv );
        uv = m*uv + time;
		weight *= 0.6;
    }

    f *= r + f;

    //noise colour
    float c = 0.0;
    time = iTime * speed * 2.0;
    uv = p;
	uv *= cloudscale*2.0;
    uv -= q - time;
    weight = 0.4;
    for (int i=0; i<7; i++){
		c += weight*noise( uv );
        uv = m*uv + time;
		weight *= 0.6;
    }

    //noise ridge colour
    float c1 = 0.0;
    time = iTime * speed * 3.0;
    uv = p;
	uv *= cloudscale*3.0;
    uv -= q - time;
    weight = 0.4;
    for (int i=0; i<7; i++){
		c1 += abs(weight*noise( uv ));
        uv = m*uv + time;
		weight *= 0.6;
    }

    c += c1;

    vec3 skycolour = mix(skycolour2, skycolour1, p.y);
    vec3 cloudcolourFinal = cloudcolour * clamp((clouddark + cloudlight*c), 0.0, 1.0);

    f = cloudcover + cloudalpha*f*r;

    vec3 result = mix(skycolour, clamp(skytint * skycolour + cloudcolourFinal, 0.0, 1.0), clamp(f + c, 0.0, 1.0));

    if(colorRem){
        result = vec3(dot(result, vec3(0.299, 0.587, 0.114)));
    }
    result = max(vec3(0.), min(vec3(1.), result + brightness));
    if(colorRev){
        result = 1.0 - result;
    }

    gl_FragColor = vec4(result, 1.0);
    if(useAlpha){gl_FragColor.a = result.r;}
}`
export default FragShader
