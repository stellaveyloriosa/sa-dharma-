import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Inline SVG icons — 19px, minimal line style ──────────────────────────────
const HomeIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
    <path d="M9 21V12h6v9" />
  </svg>
);
const ResearchIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" />
    <path d="M15.5 15.5 21 21" />
    <path d="M11 8v3M9.5 9.5h3" />
  </svg>
);
const ProjectsIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
);
const StartupIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);
const ContactIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" />
  </svg>
);

// ─── Nav item definitions ──────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: 'hero',     label: 'Home',     Icon: HomeIcon,     sectionId: 'hero'     },
  { id: 'research', label: 'Research', Icon: ResearchIcon, sectionId: 'research' },
  { id: 'projects', label: 'Projects', Icon: ProjectsIcon, sectionId: 'projects' },
  { id: 'skills',   label: 'Startup',  Icon: StartupIcon,  sectionId: 'skills'   },
  { id: 'contact',  label: 'Contact',  Icon: ContactIcon,  sectionId: 'contact'  },
] as const;

// Map any page section → which dock tab highlights
const SECTION_TO_NAV: Record<string, string> = {
  hero:         'hero',
  about:        'hero',
  research:     'research',
  publications: 'research',
  projects:     'projects',
  skills:       'skills',
  contact:      'contact',
};

interface MobileBottomNavProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeSection,
  onNavigate,
}) => {
  const activeNav = SECTION_TO_NAV[activeSection] ?? 'hero';
  const reduced = useRef(
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  ).current;

  const spring = reduced ? {} : { type: 'spring' as const, stiffness: 400, damping: 28 };
  const entry  = reduced ? { duration: 0 } : { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] };

  return (
    <motion.nav
      aria-label="Quick navigation"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={entry}
      className="mobile-bottom-nav-wrapper"
      style={{
        position: 'fixed',
        left: 14,
        right: 14,
        bottom: 'calc(12px + env(safe-area-inset-bottom))',
        zIndex: 9999,
      }}
    >
      {/* ── Dock shell ─────────────────────────────────────────────────────── */}
      <div
        style={{
          width: '100%',
          height: 64,
          borderRadius: 32,
          position: 'relative',
          /* Liquid material */
          background: 'rgba(255,255,255,0.44)',
          backdropFilter: 'blur(22px) saturate(145%) brightness(1.05)',
          WebkitBackdropFilter: 'blur(22px) saturate(145%) brightness(1.05)',
          border: '1px solid rgba(255,255,255,0.50)',
          boxShadow: [
            '0 8px 28px rgba(20,45,70,0.10)',
            '0 1px 4px rgba(20,45,70,0.05)',
            'inset 0 1px 0 rgba(255,255,255,0.78)',
            'inset 0 -1px 0 rgba(180,200,240,0.14)',
          ].join(', '),
        }}
      >
        {/* Ambient reflection — radial + linear */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, borderRadius: 32, pointerEvents: 'none', zIndex: 0,
            background: [
              'radial-gradient(ellipse 60% 45% at 50% 0%, rgba(186,224,255,0.14) 0%, transparent 70%)',
              'linear-gradient(180deg, rgba(255,255,255,0.11) 0%, rgba(240,248,255,0.02) 100%)',
            ].join(', '),
          }}
        />
        {/* Top edge highlight */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', top: 0, left: '12%', right: '12%', height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.88) 30%, rgba(200,230,255,0.75) 70%, transparent)',
            pointerEvents: 'none', zIndex: 1,
          }}
        />

        {/* ── Five-item grid ─────────────────────────────────────────────── */}
        <div
          role="list"
          style={{
            position: 'relative', zIndex: 2,
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            height: '100%',
            padding: '0 6px',
          }}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <motion.button
                key={item.id}
                role="listitem"
                onClick={() => onNavigate(item.sectionId)}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
                whileTap={reduced ? {} : { scale: 0.94, y: 1 }}
                className="mobile-nav-item"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  padding: '5px 2px',
                  minWidth: 44,
                  minHeight: 44,
                  borderRadius: 24,
                  WebkitTapHighlightColor: 'transparent',
                  outline: 'none',
                }}
              >
                {/* Active liquid bubble — subtle, inside button bounds */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      key="bubble"
                      layoutId="active-nav-bubble"
                      initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.75 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.75 }}
                      transition={reduced ? { duration: 0 } : spring}
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        inset: '3px 4px',
                        borderRadius: 22,
                        background: 'linear-gradient(145deg, rgba(99,102,241,0.09) 0%, rgba(139,92,246,0.06) 100%)',
                        border: '1px solid rgba(99,102,241,0.14)',
                        boxShadow: '0 1px 8px rgba(99,102,241,0.09), inset 0 1px 0 rgba(255,255,255,0.55)',
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* Icon */}
                <motion.span
                  animate={reduced ? {} : isActive ? { y: -1.5 } : { y: 0 }}
                  transition={spring}
                  aria-hidden="true"
                  style={{
                    color: isActive ? '#5b5ef4' : 'rgba(71,85,105,0.60)',
                    position: 'relative', zIndex: 1, lineHeight: 0, display: 'block',
                    filter: isActive ? 'drop-shadow(0 0 5px rgba(99,102,241,0.28))' : 'none',
                    transition: reduced ? 'none' : 'color 0.25s, filter 0.25s',
                  }}
                >
                  <item.Icon />
                </motion.span>

                {/* Label */}
                <motion.span
                  animate={reduced ? {} : isActive ? { y: -1 } : { y: 0 }}
                  transition={spring}
                  style={{
                    fontSize: 10,
                    fontWeight: isActive ? 700 : 500,
                    letterSpacing: '0.025em',
                    color: isActive ? '#4f46e5' : 'rgba(71,85,105,0.52)',
                    fontFamily: "'Sora','Plus Jakarta Sans',sans-serif",
                    lineHeight: 1,
                    position: 'relative', zIndex: 1,
                    transition: reduced ? 'none' : 'color 0.25s',
                    userSelect: 'none',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.label}
                </motion.span>

                {/* Active dot indicator */}
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      key="dot"
                      initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0 }}
                      transition={reduced ? { duration: 0 } : spring}
                      aria-hidden="true"
                      style={{
                        position: 'absolute', bottom: 4,
                        left: '50%', transform: 'translateX(-50%)',
                        width: 3, height: 3, borderRadius: '50%',
                        background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                        boxShadow: '0 0 5px rgba(99,102,241,0.55)',
                        zIndex: 1,
                      }}
                    />
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};
