import { useState, useEffect, useRef } from 'react';
import Scene from '@/components/Scene';
import Header from '@/components/Header';
import HeroContent from '@/components/HeroContent';
import ScrollSections from '@/components/ScrollSections';
import FloatingLogos from '@/components/FloatingLogos';

const Index = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = Math.min(1, scrollTop / Math.max(1, scrollHeight));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-background">
      {/* Fixed 3D Scene */}
      <Scene scrollProgress={scrollProgress} />

      {/* Fixed Header */}
      <Header />

      {/* Hero Content (fades out on scroll) */}
      <HeroContent scrollProgress={scrollProgress} />

      {/* Floating Logos (appear after expansion) */}
      <FloatingLogos scrollProgress={scrollProgress} />

      {/* Scrollable Content Sections */}
      <ScrollSections scrollProgress={scrollProgress} />
    </div>
  );
};

export default Index;
