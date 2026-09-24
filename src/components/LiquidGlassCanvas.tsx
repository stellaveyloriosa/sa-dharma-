import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface LiquidGlassCanvasProps {
  interactive?: boolean;
}

export const LiquidGlassCanvas: React.FC<LiquidGlassCanvasProps> = ({ interactive = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState<'glass' | 'network' | 'brownian'>('glass');
  const [fpsLabel, setFpsLabel] = useState<string>('60 FPS');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050811, 0.035);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Environment Lighting (Key, Fill, Rim for liquid glass)
    const ambientLight = new THREE.AmbientLight(0x0a192f, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 2.5); // Cyan key
    keyLight.position.set(5, 6, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x818cf8, 1.8); // Indigo fill
    fillLight.position.set(-5, -3, 2);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0x34d399, 3.2, 12); // Emerald rim
    rimLight.position.set(0, 4, -4);
    scene.add(rimLight);

    const accentLight = new THREE.PointLight(0x38bdf8, 2.5, 10);
    accentLight.position.set(2, -2, 3);
    scene.add(accentLight);

    // ==========================================
    // 1. LIQUID GLASS MAIN OBJECT
    // ==========================================
    const glassGroup = new THREE.Group();
    scene.add(glassGroup);

    // Liquid Glass Material with Physical Transmission
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x93c5fd,
      emissive: 0x030712,
      roughness: 0.05,
      metalness: 0.08,
      transmission: 0.94, // Liquid glass refraction
      ior: 1.48,          // Glass index of refraction
      thickness: 1.8,
      specularIntensity: 1.2,
      specularColor: 0xffffff,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      transparent: true,
      opacity: 0.95,
      side: THREE.DoubleSide,
    });

    // Glass Outer Organic Body (Torus Knot with undulating morphs)
    const glassGeometry = new THREE.TorusKnotGeometry(1.65, 0.52, 128, 32, 2, 3);
    const glassMesh = new THREE.Mesh(glassGeometry, glassMaterial);
    glassGroup.add(glassMesh);

    // Inner Glowing Molecular Core (visible through the liquid glass refraction!)
    const coreGroup = new THREE.Group();
    glassGroup.add(coreGroup);

    // Double Helix inner strands
    const helixPointsCount = 70;
    const helixCurveA: THREE.Vector3[] = [];
    const helixCurveB: THREE.Vector3[] = [];
    for (let i = 0; i < helixPointsCount; i++) {
      const t = (i / helixPointsCount) * Math.PI * 4;
      const y = (i / helixPointsCount - 0.5) * 3.2;
      const radius = 0.55;
      helixCurveA.push(new THREE.Vector3(Math.cos(t) * radius, y, Math.sin(t) * radius));
      helixCurveB.push(new THREE.Vector3(Math.cos(t + Math.PI) * radius, y, Math.sin(t + Math.PI) * radius));
    }

    const strandMatA = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.85 });
    const strandMatB = new THREE.LineBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.85 });

    const geomA = new THREE.BufferGeometry().setFromPoints(helixCurveA);
    const geomB = new THREE.BufferGeometry().setFromPoints(helixCurveB);
    const lineA = new THREE.Line(geomA, strandMatA);
    const lineB = new THREE.Line(geomB, strandMatB);
    coreGroup.add(lineA);
    coreGroup.add(lineB);

    // Rungs connecting strands
    const rungsGroup = new THREE.Group();
    coreGroup.add(rungsGroup);
    const rungMaterial = new THREE.LineBasicMaterial({ color: 0xa78bfa, transparent: true, opacity: 0.6 });
    for (let i = 0; i < helixPointsCount; i += 3) {
      const rungGeom = new THREE.BufferGeometry().setFromPoints([helixCurveA[i], helixCurveB[i]]);
      const rung = new THREE.Line(rungGeom, rungMaterial);
      rungsGroup.add(rung);
    }

    // Inner glowing nodes
    const nodeSphereGeom = new THREE.SphereGeometry(0.045, 12, 12);
    const nodeSphereMat = new THREE.MeshBasicMaterial({ color: 0x67e8f9 });
    for (let i = 0; i < helixPointsCount; i += 4) {
      const sphereA = new THREE.Mesh(nodeSphereGeom, nodeSphereMat);
      sphereA.position.copy(helixCurveA[i]);
      coreGroup.add(sphereA);
      const sphereB = new THREE.Mesh(nodeSphereGeom, nodeSphereMat);
      sphereB.position.copy(helixCurveB[i]);
      coreGroup.add(sphereB);
    }

    // ==========================================
    // 2. NETWORK MANIFOLD (scKAN / Single-Cell Graph)
    // ==========================================
    const networkGroup = new THREE.Group();
    scene.add(networkGroup);
    networkGroup.visible = false;

    const netNodeCount = 95;
    const netPositions: THREE.Vector3[] = [];
    const netTypes: number[] = [];
    for (let i = 0; i < netNodeCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.4 * Math.cbrt(Math.random());
      const sinPhi = Math.sin(phi);
      const pos = new THREE.Vector3(
        r * sinPhi * Math.cos(theta),
        r * sinPhi * Math.sin(theta) * 0.7,
        r * Math.cos(phi)
      );
      netPositions.push(pos);
      netTypes.push(Math.floor(Math.random() * 4)); // 4 cell lineages
    }

    const cellColors = [0x38bdf8, 0x34d399, 0xa855f7, 0xf59e0b];
    const nodeMeshes: THREE.Mesh[] = [];
    netPositions.forEach((pos, idx) => {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.07, 16, 16),
        new THREE.MeshStandardMaterial({
          color: cellColors[netTypes[idx]],
          emissive: cellColors[netTypes[idx]],
          emissiveIntensity: 0.35,
          roughness: 0.2,
          metalness: 0.4,
        })
      );
      mesh.position.copy(pos);
      networkGroup.add(mesh);
      nodeMeshes.push(mesh);
    });

    // Edges between close nodes
    const edgeLines: THREE.Line[] = [];
    const edgeMat = new THREE.LineBasicMaterial({
      color: 0x64748b,
      transparent: true,
      opacity: 0.25,
    });
    for (let i = 0; i < netNodeCount; i++) {
      for (let j = i + 1; j < netNodeCount; j++) {
        if (netPositions[i].distanceTo(netPositions[j]) < 1.15) {
          const edgeGeom = new THREE.BufferGeometry().setFromPoints([netPositions[i], netPositions[j]]);
          const line = new THREE.Line(edgeGeom, edgeMat);
          networkGroup.add(line);
          edgeLines.push(line);
        }
      }
    }

    // ==========================================
    // 3. BROWNIAN & RADIATION PARTICLES
    // ==========================================
    const brownianGroup = new THREE.Group();
    scene.add(brownianGroup);
    brownianGroup.visible = false;

    const particleCount = 450;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities: THREE.Vector3[] = [];

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 7.5;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 5.5;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      particleVelocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        )
      );
    }
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.065,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    brownianGroup.add(particles);

    // Floating Glass Spheres surrounding the space
    const orbGroup = new THREE.Group();
    scene.add(orbGroup);
    const ambientOrbs: { mesh: THREE.Mesh; speed: number; rotSpeed: number; basePos: THREE.Vector3 }[] = [];
    const orbGeom = new THREE.SphereGeometry(0.28, 24, 24);
    for (let i = 0; i < 7; i++) {
      const orb = new THREE.Mesh(orbGeom, glassMaterial);
      const angle = (i / 7) * Math.PI * 2;
      const rad = 3.6 + Math.random() * 0.8;
      const basePos = new THREE.Vector3(
        Math.cos(angle) * rad,
        (Math.random() - 0.5) * 2.8,
        Math.sin(angle) * rad - 1
      );
      orb.position.copy(basePos);
      orbGroup.add(orb);
      ambientOrbs.push({
        mesh: orb,
        speed: 0.4 + Math.random() * 0.4,
        rotSpeed: 0.01 + Math.random() * 0.02,
        basePos,
      });
    }

    // ==========================================
    // INTERACTION & ANIMATION
    // ==========================================
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.targetY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // WebGL Context Lost recovery
    const handleContextLost = (e: Event) => {
      e.preventDefault();
    };
    const handleContextRestored = () => {
      handleResize();
    };
    const canvasElem = renderer.domElement;
    canvasElem.addEventListener('webglcontextlost', handleContextLost);
    canvasElem.addEventListener('webglcontextrestored', handleContextRestored);

    let animationFrameId: number;
    let clock = new THREE.Clock();
    let frameCount = 0;
    let lastFpsUpdate = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // FPS tracking
      frameCount++;
      const now = performance.now();
      if (now - lastFpsUpdate > 1000) {
        setFpsLabel(`${Math.round((frameCount * 1000) / (now - lastFpsUpdate))} FPS`);
        frameCount = 0;
        lastFpsUpdate = now;
      }

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // 1. Glass Object Rotation & Gentle Undulation
      if (glassGroup.visible) {
        glassMesh.rotation.x = elapsedTime * 0.22 + mouse.y * 0.45;
        glassMesh.rotation.y = elapsedTime * 0.32 + mouse.x * 0.55;
        glassMesh.rotation.z = Math.sin(elapsedTime * 0.15) * 0.2;

        // Core helix spins in sync
        coreGroup.rotation.x = -elapsedTime * 0.18;
        coreGroup.rotation.y = elapsedTime * 0.38;
        rungsGroup.rotation.y = elapsedTime * 0.38;
      }

      // 2. Network Group
      if (networkGroup.visible) {
        networkGroup.rotation.y = elapsedTime * 0.15 + mouse.x * 0.35;
        networkGroup.rotation.x = Math.sin(elapsedTime * 0.1) * 0.15 + mouse.y * 0.25;
        nodeMeshes.forEach((mesh, idx) => {
          mesh.scale.setScalar(1 + Math.sin(elapsedTime * 2.5 + idx) * 0.15);
        });
      }

      // 3. Brownian Group
      if (brownianGroup.visible) {
        const positions = particleGeom.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          const vel = particleVelocities[i];
          positions[i * 3] += vel.x;
          positions[i * 3 + 1] += vel.y;
          positions[i * 3 + 2] += vel.z;

          // Boundary bounce
          if (Math.abs(positions[i * 3]) > 3.8) vel.x *= -1;
          if (Math.abs(positions[i * 3 + 1]) > 2.8) vel.y *= -1;
          if (Math.abs(positions[i * 3 + 2]) > 3) vel.z *= -1;
        }
        particleGeom.attributes.position.needsUpdate = true;
        brownianGroup.rotation.y = elapsedTime * 0.05;
      }

      // Ambient Glass Orbs orbital drift
      ambientOrbs.forEach((item, idx) => {
        const t = elapsedTime * item.speed + idx;
        item.mesh.position.y = item.basePos.y + Math.sin(t) * 0.45;
        item.mesh.position.x = item.basePos.x + Math.cos(t * 0.8) * 0.35;
        item.mesh.rotation.x += item.rotSpeed;
        item.mesh.rotation.y += item.rotSpeed * 1.3;
      });

      // Camera slight parallax tracking
      camera.position.x = mouse.x * 0.6;
      camera.position.y = mouse.y * 0.6;
      camera.lookAt(0, 0, 0);

      // Lights motion
      keyLight.position.x = 5 + Math.sin(elapsedTime * 0.5) * 1.5;
      accentLight.position.y = -2 + Math.cos(elapsedTime * 0.7) * 1.2;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      canvasElem.removeEventListener('webglcontextlost', handleContextLost);
      canvasElem.removeEventListener('webglcontextrestored', handleContextRestored);
      renderer.dispose();
      glassGeometry.dispose();
      glassMaterial.dispose();
      nodeSphereGeom.dispose();
      nodeSphereMat.dispose();
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [interactive]);

  // Mode switcher handler
  const handleModeSelect = (mode: 'glass' | 'network' | 'brownian') => {
    setActiveMode(mode);
    if (!containerRef.current) return;
    const canvas = containerRef.current.querySelector('canvas');
    if (!canvas) return;

    // We can dispatch or access the groups directly via scene references or custom event
    const event = new CustomEvent('canvas-mode-change', { detail: { mode } });
    window.dispatchEvent(event);
  };

  useEffect(() => {
    const handleCustomMode = (e: any) => {
      const mode = e.detail?.mode;
      if (!mode) return;
      // Visibilities can be adjusted
    };
    window.addEventListener('canvas-mode-change', handleCustomMode);
    return () => window.removeEventListener('canvas-mode-change', handleCustomMode);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <div ref={containerRef} className="w-full h-full pointer-events-auto" />

      {/* Subtle Optical Liquid Caustic Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#050811]/40 via-transparent to-[#050811] z-1" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent z-1" />

      {/* Floating Glass Simulation Controller HUD */}
      <div className="absolute top-20 right-6 md:right-10 pointer-events-auto z-10 hidden sm:flex items-center gap-1.5 p-1 bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl text-xs shadow-2xl">
        <span className="px-2.5 py-1 text-slate-400 font-mono text-[11px] tabular-nums">
          {fpsLabel}
        </span>
        <div className="h-3 w-px bg-white/10 mx-0.5" />
        <button
          onClick={() => handleModeSelect('glass')}
          className={`px-2.5 py-1 rounded-lg font-medium transition-all text-[11px] ${
            activeMode === 'glass'
              ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Liquid Glass
        </button>
        <button
          onClick={() => handleModeSelect('network')}
          className={`px-2.5 py-1 rounded-lg font-medium transition-all text-[11px] ${
            activeMode === 'network'
              ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          scKAN Manifold
        </button>
        <button
          onClick={() => handleModeSelect('brownian')}
          className={`px-2.5 py-1 rounded-lg font-medium transition-all text-[11px] ${
            activeMode === 'brownian'
              ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Diffusion Particles
        </button>
      </div>
    </div>
  );
};
