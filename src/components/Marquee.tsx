import { motion } from "motion/react";

interface MarqueeProps {
  text: string;
  speed?: number; // duration in seconds
  reverse?: boolean;
}

export default function Marquee({ text, speed = 20, reverse = false }: MarqueeProps) {
  // Multiply the text to ensure it spans across the entire screen
  const items = Array(8).fill(text);

  return (
    <div className="w-full overflow-hidden whitespace-nowrap border-y border-black/10 py-4 bg-white select-none">
      <div className="flex w-max">
        {/* Animated strip 1 */}
        <motion.div
          animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: speed,
            repeat: Infinity,
          }}
          className="flex whitespace-nowrap gap-4 pr-4"
        >
          {items.map((item, index) => (
            <span
              key={index}
              className="text-2xl md:text-4xl font-black uppercase tracking-wider text-black flex items-center gap-4"
            >
              <span>{item}</span>
              <span className="text-gray-300 select-none">•</span>
            </span>
          ))}
        </motion.div>
        {/* Animated strip 2 */}
        <motion.div
          animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: speed,
            repeat: Infinity,
          }}
          className="flex whitespace-nowrap gap-4 pr-4"
        >
          {items.map((item, index) => (
            <span
              key={index}
              className="text-2xl md:text-4xl font-black uppercase tracking-wider text-black flex items-center gap-4"
            >
              <span>{item}</span>
              <span className="text-gray-300 select-none">•</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
