import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Header, Footer } from "components/layout";
import { MotionConfig, motion } from "framer-motion";
import { SiteAnimationProvider } from "./SiteAnimation";

export default function Providers({ Component, pageProps, router }) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <SiteAnimationProvider>
          <MotionConfig reducedMotion="user">
              <AnimatePresence>
                <Header />
              </AnimatePresence>
              <AnimatePresence
                mode="wait"
                initial={false}
                onExitComplete={() => {window.scrollTo(0,0)}}
              >
                <motion.div key={router.pathname}>
                  <Component {...pageProps} />
                </motion.div>
              </AnimatePresence>
              <Footer />
          </MotionConfig>
        </SiteAnimationProvider>
      )}
    </>
  );
}
