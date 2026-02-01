"use client";
import React from "react";
import { motion, useInView, Variants } from "framer-motion";
import type { AnimationDirection, BaseComponentProps } from "@/app/types";

interface ScrollRevealProps extends BaseComponentProps {
  direction?: AnimationDirection | "fade" | "scale";
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  margin?: `${number}${"px" | "%"}` | `${number}${"px" | "%"} ${number}${"px" | "%"}` | `${number}${"px" | "%"} ${number}${"px" | "%"} ${number}${"px" | "%"}` | `${number}${"px" | "%"} ${number}${"px" | "%"} ${number}${"px" | "%"} ${number}${"px" | "%"}`;
  stagger?: number;
}

const getDirectionVariants = (direction: ScrollRevealProps["direction"], distance: number): Variants => {
  const directions: Record<string, Variants> = {
    up: { hidden: { opacity: 0, y: distance }, visible: { opacity: 1, y: 0 } },
    down: { hidden: { opacity: 0, y: -distance }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: distance }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: -distance }, visible: { opacity: 1, x: 0 } },
    fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
    scale: { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } },
  };
  return directions[direction || "up"];
};

const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, direction = "up", delay = 0, duration = 0.6, distance = 30, once = true, margin = "-100px", stagger, className = "" }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin });
  const variants = getDirectionVariants(direction, distance);

  if (stagger && React.Children.count(children) > 1) {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
        className={className}
      >
        {React.Children.map(children, (child) => (
          <motion.div variants={variants} transition={{ duration, ease: [0.22, 1, 0.36, 1] }}>{child}</motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export { ScrollReveal };
export type { ScrollRevealProps };
