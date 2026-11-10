/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { retroAudio } from './RetroAudio';

interface RetroDesktopIconProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  onOpen: () => void;
  className?: string;
}

export const RetroDesktopIcon: React.FC<RetroDesktopIconProps> = ({
  label,
  icon,
  onOpen,
  className = '',
}) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSelected(true);
    retroAudio.playClick();
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    retroAudio.playWindowOpen();
    onOpen();
  };

  return (
    <div
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      className={`
        group flex flex-col items-center justify-center p-2 rounded-none w-20 cursor-pointer select-none text-center
        transition-all duration-75
        ${isSelected 
          ? 'outline-1 outline-dotted outline-white/80 bg-[#000080]/30' 
          : 'hover:bg-white/10'
        }
        ${className}
      `}
    >
      {/* Icon */}
      <div className="w-10 h-10 flex items-center justify-center filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform">
        {icon}
      </div>

      {/* Label */}
      <span
        className={`
          mt-1 text-xs font-semibold px-1 py-0.5 rounded-none leading-tight tracking-wide
          ${isSelected 
            ? 'bg-[#000080] text-white outline-1 outline-dotted outline-white' 
            : 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]'
          }
        `}
      >
        {label}
      </span>
    </div>
  );
};
