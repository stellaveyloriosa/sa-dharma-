import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Minimal Line Icons (19px) ────────────────────────────────────────────────
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

// ─── Exactly 3 Primary Mobile Navigation Items ────────────────────────────────
const NAV_ITEMS = [
  { id: 'hero',     label: 'HOME',     Icon: HomeIcon,     sectionId: 'hero'     },
  { id: 'research', label: 'RESEARCH', Icon: ResearchIcon, sectionId: 'research' },
  { id: 'projects', label: 'PROJECTS', Icon: ProjectsIcon, sectionId: 'projects' },
] as const;

// Map visible section → active bottom nav item (null when scrolled elsewhere)
const SECTION_TO_NAV: Record<string, string | null> = {
  hero:         'hero',
  about:        'hero',
  research:     'research',
  publications: 'research',
  projects:     'projects',
  skills:       null,
  contact:      null,
};

interface MobileBottomNavProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeSection,
  onNavigate,
}) => {
  const activeNav = SECTION_TO_NAV[activeSection] ?? null;
  const reduced = useRef(
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  ).current;

  const spring = reduced ? {} : { type: 'spring' as const, stiffness: 420, damping: 30 };
  const entry  = reduced ? { duration: 0 } : { duration: 0.38, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };

  return (
    <motion.nav
      aria-label="Quick mobile navigation"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={entry}
      className="mobile-bottom-nav-wrapper"
      style={{
        position: 'fixed',
        left: 14,
        right: 14,
        bottom: 'calc(10px + env(safe-area-inset-bottom))',
        zIndex: 9999,
      }}
    >
      {/* ── Liquid Dock Shell (62px medium-compact) ────────────────────────── */}
      <div
        style={{
          width: '100%',
          height: 62,
          borderRadius: 31,
          position: 'relative',
          background: 'rgba(255, 255, 255, 0.44)',
          backdropFilter: 'blur(22px) saturate(145%) brightness(1.05)',
          WebkitBackdropFilter: 'blur(22px) saturate(145%) brightness(1.05)',
          border: '1px solid rgba(255, 255, 255, 0.52)',
          boxShadow: [
            '0 8px 28px rgba(20, 45, 70, 0.09)',
            '0 1px 4px rgba(20, 45, 70, 0.04)',
            'inset 0 1px 0 rgba(255, 255, 255, 0.80)',
            'inset 0 -1px 0 rgba(180, 200, 240, 0.12)',
          ].join(', '),
        }}
      >
        {/* Subtle Ambient Liquid Reflection */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 31,
            pointerEvents: 'none',
            zIndex: 0,
            background: [
              'radial-gradient(ellipse 60% 45% at 50% 0%, rgba(186, 224, 255, 0.14) 0%, transparent 70%)',
              'linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(240, 248, 255, 0.02) 100%)',
            ].join(', '),
          }}
        />

        {/* Top Edge Specular Highlight */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: '14%',
            right: '14%',
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.88) 30%, rgba(200, 230, 255, 0.75) 70%, transparent)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* ── Equal-width 3-column grid perfectly centered ─────────────────── */}
        <div
          role="list"
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            height: '100%',
            padding: '0 8px',
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
                whileTap={reduced ? {} : { scale: 0.95, y: 1 }}
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
                  padding: '4px 6px',
                  minWidth: 44,
                  minHeight: 44,
                  borderRadius: 22,
                  WebkitTapHighlightColor: 'transparent',
                  outline: 'none',
                }}
              >
                {/* Active Liquid Bubble — subtle, no strong neon glow */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      key="bubble"
                      layoutId="active-nav-bubble-3"
                      initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
                      transition={reduced ? { duration: 0 } : spring}
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        inset: '4px 8px',
                        borderRadius: 18,
                        background: 'linear-gradient(145deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.05) 100%)',
                        border: '1px solid rgba(99, 102, 241, 0.12)',
                        boxShadow: '0 1px 6px rgba(99, 102, 241, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.45)',
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* Minimal Line Icon */}
                <motion.span
                  animate={reduced ? {} : isActive ? { y: -1.5 } : { y: 0 }}
                  transition={spring}
                  aria-hidden="true"
                  style={{
                    color: isActive ? '#4f46e5' : 'rgba(71, 85, 105, 0.58)',
                    position: 'relative',
                    zIndex: 1,
                    lineHeight: 0,
                    display: 'block',
                    filter: isActive ? 'drop-shadow(0 0 4px rgba(99, 102, 241, 0.22))' : 'none',
                    transition: reduced ? 'none' : 'color 0.25s, filter 0.25s',
                  }}
                >
                  <item.Icon />
                </motion.span>

                {/* Refined Label */}
                <motion.span
                  animate={reduced ? {} : isActive ? { y: -1 } : { y: 0 }}
                  transition={spring}
                  style={{
                    fontSize: 10,
                    fontWeight: isActive ? 600 : 500,
                    letterSpacing: '0.04em',
                    color: isActive ? '#4338ca' : 'rgba(71, 85, 105, 0.52)',
                    fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif",
                    lineHeight: 1,
                    position: 'relative',
                    zIndex: 1,
                    transition: reduced ? 'none' : 'color 0.25s',
                    userSelect: 'none',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.label}
                </motion.span>

                {/* Subtle Active Indicator Dot */}
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
                        position: 'absolute',
                        bottom: 4,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 3,
                        height: 3,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        boxShadow: '0 0 4px rgba(99, 102, 241, 0.45)',
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
