import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { GlassOrbData } from '../types';
import { GlassOrbPhysicsEngine, DEFAULT_PHYSICS_CONFIG } from './GlassOrbPhysics';
import { GlassOrb } from './GlassOrb';
import { BackgroundTitle } from './BackgroundTitle';
import { Sparkles, RotateCcw } from 'lucide-react';

// Template for initial distribution of orbs across desktop, tablet, mobile
const INITIAL_ORB_DEFINITIONS: Omit<GlassOrbData, 'x' | 'y' | 'vx' | 'vy'>[] = [
  {
    id: 1,
    size: 210,
    depth: 1.2,
    rotation: 25,
    rotationSpeed: 0.08,
    shapeRatio: 1.04,
    deformAngle: 35,
    causticAccent: 'amber-blue',
    initialOffset: { xPct: 0.28, yPct: 0.42 }, // Sits over the 'M' & 'O'
    baseScale: 1,
    mass: 2.2,
  },
  {
    id: 2,
    size: 165,
    depth: 1.05,
    rotation: -15,
    rotationSpeed: -0.06,
    shapeRatio: 0.98,
    deformAngle: 120,
    causticAccent: 'cyan-warm',
    initialOffset: { xPct: 0.72, yPct: 0.38 }, // Sits over the 'I' & 'A'
    baseScale: 1,
    mass: 1.7,
  },
  {
    id: 3,
    size: 130,
    depth: 0.9,
    rotation: 45,
    rotationSpeed: 0.1,
    shapeRatio: 1.06,
    deformAngle: 210,
    causticAccent: 'amber-blue',
    initialOffset: { xPct: 0.50, yPct: 0.65 }, // Sits below the 'R'
    baseScale: 1,
    mass: 1.3,
  },
  {
    id: 4,
    size: 95,
    depth: 0.75,
    rotation: 10,
    rotationSpeed: -0.12,
    shapeRatio: 1.0,
    deformAngle: 60,
    causticAccent: 'prism',
    initialOffset: { xPct: 0.16, yPct: 0.68 }, // Bottom-left floating orb
    baseScale: 1,
    mass: 0.95,
  },
  {
    id: 5,
    size: 145,
    depth: 1.1,
    rotation: -30,
    rotationSpeed: 0.07,
    shapeRatio: 0.95,
    deformAngle: 280,
    causticAccent: 'cyan-warm',
    initialOffset: { xPct: 0.84, yPct: 0.68 }, // Bottom-right lens
    baseScale: 1,
    mass: 1.5,
  },
  {
    id: 6,
    size: 85,
    depth: 0.7,
    rotation: 70,
    rotationSpeed: -0.09,
    shapeRatio: 1.03,
    deformAngle: 15,
    causticAccent: 'amber-blue',
    initialOffset: { xPct: 0.44, yPct: 0.22 }, // Top-center float
    baseScale: 1,
    mass: 0.85,
  },
  {
    id: 7,
    size: 110,
    depth: 0.85,
    rotation: -40,
    rotationSpeed: 0.11,
    shapeRatio: 0.97,
    deformAngle: 190,
    causticAccent: 'pure-chrome',
    initialOffset: { xPct: 0.14, yPct: 0.28 }, // Top-left satellite
    baseScale: 1,
    mass: 1.1,
  },
  {
    id: 8,
    size: 75,
    depth: 0.65,
    rotation: 50,
    rotationSpeed: -0.14,
    shapeRatio: 1.0,
    deformAngle: 310,
    causticAccent: 'prism',
    initialOffset: { xPct: 0.88, yPct: 0.24 }, // Top-right satellite
    baseScale: 1,
    mass: 0.75,
  },
  {
    id: 9,
    size: 180,
    depth: 1.15,
    rotation: 15,
    rotationSpeed: 0.05,
    shapeRatio: 1.02,
    deformAngle: 85,
    causticAccent: 'amber-blue',
    initialOffset: { xPct: 0.54, yPct: 0.46 }, // Center main lens directly over 'R'
    baseScale: 1,
    mass: 1.9,
  },
];

interface MoriaHeroProps {
  language?: 'pt' | 'en';
}

