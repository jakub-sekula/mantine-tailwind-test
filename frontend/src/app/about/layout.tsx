import { Metadata } from "next";
import { Footer, Header } from "@components/layout";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "About me - Jakub Sekula",
  description: "About me",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuItems = await getMenuItems();
  return (
    <>
      <Header menuItems={menuItems} />
      {children}
      <Footer />
    </>
  );
}

async function getMenuItems() {
  const qs = require("qs");

  let menuQuery = qs.stringify({
    populate: "links",
    filters: {
      slug: {
        $eq: "header-menu",
      },
    },
  });

  let menu = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/menus?${menuQuery}`
  );

  const menuJson = await menu.json();

  return menuJson.data[0].attributes.links;
}
