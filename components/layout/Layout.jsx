import { motion } from "framer-motion";
import { useAnimationContext } from "components/contexts";
import { Header, Footer } from "components/layout";
import { useLayoutContext } from "components/contexts";

export default function Layout({
  children,
  useDefaultTransition = true,
  alternateTransition = {},
  className,
}) {
  const { defaultPageTransition } = useAnimationContext();
  const { transparent, dark, fixed } = useLayoutContext();

  let transitionProps = {};

  if (useDefaultTransition) {
    transitionProps = { ...defaultPageTransition };
  } else {
    transitionProps = { ...alternateTransition };
  }

  return (
    <>
      <Header transparent={transparent} fixed={fixed} dark={dark} />
      <motion.main
        {...transitionProps}
        key="layout"
        className={`relative mt-20 flex h-full w-full flex-col
      items-center px-6 xl:px-2 2xl:px-0  ${className && className}`}
      >
        {children}
      </motion.main>
      <Footer />
    </>
  );
}
