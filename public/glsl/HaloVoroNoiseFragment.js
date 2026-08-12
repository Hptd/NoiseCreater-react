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

uniform int octaves;
uniform float amp;
uniform float freq;
uniform float freqMult;
uniform float decay;
uniform float jitter;
uniform float edge;
uniform float detailScale;
uniform float pulse;
uniform float power;
uniform float boost;
uniform float colorR;
uniform float colorG;
uniform float colorB;
uniform float gain;
uniform bool colorRem;

#define PI 3.1415926

vec2 hash2(vec2 p) { p=vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))); return fract(sin(p)*43758.5453); }

mat3 lookAt( in vec3 eye, in vec3 center, in vec3 up )
{
	vec3 f = normalize(center - eye);
	vec3 s = normalize(cross(f, up));
	vec3 u = cross(s, f);
    return mat3(s, u, -f);
}

float voronoiDistance( in vec2 pos )
{
	vec2 p = floor(pos), f = fract(pos);
    float u = jitter * 0.5 * (sin(iTime-0.5*PI) + 1.0);

	vec2 res = vec2(8.0);
	for(int i = -1; i <= 1; i ++)
	for(int k = -1; k <= 1; k ++)
	{
		vec2 b = vec2(i, k);
		vec2 r = b - f + hash2(p + b) * u;

		float d = dot(r, r);

		if(d < res.x){
            res.y = res.x;
            res.x = d;
        }
        else if(d < res.y){
            res.y = d;
        }
	}
	return res.y - res.x;
}

vec3 render( in vec3 rayOri, in vec3 rayDir )
{
    float theta = 2.0 * (acos(0.5*rayDir.x) / PI) - 1.0;
    float phi = atan(rayDir.y, rayDir.z) / PI;
    vec2 uv = vec2(theta, phi);

    float v = 0.0;
    float a = amp;
    float f = freq;
	for(int i = 0; i < octaves; ++i)
	{
		float v1 = 1.0 - smoothstep(0.0, edge, voronoiDistance(uv * f));
		float v2 = 1.0 - smoothstep(0.0, edge, voronoiDistance(uv * f * detailScale + iTime));
        float intensity = pulse * (cos(iTime) + 1.0);
		v += a * (pow(v1 * (0.5 + v2), power) + v1 * intensity + boost);
		f *= freqMult;
		a *= decay;
	}

	vec3 c = vec3(colorR, colorG, colorB);
	vec3 col = vec3(pow(v, c.x), pow(v, c.y), pow(v, c.z)) * gain;

    return col;
}

void main(){
	vec2 mainUv = vec2((vUv.x + uvMoveX) * uvScaleX, (vUv.y + uvMoveY) * uvScaleY) * uvScale;
    vec2 uv = 2.0 * mainUv - 1.0;

    vec3 rayOri = vec3(0.0);
    vec3 rayTgt = vec3(1.0, 0.0, 0.0);

    mat3 viewMat = lookAt(rayOri, rayTgt, vec3(0.0, 1.0, 0.0));
    vec3 rayDir = normalize(viewMat * vec3(uv, -1.0));

    vec3 col = render(rayOri, rayDir);

    if(colorRem){
        col = vec3(dot(col, vec3(0.22, 0.707, 0.071)));
    }
    col = max(vec3(0.), min(vec3(1.), col + brightness));
    if(colorRev){
        col = 1.0 - col;
    }

	gl_FragColor = vec4(col, 1.0);
    if(useAlpha){gl_FragColor.a = col.r;}
}`

export default FragShader
