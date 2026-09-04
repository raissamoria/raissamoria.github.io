import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface OpticalGlassProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'pill' | 'rect';
  active?: boolean;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
}

/**
 * OpticalGlassButton
 * Refined liquid optical glass button: flat/slightly convex, thin transparent lens,
 * almost colorless, subtle chromatic edges (cyan, violet, magenta, green, yellow),
 * clean white typography and icons.
 */
export const OpticalGlassButton: React.FC<OpticalGlassProps> = ({
  children,
  variant = 'pill',
  active = false,
  className = '',
  href,
  target,
  rel,
  onClick,
  ...rest
}) => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const shapeClass = variant === 'pill' ? 'rounded-full' : 'rounded-xl';

  const baseClasses = `
    optical-glass relative group inline-flex items-center justify-center gap-2
    ${shapeClass}
    px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider
    text-white select-none cursor-pointer overflow-hidden
    transition-all duration-300
    ${active ? 'optical-glass-active text-white' : 'text-neutral-300 hover:text-white'}
    ${className}
  `.trim();

  const internalContent = (
    <>
      {/* Specular Refraction Glint following cursor */}
      <span
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[inherit]"
        style={{
          background: `radial-gradient(100px circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.14), transparent 70%)`,
        }}
      />

      {/* Gentle magnification of child content */}
      <span className="relative z-10 flex items-center gap-2 transition-transform duration-200 group-hover:scale-[1.02]">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={baseClasses}
        onClick={onClick as any}
      >
        {internalContent}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      type="button"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={baseClasses}
      onClick={onClick}
      {...rest}
    >
      {internalContent}
    </button>
  );
};

/**
 * OpticalGlassPill
 * Ultra-minimal optical glass pill for badges, status indicators, and category tabs.
 */
