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
uniform float sampleDist;
uniform float bumpStrength;
uniform float baseBright;
uniform vec3 color1;
uniform bool colorRem;

float smoothNoise(vec2 p) {
    vec2 f = fract(p); p -= f; f *= f*(3.-f-f);
    return dot(mat2(fract(sin(vec4(0, 1, 27, 28) + p.x+p.y*27.) * 1e5))*vec2(1.-f.y,f.y), vec2(1.-f.x, f.x));
}

float fractalNoise(vec2 p) {
    return smoothNoise(p)*0.5333 + smoothNoise(p*2.)*0.2667 + smoothNoise(p*4.)*0.1333 + smoothNoise(p*8.)*0.0667;
}

float warpedNoise(vec2 p) {
    vec2 m = vec2(iTime, -iTime)*speed;
    float x = fractalNoise(p + m);
    float y = fractalNoise(p + m.yx + x);
    float z = fractalNoise(p - m - x + y);
    return fractalNoise(p + vec2(x, y) + vec2(y, z) + vec2(z, x) + length(vec3(x, y, z))*0.25);
}

void main(){
    vec2 uv = vec2((vUv.x + uvMoveX) * uvScaleX, (vUv.y + uvMoveY) * uvScaleY) * uvScale;
    vec2 p = uv * scale;

    float n = warpedNoise(p);
    float n2 = warpedNoise(p + sampleDist);

    float bump = max(n2 - n, 0.)/sampleDist*.7071;
    float bump2 = max(n - n2, 0.)/sampleDist*.7071;

    bump = bump*bump*.5 + pow(bump, 4.)*.5;
    bump2 = bump2*bump2*.5 + pow(bump2, 4.)*.5;

    vec3 col = n*n*(color1*vec3(bump, (bump + bump2)*.4, bump2)*bumpStrength + baseBright);
    col = sqrt(max(col, 0.));

    col = max(vec3(0.), min(vec3(1.), col + brightness));
    if(colorRem){
        float col_wb = dot(col, vec3(0.22, 0.707, 0.071));
        col_wb = max(0., min(1., col_wb + brightness));
        if(colorRev){ col_wb = 1.0 - col_wb; }
        col = vec3(col_wb);
    }

    gl_FragColor = vec4(col, 1.);
    if(useAlpha){gl_FragColor.a = col.r;}
}`
export default FragShader
