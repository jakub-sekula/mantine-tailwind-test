import "/styles/globals.css";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "next-themes";
import { AnimationContext } from "components/contexts";
import { Header, Footer } from "components/layout";

export default function App({ Component, pageProps, router }) {
  return (
    <AnimationContext>
      <ThemeProvider attribute="class">
        <AnimatePresence>
          <Header />
        </AnimatePresence>
        <AnimatePresence
          mode="wait"
          initial={false}
          onExitComplete={() => {
            window.scrollTo(0, 0);
          }}
        >
          <Component {...pageProps} key={router.pathname} />
        </AnimatePresence>
        <Footer />
      </ThemeProvider>
    </AnimationContext>
  );
}
