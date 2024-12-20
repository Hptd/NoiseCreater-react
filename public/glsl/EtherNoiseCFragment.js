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
uniform float iTime;

uniform float onlyBri;
uniform float sharkX;
uniform float sharkY;
uniform float sharkZ;
uniform float hue;
uniform float saturate;
uniform float speed;
uniform bool colorRem;

mat2 rotate2d(float angle){
    return mat2(cos(angle),-sin(angle),
                sin(angle),cos(angle));
}
float variation(vec2 v1, vec2 v2, float strength, float speedFunc) {
	return sin(
        dot(normalize(v1), normalize(v2)) * strength + iTime * speedFunc
    ) / 100.0;
}
vec3 paintCircle (vec2 uv, vec2 center, float rad, float width) {
    
    vec2 diff = center-uv;
    float len = length(diff);
    len += variation(diff, vec2(0.0, 1.0), 5.0, saturate);
    len -= variation(diff, vec2(1.0, 0.0), 5.0, hue);
    float circle = smoothstep(rad-width, rad, len) - smoothstep(rad, rad+width, len);
    return vec3(circle);
}

void main(){
    vec2 uv = (vUv-0.5)*uvScale;
    uv = vec2(uv.x * uvScaleX + uvMoveX, uv.y * uvScaleY + uvMoveY);
    
    vec3 col;
    float radius = onlyBri;
    vec2 center = vec2(0.);
    col = paintCircle(uv, center, radius, sharkY);
    float alpha = col.g;
    vec2 v = rotate2d(iTime*speed) * uv;
    col *= vec3(v.x, v.y, sharkZ-v.y*v.x);
    col += paintCircle(uv, center, radius, sharkX);

    if(colorRem){
        float col_wb = dot(col, vec3(0.22, 0.707, 0.071));
        col_wb = max(0., min(1., col_wb + brightness));
        if(colorRev){
            col_wb = 1.0 - col_wb;
        }
        col = vec3(col_wb);
    }

    gl_FragColor = vec4(col, 1);
    if(useAlpha){gl_FragColor.a = alpha;}
}`

export default FragShader