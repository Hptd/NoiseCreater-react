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

uniform float density;
uniform float hashFreq;
uniform float intensity;
uniform float threshold;
uniform float seed;

void main(){
	vec2 mainUv = vec2((vUv.x+uvMoveX)*uvScaleX, (vUv.y+uvMoveY)*uvScaleY) * (uvScale);

	// 六边形坐标变换：density 为横向格数（原 shader 用 mat2(12,-7,0,14)/1e2 做六边形斜格坐标）
	vec2 U = mainUv * density * (100.0 / 12.0);
	U = U * mat2(12, -7, 0, 14) / 100.0;

	// 依据格点到原点距离的高频哈希决定走哪个六边形方向；seed 作随机种子洗牌迷宫
	float r = sin(hashFreq * (length(ceil(U)) + seed));
	float sel = r > threshold ? U.x : r < -threshold ? U.y : -U.x - U.y;

	// 迷宫的"墙"在 fract(sel)≈0 处最亮
	float f = intensity / fract(sel);

	f = max(0., min(1., f + brightness));
	if(colorRev){
		f = 1.0 - f;
	}
	gl_FragColor = vec4(vec3(f), 1.);
	if(useAlpha){gl_FragColor.a = f;}
}`
export default FragShader
