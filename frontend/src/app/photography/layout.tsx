import { Metadata } from "next";
import "@/styles/globals.css";
import { HeaderNew, SidebarNavigation } from "@/components/layout";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getData();
  const menuItems = await getMenuItems();
  return (
    <>
      <HeaderNew menuItems={menuItems} />
      <div className="mx-auto flex h-full min-h-screen w-full max-w-page md:w-screen pt-16">
        <SidebarNavigation data={data} />
        <main className="flex h-full w-full flex-col px-4 pb-4 pt-2 md:max-w-[80%] md:px-0 md:pr-4 md:pt-4 lg:pr-0 lg:pt-0">
          {children}
        </main>
      </div>
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

async function getData() {
  const qs = require("qs");

  const headers = new Headers({
    Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  });

  let query = qs.stringify({
    filters: {
      slug: {
        $eq: "photos-sidebar",
      },
      
    },
    populate: {
      albums: {
        populate: "*"
      }
    },
  });

  let res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/menus?${query}`,
    {
      headers: headers,
    }
  );

  let json = await res.json();

  return json.data[0].attributes.albums.data
}
