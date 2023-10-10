import React from "react";
import RootLayout from "./layout";
import Body from "./components/Home/Body";
import About from "./components/Home/About";
import Experience from "./components/Home/Experience";
import Skills from "./components/Home/Skills";
import Projects from "./components/Home/Projects";
import ContactUs from "./components/Home/ContactUs";

const Home = () => {
  return (
    <RootLayout>
      <Body />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <ContactUs />
    </RootLayout>
  );
};

export default Home;
