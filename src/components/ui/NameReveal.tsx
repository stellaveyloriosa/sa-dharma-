import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

interface NameRevealProps {
  name: string;
  isMobile: boolean;
}

export const NameReveal: React.FC<NameRevealProps> = ({ name, isMobile }) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const letterSpans = container.querySelectorAll('.letter-span');
    if (!letterSpans.length) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(letterSpans, { opacity: 1, rotateX: 0, rotateY: 0, z: 0, y: 0 });
      return;
    }

    const tl = gsap.timeline({ delay: 0.3 });
    tl.to(letterSpans, {
      opacity: 1,
      rotateX: 0,
      rotateY: 0,
      z: 0,
      y: 0,
      duration: 0.9,
      ease: 'back.out(1.4)',
      stagger: {
        each: isMobile ? 0.018 : 0.035,
        from: 'start',
      },
      transformOrigin: '50% 50% -60px',
      onStart: () => {
        letterSpans.forEach((span) => {
          (span as HTMLElement).style.willChange = 'transform, opacity';
        });
      },
      onComplete: () => {
        letterSpans.forEach((span) => {
          (span as HTMLElement).style.willChange = 'auto';
        });
      },
    });

    return () => {
      tl.kill();
    };
  }, [isMobile]);

  // Words split for proper responsive wrapping
  const words = name.split(' ');

  return (
    <h1
      ref={containerRef}
      className="font-serif font-bold text-[#0a0a0a] tracking-tight leading-none"
      style={{
        fontFamily: 'Playfair Display, Georgia, serif',
        fontSize: isMobile ? 'clamp(1.6rem, 8.5vw, 2.8rem)' : 'clamp(2.2rem, 5.2vw, 5.6rem)',
        letterSpacing: '-0.02em',
        WebkitTextStroke: '1px rgba(10,10,10,0.12)',
        perspective: '1000px',
      }}
    >
      {words.map((word, wIdx) => (
        <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.28em] last:mr-0 mb-1">
          {word.split('').map((char, cIdx) => (
            <motion.span
              key={cIdx}
              className="letter-span inline-block cursor-default select-none"
              style={{
                opacity: 0,
                transform:
                  'perspective(1000px) rotateX(-80deg) rotateY(20deg) translateZ(-120px) translateY(40px)',
                display: 'inline-block',
                transformStyle: 'preserve-3d',
              }}
              whileHover={{
                rotateY: 18,
                z: 40,
                color: '#7c3aed',
                textShadow: '0 0 30px rgba(124,58,237,0.3)',
                transition: { type: 'spring', stiffness: 400, damping: 20 },
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </h1>
  );
};
