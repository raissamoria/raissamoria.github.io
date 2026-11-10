/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { RetroDesktop } from './components/retro/RetroDesktop';
import { RetroTaskbar } from './components/retro/RetroTaskbar';
import { RetroStartMenu } from './components/retro/RetroStartMenu';
import { RetroShutdownDialog } from './components/retro/RetroShutdownDialog';
import { RetroProjectLayout } from './components/retro/RetroProjectLayout';
import { WindowId, WindowState, Language } from './components/retro/RetroTypes';
import { retroAudio } from './components/retro/RetroAudio';

// Projects
import { MakingSupportVisibleProject } from './components/MakingSupportVisibleProject';
import { SueAppProject } from './components/SueAppProject';
import { NiponSpaProject } from './components/NiponSpaProject';

const getInitialWindows = (): WindowState[] => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const isTablet = typeof window !== 'undefined' && window.innerWidth < 1024;

  if (isMobile) {
    return [
      {
        id: 'portfolio',
        title: 'Portfólio da Raíssa',
        isOpen: true,
        isMinimized: false,
        isMaximized: false,
        zIndex: 20,
        position: { x: 12, y: 16 },
        size: { width: 'calc(100vw - 24px)', height: 'auto' },
        iconType: '📁',
      },
      {
        id: 'sobre',
        title: 'Sobre',
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
        zIndex: 15,
        position: { x: 12, y: 30 },
        size: { width: 'calc(100vw - 24px)', height: 'auto' },
        iconType: '📄',
      },
      {
        id: 'projetos',
        title: 'Projetos',
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
        zIndex: 16,
        position: { x: 12, y: 30 },
        size: { width: 'calc(100vw - 24px)', height: 'auto' },
        iconType: '📁',
      },
      {
        id: 'trajetoria',
        title: 'Trajetória',
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
        zIndex: 17,
        position: { x: 12, y: 30 },
        size: { width: 'calc(100vw - 24px)', height: 'auto' },
        iconType: '📊',
      },
      {
        id: 'viagens',
        title: 'Viagens ✈',
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
        zIndex: 12,
        position: { x: 12, y: 30 },
        size: { width: 'calc(100vw - 24px)', height: 'auto' },
        iconType: '✈️',
      },
      {
        id: 'surf',
        title: 'Surf 🌊',
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
        zIndex: 14,
        position: { x: 12, y: 30 },
        size: { width: 'calc(100vw - 24px)', height: 'auto' },
        iconType: '🌊',
      },
      {
        id: 'natureza',
        title: 'Natureza',
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
        zIndex: 10,
        position: { x: 12, y: 30 },
        size: { width: 'calc(100vw - 24px)', height: 'auto' },
        iconType: '🌿',
      },
      {
        id: 'contacto',
        title: 'Contacto',
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
        zIndex: 13,
        position: { x: 12, y: 30 },
        size: { width: 'calc(100vw - 24px)', height: 'auto' },
        iconType: '✉',
      },
      {
        id: 'lixeira',
        title: 'Lixeira',
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
        zIndex: 10,
        position: { x: 12, y: 30 },
        size: { width: 'calc(100vw - 24px)', height: 'auto' },
        iconType: '🗑️',
      },
    ];
  }

  if (isTablet) {
    return [
      {
        id: 'portfolio',
        title: 'Portfólio da Raíssa',
        isOpen: true,
        isMinimized: false,
        isMaximized: false,
        zIndex: 20,
        position: { x: 90, y: 20 },
        size: { width: '540px', height: 'auto' },
        iconType: '📁',
      },
      {
        id: 'sobre',
        title: 'Sobre',
        isOpen: true,
        isMinimized: false,
        isMaximized: false,
        zIndex: 15,
        position: { x: 650, y: 30 },
        size: { width: '300px', height: 'auto' },
        iconType: '📄',
      },
      {
        id: 'projetos',
        title: 'Projetos',
        isOpen: true,
        isMinimized: false,
        isMaximized: false,
        zIndex: 16,
        position: { x: 100, y: 360 },
        size: { width: '360px', height: 'auto' },
        iconType: '📁',
      },
      {
        id: 'trajetoria',
        title: 'Trajetória',
        isOpen: true,
        isMinimized: false,
        isMaximized: false,
        zIndex: 17,
        position: { x: 480, y: 360 },
        size: { width: '320px', height: 'auto' },
        iconType: '📊',
      },
      {
        id: 'viagens',
        title: 'Viagens ✈',
        isOpen: true,
        isMinimized: false,
        isMaximized: false,
        zIndex: 12,
        position: { x: 660, y: 240 },
        size: { width: '240px', height: 'auto' },
        iconType: '✈️',
      },
      {
        id: 'surf',
        title: 'Surf 🌊',
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
        zIndex: 14,
        position: { x: 680, y: 260 },
        size: { width: '220px', height: 'auto' },
        iconType: '🌊',
      },
      {
        id: 'natureza',
        title: 'Natureza',
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
        zIndex: 10,
        position: { x: 200, y: 150 },
        size: { width: '260px', height: 'auto' },
        iconType: '🌿',
      },
      {
        id: 'contacto',
        title: 'Contacto',
        isOpen: true,
        isMinimized: false,
        isMaximized: false,
        zIndex: 13,
        position: { x: 660, y: 420 },
        size: { width: '300px', height: 'auto' },
        iconType: '✉',
      },
      {
        id: 'lixeira',
        title: 'Lixeira',
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
        zIndex: 10,
        position: { x: 200, y: 150 },
        size: { width: '260px', height: 'auto' },
        iconType: '🗑️',
      },
    ];
  }

  // Full Desktop Coordinates (faithfully matches the user's reference image)
  return [
    {
      id: 'portfolio',
      title: 'Portfólio da Raíssa',
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: 25,
      position: { x: 120, y: 25 },
      size: { width: '560px', height: 'auto' },
      iconType: '📁',
    },
    {
      id: 'sobre',
      title: 'Sobre',
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: 18,
      position: { x: 700, y: 30 },
      size: { width: '310px', height: 'auto' },
      iconType: '📄',
    },
    {
      id: 'viagens',
      title: 'Viagens ✈',
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: 14,
      position: { x: 690, y: 250 },
      size: { width: '200px', height: 'auto' },
      iconType: '✈️',
    },
    {
      id: 'surf',
      title: 'Surf 🌊',
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: 15,
      position: { x: 865, y: 265 },
      size: { width: '190px', height: 'auto' },
      iconType: '🌊',
    },
    {
      id: 'projetos',
      title: 'Projetos',
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: 20,
      position: { x: 120, y: 400 },
      size: { width: '310px', height: 'auto' },
      iconType: '📁',
    },
    {
      id: 'trajetoria',
      title: 'Trajetória',
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: 22,
      position: { x: 445, y: 390 },
      size: { width: '430px', height: 'auto' },
      iconType: '📊',
    },
    {
      id: 'contacto',
      title: 'Contacto',
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: 19,
      position: { x: 750, y: 425 },
      size: { width: '295px', height: 'auto' },
      iconType: '✉',
    },
    {
      id: 'natureza',
      title: 'Natureza',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      position: { x: 300, y: 150 },
      size: { width: '280px', height: 'auto' },
      iconType: '🌿',
    },
    {
      id: 'lixeira',
      title: 'Lixeira',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      position: { x: 260, y: 180 },
      size: { width: '280px', height: 'auto' },
      iconType: '🗑️',
    },
  ];
};

