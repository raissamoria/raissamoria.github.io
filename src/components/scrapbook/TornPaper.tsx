import React from 'react';
import { TapePiece } from './TapePiece';

interface TornPaperProps {
  children: React.ReactNode;
  variant?: 'cream' | 'white' | 'mustard' | 'dark';
  className?: string;
  rotate?: number;
  withTape?: boolean;
  tapeColor?: 'cream' | 'yellow' | 'green' | 'blue';
  tapePosition?: 'top' | 'top-left' | 'top-right' | 'top-center';
  edgeType?: 'all' | 'top' | 'bottom' | 'subtle';
  onClick?: () => void;
}

export const TornPaper: React.FC<TornPaperProps> = ({
  children,
  variant = 'cream',
  className = '',
  rotate = 0,
  withTape = false,
  tapeColor = 'cream',
  tapePosition = 'top',
  edgeType = 'all',
  onClick,
}) => {
  const bgColors = {
    cream: 'bg-[#F2EBD9] text-[#1A1A1A]',
    white: 'bg-[#F8F6F0] text-[#1A1A1A]',
    mustard: 'bg-[#E8AF30] text-[#1A1A1A]',
    dark: 'bg-[#18181B] text-[#F8F6F0]',
  }[variant];

  const edgeClass = {
    all: 'torn-paper-card',
    top: 'torn-paper-edge-top',
    bottom: 'torn-paper-edge-bottom',
    subtle: 'rounded-sm border border-black/10',
  }[edgeType];

  return (
    <div
      style={{ transform: `rotate(${rotate}deg)` }}
      onClick={onClick}
      className={`relative paper-shadow ${bgColors} ${edgeClass} ${
        onClick ? 'cursor-pointer transition-transform duration-200 hover:-translate-y-1' : ''
      } ${className}`}
    >
      {withTape && (
        <>
          {tapePosition === 'top' && (
            <TapePiece
              variant={tapeColor}
              className="-top-3 left-1/2 -translate-x-1/2"
              rotate={rotate ? -rotate * 0.7 : -2}
              width="w-14"
              height="h-5"
            />
          )}
          {tapePosition === 'top-left' && (
            <TapePiece
              variant={tapeColor}
              className="-top-3 left-4"
              rotate={-12}
              width="w-12"
              height="h-4.5"
            />
          )}
          {tapePosition === 'top-right' && (
            <TapePiece
              variant={tapeColor}
              className="-top-3 right-4"
              rotate={14}
              width="w-12"
              height="h-4.5"
            />
          )}
          {tapePosition === 'top-center' && (
            <TapePiece
              variant={tapeColor}
              className="-top-3.5 left-1/2 -translate-x-1/2"
              rotate={1}
              width="w-16"
              height="h-5"
            />
          )}
        </>
      )}
      {children}
    </div>
  );
};
