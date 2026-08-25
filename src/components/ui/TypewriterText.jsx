import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function TypewriterText({ 
  text = "", 
  highlightWords = [],
  className = "text-metallic",
  highlightClassName = "text-metallic-glow font-black",
  speed = 35, // ms per character
  delay = 250 // ms before start
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
    <span ref={ref} className={`inline-block ${className}`}>
      {renderFormattedText(displayedText)}

      {/* Blinking Typewriter Cursor */}
      {!isTypingComplete && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.65, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block ml-0.5 font-mono font-light text-white select-none not-italic"
          style={{ WebkitTextFillColor: '#ffffff' }}
        >
          |
        </motion.span>
      )}
    </span>
  );
}
