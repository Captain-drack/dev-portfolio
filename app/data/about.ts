import { Code2, Palette, Zap, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface StatData {
  number: string;
  label: string;
  icon: LucideIcon;
}

export interface ExpertiseData {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface AboutData {
  sectionLabel: string;
  headline: {
    before: string;
    highlight: string;
    after: string;
  };
  description: string;
  ctaText: string;
  ctaLink: string;
  stats: StatData[];
  expertise: ExpertiseData[];
  technologies: string[];
}

export const aboutData: AboutData = {
  sectionLabel: "01 / About",
  headline: {
    before: "I craft",
    highlight: "digital experiences",
    after: "that inspire.",
  },
  description:
    "A results-oriented Full Stack Developer with 5+ years of experience engineering scalable web applications. Expert in Next.js and Nest.js, specializing in robust backend architecture, database design, and high-performance frontend solutions.",
  ctaText: "Let's Connect",
  ctaLink: "#contact",
  stats: [
    { number: "5+", label: "Years Experience", icon: Zap },
    { number: "50+", label: "Projects Delivered", icon: Code2 },
    { number: "20+", label: "Happy Clients", icon: Sparkles },
  ],
  expertise: [
    {
      title: "Full Stack Architecture",
      description:
        "Building scalable applications with Next.js frontend and Nest.js backend, with a focus on code modularity and type safety.",
      icon: Code2,
    },
    {
      title: "UI/UX Implementation",
      description:
        "Transforming designs into pixel-perfect, responsive interfaces with smooth animations.",
      icon: Palette,
    },
    {
      title: "Backend & APIs",
      description:
        "Engineering RESTful APIs, microservices architecture, and Docker containerization for robust deployments.",
      icon: Zap,
    },
  ],
  technologies: [
    "React",
    "Next.js",
    "TypeScript",
    "Nest.js",
    "Node.js",
    "MySQL",
    "Docker",
    "Tailwind CSS",
  ],
};
