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

uniform float num;
uniform float speed;
uniform float thick;
uniform float paletteR;
uniform float paletteG;
uniform float paletteB;
uniform bool mirror;
uniform bool rotate;
uniform bool rotOfst;
uniform bool triNoise;
uniform bool colorRem;

#define pi 3.14159265

mat2 mm2(in float a){float c = cos(a), s = sin(a);return mat2(c,-s,s,c);}
float tri(in float x){return abs(fract(x)-.5);}
vec2 tri2(in vec2 p){return vec2(tri(p.x+tri(p.y*2.)),tri(p.y+tri(p.x*2.)));}
mat2 m2 = mat2( 0.970,  0.242, -0.242,  0.970 );

float triangleNoise(in vec2 p, in float time)
{
    float z=1.5;
    float z2=1.5;
	float rz = 0.;
    vec2 bp = p;
	for (float i=0.; i<=3.; i++ )
	{
        vec2 dg = tri2(bp*2.)*.8;
        dg *= mm2(time*.3);
        p += dg/z2;

        bp *= 1.6;
        z2 *= .6;
		z *= 1.8;
		p *= 1.2;
        p*= m2;

        rz+= (tri(p.x+tri(p.y)))/z;
	}
	return rz;
}

void main(){
	vec2 mainUv = vec2((vUv.x+uvMoveX)*uvScaleX, (vUv.y+uvMoveY)*uvScaleY) * uvScale;

    float time = iTime * speed;
    float w = thick;
    vec3 palette = vec3(paletteR, paletteG, paletteB);

    vec2 p = -1.0 + 2.0 * mainUv;
    p *= 1.05;

    if(rotate){
        p *= mm2(time*.25);
    }

    float lp = length(p);
    float id = floor(lp*num+.5)/num;

    if(rotOfst){
        p *= mm2(id*11.);
    }

    if(mirror){
        p.y = abs(p.y);
    }

    //polar coords
    vec2 plr = vec2(lp, atan(p.y, p.x));

    //Draw concentric circles
    float rz = 1.-pow(abs(sin(plr.x*pi*num))*1.25/pow(w,0.25),2.5);

    //get the current arc length for a given id
    float enp = plr.y+sin((time+id*5.5))*1.52-1.5;
    rz *= smoothstep(0., 0.05, enp);

    //smooth out both sides of the arcs (and clamp the number)
    rz *= smoothstep(0.,.022*w/plr.x, enp)*step(id,1.);
    if(!mirror){
        rz *= smoothstep(-0.01,.02*w/plr.x,pi-plr.y);
    }

    vec3 col;
    if(triNoise){
        rz *= (triangleNoise(p/(w*w), time)*0.9+0.4);
        col = (sin(palette+id*5.+time)*0.5+0.5)*rz;
        col += smoothstep(.4,1.,rz)*0.15;
        col *= smoothstep(.2,1.,rz)+1.;
    } else {
        col = (sin(palette+id*5.+time)*0.5+0.5)*rz;
        col *= smoothstep(.8,1.15,rz)*.7+.8;
    }

    if(colorRem){
        col = vec3(dot(col,vec3(0.22, 0.707, 0.071)));
    }

    col = max(vec3(0.), min(vec3(1.), col + brightness));
    if(colorRev){
        col = 1.0 - col;
    }

    gl_FragColor = vec4(col, 1.);
    if(useAlpha){
        gl_FragColor.a = col.r;
    }
}`

export default FragShader
