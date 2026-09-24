import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Calendar,
  UserCheck,
  Cpu,
  CheckCircle2,
  Bookmark,
} from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { PORTFOLIO_DATA } from '../../data/portfolio';

interface ResearchProps {
  isMobile: boolean;
}

export const Research: React.FC<ResearchProps> = ({ isMobile: _isMobile }) => {
  const { research } = PORTFOLIO_DATA;
  const [currentIdx, setCurrentIdx] = useState(0);

  const currentItem = research[currentIdx];

  const nextSlide = () => {
    setCurrentIdx((prev) => (prev + 1) % research.length);
  };

  const prevSlide = () => {
    setCurrentIdx((prev) => (prev - 1 + research.length) % research.length);
  };

  const pipelineTags: Record<string, string[]> = {
    'iit-bombay': [
      'ParamRudra HPC Cluster',
      'AlphaFold2 Multimer',
      'ProteinMPNN De Novo Redesign',
      'Random Forest Residue Prioritisation',
      '150ns GROMACS MD Simulations',
      'ATP Binding Pocket Docking (30× Affinity)',
    ],
    'ashoka-kcdh': [
      'scKAN (Kolmogorov-Arnold Networks)',
      'Single-Cell RNA-seq (scRNA-seq)',
      'DeepSEM Structural Equation Modelling',
      'scGPT Foundation Model Evaluation',
      'Gene Regulatory Network (GRN) Dynamics',
    ],
    'bdsa-ashoka-yale': [
      'Yale Faculty Co-mentorship',
      'Cardio-Metabolic Genomic Architecture',
      'Sex-Stratified Quantitative Phenotyping',
      'GWAS Trait Association Analysis',
      '1 of 20 Nationally Selected Scholars',
    ],
    'srm-ap': [
      'UV-Vis Spectrophotometric Kinetics',
      'Bacterial Culture Dynamics',
      'Nanoparticle-Membrane Physical Interaction',
      'Dynamical Systems Response Modelling',
    ],
    kamineni: [
      'Multi-Speciality Clinical Rotations',
      'Biomedical Diagnostic Equipment Lifecycle',
      'Hospital Workflow & ICU Telemetry',
      'Clinical Regulatory Validation Exposure',
    ],
  };

  return (
    <section id="research" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <div className="liquid-glass rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 lg:p-12 relative overflow-hidden">
        {/* Header with Title and Mode Switch */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <SectionHeading
              title="Research Journey"
              subtitle="Milestones, Computational Pipelines & Academic Appointments"
            />
          </div>

          {/* Quick Counter Badge with Clean Frosted Liquid Glass */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-slate-700 bg-white/90 px-4 py-2 rounded-full border border-white/90 shadow-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
              <span>Milestone <strong className="text-indigo-600 font-extrabold">{currentIdx + 1}</strong> of {research.length}</span>
            </span>
          </div>
        </div>

        {/* 1. Curved Arc Orbital Scroller Bar - Clean Monochromatic Liquid Glass */}
        <div className="relative mb-10 pb-4 overflow-hidden">
          <div className="w-full flex flex-col items-center">
            {/* Curved Path Guide SVG */}
            <div className="w-full max-w-3xl h-14 relative hidden sm:block">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 600 60" fill="none">
                <path
                  d="M 20 45 Q 300 5 580 45"
                  stroke="rgba(99, 102, 241, 0.20)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              </svg>
            </div>

            {/* 5 Clean Frosted Glass Orbital Milestone Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 w-full max-w-4xl relative z-10 sm:-mt-8">
              {research.map((item, idx) => {
                const isActive = idx === currentIdx;
                const arcOffsetY =
                  idx === 0 || idx === 4
                    ? 'translate-y-2'
                    : idx === 1 || idx === 3
                    ? 'translate-y-0.5'
                    : '-translate-y-1';

                return (
                  <motion.button
                    key={item.id}
                    onClick={() => setCurrentIdx(idx)}
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 450, damping: 15 }}
                    className={`relative p-3.5 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${arcOffsetY} ${
                      isActive
                        ? 'bg-white/95 shadow-[0_10px_25px_-5px_rgba(99,102,241,0.25)] border-indigo-400 ring-2 ring-indigo-500/20'
                        : 'bg-white/75 hover:bg-white border-white/90 hover:border-indigo-200 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-mono font-bold transition-colors ${
                          isActive
                            ? 'bg-slate-900 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        0{idx + 1}
                      </span>
                      <span className="text-[10px] font-mono font-medium text-slate-400 truncate">
                        {item.period.split('–')[0]}
                      </span>
                    </div>
                    <div className="text-[12.5px] font-bold text-slate-900 font-display line-clamp-1">
                      {item.title.split('—')[0].trim()}
                    </div>
                    <div className="text-[10.5px] text-slate-500 line-clamp-1 mt-0.5 font-medium">
                      {item.title.split('—')[1]?.trim() || item.badge}
                    </div>

                    {isActive && (
                      <motion.div
                        layoutId="activePillUnderline"
                        className="absolute -bottom-1 inset-x-5 h-1 rounded-full bg-indigo-600 shadow-xs"
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 2. Interactive Detailed Milestone Card - High-End Glassmorphic Design */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem.id}
              initial={{ opacity: 0, rotateY: 6, scale: 0.98, y: 12 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1, y: 0 }}
              exit={{ opacity: 0, rotateY: -6, scale: 0.98, y: -12 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="glassmorphic-card p-6 sm:p-10 border border-white/80 shadow-xl relative overflow-hidden"
            >
              {/* Top Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200/60">
                <div className="flex flex-wrap items-center gap-2.5">
                  {/* Clean Milestone Index Tag */}
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-extrabold bg-slate-900 text-white shadow-xs">
                    <span>MILESTONE {String(currentIdx + 1).padStart(2, '0')}</span>
                  </div>

                  {/* Period */}
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 text-xs font-mono font-semibold text-slate-700 border border-slate-200/80 shadow-2xs">
                    <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{currentItem.period}</span>
                  </div>

                  {/* Clean Track Type */}
                  <span className="text-xs font-bold px-3.5 py-1.5 rounded-full capitalize flex items-center gap-1.5 bg-indigo-50/90 text-indigo-700 border border-indigo-200/80 shadow-2xs">
                    <Bookmark className="w-3.5 h-3.5 text-indigo-600" />
                    {currentItem.type} Track
                  </span>

                  {/* Selection Badge */}
                  <span className="text-xs font-semibold text-slate-700 bg-white/90 px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-2xs">
                    {currentItem.badge}
                  </span>
                </div>

                {/* Rotary Slide Controllers with High-Class Jelly Physics */}
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={prevSlide}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 14 }}
                    aria-label="Previous milestone"
                    className="w-10 h-10 rounded-full bg-white border border-slate-200/90 flex items-center justify-center text-slate-700 hover:text-indigo-600 hover:border-indigo-400 hover:shadow-md shadow-xs cursor-pointer transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    onClick={nextSlide}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 14 }}
                    aria-label="Next milestone"
                    className="w-10 h-10 rounded-full bg-white border border-slate-200/90 flex items-center justify-center text-slate-700 hover:text-indigo-600 hover:border-indigo-400 hover:shadow-md shadow-xs cursor-pointer transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Title & Organization Header */}
              <div className="my-6">
                <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-slate-900 tracking-tight leading-snug font-display">
                  {currentItem.title}
                </h3>

                {currentItem.supervisors && (
                  <div className="mt-3.5 inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/80 border border-slate-200/80 text-xs sm:text-[13.5px] text-slate-700 shadow-2xs">
                    <div className="w-6 h-6 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                      <UserCheck className="w-4 h-4 text-indigo-600" />
                    </div>
                    <span>
                      Faculty Mentors: <strong className="font-extrabold text-slate-900">{currentItem.supervisors}</strong>
                    </span>
                  </div>
                )}
              </div>

              {/* Key Contributions & Scientific Innovations List */}
              <div className="space-y-3 mb-6">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Key Computational Contributions & Breakthroughs</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  {currentItem.bullets.map((bullet, bIdx) => (
                    <div
                      key={bIdx}
                      className="p-4 rounded-2xl bg-white/80 border border-slate-200/70 hover:border-indigo-300 hover:bg-white transition-all flex items-start gap-3 shadow-2xs"
                    >
                      <div className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5 border border-indigo-200/60">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[13.5px] font-medium text-slate-700 leading-snug">
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pipelines & Methodology Chips */}
              {pipelineTags[currentItem.id] && (
                <div className="pt-4 border-t border-slate-200/60">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Engineered Pipelines, HPC Tooling & Algorithms</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {pipelineTags[currentItem.id].map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white/90 border border-slate-200/80 text-slate-700 shadow-2xs hover:border-indigo-400 hover:text-indigo-600 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Quick Jump Dot Pagination */}
        <div className="flex items-center justify-center gap-2.5 mt-8">
          {research.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => setCurrentIdx(dotIdx)}
              aria-label={`Jump to milestone ${dotIdx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                dotIdx === currentIdx
                  ? 'w-8 bg-slate-900 shadow-xs'
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
