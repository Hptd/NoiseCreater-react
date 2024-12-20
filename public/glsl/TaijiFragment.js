const FragShader = /*glsl*/`
varying vec2 vUv;
uniform float uvScale;
uniform float uvMoveX;
uniform float uvMoveY;
uniform float uvScaleX;
uniform float uvScaleY;
uniform bool colorRev;
uniform bool useAlpha;
uniform float iTime;

uniform float sharkX;
uniform float sharkY;
uniform float speed;

#define BIG_CIRCLE_RADIUS 0.35
#define SMALL_CIRCLE_RADIUS sharkY
#define STROKE_WIDTH sharkX
#define SMOOTH_PIXEL 1.5
#define SMOOTH(t, x) smoothstep(t - EPSILON*0.5, t + EPSILON*0.5, x)
#define SMOOTHR(t, x) smoothstep(t + EPSILON*0.5, t - EPSILON*0.5, x)
#define WHITE_CIRCLE(r, o) SMOOTHR((r)*0.5, length(uv - o))
#define BLACK_CIRCLE(r, o) SMOOTH((r)*0.5, length(uv - o))

mat2 rotateMat(float angle) {
    return mat2(cos(angle),-sin(angle),
                sin(angle),cos(angle));
}

void main(){
	vec2 uv = (vUv-0.5)*uvScale;

  uv = vec2(uv.x*uvScaleX + uvMoveX, uv.y*uvScaleY + uvMoveY);

    float EPSILON = SMOOTH_PIXEL/315.0;
    uv *= rotateMat(-iTime*speed);
    float v = 0.0;
    vec2 center = vec2(0.0);
    vec2 centerTop = center + vec2(0.0, BIG_CIRCLE_RADIUS/2.0);
    vec2 centerBottom = center + vec2(0.0, -BIG_CIRCLE_RADIUS/2.0);
    
    v += WHITE_CIRCLE(BIG_CIRCLE_RADIUS*2.0, center) * SMOOTH(0.0, uv.x);
    v += WHITE_CIRCLE(BIG_CIRCLE_RADIUS, centerTop);
    v *= BLACK_CIRCLE(BIG_CIRCLE_RADIUS, centerBottom);
    v += WHITE_CIRCLE(SMALL_CIRCLE_RADIUS, centerBottom);
    v *= BLACK_CIRCLE(SMALL_CIRCLE_RADIUS, centerTop);
    v += BLACK_CIRCLE(BIG_CIRCLE_RADIUS*2.0 + STROKE_WIDTH, center);
    float alpha = 1.-BLACK_CIRCLE(BIG_CIRCLE_RADIUS*1.96 + STROKE_WIDTH, center);

    vec3 col = vec3(v);

    if(colorRev){
        col = 1.0 - col;
    }
    gl_FragColor = vec4(col, 1.0);
    if(useAlpha){gl_FragColor.a = alpha;}
}`

export default FragShader