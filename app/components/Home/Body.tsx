"use client";
// import Lottie from "lottie-web";
import React from "react";
import Link from "next/link";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import Photo from "./Photo";
import State from "./State";
import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoLinkedin,
  BiLogoWhatsapp,
  BiLogoGithub,
} from "react-icons/bi";
import { socialMediaLinks } from "../Header/HeaderData";

function Body() {
  const [text] = useTypewriter({
    words: [
      "I am Akshat Austin",
      "I am a Freelancer",
      "I am a Frontend Web Developer",
      "I am a Mobile Developer",
      "I am a Youtuber",
      "I am a Photographer",
      "I am an Anime Sketch Artist",
      "I am an Editor",
      "I am an Engineer",
    ],
    loop: true,
    delaySpeed: 1000,
  });

  return (
    <section className=" min-h-[80dvh] xl:h-[90dvh] flex flex-col items-center justify-center">
      <div className="mx-auto">
        {/* first part */}
        <div className="flex flex-col-reverse justify-between items-center md:flex-row md:space-x-8">
          <div className="w-full md:w-2/3 flex flex-col items-center md:items-start md:w2/4 ">
            <h1 className="text-3xl lg:text-5xl font-semibold text-white mt-10">
              Hello
            </h1>
            <h1 className="text-3xl lg:text-5xl font-semibold my-3 text-white text-center md:text-left">
              <span className=" text-slate-400">{text}</span>
              <Cursor />
            </h1>
            <div>
              <p className="text-white text-l md:text-xl my-3 w-full md:w-3/4 text-center md:text-left">
                Hi there! I&apos;m a passionate freelance frontend developer
                with a mission to share my programming knowledge with the world.
              </p>
            </div>
            <div className="flex flex-wrap flex-col md:flex-row  gap-4">
              <Link
                href="/Akshat_Austin_Frontend_Developer_Resume.pdf"
                download="Akshat-Austin"
                target="_blank"
                rel="noreferrer"
                className="rounded-full relative flex h-14 items-center space-x-0 overflow-hidden bg-white pl-6 mt-5 shadow-lg shadow-blue-500/50 fle justify-center"
              >
                <span className="relative text-base uppercase text-blue-950 font-bold">
                  Resume
                </span>
                <div
                  aria-hidden="true"
                  className="w-14 -translate-y-7 bg-bg-white transition duration-300 group-hover:translate-y-7"
                >
                  <div className="flex h-14">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="m-auto h-5 w-5 fill-blue-950"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="flex h-14">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="m-auto h-5 w-5 fill-blue-950"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
              <div className="flex items-center space-x-4 mt-5">
                {socialMediaLinks.map((socialLink, index) => (
                  <Link
                    target="_blank"
                    key={index}
                    href={socialLink.link}
                    className="p-2 rounded-full bg-white"
                  >
                    {socialLink.text === "Facebook" ? (
                      <BiLogoFacebook className="text-xl text-black hover:text-blue-700" />
                    ) : socialLink.text === "Instagram" ? (
                      <BiLogoInstagram className="text-xl text-black hover:text-red-400" />
                    ) : socialLink.text === "LinkedIn" ? (
                      <BiLogoLinkedin className="text-xl text-black hover:text-blue-600" />
                    ) : socialLink.text === "Whatsapp" ? (
                      <BiLogoWhatsapp className="text-xl text-black hover:text-green-600" />
                    ) : (
                      <BiLogoGithub className="text-xl text-black" />
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <Photo />
          </div>
        </div>
      </div>
      <State />
    </section>
  );
}

export default Body;
