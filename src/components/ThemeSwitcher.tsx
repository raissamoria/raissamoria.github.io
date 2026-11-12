/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export type PaletteId = 'original' | 'lavender' | 'electric' | 'matcha' | 'cherry' | 'chocolate' | 'mono';
export type ThemeMode = 'dark' | 'light';

export interface PaletteInfo {
  id: PaletteId;
  namePt: string;
  nameEn: string;
  accent: string;
  previewBg: string;
  previewText: string;
  defaultMode: ThemeMode;
}

export const PALETTES: PaletteInfo[] = [
  {
    id: 'original',
    namePt: 'Original',
    nameEn: 'Original',
    accent: '#FFFFFF',
    previewBg: '#050505',
    previewText: '#FFFFFF',
    defaultMode: 'dark',
  },
  {
    id: 'lavender',
    namePt: 'Lavender',
    nameEn: 'Lavender',
    accent: '#F1A1D1',
    previewBg: '#40334B',
    previewText: '#F1A1D1',
    defaultMode: 'dark',
  },
  {
    id: 'electric',
    namePt: 'Electric',
    nameEn: 'Electric',
    accent: '#E7FF65',
    previewBg: '#1935D0',
    previewText: '#E7FF65',
    defaultMode: 'dark',
  },
  {
    id: 'matcha',
    namePt: 'Matcha',
    nameEn: 'Matcha',
    accent: '#284936',
    previewBg: '#DCE6CF',
    previewText: '#284936',
    defaultMode: 'light',
  },
  {
    id: 'cherry',
    namePt: 'Cherry',
    nameEn: 'Cherry',
    accent: '#8C1738',
    previewBg: '#F6B4C7',
    previewText: '#8C1738',
    defaultMode: 'light',
  },
  {
    id: 'chocolate',
    namePt: 'Chocolate',
    nameEn: 'Chocolate',
    accent: '#F5D7AB',
    previewBg: '#43281E',
    previewText: '#F5D7AB',
    defaultMode: 'dark',
  },
  {
    id: 'mono',
    namePt: 'Mono',
    nameEn: 'Mono',
    accent: '#F5F5F5',
    previewBg: '#111111',
    previewText: '#F5F5F5',
    defaultMode: 'dark',
  },
];

const STORAGE_PALETTE_KEY = 'portfolio_color_palette_v2';
const STORAGE_MODE_KEY = 'portfolio_theme_mode_v2';

