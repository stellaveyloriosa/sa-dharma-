import React, { useState } from 'react';
import { BookOpen, Copy, Check, ExternalLink, FileText, Bookmark, Sparkles } from 'lucide-react';
import { PUBLICATIONS, Publication } from '../data/portfolioData';

export const PublicationsSection: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'Journal' | 'Conference' | 'Preprint' | 'Patent'>('all');

  const handleCopyBibtex = (pub: Publication) => {
    navigator.clipboard.writeText(pub.bibtex);
    setCopiedId(pub.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filteredPubs = filter === 'all' ? PUBLICATIONS : PUBLICATIONS.filter((p) => p.type === filter);

  return (
    <section id="publications" className="py-20 relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 mb-3 tracking-wider uppercase">
          <span>02. Scholarly Output</span>
          <span aria-hidden="true">·</span>
          <span>Peer-Reviewed Literature & Registered Intellectual Property</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display mb-4">
          Publications, Preprints & Patents
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Disseminating findings across Scopus-indexed volumes, conference proceedings, and open computational preprints.
        </p>
      </div>

      {/* Filter Tabs (Zero-pill button controls with clean segmented states) */}
      <div className="flex justify-center mb-8">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {['all', 'Journal', 'Conference', 'Preprint', 'Patent'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab as any)}
              className={`filter-pill px-4 py-1.5 text-xs font-medium ${
                filter === tab ? 'active' : ''
              }`}
            >
              {tab === 'all' ? `All Works (${PUBLICATIONS.length})` : tab + 's'}
            </button>
          ))}
        </div>
      </div>

      {/* Publications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPubs.map((pub) => {
          const isCopied = copiedId === pub.id;
          return (
            <div
              key={pub.id}
              className={`publication-card p-6 flex flex-col justify-between group pub-status-${pub.status.replace(' ', '-')}`}
            >
              <div>
                {/* Meta line: Clean unboxed metadata with bullet separators */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-500 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-purple-600 font-semibold">{pub.year}</span>
                    <span aria-hidden="true">·</span>
                    <span className="peer-reviewed-label">{pub.type}</span>
                  </div>
                  <span className={`pub-badge pub-badge-${pub.status.replace(' ', '-')} text-[10px] font-bold uppercase tracking-wider`}>
                    {pub.status}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-slate-800 font-display mb-2 group-hover:text-purple-700 transition-colors leading-snug">
                  {pub.title}
                </h3>

                {/* Authors */}
                <div className="text-xs text-slate-700 font-medium mb-3">
                  {pub.authors}
                </div>

                {/* Venue */}
                <div className="text-xs text-purple-600/90 font-mono mb-3 leading-relaxed">
                  {pub.venue}
                </div>

                {/* Abstract */}
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                  {pub.abstract}
                </p>
              </div>

              {/* Action Buttons & Tags Footer */}
              <div className="pt-4 border-t border-slate-200/50 space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {pub.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono text-slate-600 bg-white/50 border border-slate-200/50 px-2 py-0.5 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between gap-3 pt-1">
                  <button
                    onClick={() => handleCopyBibtex(pub)}
                    className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-800 transition-colors"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600 font-mono text-[11px]">BibTeX Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-mono">Copy BibTeX</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-3">
                    {pub.url && (
                      <a
                        href={pub.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-purple-600 hover:text-purple-800 flex items-center gap-1 transition-colors font-medium"
                      >
                        <span>DOI Paper</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    <a
                      href="https://scholar.google.com/citations?user=oTUMMkMAAAAJ&hl=en"
                      target="_blank"
                      rel="noreferrer"
                      className="btn-scholar px-3 py-1.5 text-[11px] font-semibold flex items-center gap-1"
                    >
                      Scholar Citation
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Conference Presentations Panel */}
      <div className="mt-12 liquid-glass-subtle rounded-2xl p-6 sm:p-8">
        <h3 className="text-lg font-bold text-white font-display mb-4 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <span>Conference Presentations, Symposia & Posters</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
            <div className="flex items-center justify-between text-slate-400 font-mono text-[11px]">
              <span className="text-cyan-400">Oral Presentation</span>
              <span>ICNASC · Aug 2024</span>
            </div>
            <div className="text-slate-200 font-medium">
              Comparative analysis between linear and non-linear predictive modelling for treatment prognosis: Non-small cell lung cancer
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
            <div className="flex items-center justify-between text-slate-400 font-mono text-[11px]">
              <span className="text-cyan-400">Oral Presentation</span>
              <span>BioCloud · Apr 2025</span>
            </div>
            <div className="text-slate-200 font-medium">
              Monte Carlo Simulation of Radiation Energy Deposition and Computational Modelling of Radiopharmaceutical Diffusion via Brownian Dynamics
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
            <div className="flex items-center justify-between text-slate-400 font-mono text-[11px]">
              <span className="text-emerald-400">Poster Presentation</span>
              <span>IIT Bombay · May 2026</span>
            </div>
            <div className="text-slate-200 font-medium">
              Rational Minimisation of a VCP/VAT ATPase for Targeted Bacterial Killing: A Computational Engineering Pipeline
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
            <div className="flex items-center justify-between text-slate-400 font-mono text-[11px]">
              <span className="text-purple-400">Symposium Presentation</span>
              <span>Ashoka University (BDSA) · Aug 2026</span>
            </div>
            <div className="text-slate-200 font-medium">
              Sex Differences in Genetic Architectures of Testosterone and Cardio-Metabolic Traits in Humans
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
