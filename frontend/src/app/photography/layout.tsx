import { Metadata } from "next";
import "@/styles/globals.css";
import { Header, SidebarNavigation } from "@/components/layout";

export const metadata: Metadata = {
  title: "Photography home - Jakub Sekula",
  description: "A place for sharing my photography work",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getData();
  const menuItems = await getMenuItems();
  return (
    <>
      <Header menuItems={menuItems} />
      <div className="mx-auto flex h-full min-h-screen max-w-page w-full md:w-screen">
        <SidebarNavigation data={data} />
        <main className="flex h-full w-full flex-col md:max-w-[80%] md:pr-4 lg:pr-0 pt-2 pb-4 md:pt-4 lg:pt-0 px-4 md:px-0">
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

async function getData() {
  const headers = new Headers({
    Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  });

  let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/albums`, {
    headers: headers,
  });

  let json = await res.json();

  return {
    data: json.data,
  };
}
