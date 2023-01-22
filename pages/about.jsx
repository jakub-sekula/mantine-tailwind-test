import { Layout } from "components/layout";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { transition } from "../dummyData";
import { useEffect, useState } from "react";
import { useSiteAnimationContext } from "components/providers";

export default function About() {
  const router = useRouter();
  const [defaultTransition, setDefaultTransition] = useState(false);
  const {animationsDisabled} = useSiteAnimationContext()

  useEffect(() => {
    setDefaultTransition(true);
  }, []);

  useEffect(() => {
    console.log("transition in about: ", defaultTransition);
  }, [defaultTransition]);

  const variants = !animationsDisabled ? {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0, scale: 0.95 },
  } : {};

  const selected = !animationsDisabled ? {
    initial: { opacity: 1 },
    enter: { opacity: 1 },
    exit: { opacity: 1, },
  } : {};

  const activeCardProps = {
    layoutId: defaultTransition ? "ewadas" : 10,
    initial: "hidden",
    animate: "enter",
    exit: "exit",
    variants: selected,
    onClick: () => {
      setDefaultTransition(false);
      router.push("/work");
    },
    transition: transition,
  };

  const otherCardProps = {
    initial: "hidden",
    animate: "enter",
    exit: "exit",
    variants: variants,
    transition: transition,
  };

  const alternateTransition = {
    // initial: "hidden",
    // animate: "enter",
    // exit: "exit",
    // variants: {
    //   hidden: { opacity: 0 , scale:0.95},
    //   enter: { opacity: 1 , scale: 1.05},
    //   exit: { opacity: 0, scale:  0.95},
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
      <motion.div className=" inset-0 -z-10 flex items-center justify-center gap-12">
        <motion.div
          {...activeCardProps}
          className=" flex h-96 w-96 items-center justify-center rounded-md bg-js-blue text-center text-5xl font-bold"
        >
          <motion.h1 {...otherCardProps}>World</motion.h1>
        </motion.div>

        <motion.div
          {...otherCardProps}
          className="flex h-96 w-96 items-center justify-center rounded-md bg-js-green text-center text-5xl font-bold"
        />
      </motion.div>
    </Layout>
  );
}
