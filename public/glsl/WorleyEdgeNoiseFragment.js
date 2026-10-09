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
uniform float distScale;
uniform float edgeGain;
uniform float edgeOffset;
uniform float hashRatio;
uniform float hashSeed;

// simplification of https://www.shadertoy.com/view/lt2GDt
// used for 3D trabeculum here : https://www.shadertoy.com/view/MlB3Wt

vec2 H(vec2 n) {
    return fract( 1e4 * sin( n.x + n.y/hashRatio + vec2(1. + hashSeed, 12.34 + hashSeed) ) );
}

void main() {
    vec2 mainUv = vec2((vUv.x+uvMoveX)*uvScaleX, (vUv.y+uvMoveY)*uvScaleY) * uvScale;
    // 原 shader 用 5.*(U+U-R)/R.y；工作区为正方形，(2U-R)/R.y 等价于 2*uv-1
    vec2 U = scale * (2.*mainUv - 1.) + iTime*speed;

    vec2 p, c;
    float l;

    vec4 O = vec4(9.);  // --- Worley noise: sorted distance to first 3 nodes
    for (int k=0; k<9; k++) // 3x3 neighborhood
    {
        p = ceil(U) + vec2(float(k-k/3*3), float(k/3)) - 2.; // cell id = floor(U)+vec2(i,j)
        l = dot(c = H(p) + p-U, c);                          // distance^2 to its node
        if (l < O.x) { O.yz = O.xy; O.x = l; }               // ordered 3 min distances
        else if (l < O.y) { O.z = O.y; O.y = l; }
        else if (l < O.z) { O.z = l; }
    }
    O = distScale * sqrt(O);

    // --- smooth distance to borders and nodes (simplified form)
    O -= O.x;
    O += edgeGain * ( O.y/(O.y/O.z+1.) - edgeOffset ) - O;

    float s = O.x;
    vec3 col = vec3(s);
    col = max(vec3(0.), min(vec3(1.), col + brightness));
    if(colorRev){
        col = 1.0 - col;
    }

    gl_FragColor = vec4(col, 1.0);
    if(useAlpha){gl_FragColor.a = clamp(s, 0., 1.);}
}`

export default FragShader
