import { AnimatePresence } from "framer-motion";
import { Header, Footer } from "components/layout";

export default function Providers({ Component, pageProps, router }) {
  return (
    <>
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
    </>
  );
}
