"use client";
import React, { useEffect, useState, useRef } from "react";
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
  characterSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;':\",./<>?",
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startScramble = React.useCallback(() => {
    if (isScrambling) return;
    setIsScrambling(true);

    let iteration = 0;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return characterSet[Math.floor(Math.random() * characterSet.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsScrambling(false);
      }

      iteration += 1 / 3;
    }, speed);
  }, [isScrambling, text, speed, characterSet]);

  useEffect(() => {
    if (trigger === "load") {
      startScramble();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [trigger, startScramble]);

  return (
    <motion.span
      className={className}
      onMouseEnter={() => {
        if (trigger === "hover") startScramble();
      }}
    >
      {displayText}
    </motion.span>
  );
};
