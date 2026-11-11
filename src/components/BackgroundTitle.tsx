import React, { forwardRef, useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { Rotate3D, RotateCcw, Play, Pause } from 'lucide-react';

interface BackgroundTitleProps {
  className?: string;
  imageSrc?: string;
  onRotateChange?: (rotX: number, rotY: number) => void;
  language?: 'pt' | 'en';
}

export const BackgroundTitle = forwardRef<HTMLDivElement, BackgroundTitleProps>(
  ({ className = "", imageSrc = "/moria-3d-lettering.png", onRotateChange, language = 'pt' }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const cardRef = useRef<HTMLDivElement | null>(null);

    // Continuous 3D rotation state
    const [rotX, setRotX] = useState(0);
    const [rotY, setRotY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [autoRotate, setAutoRotate] = useState(true);
    const [hasInteracted, setHasInteracted] = useState(false);

    // Drag tracking
    const lastPos = useRef({ x: 0, y: 0, time: 0 });
    const velocity = useRef({ x: 0, y: 0 });
    const rotState = useRef({ x: 0, y: 0 });
    const autoRotateRef = useRef(autoRotate);
    autoRotateRef.current = autoRotate;

    // Hover parallax offset
    const hoverTiltX = useMotionValue(0);
    const hoverTiltY = useMotionValue(0);
    const smoothHoverX = useSpring(hoverTiltX, { damping: 25, stiffness: 180 });
    const smoothHoverY = useSpring(hoverTiltY, { damping: 25, stiffness: 180 });

    // Sync ref with state
    useEffect(() => {
      rotState.current = { x: rotX, y: rotY };
      onRotateChange?.(rotX, rotY);
    }, [rotX, rotY, onRotateChange]);

    // Animation & Inertial Physics Loop
    useEffect(() => {
      let animId: number;
      let lastTime = performance.now();

      const loop = (currentTime: number) => {
        const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
        lastTime = currentTime;

        if (!isDragging) {
          // If auto-rotating, gently spin horizontally
          if (autoRotateRef.current) {
            rotState.current.y = (rotState.current.y + 18 * dt) % 360;
            // Gentle natural bobbing on X
            rotState.current.x = Math.sin(currentTime * 0.0015) * 5;
            setRotY(rotState.current.y);
            setRotX(rotState.current.x);
          } else {
            // Inertia decay
            if (Math.abs(velocity.current.x) > 0.02 || Math.abs(velocity.current.y) > 0.02) {
              rotState.current.y = (rotState.current.y + velocity.current.x * dt * 60) % 360;
              rotState.current.x = Math.max(-65, Math.min(65, rotState.current.x + velocity.current.y * dt * 60));
              
              velocity.current.x *= Math.pow(0.92, dt * 60);
              velocity.current.y *= Math.pow(0.92, dt * 60);

              setRotY(rotState.current.y);
              setRotX(rotState.current.x);
            }
          }
        }

        animId = requestAnimationFrame(loop);
      };

      animId = requestAnimationFrame(loop);
      return () => cancelAnimationFrame(animId);
    }, [isDragging]);

    // Handle Pointer Drag for full 3D rotation
    const handlePointerDown = (e: React.PointerEvent) => {
      e.stopPropagation();
      setIsDragging(true);
      setAutoRotate(false);
      setHasInteracted(true);
      velocity.current = { x: 0, y: 0 };
      lastPos.current = { x: e.clientX, y: e.clientY, time: performance.now() };

      try {
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
      } catch {
        // Ignore pointer capture errors if unsupported
      }
    };

    const handlePointerMove = (e: React.PointerEvent) => {
      if (!isDragging) return;
      const now = performance.now();
      const dt = Math.max((now - lastPos.current.time) / 1000, 0.001);

      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;

      const sensitivity = 0.38;
      const newY = (rotState.current.y + dx * sensitivity) % 360;
      const newX = Math.max(-65, Math.min(65, rotState.current.x - dy * sensitivity));

      rotState.current.x = newX;
      rotState.current.y = newY;
      setRotX(newX);
      setRotY(newY);

      // Track rotational velocity for flick/spin
      velocity.current = {
        x: (dx / dt) * 0.015,
        y: (-dy / dt) * 0.015,
      };

      lastPos.current = { x: e.clientX, y: e.clientY, time: now };
    };

    const handlePointerUp = (e: React.PointerEvent) => {
      if (!isDragging) return;
      setIsDragging(false);
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // Ignore
      }
    };

    // Reset to upright centered view
    const handleReset = (e: React.MouseEvent) => {
      e.stopPropagation();
      setRotX(0);
      setRotY(0);
      velocity.current = { x: 0, y: 0 };
      rotState.current = { x: 0, y: 0 };
      setAutoRotate(false);
    };

    const toggleAutoRotate = (e: React.MouseEvent) => {
      e.stopPropagation();
      setAutoRotate(prev => !prev);
      setHasInteracted(true);
    };

    // Calculate dynamic specular gleam position based on rotation
    const lightAngle = (rotY * 1.5) % 360;
    const specularOffset = Math.sin((rotY * Math.PI) / 180) * 40;

    return (
      <div 
        ref={ref}
        className={`absolute inset-0 w-full h-full flex items-center justify-center select-none overflow-hidden z-10 ${className}`}
        style={{ perspective: '1400px', perspectiveOrigin: '50% 50%' }}
      >
        {/* 3D Manipulable World Container */}
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="relative w-full max-w-[94vw] flex items-center justify-center px-4 cursor-grab active:cursor-grabbing group touch-none"
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Rotatable 3D Card Stack (gives physical thickness and depth when turned) */}
          <div
            ref={cardRef}
            className="relative will-change-transform flex items-center justify-center transition-transform duration-75"
            style={{
              transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Deep Ambient Occlusion Cast Shadow on Ground/Background */}
            <div
              className="absolute inset-0 pointer-events-none filter blur-2xl opacity-80 transition-all duration-200"
              style={{
                transform: `translate3d(${-rotY * 0.8}px, ${30 + Math.abs(rotX) * 0.6}px, -60px) scale(${1 - Math.abs(rotY) * 0.001})`,
                background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 45%, transparent 75%)',
                width: '100%',
                height: '100%',
              }}
            />

            {/* Extruded 3D Depth Layers (Physical Metallic Thickness) */}
            {[-18, -14, -10, -6, -3].map((depthZ, idx) => (
              <img
                key={`depth-${idx}`}
                src={imageSrc}
                alt=""
                aria-hidden="true"
                draggable={false}
                className="absolute inset-0 w-full max-w-[1240px] md:max-w-[1100px] lg:max-w-[1180px] xl:max-w-[1280px] h-auto max-h-[52vh] object-contain pointer-events-none select-none"
                style={{
                  transform: `translateZ(${depthZ}px)`,
                  filter: `brightness(${0.18 + idx * 0.08}) contrast(1.4)`,
                  opacity: 0.85,
                }}
              />
            ))}

            {/* Front Sculpted 3D Lettering Face */}
            <div 
              className="relative w-full max-w-[1240px] md:max-w-[1100px] lg:max-w-[1180px] xl:max-w-[1280px] flex items-center justify-center"
              style={{
                transform: 'translateZ(6px)',
                transformStyle: 'preserve-3d',
              }}
            >
              <picture className="flex items-center justify-center w-full">
                <source srcSet="/moria-3d-lettering.webp" type="image/webp" />
                <img
                  src={imageSrc}
                  alt="MORIA"
                  className="w-full h-auto max-h-[52vh] object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)] select-none pointer-events-none transition-all duration-300 group-hover:drop-shadow-[0_30px_70px_rgba(255,255,255,0.08)]"
                  draggable={false}
                />
              </picture>

              {/* Dynamic Metallic Specular Glint reacting to 3D rotation angle */}
              <div
                className="absolute inset-0 pointer-events-none mix-blend-color-dodge transition-opacity duration-300"
                style={{
                  background: `linear-gradient(${105 + lightAngle * 0.2}deg, transparent 35%, rgba(255, 255, 255, ${0.12 + Math.abs(Math.sin((rotY * Math.PI) / 180)) * 0.22}) 50%, transparent 65%)`,
                  transform: `translateX(${specularOffset}px)`,
                  opacity: isDragging ? 0.9 : 0.65,
                  maskImage: `url(${imageSrc})`,
                  WebkitMaskImage: `url(${imageSrc})`,
                  maskSize: 'contain',
                  WebkitMaskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskPosition: 'center',
                }}
              />
            </div>
          </div>
        </div>

        {/* Floating 3D Interaction HUD Controls (Non-intrusive, sleek optical glass) */}
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 pointer-events-auto">
          {/* Touch / Drag Gesture Tip (Fades out once user explores or interacts) */}
          {!hasInteracted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="optical-glass px-3 py-1.5 rounded-full text-[9px] font-mono uppercase tracking-widest text-neutral-300 flex items-center gap-2 shadow-lg border border-white/10 select-none animate-pulse"
            >
              <Rotate3D className="w-3.5 h-3.5 text-white animate-spin" style={{ animationDuration: '6s' }} />
              <span>{language === 'pt' ? 'Arraste para rodar em 3D' : 'Drag to rotate in 3D'}</span>
            </motion.div>
          )}

          {/* Quick 3D Control Pills */}
          <div className="flex items-center gap-1.5 optical-glass p-1 rounded-full border border-white/10 backdrop-blur-md shadow-2xl">
            <button
              onClick={toggleAutoRotate}
              type="button"
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                autoRotate ? 'bg-white text-black font-bold shadow-xs' : 'text-neutral-400 hover:text-white'
              }`}
              title={autoRotate ? 'Pausar rotação' : 'Rodar continuamente'}
            >
              {autoRotate ? (
                <>
                  <Pause className="w-2.5 h-2.5" />
                  <span className="hidden sm:inline">{language === 'pt' ? 'Pausar' : 'Pause'}</span>
                </>
              ) : (
                <>
                  <Play className="w-2.5 h-2.5" />
                  <span className="hidden sm:inline">{language === 'pt' ? 'Rodar 3D' : 'Rotate 3D'}</span>
                </>
              )}
            </button>

            <button
              onClick={handleReset}
              type="button"
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition-all cursor-pointer"
              title="Restaurar ângulo inicial"
            >
              <RotateCcw className="w-2.5 h-2.5" />
              <span className="hidden sm:inline">{language === 'pt' ? 'Reset' : 'Reset'}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
);

BackgroundTitle.displayName = 'BackgroundTitle';
