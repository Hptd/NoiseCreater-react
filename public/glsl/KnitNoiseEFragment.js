const FragShader = /*glsl*/`
varying vec2 vUv;
uniform float uvScale;
uniform float uvMoveX;
uniform float uvMoveY;
uniform float uvScaleX;
uniform float uvScaleY;
uniform float brightness;
uniform bool useAlpha;
uniform bool colorRev;

uniform float sharkX;
uniform float sharkY;


float KnitPattern (vec2 p)
{
  float f = sin((p.x + p.y) * 111.);
  p *= vec2(45.,30.);
  p.y += abs( fract((p.x-sharkX)/2.) * 2. - 1.);
  float d = brightness + 1.0 - length(fract(p) - sharkY);
  return mix(f, d, 1.);
}
void main(){
	vec2 uv = vec2((vUv.x+uvMoveX)*uvScaleX, (vUv.y+uvMoveY)*uvScaleY) * (uvScale) * 0.4;
    float col = KnitPattern(uv);
    if(colorRev){
        col = 1.0 - col;
    }
    float alpha = 1.0;
    if(useAlpha){
        alpha = col;
    }
    vec3 color = vec3(col);

    gl_FragColor = vec4(color, alpha);
}`

export default FragShader