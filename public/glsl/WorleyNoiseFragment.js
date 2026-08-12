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
uniform float cStyle;
uniform float cFreq;
uniform float seedDist;
uniform bool smoothMode;
uniform bool altColor;
uniform bool colorRem;

#define PI 3.14159

float hash( float n ) {
    return fract(sin(n)*43758.5453);
}

vec2 hash12( float n ) {
    return fract(sin(n+vec2(1.,12.345))*43758.5453);
}
float hash21( vec2 n ) {
    return hash(n.x+10.*n.y);
}
vec2 hash22( vec2 n ) {
    return hash12(n.x+10.*n.y);
}

float cell;   // id of closest cell
vec2  center; // center of closest cell

vec3 worley( vec2 p ) {
    vec3 d = vec3(1e15);
    vec2 ip = floor(p);
    for (float i=-2.; i<3.; i++)
   	 	for (float j=-2.; j<3.; j++) {
                vec2 p0 = ip+vec2(i,j);
            	float a0 = hash21(p0), a=speed*a0*iTime+2.*PI*a0; vec2 dp=vec2(cos(a),sin(a));
                vec2  c = hash22(p0)*.5+.5*dp+p0-p;
                float d0 = dot(c,c);
                if      (d0<d.x) { d.yz=d.xy; d.x=d0; cell=hash21(p0); center=c;}
                else if (d0<d.y) { d.z =d.y ; d.y=d0; }
                else if (d0<d.z) {            d.z=d0; }
            }
    return sqrt(d);
}

float worleyD( vec2 p) {
    float d = 1e15;
    vec2 ip = floor(p);
    for (float i=-2.; i<3.; i++)
   	 	for (float j=-2.; j<3.; j++) {
            vec2 p0 = ip+vec2(i,j);
            float a0 = hash21(p0), a=speed*a0*iTime+2.*PI*a0; vec2 dp=vec2(cos(a),sin(a));
            vec2  c = hash22(p0)*.5+.5*dp+p0-p;
            float d0 = dot(c,c);
 	    	float c0 = dot(center+c,normalize(c-center));
        	d=min(d, c0);
    	}

    return .5*d;
}

void main(){
	vec2 mainUv = vec2((vUv.x+uvMoveX)*uvScaleX, (vUv.y+uvMoveY)*uvScaleY) * uvScale;
	vec2 p = 2.*(mainUv - vec2(.9,.5));

	vec3 w = scale*worley(scale*p);
	float dist=w.x, c0, c;
	if (cStyle < 0.5)
	    c0 = w.y-w.x;
	else if (cStyle < 1.5)
	    c0 = 2.*scale*worleyD(scale*p);
	else
	    c0 = 2./(1./(w.y-w.x)+1./(w.z-w.x));

	if (smoothMode)
	    c = .5*c0;
	else
	    c = sin(c0*cFreq);

	vec3 col0 = .5+.5*sin(6.28*cell+vec3(0.,2.*PI/3.,-2.*PI/3.));
	vec3 col = c*col0;
	float seed = smoothstep(seedDist, 0., dist);
	col = seed+(1.-seed)*col;
	if ((!smoothMode)&&(mod(100.*cell,2.)>1.)) col=1.-col;

	if(colorRem){
		col = vec3(dot(col, vec3(0.22, 0.707, 0.071)));
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
