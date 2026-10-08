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

uniform float frequency;
uniform float amplitude;
uniform float speed;
uniform float degreeSpeed;
uniform float rotateStrength;
uniform vec3 color1;
uniform vec3 color2;
uniform vec3 color3;
uniform vec3 color4;
uniform bool colorRem;

#define S(a,b,t) smoothstep(a,b,t)

mat2 Rot(float a)
{
    float s = sin(a);
    float c = cos(a);
    return mat2(c, -s, s, c);
}

vec2 hash( vec2 p )
{
    p = vec2( dot(p,vec2(2127.1,81.17)), dot(p,vec2(1269.5,283.37)) );
    return fract(sin(p)*43758.5453);
}

float noise( in vec2 p )
{
    vec2 i = floor( p );
    vec2 f = fract( p );

    vec2 u = f*f*(3.0-2.0*f);

    float n = mix( mix( dot( -1.0+2.0*hash( i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                        dot( -1.0+2.0*hash( i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                   mix( dot( -1.0+2.0*hash( i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                        dot( -1.0+2.0*hash( i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
    return 0.5 + 0.5*n;
}

void main(){
    vec2 mainUv = vec2(vUv.x*uvScaleX + uvMoveX, vUv.y*uvScaleY + uvMoveY) * uvScale;
    vec2 tuv = mainUv;
    tuv -= .5;

    // rotate with Noise
    float degree = noise(vec2(iTime*degreeSpeed, tuv.x*tuv.y));

    tuv *= Rot(radians((degree-.5)*rotateStrength+180.));

    // Wave warp with sin
    float waveSpeed = iTime * speed;
    tuv.x += sin(tuv.y*frequency+waveSpeed)/amplitude;
    tuv.y += sin(tuv.x*frequency*1.5+waveSpeed)/(amplitude*.5);

    // draw the image
    vec3 layer1 = mix(color1, color2, S(-.3, .2, (tuv*Rot(radians(-5.))).x));
    vec3 layer2 = mix(color3, color4, S(-.3, .2, (tuv*Rot(radians(-5.))).x));

    vec3 col = mix(layer1, layer2, S(.5, -.3, tuv.y));

    if(colorRem){
        col = vec3(dot(col, vec3(0.299, 0.587, 0.114)));
    }
    col = max(vec3(0.), min(vec3(1.), col + brightness));
    if(colorRev){
        col = 1.0 - col;
    }
    gl_FragColor = vec4(col, 1.0);
    if(useAlpha){ gl_FragColor.a = col.r; }
}
`

export default FragShader
