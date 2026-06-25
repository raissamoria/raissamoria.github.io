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

  // Circle is 90px wide/high by default, and expands to 130px on hover
  const size = isHovered ? 130 : 90;

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

      {/* Modern, creative, and playful spotlight mask cursor */}
      <motion.div
        className="custom-cursor fixed top-0 left-0 rounded-full bg-white mix-blend-difference pointer-events-none z-[99999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          width: size,
          height: size,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 250,
        }}
      />
    </>
  );
}
