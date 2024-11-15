"use client";
import Link from "next/link";
import React from "react";

interface ExperienceData {
  companyName: string;
  companyLink: string;
  logoSrc: string;
  position: string;
  startDate: string;
  endDate: string;
  location: string;
  responsibilities: string[];
  alignment: "left" | "right";
}

const experiences: ExperienceData[] = [
  {
    companyName: "Prototion",
    companyLink: "https://www.prototion.com/",
    logoSrc: "/logos/logo-dark.svg",
    position: "Front-end Developer",
    startDate: "August 2023",
    endDate: "Present",
    location: "Remote",
    responsibilities: [
      "- Led front-end development using React and Next.js, creating responsive web applications that enhanced user engagement by approximately 25%.",
      "- Collaborated with backend developers and designers, reducing integration issues by 15%.",
      "- Participated in code reviews and Jira workflows, contributing to a 20% improvement in code quality.",
      "- Utilized Zustand for state management to simplify and optimize application state handling.",
    ],
    alignment: "left",
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
      "- Contributed to the redesign of main products using React and Redux, enhancing user interface and experience, leading to a 35% increase in customer satisfaction.",
      "- Developed and maintained websites with React and Next.js, consistently meeting deadlines and improving project delivery time by 20%.",
      "- Cooperated with cross-functional teams to enhance platform usability, resulting in a 25% increase in accessibility compliance.",
      "- Executed responsive design principles, boosting mobile user engagement by 30%.",
    ],
    alignment: "right",
  },
  {
    companyName: "Skynox Tech",
    companyLink: "https://skynox.tech/",
    logoSrc: "/logos/skynox.png",
    position: "Front-end Developer",
    startDate: "January 2020",
    endDate: "March 2022",
    location: "Mohali, India",
    responsibilities: [
      "- Developed a progressive web app with React.js, increasing mobile traffic by 35% by enhancing user experience.",
      "- Incorporated RESTful APIs, improving functionality and increasing user interaction by 40%.",
      "- Improved development processes by introducing code reviews and automated testing reduced bugs by 20%.",
      "- Worked together with the team to streamline workflows, improving team productivity by 25%.",
      "- Implemented cross-browser compatibility fixes, ensuring consistent performance and reducing compatibility issues by 30%.",
    ],
    alignment: "left",
  },
];

interface ExperienceItemProps {
  experience: ExperienceData;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ experience }) => {
  const {
    companyName,
    companyLink,
    logoSrc,
    position,
    startDate,
    endDate,
    location,
    responsibilities,
  } = experience;

  return (
    <div className="flex justify-center my-20">
      <div className="flex flex-col justify-center items-start md:flex-row w-full md:w-2/3">
        <img
          className="rounded-full w-32 h-32 mx-auto md:mx-10 mb-5 md:mb-0"
          src={logoSrc}
          alt={companyName}
        />
        <div className="flex flex-col items-start">
          <Link
            href={companyLink}
            className="text-sm md:text-2xl mb-2 text-white tracking-[5px] uppercase"
          >
            {companyName}
          </Link>
          <p className="text-xs md:text-lg mb-2 text-slate-400 uppercase tracking-[5px]">
            {position}
          </p>
          <p className="text-xs md:text-lg mb-2 text-slate-400 uppercase tracking-[5px]">
            <span className="text-white">{startDate}</span> -{" "}
            <span className="text-white">{endDate}</span>
          </p>
          <p className="text-xs md:text-lg mb-2 text-slate-400 uppercase tracking-[5px]">
            {location}
          </p>
          {responsibilities.map((item, index) => (
            <p key={index} className="text-sm mb-3 text-white leading-5">
              {item}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

interface ExperienceTimelineItemProps {
  experience: ExperienceData;
}

const ExperienceTimelineItem: React.FC<ExperienceTimelineItemProps> = ({
  experience,
}) => {
  const {
    companyName,
    companyLink,
    logoSrc,
    position,
    startDate,
    endDate,
    location,
    responsibilities,
    alignment,
  } = experience;

  const isLeft = alignment === "left";

  return (
    <div
      className={`mb-8 flex justify-between items-center w-full ${
        isLeft ? "flex-row-reverse left-timeline" : "right-timeline"
      }`}
    >
      <div className="order-1 w-5/12"></div>
      <div className="z-20 flex items-center order-1 bg-white shadow-xl w-8 h-8 rounded-full">
        <img
          className="rounded-full w-5 h-5 mx-auto"
          src={logoSrc}
          alt={companyName}
        />
      </div>
      <div className="order-1 rounded-lg shadow-xl w-5/12 px-6 py-4">
        <div className="flex flex-col items-start">
          <Link
            href={companyLink}
            className="text-sm md:text-2xl mb-2 text-white tracking-[5px] uppercase"
          >
            {companyName}
          </Link>
          <p className="text-xs md:text-lg mb-2 text-slate-400 uppercase tracking-[5px]">
            {position}
          </p>
          <p className="text-xs md:text-lg mb-2 text-slate-400 uppercase tracking-[5px]">
            <span className="text-white">{startDate}</span> -{" "}
            <span className="text-white">{endDate}</span>
          </p>
          <p className="text-xs md:text-lg mb-2 text-slate-400 uppercase tracking-[5px]">
            {location}
          </p>
          {responsibilities.map((item, index) => (
            <p key={index} className="text-sm mb-3 text-white leading-5">
              {item}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

const Experience: React.FC = () => {
  return (
    <div className="py-8" id="experience">
      <h3 className="tracking-[15px] text-center my-10 uppercase text-slate-400 text-xl md:text-3xl">
        Experience
      </h3>
      <div className="block md:hidden">
        {experiences.map((experience, index) => (
          <ExperienceItem key={index} experience={experience} />
        ))}
      </div>
      <div className="hidden md:block container mx-auto w-full h-full">
        <div className="relative wrap overflow-hidden p-10 h-full">
          <div
            className="border-2-2 absolute border-opacity-20 border-gray-400 h-full border"
            style={{ left: "50%" }}
          ></div>
          {experiences.map((experience, index) => (
            <ExperienceTimelineItem key={index} experience={experience} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
