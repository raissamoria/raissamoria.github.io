/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

interface DesignPhilosophySectionProps {
  language?: 'pt' | 'en';
}

export const DesignPhilosophySection: React.FC<DesignPhilosophySectionProps> = ({
  language = 'pt',
}) => {
  const shouldReduceMotion = useReducedMotion();
  const isPt = language === 'pt';

  const words = isPt
    ? ['Desenho.', 'Penso.', 'Questiono.', 'Pesquiso.', 'Experimento.']
    : ['I design.', 'I think.', 'I question.', 'I research.', 'I experiment.'];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 2200);

    return () => clearInterval(interval);
  }, [words.length, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return (
      <section
        aria-label={isPt ? 'Filosofia de Design' : 'Design Philosophy'}
        className="relative w-full py-28 md:py-40 px-6 md:px-12 border-b"
        style={{
          backgroundColor: 'var(--bg-primary)',
          color: 'var(--text-primary)',
          borderColor: 'var(--border-color)',
        }}
      >
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-center">
          {words.map((word) => (
            <span
              key={word}
              className="font-sans font-black tracking-[-0.04em] leading-[1.08]"
              style={{
                fontSize: 'clamp(2rem, 5vw, 4.5rem)',
                color: 'var(--text-primary)',
              }}
            >
              {word}
            </span>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      aria-label={isPt ? 'Filosofia de Design' : 'Design Philosophy'}
      className="relative w-full min-h-[60vh] md:min-h-[72vh] flex items-center justify-center overflow-hidden px-6 md:px-12 py-24 border-b select-none"
      style={{
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        borderColor: 'var(--border-color)',
      }}
    >
      {/* Screen-reader accessible full sequence */}
      <div className="sr-only">
        <p>{words.join(' ')}</p>
      </div>

      <div
        aria-hidden="true"
        className="relative w-full max-w-6xl min-h-[160px] md:min-h-[220px] flex items-center justify-center"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={`${language}-${words[currentIndex]}`}
            initial={{ opacity: 0, y: 36 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1],
              },
            }}
            exit={{
              opacity: 0,
              y: -30,
              transition: {
                duration: 0.45,
                ease: [0.4, 0, 0.2, 1],
              },
            }}
            className="font-sans font-black tracking-[-0.04em] leading-[1.02] text-center will-change-transform block"
            style={{
              fontSize: 'clamp(2.65rem, 9.2vw, 7.75rem)',
              color: 'var(--text-primary)',
            }}
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </div>
    </section>
  );
};
