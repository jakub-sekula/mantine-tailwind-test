import { useEffect } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { useAnimationContext } from "components/contexts";
import { heroBlockIds } from "siteConfig";
import { Hyperlink } from "components/common";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const {
    heroFinished,
    setHeroFinished,
    animationsDisabled,
    heroTextContainerAnimation,
    heroGridAnimation,
    heroTextAnimation,
  } = useAnimationContext();

  useEffect(() => {
    if (animationsDisabled) {
      setHeroFinished(true);
    }
  }, [animationsDisabled, setHeroFinished]);

  return (
    <AnimatePresence initial={!heroFinished && !animationsDisabled}>
      <motion.section
        id="hero-section"
        key="hero-section"
        className="grid w-full max-w-6xl grid-cols-12 gap-4 px-10 py-20 dark:bg-transparent md:px-8"
      >
        <motion.div
          {...heroTextContainerAnimation}
          className="col-span-full flex flex-col items-center justify-center text-center
          text-xl font-light"
        >
          <Image
            src="/me.png"
            width={600}
            height={275}
            className="mb-8 w-56 rounded-full bg-js-yellow sm:w-64 md:w-72"
          />

          <motion.h1 className="mb-2 font-heading text-2xl font-semibold leading-none sm:mb-4 sm:text-3xl lg:text-4xl">
            Hi, my name is{" "}
            <span
              className="relative after:absolute after:left-0
                  "
            >
              Jakub Sekula
            </span>{" "}
            👋🏻
          </motion.h1>
          <motion.p className="mb-4 text-base sm:mb-8 md:text-lg md:leading-normal lg:text-xl">
            I’m a <span className="font-bold text-js-yellow">developer</span>,{" "}
            <span className="font-bold text-js-green">engineer</span>,{" "}
            <span className="font-bold text-js-blue">photographer</span>, and{" "}
            <span className="font-bold text-js-red">maker</span>.
            <br />
            Welcome to my little corner of the Internet.
          </motion.p>
        </motion.div>
        <motion.div
          {...heroGridAnimation}
          onAnimationComplete={() => {
            setHeroFinished(true);
          }}
          className=" col-span-10 col-start-2 flex w-full flex-col justify-center gap-3 md:flex-row md:gap-5"
        >
          <HeroCard
            title="SOFTWARE"
            color="yellow"
            href="/projects/web"
            layoutId={heroBlockIds[0]}
          />
          <HeroCard
            title="ENGINEERING"
            color="green"
            href="/projects/engineering"
            layoutId={heroBlockIds[1]}
          />
          <HeroCard
            title="PHOTOGRAPHY"
            href="/photography"
            color="blue"
            layoutId={heroBlockIds[3]}
          />
        </motion.div>
        {/* Hero grid */}
      </motion.section>
    </AnimatePresence>
  );
}

function HeroCard({ title, color, className, href, layoutId }) {
  const { cardEntryAnimation } = useAnimationContext();
  const colors = {
    red: "border-js-red text-js-red ",
    green:
      "border-js-green text-js-green",
    blue: "border-js-blue text-js-blue",
    yellow:
      "border-js-yellow text-js-yellow",
  };

  return (
    <Link
      href={href}
      scroll={false}
      className={`${className} ${colors[color] || "border-text/5"}
    flex grow cursor-pointer select-none items-center justify-center rounded-lg py-2
    px-6 text-center font-heading text-sm font-semibold border md:text-lg`}
    >
      {title}
    </Link>
  );
}
