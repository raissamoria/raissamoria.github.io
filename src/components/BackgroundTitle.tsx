import { forwardRef } from 'react';
import { motion } from 'motion/react';

interface BackgroundTitleProps {
  text?: string;
  className?: string;
}

export const BackgroundTitle = forwardRef<HTMLDivElement, BackgroundTitleProps>(
  ({ text = "MORIA", className = "" }, ref) => {
    return (
      <div 
        ref={ref}
        className={`absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none select-none overflow-hidden z-10 ${className}`}
      >
        <motion.h1
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 1.1,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.15
          }}
          className="text-[#F5F5F5] font-black uppercase tracking-[-0.045em] leading-[0.8] text-[20vw] sm:text-[22vw] md:text-[21vw] lg:text-[20vw] xl:text-[19vw] font-sans text-center max-w-[95vw] whitespace-nowrap drop-shadow-[0_0_80px_rgba(255,255,255,0.06)]"
          style={{
            fontFamily: "Inter, 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
            fontWeight: 900,
          }}
        >
          {text}
        </motion.h1>
      </div>
    );
  }
);

BackgroundTitle.displayName = 'BackgroundTitle';
