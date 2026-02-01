"use client";
import React, { forwardRef } from "react";
import { motion } from "framer-motion";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "link" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const getSizeClasses = (size: ButtonSize): string => {
  const sizes: Record<ButtonSize, string> = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };
  return sizes[size];
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "primary", size = "md", isLoading = false, leftIcon, rightIcon, fullWidth = false, className = "", disabled, type = "button", onClick }, ref) => {
    const baseClasses = "inline-flex items-center justify-center gap-2 font-medium uppercase tracking-widest border rounded-full transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
    const sizeClasses = getSizeClasses(size);
    const widthClasses = fullWidth ? "w-full" : "";

    const getVariantStyles = () => {
      switch (variant) {
        case "primary":
          return {
            backgroundColor: `rgb(var(--color-foreground))`,
            color: `rgb(var(--color-background))`,
            borderColor: `rgb(var(--color-foreground))`,
          };
        case "secondary":
          return {
            backgroundColor: `rgb(var(--color-foreground) / 0.1)`,
            color: `rgb(var(--color-foreground))`,
            borderColor: `rgb(var(--color-foreground) / 0.1)`,
          };
        case "ghost":
          return {
            backgroundColor: "transparent",
            color: `rgb(var(--color-foreground))`,
            borderColor: "transparent",
          };
        case "link":
          return {
            backgroundColor: "transparent",
            color: `rgb(var(--color-foreground))`,
            borderColor: "transparent",
          };
        case "outline":
          return {
            backgroundColor: "transparent",
            color: `rgb(var(--color-foreground))`,
            borderColor: `rgb(var(--color-foreground) / 0.2)`,
          };
        default:
          return {};
      }
    };

    return (
      <motion.button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        onClick={onClick}
        whileTap={{ scale: 0.98 }}
        whileHover={{ scale: 1.02 }}
        className={`${baseClasses} ${sizeClasses} ${widthClasses} ${className}`.trim()}
        style={{
          ...getVariantStyles(),
          // @ts-expect-error CSS variables for focus ring
          "--tw-ring-color": `rgb(var(--color-foreground) / 0.2)`,
          "--tw-ring-offset-color": `rgb(var(--color-background))`,
        }}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button };
