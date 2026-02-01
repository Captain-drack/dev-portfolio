"use client";
import React from "react";
import { motion, type Variants } from "framer-motion";
import type { AnimatedTextProps } from "@/app/types";

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, animation = "words", stagger = 0.03, delay = 0, as = "p", className = "" }) => {
  const Tag = as;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delayChildren: delay, staggerChildren: stagger } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
      }
    },
  };

  if (animation === "chars") {
    const chars = text.split("");
    return (
      <motion.span initial="hidden" animate="visible" variants={containerVariants} className={`inline-block ${className}`} aria-label={text}>
        {chars.map((char, index) => (
          <motion.span key={index} variants={itemVariants} className="inline-block" style={{ whiteSpace: char === " " ? "pre" : "normal" }}>
            {char}
          </motion.span>
        ))}
      </motion.span>
    );
  }

  if (animation === "words") {
    const words = text.split(" ");
    return (
      <Tag className={className}>
        <motion.span initial="hidden" animate="visible" variants={containerVariants} className="inline">
          {words.map((word, index) => (
            <motion.span key={index} variants={itemVariants} className="inline-block mr-[0.25em]">{word}</motion.span>
          ))}
        </motion.span>
      </Tag>
    );
  }

  const lines = text.split("\n");
  return (
    <Tag className={className}>
      <motion.span initial="hidden" animate="visible" variants={containerVariants} className="block">
        {lines.map((line, index) => (
          <motion.span key={index} variants={itemVariants} className="block">{line}</motion.span>
        ))}
      </motion.span>
    </Tag>
  );
};

export { AnimatedText };
export type { AnimatedTextProps };
