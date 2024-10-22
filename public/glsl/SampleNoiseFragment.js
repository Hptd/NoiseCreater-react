const FragShader = /*glsl*/`
varying vec2 vUv;
uniform float uvScale;
uniform float uvMoveX;
uniform float uvMoveY;
uniform float uvScaleX;
uniform float uvScaleY;
uniform float brightness;
uniform bool colorRev;
uniform bool useAlpha;

float noise(vec2 pos)
{
	return fract( sin( dot(pos*0.001 ,vec2(24.12357, 36.789) ) ) * 12345.123);	
}

void main(){
	vec2 mainUv = vec2(vUv.x * uvScaleX + uvMoveX, vUv.y * uvScaleY + uvMoveY);
    float sampleNoise = noise(mainUv*(10000.) * uvScale);

    sampleNoise = saturate(sampleNoise + brightness);

    if(colorRev){sampleNoise = 1. - sampleNoise;}

    gl_FragColor = vec4(vec3(sampleNoise), 1.);
    if(useAlpha){gl_FragColor = vec4(sampleNoise);}
}`

export default FragShader