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
  const data = await getData();
  return (
    <div className="flex h-full min-h-screen">
      <SidebarNavigation data={data} />
      <main className="flex h-full w-full md:max-w-[80%] flex-col ">
        {children}
      </main>
    </div>
  );
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
