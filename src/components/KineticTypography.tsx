import { motion, useSpring } from "motion/react";
import { useRef, useEffect, useState } from "react";

interface KineticLetterProps {
  char: string;
  mode: "dodge" | "magnetic" | "stretch" | "elastic";
  index: number;
  key?: any;
}

function KineticLetter({ char, mode, index }: KineticLetterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  
  // Custom precise springs to mimic physics with beautiful dampening
  const springConfig = { damping: 15, stiffness: 180, mass: 0.5 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);
  const scaleX = useSpring(1, springConfig);
  const scaleY = useSpring(1, springConfig);
  const skewX = useSpring(0, springConfig);
  const skewY = useSpring(0, springConfig);
  const rotate = useSpring(0, springConfig);
  
  const [currentColor, setCurrentColor] = useState("#121212");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const letterCenterX = rect.left + rect.width / 2;
      const letterCenterY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - letterCenterX;
      const distanceY = e.clientY - letterCenterY;
      const distance = Math.hypot(distanceX, distanceY);
      
      const maxDistance = 150; // Cursor detection radius
      if (distance < maxDistance) {
        const power = (maxDistance - distance) / maxDistance; // 0 to 1
        const angle = Math.atan2(distanceY, distanceX);
        
        if (mode === "dodge") {
          // Gently push a few pixels away
          x.set(-(distanceX / (distance || 1)) * 30 * power);
          y.set(-(distanceY / (distance || 1)) * 30 * power);
          scaleX.set(1 + 0.1 * power);
          scaleY.set(1 + 0.1 * power);
          rotate.set((distanceX / (distance || 1)) * 15 * power);
          setCurrentColor("#000000");
        } else if (mode === "magnetic") {
          // Attract a bit towards the cursor
          x.set((distanceX / (distance || 1)) * 20 * power);
          y.set((distanceY / (distance || 1)) * 20 * power);
          scaleX.set(1 - 0.05 * power);
          scaleY.set(1 - 0.05 * power);
          rotate.set(-(distanceX / (distance || 1)) * 10 * power);
          setCurrentColor("#666666");
        } else if (mode === "stretch") {
          // Vertical stretching (like variable width fonts)
          x.set(0);
          y.set(-10 * power);
          scaleX.set(1 - 0.25 * power);
          scaleY.set(1 + 0.6 * power); // Make letter tall & condensed
          skewX.set(Math.sin(angle) * 10 * power);
          rotate.set(0);
          setCurrentColor("#121212");
        } else if (mode === "elastic") {
          // Bouncy vertical shift
          x.set(0);
          y.set(-25 * power);
          scaleX.set(1);
          scaleY.set(1);
          rotate.set((index % 2 === 0 ? 1 : -1) * 20 * power);
          setCurrentColor("#888888");
        }
      } else {
        // Smoothly settle back to equilibrium
        x.set(0);
        y.set(0);
        scaleX.set(1);
        scaleY.set(1);
        skewX.set(0);
        skewY.set(0);
        rotate.set(0);
        setCurrentColor("#121212");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [x, y, scaleX, scaleY, skewX, skewY, rotate, mode, index]);

  return (
    <div className="relative inline-flex items-center justify-center select-none">
      <motion.span
        ref={ref}
        style={{
          x,
          y,
          scaleX,
          scaleY,
          skewX,
          skewY,
          rotate,
          color: currentColor,
          display: "inline-block",
        }}
        className="inline-block cursor-pointer font-black tracking-tight select-none transform-gpu origin-center relative z-10 transition-colors duration-200"
      >
        {char}
      </motion.span>
    </div>
  );
}

interface KineticTypographyProps {
  text?: string;
  className?: string;
}

type MotionMode = "dodge" | "magnetic" | "stretch" | "elastic";

export default function KineticTypography({ text: defaultText = "MORIÁ", className = "" }: KineticTypographyProps) {
  const [activeMode, setActiveMode] = useState<MotionMode>("dodge");
  const [currentText, setCurrentText] = useState(defaultText);

  useEffect(() => {
    setCurrentText(defaultText);
  }, [defaultText]);

  const words = currentText.split(" ");

  const modeDescription = {
    dodge: "As letras afastam-se suavemente do ponteiro do rato.",
    magnetic: "As letras são atraídas magneticamente na direção do rato.",
    stretch: "As letras comprimem e alongam-se verticalmente (peso variável).",
    elastic: "As letras dão um pequeno salto elástico com rotação subtil.",
  };

  return (
    <div className="flex flex-col gap-6 w-full select-none text-black items-center">
      {/* Controls Dashboard */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-y border-gray-100 relative z-20 text-[10px] uppercase tracking-[0.25em] font-bold text-gray-400 w-full">
        <div className="flex items-center gap-2 justify-center sm:justify-start">
          <span className="opacity-40">Modo Interativo:</span>
        </div>

        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-6">
          {(["dodge", "magnetic", "stretch", "elastic"] as MotionMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setActiveMode(mode)}
              className={`transition-all duration-200 cursor-pointer ${
                activeMode === mode 
                  ? "text-[#121212] border-b border-black pb-0.5" 
                  : "hover:text-[#121212]"
              }`}
            >
              {mode === "dodge" ? "Afastar" : mode === "magnetic" ? "Atrair" : mode === "stretch" ? "Esticar" : "Elasticidade"}
            </button>
          ))}
        </div>
      </div>

      {/* Guide label */}
      <div className="h-4 text-[11px] text-gray-400 font-medium tracking-wide text-center">
        ✨ {modeDescription[activeMode]} Passe o cursor por cima das letras abaixo!
      </div>

      {/* Interactive Kinetic Typographic Frame */}
      <div className={`relative ${className} py-8 overflow-visible w-full flex justify-center`}>
        <div className="flex flex-wrap gap-x-8 md:gap-x-16 gap-y-6 items-center justify-center w-full">
          {words.map((word, wordIndex) => {
            const prevWordsLength = words.slice(0, wordIndex).join("").length;
            return (
              <div key={wordIndex} className="flex gap-0.5 md:gap-1.5 flex-nowrap">
                {word.split("").map((char, charIndex) => (
                  <KineticLetter 
                    key={charIndex} 
                    char={char} 
                    mode={activeMode} 
                    index={prevWordsLength + charIndex} 
                  />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
