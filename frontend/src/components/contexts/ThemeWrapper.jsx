"use client";
import { ThemeProvider } from "next-themes";
import { useEffect } from "react";
import { reveal } from "@lib/utils";

export default function ThemeWrapper({ children }) {
  useEffect(() => {
    reveal();
    window.addEventListener("scroll", reveal);
    // To check the scroll position on page load
    return () => {
      window.removeEventListener("scroll", reveal);
    };
  }, []);
  
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange defaultTheme="dark">
      {children}
    </ThemeProvider>
  );
}
