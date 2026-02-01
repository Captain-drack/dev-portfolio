"use client";
import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
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

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <Section id="skills" className="overflow-hidden relative py-24">
      {/* Background - Theme aware with animated gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `linear-gradient(to bottom, transparent, rgb(var(--color-background) / 0.5), transparent)`,
        }}
      />

      {/* Floating particles effect */}
      <div className="absolute inset-0 -z-5 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => {
          // Use deterministic positions instead of Math.random() to avoid hydration mismatch
          const positions = [
            { left: '10%', top: '20%' },
            { left: '80%', top: '15%' },
            { left: '25%', top: '70%' },
            { left: '65%', top: '55%' },
            { left: '45%', top: '85%' },
            { left: '90%', top: '40%' },
          ];
          return (
            <motion.div
              key={i}
              className="absolute w-64 h-64 rounded-full opacity-10"
              style={{
                background: `radial-gradient(circle, var(--palette-primary), transparent)`,
                left: positions[i].left,
                top: positions[i].top,
              }}
              animate={{
                x: [0, 30, 0],
                y: [0, -30, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}
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

        {/* MARQUEE - Enhanced Infinite Scroll */}
        <div className="relative mb-20 overflow-hidden">
          <div
            className="absolute left-0 top-0 bottom-0 w-32 z-10"
            style={{ background: `linear-gradient(to right, rgb(var(--color-background)), transparent)` }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-32 z-10"
            style={{ background: `linear-gradient(to left, rgb(var(--color-background)), transparent)` }}
          />

          {/* First row - left to right */}
          <motion.div
            className="flex gap-4 mb-4"
            animate={{ x: [0, -1200] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...skillsData, ...skillsData, ...skillsData].map((skill, i) => (
              <SkillPill key={`row1-${skill.name}-${i}`} skill={skill} />
            ))}
          </motion.div>

          {/* Second row - right to left */}
          <motion.div
            className="flex gap-4"
            animate={{ x: [-1200, 0] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          >
            {[...skillsData, ...skillsData, ...skillsData].reverse().map((skill, i) => (
              <SkillPill key={`row2-${skill.name}-${i}`} skill={skill} />
            ))}
          </motion.div>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(null)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2`}
            style={{
              background: activeCategory === null ? 'var(--palette-primary)' : 'rgb(var(--color-card))',
              color: activeCategory === null ? 'white' : 'rgb(var(--color-foreground))',
              border: `1px solid ${activeCategory === null ? 'transparent' : 'rgb(var(--color-foreground) / 0.1)'}`,
            }}
          >
            <Layers size={14} />
            All Skills
          </motion.button>
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.button
                key={cat.key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(activeCategory === cat.key ? null : cat.key)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2`}
                style={{
                  background: activeCategory === cat.key ? 'var(--palette-primary)' : 'rgb(var(--color-card))',
                  color: activeCategory === cat.key ? 'white' : 'rgb(var(--color-foreground))',
                  border: `1px solid ${activeCategory === cat.key ? 'transparent' : 'rgb(var(--color-foreground) / 0.1)'}`,
                }}
              >
                <Icon size={14} />
                {cat.label.split(' ')[0]}
              </motion.button>
            );
          })}
        </div>

        {/* CATEGORIZED GRID - Bento Style */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {categories
              .filter(cat => !activeCategory || cat.key === activeCategory)
              .map((cat, index) => (
                <CategoryCard key={cat.key} category={cat} index={index} />
              ))}
          </AnimatePresence>
        </motion.div>

        {/* Total Skills Counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full" style={{
            background: 'rgb(var(--color-card))',
            border: '1px solid rgb(var(--color-foreground) / 0.1)',
          }}>
            <Sparkles size={18} style={{ color: 'var(--palette-primary)' }} />
            <span style={{ color: 'rgb(var(--color-foreground))' }}>
              <span className="font-bold text-lg" style={{ color: 'var(--palette-primary)' }}>
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

// Enhanced Skill Pill for Marquee
const SkillPill = ({ skill }: { skill: typeof skillsData[0] }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1, y: -3 }}
      className="flex items-center gap-3 px-5 py-3 rounded-full whitespace-nowrap shrink-0 cursor-default group"
      style={{
        background: `rgb(var(--color-card))`,
        border: `1px solid rgb(var(--color-foreground) / 0.1)`,
        boxShadow: `0 4px 12px rgb(var(--color-foreground) / 0.05)`,
      }}
    >
      {skill.imageSrc && (
        <div className="relative w-6 h-6 group-hover:scale-110 transition-transform">
          <Image src={skill.imageSrc} alt={skill.name} fill className="object-contain" />
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
        <motion.div
          className="h-full rounded-full"
          style={{
            width: `${skill.percentage}%`,
            background: 'var(--palette-primary)',
          }}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
};

// Enhanced Category Card with Glassmorphism
const CategoryCard = ({
  category,
  index
}: {
  category: typeof categories[0];
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(springY, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width - 0.5);
    mouseY.set((e.clientY - top) / height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const Icon = category.icon;

  return (
    <ScrollReveal direction="up" delay={index * 0.1}>
      <motion.div
        ref={ref}
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          background: `rgb(var(--color-card))`,
          border: `1px solid rgb(var(--color-foreground) / 0.08)`,
          boxShadow: `0 8px 32px rgb(var(--color-foreground) / 0.08)`,
        }}
        className="relative p-6 rounded-2xl overflow-hidden group cursor-default h-full"
      >
        {/* Gradient Background Glow */}
        <div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
          style={category.gradientStyle}
        />

        {/* Grid Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(var(--color-foreground)) 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Header */}
        <div className="flex items-center gap-4 mb-6 relative z-10">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="p-3 rounded-xl"
            style={{ ...category.gradientStyle, color: 'white' }}
          >
            <Icon size={20} />
          </motion.div>
          <div>
            <h3
              className="text-lg font-semibold"
              style={{ color: `rgb(var(--color-foreground))` }}
            >
              {category.label}
            </h3>
            <p className="text-xs opacity-50">{category.skills.length} technologies</p>
          </div>
        </div>

        {/* Skill Pills - Enhanced Grid */}
        <div className="flex flex-wrap gap-2 relative z-10">
          {category.skills.map((skillName, skillIndex) => {
            const skill = skillsData.find(s => s.name === skillName);
            return (
              <motion.div
                key={skillName}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: skillIndex * 0.05 }}
                whileHover={{ scale: 1.08, y: -2 }}
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl transition-all group/skill"
                style={{
                  background: `rgb(var(--color-foreground) / 0.05)`,
                  border: `1px solid rgb(var(--color-foreground) / 0.08)`,
                }}
              >
                {skill?.imageSrc && (
                  <div className="relative w-5 h-5 group-hover/skill:scale-110 transition-transform">
                    <Image src={skill.imageSrc} alt={skillName} fill className="object-contain" />
                  </div>
                )}
                <span
                  className="text-sm font-medium"
                  style={{ color: `rgb(var(--color-foreground))` }}
                >
                  {skillName}
                </span>
                {skill && (
                  <div className="flex items-center gap-1.5">
                    <div
                      className="w-8 h-1 rounded-full overflow-hidden"
                      style={{ background: 'rgb(var(--color-foreground) / 0.15)' }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${skill.percentage}%`, ...category.gradientStyle }}
                      />
                    </div>
                    <span
                      className="text-[10px] font-bold opacity-60"
                    >
                      {skill.percentage}%
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Accent Line */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] rounded-full opacity-50"
          style={category.gradientStyle}
        />

        {/* Corner Accent */}
        <div
          className="absolute top-0 right-0 w-16 h-16 opacity-10 rounded-bl-[40px]"
          style={category.gradientStyle}
        />
      </motion.div>
    </ScrollReveal>
  );
};

export default Skills;