export const MoriaHero: React.FC<MoriaHeroProps> = ({ language = 'pt' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textCanvasRef = useRef<HTMLCanvasElement>(null);
  const physicsEngineRef = useRef<GlassOrbPhysicsEngine | null>(null);

  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  const [orbs, setOrbs] = useState<GlassOrbData[]>([]);
  const [draggedId, setDraggedId] = useState<number | null>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  // Initialize orbs adjusted for viewport dimensions & responsive device size
  const setupOrbs = useCallback((w: number, h: number) => {
    // Select count based on screen width
    let targetDefinitions = INITIAL_ORB_DEFINITIONS;
    if (w < 640) {
      // Mobile: 5 orbs
      targetDefinitions = INITIAL_ORB_DEFINITIONS.slice(0, 5);
    } else if (w < 1024) {
      // Tablet: 7 orbs
      targetDefinitions = INITIAL_ORB_DEFINITIONS.slice(0, 7);
    }

    const scaleFactor = Math.min(1, Math.max(0.65, w / 1440));

    const initialOrbs: GlassOrbData[] = targetDefinitions.map((def) => {
      const scaledSize = Math.round(def.size * scaleFactor);
      return {
        ...def,
        size: scaledSize,
        x: def.initialOffset.xPct * w,
        y: def.initialOffset.yPct * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        mass: def.mass * scaleFactor,
      };
    });

    if (!physicsEngineRef.current) {
      physicsEngineRef.current = new GlassOrbPhysicsEngine(
        initialOrbs,
        w,
        h,
        DEFAULT_PHYSICS_CONFIG
      );
    } else {
      physicsEngineRef.current.setDimensions(w, h);
      physicsEngineRef.current.setOrbs(initialOrbs);
    }

    setOrbs(initialOrbs);
  }, []);

  // Render high-contrast "MORIA" text onto the hidden refraction reference canvas
  const renderTextBuffer = useCallback((w: number, h: number) => {
    const canvas = textCanvasRef.current;
    if (!canvas) return;

    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, w, h);

    // Draw high-resolution bold MORIA text
    const fontSize = Math.min(w * 0.22, h * 0.48);
    ctx.font = `900 ${fontSize}px Inter, "Plus Jakarta Sans", system-ui, -apple-system, sans-serif`;
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.letterSpacing = '-0.045em';

    ctx.fillText('MORIA', w / 2, h / 2);
  }, []);

  // Resize observer setup
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
        setupOrbs(w, h);
      }
    };

    updateSize();

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    resizeObserver.observe(container);

    // Trigger entrance transition
    const timer = setTimeout(() => {
      setHasEntered(true);
    }, 100);

    return () => {
      resizeObserver.disconnect();
      clearTimeout(timer);
    };
  }, [setupOrbs, renderTextBuffer]);

  // Main 60 FPS Physics & Render Loop
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = Math.min(time - lastTime, 32);
      lastTime = time;

      if (physicsEngineRef.current) {
        physicsEngineRef.current.step(dt);
        const currentOrbs = physicsEngineRef.current.getOrbs();
        // Force state update to re-render orbs
        setOrbs([...currentOrbs]);
        setDraggedId(physicsEngineRef.current.getDraggedOrbId());
      }

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Global Pointer Event Listeners for seamless Drag & Momentum Throw
  const handlePointerDown = useCallback((e: React.PointerEvent, id: number) => {
    const container = containerRef.current;
    if (!container || !physicsEngineRef.current) return;

    // Only prevent default on mouse down, allow touch gestures unless actively dragging
    if (e.pointerType === 'mouse') {
      e.preventDefault();
    }

    const rect = container.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    physicsEngineRef.current.startDrag(id, px, py);
    setDraggedId(id);

    try {
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    } catch {
      // Ignore if pointer capture fails
    }
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const container = containerRef.current;
    if (!container || !physicsEngineRef.current) return;

    const rect = container.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    physicsEngineRef.current.setMousePosition({ x: px, y: py });

    if (draggedId !== null) {
      physicsEngineRef.current.updateDrag(px, py);
    }
  }, [draggedId]);

  const handlePointerUp = useCallback((e?: React.PointerEvent) => {
    if (e && e.target) {
      try {
        (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
      } catch {
        // Ignore
      }
    }
    if (physicsEngineRef.current) {
      physicsEngineRef.current.endDrag();
      setDraggedId(null);
    }
  }, []);

  const handleResetComposition = () => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      setupOrbs(dimensions.width, dimensions.height);
    }
  };

  const handleScrollDown = () => {
    const tunnel = document.getElementById('tunnel-section');
    if (tunnel) {
      tunnel.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={() => {
        if (physicsEngineRef.current) {
          physicsEngineRef.current.setMousePosition(null);
          physicsEngineRef.current.endDrag();
          setDraggedId(null);
        }
      }}
      className="relative w-full min-h-screen h-[100dvh] bg-[#000000] overflow-hidden select-none flex flex-col items-center justify-center border-b border-neutral-900"
      style={{
        touchAction: 'pan-y',
      }}
    >
      {/* 1. Subtle Radial Ambient Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(25, 25, 30, 0.4) 0%, rgba(0, 0, 0, 0.95) 75%, #000000 100%)',
        }}
      />

      {/* 2. Hidden Reference Text Canvas for Real-Time Optical Refraction */}
      <canvas 
        ref={textCanvasRef} 
        className="hidden pointer-events-none"
        aria-hidden="true"
      />

      {/* 3. Massive "MORIA" Background Typography Layer */}
      <BackgroundTitle text="MORIA" />

      {/* 4. Interactive 3D Refractive Glass Orbs Layer */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-hidden">
        {orbs.map((orb, index) => (
          <motion.div
            key={orb.id}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{
              opacity: hasEntered ? 1 : 0,
              scale: hasEntered ? 1 : 0.4,
            }}
            transition={{
              duration: 0.8,
              delay: 0.2 + index * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute top-0 left-0 pointer-events-auto"
          >
            <GlassOrb
              orb={orb}
              isDragged={draggedId === orb.id}
              onPointerDown={handlePointerDown}
              textCanvasRef={textCanvasRef}
              containerWidth={dimensions.width}
              containerHeight={dimensions.height}
            />
          </motion.div>
        ))}
      </div>

      {/* 5. Minimal Futuristic Editorial Controls & Status Badges */}
      <div className="absolute top-8 left-6 md:left-12 right-6 md:right-12 z-30 flex justify-between items-center pointer-events-none select-none">
        
        {/* Interactive hint badge */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex items-center gap-2.5 bg-white/[0.04] backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-neutral-400 font-mono text-[9px] uppercase tracking-[0.2em] font-medium pointer-events-auto"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>
            {language === 'pt' ? 'Vidro 3D Óptico Interativo' : '3D Optical Refraction Playground'}
          </span>
        </motion.div>

        {/* Reset / Shake composition button */}
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          onClick={handleResetComposition}
          className="pointer-events-auto flex items-center gap-1.5 text-neutral-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer outline-none"
          title={language === 'pt' ? 'Reorganizar composição' : 'Reset orb layout'}
        >
          <RotateCcw className="w-3 h-3" />
          <span className="hidden sm:inline">
            {language === 'pt' ? 'Reset' : 'Reset'}
          </span>
        </motion.button>

      </div>

      {/* 6. Minimal Bottom Instruction & Interactive Scroll Down Indicator */}
      <div className="absolute bottom-8 left-0 right-0 z-30 flex flex-col items-center justify-center gap-3 select-none pointer-events-auto">
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          onClick={handleScrollDown}
          className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-400 hover:text-white transition-colors font-bold cursor-pointer outline-none bg-black/40 px-4 py-1 rounded-full border border-white/5"
        >
          <Sparkles className="w-3 h-3 text-neutral-400" />
          <span>
            {language === 'pt' ? 'Scroll para Explorar' : 'Scroll to Explore'}
          </span>
        </motion.button>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          onClick={handleScrollDown}
          className="w-4 h-7 rounded-full border border-neutral-700 hover:border-white flex items-start justify-center p-1 cursor-pointer transition-colors"
          aria-label="Scroll down"
        >
          <div className="w-1 h-1.5 rounded-full bg-neutral-300 animate-bounce" />
        </motion.button>
      </div>

    </section>
  );
};
