import React, { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Geometry, Triangle, RenderTarget } from 'ogl';

interface GlobalRippleEffectProps {
  brushSize?: number;
  strength?: number;
  swirl?: number;
  rings?: number;
  spread?: number;
  fade?: number;
  spacing?: number;
  tint?: string;
  tintAmount?: number;
  highlightColor?: string;
  clickStrength?: number;
  enabled?: boolean;
}

const MAX_WAVES = 120;
const START_SCALE = 1.2;
const LIFE_CONSTANT = Math.log(500);

const waveVertex = `
precision highp float;
attribute vec2 position;
attribute vec2 uv;
attribute vec2 iOffset;
attribute vec2 iScale;
attribute float iOpacity;

varying vec2 vUv;
varying float vOpacity;

void main() {
  vUv = uv;
  vOpacity = iOpacity;
  gl_Position = vec4(iOffset + position * iScale, 0.0, 1.0);
}
`;

const waveFragment = `
precision highp float;
varying vec2 vUv;
varying float vOpacity;
uniform float uRings;

const float PI = 3.141592653589793;
const float EDGE = 0.006737947;

void main() {
  vec2 p = vUv * 2.0 - 1.0;
  float r = dot(p, p);
  if (r > 1.0) discard;

  float brush = (exp(-r * 4.5) - EDGE) / (1.0 - EDGE);
  brush *= 0.5 + 0.5 * cos(sqrt(r) * PI * 2.0 * uRings);

  gl_FragColor = vec4(vec3(brush * vOpacity * vOpacity), 1.0);
}
`;

const screenVertex = `
precision highp float;
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

// Renders a full-screen liquid ripple displacement background with chromatic dispersion & caustics
const compositeFragment = `
precision highp float;
varying vec2 vUv;

uniform sampler2D uDisplacement;
uniform vec2 uResolution;
uniform vec2 uTexel;
uniform vec3 uTint;
uniform vec3 uHighlight;
uniform float uStrength;
uniform float uSwirl;
uniform float uTintAmount;

// High-fidelity biomedical background gradient
vec3 getBgColor(vec2 uv) {
  vec2 p = uv * 2.0 - 1.0;
  p.x *= uResolution.x / max(1.0, uResolution.y);

  float d1 = length(p - vec2(-0.5, 0.4));
  float d2 = length(p - vec2(0.6, -0.3));
  float d3 = length(p - vec2(0.1, -0.7));

  vec3 colSky = vec3(0.88, 0.94, 0.99);       // #e0f2fe
  vec3 colLavender = vec3(0.93, 0.91, 0.99);  // #ede9fe
  vec3 colIndigo = vec3(0.84, 0.88, 0.98);    // subtle indigo tint
  vec3 colBase = vec3(0.985, 0.985, 1.0);     // clean porcelain

  vec3 col = mix(colBase, colSky, smoothstep(1.3, 0.0, d1) * 0.7);
  col = mix(col, colLavender, smoothstep(1.4, 0.0, d2) * 0.6);
  col = mix(col, colIndigo, smoothstep(1.2, 0.0, d3) * 0.45);
  return col;
}

