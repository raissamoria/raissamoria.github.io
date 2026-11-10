/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { retroAudio } from './RetroAudio';

interface RetroButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  active?: boolean;
  variant?: 'default' | 'primary' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  playSound?: boolean;
}

export const RetroButton: React.FC<RetroButtonProps> = ({
  children,
  active = false,
  size = 'md',
  className = '',
  playSound = true,
  onClick,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (playSound) {
      retroAudio.playClick();
    }
    if (onClick) {
      onClick(e);
    }
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs font-semibold',
    md: 'px-3 py-1.5 text-sm font-semibold',
    lg: 'px-5 py-2 text-base font-bold',
  }[size];

  return (
    <button
      {...props}
      onClick={handleClick}
      className={`
        relative inline-flex items-center justify-center gap-1.5
        bg-[#C0C0C0] text-black font-sans cursor-pointer
        select-none active:translate-x-[1px] active:translate-y-[1px]
        ${active 
          ? 'border-t-2 border-l-2 border-[#404040] border-b-2 border-r-2 border-[#FFFFFF] shadow-[inset_1px_1px_0px_#000000]' 
          : 'border-t-2 border-l-2 border-[#FFFFFF] border-b-2 border-r-2 border-[#404040] shadow-[1px_1px_0px_#000000]'
        }
        hover:bg-[#D4D0C8]
        active:border-t-2 active:border-l-2 active:border-[#404040] active:border-b-2 active:border-r-2 active:border-[#FFFFFF]
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizeClasses}
        ${className}
      `}
    >
      {children}
    </button>
  );
};
