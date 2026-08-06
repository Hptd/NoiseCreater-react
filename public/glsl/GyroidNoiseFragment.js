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

uniform float scale;
uniform float speed;
uniform float warp;
uniform float bump;
uniform float specular;
uniform float tintStrength;
uniform float hue;
uniform vec3 rimColor;
uniform float rimPower;
uniform bool colorRem;

#define N(x,y,z) normalize(vec3(x,y,z))

float gyroid (vec3 seed)
{
    return dot(sin(seed),cos(seed.yzx));
}

float fbm (vec3 seed)
{
    float result = 0., a = .5;
    for (int i = 0; i < 6; ++i)
    {
        // extra spicy twist
        seed.z += result*.5;

        // bounce it with abs
        result += abs(gyroid(seed/a))*a;

        a /= 2.;
    }
    return result;
}

float noise (vec2 p)
{
    // improvise 3d seed from 2d coordinates
    vec3 seed = vec3(p, length(p) - iTime*speed) * scale;

    // make it slide along the sin wave
    return sin(fbm(seed)*warp + iTime)*.5+.5;
}

void main(){
    vec2 mainUv = vec2((vUv.x+uvMoveX)*uvScaleX, (vUv.y+uvMoveY)*uvScaleY) * (uvScale);

    // 居中坐标 [-1,1]（平面为正方形，纵横比 1:1）
    vec2 p = mainUv*2.0 - 1.0;

    // noise grayscale
    float shade = noise(p);

    // normal gradient
    vec3 normal = normalize(vec3(shade-vec2(noise(p+vec2(.01,0)), noise(p+vec2(0,.01))), bump));

    vec3 color = vec3(0.);

    // light from above
    color += .5*pow(dot(normal, N(0,1,1))*.5+.5, specular);

    // tinted light
    vec3 tint = .5+.5*cos(vec3(1,2,3)*hue + shade + p.x + normal.y*2.);
    color += tint*tintStrength*pow(dot(normal, N(0,0,1))*.5+.5, specular);

    // colored light from below
    color += .5*rimColor*pow(dot(normal, N(0,-2,1))*.5+.5, rimPower);

    vec3 col = color*shade;

    col = clamp(col + vec3(brightness), 0.0, 1.0);
    if(colorRem){
        float gray = dot(col, vec3(0.299, 0.587, 0.114));
        col = vec3(gray);
    }
    if(colorRev){
        col = 1.0 - col;
    }
    gl_FragColor = vec4(col, 1.);
    if(useAlpha){gl_FragColor.a = shade;}
}`
export default FragShader
