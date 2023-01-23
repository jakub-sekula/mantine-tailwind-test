import { Layout } from "components/layout";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { customEaseTransition } from "siteConfig";
import { useEffect, useState } from "react";
import { useSiteAnimationContext } from "components/providers";

export default function About() {
  const router = useRouter();
  const [defaultTransition, setDefaultTransition] = useState(false);
  const { animationsDisabled } = useSiteAnimationContext();

  useEffect(() => {
    setDefaultTransition(true);
  }, []);

  const activeCardAnimation = !animationsDisabled
    ? {
        layoutId: defaultTransition ? null : 10,
        initial: "visible",
        animate: "visible",
        exit: "visible",
        transition: customEaseTransition,
      }
    : {};

  const otherCardAnimation = !animationsDisabled
    ? {
        initial: "initial",
        animate: "enter",
        exit: "exit",
        variants: {
          initial: { opacity: 0 },
          enter: { opacity: 1 },
          exit: { opacity: 0, scale: 0.95 },
        },
        transition: customEaseTransition,
      }
    : {};

  const alternateTransition = {
    // initial: "hidden",
    // animate: "enter",
    // exit: "exit",
    // variants: {
    //   hidden: { opacity: 0 , scale:0.95},
    //   enter: { opacity: 1 , scale: 1.05},
    //   exit: { opacity: 0, scale:  0.95},
    // },
    // transition: {
    //   duration: 1.5,
    //   ease: [0.36, 0.66, 0.04, 1],
    // },
  };

  return (
    <Layout
      defaultTransition={defaultTransition}
      alternateTransition={alternateTransition}
    >
      <motion.div className=" flex items-center justify-center gap-12">
        <motion.div
          {...activeCardAnimation}
          onClick={() => {
            // setDefaultTransition(false);
            router.push("/work");
          }}
          className=" flex h-96 w-96 items-center justify-center rounded-md bg-js-blue text-center text-5xl font-bold"
        >
          <motion.h1 {...otherCardAnimation}>World</motion.h1>
        </motion.div>

        <motion.div
          {...otherCardAnimation}
          className="flex h-96 w-96 items-center justify-center rounded-md bg-js-green text-center text-5xl font-bold"
        />
      </motion.div>
    </Layout>
  );
}
