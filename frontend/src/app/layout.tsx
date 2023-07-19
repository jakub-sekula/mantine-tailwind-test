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
        <ThemeWrapper>
          {children}
          </ThemeWrapper>
      </body>
    </html>
  );
}

