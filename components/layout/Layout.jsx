import { motion } from "framer-motion";
import { useAnimationContext } from "components/contexts";

export default function Layout({
  children,
  useDefaultTransition = true,
  alternateTransition = {},
  className,
}) {
  const { defaultPageTransition } = useAnimationContext();

  let transitionProps = {};

  if (useDefaultTransition) {
    transitionProps = { ...defaultPageTransition };
  } else {
    transitionProps = { ...alternateTransition };
  }

  return (
    <motion.main
      {...transitionProps}
      className={`relative mt-20 flex h-full w-full flex-col
      items-center gap-36 ${className && className}`}
    >
      {children}
    </motion.main>
  );
}
