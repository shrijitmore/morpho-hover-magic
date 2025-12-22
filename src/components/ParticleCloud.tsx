import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Simplex noise implementation for smooth organic movement
const NOISE_SEED = Math.random() * 1000;

function noise3D(x: number, y: number, z: number): number {
  const X = Math.floor(x) & 255;
  const Y = Math.floor(y) & 255;
  const Z = Math.floor(z) & 255;
  
  x -= Math.floor(x);
  y -= Math.floor(y);
  z -= Math.floor(z);
  
  const u = x * x * (3 - 2 * x);
  const v = y * y * (3 - 2 * y);
  const w = z * z * (3 - 2 * z);
  
  const A = (X + Y * 57 + Z * 131 + NOISE_SEED) * 15731;
  const B = ((X + 1) + Y * 57 + Z * 131 + NOISE_SEED) * 15731;
  const C = (X + (Y + 1) * 57 + Z * 131 + NOISE_SEED) * 15731;
  const D = ((X + 1) + (Y + 1) * 57 + Z * 131 + NOISE_SEED) * 15731;
  const E = (X + Y * 57 + (Z + 1) * 131 + NOISE_SEED) * 15731;
  const F = ((X + 1) + Y * 57 + (Z + 1) * 131 + NOISE_SEED) * 15731;
  const G = (X + (Y + 1) * 57 + (Z + 1) * 131 + NOISE_SEED) * 15731;
  const H = ((X + 1) + (Y + 1) * 57 + (Z + 1) * 131 + NOISE_SEED) * 15731;
  
  const hash = (n: number) => {
    const h = Math.sin(n) * 43758.5453;
    return h - Math.floor(h);
  };
  
  const lerp = (a: number, b: number, t: number) => a + t * (b - a);
  
  return lerp(
    lerp(
      lerp(hash(A), hash(B), u),
      lerp(hash(C), hash(D), u),
      v
    ),
    lerp(
      lerp(hash(E), hash(F), u),
      lerp(hash(G), hash(H), u),
      v
    ),
    w
  ) * 2 - 1;
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
  modelPath = '/models/morph-sphere.glb',
  scrollProgress = 0,
}: ParticleCloudProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const hitSphereRef = useRef<THREE.Mesh>(null);

  // Load the GLB model
  const { scene } = useGLTF(modelPath);

  // Mouse state (in world space of the particle group)
  const mouseWorld = useRef(new THREE.Vector3(9999, 9999, 9999));
  const targetMouse = useRef(new THREE.Vector3(9999, 9999, 9999));
  
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
    boundingSphereRadius,
  } = useMemo(() => {
    const allVertices: THREE.Vector3[] = [];

    // Traverse scene and extract all vertex positions
    scene.updateMatrixWorld(true);
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.geometry) {
        const positionAttr = child.geometry.attributes.position;
        if (!positionAttr) return;

        child.updateMatrixWorld(true);
        const matrix = child.matrixWorld;

        for (let i = 0; i < positionAttr.count; i++) {
          const v = new THREE.Vector3(
            positionAttr.getX(i),
            positionAttr.getY(i),
            positionAttr.getZ(i)
          ).applyMatrix4(matrix);
          allVertices.push(v);
        }
      }
    });

    const particleCount = allVertices.length;

    // Compute centroid and recenter so the cloud sits at (0,0,0)
    const center = new THREE.Vector3();
    for (const v of allVertices) center.add(v);
    if (particleCount > 0) center.multiplyScalar(1 / particleCount);

    let maxDist = 0;
    const flat = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const v = allVertices[i].clone().sub(center);
      flat[i * 3] = v.x;
      flat[i * 3 + 1] = v.y;
      flat[i * 3 + 2] = v.z;
      maxDist = Math.max(maxDist, v.length());
    }

    const boundingSphereRadius = maxDist * 1.15;

    const positions = new Float32Array(flat);
    const originalPositions = new Float32Array(flat);
    const velocities = new Float32Array(particleCount * 3).fill(0);
    const angles = new Float32Array(particleCount);
    const randomFactors = new Float32Array(particleCount);
    
    // Generate expanded positions (scattered outward for scroll effect)
    const expandedPositions = new Float32Array(particleCount * 3);
    
    // Generate random colors for expanded state (colorful dots like morpho)
    const expandedColors = new Float32Array(particleCount * 3);
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

    for (let i = 0; i < particleCount; i++) {
      angles[i] = Math.random() * Math.PI * 2;
      randomFactors[i] = 0.5 + Math.random() * 0.5;
      
      // Calculate expanded position (spread outward radially)
      const ox = flat[i * 3];
      const oy = flat[i * 3 + 1];
      const oz = flat[i * 3 + 2];
      
      // Normalize and expand
      const len = Math.sqrt(ox * ox + oy * oy + oz * oz);
      const expandFactor = 3 + Math.random() * 4; // 3x to 7x expansion
      
      if (len > 0.001) {
        expandedPositions[i * 3] = (ox / len) * len * expandFactor + (Math.random() - 0.5) * 2;
        expandedPositions[i * 3 + 1] = (oy / len) * len * expandFactor + (Math.random() - 0.5) * 2;
        expandedPositions[i * 3 + 2] = (oz / len) * len * expandFactor + (Math.random() - 0.5) * 1;
      } else {
        expandedPositions[i * 3] = ox;
        expandedPositions[i * 3 + 1] = oy;
        expandedPositions[i * 3 + 2] = oz;
      }
      
      // Assign colors - mostly white/cyan, some colorful accents
      const isAccent = Math.random() < 0.08; // 8% are colorful
      const colorIdx = isAccent 
        ? Math.floor(Math.random() * (colorPalette.length - 1)) 
        : (Math.random() < 0.3 ? colorPalette.length - 1 : 0); // 30% white, 70% cyan
      
      const col = colorPalette[colorIdx];
      const color = new THREE.Color().setHSL(col.h, col.s, col.l);
      expandedColors[i * 3] = color.r;
      expandedColors[i * 3 + 1] = color.g;
      expandedColors[i * 3 + 2] = color.b;
    }

    return {
      positions,
      originalPositions,
      expandedPositions,
      expandedColors,
      velocities,
      angles,
      randomFactors,
      particleCount,
      boundingSphereRadius,
    };
  }, [scene]);
  

  // Smoothed scroll value for animation
  const smoothScroll = useRef(0);
  
  // Animation frame
  useFrame((state) => {
    if (!pointsRef.current || !hitSphereRef.current) return;
    
    const time = state.clock.elapsedTime;
    const geometry = pointsRef.current.geometry;
    const positionAttribute = geometry.attributes.position as THREE.BufferAttribute;
    const colorAttribute = geometry.attributes.color as THREE.BufferAttribute;
    
    // Smooth the scroll progress
    smoothScroll.current += (scrollProgress - smoothScroll.current) * 0.08;
    const scroll = smoothScroll.current;
    
    // Smooth mouse interpolation (only active when not expanded)
    if (scroll < 0.3) {
      mouseWorld.current.lerp(targetMouse.current, 0.18);
    } else {
      mouseWorld.current.lerp(new THREE.Vector3(9999, 9999, 9999), 0.1);
    }
    
    // Update each particle
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      const ox = originalPositions[i3];
      const oy = originalPositions[i3 + 1];
      const oz = originalPositions[i3 + 2];
      
      const ex = expandedPositions[i3];
      const ey = expandedPositions[i3 + 1];
      const ez = expandedPositions[i3 + 2];
      
      // Interpolate between original and expanded based on scroll
      const scrollT = Math.min(1, scroll * 2); // Full expansion at 50% scroll
      const baseX = ox + (ex - ox) * scrollT;
      const baseY = oy + (ey - oy) * scrollT;
      const baseZ = oz + (ez - oz) * scrollT;
      
      let px = positionAttribute.array[i3] as number;
      let py = positionAttribute.array[i3 + 1] as number;
      let pz = positionAttribute.array[i3 + 2] as number;
      
      // Mouse interaction (only when not expanded)
      let dispX = 0, dispY = 0, dispZ = 0;
      
      if (scroll < 0.3) {
        const dx = px - mouseWorld.current.x;
        const dy = py - mouseWorld.current.y;
        const dz = pz - mouseWorld.current.z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        const effInteractionRadius = Math.max(0.0001, interactionRadius * boundingSphereRadius);
        const effDisplacement = displacement * boundingSphereRadius;
        
        const influence = Math.max(0, 1 - dist / effInteractionRadius);
        const smoothInfluence = influence * influence * (3 - 2 * influence);
        
        if (dist > 0.001) {
          const dirX = dx / dist;
          const dirY = dy / dist;
          const dirZ = dz / dist;
          
          const radialStrength = effDisplacement * smoothInfluence * randomFactors[i];
          dispX = dirX * radialStrength;
          dispY = dirY * radialStrength;
          dispZ = dirZ * radialStrength;
          
          const angle = angles[i];
          const noiseVal = noise3D(ox * 2, oy * 2, time * 0.5);
          const tangentX = -dirY * Math.cos(angle + noiseVal) + dirZ * Math.sin(angle);
          const tangentY = dirX * Math.cos(angle + noiseVal) - dirZ * Math.cos(angle);
          const tangentZ = -dirX * Math.sin(angle) + dirY * Math.cos(angle);
          
          const tangentStrength = effDisplacement * 0.3 * smoothInfluence * randomFactors[i];
          dispX += tangentX * tangentStrength;
          dispY += tangentY * tangentStrength;
          dispZ += tangentZ * tangentStrength;
        }
      }
      
      // Target position
      const targetX = baseX + dispX * (1 - scrollT);
      const targetY = baseY + dispY * (1 - scrollT);
      const targetZ = baseZ + dispZ * (1 - scrollT);
      
      // Velocity-based smooth animation
      const stiffness = 0.06;
      const damping = 0.88;
      
      velocities[i3] = (velocities[i3] + (targetX - px) * stiffness) * damping;
      velocities[i3 + 1] = (velocities[i3 + 1] + (targetY - py) * stiffness) * damping;
      velocities[i3 + 2] = (velocities[i3 + 2] + (targetZ - pz) * stiffness) * damping;
      
      (positionAttribute.array as Float32Array)[i3] = px + velocities[i3];
      (positionAttribute.array as Float32Array)[i3 + 1] = py + velocities[i3 + 1];
      (positionAttribute.array as Float32Array)[i3 + 2] = pz + velocities[i3 + 2];
      
      // Interpolate colors: cyan -> colorful expanded colors
      const baseColor = new THREE.Color().setHSL(0.55, 0.9, 0.6);
      const expColor = new THREE.Color(
        expandedColors[i3],
        expandedColors[i3 + 1],
        expandedColors[i3 + 2]
      );
      const finalColor = baseColor.clone().lerp(expColor, scrollT);
      
      (colorAttribute.array as Float32Array)[i3] = finalColor.r;
      (colorAttribute.array as Float32Array)[i3 + 1] = finalColor.g;
      (colorAttribute.array as Float32Array)[i3 + 2] = finalColor.b;
    }
    
    positionAttribute.needsUpdate = true;
    colorAttribute.needsUpdate = true;
    
    // Slow rotation (slower when expanded)
    const rotationSpeed = 0.03 * (1 - scroll * 0.5);
    pointsRef.current.rotation.y = time * rotationSpeed;
    hitSphereRef.current.rotation.y = time * rotationSpeed;
    
    // Scale hit sphere based on expansion
    const sphereScale = 1 + scroll * 4;
    hitSphereRef.current.scale.setScalar(sphereScale);
  });
  
  // Initialize color attribute
  const colors = useMemo(() => {
    const colors = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const color = new THREE.Color().setHSL(0.55, 0.9, 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return colors;
  }, [particleCount]);
  
  // Dynamic particle size based on scroll
  const particleSize = 0.015 + scrollProgress * 0.02;
  
  return (
    <>
      {/* Transparent sphere for pointer events (still raycastable by R3F) */}
      <mesh
        ref={hitSphereRef}
        onPointerMove={(e) => {
          // e.point is in world space; our particles are centered at origin too
          targetMouse.current.copy(e.point);
        }}
        onPointerOut={() => {
          targetMouse.current.set(9999, 9999, 9999);
        }}
      >
        <sphereGeometry args={[boundingSphereRadius, 64, 64]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      
      {/* Particles */}
      <points ref={pointsRef}>
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
    </>
  );
}

// Preload the model
useGLTF.preload('/models/morph-sphere.glb');
