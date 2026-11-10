import React from 'react';

// Hand-drawn yellow or cream sun/star rays (like near "Raíssa" and "OI, EU SOU")
export const SunRaysDoodle: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = '#E8AF30',
}) => (
  <svg
    viewBox="0 0 40 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-7 h-5 pointer-events-none select-none ${className}`}
  >
    <path
      d="M6 24L2 14M18 20L22 4M32 24L38 12"
      stroke={color}
      strokeWidth="3.2"
      strokeLinecap="round"
    />
  </svg>
);

// Ocean wave doodle (like the blue waves under "Crio experiências...")
export const WaveDoodle: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = '#2D7F8C',
}) => (
  <svg
    viewBox="0 0 70 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-14 h-4 pointer-events-none select-none ${className}`}
  >
    <path
      d="M3 14C8 14 11 6 18 6C25 6 27 14 34 14C41 14 44 6 51 6C58 6 62 14 67 14"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 18C14 18 17 12 23 12C29 12 32 18 38 18C44 18 47 12 53 12C57 12 60 16 64 16"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.75"
    />
  </svg>
);

// Hand-drawn Compass Rose (N, E, S, W) as seen in the reference image
export const CompassRoseDoodle: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative flex items-center justify-center font-display text-[#F8F6F0]/80 select-none ${className}`}>
    <svg viewBox="0 0 60 60" fill="none" className="w-12 h-12 stroke-[#F8F6F0]/70">
      {/* Circle with dashed lines */}
      <circle cx="30" cy="30" r="22" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
      {/* 4 points */}
      <path d="M30 4L34 26L30 30L26 26Z" fill="#F8F6F0" opacity="0.85" />
      <path d="M30 56L34 34L30 30L26 34Z" fill="#F8F6F0" opacity="0.4" />
      <path d="M56 30L34 34L30 30L34 26Z" fill="#F8F6F0" opacity="0.5" />
      <path d="M4 30L26 34L30 30L26 26Z" fill="#F8F6F0" opacity="0.5" />
    </svg>
    <span className="absolute -top-3 text-[10px] font-typewriter text-[#F8F6F0]">N</span>
    <span className="absolute -bottom-3 text-[10px] font-typewriter text-[#F8F6F0]/70">S</span>
    <span className="absolute -left-3 text-[10px] font-typewriter text-[#F8F6F0]/70">W</span>
    <span className="absolute -right-3 text-[10px] font-typewriter text-[#F8F6F0]/70">E</span>
  </div>
);

// Hand-drawn brush underline stroke
export const HandUnderlineDoodle: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = '#E8AF30',
}) => (
  <svg
    viewBox="0 0 160 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-36 h-3 pointer-events-none select-none ${className}`}
  >
    <path
      d="M2 9C35 4 80 12 158 5C110 8 50 12 15 13"
      stroke={color}
      strokeWidth="3.5"
      strokeLinecap="round"
    />
  </svg>
);
