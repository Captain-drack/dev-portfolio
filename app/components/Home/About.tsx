"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, User } from "lucide-react";
import { Section, Container, ScrollReveal, SectionBadge } from "@/app/components/ui";
import { aboutData } from "@/app/data/about";

const About: React.FC = () => {
  const { headline, description, ctaText, ctaLink, stats, expertise, technologies } = aboutData;

  return (
    <Section id="about">
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
          <div className="lg:col-span-7 flex flex-col gap-8">

            {/* Hero Card */}
            <ScrollReveal direction="up" delay={0.1}>
              <motion.div
                className="relative p-8 md:p-12 rounded-3xl overflow-hidden group"
                style={{
                  background: `linear-gradient(135deg, rgb(var(--color-card)), rgb(var(--color-card) / 0.5))`,
                  border: `1px solid rgb(var(--color-foreground) / 0.08)`,
                }}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                {/* Gradient Accent */}
                <div
                  className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"
                  style={{ background: `linear-gradient(135deg, var(--palette-primary), var(--palette-accent2))` }}
                />

                <h2
                  className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6 relative z-10"
                  style={{ color: `rgb(var(--color-foreground))` }}
                >
                  {headline.before}{" "}
                  <span
                    className="italic bg-clip-text text-transparent"
                    style={{ backgroundImage: `linear-gradient(135deg, var(--palette-primary), var(--palette-accent2))` }}
                  >
                    {headline.highlight}
                  </span>{" "}
                  {headline.after}
                </h2>

                <p
                  className="text-lg md:text-xl leading-relaxed max-w-2xl relative z-10"
                  style={{ color: `rgb(var(--color-foreground) / 0.8)` }}
                >
                  {description}
                </p>

                {/* CTA */}
                <motion.a
                  href={ctaLink}
                  className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full text-sm font-medium uppercase tracking-wider relative z-10 group/btn"
                  style={{
                    background: `linear-gradient(135deg, var(--palette-primary), var(--palette-accent2))`,
                    color: `rgb(var(--color-background))`,
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {ctaText}
                  <ArrowUpRight size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </motion.a>
              </motion.div>
            </ScrollReveal>

            {/* Stats Row */}
            <ScrollReveal direction="up" delay={0.2}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="relative p-4 sm:p-6 rounded-2xl text-center group"
                    style={{
                      background: `rgb(var(--color-card))`,
                      border: `1px solid rgb(var(--color-foreground) / 0.08)`,
                    }}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <stat.icon
                      size={20}
                      className="mx-auto mb-3 opacity-50 group-hover:opacity-100 transition-opacity"
                      style={{ color: `var(--palette-primary)` }}
                    />
                    <div
                      className="text-3xl md:text-4xl font-bold font-serif mb-1"
                      style={{ color: `var(--palette-primary)` }}
                    >
                      {stat.number}
                    </div>
                    <div
                      className="text-xs font-mono uppercase tracking-wider"
                      style={{ color: `rgb(var(--color-foreground) / 0.6)` }}
                    >
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column - Expertise Cards */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {expertise.map((item, index) => (
              <ScrollReveal key={index} direction="up" delay={0.1 + index * 0.1}>
                <motion.div
                  className="relative p-6 rounded-2xl group cursor-pointer overflow-hidden"
                  style={{
                    background: `rgb(var(--color-card))`,
                    border: `1px solid rgb(var(--color-foreground) / 0.08)`,
                  }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Hover Gradient */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, var(--palette-primary) / 0.05, transparent)`,
                    }}
                  />

                  <div className="relative z-10 flex items-start gap-4">
                    <div
                      className="shrink-0 p-3 rounded-xl"
                      style={{ background: `var(--palette-primary) / 0.1` }}
                    >
                      <item.icon
                        size={24}
                        style={{ color: `var(--palette-primary)` }}
                      />
                    </div>
                    <div>
                      <h4
                        className="text-lg font-semibold mb-2 group-hover:translate-x-1 transition-transform"
                        style={{ color: `rgb(var(--color-foreground))` }}
                      >
                        {item.title}
                      </h4>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: `rgb(var(--color-foreground) / 0.7)` }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Arrow indicator */}
                  <ArrowUpRight
                    size={16}
                    className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: `var(--palette-primary)` }}
                  />
                </motion.div>
              </ScrollReveal>
            ))}

            {/* Tech Stack Quick View */}
            <ScrollReveal direction="up" delay={0.4}>
              <div
                className="p-6 rounded-2xl"
                style={{
                  background: `linear-gradient(135deg, var(--palette-primary) / 0.1, var(--palette-accent2) / 0.05)`,
                  border: `1px solid var(--palette-primary) / 0.2`,
                }}
              >
                <h4
                  className="text-xs font-mono uppercase tracking-[0.2em] mb-4"
                  style={{ color: `var(--palette-primary)` }}
                >
                  Core Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 text-xs font-medium rounded-full"
                      style={{
                        background: `rgb(var(--color-background))`,
                        color: `rgb(var(--color-foreground))`,
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
