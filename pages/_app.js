import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { LayoutProvider } from "@/components/contexts";
import { useEffect } from "react";
import { reveal } from "@lib/utils";

export default function App({ Component, pageProps, router }) {
  useEffect(() => {
    reveal();
    window.addEventListener("scroll", reveal);
    // To check the scroll position on page load
    return () => {
      window.removeEventListener("scroll", reveal);
    };
  }, []);
  
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
      <LayoutProvider>
          <Component {...pageProps} key={router.asPath} />
      </LayoutProvider>
    </ThemeProvider>
  );
}
