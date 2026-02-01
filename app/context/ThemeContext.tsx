"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";

export type ThemeMode = "dark" | "light" | "sepia" | "dim" | "midnight" | "nord" | "system";
export type ColorPalette = "default" | "ocean" | "forest" | "sunset" | "lavender" | "monochrome";

interface ThemeContextType {
  theme: ThemeMode;
  colorPalette: ColorPalette;
  setTheme: (theme: ThemeMode) => void;
  setColorPalette: (palette: ColorPalette) => void;
  resolvedTheme: ThemeMode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_KEY = "portfolio-theme";
const PALETTE_KEY = "portfolio-palette";

export const themeModeConfig: Record<Exclude<ThemeMode, "system">, { name: string; icon: string; description: string }> = {
  dark: { name: "Dark", icon: "🌙", description: "Deep black" },
  light: { name: "Light", icon: "☀️", description: "Soft white" },
  sepia: { name: "Sepia", icon: "📜", description: "Warm cream" },
  dim: { name: "Dim", icon: "🌆", description: "Mid gray" },
  midnight: { name: "Midnight", icon: "🌌", description: "Deep navy" },
  nord: { name: "Nord", icon: "❄️", description: "Cool blue-gray" },
};

// Theme-aware color palettes - dark vs light versions
const darkPaletteColors: Record<ColorPalette, { primary: string; accent1: string; accent2: string }> = {
  default: { primary: "#60a5fa", accent1: "#93c5fd", accent2: "#6ee7b7" },
  ocean: { primary: "#22d3ee", accent1: "#67e8f9", accent2: "#5eead4" },
  forest: { primary: "#4ade80", accent1: "#86efac", accent2: "#bef264" },
  sunset: { primary: "#fb923c", accent1: "#fdba74", accent2: "#fb7185" },
  lavender: { primary: "#c084fc", accent1: "#d8b4fe", accent2: "#f472b6" },
  monochrome: { primary: "#d4d4d8", accent1: "#a1a1aa", accent2: "#71717a" },
};

const lightPaletteColors: Record<ColorPalette, { primary: string; accent1: string; accent2: string }> = {
  default: { primary: "#2563eb", accent1: "#3b82f6", accent2: "#059669" },
  ocean: { primary: "#0891b2", accent1: "#0284c7", accent2: "#0d9488" },
  forest: { primary: "#16a34a", accent1: "#059669", accent2: "#65a30d" },
  sunset: { primary: "#ea580c", accent1: "#d97706", accent2: "#e11d48" },
  lavender: { primary: "#9333ea", accent1: "#7c3aed", accent2: "#db2777" },
  monochrome: { primary: "#3f3f46", accent1: "#52525b", accent2: "#71717a" },
};

// For ColorPaletteDropdown display
export const colorPaletteConfig: Record<ColorPalette, { name: string; primary: string; accent1: string; accent2: string }> = {
  default: { name: "Default", primary: "#3b82f6", accent1: "#60a5fa", accent2: "#34d399" },
  ocean: { name: "Ocean", primary: "#22d3ee", accent1: "#3b82f6", accent2: "#2dd4bf" },
  forest: { name: "Forest", primary: "#22c55e", accent1: "#10b981", accent2: "#84cc16" },
  sunset: { name: "Sunset", primary: "#fb923c", accent1: "#f59e0b", accent2: "#fb7185" },
  lavender: { name: "Lavender", primary: "#a78bfa", accent1: "#8b5cf6", accent2: "#f472b6" },
  monochrome: { name: "Mono", primary: "#71717a", accent1: "#94a3b8", accent2: "#64748b" },
};

function getInitialTheme(): ThemeMode {
  if (typeof window === "undefined") return "dark";
  const saved = localStorage.getItem(THEME_KEY);
  return (saved as ThemeMode) || "dark";
}

function getInitialPalette(): ColorPalette {
  if (typeof window === "undefined") return "default";
  const saved = localStorage.getItem(PALETTE_KEY);
  return (saved as ColorPalette) || "default";
}

function isLightTheme(theme: ThemeMode): boolean {
  return theme === "light" || theme === "sepia";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [theme, setThemeState] = useState<ThemeMode>("dark");
  const [colorPalette, setColorPaletteState] = useState<ColorPalette>("default");
  const [resolvedTheme, setResolvedTheme] = useState<ThemeMode>("dark");

  useEffect(() => {
    setThemeState(getInitialTheme());
    setColorPaletteState(getInitialPalette());
    setMounted(true);
  }, []);

  const applyTheme = useCallback((themeVal: ThemeMode, paletteVal: ColorPalette) => {
    const root = document.documentElement;
    let effectiveTheme: ThemeMode = themeVal;

    if (themeVal === "system") {
      effectiveTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    setResolvedTheme(effectiveTheme);
    root.setAttribute("data-theme", effectiveTheme);
    root.setAttribute("data-palette", paletteVal);

    // Use theme-aware palette colors based on whether it's a light or dark theme
    const paletteColors = isLightTheme(effectiveTheme)
      ? lightPaletteColors[paletteVal]
      : darkPaletteColors[paletteVal];

    root.style.setProperty("--palette-primary", paletteColors.primary);
    root.style.setProperty("--palette-accent1", paletteColors.accent1);
    root.style.setProperty("--palette-accent2", paletteColors.accent2);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    applyTheme(theme, colorPalette);
  }, [theme, colorPalette, mounted, applyTheme]);

  useEffect(() => {
    if (!mounted || theme !== "system") return;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => applyTheme(theme, colorPalette);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, colorPalette, mounted, applyTheme]);

  const setTheme = useCallback((newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
  }, []);

  const setColorPalette = useCallback((newPalette: ColorPalette) => {
    setColorPaletteState(newPalette);
    localStorage.setItem(PALETTE_KEY, newPalette);
  }, []);

  const value = { theme, colorPalette, setTheme, setColorPalette, resolvedTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
