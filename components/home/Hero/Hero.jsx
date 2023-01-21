import HeroCard from "./HeroCard";
import { IconChevronDown } from "@tabler/icons";
import { motion, AnimatePresence } from "framer-motion";

const list = {
  visible: {
    opacity: 1,
    transition: {
      delay:1,
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
      delay: 3.25,
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

export default function Hero() {
  return (
    <div className="bg-[#001A22] flex flex-col  gap-4 items-center py-16 w-full absolute left-0 top-0">
      <div className="max-w-[1200px] w-full text-[#E9E2CC] flex flex-col gap-8 justify-center items-center">
        <div className="flex flex-col ">
          <AnimatePresence>
            <motion.div
              layout
              transition={{ when: "beforeChildren", staggerChildren: 50 }}
              initial="hidden"
              animate="visible"
              variants={list}
              className="flex flex-col items-center justify-center"
            >
              <motion.h1
                variants={variants}
                transition={{
                  duration: 0.3,
                  ease: [0.36, 0.66, 0.04, 1],
                }}
                className="font-sans text-6xl font-bold mb-6"
              >
                Never not creating.
              </motion.h1>
              <motion.p
                variants={variants}
                transition={{
                  duration: 0.3,
                  ease: [0.36, 0.66, 0.04, 1],
                }}
                className="font-sans font-light text-2xl "
              >
                Hi, and welcome to my corner of the Internet. My name is Jakub
                Sekula.
              </motion.p>
              <motion.p
                variants={variants}
                transition={{
                  duration: 0.3,
                  ease: [0.36, 0.66, 0.04, 1],
                }}
                className="font-sans font-light text-2xl pb-8 "
              >
                I’m an{" "}
                <span
                  variants={variants}
                  transition={{
                    type: "linear",
                    duration: 0.3,
                    ease: [0.36, 0.66, 0.04, 1],
                  }}
                  className="font-bold text-js-green"
                >
                  engineer
                </span>
                ,{" "}
                <span
                  variants={variants}
                  transition={{
                    type: "linear",
                    duration: 0.3,
                    ease: [0.36, 0.66, 0.04, 1],
                  }}
                  className="font-bold text-js-yellow"
                >
                  developer
                </span>
                ,{" "}
                <span
                  variants={variants}
                  transition={{
                    type: "linear",
                    duration: 0.3,
                    ease: [0.36, 0.66, 0.04, 1],
                  }}
                  className="font-bold text-js-blue"
                >
                  photographer
                </span>
                , and{" "}
                <span
                  variants={variants}
                  transition={{
                    type: "linear",
                    duration: 0.3,
                    ease: [0.36, 0.66, 0.04, 1],
                  }}
                  className="font-bold text-js-red"
                >
                  tinkerer
                </span>
                .
              </motion.p>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: -16},
                  visible: { opacity: 1, y: 0},
                }}
                transition={{
                  delay:3.75,
                  duration: 0.3,
                  ease: [0.36, 0.66, 0.04, 1],
                }}
                className="text-js-yellow"
              >
                <IconChevronDown size={40} />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
        <AnimatePresence>
          <motion.div
            layout
            initial="hidden"
            animate="visible"
            variants={grid}
            className="grid grid-cols-12 w-full gap-4 mt-6"
          >
            <HeroCard className="col-span-8" title="WEB DEV" color="yellow" />
            <HeroCard
              className="col-span-4"
              title="ENGINEERING"
              color="green"
            />
            <HeroCard className="col-span-4" title="TOOLS" color="red" />
            <HeroCard className="col-span-8" title="PHOTOGRAPHY" color="blue" />
            <HeroCard className="col-span-8" title="ABOUT" color="green" />
            <HeroCard className="col-span-4" title="CONTACT" color="yellow" />
            <HeroCard className="col-span-4" title="CV" color="yellow" />
            <HeroCard className="col-span-8" title="BLOG" color="red" />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
