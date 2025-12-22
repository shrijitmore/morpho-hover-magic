import { useState, useEffect, useRef } from 'react';
import Scene from '@/components/Scene';
import Header from '@/components/Header';
import HeroContent from '@/components/HeroContent';
import ScrollSections from '@/components/ScrollSections';

const Index = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollTop = containerRef.current.scrollTop;
      const windowHeight = window.innerHeight;
      // Progress from 0 to 1 over the first viewport height
      const progress = Math.min(1, scrollTop / windowHeight);
      setScrollProgress(progress);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-y-auto overflow-x-hidden bg-background scroll-smooth"
    >
      {/* Fixed 3D Scene */}
      <Scene scrollProgress={scrollProgress} />

      {/* Fixed Header */}
      <Header />

      {/* Hero Content (fades out on scroll) */}
      <HeroContent scrollProgress={scrollProgress} />

      {/* Scrollable Content Sections */}
      <ScrollSections scrollProgress={scrollProgress} />
    </div>
  );
};

export default Index;
