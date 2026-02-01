"use client";
import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";

interface SplashContextType {
  isVisible: boolean;
  triggerSplash: () => void;
}

const SplashContext = createContext<SplashContextType | undefined>(undefined);

export function SplashProvider({ children }: { children: ReactNode }) {
  const [isVisible, setIsVisible] = useState(true);
  const [key, setKey] = useState(0); // Used to force re-render of Splash

  const triggerSplash = useCallback(() => {
    setIsVisible(false); // Reset first
    setTimeout(() => {
      setKey(prev => prev + 1); // Force new instance
      setIsVisible(true);
    }, 10);
  }, []);

  // Auto-hide is handled by the GlobalSplash component itself, 
  // but the context exposes the state if needed.

  return (
    <SplashContext.Provider value={{ isVisible, triggerSplash }}>
      {children}
    </SplashContext.Provider>
  );
}

export function useSplash() {
  const context = useContext(SplashContext);
  if (context === undefined) {
    throw new Error("useSplash must be used within SplashProvider");
  }
  return context;
}
