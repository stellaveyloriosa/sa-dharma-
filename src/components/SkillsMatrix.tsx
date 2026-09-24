import React from 'react';
import { Cpu, Dna, Brain, Terminal, Award, Users, BookMarked, CheckCircle } from 'lucide-react';
import { SKILLS_CATEGORIES, CERTIFICATIONS } from '../data/portfolioData';

export const SkillsMatrix: React.FC = () => {
  return (
    <section id="skills" className="py-20 relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 mb-3 tracking-wider uppercase">
          <span>04. Competency Matrix</span>
          <span aria-hidden="true">·</span>
          <span>Computational Foundations & Scientific Tooling</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display mb-4">
          Technical Skills & Pedagogical Experience
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Disciplined convergence of biomedical engineering, high-performance computing, and mechanistically interpretable deep learning.
        </p>
      </div>

      {/* 4 Skill Category Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {SKILLS_CATEGORIES.map((cat, idx) => (
          <div key={idx} className="skill-card p-6 relative overflow-hidden">
            <div className="flex items-center gap-2.5 text-white font-display font-semibold text-base mb-4">
              <div className="skill-icon-container w-10 h-10">
                {idx === 0 && <Dna className="w-5 h-5 text-cyan-400" />}
                {idx === 1 && <Brain className="w-5 h-5 text-purple-400" />}
                {idx === 2 && <Cpu className="w-5 h-5 text-emerald-400" />}
                {idx === 3 && <Terminal className="w-5 h-5 text-amber-400" />}
              </div>
              <span className="skill-pillar-label px-3 py-1 text-sm font-semibold text-slate-800">{cat.category}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {cat.skills.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  className="skill-tag-pill flex items-center gap-2 text-slate-800 font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                  <span className="truncate">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Teaching Assistantship & Leadership Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
        {/* Teaching Assistant Box (7 cols) */}
        <div className="lg:col-span-7 liquid-glass rounded-2xl p-6">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
            <Users className="w-4 h-4" />
            <span>Teaching Assistantship · Sep 2026 – Dec 2026</span>
          </div>
          <h3 className="text-lg font-bold text-white font-display mb-2">
            Department of Biomedical Engineering, VFSTR
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            Provided laboratory instructional guidance, curricular support, and practical demonstrations across university degree courses:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-2 rounded-lg bg-white/5 border border-white/5 text-slate-300 flex items-start gap-2">
              <span className="text-cyan-400 mt-0.5">›</span>
              <span>Fundamentals of Anatomy and Physiology Lab</span>
            </div>
            <div className="p-2 rounded-lg bg-white/5 border border-white/5 text-slate-300 flex items-start gap-2">
              <span className="text-cyan-400 mt-0.5">›</span>
              <span>Agentic AI in Biomedical Data Contexts</span>
            </div>
            <div className="p-2 rounded-lg bg-white/5 border border-white/5 text-slate-300 flex items-start gap-2">
              <span className="text-cyan-400 mt-0.5">›</span>
              <span>Design Thinking & Engineering Orientation</span>
            </div>
            <div className="p-2 rounded-lg bg-white/5 border border-white/5 text-slate-300 flex items-start gap-2">
              <span className="text-cyan-400 mt-0.5">›</span>
              <span>Rehabilitation Engineering</span>
            </div>
            <div className="p-2 rounded-lg bg-white/5 border border-white/5 text-slate-300 flex items-start gap-2 sm:col-span-2">
              <span className="text-cyan-400 mt-0.5">›</span>
              <span>Diagnostic & Therapeutic Equipment Lab</span>
            </div>
          </div>
        </div>

        {/* Cell Bridge Consulting & Academic Honors (5 cols) */}
        <div className="lg:col-span-5 liquid-glass rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">
              <Award className="w-4 h-4" />
              <span>Translational Initiative</span>
            </div>
            <h3 className="text-lg font-bold text-white font-display mb-2">
              Cell Bridge Consulting
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              Founder & Project Development Engineer (Aug 2025 – Present). Evaluates biomedical computational models against structured translational frameworks to identify feasibility gaps and workflow bottlenecks before wet-lab or clinical translation.
            </p>
          </div>

          <div className="pt-3 border-t border-white/10 text-xs space-y-2">
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">Project Expo 2025:</span>
              <span className="font-mono text-emerald-400 font-semibold">1st Place Winner</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">BME Merit Scholarship:</span>
              <span className="font-mono text-cyan-300 font-semibold">Top 5% GPA Conferred</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">Research Assistantship:</span>
              <span className="font-mono text-slate-200">2.5+ Years University Recognised</span>
            </div>
          </div>
        </div>
      </div>

      {/* Verified Professional Certifications Accordion / Cards */}
      <div className="liquid-glass-subtle rounded-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
            <BookMarked className="w-5 h-5 text-cyan-400" />
            <span>Specialisations & Verified Certifications</span>
          </h3>
          <span className="text-xs font-mono text-slate-400">Johns Hopkins · Fred Hutch · Mount Sinai · TU Delft</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {CERTIFICATIONS.map((cert, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between"
            >
              <div>
                <div className="text-[11px] font-mono text-cyan-300 mb-1">{cert.period}</div>
                <div className="font-bold text-white mb-1 leading-snug">{cert.title}</div>
                <div className="text-slate-400 mb-2 font-medium">{cert.issuer}</div>
              </div>
              <div className="text-[11px] text-slate-400 border-t border-white/5 pt-2">
                {cert.focus}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
