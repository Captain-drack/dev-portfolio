"use client";
import React, { useRef, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Palette, Wrench, Server, Database, Sparkles, Layers } from "lucide-react";
import { Section, Container, ScrollReveal, SectionBadge } from "@/app/components/ui";
import { skillsData } from "@/app/data";
import Image from "next/image";
import { LucideIcon } from "lucide-react";

// Updated categories matching the new skills data with theme-reactive gradients
const categories: {
  key: string;
  label: string;
  icon: LucideIcon;
  skills: string[];
  gradientStyle: React.CSSProperties;
}[] = [
    {
      key: "frontend",
      label: "Frontend & Frameworks",
      icon: Code2,
      skills: ["React.js", "Next.js", "Typescript", "Redux", "Zustand"],
      gradientStyle: { background: 'linear-gradient(135deg, var(--palette-primary), var(--palette-accent1))' },
    },
    {
      key: "styling",
      label: "Styling & Design",
      icon: Palette,
      skills: ["Tailwind CSS", "Material UI", "Styled Components", "HTML5", "CSS3"],
      gradientStyle: { background: 'linear-gradient(135deg, var(--palette-accent2), var(--palette-primary))' },
    },
    {
      key: "backend",
      label: "Backend & APIs",
      icon: Server,
      skills: ["Nest.js", "Node.js", "Express.js", "REST APIs", "Microservices", "Strapi"],
      gradientStyle: { background: 'linear-gradient(135deg, var(--palette-accent1), var(--palette-accent2))' },
    },
    {
      key: "databases",
      label: "Databases",
      icon: Database,
      skills: ["MySQL", "MongoDB"],
      gradientStyle: { background: 'linear-gradient(135deg, var(--palette-primary), var(--palette-accent2))' },
    },
    {
      key: "tools",
      label: "Tools & DevOps",
      icon: Wrench,
      skills: ["Git and Github", "Docker", "Postman", "Figma", "CI/CD"],
      gradientStyle: { background: 'linear-gradient(135deg, var(--palette-accent2), var(--palette-accent1))' },
    },
  ];

// Helper to get proficiency label
const getProficiencyLabel = (percentage: number): string => {
  if (percentage >= 90) return "Expert";
  if (percentage >= 80) return "Advanced";
  if (percentage >= 70) return "Proficient";
  return "Familiar";
};

// Memoized SkillPill — uses pure CSS for hover instead of Framer Motion
const SkillPill = React.memo(({ skill }: { skill: typeof skillsData[0] }) => {
  return (
    <div
      className="skill-pill flex items-center gap-3 px-5 py-3 rounded-full whitespace-nowrap shrink-0 cursor-default group"
      style={{
        background: `rgb(var(--color-card))`,
        border: `1px solid rgb(var(--color-foreground) / 0.1)`,
        boxShadow: `0 4px 12px rgb(var(--color-foreground) / 0.05)`,
      }}
    >
      {skill.imageSrc && (
        <div className="relative w-6 h-6 group-hover:scale-110 transition-transform duration-200">
          <Image src={skill.imageSrc} alt={skill.name} fill className="object-contain" sizes="24px" />
        </div>
      )}
      <span
        className="text-sm font-medium"
        style={{ color: `rgb(var(--color-foreground))` }}
      >
        {skill.name}
      </span>
      <div
        className="w-12 h-1 rounded-full overflow-hidden"
        style={{ background: 'rgb(var(--color-foreground) / 0.1)' }}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: `${skill.percentage}%`,
            background: 'var(--palette-primary)',
          }}
        />
      </div>
    </div>
  );
});
SkillPill.displayName = 'SkillPill';

