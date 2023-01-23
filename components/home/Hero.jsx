import { motion, AnimatePresence } from "framer-motion";
import { useSiteAnimationContext } from "components/providers/SiteAnimation";
import { useEffect } from "react";
import { heroBlockIds, disabledAnimationProps } from "siteConfig";
import { useRouter } from "next/router";

export default function Hero() {
  const { heroFinished, setHeroFinished, animationsDisabled } =
    useSiteAnimationContext();

  useEffect(() => {
    if (animationsDisabled) {
      setHeroFinished(true);
    }
  }, [animationsDisabled, setHeroFinished]);

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
          hidden: { opacity: 0 },
        },
      }
    : disabledAnimationProps;

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
    : disabledAnimationProps;

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
    : disabledAnimationProps;

  return (
    <AnimatePresence initial={!heroFinished && !animationsDisabled}>
      <motion.section
        id="hero-section"
        key="hero-section"
        className="flex w-full justify-center py-32 dark:bg-transparent"
      >
        <div className="flex w-full  max-w-page flex-col items-center justify-center gap-8">
          <div className="flex w-full flex-col">
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
                  Jakub Sekula
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
              onAnimationComplete={() => {
                setHeroFinished(true);
              }}
              className="grid w-full grid-cols-12 gap-5"
            >
              <HeroCard
                className="col-span-8"
                title="WEB DEVELOPMENT"
                color="yellow"
                href="/projects/web"
                layoutId={heroBlockIds[0]}
              />
              <HeroCard
                className="col-span-4"
                title="ENGINEERING"
                color="green"
                href="/projects/engineering"
                layoutId={heroBlockIds[1]}
              />
              <HeroCard
                // layoutId={10}
                href="/work"
                className="col-span-4"
                title="TOOLS"
                color="red"
                layoutId={heroBlockIds[2]}
              />
              <HeroCard
                className="col-span-8"
                title="PHOTOGRAPHY"
                href="/photography"
                color="blue"
                layoutId={heroBlockIds[3]}
              />
              <HeroCard
                className="col-span-8"
                title="ABOUT"
                color="green"
                href="/about"
                layoutId={heroBlockIds[4]}
              />
              <HeroCard
                className="col-span-4"
                title="CONTACT"
                color="yellow"
                href="/contact"
                layoutId={heroBlockIds[5]}
              />
              <HeroCard
                className="col-span-4"
                title="CV"
                color="yellow"
                href="/cv"
                layoutId={heroBlockIds[6]}
              />
              <HeroCard
                className="col-span-8"
                title="BLOG"
                color="red"
                href="/blog"
                layoutId={heroBlockIds[7]}
              />
            </motion.div>
          </div>
        </div>
      </motion.section>
    </AnimatePresence>
  );
}

const variants = {
  hidden: { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0 },
};

function HeroCard({ title, color, className, href, layoutId }) {
  const router = useRouter();
  const colors = {
    red: "dark:border-js-red dark:text-js-red dark:bg-transparent bg-js-red text-white",
    green:
      "dark:border-js-green dark:text-js-green dark:bg-transparent bg-js-green text-white",
    blue: "dark:border-js-blue dark:text-js-blue dark:bg-transparent bg-js-blue text-white",
    yellow:
      "dark:border-js-yellow dark:text-js-yellow dark:bg-transparent bg-js-yellow text-white",
  };

  return (
    <motion.div
      key={layoutId}
      layoutId={layoutId}
      variants={variants}
      transition={{
        duration: 0.3,
        ease: [0.36, 0.66, 0.04, 1],
      }}
      whileHover={{ scale: 1.025 }}
      onClick={() => {
        router.push(href);
      }}
      className={`${className} ${colors[color]}
	flex h-24 select-none items-center justify-center rounded-md font-poppins
	text-4xl font-bold dark:border-2 cursor-pointer`}
    >
      {title}
    </motion.div>
  );
}
