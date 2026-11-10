/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { retroAudio } from './RetroAudio';

interface RetroWindowProps {
  id: string;
  title: string;
  icon?: React.ReactNode;
  isOpen: boolean;
  isMinimized?: boolean;
  isMaximized?: boolean;
  isActive?: boolean;
  zIndex?: number;
  initialPosition?: { x: number; y: number };
  width?: string | number;
  height?: string | number;
  minWidth?: string | number;
  minHeight?: string | number;
  className?: string;
  onFocus?: () => void;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  showMinimize?: boolean;
  showMaximize?: boolean;
  showClose?: boolean;
  menuBar?: React.ReactNode;
  statusBar?: React.ReactNode;
  children: React.ReactNode;
}

export const RetroWindow: React.FC<RetroWindowProps> = ({
  id,
  title,
  icon,
  isOpen,
  isMinimized = false,
  isMaximized = false,
  isActive = true,
  zIndex = 10,
  initialPosition = { x: 40, y: 40 },
  width,
  height,
  className = '',
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  showMinimize = true,
  showMaximize = true,
  showClose = true,
  menuBar,
  statusBar,
  children,
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  // Synchronize initial position if changed externally
  useEffect(() => {
    setPosition(initialPosition);
  }, [initialPosition.x, initialPosition.y]);

  // Handle Dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only drag from title bar, not buttons
    if ((e.target as HTMLElement).closest('button')) return;
    if (isMaximized) return;

    if (onFocus) onFocus();
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || isMaximized) return;
      const newX = Math.max(10, Math.min(window.innerWidth - 120, e.clientX - dragOffset.x));
      const newY = Math.max(10, Math.min(window.innerHeight - 80, e.clientY - dragOffset.y));
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      if (isDragging) setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, isMaximized]);

  if (!isOpen || isMinimized) {
    return null;
  }

  // Position & sizing logic
  const windowStyle: React.CSSProperties = isMaximized
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: '42px', // space for taskbar
        zIndex,
        width: '100%',
        height: 'calc(100vh - 42px)',
      }
    : {
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex,
        width: width || 'auto',
        maxWidth: 'calc(100vw - 32px)',
        height: height || 'auto',
        maxHeight: 'calc(100vh - 80px)',
      };

  return (
    <div
      ref={windowRef}
      onMouseDown={onFocus}
      style={windowStyle}
      className={`
        bg-[#C0C0C0] text-black win-border-raised flex flex-col select-none
        shadow-[3px_3px_10px_rgba(0,0,0,0.45)]
        ${isDragging ? 'opacity-95' : 'opacity-100'}
        ${className}
      `}
    >
      {/* 1. TITLE BAR */}
      <div
        onMouseDown={handleMouseDown}
        onDoubleClick={onMaximize}
        className={`
          flex items-center justify-between px-1.5 py-1 select-none cursor-move
          ${isActive ? 'win-titlebar-active' : 'win-titlebar-inactive'}
        `}
      >
        {/* Left: Icon & Title */}
        <div className="flex items-center gap-1.5 min-w-0 pr-2">
          {icon && <div className="shrink-0 flex items-center justify-center">{icon}</div>}
          <span className="font-bold text-xs sm:text-sm tracking-wide truncate select-none text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
            {title}
          </span>
        </div>

        {/* Right: Window Controls (_ □ X) */}
        <div className="flex items-center gap-0.5 shrink-0" onMouseDown={(e) => e.stopPropagation()}>
          {showMinimize && (
            <button
              onClick={() => {
                retroAudio.playClick();
                if (onMinimize) onMinimize();
              }}
              title="Minimizar"
              className="w-4 h-4 bg-[#C0C0C0] text-black font-bold text-[10px] flex items-center justify-center border-t border-l border-white border-b border-r border-[#404040] shadow-[0.5px_0.5px_0px_#000000] active:border-t-black active:border-l-black active:border-b-white active:border-r-white cursor-pointer"
            >
              <span className="-mt-1">_</span>
            </button>
          )}

          {showMaximize && (
            <button
              onClick={() => {
                retroAudio.playClick();
                if (onMaximize) onMaximize();
              }}
              title={isMaximized ? "Restaurar" : "Maximizar"}
              className="w-4 h-4 bg-[#C0C0C0] text-black font-bold text-[10px] flex items-center justify-center border-t border-l border-white border-b border-r border-[#404040] shadow-[0.5px_0.5px_0px_#000000] active:border-t-black active:border-l-black active:border-b-white active:border-r-white cursor-pointer"
            >
              {isMaximized ? (
                <span className="text-[9px]">❐</span>
              ) : (
                <span className="w-2.5 h-2 border border-black inline-block" />
              )}
            </button>
          )}

          {showClose && (
            <button
              onClick={() => {
                retroAudio.playClick();
                if (onClose) onClose();
              }}
              title="Fechar"
              className="w-4 h-4 bg-[#C0C0C0] text-black font-bold text-[10px] flex items-center justify-center border-t border-l border-white border-b border-r border-[#404040] shadow-[0.5px_0.5px_0px_#000000] active:border-t-black active:border-l-black active:border-b-white active:border-r-white cursor-pointer hover:bg-[#E8AF30]"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* 2. OPTIONAL MENU BAR */}
      {menuBar && (
        <div className="bg-[#C0C0C0] border-b border-[#808080] px-2 py-0.5 text-xs text-black flex items-center gap-3">
          {menuBar}
        </div>
      )}

      {/* 3. WINDOW BODY / CONTENT AREA */}
      <div className="flex-1 overflow-auto win-border-sunken-grey m-1 bg-[#F5F5F0] text-black">
        {children}
      </div>

      {/* 4. OPTIONAL STATUS BAR */}
      {statusBar && (
        <div className="bg-[#C0C0C0] border-t border-[#808080] px-2 py-1 text-[11px] text-[#333333] flex items-center justify-between select-none">
          {statusBar}
        </div>
      )}
    </div>
  );
};
