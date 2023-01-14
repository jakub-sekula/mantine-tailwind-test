import "@/styles/globals.css";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { useColorScheme, useLocalStorage } from "@mantine/hooks";
import { use, useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "mantine-color-scheme",
    defaultValue: preferredColorScheme,
    getInitialValueInEffect: true,
  });

  useEffect(()=>{
    console.log(`Preferred: ${preferredColorScheme}`)
  },[preferredColorScheme])

  const toggleColorScheme = (value) => {
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  };
  
  useEffect(() => {
    document.documentElement.className = colorScheme;
  }, [colorScheme]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider theme={{ colorScheme }} withNormalizeCSS>
        <Component {...pageProps} />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

