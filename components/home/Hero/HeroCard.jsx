import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

const variants = {
  hidden: { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0 },
};

export default function HeroCard({ title, color, className, href, layoutId }) {
  const shouldReduceMotion = useReducedMotion();
  console.log(shouldReduceMotion);

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
        layoutId={layoutId}
        variants={variants}
        transition={{
          duration: 0.3,
          ease: [0.36, 0.66, 0.04, 1],
        }}
        whileHover={{ scale: 1.025 }}
		className={`${className} ${colors[color]}
	rounded-md dark:border-2 h-24 text-4xl font-bold flex justify-center
	items-center font-poppins select-none`}
      >
        <Link scroll={false} href={href || ""}>{title}</Link>
      </motion.div>
  );
}
