import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";

const variants = {
  hidden: { opacity: 0, x: 200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

export default function Layout({ children }) {
  return (
    <motion.main
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{
        type: "linear",
        duration: 0.4,
        ease: [0.36, 0.66, 0.04, 1],
      }}
      className="relative z-0 flex h-full w-full flex-col items-center
      gap-24 overflow-hidden"
    >
      {children}
    </motion.main>
  );
}
