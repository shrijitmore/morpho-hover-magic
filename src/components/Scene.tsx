import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ParticleCloud from './ParticleCloud';

export default function Scene() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['hsl(220, 20%, 4%)']} />
        
        {/* Subtle ambient lighting */}
        <ambientLight intensity={0.2} />
        
        {/* Main particle cloud */}
        <ParticleCloud
          particleCount={20000}
          radius={1.3}
          interactionRadius={0.6}
          displacement={0.35}
        />
        
        {/* Disabled orbit controls - enable for debugging */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
      </Canvas>
    </div>
  );
}
