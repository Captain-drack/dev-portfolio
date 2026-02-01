"use client";
import React from "react";
import { motion, useInView, Variants } from "framer-motion";
import type { MotionProps, AnimationPreset } from "@/app/types";

const getAnimationVariants = (preset: AnimationPreset): Variants => {
  const presets: Record<AnimationPreset, Variants> = {
    fadeIn: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
    slideUp: { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } },
    slideDown: { hidden: { opacity: 0, y: -30 }, visible: { opacity: 1, y: 0 } },
    scaleIn: { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } },
    none: { hidden: {}, visible: {} },
  };
  return presets[preset];
};

const MotionDiv: React.FC<MotionProps> = ({ children, animation = "fadeIn", delay = 0, duration = 0.5, triggerOnView = false, once = true, className = "" }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-50px" });
  const variants = getAnimationVariants(animation);
  const shouldAnimate = triggerOnView ? isInView : true;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={shouldAnimate ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const MotionSpan: React.FC<MotionProps> = ({ children, animation = "fadeIn", delay = 0, duration = 0.5, triggerOnView = false, once = true, className = "" }) => {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: "-50px" });
  const variants = getAnimationVariants(animation);
  const shouldAnimate = triggerOnView ? isInView : true;

  return (
    <motion.span
      ref={ref}
      initial="hidden"
      animate={shouldAnimate ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.span>
  );
};

export { MotionDiv, MotionSpan };
export type { MotionProps };
