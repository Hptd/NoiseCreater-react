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

uniform int slices;
uniform float amplitude;
uniform float frequency;
uniform float density;
uniform float animSpeed;
uniform float scale;
uniform float radius;
uniform float camZ;
uniform float rotAngle;
uniform bool colorRem;

mat3 m = mat3( 0.00,  0.80,  0.60,
              -0.80,  0.36, -0.48,
              -0.60, -0.48,  0.64 );

float hash( float n ){
    return fract(sin(n)*43758.5453123);
}

float noise( in vec3 x ){
    vec3 p = floor(x);
    vec3 f = fract(x);
    f = f*f*(3.0-2.0*f);
    float n = p.x + p.y*57.0 + 113.0*p.z;
    float res = mix(mix(mix( hash(n+  0.0), hash(n+  1.0),f.x),
                        mix( hash(n+ 57.0), hash(n+ 58.0),f.x),f.y),
                    mix(mix( hash(n+113.0), hash(n+114.0),f.x),
                        mix( hash(n+170.0), hash(n+171.0),f.x),f.y),f.z);
    return res;
}

float fbm( vec3 p ){
    float f = 0.0;
    f += 0.5000*noise( p ); p = m*p*2.02;
    f += 0.2500*noise( p ); p = m*p*2.03;
    f += 0.1250*noise( p );
    return f/0.875;
}

vec3 gradient(float s){
	return vec3(0.0, max(1.0-s*2.0, 0.0), max(s>0.5?1.0-(s-0.5)*5.0:1.0, 0.0));
}

bool intersectSphere(vec3 origin, vec3 direction, out float tmin, out float tmax){
    bool hit = false;
	float a = dot(direction, direction);
    float b = 2.0*dot(origin, direction);
    float c = dot(origin, origin) - radius*radius;
    float disc = b*b - 4.0*a*c;
    tmin = tmax = 0.0;

    if (disc > 0.0) {
        float sdisc = sqrt(disc);
        float t0 = (-b - sdisc)/(2.0*a);
        float t1 = (-b + sdisc)/(2.0*a);
		tmax = t1;
        if (t0 >= 0.0)
            tmin = t0;
        hit = true;
    }
    return hit;
}

vec2 rt(vec2 x,float y){
	return vec2(cos(y)*x.x-sin(y)*x.y,sin(y)*x.x+cos(y)*x.y);
}

void main(){
	vec2 mainUv = vec2((vUv.x+uvMoveX)*uvScaleX, (vUv.y+uvMoveY)*uvScaleY) * uvScale;
	vec2 p = mainUv*2.0-1.0;

	vec3 oo = vec3(0.0, 0.0, camZ);
	vec3 od = normalize(vec3(p.x, p.y, -2.0));
	vec3 o,rd;
	o.xz = rt(oo.xz, rotAngle);
	o.y = oo.y;
	rd.xz = rt(od.xz, rotAngle);
	rd.y = od.y;

	vec3 col = vec3(0.0);
	float tmin, tmax;
	if (intersectSphere(o, rd, tmin, tmax)){
		for (int i = 0; i < slices; i++){
			float t = tmin + float(i)/float(slices);
			if (t > tmax)
				break;
			vec3 curpos = o + rd*t;

			float s = (0.5-length(curpos))*2.0;
			s *= s;

			float a = amplitude;
			float b = frequency;
			float d = density;
			for (int j = 0; j < 3; j++){
				d += 0.5/abs((fbm(scale*curpos*b+animSpeed*iTime/b)*2.0-1.0)/a);
				b *= 2.0;
				a /= 2.0;
			}

			col += gradient(s)*max(d*s,0.0);
		}
	}

	if(colorRem){
		col = vec3(dot(col, vec3(0.22, 0.707, 0.071)));
	}
	col = max(vec3(0.0), min(vec3(1.0), col + brightness));
	if(colorRev){
		col = 1.0 - col;
	}
	gl_FragColor = vec4(col, 1.0);
	if(useAlpha){ gl_FragColor.a = max(col.r, max(col.g, col.b)); }
}
`

export default FragShader
