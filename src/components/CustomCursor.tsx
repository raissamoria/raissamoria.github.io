import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Motion values for smooth tracking
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Easing physics configuration for exceptionally smooth movement
  const springConfig = { damping: 28, stiffness: 300, mass: 0.6 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const checkDevice = () => {
      const mobileQuery = window.matchMedia("(pointer: coarse)");
      setIsMobile(mobileQuery.matches || navigator.maxTouchPoints > 0);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = target.closest("a, button, [role='button'], input, select, textarea, .interactive-element");
      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isMobile, isVisible, mouseX, mouseY]);

  if (isMobile || !isVisible) {
    return null;
  }

  // Optical lens reticle size: 26px default, 44px on hover
  const size = isHovered ? 44 : 26;

  return (
    <>
      {/* CSS stylesheet block to hide standard cursor on desktop only */}
      <style>{`
        @media (pointer: fine) {
          body, 
          a, 
          button, 
          input, 
          select, 
          textarea, 
          [role="button"],
          .interactive-element {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Optical precision central dot */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 rounded-full bg-white pointer-events-none z-[99999]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Subtle Optical Glass Lens Ring with Chromatic Edge */}
      <motion.div
        className="custom-cursor fixed top-0 left-0 rounded-full pointer-events-none z-[99998] border border-white/40 backdrop-blur-[2px] bg-white/[0.03]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          width: size,
          height: size,
          boxShadow: isHovered
            ? "0 0 12px -1px rgba(56, 189, 248, 0.4), 0 0 16px -2px rgba(236, 72, 153, 0.3), inset 0 1px 0.5px rgba(255, 255, 255, 0.6)"
            : "0 0 8px -2px rgba(255, 255, 255, 0.2), inset 0 1px 0.5px rgba(255, 255, 255, 0.3)",
        }}
        transition={{
          type: "spring",
          damping: 26,
          stiffness: 280,
        }}
      />
    </>
  );
}