export const ThemeSwitcher: React.FC<{ language?: 'pt' | 'en' }> = ({ language = 'pt' }) => {
  const [palette, setPalette] = useState<PaletteId>(() => {
    try {
      const saved = (localStorage.getItem(STORAGE_PALETTE_KEY) || localStorage.getItem('portfolio_color_palette_v1')) as PaletteId;
      if (saved === ('default' as any)) return 'original';
      if (PALETTES.some((p) => p.id === saved)) return saved;
    } catch {
      // Ignore
    }
    return 'original';
  });

  const [mode, setMode] = useState<ThemeMode>(() => {
    try {
      const saved = (localStorage.getItem(STORAGE_MODE_KEY) || localStorage.getItem('portfolio_theme_mode_v1')) as ThemeMode;
      if (saved === 'dark' || saved === 'light') return saved;
    } catch {
      // Ignore
    }
    return 'dark';
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastTimer, setToastTimer] = useState<NodeJS.Timeout | null>(null);

  // Sync with documentElement attributes
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', palette);
    root.setAttribute('data-mode', mode);

    try {
      localStorage.setItem(STORAGE_PALETTE_KEY, palette);
      localStorage.setItem(STORAGE_MODE_KEY, mode);
    } catch {
      // Ignore
    }
  }, [palette, mode]);

  const showToast = useCallback((msg: string) => {
    if (toastTimer) clearTimeout(toastTimer);
    setToastMessage(msg);
    const t = setTimeout(() => {
      setToastMessage(null);
    }, 1800);
    setToastTimer(t);
  }, [toastTimer]);

  // Mode Toggle (Sun / Moon) - toggles between dark/light luminance for active palette
  const handleToggleMode = () => {
    setMode((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      const label = next === 'dark' 
        ? (language === 'pt' ? 'Modo Escuro' : 'Dark Mode') 
        : (language === 'pt' ? 'Modo Claro' : 'Light Mode');
      showToast(label);
      return next;
    });
  };

  // Palette Cycle (Vertical bars) - cycles through all 7 palettes
  const handleCyclePalette = () => {
    const currentIndex = PALETTES.findIndex((p) => p.id === palette);
    const nextIndex = (currentIndex + 1) % PALETTES.length;
    const nextPalette = PALETTES[nextIndex];
    setPalette(nextPalette.id);
    setMode(nextPalette.defaultMode);
    const label = language === 'pt' ? `Paleta: ${nextPalette.namePt}` : `Palette: ${nextPalette.nameEn}`;
    showToast(label);
  };

  const isPt = language === 'pt';
  const currentPaletteInfo = PALETTES.find((p) => p.id === palette) || PALETTES[0];

  return (
    <aside 
      aria-label={isPt ? "Controlo de Cores e Tema" : "Theme & Color Controls"}
      className="fixed bottom-6 left-6 z-50 flex items-end gap-3 select-none pointer-events-auto"
    >
      {/* Action Buttons Stack (Vertical 2-button control inspired by billysweeney.com) */}
      <div className="flex flex-col gap-2.5 items-center">
        
        {/* Button 1: Mode Toggle (Sun / Moon) */}
        <button
          onClick={handleToggleMode}
          type="button"
          aria-label={
            mode === 'dark'
              ? (isPt ? 'Mudar para modo claro' : 'Switch to light mode')
              : (isPt ? 'Mudar para modo escuro' : 'Switch to dark mode')
          }
          className="group relative w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95 theme-switch-btn shadow-lg"
          style={{
            background: 'var(--glass-bg, rgba(255, 255, 255, 0.08))',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderColor: 'var(--glass-border, rgba(255, 255, 255, 0.16))',
            borderWidth: '1px',
            borderStyle: 'solid',
            color: 'var(--text-primary, #ffffff)',
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mode === 'dark' ? (
              <motion.div
                key="sun"
                initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 45, scale: 0.6 }}
                transition={{ duration: 0.25 }}
              >
                <Sun className="w-4 h-4 transition-transform group-hover:rotate-45" />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 45, scale: 0.6 }}
                transition={{ duration: 0.25 }}
              >
                <Moon className="w-4 h-4 transition-transform group-hover:-rotate-12" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        {/* Button 2: Palette Cycle (Vertical bars icon inspired by billysweeney.com) */}
        <button
          onClick={handleCyclePalette}
          type="button"
          aria-label={isPt ? 'Alterar paleta de cores' : 'Change color palette'}
          className="group relative w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95 theme-switch-btn shadow-lg"
          style={{
            background: 'var(--glass-bg, rgba(255, 255, 255, 0.08))',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderColor: 'var(--glass-border, rgba(255, 255, 255, 0.16))',
            borderWidth: '1px',
            borderStyle: 'solid',
            color: 'var(--text-primary, #ffffff)',
          }}
        >
          {/* Vertical parallel bars icon */}
          <div className="flex items-center gap-[3px] transition-transform duration-300 group-hover:scale-110">
            <span 
              className="w-[2.5px] h-3.5 rounded-full transition-all duration-300"
              style={{ background: 'var(--accent-color, #ffffff)' }}
            />
            <span 
              className="w-[2.5px] h-5 rounded-full transition-all duration-300"
              style={{ background: 'var(--text-primary, #ffffff)' }}
            />
            <span 
              className="w-[2.5px] h-2.5 rounded-full transition-all duration-300"
              style={{ background: 'var(--accent-color, #ffffff)' }}
            />
          </div>
        </button>

      </div>

      {/* Floating Toast Feedback Label */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, x: -10, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -6, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mb-1 pointer-events-none"
          >
            <div 
              className="px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-wider uppercase font-semibold shadow-xl border flex items-center gap-2"
              style={{
                background: 'var(--bg-surface, #141416)',
                borderColor: 'var(--border-color, rgba(255, 255, 255, 0.15))',
                color: 'var(--text-primary, #ffffff)',
              }}
            >
              <span 
                className="w-2.5 h-2.5 rounded-full shrink-0 shadow-xs border border-black/20"
                style={{ background: currentPaletteInfo.previewBg }}
              />
              <span>{toastMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
};
