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
      className="relative mb-16 grid w-full grid-cols-12 gap-4 overflow-hidden px-10 py-24 md:px-8 xl:h-[calc(100vh-4rem)]"
    >
      <Image
        className={`absolute inset-0 h-full w-full object-cover  ${
          dark ? "opacity-50 mix-blend-hard-light" : "opacity-30"
        } fade-mask`}
        src={dark ? darkBg : lightBg}
        placeholder="blur"
      />
      <div
        className="z-10 col-span-full flex flex-col items-center justify-center text-center
          text-xl font-light"
      >
        <Image
          priority
          src="/me.png"
          width={600}
          height={600}
          alt="Hero image"
          className="mb-8 h-56 w-56 shrink-0 rounded-full bg-js-yellow sm:h-64 sm:w-64 md:h-72 md:w-72"
        />

        <h1
          className="mb-2 bg-clip-text font-heading text-2xl
          font-semibold dark:bg-gradient-to-br dark:from-rose-50 dark:to-yellow-50 
          dark:text-transparent sm:mb-4 sm:text-3xl lg:text-4xl "
        >
          Hi, my name is Jakub Sekula <span className="text-white">👋🏻</span>
        </h1>
        <p className="mb-4 text-base sm:mb-8 md:text-lg md:leading-normal lg:text-xl">
          I’m a <span className="font-bold text-js-yellow">developer</span>,{" "}
          <span className="font-bold text-js-green">engineer</span>,{" "}
          <span className="font-bold text-js-blue">photographer</span>, and{" "}
          <span className="font-bold text-js-red">maker</span>.
          <br />
          Welcome to my little corner of the Internet.
        </p>
      </div>
      <div
        onAnimationComplete={() => {
          setHeroFinished(true);
        }}
        className="col-span-10 col-start-2 flex h-min w-full flex-col justify-center gap-3 md:flex-row md:gap-5"
      >
        <HeroCard title="SOFTWARE" color="yellow" href="/tags/web" />
        <HeroCard title="ENGINEERING" color="green" href="/tags/engineering" />
        <HeroCard title="PHOTOGRAPHY" href="/photography" color="blue" />
      </div>
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
