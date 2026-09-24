import { useRef, useMemo } from 'react';
import * as THREE from 'three';

export interface DNAHelixData {
  positions: Float32Array;
  colors: Float32Array;
}

export function useDNAHelixGeometry(isMobile = false) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const totalPointsPerStrand = isMobile ? 100 : 300;
    const rungsCount = isMobile ? 30 : 80;
    const radius = 1.2;
    const pitch = 0.15;
    const maxT = Math.PI * 6;
    const centerOffset = (maxT * pitch) / 2;

    const coords: number[] = [];
    const colorArray: number[] = [];
    const baseColor = new THREE.Color('#c4b5fd');
    const rungColor = new THREE.Color('#ddd6fe');

    // Strand 1 & 2
    for (let i = 0; i < totalPointsPerStrand; i++) {
      const t = (i / totalPointsPerStrand) * maxT;

      const x1 = radius * Math.cos(t);
      const y1 = t * pitch - centerOffset;
      const z1 = radius * Math.sin(t);
      coords.push(x1, y1, z1);
      colorArray.push(baseColor.r, baseColor.g, baseColor.b);

      const x2 = radius * Math.cos(t + Math.PI);
      const y2 = t * pitch - centerOffset;
      const z2 = radius * Math.sin(t + Math.PI);
      coords.push(x2, y2, z2);
      colorArray.push(baseColor.r, baseColor.g, baseColor.b);
    }

    // Connective rungs
    for (let r = 0; r < rungsCount; r++) {
      const t = (r / rungsCount) * maxT;
      const x1 = radius * Math.cos(t);
      const y1 = t * pitch - centerOffset;
      const z1 = radius * Math.sin(t);

      const x2 = radius * Math.cos(t + Math.PI);
      const y2 = t * pitch - centerOffset;
      const z2 = radius * Math.sin(t + Math.PI);

      for (let step = 1; step <= 3; step++) {
        const factor = step / 4;
        const rx = x1 + (x2 - x1) * factor;
        const ry = y1 + (y2 - y1) * factor;
        const rz = z1 + (z2 - z1) * factor;
        coords.push(rx, ry, rz);
        colorArray.push(rungColor.r, rungColor.g, rungColor.b);
      }
    }

    return {
      positions: new Float32Array(coords),
      colors: new Float32Array(colorArray),
    };
  }, [isMobile]);

  return { positions, colors, pointsRef };
}
