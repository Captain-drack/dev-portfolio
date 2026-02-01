"use client";
import Link from "next/link";
import React from "react";
import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoLinkedin,
  BiLogoGithub,
  BiPhone,
} from "react-icons/bi";

const Footer = () => {
  return (
    <div
      className="flex pb-3 m-auto text-sm flex-col items-center max-w-screen-xl"
      style={{ color: `rgb(var(--color-muted))` }}
    >
      <div className="flex mb-2 w-full m-auto text-sm flex-col md:flex-row items-center md:items-center md:justify-between max-w-screen-xl">
        <div className="flex items-center justify-center flex-wrap gap-4 mb-5 md:mb-0">
          {["about", "experience", "skills", "projects", "contact"].map((item) => (
            <Link
              key={item}
              href={`#${item}`}
              className="text-l font-bold cursor-pointer transition-colors"
              style={{ color: `rgb(var(--color-muted))` }}
            >
              {item === "contact" ? "Contact Me" : item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 md:gap-0 justify-center items-center space-x-4">
          <Link
            target="_blank"
            href="https://www.facebook.com/akshataustin"
            className="p-2 rounded-full transition-colors"
            style={{ backgroundColor: `rgb(var(--color-foreground))` }}
          >
            <BiLogoFacebook
              className="text-xl hover:opacity-70"
              style={{ color: `rgb(var(--color-background))` }}
            />
          </Link>
          <Link
            target="_blank"
            href="https://www.instagram.com/captain_drack/"
            className="p-2 rounded-full transition-colors"
            style={{ backgroundColor: `rgb(var(--color-foreground))` }}
          >
            <BiLogoInstagram
              className="text-xl hover:opacity-70"
              style={{ color: `rgb(var(--color-background))` }}
            />
          </Link>
          <Link
            target="_blank"
            href="https://www.linkedin.com/in/akshat-austin/"
            className="p-2 rounded-full transition-colors"
            style={{ backgroundColor: `rgb(var(--color-foreground))` }}
          >
            <BiLogoLinkedin
              className="text-xl hover:opacity-70"
              style={{ color: `rgb(var(--color-background))` }}
            />
          </Link>
          <Link
            target="_blank"
            href="https://github.com/Captain-drack"
            className="p-2 rounded-full transition-colors"
            style={{ backgroundColor: `rgb(var(--color-foreground))` }}
          >
            <BiLogoGithub
              className="text-xl hover:opacity-70"
              style={{ color: `rgb(var(--color-background))` }}
            />
          </Link>
          <Link
            href="tel:+919870774547"
            className="group relative flex h-12 items-center overflow-hidden rounded-full px-3 text-white"
            style={{
              background: `linear-gradient(to right, var(--palette-accent1), var(--palette-accent2))`,
            }}
          >
            <BiPhone className="text-xl" />
            <div className="ml-2">+91 9870774547</div>
          </Link>
        </div>
      </div>
      <div className="my-5">© Copyright 2025. All Rights Reserved.</div>
    </div>
  );
};

export default Footer;
