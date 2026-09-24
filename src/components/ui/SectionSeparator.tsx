import React from 'react';

interface SectionSeparatorProps {
  className?: string;
  withPill?: boolean;
}

export const SectionSeparator: React.FC<SectionSeparatorProps> = ({
  className = '',
  withPill = true,
}) => {
  return (
    <div
      className={`relative w-full max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-10 flex items-center justify-center pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* Liquid-glass glow bloom behind the separator */}
      <div className="absolute inset-x-8 sm:inset-x-20 h-4 bg-gradient-to-r from-transparent via-indigo-400/15 to-transparent blur-md" />

      {/* Subtle, semi-transparent horizontal liquid-glass line */}
      <div className="relative w-full h-[1px] bg-gradient-to-r from-transparent via-slate-300/70 to-transparent" />
      <div className="absolute inset-x-16 sm:inset-x-32 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/25 to-transparent" />

      {/* Center floating liquid-glass accent pill with specular refraction */}
      {withPill && (
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
          <div className="liquid-glass px-3 py-1 rounded-full border border-white/95 shadow-xs flex items-center gap-2 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 shadow-2xs" />
            <span className="w-5 h-[1px] bg-indigo-200/80" />
            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-500 shadow-2xs" />
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionSeparator;
