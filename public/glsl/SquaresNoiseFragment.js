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

uniform float gridSize;
uniform float squareSize;
uniform float sizeAmplitude;
uniform float speed;
uniform float jitter;
uniform float wallThickness;
uniform float timeScale;
uniform vec3 bgColor;
uniform float colorScale;
uniform float colorBright;
uniform float jitter2;
uniform bool colorRem;

// 噪声哈希函数 [0,1]
vec2 T = vec2(0.);
float No(float x, vec2 T){
return fract(9627.5*sin(7933.75*(x + 0.5 + T.x) + 297. + T.y));
}

vec4 Rancol(vec2 x){
return vec4(No(x.x + x.y,T), No(x.x*x.x+ x.y,T), No(x.x*x.x + x.y*x.y,T),1.);
}

// 方块网格
vec4 grid(vec2 uv, float t){
vec4 C2 = vec4(0.);
uv *= gridSize;
vec2 id = vec2(int(uv.x),int(uv.y));
uv.y += (jitter*No(id.x*id.x, T) + 1.)*t*speed;
uv.y += jitter2*No(id.x, T);
  id = vec2(int(uv.x), int(uv.y));
uv = fract(uv) - .5;

t *= timeScale*No(id.x + id.y, T);

float r = sizeAmplitude*sin(t + sin(t)*.5) + squareSize;
  if (abs( uv.x)<r && abs(uv.y) < r){
  C2 = colorScale*Rancol(id + vec2(1.)) + vec4(colorBright);
  }
  if (abs(uv.x)>r + wallThickness || abs(uv.y)>r + wallThickness){
  C2 += vec4(bgColor, 1.);
  }
  return C2;
  }

void main(){
	vec2 mainUv = vec2((vUv.x+uvMoveX)*uvScaleX, (vUv.y+uvMoveY)*uvScaleY) * (uvScale);

    vec3 col = grid(mainUv, iTime).rgb;

    col = clamp(col + vec3(brightness), 0.0, 1.0);
    if(colorRem){
        float gray = dot(col, vec3(0.299, 0.587, 0.114));
        col = vec3(gray);
    }
    if(colorRev){
        col = 1.0 - col;
    }
    gl_FragColor = vec4(col, 1.);
    if(useAlpha){gl_FragColor.a = col.g;}
}`
export default FragShader