export default function App() {
  const [language, setLanguage] = useState<Language>('pt');
  const [currentProject, setCurrentProject] = useState<string | null>(null);
  const [windows, setWindows] = useState<WindowState[]>(getInitialWindows);
  const [activeWindowId, setActiveWindowId] = useState<WindowId | null>('portfolio');
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [shutdownOpen, setShutdownOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Play startup sound on first interaction
  useEffect(() => {
    const handleFirstClick = () => {
      retroAudio.playStartup();
      window.removeEventListener('click', handleFirstClick);
    };
    window.addEventListener('click', handleFirstClick, { once: true });
    return () => window.removeEventListener('click', handleFirstClick);
  }, []);

  // Hash-based routing synchronization
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#projects/nipon-spa' || hash === '#nipon-spa') {
        setCurrentProject('nipon-spa');
      } else if (hash === '#projects/sue-app' || hash === '#sue-app' || hash === '#projects/sue' || hash === '#sue') {
        setCurrentProject('sue-app');
      } else if (
        hash === '#projects/plataforma-helpdesk' || 
        hash === '#plataforma-helpdesk' || 
        hash === '#projects/plataforma-de-helpdesk' || 
        hash === '#plataforma-de-helpdesk' || 
        hash === '#projects/helpdesk' || 
        hash === '#helpdesk' ||
        hash === '#projects/making-support-visible' || 
        hash === '#making-support-visible' || 
        hash === '#projects/support-visible'
      ) {
        setCurrentProject('plataforma-helpdesk');
      } else if (!hash.startsWith('#projects/')) {
        setCurrentProject(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Window Management Actions
  const handleFocusWindow = (id: WindowId) => {
    setActiveWindowId(id);
    setWindows((prev) => {
      const maxZ = Math.max(...prev.map((w) => w.zIndex), 20);
      return prev.map((w) => (w.id === id ? { ...w, zIndex: maxZ + 1, isMinimized: false } : w));
    });
  };

  const handleCloseWindow = (id: WindowId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isOpen: false, isMinimized: false } : w))
    );
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const handleMinimizeWindow = (id: WindowId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const handleMaximizeWindow = (id: WindowId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w))
    );
  };

  const handleOpenWindow = (id: WindowId | string) => {
    retroAudio.playWindowOpen();
    const targetId = id as WindowId;
    setWindows((prev) => {
      const maxZ = Math.max(...prev.map((w) => w.zIndex), 20);
      return prev.map((w) =>
        w.id === targetId ? { ...w, isOpen: true, isMinimized: false, zIndex: maxZ + 1 } : w
      );
    });
    setActiveWindowId(targetId);
  };

  const handleTaskbarWindowClick = (id: string) => {
    const targetId = id as WindowId;
    const win = windows.find((w) => w.id === targetId);
    if (!win) return;

    if (win.isMinimized) {
      // Restore
      handleFocusWindow(targetId);
    } else if (activeWindowId === targetId) {
      // Minimize if currently focused
      handleMinimizeWindow(targetId);
    } else {
      // Bring to focus
      handleFocusWindow(targetId);
    }
  };

  // Project navigation
  const handleOpenProject = (slug: string) => {
    retroAudio.playWindowOpen();
    setCurrentProject(slug);
    window.location.hash = `projects/${slug}`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBackToDesktop = () => {
    retroAudio.playClick();
    setCurrentProject(null);
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Language & Sound toggles
  const handleToggleLanguage = () => {
    const newLang = language === 'pt' ? 'en' : 'pt';
    setLanguage(newLang);
    retroAudio.playClick();
  };

  const handleToggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    retroAudio.isMuted = newMuted;
  };

  // Reset desktop windows
  const handleResetWindows = () => {
    setWindows(getInitialWindows());
    setActiveWindowId('portfolio');
  };

  const handleMaximizeMain = () => {
    setWindows((prev) =>
      prev.map((w) => (w.id === 'portfolio' ? { ...w, isOpen: true, isMaximized: true, zIndex: 99 } : w))
    );
    setActiveWindowId('portfolio');
  };

  // Close start menu when clicking on desktop
  const handleDesktopClick = () => {
    if (startMenuOpen) {
      setStartMenuOpen(false);
    }
  };

  // ==========================================================
  // CASE STUDY PAGES (Each component renders RetroProjectLayout with full tabs)
  // ==========================================================
  if (currentProject === 'plataforma-helpdesk' || currentProject === 'making-support-visible') {
    return (
      <MakingSupportVisibleProject
        language={language}
        onBack={handleBackToDesktop}
        onNextProject={() => handleOpenProject('nipon-spa')}
        onPrevProject={() => handleOpenProject('sue-app')}
        onToggleLanguage={handleToggleLanguage}
      />
    );
  }

  if (currentProject === 'sue-app') {
    return (
      <SueAppProject
        language={language}
        onBack={handleBackToDesktop}
        onNextProject={() => handleOpenProject('plataforma-helpdesk')}
        onPrevProject={() => handleOpenProject('nipon-spa')}
      />
    );
  }

  if (currentProject === 'nipon-spa') {
    return (
      <NiponSpaProject
        language={language}
        onBack={handleBackToDesktop}
        onNextProject={() => handleOpenProject('sue-app')}
        onPrevProject={() => handleOpenProject('plataforma-helpdesk')}
      />
    );
  }

  // ==========================================================
  // MAIN RETRO OS DESKTOP
  // ==========================================================
  return (
    <div 
      onClick={handleDesktopClick}
      className="relative min-h-screen w-full bg-[#008080] overflow-x-hidden font-sans select-none"
    >
      {/* 1. Interactive Windows 95 Desktop */}
      <RetroDesktop
        language={language}
        windows={windows}
        activeWindowId={activeWindowId}
        onOpenProject={handleOpenProject}
        onFocusWindow={handleFocusWindow}
        onCloseWindow={handleCloseWindow}
        onMinimizeWindow={handleMinimizeWindow}
        onMaximizeWindow={handleMaximizeWindow}
        onOpenWindow={handleOpenWindow}
      />

      {/* 2. Start Menu Popup */}
      <RetroStartMenu
        isOpen={startMenuOpen}
        language={language}
        onClose={() => setStartMenuOpen(false)}
        onOpenWindow={handleOpenWindow}
        onOpenProject={handleOpenProject}
        onToggleLanguage={handleToggleLanguage}
        onShutdown={() => setShutdownOpen(true)}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* 3. Windows 95 Bottom Taskbar */}
      <RetroTaskbar
        windows={windows}
        activeWindowId={activeWindowId}
        startMenuOpen={startMenuOpen}
        language={language}
        onToggleStartMenu={() => setStartMenuOpen((prev) => !prev)}
        onWindowClick={handleTaskbarWindowClick}
        onToggleLanguage={handleToggleLanguage}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* 4. Shutdown / Reset Dialog */}
      <RetroShutdownDialog
        isOpen={shutdownOpen}
        onClose={() => setShutdownOpen(false)}
        onResetWindows={handleResetWindows}
        onMaximizeMain={handleMaximizeMain}
      />
    </div>
  );
}
