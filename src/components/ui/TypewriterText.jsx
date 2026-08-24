import React from 'react';
import { motion } from 'framer-motion';

export default function TypewriterText({ 
  text, 
  highlightWords = [],
  className = "",
  highlightClassName = "text-metallic",
  speed = 0.04,
  delay = 0.2
}) {
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (customDelay = delay) => ({
      opacity: 1,
      transition: {
        staggerChildren: speed,
        delayChildren: customDelay,
      },
    }),
  };

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 8,
      filter: "blur(4px)" 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.35,
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
        const cleanWord = word.replace(/[,.]/g, "");
        const isHighlight = highlightWords.some(hw => cleanWord.toLowerCase() === hw.toLowerCase());

        return (
          <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.28em]">
            {Array.from(word).map((char, charIndex) => (
              <motion.span
                key={charIndex}
                variants={letterVariants}
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
