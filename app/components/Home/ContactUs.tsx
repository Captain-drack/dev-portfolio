"use client";
import React, { useState, useEffect, useRef, FormEvent } from "react";
import emailjs from "@emailjs/browser";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Mail,
  User,
  Phone,
  MessageSquare,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  Send,
  Globe,
  MapPin,
  Navigation,
} from "lucide-react";
import { Section, Container, Button, SectionBadge } from "@/app/components/ui";
import { TextScramble } from "@/app/components/ui/TextScramble";
import { socialLinks } from "@/app/data";
import type { ContactFormData } from "@/app/types";

const GoogleMapEmbed = () => {
  return (
    <div className="relative w-full aspect-video md:aspect-[4/3] rounded-xl overflow-hidden border border-[rgba(var(--color-foreground),0.1)] group">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55309.8452445851!2d77.86835261907402!3d29.86245037142661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390eb36e0854c939%3A0x98587281da4ce8c4!2sRoorkee%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1706646545000!5m2!1sen!2sin"
        className="absolute inset-0 w-full h-full grayscale invert opacity-60 group-hover:opacity-80 transition-opacity duration-500"
        style={{
          border: 0,
          filter: "grayscale(100%) invert(100%) contrast(0.8) brightness(1.2)",
        }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-transparent pointer-events-none" />

      {/* Location Tag */}
      <motion.div
        className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--palette-primary)]/90 text-white text-xs font-semibold shadow-lg backdrop-blur-md"
        whileHover={{ scale: 1.05 }}
      >
        <Navigation size={12} fill="currentColor" />
        <span>Base / Roorkee, Uttarakhand</span>
      </motion.div>
    </div>
  );
};

// --- HYPER-PRISM INPUT ---
// Refined Architectural Input: Floating Glass Plate with Sharp Edges
const PrismInput = ({
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  icon: Icon,
}: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;

  return (
    <div className="relative group">
      {/* Prism Edge Highlight */}
      <div
        className={`absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--palette-primary)] to-transparent transition-transform duration-500 ${isFocused ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}`}
      />

      <div
        className={`relative flex items-center gap-4 p-5 transition-all duration-300
                    ${isFocused
            ? "bg-[rgba(var(--color-foreground),0.03)]"
            : "bg-transparent hover:bg-[rgba(var(--color-foreground),0.01)]"
          }
                `}
        style={{
          borderBottom: "1px solid rgba(var(--color-foreground), 0.1)",
        }}
      >
        <div
          className={`transition-colors duration-300 ${isFocused ? "text-[var(--palette-primary)]" : "text-[rgba(var(--color-foreground),0.4)]"}`}
        >
          <Icon size={18} />
        </div>

        <div className="flex-1 relative">
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full bg-transparent text-lg outline-none placeholder-transparent relative z-10 font-light tracking-wide py-1"
            placeholder={placeholder}
            style={{ color: "rgb(var(--color-foreground))" }}
          />
          <label
            className={`absolute left-0 transition-all duration-300 pointer-events-none uppercase tracking-widest text-xs font-semibold
                            ${isFocused || hasValue ? "-top-5 text-[var(--palette-primary)]" : "top-1.5 text-[rgba(var(--color-foreground),0.5)]"}
                        `}
          >
            {placeholder}
          </label>
        </div>

        <AnimatePresence>
          {hasValue && required && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="text-[var(--palette-primary)]"
            >
              <CheckCircle2 size={16} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Vertical Marker */}
        <div
          className={`absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-0 bg-[var(--palette-primary)] transition-all duration-300 ${isFocused ? "h-1/2" : "h-0"}`}
        />
      </div>
    </div>
  );
};

