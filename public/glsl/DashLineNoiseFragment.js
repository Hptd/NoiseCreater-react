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
uniform float rowThickness;
uniform float dashFreq;
uniform float dashScale;
uniform float moveSpeed;
uniform float xOffsetDiv;
uniform float dashRatio;
uniform float lineWidth;

// 2D Random
float random (in vec2 st) { 
    return fract(sin(dot(st.xy,vec2(12.9898,78.233))) * 43758.5453123);
}

// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f*f*(3.0-2.0*f);
    return mix(a, b, u.x) + 
            (c - a)* u.y * (1.0 - u.x) + 
            (d - b) * u.x * u.y;
}

void main(){
	vec2 mainUv = vec2((vUv.x + uvMoveX) * uvScaleX, (vUv.y + uvMoveY) * uvScaleY) * uvScale;
    vec2 uv = 2.0 * mainUv - 1.0;

    float time = iTime * speed;
    float rt = uv.y * rowThickness;
    float rowIndex = floor(rt);
    float lineProgress = rt - rowIndex;
    float dashLength = noise(vec2(time + rowIndex * dashFreq, 1.));
    uv *= vec2(dashLength * dashScale, 1.);
    float timeAdd = (mod(rowIndex, 2.) == 0.) ? time : -time;
    timeAdd *= moveSpeed;
    float xOffset = rowIndex / xOffsetDiv;
    uv += vec2(timeAdd + dashLength + xOffset, 0.);
    float col = 0.;
    if(fract(uv.x) > dashRatio) {
        col = ceil(lineWidth - distance(0.5, lineProgress));
    }

    col = max(0., min(1., col + brightness));
    if(colorRev){
        col = 1.0 - col;
    }
    gl_FragColor = vec4(vec3(col), 1.0);
    if(useAlpha){gl_FragColor.a = col;}
}`

export default FragShader
