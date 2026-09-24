import React from 'react';
import { ExternalLink, Github, Linkedin, BookOpen, Award, ArrowUpRight, GraduationCap } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroSectionProps {
  onExploreLab: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreLab }) => {
  return (
    <section id="overview" className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column (7 cols): Editorial Identity, Summary & Links */}
        <div className="lg:col-span-7 space-y-6">
          {/* Status Kicker (Zero-pill clean typography) */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono tracking-wide">
            <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-cyan-300 font-medium">B.Tech Biomedical Engineering + Minor AI&ML</span>
            <span aria-hidden="true">·</span>
            <span>IIT Bombay IRCC Fellow</span>
            <span aria-hidden="true">·</span>
            <span>Ashoka KCDH</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display leading-[1.1] text-balance">
            Recovering biological structure from high-dimensional molecular data.
          </h1>

          {/* Profile Summary Text */}
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            {PERSONAL_INFO.summary}
          </p>

          {/* Academic Pedigree Snapshot */}
          <div className="liquid-glass rounded-xl p-4 sm:p-5 text-xs text-slate-300 space-y-2">
            <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              <span>Conferred Degree & Distinction</span>
            </div>
            <div className="text-sm font-semibold text-white">
              {PERSONAL_INFO.education.institution} · {PERSONAL_INFO.education.degree}
            </div>
            <div className="flex flex-wrap items-center gap-3 text-slate-400">
              <span className="text-cyan-300 font-medium">{PERSONAL_INFO.education.minor}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums text-emerald-400 font-semibold">
                CGPA: {PERSONAL_INFO.education.cgpa}
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-300">{PERSONAL_INFO.education.honors}</span>
            </div>
          </div>

          {/* Primary Action Buttons & Social Academic Profiles */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onExploreLab}
              className="px-5 py-2.5 text-xs font-semibold text-black bg-cyan-400 hover:bg-cyan-300 rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2"
            >
              <span>Launch 3D In-Silico Lab</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="liquid-glass px-4 py-2.5 rounded-xl text-xs font-medium text-slate-200 hover:text-white flex items-center gap-2 transition-all hover:border-white/30"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>

            <a
              href={PERSONAL_INFO.scholarUrl}
              target="_blank"
              rel="noreferrer"
              className="liquid-glass px-4 py-2.5 rounded-xl text-xs font-medium text-slate-200 hover:text-white flex items-center gap-2 transition-all hover:border-white/30"
            >
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Google Scholar</span>
            </a>

            <a
              href={PERSONAL_INFO.orcidUrl}
              target="_blank"
              rel="noreferrer"
              className="liquid-glass px-4 py-2.5 rounded-xl text-xs font-medium text-slate-200 hover:text-white flex items-center gap-2 transition-all hover:border-white/30"
            >
              <Award className="w-4 h-4 text-emerald-400" />
              <span>ORCID</span>
            </a>

            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="liquid-glass px-4 py-2.5 rounded-xl text-xs font-medium text-slate-200 hover:text-white flex items-center gap-2 transition-all hover:border-white/30"
            >
              <Linkedin className="w-4 h-4 text-blue-400" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Right Column (5 cols): Glass Card with Generated 3D Asset & Quantitative Metrics */}
        <div className="lg:col-span-5 space-y-4">
          <div className="liquid-glass rounded-2xl p-4 sm:p-5 relative overflow-hidden group">
            {/* Visual Glass Frame with Generated Hero Asset */}
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-slate-900 border border-white/10">
              <img
                src="/src/assets/images/liquid_glass_biotech_hero_1790232367410.jpg"
                alt="Liquid glass molecular sculpture representing mechanistically-grounded AI in single-cell biology"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-xs text-white">
                <div className="font-mono text-[10px] text-cyan-300 uppercase tracking-wider">
                  Mechanistic Machine Learning
                </div>
                <div className="text-xs font-medium text-slate-200 truncate">
                  scKAN · DeepSEM · ProteinMPNN · 150ns GROMACS MD
                </div>
              </div>
            </div>

            {/* Quantitative Proof Grid (Claim-to-Proof Adjacency) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-center">
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-300 tabular-nums">
                  8.72<span className="text-xs text-slate-400 font-normal">/10</span>
                </div>
                <div className="text-[11px] text-slate-400 uppercase font-mono tracking-tight mt-0.5">
                  BME CGPA
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400 tabular-nums">
                  1 <span className="text-xs text-slate-400 font-normal">of 8</span>
                </div>
                <div className="text-[11px] text-slate-400 uppercase font-mono tracking-tight mt-0.5">
                  IIT-B IRCC Fellow
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                <div className="text-xl sm:text-2xl font-bold font-mono text-white tabular-nums">
                  150 <span className="text-xs text-slate-400 font-normal">ns</span>
                </div>
                <div className="text-[11px] text-slate-400 uppercase font-mono tracking-tight mt-0.5">
                  ParamRudra MD
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                <div className="text-xl sm:text-2xl font-bold font-mono text-white tabular-nums">
                  1
                </div>
                <div className="text-[11px] text-slate-400 uppercase font-mono tracking-tight mt-0.5">
                  Registered Patent
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-300 tabular-nums">
                  5+
                </div>
                <div className="text-[11px] text-slate-400 uppercase font-mono tracking-tight mt-0.5">
                  Papers & Preprints
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                <div className="text-xl sm:text-2xl font-bold font-mono text-purple-300 tabular-nums">
                  17+
                </div>
                <div className="text-[11px] text-slate-400 uppercase font-mono tracking-tight mt-0.5">
                  Open-Source Repos
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
