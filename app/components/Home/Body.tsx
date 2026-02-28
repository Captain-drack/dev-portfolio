"use client";
import React, { useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Sparkles, Code2, Layers, Zap, Terminal, Braces } from "lucide-react";
import { TextScramble } from "@/app/components/ui/TextScramble";
import { heroData } from "@/app/data";

// Floating service badges
const serviceBadges = [
  { icon: Code2, label: "Frontend Dev", sublabel: "React · Next.js", x: "0%", y: "8%" },
  { icon: Layers, label: "Backend Dev", sublabel: "Node · Nest.js", x: "62%", y: "30%" },
  { icon: Zap, label: "Full Stack", sublabel: "End to End", x: "8%", y: "70%" },
];

// Code snippet for the floating card
const codeLines = [
  { indent: 0, text: 'const developer = {', color: 'var(--palette-primary)' },
  { indent: 1, text: 'name: "Akshat Austin",', color: 'rgb(var(--color-foreground) / 0.6)' },
  { indent: 1, text: 'role: "Full Stack Dev",', color: 'rgb(var(--color-foreground) / 0.6)' },
  { indent: 1, text: 'skills: ["React", "Next"],', color: 'var(--palette-accent2)' },
  { indent: 1, text: 'passion: "Building",', color: 'rgb(var(--color-foreground) / 0.6)' },
  { indent: 0, text: '};', color: 'var(--palette-primary)' },
];

// Tech stack for the ticker below description
const techStack = ["React.js", "Next.js", "TypeScript", "Node.js", "Nest.js", "MongoDB", "Docker"];

