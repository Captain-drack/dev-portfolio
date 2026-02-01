import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Menu, X, ExternalLink, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { ThemeDropdown } from "@/app/components/ui/ThemeDropdown";
import { ColorPaletteDropdown } from "@/app/components/ui/ColorPaletteDropdown";

const menuItems = [
  { text: "About", link: "#about" },
  { text: "Experience", link: "#experience" },
  { text: "Projects", link: "#projects" },
  { text: "Skills", link: "#skills" },
  { text: "Gallery", link: "/gallery" },
  { text: "Contact", link: "#contact" },
];

// Enhanced Magnetic Component
const MagneticElement = ({ children, className }: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.25);
    y.set((e.clientY - centerY) * 0.25);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
};

const Header: React.FC = () => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const toggleDropdown = () => setDropdownVisible(!isDropdownVisible);
  const handleDropdownItemClick = () => setDropdownVisible(false);

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;
    const isInsideButton = dropdownRef.current?.contains(target);
    const isInsideMenu = mobileMenuRef.current?.contains(target);

    if (!isInsideButton && !isInsideMenu) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isDropdownVisible) {
      window.addEventListener("click", handleClickOutside);
    }
    return () => window.removeEventListener("click", handleClickOutside);
  }, [isDropdownVisible]);

  return (
    <header className="fixed top-0 z-50 w-full">
      {/* Main Header */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative py-3 md:py-4"
      >
        {/* Glassmorphism Background */}
        <div
          className="absolute inset-y-0 rounded-xl md:rounded-2xl transition-all duration-700 ease-out"
          style={{
            willChange: 'left, right, top, background, box-shadow',
            left: isScrolled ? 'max(16px, calc(50% - 640px))' : '8px',
            right: isScrolled ? 'max(16px, calc(50% - 640px))' : '8px',
            top: isScrolled ? '8px' : '0px',
            background: isScrolled
              ? 'rgb(var(--color-background) / 0.9)'
              : 'rgb(var(--color-background) / 0.5)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgb(var(--color-foreground) / 0.06)',
            boxShadow: isScrolled
              ? '0 8px 32px rgb(0 0 0 / 0.12)'
              : '0 4px 16px rgb(0 0 0 / 0.05)',
          }}
        />

        <div
          className="relative flex items-center justify-between px-4 md:px-8 mx-auto transition-all duration-700 ease-out"
          style={{
            maxWidth: isScrolled ? '1280px' : '100%',
          }}
        >

          {/* Left Section - Logo */}
          {pathname !== "/gallery" && (
            <motion.div
              className="flex items-center gap-2 md:gap-4"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Link href="/" className="group flex items-center gap-2 md:gap-3">
                {/* Animated Logo */}
                <MagneticElement className="relative">
                  <motion.div
                    className="relative w-9 h-9 md:w-11 md:h-11 rounded-xl md:rounded-2xl flex items-center justify-center overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, var(--palette-primary), var(--palette-accent2))',
                      color: 'rgb(var(--color-background))',
                    }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    {/* Animated Shine */}
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)',
                      }}
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    />
                    <span className="relative font-bold text-base md:text-lg" style={{ color: 'rgb(var(--color-background))' }}>A</span>
                  </motion.div>

                  {/* Pulse Ring - Desktop only */}
                  <motion.div
                    className="absolute inset-0 rounded-xl md:rounded-2xl hidden md:block"
                    style={{ border: '2px solid var(--palette-primary)' }}
                    animate={{
                      scale: [1, 1.3, 1.3],
                      opacity: [0.5, 0, 0],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </MagneticElement>

                {/* Name - Hidden on small mobile */}
                <div className="hidden sm:flex flex-col">
                  <span
                    className="text-sm font-bold tracking-wide"
                    style={{ color: 'rgb(var(--color-foreground))' }}
                  >
                    Akshat Austin
                  </span>
                  <span
                    className="text-[10px] font-medium tracking-widest uppercase"
                    style={{ color: 'var(--palette-primary)' }}
                  >
                    Developer
                  </span>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Center - Navigation (Desktop only) */}
          {pathname !== "/gallery" && (
            <motion.nav
              className="hidden lg:flex items-center gap-1 px-2 py-1.5 rounded-full"
              style={{
                background: 'rgb(var(--color-foreground) / 0.04)',
                border: '1px solid rgb(var(--color-foreground) / 0.06)',
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
                >
                  {/* Glow Background on Hover */}
                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <motion.div
                        layoutId="navGlow"
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: 'linear-gradient(135deg, var(--palette-primary), var(--palette-accent2))',
                          boxShadow: '0 0 20px var(--palette-primary)',
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </AnimatePresence>

                  <motion.span
                    className="relative z-10 transition-colors duration-200"
                    style={{
                      color: hoveredIndex === index
                        ? '#fff'
                        : 'rgb(var(--color-foreground) / 0.7)',
                    }}
                    animate={{
                      scale: hoveredIndex === index ? 1.05 : 1,
                    }}
                  >
                    {item.text}
                  </motion.span>
                </Link>
              ))}
            </motion.nav>
          )}

          {/* Right Section */}
          {pathname !== "/gallery" && (
            <motion.div
              className="flex items-center gap-2 md:gap-3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* Theme Controls - Desktop only */}
              <div className="hidden md:flex items-center gap-1.5 px-2 py-1 rounded-full"
                style={{
                  background: 'rgb(var(--color-foreground) / 0.04)',
                  border: '1px solid rgb(var(--color-foreground) / 0.06)',
                }}
              >
                <ThemeDropdown />
                <ColorPaletteDropdown />
              </div>

              {/* CTA Button - Hidden on small mobile */}
              <MagneticElement className="hidden sm:block">
                <motion.a
                  href="#contact"
                  className="relative flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-semibold overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, var(--palette-primary), var(--palette-accent2))',
                    color: 'rgb(var(--color-background))',
                    boxShadow: '0 4px 20px var(--palette-primary)',
                  }}
                  whileHover={{ scale: 1.05, boxShadow: '0 6px 30px var(--palette-primary)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Shine Effect */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)',
                    }}
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                  />
                  <Sparkles size={14} className="relative" />
                  <span className="relative">Let&apos;s Talk</span>
                </motion.a>
              </MagneticElement>

              {/* Mobile Menu Button */}
              <div className="flex lg:hidden" ref={dropdownRef}>
                <motion.button
                  onClick={toggleDropdown}
                  className="relative w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'rgb(var(--color-foreground) / 0.06)',
                    color: 'rgb(var(--color-foreground))',
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Menu size={20} strokeWidth={2} />
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {isDropdownVisible && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 overflow-hidden"
            style={{ background: 'rgb(var(--color-background))' }}
          >
            {/* Animated Background Orbs */}
            <motion.div
              className="absolute top-20 right-10 w-60 h-60 rounded-full blur-[80px] opacity-30"
              style={{ background: 'var(--palette-primary)' }}
              animate={{
                x: [0, 30, 0],
                y: [0, -20, 0],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-20 left-10 w-60 h-60 rounded-full blur-[80px] opacity-30"
              style={{ background: 'var(--palette-accent2)' }}
              animate={{
                x: [0, -30, 0],
                y: [0, 20, 0],
              }}
              transition={{ duration: 8, repeat: Infinity, delay: 1 }}
            />

            {/* Header Row */}
            <div className="flex items-center justify-between p-4 md:p-6">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg"
                  style={{
                    background: 'linear-gradient(135deg, var(--palette-primary), var(--palette-accent2))',
                    color: 'rgb(var(--color-background))',
                  }}
                >
                  A
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold" style={{ color: 'rgb(var(--color-foreground))' }}>
                    Akshat Austin
                  </span>
                  <span className="text-[10px] font-medium" style={{ color: 'var(--palette-primary)' }}>
                    Developer
                  </span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={() => setDropdownVisible(false)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'rgb(var(--color-foreground) / 0.06)',
                    color: 'rgb(var(--color-foreground))',
                  }}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={20} strokeWidth={2} />
                </motion.button>
              </div>
            </div>

            {/* Theme & Color Controls Row */}
            <div className="px-4 md:px-6 mb-4">
              <div
                className="flex items-center justify-center gap-3 py-3 rounded-xl"
                style={{
                  background: 'rgb(var(--color-foreground) / 0.03)',
                  border: '1px solid rgb(var(--color-foreground) / 0.06)',
                }}
              >
                <span className="text-xs font-medium uppercase tracking-wider" style={{ color: 'rgb(var(--color-foreground) / 0.5)' }}>
                  Customize
                </span>
                <div className="w-px h-4" style={{ background: 'rgb(var(--color-foreground) / 0.1)' }} />
                <ThemeDropdown />
                <ColorPaletteDropdown />
              </div>
            </div>

            {/* Menu Items */}
            <div className="flex flex-col items-start px-4 md:px-6 gap-1">
              {menuItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                  transition={{ delay: idx * 0.06, duration: 0.4 }}
                  className="w-full"
                >
                  <Link
                    onClick={handleDropdownItemClick}
                    href={item.link}
                    className="group flex items-center justify-between py-4 px-4 rounded-xl transition-all duration-300"
                    style={{
                      background: 'rgb(var(--color-foreground) / 0.02)',
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className="text-xs font-mono w-6"
                        style={{ color: 'var(--palette-primary)' }}
                      >
                        0{idx + 1}
                      </span>
                      <span
                        className="text-xl md:text-2xl font-medium"
                        style={{ color: 'rgb(var(--color-foreground))' }}
                      >
                        {item.text}
                      </span>
                    </div>
                    <ExternalLink
                      size={16}
                      className="opacity-30 group-hover:opacity-100 transition-opacity"
                      style={{ color: 'var(--palette-primary)' }}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
              <motion.a
                href="#contact"
                onClick={handleDropdownItemClick}
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl text-sm font-semibold"
                style={{
                  background: 'linear-gradient(135deg, var(--palette-primary), var(--palette-accent2))',
                  color: 'rgb(var(--color-background))',
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Sparkles size={16} />
                <span>Let&apos;s Work Together</span>
              </motion.a>
              <p
                className="text-center mt-4 text-xs"
                style={{ color: 'rgb(var(--color-foreground) / 0.3)' }}
              >
                © 2024 Akshat Austin
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header >
  );
};

export default Header;
