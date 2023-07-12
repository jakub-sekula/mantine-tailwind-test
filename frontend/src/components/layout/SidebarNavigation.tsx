"use client";

import Link from "next/link";
import { ColorSchemeToggle } from "@components/common";
import { usePathname } from "next/navigation";
import { useScrollDirection, useScrollPosition } from ".";
import { useEffect, useState } from "react";
import { reveal } from "@lib/utils";
import { IconChevronLeft } from "@tabler/icons";
import clsx from "clsx";

interface menuItem {
  id: number;
  title: string;
  url: string;
  color: string;
}

const COLORS: Record<string, string> = {
  red: "after:bg-js-red",
  green: "after:bg-js-green",
  blue: "after:bg-js-blue",
  yellow: "after:bg-js-yellow",
};

export default function SidebarNavigation({
  menuItems,
  data,
}: {
  menuItems: menuItem[];
  data: any;
}) {
  const { scrollDirection } = useScrollDirection();
  const { scrollPosition } = useScrollPosition();
  const [heroHeight, setHeroHeight] = useState<number | undefined>(0);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      const heroSection = document?.getElementById("hero-section");
      setHeroHeight(heroSection?.clientHeight);
    }
    reveal();
  }, [heroHeight, pathname]);
  console.log(data.data);
  return (
    <header
      className={`sticky border-transparent pb-px backdrop-blur-lg
      ${pathname === "/" ? "text-darktext" : "text-text"}
      ${
        heroHeight && scrollPosition < heroHeight && pathname === "/"
          ? "text-darktext"
          : "bg-white/90 text-text dark:bg-darkbg/70 dark:text-darktext"
      }
      ${
        scrollDirection === "down" ? "-top-16" : "top-0"
      } z-50 hidden min-h-screen h-full w-full max-w-[20%] flex-col px-12 py-12 transition-all duration-200 md:flex gap-4 `}
    >

      <Link
        href="/"
        className="mb-4 flex items-center gap-1 text-sm font-light"
      >
        <IconChevronLeft size={16} />
        Back to main site
      </Link>
      {!!data
        ? data.data.map((item: any) => {
          return (
            <NavLink
            key={`${item?.attributes.slug}-menuLink`}
            label={item.attributes.title}
            href={`/photography/${item.attributes.slug}`}
            color={item?.color}
            />
            );
          })
          : null}
<ColorSchemeToggle className="mt-6" />
    </header>
  );
}

function NavLink({ label, href, color = "red", ...props }: any) {
  const path = usePathname();
  const selected = path === href;
  return (
    <Link
      {...props}
      className={clsx(
        "font-headings relative text-xs font-light uppercase",
        selected ? "font-semibold after:opacity-100" : null
      )}
      href={href}
    >
      {label}
    </Link>
  );
}
