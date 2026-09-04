import React, { useRef, useEffect, useState, useCallback } from 'react';
import { BackgroundTitle } from './BackgroundTitle';
import { GlassOrb } from './GlassOrb';
import { GlassOrbPhysicsEngine, DEFAULT_PHYSICS_CONFIG } from './GlassOrbPhysics';
import { GlassOrbData } from '../types';
import { OpticalGlassButton, OpticalGlassPill } from './OpticalGlass';
import { ArrowUpRight, Layers, Compass } from 'lucide-react';

interface MoriaHeroProps {
  language?: 'pt' | 'en';
}

const INITIAL_ORB_TEMPLATES: Omit<GlassOrbData, 'x' | 'y' | 'vx' | 'vy'>[] = [
  {
    id: 1,
    size: 310,
    depth: 1.15,
    rotation: 12,
    rotationSpeed: 0.08,
    shapeRatio: 1.0,
    deformAngle: 35,
    causticAccent: 'pure-chrome',
    initialOffset: { xPct: 0.58, yPct: 0.48 }, // Center-right, overlapping 'R' and 'I'
    baseScale: 1.0,
    mass: 1.4,
  },
  {
    id: 2,
    size: 230,
    depth: 1.0,
    rotation: -25,
    rotationSpeed: -0.06,
    shapeRatio: 1.0,
    deformAngle: 110,
    causticAccent: 'cyan-warm',
    initialOffset: { xPct: 0.28, yPct: 0.42 }, // Left, overlapping 'M' and 'O'
    baseScale: 1.0,
    mass: 1.0,
  },
  {
    id: 3,
    size: 185,
    depth: 0.9,
    rotation: 40,
    rotationSpeed: 0.05,
    shapeRatio: 1.0,
    deformAngle: 195,
    causticAccent: 'prism',
    initialOffset: { xPct: 0.76, yPct: 0.35 }, // Upper-right, overlapping top of 'I' and 'A'
    baseScale: 1.0,
    mass: 0.85,
  },
  {
    id: 4,
    size: 145,
    depth: 0.8,
    rotation: -15,
    rotationSpeed: -0.04,
    shapeRatio: 1.0,
    deformAngle: 280,
    causticAccent: 'amber-blue',
    initialOffset: { xPct: 0.22, yPct: 0.65 }, // Lower-left, floating below 'M'
    baseScale: 1.0,
    mass: 0.65,
  },
  {
    id: 5,
    size: 115,
    depth: 0.75,
    rotation: 60,
    rotationSpeed: 0.07,
    shapeRatio: 1.0,
    deformAngle: 60,
    causticAccent: 'pure-chrome',
    initialOffset: { xPct: 0.68, yPct: 0.64 }, // Floating accent near bottom of 'I' and 'A'
    baseScale: 1.0,
    mass: 0.5,
  },
];

