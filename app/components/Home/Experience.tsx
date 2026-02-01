"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Calendar, MapPin, ExternalLink, Briefcase, ChevronDown,
  TrendingUp, Users, Code2, Sparkles, Rocket, Award, Target
} from "lucide-react";
import { Section, Container, ScrollReveal, SectionBadge } from "@/app/components/ui";
import { experiencesData } from "@/app/data";

// Skills for each company (you can move to data file later)
const companySkills: Record<string, string[]> = {
  "Prototion": ["React", "Next.js", "Zustand", "TypeScript", "Tailwind", "Nest.js"],
  "Shopyvilla Developers": ["React", "Redux", "Next.js", "CSS3", "REST APIs"],
  "Skynox Tech": ["React.js", "PWA", "REST APIs", "Jest", "Git"],
};

const Card3D: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
};

const ExperienceCard: React.FC<{ exp: typeof experiencesData[0]; index: number; total: number }> = ({ exp, index, total }) => {
  const [isExpanded, setIsExpanded] = useState(index === 0);
  const isCurrentJob = exp.endDate === "Present";
  const skills = companySkills[exp.companyName] || [];
  const progress = ((total - index) / total) * 100;

  return (
    <div className="relative flex gap-6 md:gap-10">
      {/* Timeline Column */}
      <div className="hidden md:flex flex-col items-center">
        {/* Timeline Node */}
        <motion.div
          className="relative z-10 flex items-center justify-center"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", delay: index * 0.1 }}
        >
          <motion.div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{
              background: isCurrentJob
                ? `linear-gradient(135deg, var(--palette-primary), var(--palette-accent2))`
                : `rgb(var(--color-card))`,
              border: `2px solid ${isCurrentJob ? 'transparent' : 'rgb(var(--color-foreground) / 0.1)'}`,
              boxShadow: isCurrentJob ? `0 0 30px var(--palette-primary)` : 'none',
            }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            {isCurrentJob ? (
              <Rocket size={24} style={{ color: `rgb(var(--color-background))` }} />
            ) : (
              <Briefcase size={24} style={{ color: `var(--palette-primary)` }} />
            )}
          </motion.div>

          {/* Pulse effect for current job */}
          {isCurrentJob && (
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{ background: `linear-gradient(135deg, var(--palette-primary), var(--palette-accent2))` }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.div>

        {/* Timeline Line with Progress */}
        {index < total - 1 && (
          <div className="relative flex-1 w-1 my-4">
            <div
              className="absolute inset-0 rounded-full"
              style={{ background: `rgb(var(--color-foreground) / 0.1)` }}
            />
            <motion.div
              className="absolute top-0 left-0 right-0 rounded-full"
              style={{
                background: `linear-gradient(180deg, var(--palette-primary), var(--palette-accent2))`,
              }}
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.2 }}
            />
          </div>
        )}
      </div>

      {/* Card Column */}
      <div className="flex-1 pb-8">
        <ScrollReveal direction="up" delay={index * 0.1}>
          <Card3D>
            <motion.div
              className="relative rounded-3xl overflow-hidden"
              style={{
                background: `linear-gradient(145deg, rgb(var(--color-card)), rgb(var(--color-card) / 0.8))`,
                border: `1px solid rgb(var(--color-foreground) / 0.08)`,
                transform: "translateZ(50px)",
              }}
            >
              {/* Static Gradient Background */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background: `radial-gradient(circle at 100% 0%, var(--palette-primary), transparent 60%)`,
                }}
              />

              {/* Current Job Ribbon */}
              {isCurrentJob && (
                <div className="absolute top-0 right-0 z-20">
                  <motion.div
                    className="flex items-center gap-2 px-6 py-3 rounded-bl-3xl"
                    style={{
                      background: `linear-gradient(135deg, var(--palette-primary), var(--palette-accent2))`,
                      boxShadow: `0 4px 30px var(--palette-primary)`,
                    }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      boxShadow: [
                        `0 4px 30px var(--palette-primary)`,
                        `0 4px 50px var(--palette-primary)`,
                        `0 4px 30px var(--palette-primary)`
                      ]
                    }}
                    transition={{
                      opacity: { duration: 0.5, delay: 0.5 },
                      x: { duration: 0.5, delay: 0.5 },
                      boxShadow: { duration: 2, repeat: Infinity }
                    }}
                  >
                    <Sparkles size={18} style={{ color: `rgb(var(--color-background))` }} />
                    <span
                      className="text-sm font-bold uppercase tracking-widest"
                      style={{ color: `rgb(var(--color-background))` }}
                    >
                      Current Role
                    </span>
                  </motion.div>
                </div>
              )}

              {/* Card Content */}
              <div className="relative z-10 p-6 md:p-8">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-start gap-6 mb-6">
                  <div className="flex-1">
                    {/* Company */}
                    <div className="flex items-center gap-3 mb-2">
                      {exp.companyLink ? (
                        <Link
                          href={exp.companyLink}
                          target="_blank"
                          className="group flex items-center gap-2"
                        >
                          <h3
                            className="text-2xl md:text-3xl font-serif group-hover:italic transition-all"
                            style={{ color: `rgb(var(--color-foreground))` }}
                          >
                            {exp.companyName}
                          </h3>
                          <ExternalLink
                            size={18}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{ color: `var(--palette-primary)` }}
                          />
                        </Link>
                      ) : (
                        <h3
                          className="text-2xl md:text-3xl font-serif"
                          style={{ color: `rgb(var(--color-foreground))` }}
                        >
                          {exp.companyName}
                        </h3>
                      )}
                    </div>

                    {/* Position with Icon */}
                    <div className="flex items-center gap-2 mb-4">
                      <Award size={18} style={{ color: `var(--palette-primary)` }} />
                      <p
                        className="text-lg font-semibold"
                        style={{ color: `var(--palette-primary)` }}
                      >
                        {exp.position}
                      </p>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-3">
                      <motion.div
                        className="flex items-center gap-2 px-4 py-2 rounded-xl"
                        style={{
                          background: `rgb(var(--color-foreground) / 0.05)`,
                          border: `1px solid rgb(var(--color-foreground) / 0.05)`,
                        }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Calendar size={14} style={{ color: `var(--palette-primary)` }} />
                        <span
                          className="text-sm font-medium"
                          style={{ color: `rgb(var(--color-foreground) / 0.8)` }}
                        >
                          {exp.startDate} — {exp.endDate}
                        </span>
                      </motion.div>
                      <motion.div
                        className="flex items-center gap-2 px-4 py-2 rounded-xl"
                        style={{
                          background: `rgb(var(--color-foreground) / 0.05)`,
                          border: `1px solid rgb(var(--color-foreground) / 0.05)`,
                        }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <MapPin size={14} style={{ color: `var(--palette-accent2)` }} />
                        <span
                          className="text-sm font-medium"
                          style={{ color: `rgb(var(--color-foreground) / 0.8)` }}
                        >
                          {exp.location}
                        </span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Progress Ring - Mobile hidden */}
                  {!isCurrentJob && (
                    <div className="hidden lg:block">
                      <motion.div
                        className="relative w-20 h-20"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                      >
                        <svg className="w-full h-full -rotate-90">
                          <circle
                            cx="40"
                            cy="40"
                            r="35"
                            fill="none"
                            stroke="rgb(var(--color-foreground) / 0.1)"
                            strokeWidth="6"
                          />
                          <motion.circle
                            cx="40"
                            cy="40"
                            r="35"
                            fill="none"
                            stroke="url(#gradient)"
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeDasharray={220}
                            initial={{ strokeDashoffset: 220 }}
                            whileInView={{ strokeDashoffset: 220 - (220 * progress) / 100 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                          />
                          <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="var(--palette-primary)" />
                              <stop offset="100%" stopColor="var(--palette-accent2)" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span
                            className="text-sm font-bold"
                            style={{ color: `var(--palette-primary)` }}
                          >
                            #{total - index}
                          </span>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </div>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg"
                      style={{
                        background: `linear-gradient(135deg, var(--palette-primary) / 0.1, var(--palette-accent2) / 0.05)`,
                        color: `var(--palette-primary)`,
                        border: `1px solid var(--palette-primary) / 0.2`,
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>

                {/* Expand Button */}
                <motion.button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider group"
                  style={{ color: `var(--palette-primary)` }}
                  whileHover={{ x: 5 }}
                >
                  <Target size={16} className="group-hover:rotate-90 transition-transform" />
                  <span>{isExpanded ? "Hide Achievements" : "View Achievements"}</span>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                  >
                    <ChevronDown size={16} />
                  </motion.div>
                </motion.button>

                {/* Expandable Content */}
                <motion.div
                  initial={false}
                  animate={{
                    height: isExpanded ? "auto" : 0,
                    opacity: isExpanded ? 1 : 0,
                  }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden"
                >
                  <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
                    {exp.responsibilities.map((resp, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-3 p-4 rounded-xl group/item"
                        style={{
                          background: `rgb(var(--color-foreground) / 0.03)`,
                          border: `1px solid rgb(var(--color-foreground) / 0.05)`,
                        }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{
                          background: `rgb(var(--color-foreground) / 0.06)`,
                          x: 5,
                        }}
                      >
                        <div
                          className="shrink-0 p-1.5 rounded-lg mt-0.5"
                          style={{ background: `var(--palette-primary) / 0.1` }}
                        >
                          {i % 4 === 0 && <TrendingUp size={14} style={{ color: `var(--palette-primary)` }} />}
                          {i % 4 === 1 && <Users size={14} style={{ color: `var(--palette-accent1)` }} />}
                          {i % 4 === 2 && <Code2 size={14} style={{ color: `var(--palette-accent2)` }} />}
                          {i % 4 === 3 && <Sparkles size={14} style={{ color: `var(--palette-primary)` }} />}
                        </div>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: `rgb(var(--color-foreground) / 0.8)` }}
                        >
                          {resp.replace(/^- /, "")}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </Card3D>
        </ScrollReveal>
      </div>
    </div>
  );
};

const Experience: React.FC = () => {
  return (
    <Section id="experience">
      <Container>
        {/* Section Header */}
        <SectionBadge
          number="02"
          label="Experience"
          icon={Briefcase}
          title="My Professional"
          titleAccent="Journey"
          subtitle={`${experiencesData.length}+ years of building exceptional digital experiences across innovative companies.`}
        />

        {/* Timeline */}
        <div className="relative">
          {experiencesData.map((exp, index) => (
            <ExperienceCard
              key={index}
              exp={exp}
              index={index}
              total={experiencesData.length}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default Experience;
