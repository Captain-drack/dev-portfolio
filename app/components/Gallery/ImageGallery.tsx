/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef, useEffect, MouseEvent, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useSpring,
  useMotionValue,
} from "framer-motion";
import {
  Zap, Search, ArrowRight, ArrowLeft, Play, Pause, Grid, Layout, Home, LayoutGrid, ChevronLeft, ChevronRight
} from "lucide-react";
import { TextScramble } from "../ui/TextScramble";

export interface ImageProps {
  src: string;
  alt: string;
}

interface ImageGalleryProps {
  images: ImageProps[];
}

// === SOUND ENGINE (SILENCED) ===
const useSound = () => {
  return {
    playHover: () => { },
    playClick: () => { },
    playSwoosh: () => { },
  };
};

// === MAGNETIC BUTTON ===
const MagneticButton = ({ children, onClick, className = "", onHover }: { children: React.ReactNode, onClick?: () => void, className?: string, onHover?: () => void }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const center = { x: left + width / 2, y: top + height / 2 };
    const distance = { x: clientX - center.x, y: clientY - center.y };
    x.set(distance.x * 0.3);
    y.set(distance.y * 0.3);
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.button>
  );
};

// === CHROMATIC ABERRATION TEXT ===
const GlitchText = ({ text, isActive }: { text: string, isActive: boolean }) => {
  return (
    <div className="relative inline-block font-black tracking-tighter">
      <span className="relative z-10">{text}</span>
      {isActive && (
        <>
          <motion.span
            animate={{ x: [-2, 2, -1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ repeat: Infinity, duration: 0.2 }}
            className="absolute top-0 left-0 -z-10 text-[var(--palette-primary)] opacity-70 mix-blend-screen"
          >
            {text}
          </motion.span>
          <motion.span
            animate={{ x: [2, -2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ repeat: Infinity, duration: 0.3 }}
            className="absolute top-0 left-0 -z-10 text-cyan-500 opacity-70 mix-blend-screen"
          >
            {text}
          </motion.span>
        </>
      )}
    </div>
  );
};

const generateMockData = (index: number) => {
  const locations = ["Kyoto", "Reykjavik", "NYC", "Paris", "Cape Town", "Tokyo"];
  const tags = ["Urban", "Nature", "Abstract", "Portrait", "Architecture", "Minimal"];

  return {
    id: index,
    title: `Vision ${index + 1}`,
    location: locations[index % locations.length],
    category: tags[index % tags.length],
    iso: 100 * (2 ** (index % 3)),
    shutter: `1/${100 + (index % 5) * 100}`,
  };
};

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"spotlight" | "grid">("spotlight");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoupeActive, setIsLoupeActive] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const sound = useSound();

  const activeItem = { ...images[selectedIndex], data: generateMockData(selectedIndex) };

  // Auto-Cruise Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && viewMode === "spotlight") {
      interval = setInterval(() => {
        setSelectedIndex(prev => (prev + 1) % images.length);
        sound.playSwoosh();
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, viewMode, images.length, sound]);

  useEffect(() => {
    if (viewMode === "spotlight" && thumbsRef.current) {
      const thumb = thumbsRef.current.children[selectedIndex] as HTMLElement;
      if (thumb) thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [selectedIndex, viewMode]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== "spotlight") return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(images.length - 1, prev + 1));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(0, prev - 1));
      } else if (e.key === " ") {
        e.preventDefault();
        setIsPlaying(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [viewMode, images.length]);

  const handleMouseMove = (e: MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleNav = (dir: "next" | "prev") => {
    sound.playClick();
    if (dir === "next") setSelectedIndex(prev => Math.min(images.length - 1, prev + 1));
    else setSelectedIndex(prev => Math.max(0, prev - 1));
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen overflow-hidden bg-[rgb(var(--color-background))] text-[rgb(var(--color-foreground))] transition-colors duration-500"
      style={{ cursor: isLoupeActive && viewMode === "spotlight" ? 'none' : 'default' }}
    >

      {/* 1. TOP BAR */}
      <div className="absolute top-0 left-0 w-full z-40 p-8 flex justify-between items-center pointer-events-none">
        {/* LEFT: Branding + Home */}
        <div className="flex items-center gap-6 pointer-events-auto">
          <Link href="/">
            <MagneticButton className="p-3 rounded-full bg-[rgb(var(--color-foreground))/0.05] border border-[rgb(var(--color-border))/0.2] hover:bg-[var(--palette-primary)] hover:text-[rgb(var(--color-background))] transition-colors">
              <Home size={20} />
            </MagneticButton>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[var(--palette-primary)] text-white shadow-lg animate-pulse">
              <Zap size={18} />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold tracking-tight">GALLERY_OS <span className="text-[var(--palette-primary)]">V14</span></h1>
              <p className="text-[10px] font-mono opacity-50 uppercase tracking-widest">System Online</p>
            </div>
          </div>
        </div>

        {/* RIGHT: Controls */}
        <div className="flex gap-4 pointer-events-auto">
          <MagneticButton
            onClick={() => setViewMode(viewMode === "spotlight" ? "grid" : "spotlight")}
            onHover={sound.playHover}
            className={`p-3 rounded-full border border-[rgb(var(--color-border))/0.2] transition-colors backdrop-blur-md ${viewMode === "grid" ? 'bg-[var(--palette-primary)] text-white' : 'hover:bg-[rgb(var(--color-foreground))/0.1]'}`}
          >
            {viewMode === "spotlight" ? <LayoutGrid size={20} /> : <Layout size={20} />}
          </MagneticButton>

          {/* Removed Play/Pause and Search buttons per user request */}
        </div>
      </div>

      {/* 2. MAIN STAGE */}
      <AnimatePresence mode="wait">

        {/* === SPOTLIGHT MODE === */}
        {viewMode === "spotlight" && (
          <motion.div
            key="spotlight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full flex flex-col items-center justify-center relative z-10"
          >
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative w-full max-w-5xl mx-auto h-[55vh] flex items-center justify-center pb-8 z-20"
            >
              {/* Main Image (High Visibility - No Glitch Layers) */}
              <div className="relative w-full h-full z-30 drop-shadow-2xl">
                <Image
                  src={activeItem.src}
                  alt={activeItem.alt}
                  fill
                  className="object-contain" // Ensures image is fully visible without crop
                  priority
                  sizes="(max-width: 1200px) 100vw, 85vw"
                  quality={75} // Balanced quality for performance (approx 80% size reduction vs 100)
                />
              </div>
            </motion.div>

            {/* LOUPE */}
            {isLoupeActive && (
              <motion.div
                className="absolute w-64 h-64 rounded-full border-2 border-[var(--palette-primary)] overflow-hidden z-50 pointer-events-none shadow-2xl bg-[rgb(var(--color-background))]"
                style={{ top: mousePos.y - 128, left: mousePos.x - 128 }}
              >
                <div className="absolute w-[160vw] h-[120vh] max-w-none"
                  style={{
                    top: -(mousePos.y * 2) + 128 + (window.innerHeight * 0.6),
                    left: -(mousePos.x * 2) + 128 + (window.innerWidth * 0.4)
                  }}>
                  <Image
                    src={activeItem.src}
                    alt=""
                    fill
                    className="object-contain"
                    quality={100}
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-[var(--palette-primary)] font-mono text-xs mix-blend-difference">+ ZOOM 200%</div>
              </motion.div>
            )}

            {/* INFO */}
            <div className="absolute bottom-48 left-12 z-30 pointer-events-none">
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-4 text-[rgb(var(--color-foreground))] opacity-90">
                <GlitchText text={activeItem.data.title} isActive={true} />
              </h2>
              <div className="flex gap-8 text-sm font-mono uppercase tracking-widest text-[rgb(var(--color-foreground))] opacity-60">
                <span className="text-[var(--palette-primary)]">ID // {activeItem.data.id < 9 ? `0${activeItem.data.id + 1}` : activeItem.data.id + 1}</span>
                <span>{activeItem.data.location}</span>
                <span>{activeItem.data.category}</span>
              </div>
            </div>

            {/* THUMBNAIL FILMSTRIP - Premium UI */}
            <div className="absolute bottom-0 left-0 w-full z-30">
              {/* Glassmorphism Container with Animated Border */}
              <div
                className="relative mx-4 mb-4 rounded-2xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgb(var(--color-background) / 0.8), rgb(var(--color-background) / 0.6))',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                }}
              >

                {/* Inner Content Container */}
                <div className="relative rounded-2xl p-4" style={{ background: 'rgb(var(--color-background) / 0.9)' }}>

                  {/* Center: Enhanced Progress Bar */}
                  <div className="flex items-center justify-center gap-4 py-2">
                    <motion.span
                      key={selectedIndex}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-2xl font-black tracking-tighter"
                      style={{ color: 'var(--palette-primary)' }}
                    >
                      {String(selectedIndex + 1).padStart(2, '0')}
                    </motion.span>
                    <div className="relative w-40 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgb(var(--color-foreground) / 0.1)' }}>
                      <motion.div
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{
                          background: 'linear-gradient(90deg, var(--palette-primary), var(--palette-accent2))',
                          boxShadow: '0 0 12px var(--palette-primary)'
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${((selectedIndex + 1) / images.length) * 100}%` }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                      />
                      {/* Glowing Dot */}
                      <motion.div
                        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
                        style={{
                          background: 'var(--palette-primary)',
                          boxShadow: '0 0 8px var(--palette-primary), 0 0 16px var(--palette-primary)'
                        }}
                        animate={{ left: `calc(${((selectedIndex + 1) / images.length) * 100}% - 6px)` }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                      />
                    </div>
                    <span className="text-sm font-mono opacity-30">{String(images.length).padStart(2, '0')}</span>
                  </div>

                  {/* Thumbnails Section */}
                  <div className="relative flex items-center">
                    {/* Left Fade Gradient */}
                    <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[rgb(var(--color-background))] to-transparent z-10 pointer-events-none rounded-l-xl" />

                    {/* Left Arrow - Premium Design */}
                    <motion.button
                      onClick={() => handleNav("prev")}
                      disabled={selectedIndex === 0}
                      className="absolute left-2 z-20 w-10 h-10 rounded-xl flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed"
                      style={{
                        background: 'linear-gradient(135deg, rgb(var(--color-foreground) / 0.1), rgb(var(--color-foreground) / 0.05))',
                        border: '1px solid rgb(var(--color-foreground) / 0.1)',
                        boxShadow: '0 4px 12px rgb(var(--color-foreground) / 0.1)',
                      }}
                      whileHover={{ scale: 1.1, background: 'linear-gradient(135deg, var(--palette-primary), var(--palette-accent2))' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ChevronLeft size={20} />
                    </motion.button>

                    {/* Thumbnails Strip */}
                    <div ref={thumbsRef} className="flex gap-3 items-end justify-center w-full px-14 py-2">
                      {(() => {
                        const windowSize = 7;
                        const half = Math.floor(windowSize / 2);
                        let start = selectedIndex - half;
                        if (start < 0) start = 0;
                        if (start + windowSize > images.length) start = Math.max(0, images.length - windowSize);
                        const end = Math.min(images.length, start + windowSize);
                        const visibleRange = images.slice(start, end).map((img, i) => ({ ...img, originalIndex: start + i }));

                        return visibleRange.map((item) => {
                          const isActive = selectedIndex === item.originalIndex;
                          const distance = Math.abs(selectedIndex - item.originalIndex);
                          return (
                            <div key={item.originalIndex} className="flex flex-col items-center gap-1">
                              <motion.button
                                onClick={() => setSelectedIndex(item.originalIndex)}
                                onMouseEnter={sound.playHover}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{
                                  opacity: isActive ? 1 : 0.6 - distance * 0.1,
                                  scale: isActive ? 1 : 1 - distance * 0.03,
                                  y: isActive ? -12 : 0,
                                  rotateY: isActive ? 0 : (item.originalIndex < selectedIndex ? 15 : -15)
                                }}
                                whileHover={{ opacity: 1, scale: isActive ? 1.2 : 1.08, y: isActive ? -12 : -6 }}
                                transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
                                className="relative flex-shrink-0 w-28 aspect-video rounded-xl overflow-hidden group"
                                style={{
                                  transformStyle: 'preserve-3d',
                                  perspective: '1000px',
                                  boxShadow: isActive
                                    ? '0 5px 20px var(--palette-primary), 0 0 0 2px var(--palette-primary), inset 0 0 2px var(--palette-primary)'
                                    : '0 4px 16px rgba(0,0,0,0.4)',
                                  filter: isActive ? 'none' : `grayscale(${40 + distance * 15}%)`,
                                }}
                              >
                                {/* Pulsing Glow for Active */}
                                {isActive && (
                                  <motion.div
                                    className="absolute inset-0 rounded-xl pointer-events-none z-20"
                                    style={{
                                      border: '1px solid var(--palette-primary)',
                                      boxShadow: '0 0 20px var(--palette-primary)'
                                    }}
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                  />
                                )}

                                <Image
                                  src={item.src}
                                  alt={`Thumbnail ${item.originalIndex + 1}`}
                                  width={200}
                                  height={150}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                  quality={60}
                                  loading="lazy"
                                />

                                {/* Gradient Overlay */}
                                <div
                                  className="absolute inset-0 opacity-60 group-hover:opacity-40 transition-opacity"
                                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}
                                />

                                {/* Image Number Badge - Enhanced */}
                                <motion.div
                                  className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold flex items-center gap-1"
                                  style={{
                                    background: isActive
                                      ? 'linear-gradient(135deg, var(--palette-primary), var(--palette-accent2))'
                                      : 'rgba(0,0,0,0.7)',
                                    color: '#fff',
                                    backdropFilter: 'blur(4px)',
                                  }}
                                  animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                                  transition={{ duration: 1, repeat: Infinity }}
                                >
                                  <span className="opacity-50">#</span>
                                  {String(item.originalIndex + 1).padStart(2, '0')}
                                </motion.div>

                                {/* Hover Shine Effect */}
                                <motion.div
                                  className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                                  style={{
                                    background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%)',
                                  }}
                                  initial={{ x: '-100%' }}
                                  whileHover={{ x: '100%' }}
                                  transition={{ duration: 0.6 }}
                                />
                              </motion.button>

                              {/* Reflection Effect */}
                              <div
                                className="w-24 h-4 rounded-b-xl overflow-hidden opacity-30 blur-[1px]"
                                style={{
                                  transform: 'scaleY(-0.3) translateY(-100%)',
                                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)',
                                  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)',
                                }}
                              >
                                <Image
                                  src={item.src}
                                  alt=""
                                  width={100}
                                  height={50}
                                  className="w-full h-full object-cover"
                                  quality={50}
                                />
                              </div>
                            </div>
                          );
                        });
                      })()}
                    </div>

                    {/* Right Arrow - Premium Design */}
                    <motion.button
                      onClick={() => handleNav("next")}
                      disabled={selectedIndex === images.length - 1}
                      className="absolute right-2 z-20 w-10 h-10 rounded-xl flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed"
                      style={{
                        background: 'linear-gradient(135deg, rgb(var(--color-foreground) / 0.1), rgb(var(--color-foreground) / 0.05))',
                        border: '1px solid rgb(var(--color-foreground) / 0.1)',
                        boxShadow: '0 4px 12px rgb(var(--color-foreground) / 0.1)',
                      }}
                      whileHover={{ scale: 1.1, background: 'linear-gradient(135deg, var(--palette-primary), var(--palette-accent2))' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ChevronRight size={20} />
                    </motion.button>

                    {/* Right Fade Gradient */}
                    <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[rgb(var(--color-background))] to-transparent z-10 pointer-events-none rounded-r-xl" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* === GRID MODE === */}
        {viewMode === "grid" && (
          <motion.div
            key="grid"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full h-full z-20 overflow-y-auto no-scrollbar pt-32 px-8 pb-12"
          >
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 max-w-7xl mx-auto">
              {images.map((img, i) => (
                <motion.div
                  key={i}
                  layoutId={`img-${i}`}
                  onClick={() => { setSelectedIndex(i); setViewMode("spotlight"); sound.playClick(); }}
                  onMouseEnter={sound.playHover}
                  className="relative group cursor-pointer break-inside-avoid mb-8"
                >
                  <div className="relative overflow-hidden rounded-xl border border-[rgb(var(--color-border))/0.1] group-hover:border-[var(--palette-primary)] transition-all duration-300">
                    <Image
                      src={img.src}
                      alt={`Art ${i + 1}`}
                      width={800}
                      height={600}
                      className="w-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={60}
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAQMDBAMBAAAAAAAAAAAAAQIDBAAFEQYSITEHE0FR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEEQA/8QAFgABAQEAAAAAAAAAAAAAAAAAAAcI/8QAIhAAAgEDAwUBAAAAAAAAAAAAAQIDAAQFESExBhITQVFh/9oADAMBAAIRAxEAPwC1xSWJp5kmZt7sxLMT8ySSf0nmsVe46bfcZJkhZleRizMeSSdyf2vVKUIVKO5P/9k="
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--color-background))] to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                      <span className="text-[var(--palette-primary)] font-mono text-xs mb-1">ID // {i < 9 ? `0${i + 1}` : i + 1}</span>
                      <span className="text-xl font-bold text-[rgb(var(--color-foreground))]">VISION_{i + 1}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* BACKGROUND NOISE */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none mix-blend-overlay" />

    </div>
  );
};

export default ImageGallery;
