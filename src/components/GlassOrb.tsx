import React, { useRef, useEffect, useState } from 'react';
import { GlassOrbData } from '../types';

interface GlassOrbProps {
  orb: GlassOrbData;
  isDragged: boolean;
  onPointerDown: (e: React.PointerEvent, id: number) => void;
  // Reference to the background text canvas/state for optical distortion
  textCanvasRef?: React.RefObject<HTMLCanvasElement | null>;
  containerWidth: number;
  containerHeight: number;
}

export const GlassOrb: React.FC<GlassOrbProps> = ({
  orb,
  isDragged,
  onPointerDown,
  textCanvasRef,
  containerWidth,
  containerHeight,
}) => {
  const orbRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Synchronize dynamic position, rotation, and refraction canvas
  useEffect(() => {
    const el = orbRef.current;
    if (!el) return;

    // Apply transform via 3D hardware acceleration
    const scale = (orb.baseScale || 1) * (isDragged ? 1.05 : isHovered ? 1.025 : 1);
    const deformX = orb.shapeRatio >= 1 ? orb.shapeRatio : 1;
    const deformY = orb.shapeRatio < 1 ? 1 / orb.shapeRatio : 1;

    el.style.transform = `translate3d(${orb.x - orb.size / 2}px, ${orb.y - orb.size / 2}px, 0) rotate(${orb.rotation}deg) scale(${scale * deformX}, ${scale * deformY})`;
    el.style.zIndex = Math.round(orb.depth * 100).toString();
  }, [orb.x, orb.y, orb.rotation, orb.size, orb.depth, orb.shapeRatio, orb.baseScale, isDragged, isHovered]);

  // Render optical refraction with chromatic dispersion & barrel distortion onto the orb canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const srcCanvas = textCanvasRef?.current;
    if (!canvas || !srcCanvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const size = orb.size;
    if (canvas.width !== size || canvas.height !== size) {
      canvas.width = size;
      canvas.height = size;
    }

    const radius = size / 2;
    ctx.clearRect(0, 0, size, size);

    // Bounding box of the orb in the source background canvas space
    const sx = orb.x - radius;
    const sy = orb.y - radius;

    // Check if the orb is anywhere near the text
    if (sx + size < 0 || sy + size < 0 || sx > containerWidth || sy > containerHeight) {
      return;
    }

    // 1. Draw magnified and spherical-distorted slice of the background text
    ctx.save();
    
    // Circular clipping path
    ctx.beginPath();
    ctx.arc(radius, radius, radius - 1, 0, Math.PI * 2);
    ctx.clip();

    // Magnification factor (simulating convex glass lens zoom)
    const magnification = 1.32 + (orb.depth * 0.15);
    const sampleSize = size / magnification;
    const sampleX = orb.x - sampleSize / 2;
    const sampleY = orb.y - sampleSize / 2;

    // Draw Chromatic Aberration: Red channel (offset -3px), Blue channel (offset +3px), Green (center)
    // Red Channel Pass (Warm shift)
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 0.85;
    ctx.drawImage(
      srcCanvas,
      sampleX - 2.5 * orb.depth,
      sampleY - 1.5 * orb.depth,
      sampleSize,
      sampleSize,
      0,
      0,
      size,
      size
    );

    // Blue/Cyan Channel Pass (Cool shift with chromatic displacement)
    ctx.globalCompositeOperation = 'screen';
    ctx.globalAlpha = 0.75;
    ctx.drawImage(
      srcCanvas,
      sampleX + 3.0 * orb.depth,
      sampleY + 2.0 * orb.depth,
      sampleSize,
      sampleSize,
      0,
      0,
      size,
      size
    );

    // Primary Core Pass (High contrast center)
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = 0.9;
    ctx.drawImage(
      srcCanvas,
      sampleX,
      sampleY,
      sampleSize,
      sampleSize,
      0,
      0,
      size,
      size
    );

    // Reset composite operation
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1.0;

    // 2. Optical Lens Radial Vignette & Refractive Depth
    const depthGradient = ctx.createRadialGradient(
      radius * 0.75, radius * 0.7, radius * 0.1,
      radius, radius, radius
    );
    depthGradient.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
    depthGradient.addColorStop(0.5, 'rgba(10, 15, 25, 0.25)');
    depthGradient.addColorStop(0.85, 'rgba(0, 0, 0, 0.65)');
    depthGradient.addColorStop(1, 'rgba(0, 0, 0, 0.88)');

    ctx.fillStyle = depthGradient;
    ctx.beginPath();
    ctx.arc(radius, radius, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }, [orb.x, orb.y, orb.size, orb.depth, containerWidth, containerHeight, textCanvasRef]);

  // Color profiles based on causticAccent
  const isAmber = orb.causticAccent === 'amber-blue' || orb.causticAccent === 'cyan-warm';

  return (
    <div
      ref={orbRef}
      onPointerDown={(e) => onPointerDown(e, orb.id)}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      className="absolute top-0 left-0 select-none will-change-transform touch-none"
      style={{
        width: `${orb.size}px`,
        height: `${orb.size}px`,
        cursor: isDragged ? 'grabbing' : 'grab',
      }}
    >
      {/* 1. Deep 3D Ambient Drop Shadow */}
      <div 
        className="absolute inset-0 rounded-full pointer-events-none transition-all duration-300"
        style={{
          transform: `translate3d(0, ${18 * orb.depth}px, 0) scale(${0.88 * orb.depth})`,
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 75%)',
          filter: `blur(${16 * orb.depth}px)`,
          opacity: isDragged ? 0.95 : 0.75,
        }}
      />

      {/* 2. Optical Refraction Dynamic Canvas (Draws distorted "MORIA" letters) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full rounded-full pointer-events-none"
        style={{
          filter: 'contrast(125%) brightness(110%)',
        }}
      />

      {/* 3. Liquid Glass 3D Body Composite (Multi-layered caustics & Fresnel) */}
      <div 
        className="absolute inset-0 rounded-full pointer-events-none overflow-hidden"
        style={{
          border: '1px solid rgba(255, 255, 255, 0.22)',
          boxShadow: `
            inset 0 0 1px 1px rgba(255, 255, 255, 0.6),
            inset 0 2px 8px rgba(255, 255, 255, 0.35),
            inset 0 -8px 24px rgba(0, 0, 0, 0.8),
            0 12px 32px rgba(0, 0, 0, 0.6)
          `,
        }}
      >
        {/* Caustic chromatic reflection arcs (Amber at top-left, Cyan at bottom-right) */}
        <div 
          className="absolute inset-0 rounded-full mix-blend-screen opacity-90 transition-opacity duration-300"
          style={{
            background: isAmber
              ? `conic-gradient(
                  from ${orb.deformAngle}deg at 50% 50%,
                  rgba(255, 175, 75, 0.65) 0deg,
                  rgba(255, 220, 150, 0.4) 45deg,
                  rgba(255, 255, 255, 0.85) 75deg,
                  rgba(90, 180, 255, 0.5) 120deg,
                  rgba(20, 90, 220, 0.7) 180deg,
                  rgba(0, 0, 0, 0) 240deg,
                  rgba(255, 140, 40, 0.55) 320deg,
                  rgba(255, 175, 75, 0.65) 360deg
                )`
              : `conic-gradient(
                  from ${orb.deformAngle}deg at 50% 50%,
                  rgba(100, 210, 255, 0.7) 0deg,
                  rgba(255, 255, 255, 0.9) 60deg,
                  rgba(220, 120, 255, 0.5) 140deg,
                  rgba(0, 150, 255, 0.65) 200deg,
                  rgba(0, 0, 0, 0) 270deg,
                  rgba(100, 210, 255, 0.7) 360deg
                )`,
            filter: 'blur(1.5px)',
            opacity: isHovered ? 1 : 0.82,
          }}
        />

        {/* Sharp High-Gloss Light Highlight (Top Crest) */}
        <div 
          className="absolute top-[8%] left-[18%] w-[60%] h-[35%] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center top, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.4) 45%, transparent 75%)',
            transform: 'rotate(-18deg)',
            filter: 'blur(0.5px)',
          }}
        />

        {/* Secondary Delicate Glint (Bottom Rim) */}
        <div 
          className="absolute bottom-[6%] right-[22%] w-[45%] h-[20%] rounded-full pointer-events-none opacity-75"
          style={{
            background: 'radial-gradient(ellipse at center bottom, rgba(255, 240, 200, 0.8) 0%, rgba(130, 200, 255, 0.3) 50%, transparent 80%)',
            transform: 'rotate(15deg)',
          }}
        />

        {/* Luminous Outer Glass Rim Ring */}
        <div 
          className="absolute inset-[1px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 40% 35%, transparent 68%, rgba(255, 255, 255, 0.4) 85%, rgba(255, 255, 255, 0.8) 98%, transparent 100%)',
          }}
        />

        {/* Internal Dark Glass Body Core (Fresnel Shadow) */}
        <div 
          className="absolute inset-[8%] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 60% 65%, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 60%, transparent 85%)',
            mixBlendMode: 'multiply',
          }}
        />
      </div>

      {/* 4. Subtle Interactive Pulse Glow on Active Drag */}
      {isDragged && (
        <div 
          className="absolute -inset-2 rounded-full pointer-events-none animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%)',
          }}
        />
      )}
    </div>
  );
};
