"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform
} from "framer-motion";
import { ExternalLink, Github, ChevronDown, ChevronUp, Folder, Filter } from "lucide-react";
import { Section, Container, ScrollReveal, SectionBadge } from "@/app/components/ui";
import { projectData, Project } from "@/app/data/projects";

// --- Project Card Component with 3D Tilt ---
const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);

    // Set CSS variables for spotlight
    cardRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
    cardRef.current.style.setProperty("--mouse-y", `${mouseY}px`);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative rounded-2xl h-full perspective-1000"
    >
      {/* Spotlight Border */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: "radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), var(--palette-primary), transparent 40%)",
          padding: "1px",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          zIndex: 20
        }}
      />

      <div
        className="relative h-full rounded-2xl overflow-hidden border transition-all duration-300 shadow-lg group-hover:shadow-2xl"
        style={{
          background: "rgb(var(--color-card))",
          borderColor: "rgb(var(--color-foreground) / 0.08)",
          transform: "translateZ(0)",
        }}
      >
        {/* Browser Window Frame */}
        <div className="relative border-b border-[rgb(var(--color-foreground)/0.05)] bg-[rgb(var(--color-background)/0.5)] p-3 flex gap-2 items-center backdrop-blur-sm">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
          <div className="ml-2 text-[10px] sm:text-xs opacity-50 font-mono truncate max-w-[150px]">
            {project.projectUrl.replace(/^https?:\/\//, '')}
          </div>
        </div>

        {/* Project Image */}
        <div className="relative aspect-video overflow-hidden">
          <Link
            href={project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-full"
          >
            <div className="relative w-full h-full">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {/* Overlay with Glassmorphism */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 backdrop-blur-[1px]"
                style={{
                  background: "linear-gradient(135deg, var(--palette-primary) / 0.6, var(--palette-accent2) / 0.4)",
                }}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileHover={{ scale: 1.05 }}
                  className="px-6 py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold flex items-center gap-2"
                >
                  <ExternalLink size={18} />
                  Visit Site
                </motion.div>
              </div>
            </div>
          </Link>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <h3
              className="text-xl font-bold group-hover:text-[var(--palette-primary)] transition-colors duration-300"
              style={{ color: "rgb(var(--color-foreground))" }}
            >
              {project.title}
            </h3>
            {project.category && (
              <span
                className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-md font-bold opacity-60"
                style={{
                  background: "rgb(var(--color-foreground) / 0.05)",
                  color: "rgb(var(--color-foreground))"
                }}
              >
                {project.category}
              </span>
            )}
          </div>

          <div className="mb-4">
            <p
              className="text-sm leading-relaxed"
              style={{ color: "rgb(var(--color-foreground) / 0.7)" }}
            >
              {isExpanded ? project.description : `${project.description.slice(0, 100)}...`}
            </p>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 mt-2 text-xs font-medium transition-colors duration-200 hover:underline"
              style={{ color: "var(--palette-primary)" }}
            >
              {isExpanded ? (
                <>See Less <ChevronUp size={14} /></>
              ) : (
                <>See More <ChevronDown size={14} /></>
              )}
            </button>
          </div>

          {/* Tech Stack - Enhanced with Glowing States */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="relative text-xs px-2.5 py-1 rounded-md font-medium transition-all duration-300 overflow-hidden"
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  color: "rgb(var(--color-foreground) / 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                }}
              >
                {/* Tech Hover Glow */}
                <span className="relative z-10 group-hover:text-[var(--palette-primary)] transition-colors duration-300">{tech}</span>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  style={{ background: "var(--palette-primary)" }}
                />
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="text-xs px-2 py-1 opacity-50 font-medium" style={{ color: "rgb(var(--color-foreground))" }}>
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          {/* Links */}
          <div className="flex items-center gap-5 pt-4 border-t"
            style={{ borderColor: "rgb(var(--color-foreground) / 0.08)" }}
          >
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-[var(--palette-primary)] group/link"
              style={{ color: "rgb(var(--color-foreground) / 0.7)" }}
            >
              <Github size={16} className="transition-transform group-hover/link:-translate-y-0.5" />
              <span>Source</span>
            </Link>
            <Link
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-[var(--palette-primary)] group/link"
              style={{ color: "rgb(var(--color-foreground) / 0.7)" }}
            >
              <ExternalLink size={16} className="transition-transform group-hover/link:-translate-y-0.5" />
              <span>Preview</span>
            </Link>
          </div>
        </div>

        {/* Shine Effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-500"
          style={{
            background: "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.03), transparent 50%)",
            zIndex: 10,
          }}
        />
      </div>
    </motion.div>
  );
};

// --- Main Projects Component ---
function Projects() {
  const [filter, setFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);

  // Extract unique categories
  const categories = ["All", ...Array.from(new Set(projectData.map(p => p.category || "Other")))];

  // Filter logic
  const filteredProjects = projectData.filter(project => {
    if (filter === "All") return true;
    return project.category === filter;
  });

  const visibleProjects = showAll ? filteredProjects : filteredProjects.slice(0, 3);

  return (
    <Section id="projects" className="overflow-hidden">
      <Container>
        {/* Section Header */}
        <SectionBadge
          number="04"
          label="Projects"
          icon={Folder}
          title="Selected"
          titleAccent="Works"
        />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <ScrollReveal direction="up" delay={0.1}>
            <p
              className="text-lg md:text-xl max-w-2xl"
              style={{ color: "rgb(var(--color-foreground) / 0.7)" }}
            >
              Showcasing creative solutions and technical expertise across various domains.
            </p>
          </ScrollReveal>

          {/* Filter Tabs */}
          <ScrollReveal direction="left" delay={0.2}>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${filter === cat
                    ? "shadow-md scale-105"
                    : "hover:bg-white/5"
                    }`}
                  style={{
                    background: filter === cat
                      ? "var(--palette-primary)"
                      : "transparent",
                    color: filter === cat
                      ? "#fff"
                      : "rgb(var(--color-foreground) / 0.6)",
                    border: `1px solid ${filter === cat ? "transparent" : "rgb(var(--color-foreground) / 0.1)"}`
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <ProjectCard key={`${project.title}-${filter}`} project={project} index={index} />
            ))}
          </AnimatePresence>
        </div>

        {/* Expand Button */}
        {filteredProjects.length > 3 && (
          <motion.div
            className="flex justify-center mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => setShowAll(!showAll)}
              className="group relative flex items-center gap-3 px-8 py-3.5 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
              style={{
                background: "rgb(var(--color-card))",
                border: "1px solid rgb(var(--color-foreground) / 0.1)",
                color: "rgb(var(--color-foreground))",
              }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{showAll ? "Show Less" : "View All Projects"}</span>
              <motion.div
                animate={{ rotate: showAll ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={18} />
              </motion.div>

              {/* Button Hover Gradient */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-300"
                style={{
                  background: "linear-gradient(90deg, var(--palette-primary) / 0.1, var(--palette-accent2) / 0.1)"
                }}
              />
            </motion.button>
          </motion.div>
        )}
      </Container>
    </Section>
  );
}

export default Projects;