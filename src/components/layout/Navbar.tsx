import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Menu, X } from 'lucide-react';
import GlassSurface from '../ui/GlassSurface';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onConnectClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onConnectClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'research', label: 'Research' },
    { id: 'publications', label: 'Publications' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Floating Centered Pill Bar with GlassSurface chromatic refraction */}
      <div className="fixed top-5 left-0 right-0 z-[999] px-4 sm:px-6 flex justify-center pointer-events-none">
        <GlassSurface
          width="100%"
          height={62}
          borderRadius={32}
          backgroundOpacity={0.7}
          saturation={1.3}
          distortionScale={-110}
          displace={3}
          brightness={55}
          className="pointer-events-auto max-w-6xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-white/80"
          contentClassName="w-full h-full px-4 sm:px-6 flex items-center justify-between"
        >
          {/* Left: SDK logo + Full Name */}
          <div
            onClick={() => handleLinkClick('hero')}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          >
            {/* SDK badge — desktop only */}
            <div className="hidden lg:flex w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <span className="text-xs font-extrabold tracking-wider font-display">
                SDK
              </span>
            </div>
            {/* Desktop: plain name */}
            <span className="text-[13.5px] font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors hidden xl:inline-block">
              Sa Dharmasastha Karthikeya
            </span>
            {/* Mobile: gradient highlighted name */}
            <span className="lg:hidden text-[13px] font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-display">
              Sa Dharmasastha Karthikeya
            </span>
          </div>

          {/* Center Navigation Links — desktop only */}
          <nav className="hidden lg:flex items-center justify-center gap-3.5 xl:gap-6 2xl:gap-7 text-[13px] xl:text-[13.5px] font-medium text-slate-600 flex-1 px-2 max-w-2xl">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative py-1 px-1 transition-colors cursor-pointer hover:text-indigo-600 whitespace-nowrap ${
                    isActive ? 'text-indigo-600 font-bold' : 'font-medium'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activePillUnderline"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2.5px] bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                      transition={{ type: 'spring', stiffness: 450, damping: 28 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Let's Connect (desktop) + hamburger (mobile only) */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Let's Connect — desktop only */}
            <motion.button
              onClick={() => {
                if (onConnectClick) onConnectClick();
                else handleLinkClick('contact');
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 500, damping: 15 }}
              className="hidden lg:flex px-4 xl:px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white text-xs xl:text-[13px] font-bold items-center gap-1.5 shadow-[0_4px_16px_rgba(99,102,241,0.3)] hover:shadow-[0_6px_22px_rgba(99,102,241,0.4)] cursor-pointer whitespace-nowrap transition-shadow"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Let's Connect</span>
            </motion.button>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Toggle navigation"
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-indigo-600 hover:bg-white/80 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </GlassSurface>
      </div>

      {/* Mobile Slide-down Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[1000] bg-white/95 backdrop-blur-xl p-6 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
              <span className="text-2xl font-extrabold text-slate-900 font-display">
                SDK
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-3 my-auto">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className="text-left font-display text-xl font-bold text-slate-800 hover:text-indigo-600 transition-colors py-2 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="text-xs text-slate-400">→</span>
                </button>
              ))}
            </nav>

            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 flex justify-between items-center">
              <span>Sa Dharmasastha Karthikeya</span>
              <span className="text-indigo-600 font-medium">Biomedical Engineering & AI</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