const Body = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const opacityFade = useTransform(scrollY, [0, 400], [1, 0]);

  // 3D tilt on avatar via direct DOM manipulation
  const handleAvatarMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!avatarRef.current) return;
    const { width, height, left, top } = avatarRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    avatarRef.current.style.transform = `perspective(800px) rotateX(${y * -12}deg) rotateY(${x * 12}deg) scale(1.03)`;
  }, []);

  const handleAvatarMouseLeave = useCallback(() => {
    if (!avatarRef.current) return;
    avatarRef.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden"
    >
      {/* Hero CSS Animations */}
      <style jsx>{`
        @keyframes hero-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
        @keyframes hero-glow-pulse {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.18); }
        }
        @keyframes avatar-ring-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes badge-float-1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(6px, -12px) rotate(2deg); }
          66% { transform: translate(-4px, -6px) rotate(-1.5deg); }
        }
        @keyframes badge-float-2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-8px, -8px) rotate(-2deg); }
          66% { transform: translate(5px, -14px) rotate(1.5deg); }
        }
        @keyframes badge-float-3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(4px, -16px) rotate(1.5deg); }
          66% { transform: translate(-7px, -4px) rotate(-2deg); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes cursor-blink {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        @keyframes scroll-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        @keyframes code-typing {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes tech-ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes gradient-border-spin {
          from { --angle: 0deg; }
          to { --angle: 360deg; }
        }
        .hero-avatar-wrapper {
          animation: hero-float 5s ease-in-out infinite;
          will-change: transform;
          transition: transform 0.15s ease;
        }
        .hero-glow {
          animation: hero-glow-pulse 5s ease-in-out infinite;
          will-change: transform, opacity;
        }
        .hero-glow-2 {
          animation: hero-glow-pulse 6s ease-in-out infinite 1s;
          will-change: transform, opacity;
        }
        .avatar-ring {
          animation: avatar-ring-spin 12s linear infinite;
          will-change: transform;
        }
        .avatar-ring-reverse {
          animation: avatar-ring-spin 18s linear infinite reverse;
          will-change: transform;
        }
        .badge-float-1 { animation: badge-float-1 5.5s ease-in-out infinite; will-change: transform; }
        .badge-float-2 { animation: badge-float-2 6.5s ease-in-out infinite; will-change: transform; }
        .badge-float-3 { animation: badge-float-3 7.5s ease-in-out infinite; will-change: transform; }
        .hero-shimmer { animation: shimmer 3s ease-in-out infinite 2s; }
        .cursor-blink { animation: cursor-blink 0.8s ease-in-out infinite; }
        .scroll-bounce { animation: scroll-bounce 1.5s ease-in-out infinite; }
        .tech-ticker-scroll {
          animation: tech-ticker 20s linear infinite;
          will-change: transform;
        }
        .social-icon {
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        .social-icon::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.25s ease;
          background: linear-gradient(135deg, var(--palette-primary), var(--palette-accent1));
          border-radius: inherit;
        }
        .social-icon:hover::before {
          opacity: 1;
        }
        .social-icon:hover {
          transform: translateY(-4px) scale(1.1);
          box-shadow: 0 10px 25px var(--palette-primary) / 0.25;
          border-color: transparent !important;
        }
        .social-icon:hover svg {
          color: white !important;
          position: relative;
          z-index: 1;
        }
        .social-icon svg {
          position: relative;
          z-index: 1;
          transition: color 0.25s ease;
        }
        .cta-primary {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }
        .cta-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 50px var(--palette-primary) / 0.4 !important;
        }
        .cta-secondary {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .cta-secondary:hover {
          border-color: var(--palette-primary) !important;
          background: linear-gradient(135deg, var(--palette-primary) / 0.08, var(--palette-accent2) / 0.04) !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px var(--palette-primary) / 0.1;
        }
        .code-card {
          animation: badge-float-2 8s ease-in-out infinite;
          will-change: transform;
        }
        .code-line {
          animation: code-typing 0.6s ease-out forwards;
          overflow: hidden;
          white-space: nowrap;
          width: 0;
        }
        .dotted-grid {
          background-image: radial-gradient(circle, rgb(var(--color-foreground) / 0.06) 1px, transparent 1px);
          background-size: 24px 24px;
        }
      `}</style>

      {/* Subtle dotted grid pattern overlay */}
      <div className="dotted-grid absolute inset-0 pointer-events-none opacity-60" />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-24 lg:pt-0">

        {/* Left Column - Text Content */}
        <div className="lg:col-span-7 flex flex-col items-start gap-5 md:gap-7 order-1">

          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="group relative flex items-center gap-3 px-5 py-2.5 rounded-full overflow-hidden backdrop-blur-sm"
            style={{
              background: `linear-gradient(135deg, var(--palette-primary) / 0.1, var(--palette-accent2) / 0.05)`,
              border: `1px solid var(--palette-primary) / 0.3`,
            }}
          >
            <div
              className="hero-shimmer absolute inset-0"
              style={{ background: `linear-gradient(90deg, transparent 30%, var(--palette-primary) / 0.15, transparent 70%)` }}
            />
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: 'var(--palette-primary)' }} />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: 'var(--palette-primary)' }} />
            </span>
            <span className="text-xs font-medium tracking-wider uppercase" style={{ color: 'var(--palette-primary)' }}>
              {heroData.sectionLabel}
            </span>
          </motion.div>

          {/* Greeting */}
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl font-mono flex items-center gap-3"
            style={{ color: 'rgb(var(--color-muted-foreground))' }}
          >
            <span style={{ color: 'var(--palette-primary)' }}>&gt;</span>
            <TextScramble text={`Hi, I'm ${heroData.name}`} trigger="load" speed={50} />
            <span
              className="cursor-blink inline-block w-2 h-5 align-middle rounded-sm"
              style={{ background: 'var(--palette-primary)' }}
            />
          </motion.h2>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif text-5xl md:text-7xl lg:text-[7rem] leading-[0.95] tracking-tighter"
          >
            <span
              className="block font-black"
              style={{
                background: 'linear-gradient(135deg, rgb(var(--color-foreground)) 40%, var(--palette-primary) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              <TextScramble text={heroData.headline.prefix} trigger="hover" />
            </span>
            <span className="block relative">
              <span
                className="italic font-light"
                style={{
                  background: 'linear-gradient(135deg, var(--palette-primary), var(--palette-accent2))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                <TextScramble text={heroData.headline.highlight} trigger="load" speed={60} />
              </span>
              {/* Animated underline */}
              <motion.div
                className="absolute -bottom-2 left-0 h-1.5 rounded-full"
                style={{ background: `linear-gradient(90deg, var(--palette-primary), var(--palette-accent2), var(--palette-accent1))` }}
                initial={{ width: 0 }}
                animate={{ width: "65%" }}
                transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
              />
            </span>
          </motion.h1>

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

          {/* Tech Stack Ticker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex items-center gap-3 max-w-md overflow-hidden"
          >
            <div className="flex items-center gap-2 shrink-0">
              <Terminal size={14} style={{ color: 'var(--palette-primary)' }} />
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--palette-primary)' }}>
                Tech Stack
              </span>
            </div>
            <div
              className="h-4 w-px shrink-0"
              style={{ background: 'rgb(var(--color-foreground) / 0.15)' }}
            />
            <div className="overflow-hidden flex-1">
              <div className="tech-ticker-scroll flex gap-4 whitespace-nowrap">
                {[...techStack, ...techStack].map((tech, i) => (
                  <span
                    key={`tech-${i}`}
                    className="text-xs font-medium px-2.5 py-1 rounded-md shrink-0"
                    style={{
                      background: 'rgb(var(--color-foreground) / 0.05)',
                      color: 'rgb(var(--color-foreground) / 0.6)',
                      border: '1px solid rgb(var(--color-foreground) / 0.06)',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Social Icons — gradient fill on hover */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex items-center gap-3"
          >
            {heroData.socialLinks.map((social, index) => (
              <Link
                key={index}
                href={social.link}
                target="_blank"
                title={social.text}
                className="social-icon flex items-center justify-center w-11 h-11 rounded-xl"
                style={{
                  background: 'rgb(var(--color-card))',
                  border: '1px solid rgb(var(--color-foreground) / 0.1)',
                }}
              >
                <social.icon
                  size={18}
                  className="transition-colors duration-200"
                  style={{ color: 'rgb(var(--color-muted-foreground))' }}
                />
              </Link>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-wrap gap-4 mt-1"
          >
            <Link
              href={heroData.cta.primary.link}
              target="_blank"
              className="cta-primary group relative flex items-center gap-3 px-7 py-4 rounded-full font-medium uppercase tracking-wider overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, var(--palette-primary), var(--palette-accent1))',
                color: 'rgb(var(--color-background))',
                boxShadow: '0 10px 40px var(--palette-primary) / 0.3',
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(135deg, var(--palette-accent1), var(--palette-primary))' }}
              />
              <span className="relative z-10 text-sm font-semibold">{heroData.cta.primary.text}</span>
              <ArrowUpRight size={18} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>

            <Link
              href={heroData.cta.secondary.link}
              className="cta-secondary group flex items-center gap-3 px-7 py-4 rounded-full font-medium uppercase tracking-wider"
              style={{
                background: 'transparent',
                border: '1.5px solid rgb(var(--color-foreground) / 0.2)',
                color: 'rgb(var(--color-foreground))',
              }}
            >
              <span className="text-sm font-semibold group-hover:tracking-widest transition-all duration-300">{heroData.cta.secondary.text}</span>
              <Sparkles size={18} className="transition-colors duration-300" style={{ color: 'var(--palette-primary)' }} />
            </Link>
          </motion.div>

        </div>

        {/* Right Column - 3D Avatar Visual */}
        <div className="hidden lg:flex lg:col-span-5 items-center justify-center relative h-[600px] order-2">

          {/* Dual glowing gradient backdrops */}
          <div
            className="hero-glow absolute w-80 h-80 rounded-full blur-3xl"
            style={{ background: `radial-gradient(circle, var(--palette-primary) / 0.5, transparent)` }}
          />
          <div
            className="hero-glow-2 absolute w-64 h-64 rounded-full blur-3xl translate-x-12 translate-y-12"
            style={{ background: `radial-gradient(circle, var(--palette-accent2) / 0.3, transparent)` }}
          />

          {/* Rotating gradient ring around avatar */}
          <div className="absolute w-[370px] h-[370px] flex items-center justify-center">
            <div
              className="avatar-ring absolute w-full h-full rounded-full"
              style={{
                background: `conic-gradient(from 0deg, var(--palette-primary), transparent 30%, var(--palette-accent2), transparent 65%, var(--palette-primary))`,
                mask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #fff calc(100% - 3px))',
                WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #fff calc(100% - 3px))',
                opacity: 0.7,
              }}
            />
          </div>

          {/* Outer ring */}
          <div className="absolute w-[440px] h-[440px] flex items-center justify-center">
            <div
              className="avatar-ring-reverse absolute w-full h-full rounded-full"
              style={{
                background: `conic-gradient(from 180deg, var(--palette-accent2), transparent 20%, var(--palette-primary), transparent 55%, var(--palette-accent2))`,
                mask: 'radial-gradient(farthest-side, transparent calc(100% - 1.5px), #fff calc(100% - 1.5px))',
                WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 1.5px), #fff calc(100% - 1.5px))',
                opacity: 0.35,
              }}
            />
          </div>

          {/* 3D Avatar */}
          <div
            ref={avatarRef}
            onMouseMove={handleAvatarMouseMove}
            onMouseLeave={handleAvatarMouseLeave}
            className="hero-avatar-wrapper relative z-10 w-[320px] h-[320px] rounded-full overflow-hidden cursor-pointer"
            style={{
              boxShadow: '0 25px 60px rgb(var(--color-foreground) / 0.15), 0 0 100px var(--palette-primary) / 0.12, inset 0 0 40px rgb(var(--color-foreground) / 0.03)',
              border: '4px solid rgb(var(--color-card) / 0.8)',
            }}
          >
            <Image
              src="/avatar-3d.png"
              alt="Akshat Austin - 3D Avatar"
              fill
              className="object-cover"
              sizes="320px"
              priority
            />
            {/* Glassmorphism overlay on hover */}
            <div
              className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(135deg, var(--palette-primary) / 0.05, transparent 50%, var(--palette-accent2) / 0.08)',
              }}
            />
          </div>

          {/* Floating Service Badges */}
          {serviceBadges.map((badge, index) => {
            const BadgeIcon = badge.icon;
            const floatClass = index === 0 ? 'badge-float-1' : index === 1 ? 'badge-float-2' : 'badge-float-3';
            return (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.2, type: "spring", stiffness: 200 }}
                className={`${floatClass} absolute flex items-center gap-3 px-4 py-3 rounded-2xl backdrop-blur-xl z-20`}
                style={{
                  background: 'rgb(var(--color-card) / 0.9)',
                  border: '1px solid rgb(var(--color-foreground) / 0.08)',
                  boxShadow: '0 8px 32px rgb(var(--color-foreground) / 0.1), 0 0 0 1px rgb(var(--color-foreground) / 0.03)',
                  top: badge.y,
                  left: badge.x,
                }}
              >
                <div
                  className="p-2.5 rounded-xl shadow-lg"
                  style={{ background: 'linear-gradient(135deg, var(--palette-primary), var(--palette-accent2))' }}
                >
                  <BadgeIcon size={18} color="white" />
                </div>
                <div className="flex flex-col">
                  <span
                    className="text-sm font-bold leading-tight"
                    style={{ color: 'rgb(var(--color-foreground))' }}
                  >
                    {badge.label}
                  </span>
                  <span
                    className="text-[10px] font-medium"
                    style={{ color: 'rgb(var(--color-foreground) / 0.4)' }}
                  >
                    {badge.sublabel}
                  </span>
                </div>
              </motion.div>
            );
          })}

          {/* Code Snippet Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="code-card absolute z-20 px-4 py-3 rounded-xl backdrop-blur-xl"
            style={{
              background: 'rgb(var(--color-card) / 0.92)',
              border: '1px solid rgb(var(--color-foreground) / 0.08)',
              boxShadow: '0 12px 40px rgb(var(--color-foreground) / 0.1)',
              bottom: '3%',
              right: '0%',
              minWidth: '210px',
            }}
          >
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-2 h-2 rounded-full" style={{ background: '#ff5f57' }} />
              <div className="w-2 h-2 rounded-full" style={{ background: '#febc2e' }} />
              <div className="w-2 h-2 rounded-full" style={{ background: '#28c840' }} />
              <span className="ml-2 text-[9px] font-mono" style={{ color: 'rgb(var(--color-foreground) / 0.3)' }}>
                developer.ts
              </span>
            </div>
            <div className="space-y-0.5 font-mono text-[10px] leading-relaxed">
              {codeLines.map((line, i) => (
                <div
                  key={i}
                  className="code-line"
                  style={{
                    color: line.color,
                    paddingLeft: `${line.indent * 12}px`,
                    animationDelay: `${1.6 + i * 0.15}s`,
                  }}
                >
                  {line.text}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Experience counter badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            className="badge-float-2 absolute flex items-center gap-3 px-5 py-3 rounded-2xl backdrop-blur-xl z-20"
            style={{
              background: 'rgb(var(--color-card) / 0.9)',
              border: '1px solid rgb(var(--color-foreground) / 0.08)',
              boxShadow: '0 8px 32px rgb(var(--color-foreground) / 0.1)',
              top: '80%',
              right: '55%',
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, var(--palette-primary), var(--palette-accent1))' }}
            >
              <Braces size={18} color="white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black leading-tight" style={{ color: 'var(--palette-primary)' }}>5+</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'rgb(var(--color-foreground) / 0.4)' }}>
                Years Exp.
              </span>
            </div>
          </motion.div>

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
        <div
          className="scroll-bounce p-2 rounded-full"
          style={{ border: '1px solid rgb(var(--color-foreground) / 0.2)' }}
        >
          <ArrowDown size={18} style={{ color: 'rgb(var(--color-foreground))', opacity: 0.6 }} />
        </div>
      </motion.div>

    </section>
  );
};

export default Body;
