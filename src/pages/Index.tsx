import Scene from '@/components/Scene';

const Index = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {/* 3D Particle Scene */}
      <Scene />
      
      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight mb-4 text-center">
          Particle Displacement
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl text-center max-w-md px-4">
          Move your cursor over the particles
        </p>
      </div>
      
      {/* Stats overlay */}
      <div className="absolute bottom-6 left-6 text-muted-foreground text-sm z-10">
        <div className="flex gap-8">
          <div>
            <p className="text-xs uppercase tracking-wider opacity-60">Source</p>
            <p className="text-foreground font-mono text-lg">GLB Model</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider opacity-60">Interaction</p>
            <p className="text-foreground font-mono text-lg">Real-time</p>
          </div>
        </div>
      </div>
      
      {/* Instruction */}
      <div className="absolute bottom-6 right-6 text-muted-foreground text-sm z-10">
        <p className="text-xs uppercase tracking-wider">Hover to interact</p>
      </div>
    </div>
  );
};

export default Index;
