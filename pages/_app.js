import "/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { LayoutProvider } from "components/contexts";
import { ParallaxProvider } from "react-scroll-parallax";
import { useEffect } from "react";
import { reveal } from "lib/utils";

export default function App({ Component, pageProps, router }) {
  useEffect(() => {
    window.addEventListener("scroll", reveal);

    // To check the scroll position on page load
    reveal();
    return () => {
      window.removeEventListener("scroll", reveal);
    };
  }, []);
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
      <LayoutProvider>
        <ParallaxProvider>
          <Component {...pageProps} key={router.asPath} />
        </ParallaxProvider>
      </LayoutProvider>
    </ThemeProvider>
  );
}
