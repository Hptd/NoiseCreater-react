// 法线节点家族：FromHeight / Strength / Blend。
import { NORMAL_OPS, opDefines } from './ops.js'

export default `
varying vec2 vUv;
uniform vec2 uTexel;
uniform int uOp;

uniform sampler2D uInA; uniform bool uHasA; uniform vec4 uValA;
uniform sampler2D uInB; uniform bool uHasB; uniform vec4 uValB;

// fromHeight
uniform int uChannel;
uniform float uLevelInBlack;
uniform float uLevelInWhite;
uniform bool uInvert;
uniform int uKernel;
uniform float uSampleStep;
uniform float uPreSmooth;
uniform float uFlatThreshold;
uniform float uStrength;
uniform float uContrast;
uniform int uConvention;
uniform bool uFlipX;
uniform bool uReNormalize;
uniform int uEdgeMode;
uniform float uEdgeFade;

// strength
uniform float uStrengthX;
uniform float uStrengthY;

// blend
uniform int uMode;
uniform float uWeightA;
uniform float uWeightB;
uniform float uOpacity;

${opDefines('NM', NORMAL_OPS)}

float lumaOf(vec3 c) { return dot(c, vec3(0.2126, 0.7152, 0.0722)); }

vec2 applyEdge(vec2 uv) {
  if (uEdgeMode == 0) return fract(uv);
  if (uEdgeMode == 1) return clamp(uv, 0.0, 1.0);
  return abs(fract(uv * 0.5) * 2.0 - 1.0);
}

vec4 sampleA(vec2 uv) { return uHasA ? texture2D(uInA, applyEdge(uv)) : uValA; }

float channelOf(vec4 c) {
  if (uChannel == 0) return c.r;
  if (uChannel == 1) return c.g;
  if (uChannel == 2) return c.b;
  if (uChannel == 3) return c.a;
  return lumaOf(c.rgb);
}

float rawHeight(vec2 uv) {
  vec4 c = sampleA(uv);
  float h = (channelOf(c) - uLevelInBlack) / max(uLevelInWhite - uLevelInBlack, 1e-5);
  h = clamp(h, 0.0, 1.0);
  return uInvert ? 1.0 - h : h;
}

// preSmooth：3x3 均值滤波。GLSL 无法在单 pass 内保留中间状态，
// 这里以“半径随迭代次数放大”的近似实现，效果等价于逐次模糊累积。
float smoothHeight(vec2 uv) {
  if (uPreSmooth <= 0) return rawHeight(uv);
  vec2 e = uTexel * max(uSampleStep, 1.0) * uPreSmooth;
  float sum = 0.0;
  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      sum += rawHeight(uv + vec2(float(x), float(y)) * e);
    }
  }
  return sum / 9.0;
}

float heightAt(vec2 uv) { return smoothHeight(uv); }

vec3 encode(vec3 n) {
  if (uReNormalize) n = normalize(n + vec3(0.0, 0.0, 1e-6));
  return n * 0.5 + 0.5;
}

vec2 gradientCentral(vec2 uv) {
  vec2 e = uTexel * max(uSampleStep, 1.0);
  float dx = (heightAt(uv + vec2(e.x, 0.0)) - heightAt(uv - vec2(e.x, 0.0))) * 0.5;
  float dy = (heightAt(uv + vec2(0.0, e.y)) - heightAt(uv - vec2(0.0, e.y))) * 0.5;
  return vec2(dx, dy);
}

vec2 gradient3x3(vec2 uv, float w0, float w1, float w2) {
  vec2 e = uTexel * max(uSampleStep, 1.0);
  float tl = heightAt(uv + vec2(-e.x, e.y));
  float t = heightAt(uv + vec2(0.0, e.y));
  float tr = heightAt(uv + vec2(e.x, e.y));
  float l = heightAt(uv + vec2(-e.x, 0.0));
  float r = heightAt(uv + vec2(e.x, 0.0));
  float bl = heightAt(uv + vec2(-e.x, -e.y));
  float b = heightAt(uv + vec2(0.0, -e.y));
  float br = heightAt(uv + vec2(e.x, -e.y));
  float gx = w0 * tl + w1 * l + w0 * bl - w0 * tr - w1 * r - w0 * br;
  float gy = w0 * bl + w1 * b + w0 * br - w0 * tl - w1 * t - w0 * tr;
  return vec2(gx, gy);
}

vec3 normalFromHeight(vec2 uv) {
  vec2 g;
  if (uKernel == 0) {
    g = gradientCentral(uv);
  } else if (uKernel == 1) {
    g = gradient3x3(uv, 1.0, 2.0, 1.0) / 8.0;
  } else if (uKernel == 2) {
    g = gradient3x3(uv, 3.0, 10.0, 3.0) / 32.0;
  } else {
    g = gradient3x3(uv, 1.0, 1.0, 1.0) / 6.0;
  }

  if (length(g) < uFlatThreshold) return vec3(0.0, 0.0, 1.0);

  vec2 xy = -g * uStrength;
  xy = sign(xy) * pow(abs(xy), vec2(max(uContrast, 1e-4)));
  if (uConvention == 1) xy.y = -xy.y;
  if (uFlipX) xy.x = -xy.x;

  vec3 n = vec3(xy, 1.0);
  if (uEdgeFade > 0.0) {
    vec2 d = min(uv, 1.0 - uv);
    float fade = smoothstep(0.0, uEdgeFade, min(d.x, d.y));
    n = normalize(mix(vec3(0.0, 0.0, 1.0), n, fade));
    if (!uReNormalize) return n;
  }
  return encode(n);
}

void main() {
  vec4 a = sampleA(vUv);
  vec3 outN;

  if (uOp == NM_FROM_HEIGHT) {
    outN = normalFromHeight(vUv);
  } else if (uOp == NM_STRENGTH) {
    vec3 n = a.rgb * 2.0 - 1.0;
    n.xy *= vec2(uStrengthX, uStrengthY);
    if (uReNormalize) n = normalize(n + vec3(0.0, 0.0, 1e-6));
    outN = n * 0.5 + 0.5;
  } else {
    // NM_BLEND
    vec3 na = a.rgb * 2.0 - 1.0;
    vec3 nb = (uHasB ? texture2D(uInB, vUv) : uValB).rgb * 2.0 - 1.0;
    vec3 blended;
    if (uMode == 0) {
      blended = normalize(vec3(na.xy * uWeightA + nb.xy * uWeightB, na.z * nb.z));
    } else if (uMode == 1) {
      blended = normalize(vec3(na.xy * uWeightA + nb.xy * uWeightB, na.z));
    } else {
      blended = normalize(vec3(na.xy * uWeightA + nb.xy * uWeightB, max(na.z, nb.z)));
    }
    outN = mix(na, blended, clamp(uOpacity, 0.0, 1.0)) * 0.5 + 0.5;
  }

  gl_FragColor = vec4(clamp(outN, 0.0, 1.0), a.a);
}
`
