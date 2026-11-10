import React from 'react';

interface TapePieceProps {
  className?: string;
  variant?: 'cream' | 'yellow' | 'green' | 'blue';
  rotate?: number;
  width?: string;
  height?: string;
}

export const TapePiece: React.FC<TapePieceProps> = ({
  className = '',
  variant = 'cream',
  rotate = 0,
  width = 'w-12',
  height = 'h-5',
}) => {
  const variantClass = {
    cream: 'washi-tape',
    yellow: 'washi-tape-yellow',
    green: 'washi-tape-green',
    blue: 'bg-sky-200/70 border-l-2 border-r-2 border-dashed border-sky-400/30',
  }[variant];

  return (
    <div
      style={{ transform: `rotate(${rotate}deg)` }}
      className={`absolute z-20 pointer-events-none select-none rounded-[1px] ${width} ${height} ${variantClass} ${className}`}
      aria-hidden="true"
    />
  );
};
