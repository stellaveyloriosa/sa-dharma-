uniform float uTime;
uniform vec3 uColor1;   // mint: vec3(0.91, 0.96, 0.94)
uniform vec3 uColor2;   // lavender: vec3(0.93, 0.91, 0.99)
uniform vec3 uColor3;   // blush: vec3(0.99, 0.89, 0.93)
varying vec2 vUv;

// Fractional Brownian Motion
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}
float noise(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i+vec2(1.0,0.0)), f.x),
             mix(hash(i+vec2(0.0,1.0)), hash(i+vec2(1.0,1.0)), f.x), f.y);
}
float fbm(vec2 p) {
  float v = 0.0; float a = 0.5;
  for(int i = 0; i < 5; i++) {
    v += a * noise(p); p *= 2.0; a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = vUv - 0.5;
  // Domain warp
  vec2 warp = vec2(fbm(uv + uTime * 0.08), fbm(uv + vec2(1.7, 9.2) + uTime * 0.08));
  float d = fbm(uv + warp * 0.4);
  // Soft circular mask
  float mask = smoothstep(0.52, 0.28, length(uv));
  // Color blend
  vec3 col = mix(uColor1, uColor2, d);
  col = mix(col, uColor3, fbm(uv * 2.0 + uTime * 0.05));
  // Watercolor edge bleeding
  float edge = smoothstep(0.48, 0.22, length(uv + warp * 0.08));
  gl_FragColor = vec4(col, edge * 0.85);
}
