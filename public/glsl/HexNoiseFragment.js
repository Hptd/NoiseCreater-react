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

uniform float density;
uniform float edgeWidth;
uniform float edgeSoft;

// 六边形网格（片段1算法）：nearestHexCell 找最近中心，hexDist 为六边形边距场
const float hexFactor = 0.8660254037844386;

vec2 nearestHexCell(in vec2 pos) {
    vec2 gpos = vec2(pos.x / hexFactor, pos.y);
    vec2 hex_int = floor(gpos);

    float sy = step(2.0, mod(hex_int.x + 1.0, 4.0));
    hex_int += mod(vec2(hex_int.x, hex_int.y + sy), 2.0);

    vec2 gdiff = gpos - hex_int;

    if (dot(abs(gdiff), vec2(hexFactor * hexFactor, 0.5)) > 1.0) {
        vec2 delta = sign(gdiff) * vec2(2.0, 1.0);
        hex_int += delta;
    }
    return hex_int;
}

float hexDist(vec2 p) {
    p = abs(p);
    return max(dot(p, vec2(hexFactor, 0.5)), p.y) - 1.0;
}

void main(){
	vec2 mainUv = vec2((vUv.x+uvMoveX)*uvScaleX, (vUv.y+uvMoveY)*uvScaleY) * (uvScale);

    vec2 pos = mainUv * density;
    vec2 posCell = nearestHexCell(pos);
    vec2 offset = pos - vec2(posCell.x * hexFactor, posCell.y);
    float d = abs(hexDist(offset));   // 0=六边形边缘，向两侧增大

    // 边缘线条：d < edgeWidth 为线；edgeSoft 控制虚化（0=硬边）
    float band = max(edgeSoft, 0.0001);
    float lineMask = 1.0 - smoothstep(0.0, band, d - edgeWidth);

    // 黑白模式：亮线 1.0 / 黑底 0.0（可配合公共"颜色取反"翻转）
    float hexNoise = lineMask;
    hexNoise = max(0.0, min(1.0, hexNoise + brightness));
    if(colorRev){
        hexNoise = 1.0 - hexNoise;
    }
    gl_FragColor = vec4(vec3(hexNoise), 1.0);
    if(useAlpha){gl_FragColor.a = hexNoise;}
}`

export default FragShader