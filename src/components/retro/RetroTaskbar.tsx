/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { WinLogoIcon, SpeakerIcon, NetworkIcon } from './RetroIcons';
import { WindowState, Language } from './RetroTypes';
import { retroAudio } from './RetroAudio';

interface RetroTaskbarProps {
  windows: WindowState[];
  activeWindowId: string | null;
  startMenuOpen: boolean;
  language: Language;
  onToggleStartMenu: () => void;
  onWindowClick: (id: string) => void;
  onToggleLanguage: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const RetroTaskbar: React.FC<RetroTaskbarProps> = ({
  windows,
  activeWindowId,
  startMenuOpen,
  language,
  onToggleStartMenu,
  onWindowClick,
  onToggleLanguage,
  isMuted,
  onToggleMute,
}) => {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setTimeStr(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-[42px] bg-[#C0C0C0] border-t-2 border-white z-[9990] flex items-center justify-between px-1 select-none shadow-[0_-2px_4px_rgba(0,0,0,0.2)]">
      {/* 1. START BUTTON & OPEN WINDOWS */}
      <div className="flex items-center gap-1.5 flex-1 min-w-0 mr-2 overflow-x-auto overflow-y-hidden py-1">
        {/* Iniciar Button */}
        <button
          onClick={() => {
            retroAudio.playClick();
            onToggleStartMenu();
          }}
          className={`
            flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold shrink-0 cursor-pointer select-none
            ${startMenuOpen 
              ? 'border-t-2 border-l-2 border-[#404040] border-b-2 border-r-2 border-white bg-[#B0B0B0] shadow-[inset_1px_1px_0px_#000000] translate-x-[1px] translate-y-[1px]' 
              : 'border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] bg-[#C0C0C0] shadow-[1px_1px_0px_#000000] hover:bg-[#D4D0C8]'
            }
          `}
        >
          <WinLogoIcon className="w-4 h-4 shrink-0" />
          <span className="font-extrabold text-black">
            {language === 'pt' ? 'Iniciar' : 'Start'}
          </span>
        </button>

        {/* Vertical divider */}
        <div className="h-6 w-[2px] bg-[#808080] border-r border-white shrink-0 mx-0.5" />

        {/* Window Tabs in Taskbar */}
        <div className="flex items-center gap-1 min-w-0 overflow-x-auto py-0.5">
          {windows
            .filter((w) => w.isOpen)
            .map((w) => {
              const isActive = activeWindowId === w.id && !w.isMinimized;
              return (
                <button
                  key={w.id}
                  onClick={() => {
                    retroAudio.playClick();
                    onWindowClick(w.id);
                  }}
                  className={`
                    flex items-center gap-1.5 px-2 py-1 max-w-[170px] shrink-0 text-left cursor-pointer truncate
                    ${isActive 
                      ? 'border-t-2 border-l-2 border-[#404040] border-b-2 border-r-2 border-white bg-[#E0E0E0] shadow-[inset_1px_1px_0px_#000000] font-bold text-black' 
                      : 'border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] bg-[#C0C0C0] shadow-[1px_1px_0px_#000000] text-[#222222] hover:bg-[#D4D0C8]'
                    }
                  `}
                >
                  <span className="text-xs shrink-0">{w.iconType}</span>
                  <span className="text-xs truncate select-none">{w.title}</span>
                </button>
              );
            })}
        </div>
      </div>

      {/* 2. SYSTEM TRAY */}
      <div className="flex items-center gap-2 win-border-sunken-grey px-2 py-1 shrink-0 bg-[#C0C0C0]">
        {/* Sound toggle */}
        <button
          onClick={() => {
            retroAudio.playClick();
            onToggleMute();
          }}
          title={isMuted ? "Ativar som" : "Desativar som"}
          className="hover:bg-white/40 p-0.5 rounded cursor-pointer"
        >
          <SpeakerIcon muted={isMuted} className="w-3.5 h-3.5 text-black" />
        </button>

        {/* Network status */}
        <span title="Conectado à Internet" className="cursor-help">
          <NetworkIcon className="w-3.5 h-3.5 text-black" />
        </span>

        {/* Language button */}
        <button
          onClick={() => {
            retroAudio.playClick();
            onToggleLanguage();
          }}
          title="Alterar idioma (PT / EN)"
          className="text-[10px] font-extrabold uppercase px-1 py-0.5 bg-black/10 border border-black/30 rounded cursor-pointer hover:bg-black/20"
        >
          {language.toUpperCase()}
        </button>

        {/* Digital Clock */}
        <span className="text-xs font-mono font-bold text-black px-1 tracking-wider">
          {timeStr || '14:27'}
        </span>
      </div>
    </footer>
  );
};
