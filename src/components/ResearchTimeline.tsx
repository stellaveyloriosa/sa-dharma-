import React, { useState } from 'react';
import { Building2, Calendar, UserCheck, ChevronRight, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';
import { RESEARCH_POSITIONS } from '../data/portfolioData';

export const ResearchTimeline: React.FC = () => {
  const [selectedPositionId, setSelectedPositionId] = useState<string>(RESEARCH_POSITIONS[0].id);
  const activePosition = RESEARCH_POSITIONS.find((p) => p.id === selectedPositionId) || RESEARCH_POSITIONS[0];

  return (
    <section id="research" className="py-20 relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 mb-3 tracking-wider uppercase">
          <span>01. Institutional Appointments</span>
          <span aria-hidden="true">·</span>
          <span>National Fellowships & Laboratories</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display mb-4">
          Research Experience & Fellowships
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          From high-performance computing clusters at IIT Bombay to single-cell foundation model architectures at Ashoka University.
        </p>
      </div>

      {/* Two-Column Responsive Layout: Timeline list on left, Deep-dive card on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Position Selectors (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          {RESEARCH_POSITIONS.map((pos) => {
            const isSelected = pos.id === selectedPositionId;
            return (
              <button
                key={pos.id}
                onClick={() => setSelectedPositionId(pos.id)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-200 liquid-glass-interactive relative overflow-hidden ${
                  isSelected
                    ? 'liquid-glass border-cyan-500/50 shadow-lg shadow-cyan-900/20'
                    : 'liquid-glass-subtle hover:border-white/20'
                }`}
              >
                {/* Active Indicator Bar */}
                {isSelected && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-indigo-500" />
                )}

                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-mono text-cyan-400">{pos.period}</span>
                  {pos.highlight && (
                    <span className="text-[10px] text-emerald-400 font-mono text-right truncate">
                      {pos.highlight}
                    </span>
                  )}
                </div>

                <div className="font-semibold text-white text-sm mb-1 line-clamp-1">
                  {pos.role}
                </div>

                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                  <span className="truncate">{pos.institution}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Deep Technical Overview (7 cols) */}
        <div className="lg:col-span-7">
          <div className="liquid-glass rounded-2xl p-6 sm:p-8 relative overflow-hidden">
            {/* Header info */}
            <div className="border-b border-white/10 pb-6 mb-6">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-cyan-300 mb-2">
                <span>{activePosition.period}</span>
                <span>{activePosition.location}</span>
              </div>

              <h3 className="text-2xl font-bold text-white font-display mb-2">
                {activePosition.role}
              </h3>

              <div className="text-sm font-medium text-slate-300 flex items-center gap-2 mb-3">
                <Building2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{activePosition.institution}</span>
              </div>

              {activePosition.supervisors && (
                <div className="text-xs text-slate-400 flex items-center gap-2 pt-1">
                  <UserCheck className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>Supervisors: {activePosition.supervisors}</span>
                </div>
              )}
            </div>

            {/* Special Feature Graphic for IIT Bombay ATPase Thesis */}
            {activePosition.id === 'iit-bombay' && (
              <div className="mb-6 rounded-xl overflow-hidden border border-white/10 relative aspect-[16/8] bg-slate-950">
                <img
                  src="/src/assets/images/protein_atpase_crystal_1790232383805.jpg"
                  alt="VCP/VAT ATPase hexameric ring with liquid glass ribbon backbone"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs">
                  <span className="font-mono text-cyan-300 text-[11px]">
                    ParamRudra HPC 150ns Simulation & ProteinMPNN Redesign
                  </span>
                  <span className="text-[11px] text-emerald-400 font-mono">
                    30× ATP Docking Affinity
                  </span>
                </div>
              </div>
            )}

            {/* Bullet points detailing contributions */}
            <div className="space-y-3 mb-6">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                Key Methodologies & Discoveries:
              </div>
              {activePosition.description.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>

            {/* Stack Tags */}
            <div className="pt-4 border-t border-white/10">
              <div className="text-[11px] font-mono text-slate-500 mb-2">
                COMPUTATIONAL & EXPERIMENTAL TOOLCHAIN:
              </div>
              <div className="flex flex-wrap gap-2">
                {activePosition.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs rounded-md bg-white/5 border border-white/10 text-slate-300 font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
