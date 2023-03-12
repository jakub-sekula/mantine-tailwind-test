import "/styles/globals.css";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "next-themes";
import { AnimationContext } from "components/contexts";
import { LayoutProvider } from "components/contexts";
import { useState, useEffect } from "react";

export default function App({ Component, pageProps, router }) {
  const [reduced, setReduced] = useState(false)

  useEffect(()=>{
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mediaQuery)
  },[])

  return (
    <AnimationContext>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <LayoutProvider>
          <AnimatePresence
            mode="wait"
            initial={false}
            onExitComplete={() => {
              if(!reduced || reduced.matches) return
              window.scrollTo(0, 0);
            }}
          >
            <Component {...pageProps} key={router.asPath} />
          </AnimatePresence>
        </LayoutProvider>
      </ThemeProvider>
    </AnimationContext>
  );
}
