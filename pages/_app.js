import "/styles/globals.css";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "next-themes";
import { AnimationContext } from "components/contexts";
import { LayoutProvider } from "components/contexts";

export default function App({ Component, pageProps, router }) {

  return (
    <AnimationContext>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <LayoutProvider>
          <AnimatePresence
            mode="wait"
            initial={false}
            onExitComplete={() => {
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
