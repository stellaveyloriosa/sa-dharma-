import React from 'react';
import StrokeText from './StrokeText';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  strokeColor?: string;
  fillColor?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  className = '',
  strokeColor = '#6366F1', // indigo accent matching palette
  fillColor = '#0F172A', // dark slate primary fill
}) => {
  return (
    <div className={`mb-12 ${className}`}>
      {subtitle && (
        <p className="text-xs uppercase tracking-widest text-indigo-600 font-bold mb-3 font-sans">
          {subtitle}
        </p>
      )}
      <div className="max-w-2xl">
        <StrokeText
          text={title}
          strokeColor={strokeColor}
          fillColor={fillColor}
          strokeWidth={1.8}
          drawDuration={1.4}
          fillDelay={0.15}
          stagger={0.04}
          ease="power2.out"
          trigger="scroll"
          fillMode="wipe"
          fontSize={52}
          fontWeight={800}
          letterSpacing={-1.8}
          fontFamily="'Sora', 'Plus Jakarta Sans', sans-serif"
        />
      </div>
    </div>
  );
};

