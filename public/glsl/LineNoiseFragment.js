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

uniform float width;
uniform float border;
uniform float noiseFreq;
uniform float noiseStr;
uniform float speed;
uniform float grow;
uniform float seed;

float hash( float n )
{
    n = mod(n + seed, 691.564);
    return fract(sin(n)*43758.5453);
}

float perlin(float x) {
    float f = fract(x);
    float i = floor(x);
    return mix(hash(i), hash(i+1.0), smoothstep(0.0, 1.0, f));
}

vec2 hash2( vec2 p )
{
    p = mod(p + seed, 132.5);
    return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
}

float sat01(float x) {
    return clamp(x, 0.0, 1.0);
}

float drawLine(inout vec2 uv, inout float draw, float i, float f) {
    float gt = min(grow, 0.999);
    float growT = sat01(f/gt);
    float widen = sat01((f-gt)/(1.0-gt))*width;

    vec2 norm = hash2(vec2(i, i*1.1))-0.5;
    vec2 nnorm = normalize(norm);

    uv -= norm;

    uv = mat2x2(nnorm.x, nnorm.y, -nnorm.y, nnorm.x) * uv;
    float per = (perlin((uv.y+i)*noiseFreq)-0.5)*noiseStr;

    uv.x += per;

    float tx = uv.x - (step(0.0, uv.x)-0.5)*widen;

    float ans = draw*smoothstep(border+0.003, border, abs(tx))*step(uv.y, mix(-2.0, 2.0, growT));
    draw = sat01(draw - step(2.0*abs(uv.x), widen));
    uv.x = tx - per;

    uv = mat2x2(nnorm.x, -nnorm.y, nnorm.y, nnorm.x) * uv;
    uv += norm;

    return ans;
}

void main(){
    vec2 mainUv = vec2((vUv.x + uvMoveX) * uvScaleX, (vUv.y + uvMoveY) * uvScaleY) * uvScale;
    vec2 uv = mainUv;
    uv -= 0.5;

    float tim = iTime * speed;
    float timei = floor(tim);
    float timef = fract(tim);

    float bord = 0.0;
    float draw = 1.0;

    bord += drawLine(uv, draw, timei, timef);

    timei -= 1.0;

    for(float i = 0.0; i < 500.0; i++) {
        bord += drawLine(uv, draw, timei-i, 1.0);
        if(draw < 0.5) break;
    }

    float col = bord;
    col = max(0., min(1., col + brightness));
    if(colorRev){
        col = 1.0 - col;
    }
    gl_FragColor = vec4(vec3(col), 1.0);
    if(useAlpha){gl_FragColor.a = col;}
}`

export default FragShader
