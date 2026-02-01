"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";
import { useSplash } from "../../context/SplashContext";

// DigitalRain Component
const DigitalRain = () => {
  const [drops, setDrops] = useState<Array<{ id: number; left: number; duration: number; delay: number; text: string }>>([]);

  useEffect(() => {
    const newDrops = [...Array(20)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: Math.random() * 2 + 1,
      delay: Math.random() * 2,
      text: Math.random().toString(16).substr(2, 8).toUpperCase()
    }));
    setDrops(newDrops);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {drops.map((drop) => (
        <motion.div
          key={drop.id}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: "100vh", opacity: [0, 1, 0] }}
          transition={{
            duration: drop.duration,
            repeat: Infinity,
            delay: drop.delay,
            ease: "linear",
          }}
          className="absolute top-0 text-[10px] font-mono font-bold text-[var(--palette-primary)]"
          style={{ left: `${drop.left}%` }}
        >
          {drop.text}
        </motion.div>
      ))}
    </div>
  );
};

export default function GlobalSplash() {
  const { isVisible } = useSplash();
  const [internalVisible, setInternalVisible] = useState(isVisible);
  const [stage, setStage] = useState<"raining" | "imploding" | "exploding" | "done">("raining");

  useEffect(() => {
    setInternalVisible(isVisible);
    if (isVisible) {
      setStage("raining"); // Reset stage on re-trigger

      const timer1 = setTimeout(() => setStage("imploding"), 2200);
      const timer2 = setTimeout(() => setStage("exploding"), 2800);
      const timer3 = setTimeout(() => {
        setStage("done");
        setInternalVisible(false);
      }, 3500);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [isVisible]);

  if (!internalVisible || stage === "done") return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
      <AnimatePresence>
        {/* BACKGROUND LAYER */}
        {stage !== "exploding" && (
          <motion.div
            key="bg"
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[rgb(var(--color-background))] z-0"
          >
            <DigitalRain />
            {/* Circular shockwave waiting to explode */}
          </motion.div>
        )}

        {/* CORE CONTENT */}
        {stage !== "exploding" && (
          <motion.div
            key="core"
            initial={{ scale: 1 }}
            animate={stage === "imploding" ? { scale: 0.1, opacity: 0, rotate: 720 } : { scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.6, ease: "backIn" }}
            className="relative z-10 flex flex-col items-center gap-8"
          >
            <div className="relative w-32 h-32">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3 - i, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border border-[var(--palette-primary)] opacity-30 border-t-transparent"
                  style={{ padding: i * 10 }}
                />
              ))}

              <div className="absolute inset-0 flex items-center justify-center">
                <Zap size={48} className="text-[var(--palette-primary)] drop-shadow-[0_0_20px_var(--palette-primary)]" />
              </div>
            </div>

            <div className="text-center">
              <h1 className="text-3xl font-black tracking-[0.2em] text-[rgb(var(--color-foreground))]">
                AKSHAT_AUSTIN
              </h1>
              <div className="flex justify-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [10, 20, 10] }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                    className="w-1 bg-[var(--palette-primary)] rounded-full"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {stage === "exploding" && (
        <motion.div
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 50, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute w-32 h-32 rounded-full bg-[var(--palette-primary)] z-50 mix-blend-screen"
        />
      )}
      <AnimatePresence>
        {stage === "exploding" && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-[var(--palette-primary)] z-[40]"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
