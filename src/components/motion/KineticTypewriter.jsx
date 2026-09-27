import React, { useState, useEffect } from 'react';

export default function KineticTypewriter({
  text = '',
  speed = 35,
  delay = 200,
  className = '',
  cursorClassName = 'text-emerald-400',
  onComplete,
}) {
  const [displayedLength, setDisplayedLength] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let timeoutId;
    let intervalId;

    timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        setDisplayedLength((prev) => {
          if (prev < text.length) {
            return prev + 1;
          } else {
            clearInterval(intervalId);
            setIsTypingComplete(true);
            if (onComplete) {
              setTimeout(() => onComplete(), 0);
            }
            return prev;
          }
        });
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, speed, delay, onComplete]);

  return (
    <span className={`inline-block ${className}`}>
      {text.slice(0, displayedLength)}
      {!isTypingComplete && (
        <span className={`inline-block animate-pulse font-normal ml-0.5 ${cursorClassName}`}>
          |
        </span>
      )}
    </span>
  );
}
