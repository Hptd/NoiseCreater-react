// 通道节点家族：Combine / Split / Flip / Swizzle。
import { CHANNEL_OPS, opDefines } from './ops.js'

export default `
varying vec2 vUv;
uniform int uOp;
uniform int uOutputIndex;

uniform sampler2D uInA; uniform bool uHasA; uniform vec4 uValA;
uniform sampler2D uInB; uniform bool uHasB; uniform vec4 uValB;
uniform sampler2D uInC; uniform bool uHasC; uniform vec4 uValC;
uniform sampler2D uInD; uniform bool uHasD; uniform vec4 uValD;

uniform bool uFlipR;
uniform bool uFlipG;
uniform bool uFlipB;
uniform bool uFlipA;

uniform int uX;
uniform int uY;
uniform int uZ;
uniform int uW;

${opDefines('CH', CHANNEL_OPS)}

vec4 readA() { return uHasA ? texture2D(uInA, vUv) : uValA; }
vec4 readB() { return uHasB ? texture2D(uInB, vUv) : uValB; }
vec4 readC() { return uHasC ? texture2D(uInC, vUv) : uValC; }
vec4 readD() { return uHasD ? texture2D(uInD, vUv) : uValD; }

float pick(vec4 v, int i) {
  if (i == 0) return v.r;
  if (i == 1) return v.g;
  if (i == 2) return v.b;
  return v.a;
}

void main() {
  vec4 c = vec4(0.0);

  if (uOp == CH_COMBINE) {
    c = vec4(readA().r, readB().r, readC().r, readD().r);
  } else if (uOp == CH_SPLIT) {
    float v = pick(readA(), uOutputIndex);
    c = vec4(vec3(v), 1.0);
  } else if (uOp == CH_FLIP) {
    c = vec4(uFlipR ? 1.0 - readA().r : readA().r,
             uFlipG ? 1.0 - readA().g : readA().g,
             uFlipB ? 1.0 - readA().b : readA().b,
             uFlipA ? 1.0 - readA().a : readA().a);
  } else if (uOp == CH_SWIZZLE) {
    vec4 a = readA();
    c = vec4(pick(a, uX), pick(a, uY), pick(a, uZ), pick(a, uW));
  }

  gl_FragColor = c;
}
`
