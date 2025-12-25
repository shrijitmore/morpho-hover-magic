import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

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
      {/* Background text watermark */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden opacity-[0.03]">
        <span className="text-[20vw] font-display font-bold tracking-tighter whitespace-nowrap select-none">
          ORANGEGLAZZ
        </span>
      </div>

      {/* Main headline */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground tracking-tight mb-6 text-center px-4"
      >
        Building <span className="italic text-gradient">Digital</span>
        <br />
        <span className="italic text-gradient">Solutions</span> That Matter
      </motion.h1>

      {/* Subtitle - positioned bottom left */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute bottom-28 left-6 lg:left-12 max-w-md text-left pointer-events-auto"
      >
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
          We empower businesses with digital solutions that turn complex challenges into real-world outcomes.
        </p>
        <Button 
          className="rounded-full bg-primary/20 border border-primary/30 text-foreground hover:bg-primary/30 px-8 py-6 text-base font-medium"
        >
          Start Your Project
        </Button>
      </motion.div>

      {/* Stats - positioned bottom right */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute bottom-28 right-6 lg:right-12 flex gap-10 lg:gap-16"
      >
        <div className="text-right">
          <p className="text-foreground font-display text-3xl md:text-4xl font-bold">50+</p>
          <p className="text-muted-foreground text-xs uppercase tracking-wider mt-1">Projects<br />Delivered</p>
        </div>
        <div className="text-right">
          <p className="text-foreground font-display text-3xl md:text-4xl font-bold">100%</p>
          <p className="text-muted-foreground text-xs uppercase tracking-wider mt-1">Client<br />Satisfaction</p>
        </div>
        <div className="text-right">
          <p className="text-foreground font-display text-3xl md:text-4xl font-bold">24/7</p>
          <p className="text-muted-foreground text-xs uppercase tracking-wider mt-1">Support<br />Available</p>
        </div>
      </motion.div>
    </div>
  );
}
