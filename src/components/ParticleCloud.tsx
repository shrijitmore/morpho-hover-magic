import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
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
  particleCount?: number;
  radius?: number;
  interactionRadius?: number;
  displacement?: number;
}

export default function ParticleCloud({
  particleCount = 25000,
  radius = 1.5,
  interactionRadius = 0.5,
  displacement = 0.4,
}: ParticleCloudProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const hitSphereRef = useRef<THREE.Mesh>(null);
  const { camera, gl } = useThree();
  
  // Mouse state
  const mouse = useRef(new THREE.Vector2(9999, 9999));
  const mouseWorld = useRef(new THREE.Vector3(9999, 9999, 9999));
  const targetMouse = useRef(new THREE.Vector3(9999, 9999, 9999));
  const raycaster = useRef(new THREE.Raycaster());
  
  // Generate initial particle positions on a sphere surface
  const { positions, originalPositions, velocities, angles, randomFactors } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const angles = new Float32Array(particleCount);
    const randomFactors = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      // Fibonacci sphere for even distribution
      const phi = Math.acos(1 - 2 * (i + 0.5) / particleCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
      
      // Add slight random variation for more organic look
      const r = radius * (0.9 + Math.random() * 0.2);
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;
      
      velocities[i * 3] = 0;
      velocities[i * 3 + 1] = 0;
      velocities[i * 3 + 2] = 0;
      
      angles[i] = Math.random() * Math.PI * 2;
      randomFactors[i] = 0.5 + Math.random() * 0.5;
    }
    
    return { positions, originalPositions, velocities, angles, randomFactors };
  }, [particleCount, radius]);
  
  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };
    
    const handleMouseLeave = () => {
      mouse.current.set(9999, 9999);
      targetMouse.current.set(9999, 9999, 9999);
    };
    
    gl.domElement.addEventListener('mousemove', handleMouseMove);
    gl.domElement.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      gl.domElement.removeEventListener('mousemove', handleMouseMove);
      gl.domElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [gl]);
  
  // Animation frame
  useFrame((state) => {
    if (!pointsRef.current || !hitSphereRef.current) return;
    
    const time = state.clock.elapsedTime;
    const geometry = pointsRef.current.geometry;
    const positionAttribute = geometry.attributes.position as THREE.BufferAttribute;
    const colorAttribute = geometry.attributes.color as THREE.BufferAttribute;
    
    // Raycast to find mouse position on sphere
    raycaster.current.setFromCamera(mouse.current, camera);
    const intersects = raycaster.current.intersectObject(hitSphereRef.current);
    
    if (intersects.length > 0) {
      targetMouse.current.copy(intersects[0].point);
    } else {
      // Move target far away when not intersecting
      targetMouse.current.lerp(new THREE.Vector3(9999, 9999, 9999), 0.1);
    }
    
    // Smooth mouse interpolation
    mouseWorld.current.lerp(targetMouse.current, 0.15);
    
    // Update each particle
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      const ox = originalPositions[i3];
      const oy = originalPositions[i3 + 1];
      const oz = originalPositions[i3 + 2];
      
      let px = positionAttribute.array[i3] as number;
      let py = positionAttribute.array[i3 + 1] as number;
      let pz = positionAttribute.array[i3 + 2] as number;
      
      // Distance from mouse
      const dx = px - mouseWorld.current.x;
      const dy = py - mouseWorld.current.y;
      const dz = pz - mouseWorld.current.z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      
      // Influence based on distance with smooth falloff
      const influence = Math.max(0, 1 - dist / interactionRadius);
      const smoothInfluence = influence * influence * (3 - 2 * influence); // Smoothstep
      
      // Calculate displacement direction (away from mouse)
      let dispX = 0, dispY = 0, dispZ = 0;
      
      if (dist > 0.001) {
        const dirX = dx / dist;
        const dirY = dy / dist;
        const dirZ = dz / dist;
        
        // Radial displacement (outward from mouse)
        const radialStrength = displacement * smoothInfluence * randomFactors[i];
        dispX = dirX * radialStrength;
        dispY = dirY * radialStrength;
        dispZ = dirZ * radialStrength;
        
        // Add noise-based tangential movement for organic feel
        const angle = angles[i];
        const noiseVal = noise3D(ox * 2, oy * 2, time * 0.5);
        const tangentX = -dirY * Math.cos(angle + noiseVal) + dirZ * Math.sin(angle);
        const tangentY = dirX * Math.cos(angle + noiseVal) - dirZ * Math.cos(angle);
        const tangentZ = -dirX * Math.sin(angle) + dirY * Math.cos(angle);
        
        const tangentStrength = displacement * 0.3 * smoothInfluence * randomFactors[i];
        dispX += tangentX * tangentStrength;
        dispY += tangentY * tangentStrength;
        dispZ += tangentZ * tangentStrength;
      }
      
      // Target position (original + displacement)
      const targetX = ox + dispX;
      const targetY = oy + dispY;
      const targetZ = oz + dispZ;
      
      // Velocity-based smooth animation with damping
      const stiffness = 0.08;
      const damping = 0.85;
      
      velocities[i3] = (velocities[i3] + (targetX - px) * stiffness) * damping;
      velocities[i3 + 1] = (velocities[i3 + 1] + (targetY - py) * stiffness) * damping;
      velocities[i3 + 2] = (velocities[i3 + 2] + (targetZ - pz) * stiffness) * damping;
      
      // Update position
      (positionAttribute.array as Float32Array)[i3] = px + velocities[i3];
      (positionAttribute.array as Float32Array)[i3 + 1] = py + velocities[i3 + 1];
      (positionAttribute.array as Float32Array)[i3 + 2] = pz + velocities[i3 + 2];
      
      // Update color based on influence
      const baseColor = new THREE.Color().setHSL(0.55, 0.9, 0.6); // Cyan
      const hoverColor = new THREE.Color().setHSL(0.8, 0.7, 0.6); // Purple
      const color = baseColor.clone().lerp(hoverColor, smoothInfluence);
      
      (colorAttribute.array as Float32Array)[i3] = color.r;
      (colorAttribute.array as Float32Array)[i3 + 1] = color.g;
      (colorAttribute.array as Float32Array)[i3 + 2] = color.b;
    }
    
    positionAttribute.needsUpdate = true;
    colorAttribute.needsUpdate = true;
    
    // Slow rotation
    pointsRef.current.rotation.y = time * 0.03;
    hitSphereRef.current.rotation.y = time * 0.03;
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
  
  return (
    <>
      {/* Hidden sphere for raycasting */}
      <mesh ref={hitSphereRef} visible={false}>
        <sphereGeometry args={[radius * 1.2, 32, 32]} />
        <meshBasicMaterial />
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
          size={0.015}
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
