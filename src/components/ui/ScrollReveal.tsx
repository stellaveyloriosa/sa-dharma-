import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'fade';
  isMobile?: boolean;
}

export function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  isMobile = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  const fromVars = isMobile
    ? {
        up: { opacity: 0, y: 32 },
        left: { opacity: 0, x: -32 },
        right: { opacity: 0, x: 32 },
        fade: { opacity: 0 },
      }[direction]
    : {
        up: { opacity: 0, y: 48, rotateX: 8 },
        left: { opacity: 0, x: -48 },
        right: { opacity: 0, x: 48 },
        fade: { opacity: 0 },
      }[direction];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, y: 0, x: 0, rotateX: 0 });
      return;
    }

    const tween = gsap.fromTo(el, fromVars, {
      opacity: 1,
      y: 0,
      x: 0,
      rotateX: 0,
      duration: 0.9,
      delay,
      ease: 'power3.out',
      onStart: () => {
        el.style.willChange = 'transform, opacity';
      },
      onComplete: () => {
        el.style.willChange = 'auto';
      },
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        end: 'top 40%',
        toggleActions: 'play none none reverse',
      },
    });

    return () => {
      tween.kill();
      if (tween.scrollTrigger) {
        tween.scrollTrigger.kill();
      }
    };
  }, [delay, direction, isMobile]);

  return (
    <div
      ref={ref}
      style={{
        perspective: isMobile ? undefined : 800,
      }}
    >
      {children}
    </div>
  );
}
