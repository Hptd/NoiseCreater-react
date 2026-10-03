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
uniform float height;
uniform int iterations;
uniform float maxDist;
uniform float epsilon;
uniform float fov;
uniform float camHeight;
uniform float sunSize;
uniform vec3 sunColor;
uniform vec3 skyColor;
uniform vec3 hazeColor;
uniform vec3 surfaceColor;
uniform vec3 glowColor;
uniform float fogDensity;
uniform float waveAmp;
uniform float waveFreq;
uniform bool colorRem;

float jTime;

float amp(vec2 p){
    return smoothstep(1.,8.,abs(p.x));
}

float pow512(float a){
    a*=a;//^2
    a*=a;//^4
    a*=a;//^8
    a*=a;//^16
    a*=a;//^32
    a*=a;//^64
    a*=a;//^128
    a*=a;//^256
    return a*a;
}
float pow1d5(float a){
    return a*sqrt(a);
}
float hash21(vec2 co){
    return fract(sin(dot(co.xy,vec2(1.9898,7.233)))*45758.5433);
}
float hash(vec2 uv){
    float a = amp(uv);
    float w = a>0.?(1.-waveAmp*pow512(.51+.49*sin((waveFreq*(uv.y+.5*uv.x)-jTime)*2.))):0.;
    return a>0. ? a*pow1d5(hash21(uv))*w : 0.;
}

float edgeMin(float dx,vec2 da, vec2 db,vec2 uv){
    return min(min((1.-dx)*db.y,da.x),da.y);
}

vec2 trinoise(vec2 uv){
    const float sq = sqrt(3./2.);
    uv.x *= sq;
    uv.y -= .5*uv.x;
    vec2 d = fract(uv);
    uv -= d;

    bool c = dot(d,vec2(1))>1.;

    vec2 dd = 1.-d;
    vec2 da = c?dd:d,db = c?d:dd;

    float nn = hash(uv+float(c));
    float n2 = hash(uv+vec2(1,0));
    float n3 = hash(uv+vec2(0,1));

    float nmid = mix(n2,n3,d.y);
    float ns = mix(nn,c?n2:n3,da.y);
    float dx = da.x/db.y;
    return vec2(mix(ns,nmid,dx),edgeMin(dx,da, db,uv+d));
}

vec2 map(vec3 p){
    vec2 n = trinoise(p.xz);
    return vec2(p.y-height*n.x,n.y);
}

vec3 grad(vec3 p){
    const vec2 e = vec2(.005,0);
    float a =map(p).x;
    return vec3(map(p+e.xyy).x-a
                ,map(p+e.yxy).x-a
                ,map(p+e.yyx).x-a)/e.x;
}

vec2 intersect(vec3 ro,vec3 rd){
    float d =0.,h=0.;
    for(int i = 0;i<iterations;i++){
        vec3 p = ro+d*rd;
        vec2 s = map(p);
        h = s.x;
        d+= h*.5;
        if(abs(h)<epsilon*d)
            return vec2(d,s.y);
        if(d>maxDist|| p.y>2.) break;
    }

    return vec2(-1);
}

void addsun(vec3 rd,vec3 ld,inout vec3 col){

    float sun = smoothstep(sunSize,sunSize-.01,distance(rd,ld));

    if(sun>0.){
        float yd = (rd.y-ld.y);

        float a =sin(3.1*exp(-(yd)*14.));

        sun*=smoothstep(-.8,0.,a);

        col = mix(col,sunColor,sun);
    }
}

float starnoise(vec3 rd){
    float c = 0.;
    vec3 p = normalize(rd)*300.;
    for (float i=0.;i<4.;i++)
    {
        vec3 q = fract(p)-.5;
        vec3 id = floor(p);
        float c2 = smoothstep(.5,0.,length(q));
        c2 *= step(hash21(id.xz/id.y),.06-i*i*0.005);
        c += c2;
        p = p*.6+.5*p*mat3(3./5.,0,4./5.,0,1,0,-4./5.,0,3./5.);
    }
    c*=c;
    float g = dot(sin(rd*10.512),cos(rd.yzx*10.512));
    c*=smoothstep(-3.14,-.9,g)*.5+.5*smoothstep(-.3,1.,g);
    return c*c;
}

vec3 gsky(vec3 rd,vec3 ld,bool mask){
    float haze = exp2(-5.*(abs(rd.y)-.2*dot(rd,ld)));

    float st = mask?(starnoise(rd))*(1.-min(haze,1.)):0.;
    vec3 back = skyColor;
    vec3 col=clamp(mix(back,hazeColor,haze)+st,0.,1.);
    if(mask)addsun(rd,ld,col);
    return col;
}

void main(){
    vec2 mainUv = vec2((vUv.x+uvMoveX)*uvScaleX, (vUv.y+uvMoveY)*uvScaleY) * uvScale;

    // 居中坐标 [-1,1]（平面为正方形，纵横比 1:1）
    vec2 uv = mainUv*2.0 - 1.0;

    jTime = mod(iTime,4000.);
    vec3 ro = vec3(0.,camHeight,(-20000.+jTime*speed));

    vec3 rd = normalize(vec3(uv,fov));

    vec2 i = intersect(ro,rd);
    float d = i.x;

    vec3 ld = normalize(vec3(0,.125+.05*sin(.1*jTime),1));

    vec3 fog = d>0.?exp2(-d*vec3(.14,.1,.28)*fogDensity):vec3(0.);
    vec3 sky = gsky(rd,ld,d<0.);

    vec3 p = ro+d*rd;
    vec3 n = normalize(grad(p));

    float diff = dot(n,ld)+.1*n.y;
    vec3 col = surfaceColor*diff;

    vec3 rfd = reflect(rd,n);
    vec3 rfcol = gsky(rfd,ld,true);

    col = mix(col,rfcol,.05+.95*pow(max(1.+dot(rd,n),0.),5.));
    col = mix(col,glowColor,smoothstep(.05,.0,i.y));
    col = mix(sky,col,fog);

    if(d<0.)
        d=1e6;
    d=min(d,10.);
    col = clamp(col,0.,1.);

    if(colorRem){
        col = vec3(dot(col, vec3(0.299, 0.587, 0.114)));
    }
    col = max(vec3(0.), min(vec3(1.), col + brightness));
    if(colorRev){
        col = 1.0 - col;
    }

    gl_FragColor = vec4(col, 1.0);
    if(useAlpha){gl_FragColor.a = col.r;}
}`

export default FragShader
