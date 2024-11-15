"use client";
import React from "react";
import Lottie from "lottie-react";
import AnimationData from "../../assets/logo.json";

// Define the skills data as a constant object
const skillsData = [
  {
    name: "React.js",
    imageSrc: "/icons/react.png",
    percentage: 85,
  },
  {
    name: "Next.js",
    imageSrc: "/icons/Next.png",
    percentage: 80,
  },
  {
    name: "React Native",
    imageSrc: "/icons/react.png",
    percentage: 70,
  },
  {
    name: "Typescript",
    imageSrc: "/icons/typescript.png",
    percentage: 60,
  },
  {
    name: "Redux",
    imageSrc: "/icons/redux.png",
    percentage: 50,
  },
  {
    name: "HTML5",
    imageSrc: "/icons/html.png",
    percentage: 80,
  },
  {
    name: "CSS3",
    imageSrc: "/icons/css.png",
    percentage: 85,
  },
  {
    name: "Material UI",
    imageSrc: "/icons/mui.png",
    percentage: 80,
  },
  {
    name: "Tailwind CSS",
    imageSrc: "/icons/tailwind.png",
    percentage: 70,
  },
  {
    name: "Git and Github",
    imageSrc: "/icons/github.png",
    percentage: 75,
  },
  {
    name: "Ant Design",
    imageSrc: "/icons/antd.png",
    percentage: 70,
  },
  {
    name: "Figma",
    imageSrc: "/icons/figma.png",
    percentage: 65,
  },
  {
    name: "Adobe Premier Pro",
    imageSrc: "/icons/Adobe.png",
    percentage: 70,
  },
];

interface SkillItemProps {
  name: string;
  imageSrc: string;
  percentage: number;
}

function SkillItem({ name, imageSrc, percentage }: SkillItemProps) {
  return (
    <div className="flex w-full">
      <img className="w-10 h-10 mr-5 mt-1" src={imageSrc} alt={name} />
      <div className="w-full">
        <h1 className="text-sm md:text-md font-semibold text-white mb-2">
          {name}
        </h1>
        <div className="w-full bg-slate-400 h-2 mb-6 rounded-full">
          <div
            className="bg-indigo-600 h-2 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function Skills() {
  return (
    <div id="skills" className="">
      <h3 className="tracking-[15px] text-center my-10 uppercase text-slate-400 text-xl md:text-3xl">
        Skills
      </h3>
      <div className="mx-auto mb-10">
        <div className="flex flex-col-reverse justify-between items-start md:flex-row md:space-x-8">
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
            {skillsData.map((skill, index) => (
              <SkillItem key={index} {...skill} />
            ))}
          </div>
          <div className="md:w-1/2 mb-10 md:mb-0">
            <Lottie animationData={AnimationData} loop={true} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Skills;