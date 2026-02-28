"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, User, ExternalLink } from "lucide-react";
import { Section, Container, ScrollReveal, SectionBadge } from "@/app/components/ui";
import { aboutData } from "@/app/data/about";

const About: React.FC = () => {
  const { headline, description, ctaText, ctaLink, stats, expertise, technologies } = aboutData;

  return (
    <Section id="about">
      {/* About section CSS */}
      <style jsx>{`
        @keyframes stat-count-in {
          from { opacity: 0; transform: translateY(12px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes tech-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .stat-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .stat-card:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 16px 48px rgb(var(--color-foreground) / 0.1);
        }
        .stat-card:hover .stat-icon {
          transform: scale(1.15) rotate(5deg);
        }
        .stat-card:hover .stat-number {
          background-size: 200% 200%;
          animation: gradient-shift 2s ease infinite;
        }
        .stat-icon {
          transition: transform 0.3s ease;
        }
        .expertise-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }
        .expertise-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 1rem;
          padding: 1px;
          background: linear-gradient(135deg, var(--palette-primary), var(--palette-accent2));
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: xor;
          -webkit-mask-composite: xor;
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .expertise-card:hover::before {
          opacity: 1;
        }
        .expertise-card:hover {
          transform: translateX(6px);
          box-shadow: 0 12px 36px rgb(var(--color-foreground) / 0.08);
        }
        .expertise-card:hover .expertise-icon {
          transform: scale(1.1) rotate(8deg);
          box-shadow: 0 8px 24px var(--palette-primary) / 0.3;
        }
        .expertise-card:hover .expertise-arrow {
          opacity: 1;
          transform: translate(0, 0);
        }
        .expertise-card:hover .expertise-title {
          color: var(--palette-primary) !important;
        }
        .expertise-icon {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .expertise-arrow {
          opacity: 0;
          transform: translate(-4px, 4px);
          transition: all 0.3s ease;
        }
        .tech-pill {
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        .tech-pill::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, var(--palette-primary) / 0.1, transparent);
          background-size: 200% 100%;
          animation: tech-shimmer 3s ease-in-out infinite;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .tech-pill:hover::after {
          opacity: 1;
        }
        .tech-pill:hover {
          transform: translateY(-3px) scale(1.05);
          border-color: var(--palette-primary) !important;
          box-shadow: 0 6px 20px var(--palette-primary) / 0.15;
          color: var(--palette-primary) !important;
        }
        .hero-card-cta {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hero-card-cta:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 16px 40px var(--palette-primary) / 0.35;
        }
        .about-hero-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .about-hero-card:hover {
          box-shadow: 0 20px 60px rgb(var(--color-foreground) / 0.1);
        }
        .about-hero-card:hover .hero-glow {
          opacity: 0.35;
          transform: scale(1.1);
        }
        .hero-glow {
          transition: all 0.5s ease;
        }
      `}</style>

      <Container>
        {/* Section Header */}
        <SectionBadge
          number="01"
          label="About"
          icon={User}
          title=""
          titleAccent=""
        />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Left Column - Main Content */}
          <div className="lg:col-span-7 flex flex-col gap-6">

            {/* Hero Card — Enhanced glassmorphism */}
            <ScrollReveal direction="up" delay={0.1}>
              <div
                className="about-hero-card relative p-8 md:p-12 rounded-3xl overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, rgb(var(--color-card)), rgb(var(--color-card) / 0.6))`,
                  border: `1px solid rgb(var(--color-foreground) / 0.08)`,
                  boxShadow: '0 8px 32px rgb(var(--color-foreground) / 0.06)',
                }}
              >
                {/* Multiple gradient accents for depth */}
                <div
                  className="hero-glow absolute -top-12 -right-12 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none"
                  style={{ background: `linear-gradient(135deg, var(--palette-primary), var(--palette-accent2))` }}
                />
                <div
                  className="hero-glow absolute -bottom-16 -left-16 w-48 h-48 rounded-full blur-3xl opacity-10 pointer-events-none"
                  style={{ background: `radial-gradient(circle, var(--palette-accent2), transparent)` }}
                />

                {/* Dot grid pattern overlay */}
                <div
                  className="absolute inset-0 opacity-[0.03] pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgb(var(--color-foreground)) 1px, transparent 0)`,
                    backgroundSize: '20px 20px',
                  }}
                />

                <h2
                  className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6 relative z-10"
                  style={{ color: `rgb(var(--color-foreground))` }}
                >
                  {headline.before}{" "}
                  <span
                    className="italic"
                    style={{
                      background: `linear-gradient(135deg, var(--palette-primary), var(--palette-accent2))`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {headline.highlight}
                  </span>{" "}
                  {headline.after}
                </h2>

                <p
                  className="text-lg md:text-xl leading-relaxed max-w-2xl relative z-10"
                  style={{ color: `rgb(var(--color-foreground) / 0.75)` }}
                >
                  {description}
                </p>

                {/* CTA - Enhanced */}
                <a
                  href={ctaLink}
                  className="hero-card-cta inline-flex items-center gap-2.5 mt-8 px-7 py-3.5 rounded-full text-sm font-semibold uppercase tracking-wider relative z-10 group/btn overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, var(--palette-primary), var(--palette-accent1))`,
                    color: `rgb(var(--color-background))`,
                    boxShadow: '0 8px 28px var(--palette-primary) / 0.3',
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(135deg, var(--palette-accent1), var(--palette-primary))' }}
                  />
                  <span className="relative z-10">{ctaText}</span>
                  <ArrowUpRight size={16} className="relative z-10 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </a>
              </div>
            </ScrollReveal>

            {/* Stats Row — Enhanced with animated gradient numbers */}
            <ScrollReveal direction="up" delay={0.2}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="stat-card relative p-5 sm:p-6 rounded-2xl text-center overflow-hidden cursor-default"
                    style={{
                      background: `rgb(var(--color-card))`,
                      border: `1px solid rgb(var(--color-foreground) / 0.08)`,
                      boxShadow: '0 4px 16px rgb(var(--color-foreground) / 0.04)',
                    }}
                  >
                    {/* Subtle gradient on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: `linear-gradient(135deg, var(--palette-primary) / 0.04, transparent)` }}
                    />

                    <div
                      className="stat-icon inline-flex p-2.5 rounded-xl mb-3"
                      style={{ background: 'linear-gradient(135deg, var(--palette-primary) / 0.12, var(--palette-accent2) / 0.06)' }}
                    >
                      <stat.icon
                        size={20}
                        style={{ color: `var(--palette-primary)` }}
                      />
                    </div>
                    <div
                      className="stat-number text-3xl md:text-4xl font-black font-serif mb-1.5"
                      style={{
                        background: `linear-gradient(135deg, var(--palette-primary), var(--palette-accent2))`,
                        backgroundSize: '100% 100%',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {stat.number}
                    </div>
                    <div
                      className="text-[10px] font-semibold uppercase tracking-[0.15em]"
                      style={{ color: `rgb(var(--color-foreground) / 0.5)` }}
                    >
                      {stat.label}
                    </div>

                    {/* Bottom accent */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-[2px] opacity-30"
                      style={{ background: `linear-gradient(90deg, transparent, var(--palette-primary), transparent)` }}
                    />
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column - Expertise Cards */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {expertise.map((item, index) => (
              <ScrollReveal key={index} direction="up" delay={0.1 + index * 0.1}>
                <div
                  className="expertise-card relative p-6 rounded-2xl cursor-pointer overflow-hidden"
                  style={{
                    background: `rgb(var(--color-card))`,
                    border: `1px solid rgb(var(--color-foreground) / 0.08)`,
                    boxShadow: '0 4px 16px rgb(var(--color-foreground) / 0.04)',
                  }}
                >
                  {/* Hover gradient overlay */}
                  <div
                    className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `linear-gradient(135deg, var(--palette-primary) / 0.04, transparent)` }}
                  />

                  <div className="relative z-10 flex items-start gap-4">
                    <div
                      className="expertise-icon shrink-0 p-3 rounded-xl"
                      style={{
                        background: `linear-gradient(135deg, var(--palette-primary), var(--palette-accent2))`,
                        boxShadow: '0 4px 12px var(--palette-primary) / 0.2',
                      }}
                    >
                      <item.icon
                        size={22}
                        style={{ color: 'white' }}
                      />
                    </div>
                    <div className="flex-1">
                      <h4
                        className="expertise-title text-lg font-bold mb-2 transition-colors duration-300"
                        style={{ color: `rgb(var(--color-foreground))` }}
                      >
                        {item.title}
                      </h4>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: `rgb(var(--color-foreground) / 0.6)` }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Arrow indicator */}
                  <ArrowUpRight
                    size={16}
                    className="expertise-arrow absolute top-6 right-6"
                    style={{ color: `var(--palette-primary)` }}
                  />
                </div>
              </ScrollReveal>
            ))}

            {/* Tech Stack — Enhanced with hover effects */}
            <ScrollReveal direction="up" delay={0.4}>
              <div
                className="relative p-6 rounded-2xl overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, var(--palette-primary) / 0.08, var(--palette-accent2) / 0.04)`,
                  border: `1px solid var(--palette-primary) / 0.15`,
                  boxShadow: '0 4px 16px var(--palette-primary) / 0.06',
                }}
              >
                {/* Subtle glow */}
                <div
                  className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-2xl opacity-20 pointer-events-none"
                  style={{ background: 'var(--palette-primary)' }}
                />

                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: 'var(--palette-primary)' }}
                  />
                  <h4
                    className="text-xs font-mono uppercase tracking-[0.2em] font-bold"
                    style={{ color: `var(--palette-primary)` }}
                  >
                    Core Technologies
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2 relative z-10">
                  {technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="tech-pill px-3.5 py-2 text-xs font-semibold rounded-lg cursor-default"
                      style={{
                        background: `rgb(var(--color-background))`,
                        color: `rgb(var(--color-foreground) / 0.8)`,
                        border: `1px solid rgb(var(--color-foreground) / 0.1)`,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default About;
