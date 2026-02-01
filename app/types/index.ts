import React from "react";

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface HTMLComponentProps extends BaseComponentProps {
  id?: string;
  "aria-label"?: string;
}

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "link"
  | "outline";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  label?: string;
  error?: string;
  helperText?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  inputSize?: "sm" | "md" | "lg";
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export type CardVariant = "default" | "glass" | "elevated" | "outline";

export interface CardProps extends BaseComponentProps {
  variant?: CardVariant;
  hoverable?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  onClick?: () => void;
}

export type BadgeVariant = "default" | "outline" | "subtle";
export type BadgeSize = "sm" | "md";

export interface BadgeProps extends BaseComponentProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

export interface SectionProps extends BaseComponentProps {
  id?: string;
  sectionNumber?: string;
  sectionLabel?: string;
  withBorder?: boolean;
  background?: "default" | "subtle";
}

export type AnimationDirection = "up" | "down" | "left" | "right";
export type AnimationPreset =
  | "fadeIn"
  | "slideUp"
  | "slideDown"
  | "scaleIn"
  | "none";

export interface MotionProps extends BaseComponentProps {
  animation?: AnimationPreset;
  delay?: number;
  duration?: number;
  triggerOnView?: boolean;
  once?: boolean;
}

export interface AnimatedTextProps extends BaseComponentProps {
  text: string;
  animation?: "words" | "chars" | "lines";
  stagger?: number;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

export interface ExperienceData {
  companyName: string;
  companyLink: string;
  logoSrc?: string;
  position: string;
  startDate: string;
  endDate: string;
  location: string;
  responsibilities: string[];
}

export interface ProjectData {
  title: string;
  image: string;
  description: string;
  githubUrl?: string;
  projectUrl?: string;
  technologies: string[];
  featured?: boolean;
}

export interface SkillData {
  name: string;
  imageSrc?: string;
  percentage?: number;
  category?: string;
}

export interface GalleryImageData {
  src: string;
  alt: string;
  caption?: string;
  metadata?: {
    date?: string;
    location?: string;
    camera?: string;
  };
}

export interface ImageGalleryProps {
  images: GalleryImageData[];
  initialIndex?: number;
  showDetails?: boolean;
  showFilmStrip?: boolean;
  onImageChange?: (index: number) => void;
  onClose?: () => void;
  className?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  contactNumber?: string;
  message: string;
}

export interface FormFieldProps {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea";
  required?: boolean;
  placeholder?: string;
}
