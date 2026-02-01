"use client";
import React from "react";
import type { BadgeProps, BadgeVariant, BadgeSize } from "@/app/types";

const Badge: React.FC<BadgeProps> = ({ children, variant = "default", size = "md", className = "" }) => {
  const sizeClasses: Record<BadgeSize, string> = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-3 py-1 text-xs"
  };

  const getVariantStyles = (v: BadgeVariant): React.CSSProperties => {
    switch (v) {
      case "outline":
        return {
          backgroundColor: "transparent",
          color: `rgb(var(--color-foreground))`,
          borderColor: `rgb(var(--color-foreground) / 0.2)`,
        };
      case "subtle":
        return {
          backgroundColor: `rgb(var(--color-foreground) / 0.05)`,
          color: `rgb(var(--color-muted-foreground))`,
          borderColor: "transparent",
        };
      default:
        return {
          backgroundColor: `rgb(var(--color-foreground) / 0.1)`,
          color: `rgb(var(--color-foreground))`,
          borderColor: "transparent",
        };
    }
  };

  return (
    <span
      className={`inline-flex items-center justify-center font-mono uppercase tracking-widest border rounded-full transition-colors duration-200 ${sizeClasses[size]} ${className}`}
      style={getVariantStyles(variant)}
    >
      {children}
    </span>
  );
};

export { Badge };
export type { BadgeProps };
