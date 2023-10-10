"use client";
import React, { useState } from "react";
import Link from "next/link";

interface Project {
  title: string;
  image: string;
  description: string;
  githubUrl: string;
  projectUrl: string;
  technologies: string[];
}

const projectData: Project[] = [
  {
    title: "GPT-3",
    image: "/images/gpt3.jpeg",
    description:
      "I have created a straightforward yet impactful landing page using React.js and CSS. The primary goal of this landing page is to capture the attention of visitors and encourage them to take a specific action, learning more about a product, or exploring our services.",
    githubUrl: "https://github.com/Captain-drack/gpt-3",
    projectUrl: "https://gpt3-awesome.netlify.app/",
    technologies: ["React.js", "CSS"],
  },
  {
    title: "Cryptoverse",
    image: "/images/crypto.png",
    description:
      "Stay ahead in the world of cryptocurrencies with our comprehensive Cryptocurrency App. Access real-time data on cryptocurrency prices, trends, and market capitalization. Stay informed with the latest news and updates from the cryptocurrency space, all in one place. Whether you're an investor or a crypto enthusiast, our app is your essential tool for tracking digital assets and staying in the know about the crypto world.",
    githubUrl: "https://github.com/Captain-drack/cryptocurrency-app",
    projectUrl: "https://cryptocurrency-2022.netlify.app/",
    technologies: ["React.js", "Ant Design", "Redux", "CSS", "Axios"],
  },
  {
    title: "Captain Shop",
    image: "/images/captain.jpeg",
    description:
      "Create a seamless online shopping experience with this e-commerce app. From browsing a wide range of products to secure payment processing, this application offers users a convenient way to explore and purchase items. Features include product categorization, detailed product pages, shopping cart management, and user-friendly checkout. Elevate the shopping journey for your customers with this responsive and user-centric e-commerce solution.",
    githubUrl: "https://github.com/Captain-drack/captain-shop",
    projectUrl: "https://captain-shop.netlify.app/",
    technologies: ["React.js", "Material UI", "Redux", "CSS", "Axios"],
  },
  {
    title: "Budget App",
    image: "/images/budget.jpeg",
    description:
      "Manage your finances with ease using our user-friendly Budget App. Take control of your income and expenses, set financial goals, and track your spending habits effortlessly. Our app provides valuable insights into your financial health, helping you make informed decisions and achieve financial stability. Simplify your financial life today with the Budget App.",
    githubUrl: "https://github.com/Captain-drack/budget-planner",
    projectUrl: "https://budget-plan.netlify.app/",
    technologies: ["React.js", "bootstrap"],
  },
];

function Projects() {
  const [expandedProjectIndex, setExpandedProjectIndex] = useState<number>(-1);
  const [showAllProjects, setShowAllProjects] = useState<boolean>(false);

  const projectsToShow = showAllProjects
    ? projectData
    : projectData.slice(0, 3);

  const toggleShowAllProjects = () => {
    setShowAllProjects(!showAllProjects);
  };

  const handleExpandProject = (index: number) => {
    setExpandedProjectIndex(index);
  };

  return (
    <div className="py-8 w-full flex flex-col items-center" id="projects">
      <h3 className="tracking-[15px] text-center my-10 uppercase text-slate-400 text-xl md:text-3xl">
        Projects
      </h3>
      {/* Mapping through the projects to display them */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7 w-full">
        {projectsToShow.map((project, index) => (
          <div
            key={index}
            className={`shadow-xl cursor-pointer rounded-md w-full ${
              index < 2 ? "md:w-5/12" : index === 2 ? "md:w-6/12" : "md:w-5/12"
            } lg:w-full p-5 border-1 border-blue-950 transition-all duration-500 ease-in hover:bg-blue-950`}
          >
            <Link
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={project.image}
                alt={project.title}
                className="rounded-md w-full"
              />
            </Link>
            <h3 className="text-start my-5 uppercase text-white text-xl md:text-2xl">
              {project.title}
            </h3>
            {expandedProjectIndex === index ? (
              <div>
                <p className="text-sm mb-1 text-slate-400 leading-5">
                  {project.description}
                  <button
                    onClick={() => setExpandedProjectIndex(-1)}
                    className="text-white text-sm underline cursor-pointer ml-2"
                  >
                    See Less
                  </button>
                </p>
              </div>
            ) : (
              <div>
                <p className="text-sm mb-1 text-slate-400 leading-5">
                  {`${project.description.slice(0, 70)}...`}
                  <button
                    onClick={() => setExpandedProjectIndex(index)}
                    className="text-white text-sm underline cursor-pointer ml-2"
                  >
                    See More
                  </button>
                </p>
              </div>
            )}
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm mb-2 text-white leading-5 underline"
            >
              Source Code
            </Link>
            <div className="flex flex-wrap items-center">
              {project.technologies.map((tech, techIndex) => (
                <div
                  key={techIndex}
                  className="text-blue-950 text-xs uppercase mr-3 font-bold shadow-lg shadow-blue-500/30 bg-slate-400 px-7 py-2 rounded-full mt-3 flex items-center"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <button
          onClick={toggleShowAllProjects}
          className="text-blue-950 font-bold shadow-lg shadow-blue-500/50 bg-white px-7 py-2 rounded-full mt-3 flex items-center"
        >
          {showAllProjects ? "See Less Projects" : "See More Projects"}
        </button>
      </div>
    </div>
  );
}

export default Projects;