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

uniform float spinRotation;
uniform float spinSpeed;
uniform float spinEase;
uniform float spinAmount;
uniform float contrast;
uniform float lighting;
uniform float pixelFilter;
uniform int iterations;
uniform float scale;
uniform float paintScale;
uniform bool isRotate;
uniform vec3 color1;
uniform vec3 color2;
uniform vec3 color3;
uniform bool colorRem;

// 原 shader 用 iResolution 做像素化与居中，分辨率在归一化后约掉，这里用常量等价替换
const float SQRT2 = 1.41421356;

vec3 effect(vec2 uv01) {
    float pixel_size = SQRT2 / pixelFilter;
    vec2 uv = (floor(uv01 / pixel_size) * pixel_size - 0.5) / SQRT2;
    float uv_len = length(uv);

    float speed = (spinRotation * spinEase * 0.2);
    if (isRotate) {
        speed = iTime * speed;
    }
    speed += 302.2;
    float new_pixel_angle = atan(uv.y, uv.x) + speed - spinEase * 20.0 * (spinAmount * uv_len + (1.0 - spinAmount));
    vec2 mid = vec2(0.5 / SQRT2);
    uv = (vec2(uv_len * cos(new_pixel_angle) + mid.x, uv_len * sin(new_pixel_angle) + mid.y) - mid);

    uv *= scale;
    speed = iTime * spinSpeed;
    vec2 uv2 = vec2(uv.x + uv.y);

    for (int i = 0; i < iterations; i++) {
        uv2 += sin(max(uv.x, uv.y)) + uv;
        uv += 0.5 * vec2(cos(5.1123314 + 0.353 * uv2.y + speed * 0.131121), sin(uv2.x - 0.113 * speed));
        uv -= 1.0 * cos(uv.x + uv.y) - 1.0 * sin(uv.x * 0.711 - uv.y);
    }

    float contrast_mod = (0.25 * contrast + 0.5 * spinAmount + 1.2);
    float paint_res = min(2.0, max(0.0, length(uv) * paintScale * contrast_mod));
    float c1p = max(0.0, 1.0 - contrast_mod * abs(1.0 - paint_res));
    float c2p = max(0.0, 1.0 - contrast_mod * abs(paint_res));
    float c3p = 1.0 - min(1.0, c1p + c2p);
    float light = (lighting - 0.2) * max(c1p * 5.0 - 4.0, 0.0) + lighting * max(c2p * 5.0 - 4.0, 0.0);

    return (0.3 / contrast) * color1
         + (1.0 - 0.3 / contrast) * (color1 * c1p + color2 * c2p + color3 * c3p)
         + light;
}

void main() {
    vec2 st = vec2((vUv.x + uvMoveX) * uvScaleX, (vUv.y + uvMoveY) * uvScaleY) * uvScale;

    vec3 col = effect(st);

    if (colorRem) {
        col = vec3(dot(col, vec3(0.299, 0.587, 0.114)));
    }
    col = max(vec3(0.0), min(vec3(1.0), col + brightness));
    if (colorRev) {
        col = 1.0 - col;
    }
    gl_FragColor = vec4(col, 1.0);
    if (useAlpha) { gl_FragColor.a = max(col.r, max(col.g, col.b)); }
}
`
export default FragShader