export const MoriaHero: React.FC<MoriaHeroProps> = ({ language = 'pt' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textCanvasRef = useRef<HTMLCanvasElement>(null);
  const physicsEngineRef = useRef<GlassOrbPhysicsEngine | null>(null);

  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  const [orbs, setOrbs] = useState<GlassOrbData[]>([]);
  const [draggedOrbId, setDraggedOrbId] = useState<number | null>(null);

  // Render high-contrast typography and subtle grid coordinates onto the optical refraction reference canvas
  const renderTextBuffer = useCallback((w: number, h: number) => {
    const canvas = textCanvasRef.current;
    if (!canvas) return;

    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Deep black base
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, w, h);

    // Subtle technical grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    const gridSize = 40;
    for (let x = 0; x < w; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Secondary sub-header text above MORIA
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = '700 13px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('RAÍSSA MORIÁ // UX/UI & PRODUCT DESIGN', w / 2, h / 2 - Math.min(w * 0.12, 140));

    // High-resolution bold MORIA display text
    const fontSize = Math.min(w * 0.21, h * 0.44);
    ctx.font = `900 ${fontSize}px Inter, "Plus Jakarta Sans", system-ui, -apple-system, sans-serif`;
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.letterSpacing = '-0.045em';
    ctx.fillText('MORIA', w / 2, h / 2);

    // Technical metadata below text
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = '600 11px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
    ctx.fillText('OPTICAL LIQUID SURFACE // 2026 // LISBOA & PORTO', w / 2, h / 2 + Math.min(w * 0.12, 140));
  }, []);

  // Initialize orbs with responsive sizing
  const initializeOrbs = useCallback((w: number, h: number) => {
    const scaleFactor = Math.min(1, Math.max(0.65, w / 1100));

    const initialOrbs: GlassOrbData[] = INITIAL_ORB_TEMPLATES.map((tmpl) => {
      const scaledSize = Math.round(tmpl.size * scaleFactor);
      const targetX = Math.round(w * tmpl.initialOffset.xPct);
      const targetY = Math.round(h * tmpl.initialOffset.yPct);

      return {
        ...tmpl,
        size: scaledSize,
        x: targetX,
        y: targetY,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
      };
    });

    physicsEngineRef.current = new GlassOrbPhysicsEngine(initialOrbs, w, h, {
      ...DEFAULT_PHYSICS_CONFIG,
      friction: 0.984,
      zeroGFactor: 0.04,
      bounceRestitution: 0.7,
      throwMultiplier: 1.2,
    });

    setOrbs(initialOrbs);
  }, []);

  // Window resize observer
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.floor(rect.width);
      const h = Math.floor(rect.height);

      if (w > 0 && h > 0) {
        setDimensions({ width: w, height: h });
        renderTextBuffer(w, h);

        if (!physicsEngineRef.current) {
          initializeOrbs(w, h);
        } else {
          physicsEngineRef.current.setDimensions(w, h);
        }
      }
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(container);

    return () => observer.disconnect();
  }, [renderTextBuffer, initializeOrbs]);

  // Main Physics Simulation Loop
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const dt = Math.min(currentTime - lastTime, 32);
      lastTime = currentTime;

      const engine = physicsEngineRef.current;
      if (engine) {
        engine.step(dt);
        setOrbs([...engine.getOrbs()]);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Pointer drag interactions
  const handlePointerDown = (e: React.PointerEvent, id: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    physicsEngineRef.current?.startDrag(id, px, py);
    setDraggedOrbId(id);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    physicsEngineRef.current?.setMousePosition({ x: px, y: py });

    if (draggedOrbId !== null) {
      physicsEngineRef.current?.updateDrag(px, py);
    }
  };

  const handlePointerUp = () => {
    physicsEngineRef.current?.endDrag();
    setDraggedOrbId(null);
  };

  const handleScrollToProjects = () => {
    const el = document.getElementById('portfolio-grid-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToTunnel = () => {
    const el = document.getElementById('tunnel-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className="relative w-full min-h-screen h-[100dvh] bg-[#050505] overflow-hidden select-none flex flex-col justify-between border-b border-neutral-900 px-6 md:px-12 py-8"
      style={{ touchAction: 'pan-y' }}
    >
      {/* 1. Deep charcoal/black ambient background with subtle vignette */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(20, 20, 24, 0.6) 0%, rgba(5, 5, 5, 0.98) 75%, #050505 100%)',
        }}
      />

      {/* 2. Microscopic Optical Grid Layer */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* 3. Hidden Refraction Canvas Buffer (used for optical sampling & chromatic dispersion) */}
      <canvas
        ref={textCanvasRef}
        className="hidden pointer-events-none"
        aria-hidden="true"
      />

      {/* 4. Large Crisp Monochromatic Background Title "MORIA" */}
      <BackgroundTitle text="MORIA" />

      {/* 5. FLOATING CIRCULAR OPTICAL GLASS BALLS (Round, transparent, interactive) */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {orbs.map((orb) => (
          <div key={orb.id} className="pointer-events-auto">
            <GlassOrb
              orb={orb}
              isDragged={draggedOrbId === orb.id}
              onPointerDown={handlePointerDown}
              textCanvasRef={textCanvasRef}
              containerWidth={dimensions.width}
              containerHeight={dimensions.height}
            />
          </div>
        ))}
      </div>

      {/* 6. TOP METADATA & STATUS BAR */}
      <div className="relative z-20 w-full max-w-[1720px] mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2 pointer-events-none">
        {/* Availability Status Badge */}
        <div className="pointer-events-auto">
          <OpticalGlassPill>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white font-bold">
              {language === 'pt' ? 'Disponível para Projetos Q3/Q4' : 'Available for Q3/Q4 Projects'}
            </span>
            <span className="text-white/20">•</span>
            <span className="text-neutral-400">Lisboa & Porto</span>
          </OpticalGlassPill>
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] text-neutral-500 uppercase tracking-widest pointer-events-auto">
          <span>PORTFOLIO // SELECTED WORKS</span>
          <span className="text-white/20">•</span>
          <span className="text-neutral-400">2026</span>
        </div>
      </div>

      {/* 7. HERO BOTTOM DOCK & ACTION BUTTONS */}
      <div className="relative z-20 w-full max-w-[1720px] mx-auto flex flex-col md:flex-row justify-between items-end md:items-center gap-6 pb-2 pointer-events-none">
        
        {/* Editorial Subtitle & Role */}
        <div className="flex flex-col gap-1 max-w-xl pointer-events-auto">
          <div className="flex items-center gap-2 font-mono text-[10px] text-neutral-400 uppercase tracking-[0.2em]">
            <Compass className="w-3.5 h-3.5 text-neutral-400" />
            <span>{language === 'pt' ? 'DESIGN DE PRODUTO & SISTEMAS DIGITAIS' : 'PRODUCT DESIGN & DIGITAL SYSTEMS'}</span>
          </div>
          <p className="text-sm md:text-base text-neutral-300 font-light leading-snug">
            {language === 'pt' ? (
              <>
                Desenvolvimento de interfaces limpas, arquitetura de informação e experiências digitais intuitivas orientadas a produto.
              </>
            ) : (
              <>
                Designing clean interfaces, robust information architectures, and intuitive digital experiences focused on product craft.
              </>
            )}
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pointer-events-auto">
          
          <OpticalGlassButton 
            onClick={handleScrollToProjects}
            className="shadow-[0_0_20px_rgba(255,255,255,0.06)]"
          >
            <span>{language === 'pt' ? 'Ver Trabalhos' : 'Explore Works'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </OpticalGlassButton>

          <OpticalGlassButton 
            onClick={handleScrollToTunnel}
          >
            <Layers className="w-3.5 h-3.5 text-neutral-400" />
            <span>{language === 'pt' ? 'Túnel 3D' : '3D Tunnel'}</span>
          </OpticalGlassButton>

          <OpticalGlassButton
            href="#projects/nipon-spa"
            className="hidden sm:inline-flex"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Nipon Spa</span>
          </OpticalGlassButton>

        </div>

      </div>

      {/* 8. Minimalist Scroll to Explore Indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 pointer-events-none">
        <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-neutral-500">
          {language === 'pt' ? 'SCROLL PARA NAVEGAR' : 'SCROLL TO EXPLORE'}
        </span>
        <div className="w-3.5 h-6 rounded-full border border-neutral-700 flex items-start justify-center p-1">
          <div className="w-1 h-1 rounded-full bg-neutral-300 animate-bounce" />
        </div>
      </div>

    </section>
  );
};
