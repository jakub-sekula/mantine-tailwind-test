import { Metadata } from "next";
import { Footer, Header } from "@components/layout";
import "@/styles/globals.css";
import ThemeWrapper from "@components/contexts/ThemeWrapper";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Next.js",
};

export default async function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  const menuLinks = await getMenuLinks();
  return (
    <html lang="en" className="">
      <head></head>
      <body className="bg-lightbg font-sans text-text dark:bg-darkbg dark:text-darktext">
        <Header menuLinks={menuLinks} />
        <ThemeWrapper>{children}</ThemeWrapper>
        <Footer />
      </body>
    </html>
  );
}

async function getMenuLinks() {
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
