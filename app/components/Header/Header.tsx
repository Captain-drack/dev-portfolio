"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoLinkedin,
  BiLogoWhatsapp,
  BiLogoGithub,
  BiSortDown,
} from "react-icons/bi";
import {
  menuItems,
  socialMediaLinks,
  logoText,
  logoTextSecondary,
} from "./HeaderData";

const Header: React.FC = () => {
  const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);

  // Create a ref to the dropdown content element
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Function to toggle the dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  // Function to close the dropdown when clicking outside of it
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownVisible(false);
    }
  };

  // Add a click event listener to the window when the dropdown is visible
  useEffect(() => {
    if (isDropdownVisible) {
      window.addEventListener("click", handleClickOutside);
    } else {
      window.removeEventListener("click", handleClickOutside);
    }

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownVisible]);

  return (
    <header>
      <div className=" flex items-center justify-between py-8">
        {/* left part */}
        <div>
          <Link
            href="/"
            className="text-3xl text-white cursor-pointer font-bold"
          >
            {logoText}
            <span className="text-3xl text-slate-400 font-bold ml-2">
              {logoTextSecondary}
            </span>
          </Link>
        </div>
        {/* mid part */}
        <div className="hidden lg:flex items-center space-x-8">
          {menuItems.map((menuItem, index) => (
            <Link
              key={index}
              href={menuItem.link}
              className="text-l text-slate-400 font-bold hover:text-white cursor-pointer"
            >
              {menuItem.text}
            </Link>
          ))}
        </div>
        {/* right part */}
        <div className="flex items-center gap-4">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              id="dropdownDividerButton"
              data-dropdown-toggle="dropdownDivider"
              className="p-2 rounded-full bg-white"
              type="button"
            >
              <BiSortDown className="text-xl text-black" />
            </button>

            <div
              id="dropdownDivider"
              className={`z-10 ${
                isDropdownVisible ? "" : "hidden"
              } divide-y absolute right-0 mt-1 bg-indigo-800 divide-slate-400 rounded-lg shadow-xl w-44`}
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDividerButton"
              >
                <li>
                  <Link
                    href="#about"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-indigo-900 dark:hover:text-white"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#experience"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-indigo-900 dark:hover:text-white"
                  >
                    Experience
                  </Link>
                </li>
                <li>
                  <Link
                    href="#skills"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-indigo-900 dark:hover:text-white"
                  >
                    Skills
                  </Link>
                </li>
                <li>
                  <Link
                    href="#projects"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-indigo-900 dark:hover:text-white"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="#contact"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-indigo-900 dark:hover:text-white"
                  >
                    Contact Me
                  </Link>
                </li>
              </ul>
              <div className="py-2">
                <Link
                  href="/gallery"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-indigo-900 dark:text-gray-200 dark:hover:text-white"
                >
                  Gallery
                </Link>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-4">
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
    </header>
  );
};

export default Header;
