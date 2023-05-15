import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import lightBg from "/public/triangles.jpg";
import darkBg from "/public/galaxy.jpg";

export default function Hero() {
  const { theme } = useTheme();
  const dark = theme === "dark";

  return (
    <section
      id="hero-section"
      key="hero-section"
      className="relative mb-16 grid w-full grid-cols-12 gap-4 overflow-hidden px-10 py-24 md:px-8 xl:min-h-[70vh]"
    >
      <div className="absolute inset-0 patterned"/>
      <div
        className="z-10 col-span-full flex flex-col md:flex-row text-center md:text-left items-center justify-center
          text-xl font-light md:gap-8"
      >
        <Image
          priority
          src="/me.png"
          width={600}
          height={600}
          alt="Hero image"
          className="mb-8 md:mb-0 h-48 w-48 shrink-0 rounded-full bg-js-yellow md:h-56 md:w-56"
        />
        <div className="flex flex-col md:block">
          <h1
            className="font-heading text-2xl font-semibold tracking-tight dark:bg-gradient-to-br md:text-4xl lg:text-6xl">
            Hi there, I&apos;m Jakub <span className="text-white">👋🏻</span>
          </h1>
          <p className="mb-4 md:mb-0 text-base md:text-xl md:leading-snug lg:text-2xl">
            I am a <span className="font-bold text-js-blue">web developer</span>,{" "}
            <span className="font-bold text-js-green">mechanical engineer</span>, and a{" "}
            <span className="font-bold text-js-red">photography enthusiast</span>.
          </p>
        </div>
      </div>
      {/* <div
        className="col-span-10 col-start-2 flex h-min w-full flex-col justify-center gap-3 md:flex-row md:gap-5"
      >
        <HeroCard title="SOFTWARE" color="yellow" href="/tags/web" />
        <HeroCard title="ENGINEERING" color="green" href="/tags/engineering" />
        <HeroCard title="PHOTOGRAPHY" href="/photography" color="blue" />
      </div> */}
    </section>
  );
}

function HeroCard({ title, color, className, href }) {
  const colors = {
    red: "border-js-red text-js-red hover:bg-js-red/5",
    green: "border-js-green text-js-green hover:bg-js-green/5",
    blue: "border-js-blue text-js-blue hover:bg-js-blue/5",
    yellow: "border-js-yellow text-js-yellow hover:bg-js-yellow/5",
  };

  return (
    <Link
      href={href}
      className={`${className} ${colors[color] || "border-text/5"}
    flex w-56 cursor-pointer select-none items-center justify-center rounded-md border
    py-2 px-6 text-center font-heading text-sm font-semibold transition-all duration-200 hover:-translate-y-[2px] md:text-lg`}
    >
      {title}
    </Link>
  );
}
