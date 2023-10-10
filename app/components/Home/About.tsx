"use client";
import React from "react";
import { BiPhone } from "react-icons/bi";

const About: React.FC = () => {
  return (
    <div className="py-8" id="about">
      <h3 className="tracking-[15px] text-center my-10 uppercase text-slate-400 text-xl md:text-3xl">
        About
      </h3>
      <div className="w-5/6 mx-auto mb-10">
        <div className="flex flex-col justify-between items-center md:flex-row md:space-x-8">
          <figure className="md:w-1/2 mb-10 md:mb-0 relative w-full">
            <img
              src="/images/AboutMe.jpg"
              alt="Akshat-Austin"
              className="shadow-2xl rounded-md max-w-full h-auto align-middle border-none "
            />
            <figcaption className="absolute text-center bottom-8 left-2/4 w-[calc(100%-4rem)] -translate-x-2/4 rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
              <h6 className="text-black font-bold">Akshat Austin</h6>
              <p className="text-black ">Frontend Developer</p>
              <div className="flex items-center justify-center text-black">
                <BiPhone className="text-xl" />
                <p className=" ml-1">+919870774547</p>
              </div>
            </figcaption>
          </figure>
          <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-2 md:gap-4">
            <p className="text-slate-400">
              Hello, I&apos;m{" "}
              <span className="text-white font-bold">Akshat Austin</span>, a
              passionate Frontend Developer with over 3.5 years of hands-on
              experience. Currently, I&apos;m exploring the world of
              freelancing, where I craft exceptional user interfaces and
              delightful user experiences.
            </p>
            <div>
              <h3 className="text-xl font-semibold tracking-wide text-white">
                Professional Journey
              </h3>
              <p className="mt-3 text-slate-400">
                I&apos;ve had the privilege of contributing my skills to two
                prominent companies, where my primary focus has been on creating
                polished and intuitive user interfaces. Whether it&apos;s web or
                mobile, I believe in the power of design to enhance user
                engagement.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold tracking-wide text-white">
                Expertise
              </h3>
              <p className="mt-3 text-slate-400">
                My toolkit includes React.js, Next.js, React Native, Material
                UI, CSS3, HTML5, TypeScript, Tailwind CSS, Redux, and more. I
                thrive on staying up-to-date with the latest industry trends and
                technologies.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold tracking-wide text-white">
                Versatile Skills
              </h3>
              <p className="mt-3 text-slate-400">
                Beyond coding, I&apos;m a multi-talented individual. I&apos;m
                adept at video editing, a nature enthusiast who enjoys trekking,
                a creative artist skilled in sketching, and a master of the
                culinary arts. Photoshop wizardry and PC gaming are also in my
                repertoire.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
