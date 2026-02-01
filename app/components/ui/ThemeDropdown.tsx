"use client";

import * as React from "react";
import { useState } from "react";
import { Moon, Sun, Monitor, Cloud, Star, Snowflake, ScrollText, Check, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, ThemeMode } from "@/app/context/ThemeContext";
import { useSplash } from "@/app/context/SplashContext"; // Added this line
import { Button } from "@/app/components/ui/Button";

// Map theme modes to Lucide icons
const themeIcons: Record<Exclude<ThemeMode, "system">, React.ReactNode> = {
  dark: <Moon size={18} />,
  light: <Sun size={18} />,
  sepia: <ScrollText size={18} />,
  dim: <Cloud size={18} />,
  midnight: <Star size={18} />,
  nord: <Snowflake size={18} />,
};

// Theme preview colors (Background / Card / Primary)
const themePreviews: Record<string, { bg: string, card: string, ring: string }> = {
  dark: { bg: "#0a0a0a", card: "#141414", ring: "#ffffff" },
  light: { bg: "#fafafa", card: "#ffffff", ring: "#000000" },
  sepia: { bg: "#fdf8f0", card: "#fffcf5", ring: "#554535" },
  dim: { bg: "#2a2a2a", card: "#373737", ring: "#ebebeb" },
  midnight: { bg: "#0a1628", card: "#14233c", ring: "#dce6f5" },
  nord: { bg: "#2e3440", card: "#3b4252", ring: "#e5e9f0" },
};

const themeModeConfigDisplay: Record<Exclude<ThemeMode, "system">, { name: string; description: string }> = {
  dark: { name: "Dark", description: "Deep black" },
  light: { name: "Light", description: "Soft white" },
  sepia: { name: "Sepia", description: "Warm cream" },
  dim: { name: "Dim", description: "Mid gray" },
  midnight: { name: "Midnight", description: "Deep navy" },
  nord: { name: "Nord", description: "Cool blue-gray" },
};

export function ThemeDropdown() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const { triggerSplash } = useSplash();
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeChange = (newTheme: ThemeMode) => {
    setTheme(newTheme);
    triggerSplash(); // Trigger splash on change
  };
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const container = {
    hidden: { opacity: 0, scale: 0.95, y: -20, clipPath: "inset(0% 0% 100% 0%)" },
    show: {
      opacity: 1, scale: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)",
      transition: {
        type: "spring" as const, bounce: 0, duration: 0.3,
        staggerChildren: 0.05,
        delayChildren: 0.05
      }
    },
    exit: { opacity: 0, scale: 0.95, y: -10, clipPath: "inset(0% 0% 100% 0%)", transition: { duration: 0.2 } }
  };

  const item = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-10 h-10 p-0 rounded-full border border-[rgb(var(--color-border))/0.1] bg-[rgb(var(--color-card))] hover:bg-[rgb(var(--color-foreground))/0.1] transition-all duration-300 group overflow-hidden"
      >
        <div className="absolute inset-0 bg-[var(--palette-primary)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative flex items-center justify-center w-[1.2rem] h-[1.2rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={theme}
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
              style={{
                color: "rgb(var(--color-foreground))",
                width: "1.2rem", height: "1.2rem",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}
            >
              {themeIcons[theme === 'system' ? 'dark' : theme] || <Moon size={20} />}
            </motion.div>
          </AnimatePresence>
        </div>
        <span className="sr-only">Toggle theme</span>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99] md:hidden"
              style={{ background: 'rgb(var(--color-background))' }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              exit="exit"
              className="fixed md:absolute left-4 right-4 md:left-auto md:right-0 mx-auto md:mx-0 top-28 md:top-auto mt-0 md:mt-3 w-auto md:w-64 max-w-[280px] md:max-w-none p-2 rounded-2xl border border-[rgb(var(--color-border))/0.1] bg-[rgb(var(--color-card))] shadow-2xl z-[100] ring-1 ring-white/10"
            >
              <div className="px-3 py-2 border-b border-white/5 mb-1 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest font-bold opacity-50">Select Appearance</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--palette-primary)] shadow-[0_0_8px_var(--palette-primary)]" />
              </div>

              <div className="flex flex-col gap-1">
                {Object.entries(themeModeConfigDisplay).map(([key, config]) => (
                  <motion.button
                    key={key}
                    variants={item}
                    onClick={() => {
                      setTheme(key as ThemeMode);
                      setIsOpen(false);
                    }}
                    className={`relative flex items-center gap-3 p-2 rounded-xl transition-all duration-200 group
                    ${theme === key
                        ? "bg-[rgb(var(--color-foreground))/0.08]"
                        : "hover:bg-[rgb(var(--color-foreground))/0.03]"
                      }`}
                  >
                    {/* Left: Icon Box */}
                    <div className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors duration-300 ${theme === key ? 'text-[var(--palette-primary)] bg-[var(--palette-primary)]/10' : 'text-[rgb(var(--color-muted-foreground))] bg-white/5'}`}>
                      {themeIcons[key as Exclude<ThemeMode, "system">]}
                    </div>

                    {/* Middle: Text */}
                    <div className="flex flex-col items-start flex-1 min-w-0">
                      <span className={`text-sm font-medium transition-colors ${theme === key ? 'text-[rgb(var(--color-foreground))]' : 'text-[rgb(var(--color-foreground))/0.8] group-hover:text-[rgb(var(--color-foreground))]'}`}>
                        {config.name}
                      </span>
                      <span className="text-[10px] opacity-40 truncate w-full text-left">{config.description}</span>
                    </div>

                    {/* Right: Theme Preview Dot */}
                    <div className="relative w-6 h-6 rounded-full border border-white/10 shadow-sm overflow-hidden flex items-center justify-center" style={{ backgroundColor: themePreviews[key]?.bg }}>
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: themePreviews[key]?.card }} />
                      {theme === key && (
                        <motion.div layoutId="activeDot" className="absolute inset-0 border-2 border-[var(--palette-primary)] rounded-full" />
                      )}
                    </div>

                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
