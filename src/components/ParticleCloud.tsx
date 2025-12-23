import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function smoothstep01(t: number) {
  const x = Math.max(0, Math.min(1, t));
  return x * x * (3 - 2 * x);
}

interface ParticleCloudProps {
  interactionRadius?: number;
  displacement?: number;
  modelPath?: string;
  scrollProgress?: number;
}

export default function ParticleCloud({
  // Values are fractions of the model size (bounding sphere radius)
  interactionRadius = 0.35,
  displacement = 0.25,
  modelPath = import.meta.env.VITE_MODEL_URL || '/models/morph-sphere.glb',
  scrollProgress = 0,
}: ParticleCloudProps) {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const hitSphereRef = useRef<THREE.Mesh>(null);

  // Mouse state (in world space of the particle group)
  const targetMouseLocal = useRef(new THREE.Vector3(9999, 9999, 9999));
  const mouseLocal = useRef(new THREE.Vector3(9999, 9999, 9999));
  const isHovering = useRef(false);
  const currentRadius = useRef(interactionRadius);
  const smoothScroll = useRef(0);

  // Load the GLB model
  const { scene } = useGLTF(modelPath);

  // Extract vertices from GLB model (centered around origin)
  const {
    positions,
    originalPositions,
    expandedPositions,
    expandedColors,
    velocities,
    angles,
    randomFactors,
    particleCount,
    radius,
  } = useMemo(() => {
    const allVertices: THREE.Vector3[] = [];

    // Traverse scene and extract vertex positions (sample every Nth vertex for fewer particles)
    const sampleRate = 8; // Only use every 8th vertex for cleaner look
    scene.updateMatrixWorld(true);
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.geometry) {
        const positionAttr = child.geometry.attributes.position;
        if (!positionAttr) return;

        child.updateMatrixWorld(true);
        const matrix = child.matrixWorld;

        for (let i = 0; i < positionAttr.count; i += sampleRate) {
          const v = new THREE.Vector3(
            positionAttr.getX(i),
            positionAttr.getY(i),
            positionAttr.getZ(i)
          ).applyMatrix4(matrix);
          allVertices.push(v);
        }
      }
    });

    const count = allVertices.length;

    // Compute centroid and recenter so the cloud sits at (0,0,0)
    const center = new THREE.Vector3();
    for (const v of allVertices) center.add(v);
    if (count > 0) center.multiplyScalar(1 / count);

    let maxDist = 0;
    const flat = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const v = allVertices[i].clone().sub(center);
      flat[i * 3] = v.x;
      flat[i * 3 + 1] = v.y;
      flat[i * 3 + 2] = v.z;
      maxDist = Math.max(maxDist, v.length());
    }

    const r = maxDist * 1.15;

    const positionsArr = new Float32Array(flat);
    const originalPositionsArr = new Float32Array(flat);
    const velocitiesArr = new Float32Array(count * 3).fill(0);
    const anglesArr = new Float32Array(count);
    const randomFactorsArr = new Float32Array(count);
    
    // Generate expanded positions (scattered outward for scroll effect)
    const expandedPositionsArr = new Float32Array(count * 3);
    
    // Generate random colors for expanded state (colorful dots like morpho)
    const expandedColorsArr = new Float32Array(count * 3);
    const colorPalette = [
      { h: 0.55, s: 0.9, l: 0.6 },   // Cyan
      { h: 0.33, s: 0.8, l: 0.5 },   // Green
      { h: 0.08, s: 0.9, l: 0.55 },  // Orange
      { h: 0.6, s: 0.7, l: 0.6 },    // Blue
      { h: 0.0, s: 0.8, l: 0.55 },   // Red
      { h: 0.14, s: 0.9, l: 0.55 },  // Yellow
      { h: 0.8, s: 0.6, l: 0.6 },    // Purple
      { h: 0, s: 0, l: 0.9 },        // White
    ];

    for (let i = 0; i < count; i++) {
      anglesArr[i] = Math.random() * Math.PI * 2;
      randomFactorsArr[i] = 0.5 + Math.random() * 0.5;
      
      // Calculate expanded position (spread outward radially)
      const ox = flat[i * 3];
      const oy = flat[i * 3 + 1];
      const oz = flat[i * 3 + 2];
      
      // Normalize and expand
      const len = Math.sqrt(ox * ox + oy * oy + oz * oz);
      const expandFactor = 3 + Math.random() * 4; // 3x to 7x expansion
      
      if (len > 0.001) {
        expandedPositionsArr[i * 3] = (ox / len) * len * expandFactor + (Math.random() - 0.5) * 2;
        expandedPositionsArr[i * 3 + 1] = (oy / len) * len * expandFactor + (Math.random() - 0.5) * 2;
        expandedPositionsArr[i * 3 + 2] = (oz / len) * len * expandFactor + (Math.random() - 0.5) * 1;
      } else {
        expandedPositionsArr[i * 3] = ox;
        expandedPositionsArr[i * 3 + 1] = oy;
        expandedPositionsArr[i * 3 + 2] = oz;
      }
      
      // Assign colors - mostly white/cyan, some colorful accents
      const isAccent = Math.random() < 0.08; // 8% are colorful
      const colorIdx = isAccent 
        ? Math.floor(Math.random() * (colorPalette.length - 1)) 
        : (Math.random() < 0.3 ? colorPalette.length - 1 : 0); // 30% white, 70% cyan
      
      const col = colorPalette[colorIdx];
      const color = new THREE.Color().setHSL(col.h, col.s, col.l);
      expandedColorsArr[i * 3] = color.r;
      expandedColorsArr[i * 3 + 1] = color.g;
      expandedColorsArr[i * 3 + 2] = color.b;
    }

    return {
      positions: positionsArr,
      originalPositions: originalPositionsArr,
      expandedPositions: expandedPositionsArr,
      expandedColors: expandedColorsArr,
      velocities: velocitiesArr,
      angles: anglesArr,
      randomFactors: randomFactorsArr,
      particleCount: count,
      radius: r,
    };
  }, [scene]);

  // Animation frame
  useFrame((state, dt) => {
    const points = pointsRef.current;
    const hitSphere = hitSphereRef.current;
    const group = groupRef.current;
    if (!points || !hitSphere || !group) return;

    const t = state.clock.elapsedTime;
    const geometry = points.geometry;
    const positionAttribute = geometry.attributes.position as THREE.BufferAttribute;
    const colorAttribute = geometry.attributes.color as THREE.BufferAttribute;

    // Smooth the scroll progress
    const scrollLerp = 1 - Math.exp(-dt * 10);
    smoothScroll.current += (scrollProgress - smoothScroll.current) * scrollLerp;
    const scroll = smoothScroll.current;

    // Interpolate between original and expanded based on scroll
    const scrollT = Math.min(1, scroll * 2); // Full expansion at 50% scroll
    
    // Frame-rate independent smoothing (mouse)
    const mouseLerp = 1 - Math.exp(-dt * 28);
    mouseLocal.current.lerp(targetMouseLocal.current, mouseLerp);

    // Smoothly increase radius when hovering
    const targetRadius = isHovering.current ? interactionRadius * 1.8 : interactionRadius;
    const radiusLerp = 1 - Math.exp(-dt * 8);
    currentRadius.current += (targetRadius - currentRadius.current) * radiusLerp;

    const effInteractionRadius = Math.max(0.0001, currentRadius.current * radius);
    const effDisplacement = displacement * radius;

    // Colors
    const bc = new THREE.Color().setHSL(0.55, 0.9, 0.6);
    const hc = new THREE.Color().setHSL(0.77, 0.7, 0.6);
    const baseR = bc.r, baseG = bc.g, baseB = bc.b;
    const hoverR = hc.r, hoverG = hc.g, hoverB = hc.b;

    // "Sand" motion physics (exactly like Threejs version)
    const force = effDisplacement * 3.2;
    const friction = Math.exp(-dt * 18);
    const settle = Math.exp(-dt * 6);
    const maxSpeed = effDisplacement * 0.9;

    const posArr = positionAttribute.array as Float32Array;
    const colArr = colorAttribute.array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      const ox = originalPositions[i3];
      const oy = originalPositions[i3 + 1];
      const oz = originalPositions[i3 + 2];

      const ex = expandedPositions[i3];
      const ey = expandedPositions[i3 + 1];
      const ez = expandedPositions[i3 + 2];

      // Current base position based on scroll
      const baseX = ox + (ex - ox) * scrollT;
      const baseY = oy + (ey - oy) * scrollT;
      const baseZ = oz + (ez - oz) * scrollT;

      const px = posArr[i3];
      const py = posArr[i3 + 1];
      const pz = posArr[i3 + 2];

      const dx = px - mouseLocal.current.x;
      const dy = py - mouseLocal.current.y;
      const dz = pz - mouseLocal.current.z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      const influence = 1 - dist / effInteractionRadius;
      const s = smoothstep01(influence);

      let fx = 0, fy = 0, fz = 0;

      // Only apply hover forces if not scrolling
      const hoverEnabled = scrollT < 0.05;
      
      if (hoverEnabled && dist > 0.0001 && s > 0) {
        const inv = 1 / dist;
        const dirX = dx * inv;
        const dirY = dy * inv;
        const dirZ = dz * inv

        // Repel away from cursor (short-range)
        const repel = force * s * randomFactors[i];
        fx += dirX * repel;
        fy += dirY * repel;
        fz += dirZ * repel;

        // Tangential drift (gives "sand flow" feel)
        const angle = angles[i];
        const wobble = Math.sin(t * 1.2 + angle) * 0.35;
        const tanX = -dirY;
        const tanY = dirX;
        const tanZ = dirZ * 0.2;
        const tanLen = Math.sqrt(tanX * tanX + tanY * tanY + tanZ * tanZ) || 1;
        const tx = tanX / tanLen;
        const ty = tanY / tanLen;
        const tz = tanZ / tanLen;

        const drift = force * 0.22 * s * randomFactors[i] * wobble;
        fx += tx * drift;
        fy += ty * drift;
        fz += tz * drift;
      }

      // Integrate velocity (overdamped)
      velocities[i3] = (velocities[i3] + fx * dt) * friction;
      velocities[i3 + 1] = (velocities[i3 + 1] + fy * dt) * friction;
      velocities[i3 + 2] = (velocities[i3 + 2] + fz * dt) * friction;

      // Clamp speed
      const vx = velocities[i3];
      const vy = velocities[i3 + 1];
      const vz = velocities[i3 + 2];
      const vLen = Math.sqrt(vx * vx + vy * vy + vz * vz);
      if (vLen > maxSpeed) {
        const k = maxSpeed / vLen;
        velocities[i3] *= k;
        velocities[i3 + 1] *= k;
        velocities[i3 + 2] *= k;
      }

      // Apply velocity
      posArr[i3] = px + velocities[i3];
      posArr[i3 + 1] = py + velocities[i3 + 1];
      posArr[i3 + 2] = pz + velocities[i3 + 2];

      // Slow settling back to base position
      posArr[i3] = baseX + (posArr[i3] - baseX) * settle;
      posArr[i3 + 1] = baseY + (posArr[i3 + 1] - baseY) * settle;
      posArr[i3 + 2] = baseZ + (posArr[i3 + 2] - baseZ) * settle;

      // Color interpolation: base/hover -> expanded colors
      const hoverInfluence = hoverEnabled ? s : 0;
      const currentBaseColor = new THREE.Color(baseR, baseG, baseB).lerp(new THREE.Color(hoverR, hoverG, hoverB), hoverInfluence);
      const expColor = new THREE.Color(expandedColors[i3], expandedColors[i3 + 1], expandedColors[i3 + 2]);
      const finalColor = currentBaseColor.lerp(expColor, scrollT);
      
      colArr[i3] = finalColor.r;
      colArr[i3 + 1] = finalColor.g;
      colArr[i3 + 2] = finalColor.b;
    }

    positionAttribute.needsUpdate = true;
    colorAttribute.needsUpdate = true;
    
    // Slow rotation (slower when expanded)
    const rotationSpeed = 0.03 * (1 - scroll * 0.5);
    groupRef.current.rotation.y = t * rotationSpeed;

    // Scale hit sphere based on expansion
    hitSphereRef.current.scale.setScalar(1 + scroll * 4);
  });
  
  // Initialize colors
  const colors = useMemo(() => {
    const out = new Float32Array(particleCount * 3);
    const color = new THREE.Color().setHSL(0.55, 0.9, 0.6);
    for (let i = 0; i < particleCount; i++) {
      out[i * 3] = color.r;
      out[i * 3 + 1] = color.g;
      out[i * 3 + 2] = color.b;
    }
    return out;
  }, [particleCount]);
  
  // Dynamic particle size based on scroll
  const particleSize = 0.015 + scrollProgress * 0.02;
  
  return (
    <group ref={groupRef}>
      {/* Invisible hit surface for pointer events (Matches Threejs version exactly) */}
      <mesh
        ref={hitSphereRef}
        onPointerMove={(e) => {
          // Disable hover detection when scrolled down
          if (scrollProgress > 0.05) {
            isHovering.current = false;
            targetMouseLocal.current.set(9999, 9999, 9999);
            return;
          }
          
          if (!groupRef.current) return;
          const p = e.point.clone();
          groupRef.current.worldToLocal(p);
          targetMouseLocal.current.copy(p);
          // Snap immediately on actual pointer events to remove the "detection delay"
          mouseLocal.current.copy(p);
          isHovering.current = true;
        }}
        onPointerOut={() => {
          targetMouseLocal.current.set(9999, 9999, 9999);
          isHovering.current = false;
        }}
      >
        <sphereGeometry args={[radius, 64, 64]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      <points ref={pointsRef} raycast={() => null}> 
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleCount}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={particleSize}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

useGLTF.preload(import.meta.env.VITE_MODEL_URL || '/models/morph-sphere.glb');
