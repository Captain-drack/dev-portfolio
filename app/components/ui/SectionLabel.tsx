"use client";
import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

export interface SectionBadgeProps {
  /** Section number, e.g. "01", "02", "03" */
  number: string;
  /** Label text after the number, e.g. "Experience", "Skills" */
  label: string;
  /** Lucide icon component */
  icon: LucideIcon;
  /** Main title text (non-accented part) */
  title: string;
  /** Accented word in the title (displayed in italic gradient) */
  titleAccent: string;
  /** Optional subtitle/description */
  subtitle?: string;
}

export const SectionBadge: React.FC<SectionBadgeProps> = ({
  number,
  label,
  icon: Icon,
  title,
  titleAccent,
  subtitle,
}) => {
  return (
    <>
      {/* Number Badge + Label + Line */}
      <ScrollReveal direction="up">
        <div className="flex items-center gap-4 mb-6">
          <motion.div
            className="p-2 rounded-xl bg-[var(--palette-primary)]/10"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Icon size={20} className="text-[var(--palette-primary)]" />
          </motion.div>
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--palette-primary)]">
            {number} / {label}
          </span>
          <motion.div
            className="h-px flex-1 max-w-[150px]"
            style={{
              background: `linear-gradient(90deg, var(--palette-primary), var(--palette-accent2), transparent)`,
            }}
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
          />
        </div>
      </ScrollReveal>

      {/* Title + Subtitle */}
      <ScrollReveal direction="up" delay={0.1}>
        <div className="mb-16">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-4">
            {title}{" "}
            <span
              className="italic bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, var(--palette-primary), var(--palette-accent2))`,
              }}
            >
              {titleAccent}
            </span>
          </h2>
          {subtitle && (
            <p className="text-lg max-w-xl opacity-60">{subtitle}</p>
          )}
        </div>
      </ScrollReveal>
    </>
  );
};
