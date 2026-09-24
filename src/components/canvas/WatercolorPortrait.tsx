import React from 'react';

interface WatercolorPortraitProps {
  size?: number;
  className?: string;
}

export const WatercolorPortrait: React.FC<WatercolorPortraitProps> = ({
  size = 360,
  className = '',
}) => {
  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer decorative ring */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none transition-transform duration-700 hover:scale-105"
        style={{
          border: '2px solid rgba(124, 58, 237, 0.15)',
        }}
      />
      {/* Inner decorative ring */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          inset: '12px',
          border: '1px solid rgba(124, 58, 237, 0.08)',
        }}
      />

      {/* Morphing watercolor layers */}
      <div
        className="absolute rounded-full overflow-hidden flex items-center justify-center"
        style={{ inset: '24px' }}
      >
        <div
          className="absolute inset-0 opacity-70 animate-pulse"
          style={{
            background: 'radial-gradient(circle at 35% 35%, #e8f5f0, #ede9fe 50%, #fce4ec 90%)',
            filter: 'blur(16px)',
          }}
        />
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background:
              'conic-gradient(from 180deg at 50% 50%, #e0f2fe 0deg, #ede9fe 120deg, #fce4ec 240deg, #e8f5f0 360deg)',
            mixBlendMode: 'multiply',
            filter: 'blur(20px)',
          }}
        />

        {/* Center label */}
        <div className="relative z-10 text-center select-none pointer-events-none">
          <p
            className="text-gray-500 font-serif italic text-sm tracking-wide"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Portrait
          </p>
          <span className="text-[11px] text-gray-400 font-sans uppercase tracking-widest block mt-0.5">
            Coming Soon
          </span>
        </div>
      </div>
    </div>
  );
};
