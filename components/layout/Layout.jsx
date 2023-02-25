import { motion } from "framer-motion";
import { useAnimationContext } from "components/contexts";
import { Header, Footer } from "components/layout";
import { useLayoutContext } from "components/contexts";

export default function Layout({
  children,
  mode,
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
      <motion.div
        {...transitionProps}
        key="layout"
        className={`relative mt-24 flex h-full w-full flex-col mx-auto
      items-center ${className && className} ${mode === "blog" ? "max-w-3xl" : ""}`}
      >
        {children}
      </motion.div>
      <Footer />
    </>
  );
}
