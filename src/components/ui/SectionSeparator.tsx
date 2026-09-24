import React from 'react';

interface SectionSeparatorProps {
  className?: string;
  withPill?: boolean;
}

export const SectionSeparator: React.FC<SectionSeparatorProps> = ({
  className = '',
}) => {
  return (
    <div
      className={`relative w-full max-w-6xl mx-auto px-4 sm:px-8 py-5 sm:py-8 pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* Subtle fading divider line — no pill, no dot, no scroll arrow */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200/75 to-transparent" />
    </div>
  );
};

export default SectionSeparator;
