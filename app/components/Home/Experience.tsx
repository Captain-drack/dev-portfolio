"use client";
import Link from "next/link";
import React from "react";

const Experience: React.FC = () => {
  return (
    <div className="py-8" id="experience">
      <h3 className="tracking-[15px] text-center my-10 uppercase text-slate-400 text-xl md:text-3xl">
        Experience
      </h3>
      <div className="block md:hidden">
        <div className="flex justify-center">
          <div className="flex flex-col justify-center items-start md:flex-row w-full md:w-2/3">
            <img
              className="rounded-full w-32 h-32 mx-auto md:mx-10"
              src="/logos/shopyvilla.png"
              alt="Shopyvilla Developers"
            />
            <div className="mt-3 flex flex-col items-start">
              <Link
                href="https://shopyvilladevelopers.com/"
                className="text-sm md:text-2xl mb-2 text-white tracking-[5px] uppercase"
              >
                Shopyvilla Developers
              </Link>
              <p className="text-xs md:text-lg mb-2 text-slate-400 uppercase tracking-[5px]">
                Front-end Developer
              </p>
              <p className="text-xs md:text-lg mb-2 text-slate-400 uppercase tracking-[5px]">
                <span className="text-white">April</span> 2022 -{" "}
                <span className="text-white">July</span> 2023
              </p>
              <p className="text-xs md:text-lg mb-2 text-slate-400 uppercase tracking-[5px]">
                Mohali, <span className="text-white">India</span>
              </p>
              <p className="text-sm mb-3 text-slate-400 leading-5">
                - Developed and implemented robust front-end solutions for a
                variety of projects at Shopyvilla Developers,collaborating
                closely with clients to meet their specific requirements.
              </p>
              <p className="text-sm mb-3 text-slate-400 leading-5">
                - Demonstrated expertise in creating responsive user interfaces,
                optimizing page performance, and integrating new features to
                enhance the overall user experience.
              </p>
              <p className="text-sm mb-3 text-slate-400 leading-5">
                - Worked closely with cross-functional teams, including
                designers and backend developers,to ensure seamless integration
                of frontend components with backend systems.
              </p>
              <p className="text-sm mb-3 text-slate-400 leading-5">
                - Proactively stayed updated with the latest industry trends,
                best practices, and emerging technologies in frontend
                development, applying this knowledge to improve development
                processes and deliver innovative solutions.
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center ">
          <div className="my-20 flex flex-col justify-center items-start md:flex-row w-full md:w-2/3">
            <img
              className="rounded-full w-32 h-32 mx-auto md:mx-10 mb-5 md:mb-0"
              src="/logos/skynox.png"
              alt="Shopyvilla Developers"
            />
            <div className="flex flex-col items-start">
              <Link
                href="https://skynox.tech/"
                className="text-sm md:text-2xl mb-2 text-white tracking-[5px] uppercase"
              >
                Skynox tech
              </Link>
              <p className="text-xs md:text-lg mb-2 text-slate-400 uppercase tracking-[5px]">
                Front-end Developer
              </p>
              <p className="text-xs md:text-lg mb-2 text-slate-400 uppercase tracking-[5px]">
                <span className="text-white">January</span> 2020 -{" "}
                <span className="text-white">March</span> 2022
              </p>
              <p className="text-xs md:text-lg mb-2 text-slate-400 uppercase tracking-[5px]">
                Mohali, <span className="text-white">India</span>
              </p>
              <p className="text-sm mb-3 text-slate-400 leading-5">
                - During my tenure at Skynox Tech, I honed my skills as a
                frontend developer by working extensively with cutting-edge
                technologies such as Next.js, React.js, Material-UI (MUI), and
                Tailwind CSS. These technologies allowed me to build highly
                responsive and performant web applications.
              </p>
              <p className="text-sm mb-3 text-slate-400 leading-5">
                - I played a pivotal role in implementing Redux, a powerful
                state management library, in our projects. This facilitated
                efficient data flow and ensured seamless communication between
                different components, leading to improved user experiences and
                maintainable codebases.
              </p>
              <p className="text-sm mb-3 text-slate-400 leading-5">
                - My commitment to delivering user-friendly interfaces is
                evident in my work, as I consistently prioritized responsive
                design and accessibility. I ensured that our web applications
                were usable by a wide range of users, including those with
                disabilities, thus enhancing inclusivity.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block container mx-auto w-full h-full">
        <div className="relative wrap overflow-hidden p-10 h-full">
          <div
            className="border-2-2 absolute border-opacity-20 border-gray-400 h-full border"
            style={{ left: "50%" }}
          ></div>
          <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
            <div className="order-1 w-5/12"></div>
            <div className="z-20 flex items-center order-1 bg-white shadow-xl w-8 h-8 rounded-full">
              <img
                className="rounded-full w-5 h-5 mx-auto"
                src="/logos/shopyvilla.png"
                alt="Shopyvilla Developers"
              />
            </div>
            <div className="order-1 rounded-lg shadow-xl w-5/12 px-6 py-4">
              <div>
                <div className="flex flex-col justify-center items-start md:flex-row w-full">
                  <div className="mt-3 flex flex-col items-start">
                    <Link
                      href="https://shopyvilladevelopers.com/"
                      className="text-sm md:text-2xl mb-2 text-white tracking-[5px] uppercase"
                    >
                      Shopyvilla Developers
                    </Link>
                    <p className="text-xs md:text-lg mb-2 text-slate-400 uppercase tracking-[5px]">
                      Front-end Developer
                    </p>
                    <p className="text-xs md:text-lg mb-2 text-slate-400 uppercase tracking-[5px]">
                      <span className="text-white">April</span> 2022 -{" "}
                      <span className="text-white">July</span> 2023
                    </p>
                    <p className="text-xs md:text-lg mb-2 text-slate-400 uppercase tracking-[5px]">
                      Mohali, <span className="text-white">India</span>
                    </p>
                    <p className="text-sm mb-3 text-slate-400 leading-5">
                      - Developed and implemented robust front-end solutions for
                      a variety of projects at Shopyvilla
                      Developers,collaborating closely with clients to meet
                      their specific requirements.
                    </p>
                    <p className="text-sm mb-3 text-slate-400 leading-5">
                      - Demonstrated expertise in creating responsive user
                      interfaces, optimizing page performance, and integrating
                      new features to enhance the overall user experience.
                    </p>
                    <p className="text-sm mb-3 text-slate-400 leading-5">
                      - Worked closely with cross-functional teams, including
                      designers and backend developers,to ensure seamless
                      integration of frontend components with backend systems.
                    </p>
                    <p className="text-sm mb-3 text-slate-400 leading-5">
                      - Proactively stayed updated with the latest industry
                      trends, best practices, and emerging technologies in
                      frontend development, applying this knowledge to improve
                      development processes and deliver innovative solutions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-8 flex justify-between items-center w-full right-timeline">
            <div className="order-1 w-5/12"></div>
            <div className="z-20 flex items-center order-1 bg-white shadow-xl w-8 h-8 rounded-full">
              <img
                className="rounded-full w-5 h-5 mx-auto"
                src="/logos/skynox.png"
                alt="Shopyvilla Developers"
              />
            </div>
            <div className="order-1 rounded-lg shadow-xl w-5/12 px-6 py-4">
              <div className="flex flex-col items-start">
                <Link
                  href="https://skynox.tech/"
                  className="text-sm md:text-2xl mb-2 text-white tracking-[5px] uppercase"
                >
                  Skynox tech
                </Link>
                <p className="text-xs md:text-lg mb-2 text-slate-400 uppercase tracking-[5px]">
                  Front-end Developer
                </p>
                <p className="text-xs md:text-lg mb-2 text-slate-400 uppercase tracking-[5px]">
                  <span className="text-white">January</span> 2020 -{" "}
                  <span className="text-white">March</span> 2022
                </p>
                <p className="text-xs md:text-lg mb-2 text-slate-400 uppercase tracking-[5px]">
                  Mohali, <span className="text-white">India</span>
                </p>
                <p className="text-sm mb-3 text-slate-400 leading-5">
                  - During my tenure at Skynox Tech, I honed my skills as a
                  frontend developer by working extensively with cutting-edge
                  technologies such as Next.js, React.js, Material-UI (MUI), and
                  Tailwind CSS. These technologies allowed me to build highly
                  responsive and performant web applications.
                </p>
                <p className="text-sm mb-3 text-slate-400 leading-5">
                  - I played a pivotal role in implementing Redux, a powerful
                  state management library, in our projects. This facilitated
                  efficient data flow and ensured seamless communication between
                  different components, leading to improved user experiences and
                  maintainable codebases.
                </p>
                <p className="text-sm mb-3 text-slate-400 leading-5">
                  - My commitment to delivering user-friendly interfaces is
                  evident in my work, as I consistently prioritized responsive
                  design and accessibility. I ensured that our web applications
                  were usable by a wide range of users, including those with
                  disabilities, thus enhancing inclusivity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
