"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

interface TextScrambleProps {
  text: string;
  trigger?: "load" | "hover";
  speed?: number;
  className?: string;
  characterSet?: string;
}

export const TextScramble: React.FC<TextScrambleProps> = ({
  text,
  trigger = "load",
  speed = 50,
  className,
  characterSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*",
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [hasAnimated, setHasAnimated] = useState(false);
  const animationRef = useRef<number | null>(null);
  const iterationRef = useRef(0);

  const scramble = useCallback(() => {
    // Reset iteration
    iterationRef.current = 0;

    const animate = () => {
      const currentIteration = iterationRef.current;

      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (index < currentIteration) {
              return text[index];
            }
            if (letter === " ") return " "; // Preserve spaces
            return characterSet[Math.floor(Math.random() * characterSet.length)];
          })
          .join("")
      );

      if (currentIteration < text.length) {
        iterationRef.current += 1 / 3;
        animationRef.current = requestAnimationFrame(() => {
          setTimeout(animate, speed);
        });
      } else {
        // Ensure final text is correct
        setDisplayText(text);
        setHasAnimated(true);
      }
    };

    animate();
  }, [text, speed, characterSet]);

  useEffect(() => {
    if (trigger === "load" && !hasAnimated) {
      // Small delay to ensure component is mounted
      const timeoutId = setTimeout(() => {
        scramble();
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [trigger, hasAnimated, scramble]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handleHover = () => {
    if (trigger === "hover") {
      setHasAnimated(false);
      scramble();
    }
  };

  return (
    <motion.span className={className} onMouseEnter={handleHover}>
      {displayText}
    </motion.span>
  );
};
