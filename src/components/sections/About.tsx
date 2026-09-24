import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Compass, Sparkles } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { ScrollReveal } from '../ui/ScrollReveal';
import RippleDistortion from '../ui/RippleDistortion';
import GlassSurface from '../ui/GlassSurface';
import { PORTFOLIO_DATA } from '../../data/portfolio';
import { ASSETS } from '../../data/assets';

interface AboutProps {
  isMobile: boolean;
}

export const About: React.FC<AboutProps> = ({ isMobile }) => {
  const { personal } = PORTFOLIO_DATA;

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <div className="liquid-glass rounded-3xl sm:rounded-[36px] p-6 sm:p-10 lg:p-12 relative overflow-hidden">
        <SectionHeading title="About Me" subtitle="Biography & Academic Background" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: Glass Frame with Researcher Visual & Floating Pills */}
        <div className="lg:col-span-5 flex justify-center">
          <ScrollReveal direction={isMobile ? 'up' : 'left'} isMobile={isMobile}>
            <div className="relative">
              {/* Outer decorative glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400/20 via-indigo-400/20 to-purple-400/20 rounded-3xl blur-2xl -z-10" />

              <GlassSurface
                width="100%"
                height="auto"
                borderRadius={24}
                backgroundOpacity={0.65}
                distortionScale={-120}
                displace={4}
                className="border border-white/80 shadow-xl max-w-sm"
                contentClassName="p-4 sm:p-5 flex flex-col w-full h-full"
              >
                <div className="w-full aspect-square rounded-2xl overflow-hidden relative mb-4 cursor-pointer">
                  <RippleDistortion
                    src={ASSETS.portrait}
                    brushSize={140}
                    strength={0.06}
                    swirl={0.4}
                    rings={2.5}
                    spread={3.2}
                    fade={3.0}
                    spacing={18}
                    dispersion={0.01}
                    glint={0.1}
                    tint="#8b5cf6"
                    tintAmount={0.08}
                    highlightColor="#ffffff"
                    grayscale={false}
                    trigger="both"
                    clickStrength={1.0}
                    quality="medium"
                    enabled
                    className="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end p-4 pointer-events-none">
                    <span className="text-white text-xs font-medium tracking-wide">
                      IIT Bombay & Ashoka Researcher
                    </span>
                  </div>
                </div>

                {/* Floating summary badge */}
                <div className="flex items-center gap-3 p-3 bg-white/80 rounded-xl border border-slate-100 shadow-xs">
                  <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-800">Minor in AI & Machine Learning</div>
                    <div className="text-[11px] text-slate-500">Formally Conferred Distinction</div>
                  </div>
                </div>
              </GlassSurface>
            </div>
          </ScrollReveal>
        </div>

        {/* Right: Detailed Bio & Interactive Stats Grid */}
        <div className="lg:col-span-7 space-y-6">
          <ScrollReveal delay={0.1} isMobile={isMobile}>
            <div className="liquid-glass-subtle rounded-2xl p-5 sm:p-6 shadow-xs">
              <p className="text-[15.5px] sm:text-[16.5px] text-slate-700 font-sans font-light leading-relaxed">
                {personal.summary}
              </p>
            </div>
          </ScrollReveal>

          {/* 4 Stats Cards */}
          <ScrollReveal delay={0.2} isMobile={isMobile}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {personal.stats.map((st, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -3 }}
                  className="cursor-pointer"
                >
                  <GlassSurface
                    width="100%"
                    height="auto"
                    borderRadius={16}
                    backgroundOpacity={0.65}
                    distortionScale={-90}
                    displace={3}
                    className="border border-white/80 shadow-xs text-center"
                    contentClassName="p-4 sm:p-5 flex flex-col items-center justify-center w-full"
                  >
                    <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      {st.number}
                    </div>
                    <div className="text-xs font-semibold text-slate-500 mt-1">
                      {st.label}
                    </div>
                  </GlassSurface>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          {/* Education Highlight Card with CGPA Accent */}
          <ScrollReveal delay={0.3} isMobile={isMobile}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              <GlassSurface
                width="100%"
                height="auto"
                borderRadius={20}
                backgroundOpacity={0.7}
                distortionScale={-100}
                displace={3}
                className="border-l-4 border-indigo-600 border border-white/90 shadow-md"
                contentClassName="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full"
              >
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 shadow-[0_0_12px_rgba(99,102,241,0.2)] shrink-0 mt-0.5">
                    <GraduationCap className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">
                      {personal.education.degree}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {personal.education.institution} · {personal.education.period}
                    </p>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full text-xs font-mono font-bold shadow-sm self-start sm:self-auto">
                  CGPA {personal.education.cgpa}
                </div>
              </GlassSurface>
            </motion.div>
          </ScrollReveal>

          {/* Research Vision Quote */}
          <ScrollReveal delay={0.4} isMobile={isMobile}>
            <div className="liquid-glass-subtle p-4 sm:p-5 rounded-2xl border border-indigo-100/70 flex items-center gap-3.5 shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-indigo-50/80 flex items-center justify-center text-indigo-600 shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <p className="text-xs sm:text-[13.5px] text-slate-700 italic leading-relaxed">
                "Committed to building interpretable, biologically-grounded computational frameworks that recover biological structure from high-dimensional molecular data."
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
      </div>
    </section>
  );
};
