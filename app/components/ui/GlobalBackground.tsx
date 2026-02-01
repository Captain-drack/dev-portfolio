"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";

export function GlobalBackground() {
  const { scrollY } = useScroll();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setSpotlightPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Generate random positions for particles (stable after mount)
  const particles = mounted ? [...Array(8)].map((_, i) => ({
    id: i,
    left: `${(i * 13 + 5) % 100}%`,
    top: `${(i * 17 + 10) % 100}%`,
    size: 150 + (i * 50) % 200,
    duration: 10 + (i % 5) * 3,
    delay: i * 0.5,
  })) : [];

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
      {/* Dynamic Spotlight Background */}
      <div
        className="absolute inset-0 transition-opacity duration-500 opacity-25"
        style={{
          background: `radial-gradient(800px circle at ${spotlightPos.x}px ${spotlightPos.y}px, var(--palette-primary), transparent 40%)`,
        }}
      />

      {/* Floating Particles Effect - Theme Reactive */}
      {mounted && particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.left,
            top: particle.top,
            background: `radial-gradient(circle, var(--palette-primary), transparent)`,
            opacity: 0.08,
            filter: 'blur(40px)',
          }}
          animate={{
            x: [0, 40, 0, -40, 0],
            y: [0, -40, 0, 40, 0],
            scale: [1, 1.15, 1, 0.9, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}

      {/* Secondary Accent Particles */}
      {mounted && particles.slice(0, 4).map((particle) => (
        <motion.div
          key={`accent-${particle.id}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: particle.size * 0.7,
            height: particle.size * 0.7,
            right: particle.left,
            bottom: particle.top,
            background: `radial-gradient(circle, var(--palette-accent1), transparent)`,
            opacity: 0.05,
            filter: 'blur(50px)',
          }}
          animate={{
            x: [0, -30, 0, 30, 0],
            y: [0, 30, 0, -30, 0],
            scale: [1, 0.9, 1, 1.1, 1],
          }}
          transition={{
            duration: particle.duration + 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay + 2,
          }}
        />
      ))}

      {/* Accent2 Particles - Subtle */}
      {mounted && particles.slice(0, 3).map((particle) => (
        <motion.div
          key={`accent2-${particle.id}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: particle.size * 0.5,
            height: particle.size * 0.5,
            left: `${50 + (particle.id * 15)}%`,
            top: `${30 + (particle.id * 20)}%`,
            background: `radial-gradient(circle, var(--palette-accent2), transparent)`,
            opacity: 0.04,
            filter: 'blur(60px)',
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: particle.duration + 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay + 4,
          }}
        />
      ))}

      {/* Dynamic Moving Grid Background */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgb(var(--color-foreground)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--color-foreground)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          y: useTransform(scrollY, [0, 1000], [0, 300])
        }}
      />

      {/* Gradient Overlay for depth */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(ellipse at 20% 20%, var(--palette-primary), transparent 50%),
                       radial-gradient(ellipse at 80% 80%, var(--palette-accent2), transparent 50%)`,
          opacity: 0.05,
        }}
      />
    </div>
  );
}
