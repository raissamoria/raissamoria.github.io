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

    // Magnification factor (subtle optical glass zoom)
    const magnification = 1.16 + (orb.depth * 0.08);
    const sampleSize = size / magnification;
    const sampleX = orb.x - sampleSize / 2;
    const sampleY = orb.y - sampleSize / 2;

    // Subtle chromatic dispersion near the lens edges:
    // Red/Magenta channel (slight offset)
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 0.95;
    ctx.drawImage(
      srcCanvas,
      sampleX - 1.4 * orb.depth,
      sampleY - 0.8 * orb.depth,
      sampleSize,
      sampleSize,
      0,
      0,
      size,
      size
    );

    // Cyan/Blue channel (slight opposite offset)
    ctx.globalCompositeOperation = 'screen';
    ctx.globalAlpha = 0.65;
    ctx.drawImage(
      srcCanvas,
      sampleX + 1.4 * orb.depth,
      sampleY + 0.8 * orb.depth,
      sampleSize,
      sampleSize,
      0,
      0,
      size,
      size
    );

    // Primary Core Pass (crisp, high-clarity typography)
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = 0.95;
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

    // 2. Optical Lens Radial Sheen: Center is completely transparent and colorless, edge has delicate glass sheen
    const rimGradient = ctx.createRadialGradient(
      radius, radius, radius * 0.72,
      radius, radius, radius
    );
    rimGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
    rimGradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.015)');
    rimGradient.addColorStop(0.95, 'rgba(255, 255, 255, 0.06)');
    rimGradient.addColorStop(1, 'rgba(255, 255, 255, 0.12)');

    ctx.fillStyle = rimGradient;
    ctx.beginPath();
    ctx.arc(radius, radius, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }, [orb.x, orb.y, orb.size, orb.depth, containerWidth, containerHeight, textCanvasRef]);

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
      {/* 1. Subtle, Soft Ambient Occlusion Shadow */}
      <div 
        className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-300"
        style={{
          transform: `translate3d(0, ${8 * orb.depth}px, 0) scale(${0.92 * orb.depth})`,
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.15) 50%, transparent 75%)',
          filter: `blur(${10 * orb.depth}px)`,
          opacity: isDragged ? 0.7 : 0.45,
        }}
      />

      {/* 2. Optical Refraction Dynamic Canvas (Draws gently magnified letters underneath) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full rounded-full pointer-events-none"
        style={{
          filter: 'contrast(108%) brightness(104%)',
        }}
      />

      {/* 3. Thin, Clear Optical Glass Bubble Shell */}
      <div 
        className="absolute inset-0 rounded-full pointer-events-none overflow-hidden"
        style={{
          border: '1px solid rgba(255, 255, 255, 0.22)',
          boxShadow: `
            inset 0 1px 1px 0 rgba(255, 255, 255, 0.45),
            inset 0 -1px 1px 0 rgba(255, 255, 255, 0.2),
            0 8px 32px rgba(0, 0, 0, 0.3)
          `,
        }}
      >
        {/* Very subtle iridescent edge with small hints of cyan, violet, magenta, green and yellow */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none opacity-85 transition-opacity duration-300"
          style={{
            background: `conic-gradient(
              from ${orb.deformAngle || 45}deg at 50% 50%,
              rgba(80, 230, 245, 0.38) 0deg,
              rgba(175, 120, 255, 0.34) 72deg,
              rgba(245, 105, 195, 0.3) 144deg,
              rgba(250, 230, 110, 0.26) 216deg,
              rgba(100, 240, 170, 0.3) 288deg,
              rgba(80, 230, 245, 0.38) 360deg
            )`,
            maskImage: 'radial-gradient(circle, transparent 86%, black 96%)',
            WebkitMaskImage: 'radial-gradient(circle, transparent 86%, black 96%)',
            filter: 'blur(0.8px)',
            opacity: isHovered ? 1 : 0.85,
          }}
        />

        {/* Gentle Crescent Highlight (Top Edge Reflection) */}
        <div 
          className="absolute top-[3%] left-[16%] w-[68%] h-[28%] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center top, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.2) 40%, transparent 75%)',
            transform: 'rotate(-12deg)',
            filter: 'blur(0.5px)',
          }}
        />

        {/* Delicate Secondary Glint (Bottom Rim bounce) */}
        <div 
          className="absolute bottom-[4%] right-[22%] w-[50%] h-[16%] rounded-full pointer-events-none opacity-60"
          style={{
            background: 'radial-gradient(ellipse at center bottom, rgba(255, 255, 255, 0.4) 0%, transparent 75%)',
            transform: 'rotate(12deg)',
          }}
        />

        {/* Hairline Internal Optical Edge */}
        <div 
          className="absolute inset-[1px] rounded-full pointer-events-none"
          style={{
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        />
      </div>

      {/* 4. Subtle Interactive Pulse Glow on Active Drag */}
      {isDragged && (
        <div 
          className="absolute -inset-1.5 rounded-full pointer-events-none animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, transparent 70%)',
          }}
        />
      )}
    </div>
  );
};