void main() {
  float amount = texture2D(uDisplacement, vUv).r;

  // Calculate surface normals from displacement gradients for water caustics & specular glint
  float ex = texture2D(uDisplacement, vUv + vec2(uTexel.x, 0.0)).r - texture2D(uDisplacement, vUv - vec2(uTexel.x, 0.0)).r;
  float ey = texture2D(uDisplacement, vUv + vec2(0.0, uTexel.y)).r - texture2D(uDisplacement, vUv - vec2(0.0, uTexel.y)).r;
  
  vec3 normal = normalize(vec3(-ex * 16.0, -ey * 16.0, 1.0));
  vec3 light = normalize(vec3(-0.35, 0.55, 1.0));
  
  // Specular gleam riding each crest - delicate and soft
  float raw = pow(max(dot(normal, light), 0.0), 30.0);
  float flatSpec = pow(max(light.z, 0.0), 30.0);
  float glint = clamp((raw - flatSpec) / max(1.0 - flatSpec, 0.0001), 0.0, 1.0);

  // Gentle physical liquid displacement with soft chromatic split
  vec2 disp = normal.xy * (amount * uStrength * 0.045);
  vec2 uvR = vUv + disp * 1.008;
  vec2 uvG = vUv + disp;
  vec2 uvB = vUv + disp * 0.992;

  vec3 bgR = getBgColor(uvR);
  vec3 bgG = getBgColor(uvG);
  vec3 bgB = getBgColor(uvB);
  vec3 displacedBg = vec3(bgR.r, bgG.g, bgB.b);

  // Subtle caustic sheen and glint
  vec3 causticColor = mix(uTint, uHighlight, glint * 0.5);
  vec3 finalColor = mix(displacedBg, causticColor, amount * 0.12 * uTintAmount + glint * 0.2);

  // Sheer liquid transparency - minimal and unobtrusive
  float alpha = clamp(amount * 0.2 + glint * 0.22, 0.0, 0.35);

  gl_FragColor = vec4(finalColor, alpha);
}
`;

const hexToRGB = (hex: string): [number, number, number] => {
  const clean = hex.replace('#', '');
  const full =
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean;
  const n = parseInt(full, 16);
  if (Number.isNaN(n)) return [0.38, 0.4, 0.94];
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

export const GlobalRippleEffect: React.FC<GlobalRippleEffectProps> = ({
  brushSize = 130,
  strength = 0.06,
  swirl = 0.4,
  rings = 2.5,
  spread = 3.2,
  fade = 3.0,
  spacing = 22,
  tint = '#6366f1',
  tintAmount = 0.25,
  highlightColor = '#ffffff',
  clickStrength = 1.0,
  enabled = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const configRef = useRef({
    brushSize,
    spread,
    fade,
    spacing,
    clickStrength,
    enabled,
  });

  configRef.current = {
    brushSize,
    spread,
    fade,
    spacing,
    clickStrength,
    enabled,
  };

  useEffect(() => {
    const mount = containerRef.current;
    if (!mount) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const renderer = new Renderer({
      alpha: true,
      antialias: false,
      dpr: Math.min(window.devicePixelRatio || 1, 1.75),
    });

    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    const canvas = gl.canvas;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    mount.appendChild(canvas);

    const offsets = new Float32Array(MAX_WAVES * 2);
    const scales = new Float32Array(MAX_WAVES * 2);
    const opacities = new Float32Array(MAX_WAVES);

    const waves = Array.from({ length: MAX_WAVES }, () => ({
      x: 0,
      y: 0,
      scale: START_SCALE,
      target: START_SCALE,
      size: 1,
      opacity: 0,
    }));
    let current = 0;

    const geometry = new Geometry(gl, {
      position: { size: 2, data: new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]) },
      uv: { size: 2, data: new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]) },
      iOffset: { instanced: 1, size: 2, data: offsets },
      iScale: { instanced: 1, size: 2, data: scales },
      iOpacity: { instanced: 1, size: 1, data: opacities },
    });

    const waveUniforms = { uRings: { value: rings } };
    const waveProgram = new Program(gl, {
      vertex: waveVertex,
      fragment: waveFragment,
      uniforms: waveUniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      cullFace: false,
    });
    waveProgram.setBlendFunc(gl.ONE, gl.ONE);
    const waveMesh = new Mesh(gl, { geometry, program: waveProgram, frustumCulled: false });

    const displacementTarget = new RenderTarget(gl, {
      width: 2,
      height: 2,
      depth: false,
      minFilter: gl.LINEAR,
      magFilter: gl.LINEAR,
      wrapS: gl.CLAMP_TO_EDGE,
      wrapT: gl.CLAMP_TO_EDGE,
    });

    const compositeUniforms = {
      uDisplacement: { value: displacementTarget.texture },
      uResolution: { value: [1, 1] },
      uTexel: { value: [1, 1] },
      uTint: { value: hexToRGB(tint) },
      uHighlight: { value: hexToRGB(highlightColor) },
      uStrength: { value: strength },
      uSwirl: { value: swirl },
      uTintAmount: { value: tintAmount },
    };

    const compositeMesh = new Mesh(gl, {
      geometry: new Triangle(gl),
      program: new Program(gl, {
        vertex: screenVertex,
        fragment: compositeFragment,
        uniforms: compositeUniforms,
        transparent: true,
        depthTest: false,
        depthWrite: false,
      }),
    });

    let width = 1;
    let height = 1;

    const resize = () => {
      width = Math.max(1, window.innerWidth);
      height = Math.max(1, window.innerHeight);
      renderer.setSize(width, height);
      compositeUniforms.uResolution.value = [width, height];

      const scale = 0.55; // optimized resolution for smooth 60fps across whole viewport
      const fieldW = Math.max(2, Math.round(width * scale));
      const fieldH = Math.max(2, Math.round(height * scale));
      displacementTarget.setSize(fieldW, fieldH);
      compositeUniforms.uTexel.value = [1 / fieldW, 1 / fieldH];
    };

    window.addEventListener('resize', resize);
    resize();

    const setNewWave = (x: number, y: number, power: number) => {
      const cfg = configRef.current;
      const wave = waves[current];
      current = (current + 1) % MAX_WAVES;
      wave.x = x;
      wave.y = y;
      wave.scale = START_SCALE * power;
      wave.target = START_SCALE * Math.max(1, cfg.spread) * power;
      wave.size = Math.max(1, cfg.brushSize);
      wave.opacity = 1;
    };

    let previousX = 0;
    let previousY = 0;

    const onPointerMove = (event: PointerEvent) => {
      const cfg = configRef.current;
      if (!cfg.enabled || prefersReducedMotion) return;

      const x = event.clientX;
      const y = height - event.clientY;

      const step = Math.max(1, cfg.spacing);
      if (Math.abs(x - previousX) > step || Math.abs(y - previousY) > step) {
        setNewWave(x, y, 1.0);
        previousX = x;
        previousY = y;
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      const cfg = configRef.current;
      if (!cfg.enabled || prefersReducedMotion) return;

      const x = event.clientX;
      const y = height - event.clientY;

      // Spawn soft minimal burst ripple on click
      setNewWave(x, y, cfg.clickStrength || 1.0);
      // Delicate secondary wave
      setTimeout(() => {
        setNewWave(x, y, (cfg.clickStrength || 1.0) * 0.55);
      }, 80);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });

    let raf = 0;
    let previousTime = 0;

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const delta = previousTime ? Math.min(0.05, (now - previousTime) / 1000) : 0;
      previousTime = now;
      const cfg = configRef.current;

      const growth = prefersReducedMotion ? 0 : 1 - Math.exp(-delta * 1.15);
      const decay = prefersReducedMotion ? 1 : Math.exp((-delta * LIFE_CONSTANT) / Math.max(0.2, cfg.fade));

      let activeCount = 0;

      for (let i = 0; i < MAX_WAVES; i += 1) {
        const wave = waves[i];
        if (wave.opacity <= 0) {
          opacities[i] = 0;
          continue;
        }

        wave.opacity *= decay;
        wave.scale += (wave.target - wave.scale) * growth;

        if (wave.opacity < 0.002) {
          wave.opacity = 0;
          opacities[i] = 0;
          continue;
        }

        activeCount++;
        const half = (wave.scale * wave.size) / 2;
        offsets[i * 2] = (wave.x / width) * 2 - 1;
        offsets[i * 2 + 1] = (wave.y / height) * 2 - 1;
        scales[i * 2] = (half / width) * 2;
        scales[i * 2 + 1] = (half / height) * 2;
        opacities[i] = wave.opacity;
      }

      geometry.attributes.iOffset.needsUpdate = true;
      geometry.attributes.iScale.needsUpdate = true;
      geometry.attributes.iOpacity.needsUpdate = true;

      // Render displacement target then composite liquid caustics
      renderer.render({ scene: waveMesh, target: displacementTarget, clear: true });
      gl.clearColor(0, 0, 0, 0);
      renderer.render({ scene: compositeMesh });
    };

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      if (canvas.parentNode === mount) {
        mount.removeChild(canvas);
      }
      const ext = gl.getExtension('WEBGL_lose_context');
      if (ext) ext.loseContext();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{
        opacity: 0.95,
      }}
    />
  );
};

export default GlobalRippleEffect;
