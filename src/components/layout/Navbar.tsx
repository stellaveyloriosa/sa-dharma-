import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X } from 'lucide-react';
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

  // Desktop navigation items (kept intact)
  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'research', label: 'Research' },
    { id: 'publications', label: 'Publications' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ];

  // Full 10 mobile menu items
  const mobileMenuItems = [
    { id: 'hero', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'research', label: 'RESEARCH' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'skills', label: 'STARTUP' },
    { id: 'research', label: 'EXPERIENCE' },
    { id: 'about', label: 'LEADERSHIP' },
    { id: 'publications', label: 'PUBLICATIONS' },
    { id: 'projects', label: 'GALLERY' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Floating Centered Pill Bar with GlassSurface */}
      <header className="fixed top-4 sm:top-5 left-0 right-0 z-[999] px-3.5 sm:px-6 flex justify-center pointer-events-none">
        <GlassSurface
          width="100%"
          height={60}
          borderRadius={30}
          backgroundOpacity={0.72}
          saturation={1.3}
          distortionScale={-110}
          displace={3}
          brightness={55}
          className="pointer-events-auto max-w-6xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-white/80"
          contentClassName="w-full h-full px-4 sm:px-6 flex items-center justify-between"
        >
          {/* ══════════════════════════════════════════════════════════
              MOBILE TOP HEADER (< lg):
              Editorial text identity at far left, minimal hamburger at far right
          ══════════════════════════════════════════════════════════ */}
          <div className="lg:hidden w-full flex items-center justify-between">
            {/* Left: Small elegant editorial text identity */}
            <div
              onClick={() => handleLinkClick('hero')}
              className="flex-shrink-0 cursor-pointer select-none py-1"
            >
              <span className="text-[10.5px] sm:text-[11.5px] font-medium tracking-[0.14em] uppercase text-slate-800 font-sans">
                Sa Dharmasastha Karthikeya
              </span>
            </div>

            {/* Right: Hamburger icon aligned to far right (min 44x44 touch target) */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="ml-auto min-w-[44px] min-h-[44px] flex items-center justify-end text-slate-700 hover:text-indigo-600 transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-lg -mr-1"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            </button>
          </div>

          {/* ══════════════════════════════════════════════════════════
              DESKTOP HEADER (lg+):
              Unchanged desktop layout
          ══════════════════════════════════════════════════════════ */}
          <div className="hidden lg:flex w-full items-center justify-between">
            {/* Left: SDK badge + Full Name */}
            <div
              onClick={() => handleLinkClick('hero')}
              className="flex items-center gap-2.5 cursor-pointer group shrink-0"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                <span className="text-xs font-extrabold tracking-wider font-display">
                  SDK
                </span>
              </div>
              <span className="text-[13.5px] font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors hidden xl:inline-block">
                Sa Dharmasastha Karthikeya
              </span>
            </div>

            {/* Center: Desktop Navigation Links */}
            <nav className="flex items-center justify-center gap-3.5 xl:gap-6 2xl:gap-7 text-[13px] xl:text-[13.5px] font-medium text-slate-600 flex-1 px-2 max-w-2xl">
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

            {/* Right: Let's Connect */}
            <div className="flex items-center gap-2 shrink-0">
              <motion.button
                onClick={() => {
                  if (onConnectClick) onConnectClick();
                  else handleLinkClick('contact');
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                className="px-4 xl:px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white text-xs xl:text-[13px] font-bold flex items-center gap-1.5 shadow-[0_4px_16px_rgba(99,102,241,0.3)] hover:shadow-[0_6px_22px_rgba(99,102,241,0.4)] cursor-pointer whitespace-nowrap transition-shadow"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Let's Connect</span>
              </motion.button>
            </div>
          </div>
        </GlassSurface>
      </header>

      {/* ══════════════════════════════════════════════════════════
          MOBILE FULL NAVIGATION DRAWER (When Hamburger is opened)
          Shows: HOME, ABOUT, RESEARCH, PROJECTS, STARTUP,
                 EXPERIENCE, LEADERSHIP, PUBLICATIONS, GALLERY, CONTACT
      ══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[1000] bg-white/95 backdrop-blur-2xl p-6 flex flex-col justify-between overflow-y-auto"
          >
            {/* Top Bar of Drawer: Identity + Close Button */}
            <div className="flex items-center justify-between pb-5 border-b border-slate-100">
              <span className="text-[12px] font-medium tracking-[0.16em] uppercase text-slate-800">
                Sa Dharmasastha Karthikeya
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="min-w-[44px] min-h-[44px] flex items-center justify-end text-slate-600 hover:text-indigo-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu Links (10 items) */}
            <nav className="flex flex-col py-6 space-y-1 my-auto">
              {mobileMenuItems.map((item, index) => (
                <button
                  key={`${item.id}-${item.label}`}
                  onClick={() => handleLinkClick(item.id)}
                  className="w-full text-left font-sans text-[15px] font-medium tracking-[0.08em] text-slate-700 hover:text-indigo-600 transition-colors py-2.5 px-2 rounded-xl hover:bg-indigo-50/50 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-slate-400 group-hover:text-indigo-400">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  <span className="text-xs text-slate-300 group-hover:text-indigo-600 transition-colors">
                    →
                  </span>
                </button>
              ))}
            </nav>

            {/* Drawer Footer */}
            <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 flex justify-between items-center">
              <span>Biomedical Engineering × AI</span>
              <span className="text-indigo-600 font-medium">Portfolio</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
