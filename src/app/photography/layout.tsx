import { Metadata } from "next";
import "@/styles/globals.css";
import { SidebarNavigation } from "@/components/layout";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Next.js",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuItems, data] = await Promise.all([getMenuItems(), getData()]) 
  return (
    <div className="flex h-full min-h-screen w-screen ">
      <SidebarNavigation menuItems={menuItems} data={data}/>
      <main className="flex w-full h-full flex-col overflow-scroll">{children}</main>
    </div>
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

  console.log(menuJson.data[0].attributes.links);

  return menuJson.data[0].attributes.links;
}

async function getData() {
  const qs = require("qs");

  const strapiHeaders = new Headers({
    Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  });

  let strapiQuery = qs.stringify({
    populate: ["featured_image"],
    filters: {
      showAsCategory: {
        $eq: true,
      },
    },
  });

  let strapiRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/albums?${strapiQuery}`,
    { headers: strapiHeaders }
  );

  let strapiResJson = await strapiRes.json();

  return {
    data: strapiResJson.data,
  };
}
