// 数学节点家族：一个 shader 覆盖全部数学操作，靠 uOp 分支。
import { MATH_OPS, opDefines } from './ops.js'

export default `
varying vec2 vUv;
uniform vec2 uTexel;
uniform float uTime;
uniform int uOp;

uniform sampler2D uInA; uniform bool uHasA; uniform vec4 uValA;
uniform sampler2D uInB; uniform bool uHasB; uniform vec4 uValB;
uniform sampler2D uInC; uniform bool uHasC; uniform vec4 uValC;
uniform sampler2D uInD; uniform bool uHasD; uniform vec4 uValD;
uniform sampler2D uInE; uniform bool uHasE; uniform vec4 uValE;

uniform float uBase;
uniform float uSteps;
uniform float uPower;

${opDefines('MATH', MATH_OPS)}

vec4 readA() { return uHasA ? texture2D(uInA, vUv) : uValA; }
vec4 readB() { return uHasB ? texture2D(uInB, vUv) : uValB; }
vec4 readC() { return uHasC ? texture2D(uInC, vUv) : uValC; }
vec4 readD() { return uHasD ? texture2D(uInD, vUv) : uValD; }
vec4 readE() { return uHasE ? texture2D(uInE, vUv) : uValE; }

float safeDiv(float x, float y) { return x / (y == 0.0 ? 1e-6 : y); }
vec4 safeDiv(vec4 x, vec4 y) { return vec4(safeDiv(x.x, y.x), safeDiv(x.y, y.y), safeDiv(x.z, y.z), safeDiv(x.w, y.w)); }

float hash21(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
  vec4 a = readA();
  vec4 b = readB();
  vec4 c = vec4(0.0);

  if (uOp == MATH_ADD) c = a + b;
  else if (uOp == MATH_SUBTRACT) c = a - b;
  else if (uOp == MATH_MULTIPLY) c = a * b;
  else if (uOp == MATH_DIVIDE) c = safeDiv(a, b);
  else if (uOp == MATH_POWER) c = pow(abs(a), b);
  else if (uOp == MATH_SQRT) c = sqrt(max(a, vec4(0.0)));

  else if (uOp == MATH_ABSOLUTE) c = abs(a);
  else if (uOp == MATH_EXPONENTIAL) c = exp(a);
  else if (uOp == MATH_LENGTH) c = vec4(vec3(length(a.xyz)), 1.0);
  else if (uOp == MATH_LOG) c = log(max(a, vec4(1e-6))) / log(max(uBase, 1e-6));
  else if (uOp == MATH_MODULO) c = mod(a, max(b, vec4(1e-6)));
  else if (uOp == MATH_NEGATE) c = -a;
  else if (uOp == MATH_NORMALIZE) c = vec4(normalize(a.xyz + vec3(1e-6)), a.a);
  else if (uOp == MATH_POSTERIZE) c = floor(a * max(uSteps, 1.0)) / max(uSteps, 1.0);
  else if (uOp == MATH_RECIPROCAL) c = safeDiv(vec4(1.0), a);
  else if (uOp == MATH_ROOT) c = pow(max(a, vec4(0.0)), vec4(1.0 / max(uPower, 1e-6)));
  else if (uOp == MATH_SIGN) c = sign(a);

  else if (uOp == MATH_DDX) c = vec4(dFdx(a.rgb), a.a);
  else if (uOp == MATH_DDY) c = vec4(dFdy(a.rgb), a.a);
  else if (uOp == MATH_DDXY) c = vec4(abs(dFdx(a.rgb)) + abs(dFdy(a.rgb)), a.a);

  else if (uOp == MATH_LERP) c = mix(a, b, readC());
  else if (uOp == MATH_INVERSE_LERP) c = safeDiv(readC() - a, b - a);
  else if (uOp == MATH_SMOOTHSTEP) c = smoothstep(b, readC(), a);

  else if (uOp == MATH_CLAMP) c = clamp(a, b, readC());
  else if (uOp == MATH_FRACTION) c = fract(a);
  else if (uOp == MATH_MAXIMUM) c = max(a, b);
  else if (uOp == MATH_MINIMUM) c = min(a, b);
  else if (uOp == MATH_ONE_MINUS) c = 1.0 - a;
  else if (uOp == MATH_RANDOM_RANGE) {
    float h = hash21(a.xy + vec2(uTime, uTime * 0.37));
    c = mix(b, readC(), h);
  }
  else if (uOp == MATH_REMAP) {
    vec4 t = safeDiv(a - b, readC() - b);
    c = t * (readE() - readD()) + readD();
  }
  else if (uOp == MATH_SATURATE) c = clamp(a, 0.0, 1.0);

  else if (uOp == MATH_CEILING) c = ceil(a);
  else if (uOp == MATH_FLOOR) c = floor(a);
  else if (uOp == MATH_ROUND) c = floor(a + 0.5);

  else if (uOp == MATH_ARCCOSINE) c = vec4(acos(clamp(a.rgb, -1.0, 1.0)), a.a);
  else if (uOp == MATH_ARCSINE) c = vec4(asin(clamp(a.rgb, -1.0, 1.0)), a.a);
  else if (uOp == MATH_ARCTANGENT) c = vec4(atan(a.rgb), a.a);
  else if (uOp == MATH_ARCTANGENT2) c = vec4(atan(a.rgb, b.rgb), a.a);
  else if (uOp == MATH_COSINE) c = vec4(cos(a.rgb), a.a);
  else if (uOp == MATH_SINE) c = vec4(sin(a.rgb), a.a);
  else if (uOp == MATH_TANGENT) c = vec4(tan(a.rgb), a.a);
  else if (uOp == MATH_DEGREES_TO_RADIANS) c = radians(a);
  else if (uOp == MATH_RADIANS_TO_DEGREES) c = degrees(a);

  else c = a;

  gl_FragColor = c;
}
`
