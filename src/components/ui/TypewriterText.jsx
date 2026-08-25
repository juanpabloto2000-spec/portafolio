import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function TypewriterText({ 
  text = "", 
  highlightWords = [],
  className = "",
  highlightClassName = "text-metallic font-extrabold",
  speed = 40, // ms per character
  delay = 300 // ms before start
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    if (!isInView || !text) return;

    let currentIndex = 0;
    setDisplayedText("");
    setIsTypingComplete(false);

    const startTimer = setTimeout(() => {
      const interval = setInterval(() => {
        currentIndex++;
        setDisplayedText(text.slice(0, currentIndex));

        if (currentIndex >= text.length) {
          clearInterval(interval);
          setTimeout(() => setIsTypingComplete(true), 1200);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [isInView, text, speed, delay]);

  // Helper to parse and render text with highlight words
  const renderFormattedText = (fullString) => {
    if (!fullString) return null;

    const words = fullString.split(" ");
    return words.map((word, wIdx) => {
      const cleanWord = word.replace(/[,.:;¿?¡!]/g, "").toLowerCase();
      const isHighlight = highlightWords.some(hw => hw.toLowerCase() === cleanWord);

      return (
        <span 
          key={wIdx} 
          className={`inline ${isHighlight ? highlightClassName : ''}`}
        >
          {word}
          {wIdx < words.length - 1 ? " " : ""}
        </span>
      );
    });
  };

  return (
    <span ref={ref} className={`inline ${className}`}>
      {renderFormattedText(displayedText)}

      {/* Blinking Typewriter Cursor */}
      {!isTypingComplete && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block ml-1 font-mono font-light text-white select-none text-opacity-80"
        >
          |
        </motion.span>
      )}
    </span>
  );
}
