import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-slate-200/60 bg-white/70 backdrop-blur-md text-center relative z-10 px-4">
      <div className="max-w-4xl mx-auto space-y-2">
        <p
          className="text-[13px] text-slate-500 font-sans font-light tracking-wide"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          © 2026 Sa Dharmasastha Karthikeya
        </p>
        <p className="text-[13px] text-slate-400 font-sans font-light">
          Biomedical Engineer · Computational Researcher · Single-Cell Biology
        </p>
      </div>
    </footer>
  );
};