export const OpticalGlassPill: React.FC<{
  children: React.ReactNode;
  active?: boolean;
  className?: string;
  onClick?: () => void;
}> = ({ children, active = false, className = '', onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`
        optical-glass relative inline-flex items-center gap-2 rounded-full px-3.5 py-1.5
        text-[10px] font-mono tracking-wider uppercase transition-all duration-200
        ${active ? 'optical-glass-active text-white font-bold' : 'text-neutral-400 hover:text-white'}
        ${onClick ? 'cursor-pointer hover:bg-white/[0.06]' : 'pointer-events-none'}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

/**
 * OpticalInspectionLens
 * A flat or slightly convex optical glass lens (rounded rectangle or pill) placed
 * over the interface. It gently magnifies and refracts typography and content underneath
 * with soft blur, light refraction, and subtle chromatic edges (cyan, violet, magenta, green, yellow).
 * Never a sphere or floating bubble!
 */
interface OpticalInspectionLensProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  textCanvasRef?: React.RefObject<HTMLCanvasElement | null>;
  mode?: 'inspect' | 'convex' | 'diffract';
  onModeChange?: (mode: 'inspect' | 'convex' | 'diffract') => void;
  language?: 'pt' | 'en';
}

export const OpticalInspectionLens: React.FC<OpticalInspectionLensProps> = ({
  containerRef,
  textCanvasRef,
  mode = 'inspect',
  onModeChange,
  language = 'pt',
}) => {
  const lensRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Lens dimensions: Elegant rounded rectangle (e.g. 360px x 140px on desktop)
  const [lensDimensions, setLensDimensions] = useState({ width: 340, height: 130 });
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Position motion values with smooth physics
  const posX = useMotionValue(0);
  const posY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 220, mass: 0.8 };
  const smoothX = useSpring(posX, springConfig);
  const smoothY = useSpring(posY, springConfig);

  // Initial positioning centered over the main text
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updatePosition = () => {
      const rect = container.getBoundingClientRect();
      const isMobile = rect.width < 640;
      const lw = isMobile ? Math.min(rect.width - 32, 300) : 380;
      const lh = isMobile ? 110 : 135;
      
      setLensDimensions({ width: lw, height: lh });

      // Default position over the central typography
      posX.set(rect.width / 2 - lw / 2);
      posY.set(rect.height / 2 - lh / 2 + 10);
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [containerRef, posX, posY]);

  // Pointer drag handling (works on both mouse and touch, touch-action pan-y friendly)
  const dragStartOffset = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();

    const currentX = posX.get();
    const currentY = posY.get();

    dragStartOffset.current = {
      x: e.clientX - rect.left - currentX,
      y: e.clientY - rect.top - currentY,
    };

    setIsDragging(true);
    try {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // Ignore
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const newX = e.clientX - rect.left - dragStartOffset.current.x;
    const newY = e.clientY - rect.top - dragStartOffset.current.y;

    // Constrain within container bounds
    const maxX = rect.width - lensDimensions.width;
    const maxY = rect.height - lensDimensions.height;

    posX.set(Math.max(10, Math.min(maxX - 10, newX)));
    posY.set(Math.max(10, Math.min(maxY - 10, newY)));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }
  };

  // Optical canvas refraction & chromatic dispersion
  useEffect(() => {
    let animId: number;

    const renderLensRefraction = () => {
      const canvas = canvasRef.current;
      const srcCanvas = textCanvasRef?.current;
      const container = containerRef.current;

      if (canvas && srcCanvas && container) {
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (ctx) {
          const w = lensDimensions.width;
          const h = lensDimensions.height;

          if (canvas.width !== w || canvas.height !== h) {
            canvas.width = w;
            canvas.height = h;
          }

          ctx.clearRect(0, 0, w, h);

          const curX = posX.get();
          const curY = posY.get();

          // Magnification factor based on mode:
          // 'inspect': 1.14x subtle lens
          // 'convex': 1.25x slightly convex
          // 'diffract': 1.18x with amplified chromatic fringe
          const mag = mode === 'convex' ? 1.25 : mode === 'diffract' ? 1.18 : 1.14;
          const sampleW = w / mag;
          const sampleH = h / mag;
          const sampleX = curX + (w - sampleW) / 2;
          const sampleY = curY + (h - sampleH) / 2;

          // Clip to rounded rectangle lens shape
          const r = 24; // 24px corner radius matching modern UI pill/rect
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(r, 0);
          ctx.lineTo(w - r, 0);
          ctx.quadraticCurveTo(w, 0, w, r);
          ctx.lineTo(w, h - r);
          ctx.quadraticCurveTo(w, h, w - r, h);
          ctx.lineTo(r, h);
          ctx.quadraticCurveTo(0, h, 0, h - r);
          ctx.lineTo(0, r);
          ctx.quadraticCurveTo(0, 0, r, 0);
          ctx.closePath();
          ctx.clip();

          // Chromatic Dispersion passes:
          // Red/Violet channel shifted by -1.5px
          // Blue/Cyan channel shifted by +1.5px
          // Green channel in center
          const chromaticOffset = mode === 'diffract' ? 2.5 : 1.2;

          // Red / Violet channel
          ctx.globalCompositeOperation = 'source-over';
          ctx.globalAlpha = 0.88;
          ctx.drawImage(
            srcCanvas,
            sampleX - chromaticOffset,
            sampleY,
            sampleW,
            sampleH,
            0,
            0,
            w,
            h
          );

          // Cyan / Green / Yellow channel
          ctx.globalCompositeOperation = 'screen';
          ctx.globalAlpha = 0.75;
          ctx.drawImage(
            srcCanvas,
            sampleX + chromaticOffset,
            sampleY,
            sampleW,
            sampleH,
            0,
            0,
            w,
            h
          );

          // Subtle lens optical surface grazing highlight (flat/slightly convex reflection)
          const grad = ctx.createLinearGradient(0, 0, w, h);
          grad.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
          grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.02)');
          grad.addColorStop(0.7, 'rgba(255, 255, 255, 0.0)');
          grad.addColorStop(1, 'rgba(255, 255, 255, 0.05)');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, w, h);

          ctx.restore();
        }
      }

      animId = requestAnimationFrame(renderLensRefraction);
    };

    animId = requestAnimationFrame(renderLensRefraction);
    return () => cancelAnimationFrame(animId);
  }, [lensDimensions, mode, posX, posY, textCanvasRef, containerRef]);

  return (
    <motion.div
      ref={lensRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        left: smoothX,
        top: smoothY,
        width: lensDimensions.width,
        height: lensDimensions.height,
        touchAction: 'none',
      }}
      className={`
        absolute z-30 select-none cursor-grab active:cursor-grabbing
        rounded-3xl p-1 overflow-hidden
        bg-white/[0.035] backdrop-blur-md
        border border-white/20
        shadow-[0_8px_32px_rgba(0,0,0,0.8),inset_0_1px_0.5px_rgba(255,255,255,0.45)]
        transition-shadow duration-300
      `}
    >
      {/* Delicate Chromatic Edge Fringe (Cyan, Violet, Magenta, Green, Yellow) */}
      <div 
        className="pointer-events-none absolute inset-0 rounded-3xl p-[1px]"
        style={{
          background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.45) 0%, rgba(139, 92, 246, 0.4) 25%, rgba(236, 72, 153, 0.38) 50%, rgba(52, 211, 153, 0.35) 75%, rgba(250, 204, 21, 0.35) 90%, rgba(56, 189, 248, 0.45) 100%)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      {/* Optical Canvas Refraction & Magnification Buffer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full rounded-[22px] pointer-events-none"
      />

      {/* Top HUD / Lens Telemetry Header */}
      <div className="relative z-10 flex items-center justify-between px-3 py-1.5 text-[9px] font-mono text-neutral-300 uppercase tracking-widest border-b border-white/10 bg-black/40 backdrop-blur-sm rounded-t-2xl">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span className="font-bold text-white">OPTICAL LENS // η=1.52</span>
        </div>
        <div className="flex items-center gap-2 text-neutral-400">
          <span>{mode === 'convex' ? '1.25x CONVEX' : mode === 'diffract' ? 'λ DISPERSION' : '1.14x FLAT'}</span>
          <span className="text-white/30">•</span>
          <span className="text-[8px] text-neutral-500 hidden sm:inline">DRAG TO INSPECT</span>
        </div>
      </div>

      {/* Bottom Subtle Lens Controls / Coordinate Bar */}
      <div className="absolute bottom-2 left-3 right-3 z-10 flex items-center justify-between text-[8px] font-mono text-neutral-400 uppercase tracking-wider bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-neutral-500">λ</span>
          <span className="text-neutral-300">480nm–650nm</span>
        </div>

        {onModeChange && (
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onModeChange('inspect');
              }}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                mode === 'inspect' ? 'bg-white text-black font-bold' : 'hover:text-white'
              }`}
            >
              Flat
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onModeChange('convex');
              }}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                mode === 'convex' ? 'bg-white text-black font-bold' : 'hover:text-white'
              }`}
            >
              Convex
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onModeChange('diffract');
              }}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                mode === 'diffract' ? 'bg-white text-black font-bold' : 'hover:text-white'
              }`}
            >
              Prism
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};
