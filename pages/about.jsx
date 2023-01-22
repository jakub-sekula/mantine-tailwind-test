import { Layout } from "components/layout";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { transition } from "../dummyData";

const variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0, scale:0.95 },
};

const selected = {
  initial: { opacity: 1 },
  enter: { opacity: 1 },
  exit: { opacity: 1},
};

export default function About() {
  const router = useRouter();

  const activeCardProps = {
    key: "rfeuy",
    layoutId: 10,
    initial: "hidden",
    animate: "enter",
    exit: "exit",
    variants: selected,
    onClick: () => {
      router.push("/work");
    },
    transition: transition
    
  };

  const otherCardProps = {
    key: "3rde4fc",
    initial: "hidden",
    animate: "enter",
    exit: "exit",
    variants: variants,
    transition: transition
  };

  return (
    <motion.div
      
      className="fixed inset-0 -z-50 flex items-center justify-center gap-12"
    >
      <motion.div
        {...activeCardProps}
        className=" flex h-96 w-96 items-center justify-center rounded-md bg-js-yellow text-center text-5xl font-bold"
      />

      <motion.div
        {...otherCardProps}
        className="flex h-96 w-96 items-center justify-center rounded-md bg-js-yellow text-center text-5xl font-bold"
      />
    </motion.div>
  );
}
