import {
  Facebook,
  Instagram,
  Linkedin,
  MessageSquare,
  Github,
} from "lucide-react";

export const heroData = {
  sectionLabel: "Based in India • Open for Work",
  name: "Akshat Austin",
  role: "Full Stack Developer",
  headline: {
    prefix: "FULLSTACK",
    highlight: "DEVELOPER",
    suffix: "",
  },
  description:
    "Results-oriented Full Stack Developer with 5+ years of experience engineering scalable web applications. Expert in Next.js and Nest.js, specializing in robust backend architecture and high-performance frontend solutions.",
  cta: {
    primary: {
      text: "View Resume",
      link: "/Akshat Austin Full Stack Developer Resume.pdf",
    },
    secondary: {
      text: "Contact Me",
      link: "#contact",
    },
  },
  socialLinks: [
    {
      text: "LinkedIn",
      link: "https://www.linkedin.com/in/akshat-austin/",
      icon: Linkedin,
    },
    { text: "GitHub", link: "https://github.com/Captain-drack", icon: Github },
    {
      text: "Instagram",
      link: "https://www.instagram.com/captain_drack/",
      icon: Instagram,
    },
    {
      text: "Facebook",
      link: "https://www.facebook.com/akshataustin",
      icon: Facebook,
    },
    {
      text: "Whatsapp",
      link: "https://wa.me/+919870774547",
      icon: MessageSquare,
    },
  ],
};
