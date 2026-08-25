import React from 'react';
import { motion } from 'framer-motion';

export default function TypewriterText({ 
  text = "", 
  highlightWords = [],
  className = "text-metallic",
  highlightClassName = "text-metallic-glow font-black",
  speed = 0.022,
  delay = 0.2
}) {
  if (!text) return null;

  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: speed,
        delayChildren: delay,
      },
    },
  };

  const charVariants = {
    hidden: { 
      opacity: 0, 
      y: 8,
      filter: "blur(6px)",
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1]
      }
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={`inline-block ${className}`}
    >
      {words.map((word, wordIndex) => {
        const cleanWord = word.replace(/[,.:;¿?¡!]/g, "").toLowerCase();
        const isHighlight = highlightWords.some(hw => hw.toLowerCase() === cleanWord);

        return (
          <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.28em]">
            {Array.from(word).map((char, charIndex) => (
              <motion.span
                key={charIndex}
                variants={charVariants}
                className={`inline-block ${isHighlight ? highlightClassName : ''}`}
              >
                {char}
              </motion.span>
            ))}
          </span>
        );
      })}
    </motion.span>
  );
}
