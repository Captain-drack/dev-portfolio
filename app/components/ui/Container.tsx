"use client";
import React from "react";
import type { BaseComponentProps } from "@/app/types";

interface ContainerProps extends BaseComponentProps {
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  centered?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const getMaxWidthClasses = (maxWidth: ContainerProps["maxWidth"]): string => {
  const widths = { sm: "max-w-screen-sm", md: "max-w-screen-md", lg: "max-w-screen-lg", xl: "max-w-screen-xl", "2xl": "max-w-[1920px]", full: "max-w-full" };
  return widths[maxWidth || "2xl"];
};

const getPaddingClasses = (padding: ContainerProps["padding"]): string => {
  const paddings = { none: "", sm: "px-4", md: "px-6 md:px-12", lg: "px-6 md:px-12 lg:px-24" };
  return paddings[padding || "lg"];
};

const Container: React.FC<ContainerProps> = ({ children, maxWidth = "2xl", centered = true, padding = "lg", className = "" }) => {
  const maxWidthClasses = getMaxWidthClasses(maxWidth);
  const paddingClasses = getPaddingClasses(padding);

  return (
    <div className={`w-full ${maxWidthClasses} ${centered ? "mx-auto" : ""} ${paddingClasses} ${className}`}>
      {children}
    </div>
  );
};

export { Container };
export type { ContainerProps };
