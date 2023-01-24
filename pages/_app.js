import "/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { Providers } from "components/providers";
import { SiteAnimationProvider } from "components/providers";

export default function App({ Component, pageProps, router }) {
  return (
    <SiteAnimationProvider>
      <ThemeProvider attribute="class">
        <Providers
          Component={Component}
          pageProps={pageProps}
          router={router}
        />
      </ThemeProvider>
    </SiteAnimationProvider>
  );
}
