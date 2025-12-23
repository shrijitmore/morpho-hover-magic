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
        className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight mb-4 text-center px-4"
      >
        Connect to the universal
        <br />
        lending network
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-muted-foreground text-base md:text-lg text-center max-w-lg px-4 mb-8"
      >
        Access global liquidity at the best possible terms
        <br />
        powered by open infrastructure that serves, not extracts.
      </motion.p>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute bottom-8 left-8 flex gap-12"
      >
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Deposits</p>
          <p className="text-foreground font-mono text-xl md:text-2xl">$9,048,087,077</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Loans</p>
          <p className="text-foreground font-mono text-xl md:text-2xl">$3,247,443,178</p>
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
