import React from "react";
import CountUp from "react-countup";

const stats = [
  {
    num: 5,
    text: "Years of experience",
  },
  {
    num: 4,
    text: "Personal projects",
  },
  {
    num: 8,
    text: "Professional projects",
  },
  {
    num: 8,
    text: "Technologies learn",
  },
  {
    num: 551,
    text: "Code commits",
  },
];

const State = () => {
  return (
    <section className="mt-16 lg:mt-24">
      <div className="flex flex-wrap gap-6 max-w-[80vw] mx-auto xl:max-w-none">
        {stats?.map((item, index) => {
          return (
            <div
              className="flex-1 flex gap-4 items-center justify-center xl:justify-start"
              key={index}
            >
              <CountUp
                end={item.num}
                duration={5}
                delay={1}
                className="text-4xl lg:text-6xl font-extrabold"
              />
              <p
                className={`${
                  item?.text?.length < 15 ? "max-w-[100px]" : "max-w-[150px]"
                } leading-snug text-white/80`}
              >
                {item.text}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default State;
