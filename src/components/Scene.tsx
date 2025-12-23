import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ParticleCloud from './ParticleCloud';
import Starfield from './Starfield';

interface SceneProps {
  scrollProgress?: number;
}

export default function Scene({ scrollProgress = 0 }: SceneProps) {
  // Camera moves slightly based on scroll
  const cameraZ = 4 + scrollProgress * 2;

  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, cameraZ], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        style={{ pointerEvents: 'auto' }}
      >
        <color attach="background" args={['hsl(220, 20%, 4%)']} />
        
        {/* Ambient starfield background */}
        <Starfield count={3000} radius={20} />
        
        {/* Subtle ambient lighting */}
        <ambientLight intensity={0.2} />
        
        {/* Main particle cloud using GLB model */}
        <ParticleCloud
          modelPath={import.meta.env.VITE_MODEL_URL || '/models/morph-sphere.glb'}
          interactionRadius={0.35}
          displacement={0.25}
          scrollProgress={scrollProgress}
        />
        
        {/* Disabled orbit controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
      </Canvas>
    </div>
  );
}
