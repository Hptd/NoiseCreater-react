const FragShader = /*glsl*/`
varying vec2 vUv;
uniform float uvScale;
uniform float uvMoveX;
uniform float uvMoveY;
uniform float uvScaleX;
uniform float uvScaleY;
uniform bool useAlpha;

uniform float brightness;
uniform float iTime;
uniform bool colorRev;
uniform bool colorRem;

uniform float speed;
uniform float rotateSpeed;
uniform float particleSize;
uniform int layers;
uniform float sizeMod;
uniform float alphaMod;
uniform float smokeIntensity;
uniform vec3 sparkColor;
uniform vec3 smokeColor;

//Shader License: CC BY 3.0
//Author: Jan Mróz (jaszunio15)

#define MOVEMENT_DIRECTION vec2(0.7, -1.0)

#define PARTICLE_SCALE (vec2(0.5, 1.6))
#define PARTICLE_SCALE_VAR (vec2(0.25, 0.2))

#define PARTICLE_BLOOM_SCALE (vec2(0.5, 0.8))
#define PARTICLE_BLOOM_SCALE_VAR (vec2(0.3, 0.1))

float hash1_2(in vec2 x)
{
 	return fract(sin(dot(x, vec2(52.127, 61.2871))) * 521.582);   
}

vec2 hash2_2(in vec2 x)
{
    return fract(sin(x * mat2x2(20.52, 24.1994, 70.291, 80.171)) * 492.194);
}

//Simple interpolated noise
vec2 noise2_2(vec2 uv)
{
    vec2 f = smoothstep(0.0, 1.0, fract(uv));
    
 	vec2 uv00 = floor(uv);
    vec2 uv01 = uv00 + vec2(0,1);
    vec2 uv10 = uv00 + vec2(1,0);
    vec2 uv11 = uv00 + 1.0;
    vec2 v00 = hash2_2(uv00);
    vec2 v01 = hash2_2(uv01);
    vec2 v10 = hash2_2(uv10);
    vec2 v11 = hash2_2(uv11);
    
    vec2 v0 = mix(v00, v01, f.y);
    vec2 v1 = mix(v10, v11, f.y);
    vec2 v = mix(v0, v1, f.x);
    
    return v;
}

//Simple interpolated noise
float noise1_2(in vec2 uv)
{
    vec2 f = fract(uv);
    
 	vec2 uv00 = floor(uv);
    vec2 uv01 = uv00 + vec2(0,1);
    vec2 uv10 = uv00 + vec2(1,0);
    vec2 uv11 = uv00 + 1.0;
    
    float v00 = hash1_2(uv00);
    float v01 = hash1_2(uv01);
    float v10 = hash1_2(uv10);
    float v11 = hash1_2(uv11);
    
    float v0 = mix(v00, v01, f.y);
    float v1 = mix(v10, v11, f.y);
    float v = mix(v0, v1, f.x);
    
    return v;
}

float layeredNoise1_2(in vec2 uv, in float sizeModIn, in float alphaModIn, in int layersIn, in float animation)
{
 	float noise = 0.0;
    float alpha = 1.0;
    float size = 1.0;
    vec2 offset = vec2(0.0);
    for (int i = 0; i < layersIn; i++)
    {
        offset += hash2_2(vec2(alpha, size)) * 10.0;
        
        //Adding noise with movement
     	noise += noise1_2(uv * size + iTime * animation * 8.0 * MOVEMENT_DIRECTION * speed + offset) * alpha;
        alpha *= alphaModIn;
        size *= sizeModIn;
    }
    
    noise *= (1.0 - alphaModIn)/(1.0 - pow(alphaModIn, float(layersIn)));
    return noise;
}

//Rotates point around 0,0
vec2 rotate(in vec2 point, in float deg)
{
 	float s = sin(deg);
    float c = cos(deg);
    return mat2x2(s, c, -c, s) * point;
}

//Cell center from point on the grid
vec2 voronoiPointFromRoot(in vec2 root, in float deg)
{
  	vec2 point = hash2_2(root) - 0.5;
    float s = sin(deg);
    float c = cos(deg);
    point = mat2x2(s, c, -c, s) * point * 0.66;
    point += root + 0.5;
    return point;
}

//Voronoi cell point rotation degrees
float degFromRootUV(in vec2 uv)
{
 	return mod(iTime * rotateSpeed * (hash1_2(uv) - 0.5) * 2.0, 6.2831853);   
}

vec2 randomAround2_2(in vec2 point, in vec2 range, in vec2 uv)
{
 	return point + (hash2_2(uv) - 0.5) * range;
}


//单个单元格的粒子贡献：淡入淡出曲线跟随粒子所在单元格，避免跨单元格边界时跳变
vec3 fireParticlesCell(in vec2 cell, in vec2 uv, in vec2 originalUV)
{
    float deg = degFromRootUV(cell);
    vec2 pointUV = voronoiPointFromRoot(cell, deg);

    //采样点距粒子中心超出最大作用半径（bloom 半径 + 噪声扰动余量）时直接剔除，跳过昂贵计算
    vec2 d0 = uv - pointUV;
    if (dot(d0, d0) > 0.09) return vec3(0.0);

    vec3 particles = vec3(0.0);
    float dist = 2.0;
    float distBloom = 0.0;
   
   	//UV manipulation for the faster particle movement
    vec2 tempUV = uv + (noise2_2(uv * 2.0) - 0.5) * 0.1;
    tempUV += -(noise2_2(uv * 3.0 + iTime) - 0.5) * 0.07;

    //Sparks sdf
    dist = length(rotate(tempUV - pointUV, 0.7) * randomAround2_2(PARTICLE_SCALE, PARTICLE_SCALE_VAR, cell));
    
    //Bloom sdf
    distBloom = length(rotate(tempUV - pointUV, 0.7) * randomAround2_2(PARTICLE_BLOOM_SCALE, PARTICLE_BLOOM_SCALE_VAR, cell));

    //Add sparks
    particles += (1.0 - smoothstep(particleSize * 0.6, particleSize * 3.0, dist)) * (sparkColor * 1.5);
    
    //Add bloom
    particles += pow((1.0 - smoothstep(0.0, particleSize * 6.0, distBloom)) * 1.0, 3.0) * (sparkColor * 0.8);

    //Upper disappear curve randomization
    float border = (hash1_2(cell) - 0.5) * 2.0;
 	float disappear = 1.0 - smoothstep(border, border + 0.5, originalUV.y);
	
    //Lower appear curve randomization
    border = (hash1_2(cell + 0.214) - 1.8) * 0.7;
    float appear = smoothstep(border, border + 0.4, originalUV.y);
    
    return particles * disappear * appear;
}

//对 3x3 邻域单元格求和：采样坐标随时间流过单元格边界时，粒子贡献连续过渡，消除上下错位跳变
vec3 fireParticles(in vec2 uv, in vec2 originalUV)
{
    vec3 particles = vec3(0.0);
    vec2 rootUV = floor(uv);
    for (int j = -1; j <= 1; j++)
    {
        for (int i = -1; i <= 1; i++)
        {
            particles += fireParticlesCell(rootUV + vec2(float(i), float(j)), uv, originalUV);
        }
    }
    return particles;
}


//Layering particles to imitate 3D view
vec3 layeredParticles(in vec2 uv, in float sizeModIn, in float alphaModIn, in int layersIn, in float smoke) 
{ 
    vec3 particles = vec3(0);
    float size = 1.0;
    float alpha = 1.0;
    vec2 offset = vec2(0.0);
    vec2 noiseOffset;
    vec2 bokehUV;
    
    for (int i = 0; i < layersIn; i++)
    {
        //Particle noise movement
        noiseOffset = (noise2_2(uv * size * 2.0 + 0.5) - 0.5) * 0.15;
        
        //UV with applied movement
        bokehUV = (uv * size + iTime * MOVEMENT_DIRECTION * speed) + offset + noiseOffset; 
        
        //Adding particles, if there is more smoke, remove smaller particles
		particles += fireParticles(bokehUV, uv) * alpha * (1.0 - smoothstep(0.0, 1.0, smoke) * (float(i) / float(layersIn)));
        
        //Moving uv origin to avoid generating the same particles
        offset += hash2_2(vec2(alpha, alpha)) * 10.0;
        
        alpha *= alphaModIn;
        size *= sizeModIn;
    }
    
    return particles;
}

void main(){
	vec2 fUv = vec2((vUv.x+uvMoveX)*uvScaleX, (vUv.y+uvMoveY)*uvScaleY) * (uvScale);
	vec2 uv = fUv * 2.0 - 1.0;
    
    float vignette = 1.0 - smoothstep(0.4, 1.4, length(uv + vec2(0.0, 0.3)));
    
    uv *= 1.8;
    
    float smokeVal = layeredNoise1_2(uv * 10.0 + iTime * 4.0 * MOVEMENT_DIRECTION * speed, 1.7, 0.7, 6, 0.2);
    smokeVal *= pow(1.0 - smoothstep(-1.0, 1.6, uv.y), 2.0); 
    vec3 smoke = smokeVal * smokeColor * smokeIntensity * vignette;
    
    //Cutting holes in smoke
    smoke *= pow(layeredNoise1_2(uv * 4.0 + iTime * 0.5 * MOVEMENT_DIRECTION * speed, 1.8, 0.5, 3, 0.2), 2.0) * 1.5;
    
    vec3 particles = layeredParticles(uv, sizeMod, alphaMod, layers, smokeVal);
    
    vec3 col = particles + smoke + smokeColor * 0.016;
	col *= vignette;
    
    col = smoothstep(-0.08, 1.0, col);

    float alpha = 1.0;

    if(colorRem){
        float col_wb = dot(col, vec3(0.22, 0.707, 0.071));
        col_wb = max(0., min(1., col_wb + brightness));
        if(colorRev){
            col_wb = 1.0 - col_wb;
        }
        col = vec3(col_wb);
        if(useAlpha){
          alpha = col_wb;
        }
    }
    gl_FragColor = vec4(col, alpha);
}`

export default FragShader
