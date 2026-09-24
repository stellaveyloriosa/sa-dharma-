import React, { useState, useEffect } from 'react';
import { Mail, FileText, Menu, X } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeaderProps {
  onOpenContact: () => void;
  onOpenBibtex: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenContact, onOpenBibtex }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050811]/80 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a
          href="#"
          className="text-base sm:text-lg font-bold tracking-tight text-white font-display hover:text-cyan-300 transition-colors whitespace-nowrap"
        >
          {PERSONAL_INFO.name}
        </a>

        {/* Zone 2: 4-6 Clean Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium tracking-wide text-slate-300">
          <a href="#overview" className="hover:text-cyan-300 transition-colors whitespace-nowrap">
            Overview
          </a>
          <a href="#research" className="hover:text-cyan-300 transition-colors whitespace-nowrap">
            Research
          </a>
          <a href="#lab3d" className="hover:text-cyan-300 transition-colors whitespace-nowrap">
            3D Lab
          </a>
          <a href="#publications" className="hover:text-cyan-300 transition-colors whitespace-nowrap">
            Publications
          </a>
          <a href="#projects" className="hover:text-cyan-300 transition-colors whitespace-nowrap">
            Projects
          </a>
          <a href="#skills" className="hover:text-cyan-300 transition-colors whitespace-nowrap">
            Competencies
          </a>
        </nav>

        {/* Zone 3: 1-2 Primary Actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onOpenBibtex}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors whitespace-nowrap"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>BibTeX</span>
          </button>
          <button
            onClick={onOpenContact}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium text-black bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-sm transition-all whitespace-nowrap font-medium"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="p-2 rounded-lg text-slate-300 hover:text-white bg-white/5 border border-white/10"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#050811]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-5 space-y-3">
          <a
            href="#overview"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-300 hover:text-cyan-300"
          >
            Overview
          </a>
          <a
            href="#research"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-300 hover:text-cyan-300"
          >
            Research Experience
          </a>
          <a
            href="#lab3d"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-300 hover:text-cyan-300"
          >
            Interactive 3D Lab
          </a>
          <a
            href="#publications"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-300 hover:text-cyan-300"
          >
            Publications & Patents
          </a>
          <a
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-300 hover:text-cyan-300"
          >
            Repositories & Capstones
          </a>
          <a
            href="#skills"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-300 hover:text-cyan-300"
          >
            Technical Competencies
          </a>
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBibtex();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-medium text-slate-200 bg-white/5 rounded-lg border border-white/10"
            >
              <FileText className="w-4 h-4" />
              <span>Citations & BibTeX</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-medium text-black bg-cyan-400 rounded-lg"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Directly</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
