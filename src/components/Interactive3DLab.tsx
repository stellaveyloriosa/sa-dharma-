import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Play, Pause, RotateCcw, Info, Download, Layers, Activity, Maximize2, ShieldCheck, Cpu } from 'lucide-react';

type SimulationMode = 'atpase' | 'sckan' | 'crc_abm' | 'bilirubinometer';

export const Interactive3DLab: React.FC = () => {
  const [activeSimulation, setActiveSimulation] = useState<SimulationMode>('atpase');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [scrubberTime, setScrubberTime] = useState<number>(75); // 0 to 150 ns for ATPase, or days for ABM
  const [plddtThreshold, setPlddtThreshold] = useState<number>(70);
  const [radiationFraction, setRadiationFraction] = useState<number>(3); // 1 to 5 fractions
  const [bilirubinDepth, setBilirubinDepth] = useState<number>(1.2); // mm dermal depth
  const [inspectingResidue, setInspectingResidue] = useState<string | null>('Arg283 (Walker A Motif)');

  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const currentGroupRef = useRef<THREE.Group | null>(null);
  const isPlayingRef = useRef(isPlaying);
  const scrubberTimeRef = useRef(scrubberTime);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    scrubberTimeRef.current = scrubberTime;
  }, [scrubberTime]);

  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    // Clean existing canvas
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // Studio Lights calibrated for scientific materials
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 2.2);
    dirLight1.position.set(5, 8, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x818cf8, 1.4);
    dirLight2.position.set(-5, -4, -3);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0x34d399, 2.0, 10);
    pointLight.position.set(0, 3, 2);
    scene.add(pointLight);

    const activeGroup = new THREE.Group();
    scene.add(activeGroup);
    currentGroupRef.current = activeGroup;

    // Build specific simulation scene based on activeSimulation
    if (activeSimulation === 'atpase') {
      // 1. VCP/VAT ATPase Hexameric Minimal Construct
      // 6 subunits in pseudo-hexameric ring
      const subunitCount = 6;
      const ringRadius = 1.9;
      for (let s = 0; s < subunitCount; s++) {
        const angle = (s / subunitCount) * Math.PI * 2;
        const subGroup = new THREE.Group();
        subGroup.position.set(Math.cos(angle) * ringRadius, Math.sin(angle) * ringRadius, 0);
        subGroup.rotation.z = angle + Math.PI / 2;

        // Backbone ribbon approximation using CatmullRomCurve3
        const curvePoints: THREE.Vector3[] = [];
        for (let k = 0; k < 12; k++) {
          const t = (k / 11) * Math.PI * 1.5;
          curvePoints.push(
            new THREE.Vector3(
              Math.sin(t) * 0.45,
              (k / 11 - 0.5) * 1.2,
              Math.cos(t * 1.8) * 0.35
            )
          );
        }
        const curve = new THREE.CatmullRomCurve3(curvePoints);
        const tubeGeom = new THREE.TubeGeometry(curve, 32, 0.06, 8, false);

        // AlphaFold pLDDT colors: Blue (>90 very high), Cyan (70-90 confident)
        const plddtColor = s % 2 === 0 ? 0x0284c7 : 0x06b6d4;
        const tubeMat = new THREE.MeshPhysicalMaterial({
          color: plddtColor,
          roughness: 0.25,
          metalness: 0.15,
          transmission: 0.3,
          thickness: 0.5,
          clearcoat: 0.8,
        });
        const tubeMesh = new THREE.Mesh(tubeGeom, tubeMat);
        subGroup.add(tubeMesh);

        // Active residues (Walker A & B motifs)
        const activeResGeom = new THREE.SphereGeometry(0.12, 16, 16);
        const activeResMat = new THREE.MeshStandardMaterial({
          color: 0xf59e0b,
          emissive: 0xd97706,
          emissiveIntensity: 0.6,
          roughness: 0.3,
        });
        const res1 = new THREE.Mesh(activeResGeom, activeResMat);
        res1.position.set(0.1, 0.2, 0.15);
        subGroup.add(res1);

        activeGroup.add(subGroup);
      }

      // Central ATP ligand in the pore
      const atpGeom = new THREE.DodecahedronGeometry(0.35, 0);
      const atpMat = new THREE.MeshPhysicalMaterial({
        color: 0xf43f5e,
        emissive: 0xe11d48,
        emissiveIntensity: 0.4,
        roughness: 0.1,
        transmission: 0.85,
        ior: 1.5,
      });
      const atp = new THREE.Mesh(atpGeom, atpMat);
      atp.position.set(0, 0, 0.2);
      activeGroup.add(atp);

    } else if (activeSimulation === 'sckan') {
      // 2. scKAN & DeepSEM Gene Regulatory Manifold
      // Cell state latent points clustered by 4 lineages
      const clusterCenters = [
        new THREE.Vector3(-1.4, -0.8, 0), // Monocytes
        new THREE.Vector3(1.2, -1.0, 0.4), // CD4/CD8 T-cells
        new THREE.Vector3(-0.8, 1.3, -0.3), // B-cells
        new THREE.Vector3(1.4, 1.1, -0.2),  // NK cells
      ];
      const clusterColors = [0x38bdf8, 0x34d399, 0xa855f7, 0xf59e0b];

      clusterCenters.forEach((center, cIdx) => {
        // Cells in cluster
        for (let i = 0; i < 30; i++) {
          const spread = 0.6;
          const pos = new THREE.Vector3(
            center.x + (Math.random() - 0.5) * spread,
            center.y + (Math.random() - 0.5) * spread,
            center.z + (Math.random() - 0.5) * spread
          );
          const cellGeom = new THREE.SphereGeometry(0.065, 12, 12);
          const cellMat = new THREE.MeshStandardMaterial({
            color: clusterColors[cIdx],
            emissive: clusterColors[cIdx],
            emissiveIntensity: 0.3,
            roughness: 0.2,
          });
          const cellMesh = new THREE.Mesh(cellGeom, cellMat);
          cellMesh.position.copy(pos);
          activeGroup.add(cellMesh);
        }
      });

      // Spline KAN Trajectory curves between lineage transitions
      const splinePoints = [
        clusterCenters[0],
        new THREE.Vector3(0, 0, 0.4),
        clusterCenters[1],
        new THREE.Vector3(0.5, 0.2, -0.1),
        clusterCenters[3],
      ];
      const trajCurve = new THREE.CatmullRomCurve3(splinePoints);
      const trajGeom = new THREE.TubeGeometry(trajCurve, 64, 0.035, 8, false);
      const trajMat = new THREE.MeshBasicMaterial({ color: 0x67e8f9, transparent: true, opacity: 0.8 });
      const trajMesh = new THREE.Mesh(trajGeom, trajMat);
      activeGroup.add(trajMesh);

    } else if (activeSimulation === 'crc_abm') {
      // 3. Colorectal Cancer Tumor Spheroid & Radiotherapy Beam
      // Concentric tumor agent layers: Proliferating (green), Hypoxic Quiescent (amber), Necrotic (slate)
      const agentCount = 140;
      for (let i = 0; i < agentCount; i++) {
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        const r = 2.1 * Math.cbrt(Math.random());
        const sinPhi = Math.sin(phi);

        const pos = new THREE.Vector3(
          r * sinPhi * Math.cos(theta),
          r * sinPhi * Math.sin(theta),
          r * Math.cos(phi)
        );

        let color = 0x22c55e; // Outer Proliferating
        if (r < 1.1) {
          color = 0x64748b; // Necrotic core
        } else if (r < 1.7) {
          color = 0xf59e0b; // Hypoxic Quiescent
        }

        const agentMesh = new THREE.Mesh(
          new THREE.SphereGeometry(0.085, 12, 12),
          new THREE.MeshStandardMaterial({
            color,
            roughness: 0.4,
            metalness: 0.1,
          })
        );
        agentMesh.position.copy(pos);
        activeGroup.add(agentMesh);
      }

      // Fractionated Radiation Beam Visualization (Translucent conical beam)
      const coneGeom = new THREE.ConeGeometry(2.4, 4.5, 32, 1, true);
      const coneMat = new THREE.MeshBasicMaterial({
        color: 0x06b6d4,
        transparent: true,
        opacity: 0.18,
        side: THREE.DoubleSide,
      });
      const beamMesh = new THREE.Mesh(coneGeom, coneMat);
      beamMesh.position.set(0, 2.5, 0);
      beamMesh.rotation.x = Math.PI;
      activeGroup.add(beamMesh);

    } else if (activeSimulation === 'bilirubinometer') {
      // 4. Pocket Neonatal Bilirubinometer (Patent 6325190)
      // Device chassis + optical sensor tip
      const bodyGeom = new THREE.CylinderGeometry(0.55, 0.7, 2.8, 32);
      const bodyMat = new THREE.MeshPhysicalMaterial({
        color: 0x0f172a,
        roughness: 0.35,
        metalness: 0.85,
        clearcoat: 0.4,
      });
      const body = new THREE.Mesh(bodyGeom, bodyMat);
      activeGroup.add(body);

      // Glass Optical Sensor Tip
      const tipGeom = new THREE.CylinderGeometry(0.24, 0.45, 0.8, 32);
      const tipMat = new THREE.MeshPhysicalMaterial({
        color: 0x67e8f9,
        transmission: 0.95,
        roughness: 0.05,
        ior: 1.52,
        thickness: 0.8,
        transparent: true,
        opacity: 0.9,
      });
      const tip = new THREE.Mesh(tipGeom, tipMat);
      tip.position.set(0, -1.6, 0);
      activeGroup.add(tip);

      // Dual wavelength optical beams (460 nm Blue & 550 nm Green)
      const ray460Geom = new THREE.CylinderGeometry(0.02, 0.02, 1.4, 8);
      const ray460Mat = new THREE.MeshBasicMaterial({ color: 0x2563eb });
      const ray460 = new THREE.Mesh(ray460Geom, ray460Mat);
      ray460.position.set(-0.08, -2.4, 0);
      activeGroup.add(ray460);

      const ray550Geom = new THREE.CylinderGeometry(0.02, 0.02, 1.4, 8);
      const ray550Mat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
      const ray550 = new THREE.Mesh(ray550Geom, ray550Mat);
      ray550.position.set(0.08, -2.4, 0);
      activeGroup.add(ray550);

      // Neonatal skin layer substrate
      const skinGeom = new THREE.BoxGeometry(3.2, 0.2, 3.2);
      const skinMat = new THREE.MeshStandardMaterial({
        color: 0xfde047,
        roughness: 0.8,
        transparent: true,
        opacity: 0.45,
      });
      const skin = new THREE.Mesh(skinGeom, skinMat);
      skin.position.set(0, -3.2, 0);
      activeGroup.add(skin);
    }

    // Interactive Drag Orbit
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !activeGroup) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      activeGroup.rotation.y += deltaX * 0.008;
      activeGroup.rotation.x += deltaY * 0.008;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Render loop
    let clock = new THREE.Clock();
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (isPlayingRef.current && activeGroup && !isDragging) {
        activeGroup.rotation.y += delta * 0.35;
        if (activeSimulation === 'atpase') {
          activeGroup.rotation.x = Math.sin(clock.getElapsedTime() * 0.5) * 0.25;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [activeSimulation]);

  const resetOrientation = () => {
    if (currentGroupRef.current) {
      currentGroupRef.current.rotation.set(0, 0, 0);
    }
  };

  return (
    <section id="lab3d" className="py-20 relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 mb-3 tracking-wider uppercase">
          <Activity className="w-3.5 h-3.5" />
          <span>Interactive In-Silico Workbench</span>
          <span aria-hidden="true">·</span>
          <span>WebGL 3D Physics & Structural Solvers</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display mb-4">
          Interactive Research Laboratory
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Inspect 3D conformational dynamics, gene regulatory manifolds, agent-based radiation responses, and registered patent hardware in real-time.
        </p>
      </div>

      {/* Main Console Box (Liquid Glass Panel) */}
      <div className="liquid-glass rounded-2xl p-4 sm:p-6 lg:p-8 relative overflow-hidden">
        {/* Top Simulation Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/10 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveSimulation('atpase')}
              className={`px-3.5 py-2 text-xs font-medium rounded-xl transition-all whitespace-nowrap ${
                activeSimulation === 'atpase'
                  ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-500/50 shadow-md'
                  : 'text-slate-400 hover:text-white bg-white/5 border border-white/5'
              }`}
            >
              VCP/VAT ATPase 150ns MD
            </button>
            <button
              onClick={() => setActiveSimulation('sckan')}
              className={`px-3.5 py-2 text-xs font-medium rounded-xl transition-all whitespace-nowrap ${
                activeSimulation === 'sckan'
                  ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-500/50 shadow-md'
                  : 'text-slate-400 hover:text-white bg-white/5 border border-white/5'
              }`}
            >
              scKAN Gene Network
            </button>
            <button
              onClick={() => setActiveSimulation('crc_abm')}
              className={`px-3.5 py-2 text-xs font-medium rounded-xl transition-all whitespace-nowrap ${
                activeSimulation === 'crc_abm'
                  ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-500/50 shadow-md'
                  : 'text-slate-400 hover:text-white bg-white/5 border border-white/5'
              }`}
            >
              CRC-ABM Radiotherapy
            </button>
            <button
              onClick={() => setActiveSimulation('bilirubinometer')}
              className={`px-3.5 py-2 text-xs font-medium rounded-xl transition-all whitespace-nowrap ${
                activeSimulation === 'bilirubinometer'
                  ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-500/50 shadow-md'
                  : 'text-slate-400 hover:text-white bg-white/5 border border-white/5'
              }`}
            >
              Patent 6325190 Bilirubinometer
            </button>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? 'Pause simulation' : 'Play simulation'}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={resetOrientation}
              aria-label="Reset orientation"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Workspace Grid: Left 3D Viewport + Right Scientific Telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* 3D Canvas Stage (7 cols on desktop) */}
          <div className="lg:col-span-8 bg-black/40 rounded-xl border border-white/10 relative overflow-hidden min-h-[420px] sm:min-h-[480px] flex items-center justify-center">
            <div
              ref={canvasContainerRef}
              className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing"
            />

            {/* Floating HUD Badges inside Canvas */}
            <div className="absolute top-4 left-4 pointer-events-none flex flex-col gap-1.5 text-[11px] font-mono text-slate-400 bg-black/60 backdrop-blur-md px-3 py-2 rounded-lg border border-white/10">
              <div className="text-cyan-300 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {activeSimulation === 'atpase' && 'PARAMRUDRA HPC · GROMACS 2024'}
                {activeSimulation === 'sckan' && 'ASHOKA KCDH · scKAN SPLINES'}
                {activeSimulation === 'crc_abm' && 'PHYSICAL BIOLOGY · FRACTIONATED RT'}
                {activeSimulation === 'bilirubinometer' && 'PATENT DESIGN · TRANSCUTANEOUS OPTICS'}
              </div>
              <div>ROTATION: DRAG TO ORBIT · ZOOM: MOUSE WHEEL</div>
            </div>

            {/* Bottom Scrubber Overlay for time-series */}
            {activeSimulation === 'atpase' && (
              <div className="absolute bottom-4 inset-x-4 bg-black/70 backdrop-blur-md border border-white/10 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 font-mono text-slate-300 text-[11px]">
                  <span>MD TRAJECTORY:</span>
                  <span className="text-cyan-300 font-bold tabular-nums">{scrubberTime} ns</span>
                  <span className="text-slate-500">/ 150 ns</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="150"
                  value={scrubberTime}
                  onChange={(e) => setScrubberTime(Number(e.target.value))}
                  className="w-full sm:w-64 accent-cyan-400 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>
            )}

            {activeSimulation === 'crc_abm' && (
              <div className="absolute bottom-4 inset-x-4 bg-black/70 backdrop-blur-md border border-white/10 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 font-mono text-slate-300 text-[11px]">
                  <span>RADIATION DOSE:</span>
                  <span className="text-cyan-300 font-bold tabular-nums">{radiationFraction * 2} Gy</span>
                  <span className="text-slate-500">({radiationFraction} Fractions)</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={radiationFraction}
                  onChange={(e) => setRadiationFraction(Number(e.target.value))}
                  className="w-full sm:w-64 accent-cyan-400 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* Right Precision Telemetry & Pipeline Parameters (4 cols on desktop) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-4 bg-white/[0.02] border border-white/10 rounded-xl p-5">
            <div>
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
                {activeSimulation === 'atpase' && 'Structural Bioengineering'}
                {activeSimulation === 'sckan' && 'Interpretable GRN Inference'}
                {activeSimulation === 'crc_abm' && 'Multiscale Cancer Mechanics'}
                {activeSimulation === 'bilirubinometer' && 'Registered Device Patent'}
              </div>

              <h3 className="text-lg font-bold text-white font-display mb-3">
                {activeSimulation === 'atpase' && 'VCP/VAT ATPase Minimisation'}
                {activeSimulation === 'sckan' && 'Kolmogorov-Arnold GRN (scKAN)'}
                {activeSimulation === 'crc_abm' && 'Fractionated RT Tumor Spheroid'}
                {activeSimulation === 'bilirubinometer' && 'Transcutaneous Bilirubin Sensor'}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {activeSimulation === 'atpase' &&
                  'Engineered minimal hexamer construct designed at IIT Bombay under Dr. Anirban Banerjee. Optimized via Random Forest residue weighting and ProteinMPNN to preserve bacterial-killing ATPase activity while stripping redundant domains.'}
                {activeSimulation === 'sckan' &&
                  'Replaces black-box multi-layer perceptrons with univariate spline-parametrized activation functions on graph edges, learning precise transcriptional dynamics during PBMC immune lineage transitions.'}
                {activeSimulation === 'crc_abm' &&
                  'Models agent survival under fractionated radiotherapy (2 Gy pulses) coupled with oxygen diffusion PDEs. Captures hypoxia-mediated radio-resistance and cytotoxic lymphocyte clearance.'}
                {activeSimulation === 'bilirubinometer' &&
                  'Dual-wavelength (460 nm bilirubin absorbance vs 550 nm hemoglobin reference) transcutaneous reflectance sensor for needle-free neonatal hyperbilirubinemia screening.'}
              </p>

              {/* Empirical Metrics Cards */}
              <div className="space-y-2.5">
                {activeSimulation === 'atpase' && (
                  <>
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Backbone RMSD (150ns):</span>
                      <span className="font-mono text-cyan-300 font-semibold tabular-nums">1.84 ± 0.12 Å</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                      <span className="text-slate-400">ATP Docking Affinity:</span>
                      <span className="font-mono text-emerald-400 font-semibold tabular-nums">-9.8 kcal/mol (30×)</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                      <span className="text-slate-400">AlphaFold2 pLDDT:</span>
                      <span className="font-mono text-slate-200 font-semibold tabular-nums">88.4 (High Conf)</span>
                    </div>
                  </>
                )}

                {activeSimulation === 'sckan' && (
                  <>
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Latent Manifold AUROC:</span>
                      <span className="font-mono text-cyan-300 font-semibold tabular-nums">0.942</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Spline Edges Recovered:</span>
                      <span className="font-mono text-emerald-400 font-semibold tabular-nums">1,240 GRN Links</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Lineages Profiled:</span>
                      <span className="font-mono text-slate-200 font-semibold">Mono, T-Cell, B-Cell, NK</span>
                    </div>
                  </>
                )}

                {activeSimulation === 'crc_abm' && (
                  <>
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Fraction Kill Fraction:</span>
                      <span className="font-mono text-rose-400 font-semibold tabular-nums">0.68 / fraction</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Core Hypoxia pO2:</span>
                      <span className="font-mono text-amber-400 font-semibold tabular-nums">&lt; 2.5 mmHg</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Immune Infiltration:</span>
                      <span className="font-mono text-emerald-400 font-semibold tabular-nums">+44% Post-RT</span>
                    </div>
                  </>
                )}

                {activeSimulation === 'bilirubinometer' && (
                  <>
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Patent Number:</span>
                      <span className="font-mono text-cyan-300 font-semibold">Design No. 6325190</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Absorption Wavelength:</span>
                      <span className="font-mono text-slate-200 font-semibold tabular-nums">460 nm / 550 nm</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Measurement Latency:</span>
                      <span className="font-mono text-emerald-400 font-semibold tabular-nums">&lt; 1.2 Seconds</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Bottom Status / Links */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                Validated In-Silico
              </span>
              <a
                href="https://github.com/Dharmasastha2005"
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Inspect Pipeline Code &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
