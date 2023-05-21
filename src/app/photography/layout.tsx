import { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Srańsko mocne",
  description: "Welcome to Next.js",
};

export default async function Layout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    sranieeeee
    {children}
    </>
  );
}

