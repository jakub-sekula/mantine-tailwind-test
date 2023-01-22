import HeroCard from "./HeroCard";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteAnimationContext } from "components/providers/SiteAnimation";
import { useEffect } from "react";

export default function Hero() {
  const { heroFinished, setHeroFinished, animationsDisabled } =
    useSiteAnimationContext();

  useEffect(() => {
    if (animationsDisabled) {
      setHeroFinished(true);
    }
  }, []);

  const gridAnimation = !animationsDisabled
    ? {
        initial: "hidden",
        animate: "visible",
        variants: {
          visible: {
            opacity: 1,
            transition: {
              delay: 2.75,
              when: "beforeChildren",
              staggerChildren: 0.1,
            },
          },
        },
        onAnimationComplete: () => {
          setHeroFinished(true);
        },
      }
    : {
        initial: "visible",
      };

  const heroTextAnimation = !animationsDisabled
    ? {
        variants: {
          hidden: { opacity: 0, y: -16 },
          visible: { opacity: 1, y: 0 },
        },
        transition: {
          duration: 0.3,
          ease: [0.36, 0.66, 0.04, 1],
        },
      }
    : {};

  const heroTextContainerAnimation = !animationsDisabled
    ? {
        initial: "hidden",
        animate: "visible",
        variants: {
          visible: {
            opacity: 1,
            transition: {
              delay: 0.5,
              when: "beforeChildren",
              staggerChildren: 0.75,
            },
          },
          hidden: {
            opacity: 0,
          },
        },
      }
    : {};

  return (
    <section className="left-0 top-0 flex w-full justify-center bg-neutral-50 py-32 dark:bg-transparent">
      <div className="flex w-full  max-w-page flex-col items-center justify-center gap-8">
        <div className="flex w-full flex-col">
          <AnimatePresence initial={!heroFinished}>
            {/* Hero text container */}
            <motion.div
              {...heroTextContainerAnimation}
              className="flex flex-col items-center justify-center"
            >
              <motion.h1
                {...heroTextAnimation}
                className="mb-8 font-poppins text-5xl font-bold"
              >
                Hi, my name is{" "}
                <span
                  className="relative after:absolute after:left-0
                after:bottom-1 after:-z-10 after:h-2 after:w-full
                after:animate-underline after:bg-js-yellow"
                >
                  Jakub
                </span>{" "}
                👋🏻
              </motion.h1>
              <motion.p
                {...heroTextAnimation}
                className=" text-2xl font-light "
              >
                I’m an <span className="font-bold text-js-green">engineer</span>
                , <span className="font-bold text-js-yellow">developer</span>,{" "}
                <span className="font-bold text-js-blue">photographer</span>,
                and <span className="font-bold text-js-red">tinkerer</span>.
              </motion.p>
              <motion.p
                {...heroTextAnimation}
                className="mb-24 text-2xl font-light"
              >
                Welcome to my little corner of the Internet.
              </motion.p>
            </motion.div>
            {/* Hero grid */}
            <motion.div
              {...gridAnimation}
              className="grid w-full grid-cols-12 gap-5"
            >
              <HeroCard
                className="col-span-8"
                title="WEB DEVELOPMENT"
                color="yellow"
              />
              <HeroCard
                className="col-span-4"
                title="ENGINEERING"
                color="green"
              />
              <HeroCard
                layoutId={10}
                href="/work"
                className="col-span-4"
                title="TOOLS"
                color="red"
              />
              <HeroCard
                className="col-span-8"
                title="PHOTOGRAPHY"
                color="blue"
              />
              <HeroCard className="col-span-8" title="ABOUT" color="green" />
              <HeroCard className="col-span-4" title="CONTACT" color="yellow" />
              <HeroCard className="col-span-4" title="CV" color="yellow" />
              <HeroCard className="col-span-8" title="BLOG" color="red" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
