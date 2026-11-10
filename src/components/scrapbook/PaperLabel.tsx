import React from 'react';
import { TapePiece } from './TapePiece';

interface PaperLabelProps {
  children: React.ReactNode;
  rotate?: number;
  variant?: 'cream' | 'white' | 'mustard' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  withTape?: boolean;
  tapePosition?: 'top' | 'left' | 'right' | 'top-right' | 'top-left';
  className?: string;
  onClick?: () => void;
}

export const PaperLabel: React.FC<PaperLabelProps> = ({
  children,
  rotate = 0,
  variant = 'cream',
  size = 'md',
  withTape = false,
  tapePosition = 'top',
  className = '',
  onClick,
}) => {
  const bgStyles = {
    cream: 'bg-[#F2EBD9] text-[#1A1A1A] border-t border-l border-white/60 border-b border-r border-black/15',
    white: 'bg-[#F8F6F0] text-[#1A1A1A] border border-black/10',
    mustard: 'bg-[#E8AF30] text-[#1A1A1A] border border-amber-600/20 font-bold',
    dark: 'bg-[#1A1A1A] text-[#F8F6F0] border border-white/20',
  }[variant];

  const sizeStyles = {
    sm: 'px-2.5 py-0.5 text-xs tracking-wider',
    md: 'px-3.5 py-1 text-sm tracking-wider',
    lg: 'px-5 py-2 text-base font-bold tracking-widest',
  }[size];

  return (
    <div
      style={{ transform: `rotate(${rotate}deg)` }}
      onClick={onClick}
      className={`relative inline-block select-none font-typewriter paper-shadow rounded-[2px] transition-transform duration-200 ${bgStyles} ${sizeStyles} ${
        onClick ? 'cursor-pointer hover:scale-105 hover:-rotate-1 active:scale-95' : ''
      } ${className}`}
    >
      {withTape && (
        <>
          {tapePosition === 'top' && (
            <TapePiece className="-top-2 left-1/2 -translate-x-1/2" rotate={rotate ? -rotate * 0.5 : 2} width="w-8" height="h-3.5" />
          )}
          {tapePosition === 'top-left' && (
            <TapePiece className="-top-2 -left-2" rotate={-15} width="w-7" height="h-3" />
          )}
          {tapePosition === 'top-right' && (
            <TapePiece className="-top-2 -right-2" rotate={18} width="w-7" height="h-3" />
          )}
        </>
      )}
      {children}
    </div>
  );
};