// Memoized SkillRow — uses CSS transitions instead of Framer Motion
const SkillRow = React.memo(({ skillName, skill, gradientStyle, delay }: {
  skillName: string;
  skill: typeof skillsData[0] | undefined;
  gradientStyle: React.CSSProperties;
  delay: number;
}) => {
  return (
    <div
      className="skill-row flex items-center gap-3 px-3.5 py-2.5 rounded-xl group/skill"
      style={{
        background: `rgb(var(--color-foreground) / 0.03)`,
        border: `1px solid rgb(var(--color-foreground) / 0.05)`,
        animationDelay: `${delay}ms`,
      }}
    >
      {/* Icon */}
      {skill?.imageSrc && (
        <div className="relative w-5 h-5 shrink-0 group-hover/skill:scale-110 transition-transform duration-200">
          <Image src={skill.imageSrc} alt={skillName} fill className="object-contain" sizes="20px" />
        </div>
      )}

      {/* Name + Progress bar */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span
            className="text-sm font-medium truncate"
            style={{ color: `rgb(var(--color-foreground))` }}
          >
            {skillName}
          </span>
          {skill && (
            <span
              className="text-[10px] font-semibold uppercase tracking-wider ml-2 shrink-0"
              style={{ color: 'rgb(var(--color-foreground) / 0.35)' }}
            >
              {getProficiencyLabel(skill.percentage ?? 0)}
            </span>
          )}
        </div>
        {skill && (
          <div
            className="w-full h-1.5 rounded-full overflow-hidden"
            style={{ background: 'rgb(var(--color-foreground) / 0.08)' }}
          >
            <div
              className="skill-progress h-full rounded-full"
              style={{
                ...gradientStyle,
                '--progress-width': `${skill.percentage}%`,
                animationDelay: `${delay + 200}ms`,
              } as React.CSSProperties}
            />
          </div>
        )}
      </div>

      {/* Percentage */}
      {skill && (
        <span
          className="text-xs font-bold tabular-nums shrink-0"
          style={{ color: 'rgb(var(--color-foreground) / 0.5)' }}
        >
          {skill.percentage}%
        </span>
      )}
    </div>
  );
});
SkillRow.displayName = 'SkillRow';

// Category Card — simplified 3D effect, CSS-based animations
const CategoryCard = React.memo(({
  category,
  index
}: {
  category: typeof categories[0];
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    ref.current.style.transform = `perspective(800px) rotateX(${y * -8}deg) rotateY(${x * 8}deg)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
  }, []);

  const Icon = category.icon;
  const avgPercentage = useMemo(() => Math.round(
    category.skills.reduce((sum, name) => {
      const s = skillsData.find(sk => sk.name === name);
      return sum + (s?.percentage ?? 0);
    }, 0) / category.skills.length
  ), [category.skills]);

  return (
    <ScrollReveal direction="up" delay={index * 0.1}>
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="category-card relative rounded-2xl p-[1px] group cursor-default h-full"
      >
        {/* Animated gradient border - visible on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            ...category.gradientStyle,
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'xor',
            WebkitMaskComposite: 'xor',
            padding: '1px',
          }}
        />

        {/* Card inner */}
        <div
          className="relative p-6 rounded-2xl overflow-hidden h-full"
          style={{
            background: `rgb(var(--color-card))`,
            border: `1px solid rgb(var(--color-foreground) / 0.06)`,
            boxShadow: `0 8px 32px rgb(var(--color-foreground) / 0.06)`,
          }}
        >
          {/* Gradient Background Glow */}
          <div
            className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-15 group-hover:opacity-30 transition-opacity duration-700"
            style={category.gradientStyle}
          />
          <div
            className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-700"
            style={category.gradientStyle}
          />

          {/* Grid Pattern Overlay */}
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgb(var(--color-foreground)) 1px, transparent 0)`,
              backgroundSize: '20px 20px',
            }}
          />

          {/* Header */}
          <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="flex items-center gap-3.5">
              <div
                className="p-3 rounded-xl shadow-lg transition-transform duration-200 hover:rotate-[10deg] hover:scale-110"
                style={{ ...category.gradientStyle, color: 'white' }}
              >
                <Icon size={22} />
              </div>
              <div>
                <h3
                  className="text-lg font-bold tracking-tight"
                  style={{ color: `rgb(var(--color-foreground))` }}
                >
                  {category.label}
                </h3>
                <p className="text-xs font-medium" style={{ color: 'rgb(var(--color-foreground) / 0.4)' }}>
                  {category.skills.length} technologies
                </p>
              </div>
            </div>
            {/* Average proficiency badge */}
            <div
              className="px-3 py-1.5 rounded-lg text-xs font-bold"
              style={{
                ...category.gradientStyle,
                color: 'white',
                opacity: 0.9,
              }}
            >
              {avgPercentage}%
            </div>
          </div>

          {/* Skill Items - Structured rows */}
          <div className="space-y-2.5 relative z-10">
            {category.skills.map((skillName, skillIndex) => {
              const skill = skillsData.find(s => s.name === skillName);
              return (
                <SkillRow
                  key={skillName}
                  skillName={skillName}
                  skill={skill}
                  gradientStyle={category.gradientStyle}
                  delay={skillIndex * 60}
                />
              );
            })}
          </div>

          {/* Bottom Accent Line */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[2px] opacity-40 group-hover:opacity-70 transition-opacity duration-500"
            style={category.gradientStyle}
          />
        </div>
      </div>
    </ScrollReveal>
  );
});
CategoryCard.displayName = 'CategoryCard';

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Memoize the duplicated skill arrays for marquee (2 copies for seamless 50% loop)
  const row1Skills = useMemo(() => [...skillsData, ...skillsData], []);
  const row2Skills = useMemo(() => [...skillsData].reverse(), []);
  const row2SkillsDuped = useMemo(() => [...row2Skills, ...row2Skills], [row2Skills]);

  return (
    <Section id="skills" className="overflow-hidden relative py-24">
      {/* CSS Animations — GPU-accelerated */}
      <style jsx>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -20px) scale(1.05); }
        }
        @keyframes sparkle-rotate {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(15deg); }
          75% { transform: rotate(-15deg); }
        }
        .marquee-row-1 {
          animation: marquee-left 40s linear infinite;
          will-change: transform;
        }
        .marquee-row-2 {
          animation: marquee-right 45s linear infinite;
          will-change: transform;
        }
        .floating-particle {
          animation: float var(--duration) ease-in-out infinite;
          will-change: transform;
        }
        .skill-pill {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .skill-pill:hover {
          transform: scale(1.08) translateY(-2px);
          box-shadow: 0 8px 20px rgb(var(--color-foreground) / 0.1);
        }
        .skill-row {
          transition: transform 0.2s ease, background 0.2s ease;
          animation: skill-row-in 0.4s ease forwards;
          opacity: 0;
          transform: translateX(-8px);
        }
        @keyframes skill-row-in {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .skill-row:hover {
          transform: translateX(4px);
          background: rgb(var(--color-foreground) / 0.06) !important;
        }
        .skill-progress {
          width: 0;
          animation: progress-fill 0.8s ease-out forwards;
        }
        @keyframes progress-fill {
          to { width: var(--progress-width); }
        }
        .category-card {
          transition: transform 0.15s ease;
          will-change: transform;
        }
        .sparkle-icon {
          animation: sparkle-rotate 3s ease-in-out infinite;
        }
      `}</style>

      {/* Background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `linear-gradient(to bottom, transparent, rgb(var(--color-background) / 0.5), transparent)`,
        }}
      />

      {/* Floating particles — CSS animated instead of Framer Motion */}
      <div className="absolute inset-0 -z-5 overflow-hidden pointer-events-none">
        {[
          { left: '10%', top: '20%', duration: '8s' },
          { left: '80%', top: '15%', duration: '10s' },
          { left: '25%', top: '70%', duration: '12s' },
          { left: '65%', top: '55%', duration: '14s' },
          { left: '45%', top: '85%', duration: '16s' },
          { left: '90%', top: '40%', duration: '18s' },
        ].map((pos, i) => (
          <div
            key={i}
            className="floating-particle absolute w-64 h-64 rounded-full opacity-10"
            style={{
              background: `radial-gradient(circle, var(--palette-primary), transparent)`,
              left: pos.left,
              top: pos.top,
              '--duration': pos.duration,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <Container>
        {/* Section Header */}
        <SectionBadge
          number="03"
          label="Skills"
          icon={Code2}
          title="Technical"
          titleAccent="Arsenal"
          subtitle="Technologies and tools I use to bring ideas to life."
        />
      </Container>

      {/* MARQUEE — CSS keyframes, GPU-accelerated */}
      <div className="relative mb-20 overflow-hidden w-screen left-1/2 -translate-x-1/2" style={{ position: 'relative' }}>
        <div
          className="absolute left-0 top-0 bottom-0 w-32 z-10"
          style={{ background: `linear-gradient(to right, rgb(var(--color-background)), transparent)` }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-32 z-10"
          style={{ background: `linear-gradient(to left, rgb(var(--color-background)), transparent)` }}
        />

        {/* First row - left to right */}
        <div className="marquee-row-1 flex mb-4" style={{ width: 'max-content' }}>
          <div className="flex gap-4 shrink-0 pr-4">
            {row1Skills.slice(0, skillsData.length).map((skill, i) => (
              <SkillPill key={`row1a-${skill.name}-${i}`} skill={skill} />
            ))}
          </div>
          <div className="flex gap-4 shrink-0 pr-4">
            {row1Skills.slice(0, skillsData.length).map((skill, i) => (
              <SkillPill key={`row1b-${skill.name}-${i}`} skill={skill} />
            ))}
          </div>
        </div>

        {/* Second row - right to left */}
        <div className="marquee-row-2 flex" style={{ width: 'max-content' }}>
          <div className="flex gap-4 shrink-0 pr-4">
            {row2Skills.map((skill, i) => (
              <SkillPill key={`row2a-${skill.name}-${i}`} skill={skill} />
            ))}
          </div>
          <div className="flex gap-4 shrink-0 pr-4">
            {row2Skills.map((skill, i) => (
              <SkillPill key={`row2b-${skill.name}-${i}`} skill={skill} />
            ))}
          </div>
        </div>
      </div>

      <Container>

        {/* Category Navigation Pills */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-14">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(null)}
            className="px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2.5 backdrop-blur-sm"
            style={{
              background: activeCategory === null
                ? 'linear-gradient(135deg, var(--palette-primary), var(--palette-accent1))'
                : 'rgb(var(--color-card) / 0.8)',
              color: activeCategory === null ? 'white' : 'rgb(var(--color-foreground) / 0.7)',
              border: `1px solid ${activeCategory === null ? 'transparent' : 'rgb(var(--color-foreground) / 0.08)'}`,
              boxShadow: activeCategory === null
                ? '0 8px 24px rgb(var(--color-foreground) / 0.15), inset 0 1px 0 rgb(255 255 255 / 0.2)'
                : '0 2px 8px rgb(var(--color-foreground) / 0.04)',
            }}
          >
            <Layers size={15} />
            All Skills
          </motion.button>
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.key;
            return (
              <motion.button
                key={cat.key}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(isActive ? null : cat.key)}
                className="px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2.5 backdrop-blur-sm"
                style={{
                  background: isActive
                    ? cat.gradientStyle.background
                    : 'rgb(var(--color-card) / 0.8)',
                  color: isActive ? 'white' : 'rgb(var(--color-foreground) / 0.7)',
                  border: `1px solid ${isActive ? 'transparent' : 'rgb(var(--color-foreground) / 0.08)'}`,
                  boxShadow: isActive
                    ? '0 8px 24px rgb(var(--color-foreground) / 0.15), inset 0 1px 0 rgb(255 255 255 / 0.2)'
                    : '0 2px 8px rgb(var(--color-foreground) / 0.04)',
                }}
              >
                <Icon size={15} />
                {cat.label.split(' ')[0]}
              </motion.button>
            );
          })}
        </div>

        {/* CATEGORIZED GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {categories
              .filter(cat => !activeCategory || cat.key === activeCategory)
              .map((cat, index) => (
                <motion.div
                  key={cat.key}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <CategoryCard category={cat} index={index} />
                </motion.div>
              ))}
          </AnimatePresence>
        </div>

        {/* Total Skills Counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div
            className="relative inline-flex items-center gap-4 px-8 py-4 rounded-2xl overflow-hidden"
            style={{
              background: 'rgb(var(--color-card))',
              border: '1px solid rgb(var(--color-foreground) / 0.08)',
              boxShadow: '0 8px 32px rgb(var(--color-foreground) / 0.06)',
            }}
          >
            {/* Subtle gradient glow behind counter */}
            <div
              className="absolute inset-0 opacity-10"
              style={{ background: 'linear-gradient(135deg, var(--palette-primary), transparent, var(--palette-accent1))' }}
            />
            <div className="sparkle-icon">
              <Sparkles size={22} style={{ color: 'var(--palette-primary)' }} />
            </div>
            <span className="relative z-10 text-base font-medium" style={{ color: 'rgb(var(--color-foreground))' }}>
              <span className="font-extrabold text-2xl" style={{ color: 'var(--palette-primary)' }}>
                {skillsData.length}+
              </span>
              {" "}technologies mastered
            </span>
          </div>
        </motion.div>

      </Container>
    </Section>
  );
};

export default Skills;