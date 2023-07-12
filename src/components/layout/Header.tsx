"use client";

import Link from "next/link";
import { ColorSchemeToggle } from "@components/common";
import { usePathname } from "next/navigation";
import { useScrollDirection, useScrollPosition } from ".";
import { useEffect, useState } from "react";
import { reveal } from "@lib/utils";

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

export default function Header({ menuItems }: { menuItems: menuItem[] }) {
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
      } z-50 flex h-16 w-full items-center justify-center px-6 transition-all duration-200 xl:px-4 2xl:px-0 `}
    >
      <div className="flex w-screen max-w-page">
        <Link
          href="/"
          className="mx-auto flex flex-col items-center gap-2 font-mono md:mx-0 md:mr-auto md:flex-row"
        >
          {/* <DotsLogo /> */}
          <span className="font-bold">
            <span className="text-js-yellow">
              jakubsekula<span className="text-js-blue">@personal</span>:
            </span>
            <span className="text-white">~</span>
            <span className="text-js-blue">$</span>
          </span>
        </Link>
        <nav className="hidden flex-row items-center gap-14 md:flex ">
          {!!menuItems?.length ? (
            menuItems.map((link) => {
              return (
                <NavLink
                  key={link?.title}
                  label={link.title}
                  href={link.url}
                  color={link?.color}
                />
              );
            })
          ) : (
            <>
              <NavLink label="My work" href="/projects" color="blue" />
              <NavLink label="About" href="/about" color="green" />
              <NavLink label="CV" href="/cv" color="yellow" />
              <NavLink label="Blog" href="/blog" color="red" />
            </>
          )}
          <ColorSchemeToggle />
        </nav>
      </div>
    </header>
  );
}

function NavLink({ label, href, color = "red", ...props }: any) {
  const path = usePathname();
  const selected = path === href;
  return (
    <Link
      {...props}
      className={`font-headings relative text-sm  after:absolute after:-bottom-1 after:left-0 after:-z-10 after:h-[2px] after:w-full after:opacity-0 after:transition-all after:duration-300 hover:after:opacity-100 ${
        selected ? "after:opacity-100" : null
      } ${COLORS?.[color]}`}
      href={href}
    >
      {label}
    </Link>
  );
}
