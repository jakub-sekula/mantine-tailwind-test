import { motion, useReducedMotion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0 },
};

export default function HeroCard({ title, color, className }) {
	const shouldReduceMotion = useReducedMotion()
	console.log(shouldReduceMotion)

  const colors = {
    red: "border-js-red text-js-red",
    green: "border-js-green text-js-green",
    blue: "border-js-blue text-js-blue",
    yellow: "border-js-yellow text-js-yellow",
  };

  return (
    <motion.div
      variants={variants}
      transition={{
        duration: 0.3,
        ease: [0.36, 0.66, 0.04, 1],
      }}
	  whileHover={{ scale: 1.025 }}
      className={`${className} ${colors[color]}
	  rounded-md border-2 h-24 text-4xl font-bold flex justify-center
	  items-center font-sans select-none`}
    >
      {title}
    </motion.div>
  );
}
