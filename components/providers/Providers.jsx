import { useTheme } from "next-themes";
import { MantineProvider, createEmotionCache } from "@mantine/core";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Header, Footer } from "components/layout";
import { MotionConfig, motion } from "framer-motion";
import { SiteAnimationProvider } from "./SiteAnimation";

// Used to load Mantine styles after Tailwind preflight. Prevents styling issues e.g. invisible buttons
// Source: https://stackoverflow.com/questions/72083381/load-mantine-styles-after-tailwind-preflight
const myCache = createEmotionCache({
  key: "mantine",
  prepend: false,
});

export default function Providers({ Component, pageProps, router }) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  // Use to prevent hydration error in Mantine
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <SiteAnimationProvider>
          <MotionConfig reducedMotion="user">
            <MantineProvider
              theme={{ colorScheme: resolvedTheme }}
              emotionCache={myCache}
              withNormalizeCSS
            >
              <Header />
              <AnimatePresence
                mode="wait"
                initial={false}
                // onExitComplete={() => window.scrollTo(0, 0)}
              >
                <motion.div key={router.pathname}>
                  <Component {...pageProps}  />
                </motion.div>
              </AnimatePresence>
              {/* <Footer /> */}
            </MantineProvider>
          </MotionConfig>
        </SiteAnimationProvider>
      )}
    </>
  );
}
