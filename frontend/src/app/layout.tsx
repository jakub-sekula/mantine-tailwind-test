import { Metadata } from "next";
import "@/styles/globals.css";
import ThemeWrapper from "@components/contexts/ThemeWrapper";

export const metadata: Metadata = {
  title: "Jakub Sekula - Homepage",
  description: "Welcome to my personal portfolio and blog.",
};

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

async function getMenuItems() {
  const qs = require("qs");

  let menuQuery = qs.stringify({
    populate: "links",
    filters: {
      name: {
        $eq: "Header",
      },
    },
  });

  let menu = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/menus?${menuQuery}`
  );

  const menuJson = await menu.json();

  return menuJson.data[0].attributes.links;
}
