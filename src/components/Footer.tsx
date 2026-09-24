import React from 'react';
import { Github, Linkedin, BookOpen, Award, Mail, ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#050811]/90 backdrop-blur-2xl py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Identity */}
        <div>
          <div className="text-base font-bold text-white font-display">
            {PERSONAL_INFO.name}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Biomedical Engineering & AI/ML · Single-Cell Omics · Structural Biology
          </p>
          <div className="text-[11px] font-mono text-slate-500 mt-1">
            Ashoka University KCDH · IIT Bombay IRCC Fellow · Vignan&apos;s University
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <a
            href={PERSONAL_INFO.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>
          <a
            href={PERSONAL_INFO.scholarUrl}
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5"
          >
            <BookOpen className="w-4 h-4" />
            <span>Google Scholar</span>
          </a>
          <a
            href={PERSONAL_INFO.orcidUrl}
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5"
          >
            <Award className="w-4 h-4" />
            <span>ORCID</span>
          </a>
          <a
            href={PERSONAL_INFO.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5"
          >
            <Linkedin className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors ml-2"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-500 gap-2">
        <div>&copy; {new Date().getFullYear()} Sa Dharmasastha Karthikeya. All research rights reserved.</div>
        <div>Liquid Glass Bio-Computational Interface</div>
      </div>
    </footer>
  );
};
