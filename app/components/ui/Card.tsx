"use client";
import React from "react";
import { motion } from "framer-motion";
import type { CardProps, CardVariant, BaseComponentProps } from "@/app/types";

const getVariantClasses = (variant: CardVariant): string => {
  const variants: Record<CardVariant, string> = {
    default: "bg-[#0a0a0a] border-white/10",
    glass: "bg-white/5 backdrop-blur-xl border-white/10",
    elevated: "bg-[#0a0a0a] border-white/10 shadow-2xl",
    outline: "bg-transparent border-white/20",
  };
  return variants[variant];
};

const getPaddingClasses = (padding: "none" | "sm" | "md" | "lg"): string => {
  const paddings = { none: "", sm: "p-4", md: "p-6", lg: "p-8" };
  return paddings[padding];
};

const Card: React.FC<CardProps> = ({ children, variant = "default", hoverable = false, padding = "md", className = "", onClick }) => {
  const variantClasses = getVariantClasses(variant);
  const paddingClasses = getPaddingClasses(padding);
  const Component = hoverable ? motion.div : "div";
  const hoverProps = hoverable ? { whileHover: { y: -4, scale: 1.01 }, transition: { duration: 0.2 } } : {};

  return (
    <Component
      className={`rounded-xl border ${variantClasses} ${paddingClasses} ${hoverable || onClick ? "cursor-pointer" : ""} transition-all duration-300 ${className}`}
      onClick={onClick}
      {...hoverProps}
    >
      {children}
    </Component>
  );
};

const CardHeader: React.FC<BaseComponentProps> = ({ children, className = "" }) => (
  <div className={`mb-4 ${className}`}>{children}</div>
);

const CardContent: React.FC<BaseComponentProps> = ({ children, className = "" }) => (
  <div className={className}>{children}</div>
);

const CardFooter: React.FC<BaseComponentProps> = ({ children, className = "" }) => (
  <div className={`mt-4 pt-4 border-t border-white/10 ${className}`}>{children}</div>
);

export { Card, CardHeader, CardContent, CardFooter };
export type { CardProps };
