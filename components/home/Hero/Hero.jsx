import HeroCard from "./HeroCard";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteAnimationContext } from "components/providers/SiteAnimation";

const list = {
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
    transition: {
      when: "afterChildren",
    },
  },
};

const grid = {
  visible: {
    opacity: 1,
    transition: {
      delay: 2.75,
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren",
    },
  },
};

const variants = {
  hidden: { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0 },
};

const animationProps = {
  variants: variants,
  transition: {
    duration: 0.3,
    ease: [0.36, 0.66, 0.04, 1],
  },
};



export default function Hero() {
  const { HeroFinished, setHeroFinished } = useSiteAnimationContext();

  const gridAnimationProps = {
    layout: true,
    initial: "hidden",
    animate: "visible",
    variants: grid,
    onAnimationComplete: () => {
      setHeroFinished(true);
    },
  };

  return (
    <section   className="left-0 top-0 flex w-full justify-center bg-neutral-50 py-32 dark:bg-transparent">
      <div className="flex w-full  max-w-page flex-col items-center justify-center gap-8">
        <div className="flex w-full flex-col">
          <AnimatePresence initial={!HeroFinished}>
            <motion.div
              layout
              transition={{ when: "beforeChildren", staggerChildren: 50 }}
              initial="hidden"
              animate="visible"
              variants={list}
              className="flex flex-col items-center justify-center"
            >
              <motion.h1
                {...animationProps}
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
              <motion.p {...animationProps} className=" text-2xl font-light ">
                I’m an <span className="font-bold text-js-green">engineer</span>
                , <span className="font-bold text-js-yellow">developer</span>,{" "}
                <span className="font-bold text-js-blue">photographer</span>,
                and <span className="font-bold text-js-red">tinkerer</span>.
              </motion.p>
              <motion.p
                {...animationProps}
                className="mb-24 text-2xl font-light"
              >
                Welcome to my little corner of the Internet.
              </motion.p>
            </motion.div>
            <motion.div
              {...gridAnimationProps}
              className="grid w-full grid-cols-12 gap-5"
            >
              <HeroCard
                className="col-span-8"
                title="WEB DEVELOPMENT"
                color="yellow"
                href="#webdev"
              />
              <HeroCard
                className="col-span-4"
                title="ENGINEERING"
                color="green"
              />
              <HeroCard
                layoutId="keks"
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
    </section >
  );
}
