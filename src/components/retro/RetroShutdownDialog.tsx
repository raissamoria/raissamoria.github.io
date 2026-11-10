/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { RetroButton } from './RetroButton';
import { WinLogoIcon } from './RetroIcons';
import { retroAudio } from './RetroAudio';

interface RetroShutdownDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onResetWindows: () => void;
  onMaximizeMain: () => void;
}

export const RetroShutdownDialog: React.FC<RetroShutdownDialogProps> = ({
  isOpen,
  onClose,
  onResetWindows,
  onMaximizeMain,
}) => {
  const [selectedOption, setSelectedOption] = useState<'reset' | 'maximize' | 'refresh'>('reset');

  if (!isOpen) return null;

  const handleConfirm = () => {
    retroAudio.playClick();
    if (selectedOption === 'reset') {
      onResetWindows();
    } else if (selectedOption === 'maximize') {
      onMaximizeMain();
    } else {
      window.location.reload();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[99999] bg-black/40 backdrop-blur-[1px] flex items-center justify-center p-4">
      <div className="win-border-raised bg-[#C0C0C0] w-full max-w-sm text-black shadow-2xl p-1 select-none">
        {/* Title bar */}
        <div className="win-titlebar-active flex items-center justify-between px-2 py-1">
          <div className="flex items-center gap-1.5">
            <WinLogoIcon className="w-3.5 h-3.5" />
            <span className="font-bold text-xs text-white">Desligar o Raíssa OS 98</span>
          </div>
          <button
            onClick={() => {
              retroAudio.playClick();
              onClose();
            }}
            className="w-4 h-4 bg-[#C0C0C0] text-black font-bold text-[10px] flex items-center justify-center border-t border-l border-white border-b border-r border-[#404040] shadow-[0.5px_0.5px_0px_#000000] cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex gap-4 items-start">
          <div className="w-10 h-10 shrink-0 flex items-center justify-center">
            <WinLogoIcon className="w-8 h-8" />
          </div>

          <div className="flex-1 text-xs">
            <p className="font-bold mb-3">O que você deseja fazer?</p>

            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="shutdown_opt"
                  checked={selectedOption === 'reset'}
                  onChange={() => setSelectedOption('reset')}
                  className="accent-[#000080]"
                />
                <span>Restaurar layout inicial das janelas</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="shutdown_opt"
                  checked={selectedOption === 'maximize'}
                  onChange={() => setSelectedOption('maximize')}
                  className="accent-[#000080]"
                />
                <span>Modo Apresentação (maximizar janela principal)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="shutdown_opt"
                  checked={selectedOption === 'refresh'}
                  onChange={() => setSelectedOption('refresh')}
                  className="accent-[#000080]"
                />
                <span>Reiniciar sessão do sistema</span>
              </label>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2 p-2 bg-[#C0C0C0] border-t border-[#808080]">
          <RetroButton size="sm" onClick={handleConfirm} className="w-20">
            OK
          </RetroButton>
          <RetroButton size="sm" onClick={onClose} className="w-20">
            Cancelar
          </RetroButton>
        </div>
      </div>
    </div>
  );
};
