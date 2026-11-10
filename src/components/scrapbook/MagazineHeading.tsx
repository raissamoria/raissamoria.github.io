import React from 'react';
import { motion } from 'motion/react';

interface CutoutLetter {
  char: string;
  bg: 'cream' | 'white' | 'dark' | 'teal' | 'mustard';
  rotate: number;
  textColor?: string;
  size?: 'normal' | 'large' | 'huge';
  offsetY?: number;
}

interface MagazineHeadingProps {
  className?: string;
}

// Preset cutouts for "RAÍSSA" to match the reference image exactly
export const MagazineRaissa: React.FC<{ className?: string }> = ({ className = '' }) => {
  const letters: CutoutLetter[] = [
    { char: 'R', bg: 'dark', rotate: -2.5, textColor: 'text-[#F8F6F0]', offsetY: -2 },
    { char: 'A', bg: 'cream', rotate: 2, textColor: 'text-[#073859]', offsetY: 3 },
    { char: 'Í', bg: 'teal', rotate: -1.5, textColor: 'text-[#F8F6F0]', offsetY: -1 },
    { char: 'S', bg: 'cream', rotate: 2.8, textColor: 'text-[#1A1A1A]', offsetY: 2 },
    { char: 'S', bg: 'dark', rotate: -2, textColor: 'text-[#F8F6F0]', offsetY: -3 },
    { char: 'A', bg: 'mustard', rotate: 1.5, textColor: 'text-[#1A1A1A]', offsetY: 1 },
  ];

  const bgClasses = {
    cream: 'bg-[#F2EBD9] border-t-2 border-l border-white/60 border-b-2 border-r border-black/20',
    white: 'bg-[#F8F6F0] border border-black/15',
    dark: 'bg-[#18181B] border border-white/20',
    teal: 'bg-[#2D7F8C] border border-white/30',
    mustard: 'bg-[#E8AF30] border border-amber-900/20',
  };

  return (
    <div className={`flex flex-wrap items-center justify-start gap-1 sm:gap-2 select-none ${className}`}>
      {letters.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 15, rotate: item.rotate * 2 }}
          animate={{ opacity: 1, y: 0, rotate: item.rotate }}
          transition={{ duration: 0.35, delay: 0.15 + idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.08, rotate: item.rotate * -1, transition: { duration: 0.15 } }}
          style={{
            transform: `rotate(${item.rotate}deg) translateY(${item.offsetY || 0}px)`,
          }}
          className={`relative px-3 sm:px-5 md:px-6 py-2 sm:py-3.5 paper-shadow rounded-[3px] font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none ${bgClasses[item.bg]} ${item.textColor}`}
        >
          {/* Subtle realistic paper fiber edge */}
          <span className="block drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)]">
            {item.char}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

// Preset for "OI, EU SOU" / "HI, I AM"
export const MagazineIntroText: React.FC<{ language: 'pt' | 'en'; className?: string }> = ({
  language,
  className = '',
}) => {
  const words = language === 'pt' ? [
    { text: 'OI,', bg: 'white', rotate: -1.5, textCol: 'text-[#1A1A1A]' },
    { text: 'EU', bg: 'dark', rotate: 2, textCol: 'text-[#F8F6F0]' },
    { text: 'SOU', bg: 'cream', rotate: -1, textCol: 'text-[#073859]' },
  ] : [
    { text: 'HI,', bg: 'white', rotate: -1.5, textCol: 'text-[#1A1A1A]' },
    { text: 'I', bg: 'dark', rotate: 2, textCol: 'text-[#F8F6F0]' },
    { text: 'AM', bg: 'cream', rotate: -1, textCol: 'text-[#073859]' },
  ];

  return (
    <div className={`flex flex-wrap items-center gap-2 select-none ${className}`}>
      {words.map((w, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10, rotate: w.rotate * 1.5 }}
          animate={{ opacity: 1, y: 0, rotate: w.rotate }}
          transition={{ duration: 0.3, delay: idx * 0.08 }}
          whileHover={{ scale: 1.05 }}
          style={{ transform: `rotate(${w.rotate}deg)` }}
          className={`px-3 sm:px-4 py-1.5 paper-shadow font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider leading-none rounded-[2px] ${
            w.bg === 'dark' ? 'bg-[#18181B] text-[#F8F6F0] border border-white/20' :
            w.bg === 'cream' ? 'bg-[#F2EBD9] text-[#073859] border border-black/10' :
            'bg-[#F8F6F0] text-[#1A1A1A] border border-black/10'
          }`}
        >
          {w.text}
        </motion.div>
      ))}
    </div>
  );
};

// Preset for "Projetos em destaque" / "Featured Projects"
export const MagazineFeaturedHeader: React.FC<{ language: 'pt' | 'en'; className?: string }> = ({
  language,
  className = '',
}) => {
  return language === 'pt' ? (
    <div className={`flex flex-wrap items-center gap-2 select-none ${className}`}>
      <div 
        style={{ transform: 'rotate(-1.5deg)' }}
        className="px-4 py-1.5 bg-[#F8F6F0] text-[#1A1A1A] paper-shadow font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide rounded-[2px] border border-black/10"
      >
        Projetos
      </div>
      <div 
        style={{ transform: 'rotate(2deg)' }}
        className="px-2.5 py-1 bg-[#2D7F8C] text-[#F8F6F0] paper-shadow font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide rounded-[2px] border border-white/20"
      >
        em
      </div>
      <div 
        style={{ transform: 'rotate(-0.8deg)' }}
        className="px-4 py-1.5 bg-[#F2EBD9] text-[#073859] paper-shadow font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide rounded-[2px] border border-black/10"
      >
        destaque
      </div>
    </div>
  ) : (
    <div className={`flex flex-wrap items-center gap-2 select-none ${className}`}>
      <div 
        style={{ transform: 'rotate(-1.5deg)' }}
        className="px-4 py-1.5 bg-[#F8F6F0] text-[#1A1A1A] paper-shadow font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide rounded-[2px] border border-black/10"
      >
        Featured
      </div>
      <div 
        style={{ transform: 'rotate(1.5deg)' }}
        className="px-4 py-1.5 bg-[#F2EBD9] text-[#073859] paper-shadow font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide rounded-[2px] border border-black/10"
      >
        Projects
      </div>
    </div>
  );
};
