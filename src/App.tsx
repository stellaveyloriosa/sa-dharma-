import React, { useState, useEffect } from 'react';
import { useLenis } from './hooks/useLenis';
import { useBreakpoint } from './hooks/useBreakpoint';
import { HeroCanvas } from './components/canvas/HeroCanvas';
import Grainient from './components/ui/Grainient';
import GlobalRippleEffect from './components/ui/GlobalRippleEffect';
import SectionFadeIn from './components/ui/SectionFadeIn';
import SectionSeparator from './components/ui/SectionSeparator';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Research } from './components/sections/Research';
import { Publications } from './components/sections/Publications';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { Contact } from './components/sections/Contact';

export default function App() {
  // Initialize smooth scroll with Lenis + GSAP ScrollTrigger
  useLenis();
  const { isMobile } = useBreakpoint();
  const [activeSection, setActiveSection] = useState('hero');

  // Track active section for navigation underline & setup interactive UI ripples
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ['hero', 'about', 'research', 'publications', 'projects', 'skills', 'contact'];
      const scrollY = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (top <= scrollY) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    // Attach interactive fluid ripples on UI cards, pills & buttons
    const handleElementClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        '.frosted-glass-card, .frosted-glass-pill, button, .ripple-interactive'
      ) as HTMLElement | null;
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple-element-wave';
      const size = Math.max(rect.width, rect.height) * 1.5;
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left}px`;
      ripple.style.top = `${e.clientY - rect.top}px`;

      target.appendChild(ripple);
      setTimeout(() => {
        ripple.remove();
      }, 750);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('pointerdown', handleElementClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('pointerdown', handleElementClick);
    };
  }, []);

  const handleNavigate = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#f8faff] via-[#f4f2ff]/70 to-[#f0f4ff] text-slate-900 selection:bg-[#ddd6fe] selection:text-[#7c3aed] font-sans">
      {/* Biomedical Ethereal Radial Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[650px] h-[650px] rounded-full bg-gradient-to-br from-indigo-200/40 via-purple-200/25 to-transparent blur-3xl" />
        <div className="absolute top-[35%] -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-blue-200/35 via-indigo-100/20 to-transparent blur-3xl" />
        <div className="absolute bottom-10 right-0 w-[700px] h-[700px] rounded-full bg-gradient-to-tl from-purple-200/30 via-sky-100/25 to-transparent blur-3xl" />
      </div>

      {/* Background Fluid Grainient Mesh from React Bits */}
      <div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        style={{ opacity: 0.88 }}
      >
        <Grainient
          color1="#e0f2fe" // soft biomedical sky
          color2="#ede9fe" // lavender
          color3="#f5f3ff" // ethereal violet white
          lightMode={true}
          timeSpeed={0.2}
          colorBalance={-0.12}
          warpStrength={0.75}
          warpFrequency={4.5}
          warpSpeed={1.8}
          warpAmplitude={22}
          blendAngle={160}
          blendSoftness={0.65}
          rotationAmount={700}
          noiseScale={1.5}
          grainAmount={0.06}
          grainScale={1.8}
          grainAnimated={true}
          contrast={1.15}
          gamma={1.05}
          saturation={0.9}
          centerX={0.05}
          centerY={-0.05}
          zoom={0.95}
        />
      </div>

      {/* Full-website delicate minimal water ripple distortion & caustics layer */}
      <GlobalRippleEffect
        brushSize={130}
        strength={0.06}
        rings={2.5}
        spread={3.2}
        fade={3.0}
        spacing={22}
        tint="#6366f1"
        tintAmount={0.22}
        highlightColor="#ffffff"
        clickStrength={1.0}
        enabled={true}
      />

      {/* Floating 3D particles & orbital lines Canvas */}
      <HeroCanvas isMobile={isMobile} />

      {/* Floating glass navbar */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main Content Sections with Scroll-Triggered Fade-In-Up & Liquid-Glass Separators */}
      <main className="relative z-10">
        <Hero isMobile={isMobile} onExploreClick={() => handleNavigate('research')} />

        <SectionSeparator />

        <SectionFadeIn>
          <About isMobile={isMobile} />
        </SectionFadeIn>

        <SectionSeparator />

        <SectionFadeIn>
          <Research isMobile={isMobile} />
        </SectionFadeIn>

        <SectionSeparator />

        <SectionFadeIn>
          <Publications isMobile={isMobile} />
        </SectionFadeIn>

        <SectionSeparator />

        <SectionFadeIn>
          <Projects isMobile={isMobile} />
        </SectionFadeIn>

        <SectionSeparator />

        <SectionFadeIn>
          <Skills isMobile={isMobile} />
        </SectionFadeIn>

        <SectionSeparator />

        <SectionFadeIn>
          <Contact isMobile={isMobile} />
        </SectionFadeIn>
      </main>

      {/* Minimal clean footer */}
      <Footer />
    </div>
  );
}
