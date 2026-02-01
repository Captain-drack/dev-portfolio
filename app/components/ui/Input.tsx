"use client";
import React, { forwardRef } from "react";
import type { InputProps } from "@/app/types";

const getSizeClasses = (size: "sm" | "md" | "lg" = "md"): string => {
  const sizes = { sm: "py-2 text-sm", md: "py-3 text-base", lg: "py-4 text-lg" };
  return sizes[size];
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftElement, rightElement, inputSize = "md", className = "", id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const sizeClasses = getSizeClasses(inputSize);

    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-mono uppercase tracking-[0.15em] mb-2"
            style={{ color: `rgb(var(--color-muted))` }}
          >
            {label}
          </label>
        )}
        <div className="relative group">
          {leftElement && (
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 transition-colors"
              style={{ color: `rgb(var(--color-muted))` }}
            >
              {leftElement}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`w-full bg-transparent border-b focus:outline-none transition-colors duration-300 ${sizeClasses} ${leftElement ? "pl-8" : ""} ${rightElement ? "pr-8" : ""}`}
            style={{
              color: `rgb(var(--color-foreground))`,
              borderColor: error ? "#ef4444" : `rgb(var(--color-foreground) / 0.2)`,
            }}
            {...props}
          />
          {rightElement && (
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2"
              style={{ color: `rgb(var(--color-muted))` }}
            >
              {rightElement}
            </div>
          )}
          <span
            className="absolute bottom-0 left-0 w-full h-px scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-left"
            style={{ backgroundColor: `var(--palette-primary)` }}
          />
        </div>
        {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
        {helperText && !error && (
          <p className="mt-2 text-xs" style={{ color: `rgb(var(--color-muted))` }}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
export type { InputProps };
