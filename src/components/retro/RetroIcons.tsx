/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

// Windows 95 4-Color Flying Tiles Logo
export const WinLogoIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 16 16" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Red Top-Left */}
    <path d="M1 2H7V8H1V2Z" fill="#FF0000" />
    <path d="M2 1H7V2H2V1Z" fill="#FFAAAA" />
    {/* Green Top-Right */}
    <path d="M8 2H14V8H8V2Z" fill="#00AA00" />
    <path d="M9 1H14V2H9V1Z" fill="#AAFFAA" />
    {/* Blue Bottom-Left */}
    <path d="M1 9H7V15H1V9Z" fill="#0000AA" />
    <path d="M2 8H7V9H2V8Z" fill="#AAAAFF" />
    {/* Yellow Bottom-Right */}
    <path d="M8 9H14V15H8V9Z" fill="#FFFF00" />
    <path d="M9 8H14V9H9V8Z" fill="#FFFFCC" />
    {/* Dots / trail */}
    <rect x="14" y="3" width="1" height="1" fill="#000" />
    <rect x="15" y="4" width="1" height="1" fill="#000" />
    <rect x="14" y="10" width="1" height="1" fill="#000" />
    <rect x="15" y="11" width="1" height="1" fill="#000" />
  </svg>
);

// Recycle Bin (Lixeira)
export const RecycleBinIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="4" width="16" height="3" fill="#A0A0A0" stroke="#000000" strokeWidth="1" />
    <polygon points="6,7 26,7 23,28 9,28" fill="#E8E8E8" stroke="#000000" strokeWidth="1.5" />
    <path d="M9 11L12 26" stroke="#00AA00" strokeWidth="2" strokeLinecap="round" />
    <path d="M23 11L20 26" stroke="#00AA00" strokeWidth="2" strokeLinecap="round" />
    <path d="M16 10L16 27" stroke="#00AA00" strokeWidth="2" strokeLinecap="round" />
    {/* Green recycle arrows */}
    <path d="M13 16L16 13L19 16" fill="none" stroke="#008000" strokeWidth="2" />
  </svg>
);

// Folder Icon Base
export const FolderIcon: React.FC<{ badge?: 'plane' | 'leaf' | 'wave' | 'code'; className?: string }> = ({ badge, className = "w-8 h-8" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Back tab */}
    <polygon points="3,7 13,7 15,10 28,10 28,26 3,26" fill="#D4AF37" stroke="#4A3B00" strokeWidth="1" />
    {/* Front flap */}
    <polygon points="2,12 29,12 27,27 2,27" fill="#FFDE59" stroke="#4A3B00" strokeWidth="1" />
    <path d="M3 13H28" stroke="#FFE98A" strokeWidth="1" />

    {/* Optional badge overlay */}
    {badge === 'plane' && (
      <g transform="translate(14, 13)">
        <polygon points="6,2 12,8 7,9 5,12 3,9 0,8" fill="#0055AA" stroke="#000" strokeWidth="0.5" />
      </g>
    )}
    {badge === 'leaf' && (
      <g transform="translate(13, 14)">
        <path d="M2 10C2 4 9 2 9 2C9 2 11 8 5 10C3 11 2 10 2 10Z" fill="#15803D" stroke="#052E16" strokeWidth="0.8" />
        <path d="M3 9L8 4" stroke="#86EFAC" strokeWidth="0.8" />
      </g>
    )}
    {badge === 'wave' && (
      <g transform="translate(12, 14)">
        <path d="M1 9C3 6 6 5 8 7C10 9 12 7 13 5" fill="none" stroke="#0284C7" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M2 6C4 3 7 4 8 5" fill="none" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    )}
  </svg>
);

// CRT Desktop PC Icon (Projetos)
export const RetroComputerIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Monitor */}
    <rect x="5" y="4" width="22" height="17" fill="#D4D0C8" stroke="#000" strokeWidth="1" />
    <rect x="7" y="6" width="18" height="13" fill="#008080" stroke="#808080" strokeWidth="1" />
    <rect x="8" y="7" width="16" height="11" fill="#000080" />
    {/* Screen code lines */}
    <line x1="10" y1="9" x2="16" y2="9" stroke="#00FF00" strokeWidth="1" />
    <line x1="10" y1="12" x2="21" y2="12" stroke="#FFFFFF" strokeWidth="1" />
    <line x1="10" y1="15" x2="18" y2="15" stroke="#FFFF00" strokeWidth="1" />
    {/* Stand */}
    <rect x="13" y="21" width="6" height="3" fill="#A0A0A0" stroke="#000" strokeWidth="0.8" />
    <polygon points="9,24 23,24 25,26 7,26" fill="#D4D0C8" stroke="#000" strokeWidth="0.8" />
    {/* Keyboard */}
    <polygon points="4,27 28,27 27,30 5,30" fill="#E0DCD4" stroke="#000" strokeWidth="0.8" />
    <line x1="7" y1="28.5" x2="25" y2="28.5" stroke="#808080" strokeWidth="1" strokeDasharray="1,1" />
  </svg>
);

