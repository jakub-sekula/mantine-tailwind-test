import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSiteAnimationContext } from "../providers";



export default function Layout({
  children,
  defaultTransition = true,
  alternateTransition={}
}) {

  const {animationsDisabled} = useSiteAnimationContext()

  let transitionProps = {};

  const variants = {
    hidden: { opacity: 0, x: 200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
  };

  const defaultTransitionProps =  {
    initial: "hidden",
    animate: "enter",
    exit: "exit",
    variants: variants,
    transition: {
      type: "linear",
      duration: 0.4,
      ease: [0.36, 0.66, 0.04, 1],
    },
  } ;

  // const alternateTransition = {
    
  // };

  if (defaultTransition) {
    transitionProps = { ...defaultTransitionProps };
  } else {
    transitionProps = { ...alternateTransition };
  }

  return (
    <motion.main
      {...transitionProps}
      className="relative flex h-full w-full flex-col items-center
      gap-24 overflow-hidden"
    >
      {children}
    </motion.main>
  );
}
