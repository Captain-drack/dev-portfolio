"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowDown, ArrowUpRight, Sparkles, Code2, Layers, Zap } from "lucide-react";
import { TextScramble } from "@/app/components/ui/TextScramble";
import { heroData } from "@/app/data";

// Floating service badges with theme-reactive colors
const serviceBadges = [
  { icon: Code2, label: "Frontend", delay: 0.2 },
  { icon: Layers, label: "Backend", delay: 0.4 },
  { icon: Zap, label: "Full Stack", delay: 0.6 },
];

const Body = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Mouse tracking for spotlight and 3D effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });

  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(springY, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-8deg", "8deg"]);

  // Parallax for decorative elements
  const yParallax = useTransform(scrollY, [0, 500], [0, 150]);
  const opacityFade = useTransform(scrollY, [0, 400], [1, 0]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { width, height, left, top } = containerRef.current.getBoundingClientRect();
    const xPct = (e.clientX - left) / width - 0.5;
    const yPct = (e.clientY - top) / height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
    setSpotlightPos({
      x: ((e.clientX - left) / width) * 100,
      y: ((e.clientY - top) / height) * 100
    });
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      {/* GlobalBackground provides the floating particles - no local background needed */}

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-24 lg:pt-0">

        {/* Left Column - Text Content (First on mobile) */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6 md:gap-8 order-1">

          {/* Status Badge - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="group relative flex items-center gap-3 px-5 py-2.5 rounded-full overflow-hidden"
            style={{
              background: `linear-gradient(135deg, var(--palette-primary) / 0.1, var(--palette-accent2) / 0.05)`,
              border: `1px solid var(--palette-primary) / 0.3`,
            }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 -translate-x-full"
              style={{ background: `linear-gradient(90deg, transparent, var(--palette-primary) / 0.2, transparent)` }}
              animate={{ translateX: ["100%", "-100%"] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            />
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: 'var(--palette-primary)' }} />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: 'var(--palette-primary)' }} />
            </span>
            <span className="text-xs font-medium tracking-wider uppercase" style={{ color: 'var(--palette-primary)' }}>
              {heroData.sectionLabel}
            </span>
          </motion.div>

          {/* Name & Headline with 3D Tilt */}
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative"
          >
            {/* Greeting */}
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl font-mono mb-4 flex items-center gap-3"
              style={{ color: 'rgb(var(--color-muted-foreground))' }}
            >
              <span style={{ color: 'var(--palette-primary)' }}>&gt;</span>
              <TextScramble text={`Hi, I'm ${heroData.name}`} trigger="load" speed={50} />
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-2 h-5 align-middle"
                style={{ background: 'var(--palette-primary)' }}
              />
            </motion.h2>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-serif text-5xl md:text-7xl lg:text-[7rem] leading-[0.95] tracking-tighter mb-6"
            >
              <span
                className="block transition-colors duration-300"
                style={{ color: 'rgb(var(--color-foreground))' }}
              >
                <TextScramble text={heroData.headline.prefix} trigger="hover" />
              </span>
              <span
                className="block italic font-light relative"
                style={{ color: 'var(--palette-primary)' }}
              >
                <TextScramble text={heroData.headline.highlight} trigger="load" speed={60} />
                {/* Underline accent */}
                <motion.div
                  className="absolute -bottom-2 left-0 h-1 rounded-full"
                  style={{ background: `linear-gradient(90deg, var(--palette-primary), var(--palette-accent2))` }}
                  initial={{ width: 0 }}
                  animate={{ width: "60%" }}
                  transition={{ duration: 1, delay: 1 }}
                />
              </span>
            </motion.h1>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="max-w-xl text-lg md:text-xl leading-relaxed font-light"
            style={{ color: 'rgb(var(--color-muted-foreground))' }}
          >
            {heroData.description}
          </motion.p>

          {/* Social Icons - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center gap-3"
          >
            {heroData.socialLinks.map((social, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={social.link}
                  target="_blank"
                  className="group flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-300"
                  style={{
                    background: 'rgb(var(--color-card))',
                    border: '1px solid rgb(var(--color-foreground) / 0.1)',
                  }}
                >
                  <social.icon
                    size={18}
                    className="transition-colors duration-300"
                    style={{ color: 'rgb(var(--color-muted-foreground))' }}
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-wrap gap-4 mt-2"
          >
            {/* Primary Button */}
            <Link
              href={heroData.cta.primary.link}
              target="_blank"
              className="group relative flex items-center gap-3 px-7 py-4 rounded-full font-medium uppercase tracking-wider overflow-hidden transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, var(--palette-primary), var(--palette-accent1))',
                color: 'rgb(var(--color-background))',
                boxShadow: '0 10px 40px var(--palette-primary) / 0.3',
              }}
            >
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(135deg, var(--palette-accent1), var(--palette-primary))' }}
              />
              <span className="relative z-10 text-sm">{heroData.cta.primary.text}</span>
              <ArrowUpRight size={18} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>

            {/* Secondary Button */}
            <Link
              href={heroData.cta.secondary.link}
              className="group flex items-center gap-3 px-7 py-4 rounded-full font-medium uppercase tracking-wider transition-all duration-300"
              style={{
                background: 'transparent',
                border: '1px solid rgb(var(--color-foreground) / 0.2)',
                color: 'rgb(var(--color-foreground))',
              }}
            >
              <span className="text-sm group-hover:tracking-widest transition-all duration-300">{heroData.cta.secondary.text}</span>
              <Sparkles size={18} className="transition-colors duration-300" style={{ color: 'var(--palette-primary)' }} />
            </Link>
          </motion.div>

        </div>

        {/* Right Column - Visual Element (Hidden on Mobile) */}
        <div className="hidden lg:flex lg:col-span-5 items-center justify-center relative h-[600px] order-2">

          {/* Central Glowing Orb */}
          <motion.div
            className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full opacity-60 blur-2xl"
            style={{ background: `radial-gradient(circle, var(--palette-primary) / 0.4, transparent)` }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Floating Service Badges */}
          <div className="relative w-full h-full">
            {serviceBadges.map((badge, index) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: badge.delay + 0.5 }}
                className="absolute flex items-center gap-3 px-5 py-3 rounded-2xl backdrop-blur-md"
                style={{
                  background: 'rgb(var(--color-card) / 0.8)',
                  border: '1px solid rgb(var(--color-foreground) / 0.1)',
                  boxShadow: '0 8px 32px rgb(var(--color-foreground) / 0.1)',
                  top: index === 0 ? '15%' : index === 1 ? '45%' : '75%',
                  left: index === 0 ? '10%' : index === 1 ? '55%' : '20%',
                }}
              >
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 3 + index,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5,
                  }}
                >
                  <div
                    className="p-2 rounded-xl"
                    style={{ background: 'linear-gradient(135deg, var(--palette-primary), var(--palette-accent2))' }}
                  >
                    <badge.icon size={20} color="white" />
                  </div>
                </motion.div>
                <span
                  className="text-sm font-medium"
                  style={{ color: 'rgb(var(--color-foreground))' }}
                >
                  {badge.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Decorative Rings */}
          <motion.div
            className="absolute w-48 h-48 md:w-64 md:h-64 rounded-full border opacity-20"
            style={{ borderColor: 'var(--palette-primary)' }}
            animate={{ rotate: 360, scale: [1, 1.05, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full border opacity-10"
            style={{ borderColor: 'var(--palette-accent2)' }}
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />

        </div>

      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{ opacity: opacityFade }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
      >
        <span
          className="text-[10px] uppercase tracking-[0.3em] opacity-60"
          style={{ color: 'rgb(var(--color-foreground))' }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="p-2 rounded-full"
          style={{ border: '1px solid rgb(var(--color-foreground) / 0.2)' }}
        >
          <ArrowDown size={18} style={{ color: 'rgb(var(--color-foreground))', opacity: 0.6 }} />
        </motion.div>
      </motion.div>

    </section>
  );
};

export default Body;
