"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Very smooth, laggy spring for the atmosphere effect
  const springConfig = { damping: 40, stiffness: 200, mass: 0.8 };
  const haloX = useSpring(mouseX, springConfig);
  const haloY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("role") === "button" ||
        target.classList.contains("cursor-pointer")
      ) {
        setLinkHovered(true);
      } else {
        setLinkHovered(false);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <style jsx global>{`
        /* Restore native interactions */
        body, a, button, input, textarea, select {
          cursor: auto !important;
        }
        
        /* Optional: Nice pointer for links */
        a, button, [role="button"], .cursor-pointer {
          cursor: pointer !important;
        }
      `}</style>

      {/* Ambient Halo Follower */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[50]"
        style={{
          x: haloX,
          y: haloY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="rounded-full blur-2xl opacity-40 mix-blend-screen"
          style={{
            background: "radial-gradient(circle, var(--palette-primary) 0%, transparent 70%)",
          }}
          animate={{
            width: linkHovered ? 120 : 60,
            height: linkHovered ? 120 : 60,
            scale: clicked ? 0.9 : 1,
            opacity: clicked ? 0.6 : 0.4
          }}
          transition={{ type: "tween", ease: "backOut", duration: 0.3 }}
        />

        {/* Optional: Tiny dot at exact mouse position if user wants precise tracking */}
        {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white/50 rounded-full" /> */}
      </motion.div>
    </>
  );
}