// Mail Envelope (Contacto)
export const RetroMailIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="8" width="24" height="16" fill="#FFFBEB" stroke="#000" strokeWidth="1.2" />
    <polygon points="4,8 16,18 28,8" fill="#FEF3C7" stroke="#000" strokeWidth="1" />
    <line x1="4" y1="24" x2="13" y2="16" stroke="#D97706" strokeWidth="0.8" />
    <line x1="28" y1="24" x2="19" y2="16" stroke="#D97706" strokeWidth="0.8" />
    {/* Red postage stamp */}
    <rect x="22" y="10" width="4" height="5" fill="#EF4444" stroke="#991B1B" strokeWidth="0.5" />
  </svg>
);

// Document Notepad (Sobre)
export const RetroDocumentIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="7,4 20,4 25,9 25,28 7,28" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />
    <polygon points="20,4 20,9 25,9" fill="#D4D0C8" stroke="#000000" strokeWidth="1" />
    <line x1="10" y1="12" x2="22" y2="12" stroke="#000080" strokeWidth="1" />
    <line x1="10" y1="15" x2="22" y2="15" stroke="#000080" strokeWidth="1" />
    <line x1="10" y1="18" x2="22" y2="18" stroke="#000080" strokeWidth="1" />
    <line x1="10" y1="21" x2="18" y2="21" stroke="#000080" strokeWidth="1" />
    <line x1="10" y1="24" x2="15" y2="24" stroke="#EF4444" strokeWidth="1" />
  </svg>
);

// Signal / Chart (Trajetória)
export const RetroChartIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="5" width="24" height="22" fill="#E5E7EB" stroke="#000" strokeWidth="1" />
    <line x1="6" y1="24" x2="26" y2="24" stroke="#000" strokeWidth="1" />
    <rect x="8" y="17" width="3" height="7" fill="#3B82F6" stroke="#000" strokeWidth="0.8" />
    <rect x="14" y="11" width="3" height="13" fill="#10B981" stroke="#000" strokeWidth="0.8" />
    <rect x="20" y="7" width="3" height="17" fill="#F59E0B" stroke="#000" strokeWidth="0.8" />
  </svg>
);

// Pixel Hourglass (Ampulheta)
export const PixelHourglassIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 16 16" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="1" width="12" height="2" fill="#D97706" />
    <rect x="2" y="13" width="12" height="2" fill="#D97706" />
    <path d="M3 3H13L9 8L13 13H3L7 8L3 3Z" fill="#FDE68A" stroke="#000" strokeWidth="0.8" />
    <circle cx="8" cy="10" r="1.5" fill="#B45309" />
  </svg>
);

