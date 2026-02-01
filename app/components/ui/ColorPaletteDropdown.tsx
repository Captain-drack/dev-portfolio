"use client";

import * as React from "react";
import { useState } from "react";
import { Palette, Check, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ColorPalette,
  useTheme,
  colorPaletteConfig,
} from "../../context/ThemeContext";
import { useSplash } from "../../context/SplashContext";
import { Button } from "@/app/components/ui/Button";

// Add descriptive metadata for richer UI
const paletteMeta: Record<string, { desc: string; vibe: string }> = {
  default: { desc: "Clean & Modern", vibe: "Professional" },
  ocean: { desc: "Calm Depths", vibe: "Serene" },
  forest: { desc: "Natural Growth", vibe: "Fresh" },
  sunset: { desc: "Warm Energy", vibe: "Vibrant" },
  lavender: { desc: "Creative Flow", vibe: "Playful" },
  mono: { desc: "High Contrast", vibe: "Minimal" },
};

export function ColorPaletteDropdown() {
  const { colorPalette, setColorPalette } = useTheme();
  const { triggerSplash } = useSplash(); // Added useSplash hook call
  const [isOpen, setIsOpen] = useState(false); // Changed React.useState to useState
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const handlePaletteChange = (palette: ColorPalette) => {
    setColorPalette(palette);
    triggerSplash(); // Trigger splash on change
    setIsOpen(false); // Close dropdown after selection
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const container = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: -20,
      clipPath: "inset(0% 0% 100% 0%)",
    },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      clipPath: "inset(0% 0% 0% 0%)",
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0.4,
        staggerChildren: 0.05,
        delayChildren: 0,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      clipPath: "inset(0% 0% 100% 0%)",
      transition: { duration: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-10 h-10 p-0 rounded-full border border-[rgb(var(--color-border))/0.1] bg-[rgb(var(--color-card))] hover:bg-[rgb(var(--color-foreground))/0.1] transition-all duration-300 group overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--palette-primary)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative flex items-center justify-center">
          <Palette
            size={20}
            style={{
              color: "var(--palette-primary)",
              width: "1.2rem",
              height: "1.2rem",
              filter: "drop-shadow(0 0 4px var(--palette-primary))",
            }}
          />
        </div>
        <span className="sr-only">Change color</span>
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
              style={{
                background:
                  "color-mix(in srgb, rgb(var(--color-background)), transparent 30%)",
              }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              exit="exit"
              className="fixed md:absolute left-4 right-4 md:left-auto md:right-0 mx-auto md:mx-0 top-28 md:top-auto mt-0 md:mt-3 w-auto md:w-72 max-w-[300px] md:max-w-none p-2 rounded-2xl border border-[rgb(var(--color-border))/0.1] bg-[rgb(var(--color-card))] shadow-2xl z-[100] ring-1 ring-white/10"
            >
              <div className="px-3 py-2 border-b border-white/5 mb-1 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest font-bold opacity-50">
                  Active Palette
                </span>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[rgb(var(--color-background))] border border-white/5">
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ backgroundColor: "var(--palette-primary)" }}
                  />
                  <span
                    className="text-[10px] font-bold"
                    style={{ color: "var(--palette-primary)" }}
                  >
                    {colorPaletteConfig[colorPalette]?.name}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                {Object.entries(colorPaletteConfig).map(([key, config]) => (
                  <motion.button
                    key={key}
                    variants={item}
                    onClick={() => {
                      setColorPalette(key as ColorPalette);
                      setIsOpen(false);
                    }}
                    className="group relative flex items-center p-2.5 rounded-xl transition-all duration-300 overflow-hidden"
                  >
                    {/* Immersive Hover Background */}
                    <div
                      className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${colorPalette === key ? "opacity-15" : ""}`}
                      style={{ backgroundColor: config.primary }}
                    />

                    {/* Left: Gradient Orb */}
                    <div
                      className={`relative w-10 h-10 rounded-xl shadow-inner flex items-center justify-center transition-transform duration-300 ${colorPalette === key ? "scale-100 ring-1 ring-white/20" : "scale-95 group-hover:scale-100"}`}
                      style={{
                        background: `linear-gradient(135deg, ${config.primary}, ${config.accent2})`,
                      }}
                    >
                      {colorPalette === key && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <Check
                            size={16}
                            className="text-white drop-shadow-md"
                            strokeWidth={3}
                          />
                        </motion.div>
                      )}
                    </div>

                    {/* Middle: Content */}
                    <div className="flex flex-col items-start px-3 flex-1 min-w-0 z-10">
                      <div className="flex items-center gap-2 w-full">
                        <span
                          className={`text-sm font-semibold transition-colors ${colorPalette === key ? "text-[rgb(var(--color-foreground))]" : "text-[rgb(var(--color-foreground))/0.9]"}`}
                        >
                          {config.name}
                        </span>
                        {colorPalette === key && (
                          <Sparkles
                            size={10}
                            style={{ color: config.primary }}
                          />
                        )}
                      </div>
                      <span className="text-[10px] opacity-50 truncate w-full text-left font-medium tracking-wide">
                        {paletteMeta[key]?.desc || "Standard Palette"}
                      </span>
                    </div>

                    {/* Right: DNA Strip */}
                    <div className="flex flex-col gap-0.5 opacity-50 group-hover:opacity-100 transition-opacity">
                      <div
                        className="w-8 h-1 rounded-full"
                        style={{ backgroundColor: config.primary }}
                      />
                      <div
                        className="w-6 h-1 rounded-full self-end"
                        style={{ backgroundColor: config.accent1 }}
                      />
                      <div
                        className="w-4 h-1 rounded-full self-end"
                        style={{ backgroundColor: config.accent2 }}
                      />
                    </div>

                    {/* Active Border Indicator */}
                    {colorPalette === key && (
                      <motion.div
                        layoutId="activePaletteBorder"
                        className="absolute inset-0 rounded-xl border border-[var(--palette-primary)]/30"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
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
