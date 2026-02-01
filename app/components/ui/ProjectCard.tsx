"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "./Badge";
import type { ProjectData, BaseComponentProps } from "@/app/types";

interface ProjectCardProps extends BaseComponentProps {
  data: ProjectData;
  index?: number;
  imagePosition?: "left" | "right" | "auto";
}

const ProjectCard: React.FC<ProjectCardProps> = ({ data, index = 0, imagePosition = "auto", className = "" }) => {
  const { title, image, description, technologies, projectUrl, githubUrl } = data;
  const isImageRight = imagePosition === "auto" ? index % 2 === 1 : imagePosition === "right";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={`group flex flex-col lg:flex-row gap-12 lg:gap-24 items-center ${className}`}
    >
      <div className={`w-full lg:w-7/12 overflow-hidden ${isImageRight ? "lg:order-2" : ""}`}>
        <Link href={projectUrl || "#"} target="_blank" rel="noopener noreferrer" className="block overflow-hidden relative">
          <div
            className="absolute inset-0 group-hover:bg-transparent transition-colors z-10 duration-500"
            style={{ backgroundColor: `rgb(var(--color-background) / 0.2)` }}
          />
          <div className="relative aspect-video w-full">
            <Image src={image} alt={title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105" sizes="(max-width: 768px) 100vw, 60vw" />
          </div>
        </Link>
      </div>
      <div className={`w-full lg:w-5/12 flex flex-col gap-6 ${isImageRight ? "lg:order-1 lg:text-right lg:items-end" : ""}`}>
        <h3
          className="text-4xl md:text-5xl font-serif group-hover:italic transition-all duration-300"
          style={{ color: `rgb(var(--color-foreground))` }}
        >
          {title}
        </h3>
        <p
          className="font-light leading-relaxed text-lg max-w-md"
          style={{ color: `rgb(var(--color-muted-foreground))` }}
        >
          {description}
        </p>
        <div className={`flex flex-wrap gap-2 mt-2 ${isImageRight ? "justify-end" : ""}`}>
          {technologies.map((tech, i) => (
            <Badge key={i} variant="subtle" size="sm">{tech}</Badge>
          ))}
        </div>
        <div className={`flex gap-8 mt-4 ${isImageRight ? "justify-end" : ""}`}>
          {projectUrl && (
            <Link
              href={projectUrl}
              target="_blank"
              className="pb-1 uppercase text-sm tracking-widest transition-colors"
              style={{
                color: `rgb(var(--color-foreground))`,
                borderBottom: `1px solid rgb(var(--color-foreground) / 0.3)`,
              }}
            >
              Live Demo
            </Link>
          )}
          {githubUrl && (
            <Link
              href={githubUrl}
              target="_blank"
              className="pb-1 uppercase text-sm tracking-widest transition-colors"
              style={{
                color: `rgb(var(--color-foreground))`,
                borderBottom: `1px solid rgb(var(--color-foreground) / 0.3)`,
              }}
            >
              GitHub
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

interface ProjectGridProps extends BaseComponentProps {
  projects: ProjectData[];
  initialCount?: number;
  showViewAll?: boolean;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects, initialCount = 3, showViewAll = true, className = "" }) => {
  const [showAll, setShowAll] = React.useState(false);
  const visibleProjects = showAll ? projects : projects.slice(0, initialCount);

  return (
    <div className={className}>
      <div className="flex flex-col gap-24 md:gap-32">
        {visibleProjects.map((project, index) => (
          <ProjectCard key={index} data={project} index={index} />
        ))}
      </div>
      {showViewAll && projects.length > initialCount && (
        <div className="mt-16 flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-xs font-mono uppercase tracking-widest pb-2 hover:opacity-50 transition-opacity"
            style={{
              color: `var(--palette-primary)`,
              borderBottom: `1px solid var(--palette-primary)`,
            }}
          >
            {showAll ? "View Less" : "View All Works"}
          </button>
        </div>
      )}
    </div>
  );
};

export { ProjectCard, ProjectGrid };
export type { ProjectCardProps, ProjectGridProps };
