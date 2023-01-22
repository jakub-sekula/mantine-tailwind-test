import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Layout } from "components/layout";
import { useRouter } from "next/router";
import Link from "next/link";
import { transition } from "../dummyData";

const selected = {
  initial: { opacity: 1 },
  enter: { opacity: 1 },
  exit: { opacity: 1 },
};

const others = {
  initial: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

export default function Work() {
  const router = useRouter();
  const [defaultTransition, setDefaultTransition] = useState(false);

  useEffect(() => {
    setDefaultTransition(true);
  }, []);

  useEffect(() => {
    console.log("transition in work: ", defaultTransition);
  }, [defaultTransition]);

  const alternateTransition = {
    // initial: "hidden",
    // animate: "enter",
    // exit: "exit",
    // variants: {
    //   hidden: { opacity: 0, scale: 0.95 },
    //   enter: { opacity: 1, scale: 1.05 },
    //   exit: { opacity: 0, scale: 0.95 },
    // },
    transition: {
      duration: 0.75,
      ease: [0.36, 0.66, 0.04, 1],
    },
  };

  return (
    <Layout
      defaultTransition={defaultTransition}
      alternateTransition={alternateTransition}
    >
      <motion.div
        key="jdhsgfcvtsdsf"
        className="relative mx-auto grid h-[600px] w-full max-w-page grid-cols-12 
    gap-4 py-36 text-center"
      >
        <motion.div
          onClick={() => {
            setDefaultTransition(false);
            router.push("/about");
          }}
          initial="initial"
          animate="enter"
          exit="exit"
          variants={selected}
          layoutId={defaultTransition ? "dsadsf" : 10}
          transition={transition}
          className="col-span-4 flex h-20 items-center justify-center 
        rounded-md bg-js-yellow"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
            className="text-5xl font-bold"
          >
            Hello
          </motion.h1>
        </motion.div>
        <motion.div
          initial="initial"
          animate="enter"
          exit="exit"
          variants={others}
          transition={transition}
          className="col-span-4 flex h-20 items-center justify-center 
        rounded-md bg-js-red text-5xl font-bold "
        >
          World
        </motion.div>
      </motion.div>
    </Layout>
  );
}
