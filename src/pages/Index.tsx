import { useState, useEffect } from 'react';
import Scene from '@/components/Scene';
import Header from '@/components/Header';
import HeroContent from '@/components/HeroContent';
import ScrollSections from '@/components/ScrollSections';
import FloatingLogos from '@/components/FloatingLogos';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

    // Section snapping implementation
    const sections = gsap.utils.toArray('.snap-section');
    
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      snap: {
        snapTo: 1 / (sections.length + 0.5),
        duration: { min: 0.5, max: 1.2 },
        delay: 0.1,
        ease: 'power3.inOut'
      }
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // Calculate background fade based on scroll
  const bgOpacity = Math.min(1, scrollProgress * 2);

  return (
    <div className="relative w-full min-h-screen bg-background overflow-x-hidden">
      {/* Scroll-based background fade overlay */}
      <div 
        className="fixed inset-0 bg-gradient-to-b from-background via-background to-black pointer-events-none z-0 transition-opacity duration-300"
        style={{ opacity: bgOpacity }}
      />

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
