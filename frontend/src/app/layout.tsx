import "@/styles/globals.css";
import ThemeWrapper from "@components/contexts/ThemeWrapper";


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-lightbg font-sans text-text dark:bg-darkbg dark:text-darktext">
        <div className="bg-noisy dark:opacity-50 opacity-0 " />
        <ThemeWrapper>
          {children}
          </ThemeWrapper>
      </body>
    </html>
  );
}

