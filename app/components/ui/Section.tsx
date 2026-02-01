"use client";
import React from "react";
import type { SectionProps } from "@/app/types";
import { Container } from "./Container";

interface ExtendedSectionGridProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Section: React.FC<SectionProps> = ({ children, id, sectionNumber, sectionLabel, withBorder = true, background = "default", className = "" }) => {
  return (
    <section
      id={id}
      className={`py-24 md:py-32 w-full transition-colors duration-300 ${className}`}
      style={{
        backgroundColor: background === "subtle" ? `rgb(var(--color-card))` : `rgb(var(--color-background))`,
        borderTop: withBorder ? `1px solid rgb(var(--color-foreground) / 0.1)` : "none",
      }}
    >
      <Container>
        {(sectionNumber || sectionLabel) && (
          <div className="mb-8 md:mb-12">
            <span
              className="text-xs font-mono uppercase tracking-[0.2em]"
              style={{ color: `var(--palette-primary)` }}
            >
              {sectionNumber && `${sectionNumber} / `}{sectionLabel}
            </span>
          </div>
        )}
        {children}
      </Container>
    </section>
  );
};

interface SectionHeaderProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
  align?: "left" | "center";
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, className = "", align = "left" }) => {
  const alignClasses = align === "center" ? "text-center" : "";
  return (
    <div className={`mb-12 md:mb-16 ${alignClasses} ${className}`}>
      <h2
        className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-4"
        style={{ color: `rgb(var(--color-foreground))` }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="text-lg md:text-xl font-light max-w-2xl"
          style={{ color: `rgb(var(--color-muted))` }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

const SectionGrid: React.FC<ExtendedSectionGridProps> = ({ children, className = "", style }) => (
  <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 ${className}`} style={style}>{children}</div>
);

interface SectionLabelProps {
  number?: string;
  label: string;
  className?: string;
}

const SectionLabel: React.FC<SectionLabelProps> = ({ number, label, className = "" }) => (
  <div className={`lg:col-span-3 ${className}`}>
    <span
      className="text-xs font-mono uppercase tracking-[0.2em]"
      style={{ color: `var(--palette-primary)` }}
    >
      {number && `${number} / `}{label}
    </span>
  </div>
);

interface SectionContentProps {
  children: React.ReactNode;
  className?: string;
}

const SectionContent: React.FC<SectionContentProps> = ({ children, className = "" }) => (
  <div className={`lg:col-span-9 ${className}`}>{children}</div>
);

export { Section, SectionHeader, SectionGrid, SectionLabel, SectionContent };
export type { SectionProps };