const ContactUs: React.FC = () => {
  const initialFormData: ContactFormData = {
    name: "",
    contactNumber: "",
    email: "",
    message: "",
  };

  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitting(true);
    try {
      // Map form data to EmailJS template variables
      const templateParams = {
        from_name: formData.name,
        to_name: "Akshat",
        reply_to: formData.email,
        message: formData.message,
        phone: formData.contactNumber || "Not provided",
      };

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      );
      setShowSuccessMessage(true);
      setFormData(initialFormData);
      setTimeout(() => setShowSuccessMessage(false), 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      // Fallback to Mailto
      const subject = `Portfolio Contact: ${formData.name}`;
      const body = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.contactNumber}\n\nMessage:\n${formData.message}`;
      window.location.href = `mailto:${socialLinks.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      alert(
        "Automatic transmission failed. Opening your email client instead.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(springY, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-3deg", "3deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width - 0.5);
    mouseY.set((e.clientY - top) / height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  if (!isMounted) return null;

  return (
    <Section
      id="contact"
      className="relative cursor-default overflow-hidden py-24"
    >
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `linear-gradient(to top, transparent, rgb(var(--color-background) / 0.5), transparent)`,
        }}
      />

      <Container>
        <div className="relative z-10">
          <div className="mb-16">
            <SectionBadge
              number="06"
              label="CONTACT"
              icon={Globe}
              title="Global"
              titleAccent="Nexus"
              subtitle="Ready to engineer the future? Establish a connection."
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
            <div className="lg:col-span-4 flex flex-col gap-10">
              <div>
                <h3
                  className="text-3xl font-light leading-tight mb-6"
                  style={{ color: "rgb(var(--color-foreground))" }}
                >
                  <TextScramble text="Global presence," trigger="load" />{" "}
                  <span className="font-serif italic text-[var(--palette-primary)]">
                    <TextScramble text="local impact." trigger="load" />
                  </span>
                </h3>
                <p className="opacity-60 text-lg leading-relaxed">
                  Operating remotely across major tech hubs. Always reachable,
                  always online.
                </p>
              </div>

              <div className="space-y-6">
                <GoogleMapEmbed />

                <div className="flex flex-col gap-6 pt-4 border-t border-[rgba(var(--color-foreground),0.1)]">
                  <div className="group cursor-pointer">
                    <p className="text-xs uppercase tracking-widest opacity-50 mb-2">
                      Email
                    </p>
                    <a
                      href={`mailto:${socialLinks.email}`}
                      className="text-lg hover:text-[var(--palette-primary)] transition-colors inline-flex items-center gap-2"
                    >
                      {socialLinks.email}{" "}
                      <ArrowUpRight
                        size={16}
                        className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[var(--palette-primary)]"
                      />
                    </a>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest opacity-50 mb-2">
                      Availability
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <p className="text-sm font-medium">
                        Accepting New Projects
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: HYPER-PRISM FORM CARD */}
            <div className="lg:col-span-8 perspective-1000 flex items-center">
              <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                  background: `rgb(var(--color-card))`,
                  border: `1px solid rgb(var(--color-foreground) / 0.08)`,
                  boxShadow: `0 30px 60px -15px rgb(var(--color-foreground) / 0.05)`,
                }}
                className="relative w-full p-8 md:p-14 rounded-2xl overflow-hidden"
              >
                {/* Decorative Background Pattern inside Card */}
                <div
                  className="absolute inset-0 opacity-[0.03] pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgb(var(--color-foreground)) 1px, transparent 0)`,
                    backgroundSize: "32px 32px",
                  }}
                />

                {showSuccessMessage ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative text-center py-16 overflow-hidden"
                  >
                    {/* Animated Background Particles */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      {[...Array(20)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 rounded-full"
                          style={{
                            background: i % 2 === 0 ? 'var(--palette-primary)' : 'var(--palette-accent2)',
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                          }}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1.5, 0],
                            y: [0, -100],
                          }}
                          transition={{
                            duration: 2,
                            delay: i * 0.1,
                            repeat: Infinity,
                            repeatDelay: 1,
                          }}
                        />
                      ))}
                    </div>

                    {/* Success Icon with Ripple Effect */}
                    <div className="relative mx-auto w-32 h-32 mb-10">
                      {/* Outer Ripple Rings */}
                      {[1, 2, 3].map((ring) => (
                        <motion.div
                          key={ring}
                          className="absolute inset-0 rounded-full border-2"
                          style={{ borderColor: 'var(--palette-primary)' }}
                          initial={{ opacity: 0.6, scale: 1 }}
                          animate={{
                            opacity: 0,
                            scale: 2,
                          }}
                          transition={{
                            duration: 2,
                            delay: ring * 0.4,
                            repeat: Infinity,
                            ease: "easeOut",
                          }}
                        />
                      ))}

                      {/* Main Icon Container */}
                      <motion.div
                        className="absolute inset-0 rounded-full flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, var(--palette-primary), var(--palette-accent2))',
                          boxShadow: '0 20px 60px -15px var(--palette-primary)',
                        }}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 15,
                          delay: 0.2,
                        }}
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
                        >
                          <CheckCircle2 size={56} className="text-white" strokeWidth={2.5} />
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Success Text with Stagger */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    >
                      <h3
                        className="text-5xl font-bold mb-4 bg-clip-text text-transparent"
                        style={{
                          backgroundImage: 'linear-gradient(135deg, var(--palette-primary), var(--palette-accent2))',
                        }}
                      >
                        Message Sent!
                      </h3>
                    </motion.div>

                    <motion.p
                      className="text-lg mb-3"
                      style={{ color: 'rgb(var(--color-foreground) / 0.7)' }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                    >
                      Your message has been transmitted successfully.
                    </motion.p>

                    <motion.p
                      className="text-sm opacity-50 mb-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.5 }}
                      transition={{ delay: 1 }}
                    >
                      I&apos;ll get back to you within 24 hours ⚡
                    </motion.p>

                    {/* Animated Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2, duration: 0.5 }}
                    >
                      <Button
                        onClick={() => setShowSuccessMessage(false)}
                        variant="outline"
                        className="group relative overflow-hidden px-8 py-3"
                      >
                        <motion.span
                          className="absolute inset-0 bg-gradient-to-r from-[var(--palette-primary)] to-[var(--palette-accent2)] opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                        />
                        <span className="relative flex items-center gap-2">
                          <Sparkles size={16} />
                          Send Another Message
                        </span>
                      </Button>
                    </motion.div>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-0 relative z-10"
                  >
                    <div className="mb-10 flex items-center justify-between">
                      <h4 className="text-xs font-mono uppercase tracking-[0.2em] opacity-40">
                        Identification Protocol
                      </h4>
                      <div className="h-px w-32 bg-[rgba(var(--color-foreground),0.1)]" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                      <PrismInput
                        name="name"
                        icon={User}
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                      <PrismInput
                        name="email"
                        type="email"
                        icon={Mail}
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="py-2"></div>

                    <div className="mb-6 mt-8 flex items-center justify-between">
                      <h4 className="text-xs font-mono uppercase tracking-[0.2em] opacity-40">
                        Message Payload
                      </h4>
                      <div className="h-px w-32 bg-[rgba(var(--color-foreground),0.1)]" />
                    </div>

                    <PrismInput
                      name="contactNumber"
                      type="tel"
                      icon={Phone}
                      placeholder="Phone Number (Optional)"
                      value={formData.contactNumber || ""}
                      onChange={handleChange}
                    />

                    {/* Prism Textarea */}
                    <div className="relative group">
                      <div
                        className={`relative flex gap-4 p-5 transition-all duration-300
                                                ${formData.message ? "bg-[rgba(var(--color-foreground),0.03)]" : "bg-transparent"}
                                            `}
                      >
                        {/* Edge Highlight */}
                        <div
                          className={`absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--palette-primary)] to-transparent transition-transform duration-500 ${formData.message ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}`}
                        />
                        {/* Vertical Marker */}
                        <div
                          className={`absolute left-0 top-6 w-[2px] h-0 bg-[var(--palette-primary)] transition-all duration-300 ${formData.message || "group-focus-within:h-8"}`}
                        />

                        <div
                          className={`transition-colors duration-300 h-fit pt-1 ${formData.message ? "text-[var(--palette-primary)]" : "text-[rgba(var(--color-foreground),0.4)]"}`}
                        >
                          <MessageSquare size={18} />
                        </div>
                        <div className="flex-1 relative">
                          <textarea
                            name="message"
                            rows={5}
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="w-full bg-transparent text-lg resize-none outline-none placeholder-transparent relative z-10 font-light tracking-wide py-1"
                            placeholder="Your Message"
                            style={{ color: "rgb(var(--color-foreground))" }}
                          />
                          <label
                            className={`absolute left-0 transition-all duration-300 pointer-events-none uppercase tracking-widest text-xs font-semibold
                                                    ${formData.message ? "-top-5 text-[var(--palette-primary)]" : "top-1.5 text-[rgba(var(--color-foreground),0.5)]"}
                                                `}
                          >
                            Your Message
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-8">
                      <Button
                        type="submit"
                        size="lg"
                        isLoading={isSubmitting}
                        className="min-w-[200px]"
                      >
                        <span className="flex items-center gap-3">
                          Transmit <Send size={16} />
                        </span>
                      </Button>
                    </div>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default ContactUs;
