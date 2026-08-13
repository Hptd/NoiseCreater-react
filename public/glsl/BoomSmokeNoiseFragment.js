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

uniform vec3 boomColor1;
uniform vec3 boomColor2;
uniform vec3 boomColor3;
uniform vec3 boomColor4;
uniform vec3 smokeColor1;
uniform vec3 smokeColor2;
uniform vec3 smokeColor3;
uniform vec3 bgColor;
uniform float cycle;
uniform float zoom;
uniform float boomDistort;
uniform float smokeDistort;
uniform float bubbleW;
uniform float smokeBubbleW;
uniform float borderWidth;
uniform float mixThreshold;
uniform bool colorRem;

vec3 n_rand3(vec3 p) {
    vec3 r = 
        fract(
            sin(
                vec3(
                    dot(p, vec3(127.1,311.7,371.8)),
                    dot(p,vec3(269.5,183.3,456.1)),
                    dot(p,vec3(352.5,207.3,198.67))
                )
            ) * 43758.5453
        ) * 2.0 - 1.0;
    return normalize(vec3(r.x/cos(r.x), r.y/cos(r.y), r.z/cos(r.z)));
}

float noise(vec3 p) {

    vec3 fv = fract(p);
    vec3 nv = vec3(floor(p));
    
    vec3 u = fv*fv*fv*(fv*(fv*6.0-15.0)+10.0);
    
    return (
        mix(
            mix(
                mix(
                    dot( n_rand3( nv+vec3(0.0,0.0,0.0) ), fv-vec3(0.0,0.0,0.0)), 
                    dot( n_rand3( nv+vec3(1.0,0.0,0.0) ), fv-vec3(1.0,0.0,0.0)), 
                    u.x
                ), 
                mix(
                    dot( n_rand3( nv+vec3(0.0,1.0,0.0) ), fv-vec3(0.0,1.0,0.0)), 
                    dot( n_rand3( nv+vec3(1.0,1.0,0.0) ), fv-vec3(1.0,1.0,0.0)), 
                    u.x
                ), 
                u.y
            ),
            mix(
                mix(
                    dot( n_rand3( nv+vec3(0.0,0.0,1.0) ), fv-vec3(0.0,0.0,1.0)), 
                    dot( n_rand3( nv+vec3(1.0,0.0,1.0) ), fv-vec3(1.0,0.0,1.0)), 
                    u.x
                ), 
                mix(
                    dot( n_rand3( nv+vec3(0.0,1.0,1.0) ), fv-vec3(0.0,1.0,1.0)), 
                    dot( n_rand3( nv+vec3(1.0,1.0,1.0) ), fv-vec3(1.0,1.0,1.0)), 
                    u.x
                ), 
                u.y
            ),
            u.z
       )
  );
}

float worley(vec3 s)
{
    vec3 si = floor(s);
    vec3 sf = fract(s);

    float m_dist = 1.;  

    for (int y= -1; y <= 1; y++) {
        for (int x= -1; x <= 1; x++) {
            for (int z= -1; z <= 1; z++) {
                vec3 neighbor = vec3(float(x),float(y), float(z));

                vec3 point = fract(n_rand3(si + neighbor));
                point = 0.5 + 0.5*sin(iTime + 6.2831*point);

                vec3 diff = neighbor + point - sf;

                float dist = length(diff);

                m_dist = min(m_dist, dist);
            }
        }
    }

    return m_dist;
}

float boom (vec2 p)
{
    float repeat = mod(iTime, cycle);
    float shape = 1.-pow(distance(vec3(p, 0.), vec3(0.)),2.) / (repeat*12.) - repeat*2.;
    
    float distortion = noise(vec3(p*boomDistort, iTime*.5));
    float bubbles = .5-pow(worley(vec3(p*1.2,iTime*2.)), 3.);
    float bw = bubbleW;
    float effects = (bw * bubbles + (1.-bw) * distortion);

    return shape + effects;
}

float smoke (vec2 p)
{
    float repeat = mod(iTime, cycle);
    float shape = 1.-pow(distance(vec3(p - vec2(0, 2) * pow(repeat/1.45,2.)*1.5, 0.), vec3(0.)),2.) / (repeat*16.) - pow(repeat*1.5,.5);
    
    float distortion = noise(vec3(p*smokeDistort - vec2(0, 2) * pow(repeat/1.45,2.)*1.5, iTime*.1));
    float bubbles = .5-pow(worley(vec3((p/pow(repeat,.35)) - vec2(0, 2) * pow(repeat/1.65,2.)*1.5, iTime*.1)), 2.);
    float bw = smokeBubbleW;
    float effects = (bw * bubbles + (1.-bw) * distortion);

    return shape + effects;
}

float f (vec2 p){
    float b = boom(p);
    float s = smoke(p);
    return b > s ? b : s;
}

vec2 grad( vec2 x )
{
    vec2 h = vec2( 0.01, 0.0 );
    return vec2( f(x+h.xy) - f(x-h.xy),
                 f(x+h.yx) - f(x-h.yx) )/(2.0*h.x);
}

float border (vec2 uv)
{

    float b = f( uv );
    vec2  g = grad( uv );
    float de = abs(b)/length(g);
    float eps = borderWidth;
    
    return smoothstep( 1.0*eps, 2.0*eps, de );
}

float posterize(float v, int n)
{
    float fn = float(n);
    return floor(v*fn)/(fn-1.);
}

void main(){
	vec2 mainUv = vec2((vUv.x + uvMoveX) * uvScaleX, (vUv.y + uvMoveY) * uvScaleY) * uvScale;
    vec2 uv = mainUv;
    vec2 pos = uv - vec2(.5, .4);
    pos *= zoom;

    vec3 boom_pal[4] = vec3[4](boomColor1, boomColor2, boomColor3, boomColor4);
    vec3 smoke_pal[3] = vec3[3](smokeColor1, smokeColor2, smokeColor3);

    int bpl = boom_pal.length();
    int spl = smoke_pal.length();

    float boom_val = boom(pos);
    float boom_a = step(0., boom_val);
    vec3 boom_col = boom_pal[int(posterize(boom_val, bpl)*float(bpl))] - vec3(1.-boom_a);
    
    float smoke_val = smoke(pos);
    float smoke_a = step(0., smoke_val);
    vec3 smoke_col = smoke_pal[int(posterize(smoke_val, spl)*float(spl))] - vec3(1.-smoke_a);
    
    float b = border(pos);
    
    float bw = step(smoke_val*mixThreshold, boom_val);
    
    vec3 color = bw * boom_col + (1.-bw) * smoke_col;
    color = max(vec3(0.), min(vec3(1.), color + brightness));
    if(colorRev){
        color = 1.0 - color;
    }
    if(colorRem){
        color = vec3(dot(color, vec3(0.22, 0.707, 0.071)));
    }
    float alpha = bw * boom_a + (1.-bw) * smoke_a;
    
    vec4 result = vec4(alpha == 1. ? color : bgColor, alpha) - vec4(vec3(1.-b), 1.);

    gl_FragColor = vec4(result.rgb, useAlpha ? result.a : 1.0);
}`

export default FragShader
