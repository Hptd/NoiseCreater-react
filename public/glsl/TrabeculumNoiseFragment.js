const FragShader = /*glsl*/`
// a variant from https://www.shadertoy.com/view/ltj3Dc
// 单 pass 体积 raymarch：原 NOISE==3 / VARIANT==2（trabeculum），SHADED=0 / FOG=0。
// iMouse 改为 camTheta / camPhi 参数；画布正方形，fragCoord/iResolution.y 用 vUv 替代。
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
uniform float steps;
uniform float stepSize;
uniform float scale;
uniform float grad;
uniform float threshold;
uniform float fov;
uniform float camTheta;
uniform float camPhi;
uniform vec3 skyColor;
uniform bool colorRem;

#define PI 3.14159
#define time (iTime*speed)

// --- worley / hash (from iq's noise, adapted) ---
vec3 hash13( float n ) {
    return fract(sin(n+vec3(0.,12.345,124))*43758.5453);
}
vec3 hash33( vec3 n ) {
    return hash13(n.x+10.*n.y+100.*n.z);
}

vec4 worley( vec3 p ) {
    vec4 d = vec4(1e15);
    vec3 ip = floor(p);
    for (float i=-1.; i<2.; i++)
   		for (float j=-1.; j<2.; j++)
            for (float k=-1.; k<2.; k++) {
                vec3 p0 = ip+vec3(i,j,k),
                     c = hash33(p0)+p0-p;
                float d0 = dot(c,c);
                if      (d0<d.x) { d.yzw=d.xyz; d.x=d0; }
                else if (d0<d.y) { d.zw =d.yz ; d.y=d0; }
                else if (d0<d.z) { d.w  =d.z  ; d.z=d0; }
                else if (d0<d.w) {              d.w=d0; }
            }
    return sqrt(d);
}

// trabeculum 密度场（原 tweaknoise 的 NOISE>=3 / VARIANT==2 分支）
float tweaknoise( vec3 p ) {
    float g0 = 0.1; // 原初始 grad = .2/2.
    float d2 = smoothstep(g0, -g0, abs(p.z)-.5),
          d  = d2;
    if (d < 0.5) return 0.;
    float th = .5 + .5*(cos(.5*time) + .36*cos(.5*3.*time))/1.36 + threshold;
    vec4 w = scale*worley(scale*p - vec3(0., 0., 3.*time));
    float v = 1. - 1./(1./(w.z-w.x) + 1./(w.a-w.x)); // formula (c) Fabrice NEYRET - BSD3
    return smoothstep(th - grad/2., th + grad/2., v*d);
}

void main(){
    vec2 fragUv = vec2(vUv.x*uvScaleX + uvMoveX, vUv.y*uvScaleY + uvMoveY) * uvScale;

    // camera
    float theta = camTheta;
    float phi = camPhi;
    float t = 3.*time, B = .07; theta += B*cos(t); phi += B*sin(t);
    vec3 cameraPos = vec3(sin(theta)*cos(phi), sin(phi), cos(theta)*cos(phi));
    vec3 cameraTarget = vec3(0.);
    vec3 ww = normalize( cameraPos - cameraTarget );
    vec3 uu = normalize(cross( vec3(0.,1.,0.), ww ));
    vec3 vv = normalize(cross(ww,uu));
    vec2 q = 2.*(fragUv - vec2(.9,.5));
    vec3 rayDir = normalize( q.x*uu + q.y*vv - fov*ww );

    // ray-trace volume
    vec3 col = vec3(0.);
    float transp = 1.;
    float l = .5;
    vec3 p = cameraPos + l*rayDir;

    for (int i = 0; i < int(steps); i++) {
        float Aloc = tweaknoise(p);
        if (Aloc > 0.01) {
            float a = 2.*PI*float(i)/steps;
            vec3 c = .5+.5*cos(a+vec3(0., 2.*PI/3., -2.*PI/3.)+time);
            col += transp*c*Aloc;
            col = clamp(col, 0., 1.);
            transp *= 1.-Aloc;
            if (transp < .001) break;
        }
        p += stepSize*rayDir;
    }

    col = col + transp*skyColor;

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