// Pixel Heart Box
export const PixelHeartBoxIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" fill="#E9D5FF" stroke="#000000" strokeWidth="1.2" />
    <path 
      d="M7 6C5.5 6 4 7.5 4 9.5C4 13 9 17 12 19C15 17 20 13 20 9.5C20 7.5 18.5 6 17 6C15 6 13 8 12 9C11 8 9 6 7 6Z" 
      fill="#EC4899" 
      stroke="#831843" 
      strokeWidth="0.8" 
    />
  </svg>
);

// Pixel Earth Globe
export const PixelEarthGlobe: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="15" r="10" fill="#3B82F6" stroke="#000" strokeWidth="1.2" />
    {/* Continents pixel blobs */}
    <rect x="11" y="9" width="4" height="3" fill="#22C55E" />
    <rect x="13" y="12" width="6" height="4" fill="#22C55E" />
    <rect x="10" y="16" width="3" height="4" fill="#22C55E" />
    <rect x="19" y="11" width="3" height="3" fill="#22C55E" />
    <rect x="17" y="17" width="5" height="4" fill="#22C55E" />
    {/* Stand */}
    <path d="M16 25V28M11 29H21" stroke="#000" strokeWidth="2" strokeLinecap="round" />
    <path d="M7 16A9 9 0 0 0 25 16" stroke="#C0C0C0" strokeWidth="1.5" fill="none" />
  </svg>
);

// Retro Smiling Computer Mascot
export const SmilingComputerMascot: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Monitor */}
    <rect x="8" y="6" width="32" height="26" rx="2" fill="#E5E7EB" stroke="#000000" strokeWidth="1.5" />
    <rect x="12" y="10" width="24" height="18" fill="#FFFFFF" stroke="#9CA3AF" strokeWidth="1" />
    {/* Smiling face */}
    <circle cx="18" cy="17" r="2" fill="#000000" />
    <circle cx="30" cy="17" r="2" fill="#000000" />
    <path d="M19 22C21 24.5 27 24.5 29 22" stroke="#000000" strokeWidth="1.8" strokeLinecap="round" />
    {/* Cheeks */}
    <circle cx="15" cy="20" r="1.5" fill="#F472B6" />
    <circle cx="33" cy="20" r="1.5" fill="#F472B6" />
    {/* Base */}
    <rect x="20" y="32" width="8" height="4" fill="#D1D5DB" stroke="#000" strokeWidth="1.2" />
    <rect x="12" y="36" width="24" height="3" fill="#9CA3AF" stroke="#000" strokeWidth="1.2" />
    {/* Keyboard */}
    <rect x="6" y="39" width="36" height="5" rx="1" fill="#E5E7EB" stroke="#000" strokeWidth="1.2" />
    <line x1="10" y1="41.5" x2="38" y2="41.5" stroke="#6B7280" strokeWidth="1.5" strokeDasharray="2,1" />
  </svg>
);

// Retro Sound Speaker Icon
export const SpeakerIcon: React.FC<{ muted?: boolean; className?: string }> = ({ muted = false, className = "w-4 h-4" }) => (
  <svg viewBox="0 0 16 16" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 5H5L9 2V14L5 11H2V5Z" fill="#000000" />
    {!muted ? (
      <>
        <path d="M11 5C12 6.5 12 9.5 11 11" stroke="#000000" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M13 3C15 5.5 15 10.5 13 13" stroke="#000000" strokeWidth="1.2" strokeLinecap="round" />
      </>
    ) : (
      <path d="M11 5L15 11M15 5L11 11" stroke="#FF0000" strokeWidth="1.4" strokeLinecap="round" />
    )}
  </svg>
);

// Wifi / Network Icon
export const NetworkIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 16 16" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 4C5 0.5 11 0.5 15 4" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M3.5 7C6.5 4.5 9.5 4.5 12.5 7" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M6 10C7.2 9 8.8 9 10 10" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="8" cy="13" r="1.2" fill="#000000" />
  </svg>
);
