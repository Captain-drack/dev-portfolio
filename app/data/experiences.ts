import type { ExperienceData } from "@/app/types";

export const experiencesData: ExperienceData[] = [
  {
    companyName: "Prototion",
    companyLink: "https://www.prototion.com/",
    logoSrc: "/logos/logo-dark.svg",
    position: "Full Stack Developer",
    startDate: "August 2023",
    endDate: "Present",
    location: "Remote",
    responsibilities: [
      "Architected full-stack applications using Next.js (Frontend) and Nest.js (Backend), driving consistent user engagement growth.",
      "Developed modular backend services with Nest.js, ensuring strict type safety with TypeScript to minimize runtime exceptions.",
      "Engineered performant global state management using Zustand, significantly streamlining application maintenance.",
      "Collaborated with design and product teams to integrate complex REST APIs, ensuring seamless data flow between client and server.",
    ],
  },
  {
    companyName: "Shopyvilla Developers",
    companyLink: "https://shopyvilladevelopers.com/",
    logoSrc: "/logos/shopyvilla.png",
    position: "Front-end Developer",
    startDate: "April 2022",
    endDate: "July 2023",
    location: "Mohali, India",
    responsibilities: [
      "Revamped core product architecture using React and Redux, optimizing data flow and enhancing overall customer satisfaction.",
      "Accelerated project release cycles by adopting Next.js for rapid full-stack deployment and Server-Side Rendering (SSR).",
      "Enhanced platform accessibility (WCAG compliance), ensuring broad market reach and inclusive user access.",
    ],
  },
  {
    companyName: "Skynox Tech",
    companyLink: "https://skynox.tech/",
    logoSrc: "/logos/skynox.png",
    position: "Frontend Developer",
    startDate: "May 2020",
    endDate: "March 2022",
    location: "Mohali, India",
    responsibilities: [
      "Built a high-performance Progressive Web App (PWA) using React, successfully expanding mobile user retention.",
      "Integrated and optimized RESTful APIs, significantly reducing data synchronization latency for end-users.",
      "Established coding standards by introducing rigorous code reviews and automated testing, ensuring high production code stability.",
    ],
  },
];
