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

uniform float lineScale;
uniform float lineCount;
uniform float warpStrength;
uniform float noiseFreq;
uniform float animSpeed;
uniform vec3 lightColor;
uniform vec3 darkColor;
uniform bool colorRem;

#define MOD3 vec3(.1031,.11369,.13787)

vec3 hash33(vec3 p3)
{
	p3 = fract(p3 * MOD3);
	p3 += dot(p3, p3.yxz + 19.19);
	return -1.0 + 2.0 * fract(vec3((p3.x + p3.y) * p3.z, (p3.x + p3.z) * p3.y, (p3.y + p3.z) * p3.x));
}

float simplex_noise(vec3 p)
{
	const float K1 = 0.333333333;
	const float K2 = 0.166666667;

	vec3 i = floor(p + (p.x + p.y + p.z) * K1);
	vec3 d0 = p - (i - (i.x + i.y + i.z) * K2);

	vec3 e = step(vec3(0.0), d0 - d0.yzx);
	vec3 i1 = e * (1.0 - e.zxy);
	vec3 i2 = 1.0 - e.zxy * (1.0 - e);

	vec3 d1 = d0 - (i1 - 1.0 * K2);
	vec3 d2 = d0 - (i2 - 2.0 * K2);
	vec3 d3 = d0 - (1.0 - 3.0 * K2);

	vec4 h = max(0.6 - vec4(dot(d0, d0), dot(d1, d1), dot(d2, d2), dot(d3, d3)), 0.0);
	vec4 n = h * h * h * h * vec4(dot(d0, hash33(i)), dot(d1, hash33(i + i1)), dot(d2, hash33(i + i2)), dot(d3, hash33(i + 1.0)));

	return dot(vec4(31.316), n);
}

void main(){
	vec2 mainUv = vec2((vUv.x + uvMoveX) * uvScaleX, (vUv.y + uvMoveY) * uvScaleY) * uvScale;

	float scale = max(lineScale, 0.001);
	vec2 p = (mainUv - 0.5) * scale;
	float count = max(floor(lineCount), 1.0);

	vec2 gid = vec2(p.x, floor(p.y * count));
	vec2 guv = vec2(p.x, fract(p.y * count)) - vec2(0.0, 0.5);

	float g = 1.0;
	// 行越密，单行对应的格子越小：同步放大扭曲格数与线宽格数，保证只有线条数量在变
	float wSize = min(warpStrength * count / 100.0, 32.0);
	float sf = 0.001 * count;

	for (int k = -32; k <= 32; k++) {
		float i = float(k);
		if (abs(i) > wSize) continue;

		vec2 iuv = guv + vec2(0.0, i);
		float iid = gid.y - i;
		vec2 nuv = vec2(p.x * 100.0, iid * (100.0 / count));
		vec2 uv = iuv + simplex_noise(vec3(nuv * noiseFreq, iTime * animSpeed)) * wSize;

		g *= smoothstep(abs(uv.y), 0.0, sf * 0.5);
	}

	vec3 col;
	if (colorRem) {
		col = vec3(1.0 - g);
	} else {
		col = mix(lightColor, darkColor, g);
	}

	col = clamp(col + brightness, 0.0, 1.0);
	if (colorRev) {
		col = 1.0 - col;
	}
	gl_FragColor = vec4(col, 1.0);
	if (useAlpha) {
		// alpha 跟随最终画面的白色量（与其他噪波一致），而非线条遮罩 g
		gl_FragColor.a = colorRem ? col.r : max(col.r, max(col.g, col.b));
	}
}`

export default FragShader
