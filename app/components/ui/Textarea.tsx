"use client";
import React, { forwardRef } from "react";
import type { TextareaProps } from "@/app/types";

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = "", id, rows = 4, ...props }, ref) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-xs font-mono uppercase tracking-[0.15em] mb-2"
            style={{ color: `rgb(var(--color-muted))` }}
          >
            {label}
          </label>
        )}
        <div className="relative group">
          <textarea
            ref={ref}
            id={textareaId}
            rows={rows}
            className="w-full bg-transparent border-b py-3 text-lg focus:outline-none transition-colors duration-300 resize-none"
            style={{
              color: `rgb(var(--color-foreground))`,
              borderColor: error ? "#ef4444" : `rgb(var(--color-foreground) / 0.2)`,
            }}
            {...props}
          />
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

Textarea.displayName = "Textarea";

export { Textarea };
export type { TextareaProps };
