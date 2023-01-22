import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
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
  return (
    <motion.div
      key="jdhsgfcvtsdsf"
      className="relative mx-auto grid w-full max-w-page grid-cols-12 
    gap-4 py-36 text-center"
    >
      <motion.div
        onClick={() => {
          router.push("/about");
        }}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={selected}
        layoutId={10}
        key="dhjsfasd"
        transition={transition}
        className="col-span-4 flex h-20 items-center justify-center 
        rounded-md bg-js-yellow text-5xl font-bold "
      >
        Hello
      </motion.div>
      <motion.div
        initial="initial"
        animate="enter"
        exit="exit"
        variants={others}
        transition={transition}
        key="jnsdbfgsdvgyf"
        className="col-span-4 flex h-20 items-center justify-center 
        rounded-md bg-js-yellow text-5xl font-bold "
      >
        This is shit
      </motion.div>
    </motion.div>
  );
}
