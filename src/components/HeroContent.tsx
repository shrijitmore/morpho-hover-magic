import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface HeroContentProps {
  scrollProgress?: number;
}

export default function HeroContent({ scrollProgress = 0 }: HeroContentProps) {
  const opacity = Math.max(0, 1 - scrollProgress * 3);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none z-10"
      style={{ opacity }}
    >
      {/* Main headline */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tighter mb-6 text-center px-4"
      >
        We build the digital
        <br />
        products of tomorrow
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-muted-foreground text-lg md:text-xl text-center max-w-2xl px-4 mb-12 leading-relaxed"
      >
        Nova Dev is a freelance agency specializing in high-performance
        <br className="hidden md:block" /> web applications and custom mobile experiences.
      </motion.p>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute bottom-12 left-12 flex gap-16"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary mb-2 font-bold">Launched</p>
          <p className="text-foreground font-mono text-2xl md:text-3xl">42+</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary mb-2 font-bold">Satisfaction</p>
          <p className="text-foreground font-mono text-2xl md:text-3xl">100%</p>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-8 right-8 flex items-center gap-2 text-muted-foreground text-sm"
      >
        <span>Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </div>
  );
}
