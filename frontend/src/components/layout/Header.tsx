"use client";

import Link from "next/link";
import { ColorSchemeToggle } from "@components/common";
import { usePathname } from "next/navigation";
import { useScrollDirection, useScrollPosition } from ".";
import { useEffect, useState } from "react";
import { reveal } from "@lib/utils";
import clsx from "clsx";
import { IconMenu, IconX } from "@tabler/icons";

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
  const [open, setOpen] = useState<boolean>(false);
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
      className={clsx(
        pathname === "/" ? "text-darktext" : "text-text",

        heroHeight && scrollPosition < heroHeight && pathname === "/"

          ? "dark:text-darktext md:bg-transparent md:text-darktext"
          : "dark:text-darktext bg-transparent md:bg-white/95 md:text-text  md:dark:bg-darkbg/75",

        open
          ? "fixed bg-white text-text dark:bg-darkbg dark:text-darktext"
          : " sticky dark:text-darktext",

        scrollDirection === "down" ? "-top-16" : "top-0",

        "z-50 flex h-full w-full  justify-center border-transparent px-6 pb-px transition-[top] duration-200 md:sticky md:h-16 md:items-center backdrop-blur-lg xl:px-4 2xl:px-0"
      )}
    >
      <div className="flex w-screen max-w-page flex-col md:flex-row">
        <div className="flex w-full items-center justify-between">
          <Link
            href="/"
            className="mx-auto flex h-16 w-full flex-col items-start justify-center md:items-center gap-2 font-mono  md:mx-0 md:flex-row md:justify-start"
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
          <button
            className="md:hidden"
            onClick={() => {
              setOpen((open) => !open);
            }}
          >
            {open ? <IconX size={20} /> : <IconMenu size={20} />}
          </button>
        </div>
        <nav
          className={clsx(
            open
              ? "h-full overflow-y-auto"
              : "h-0 shrink-0 overflow-hidden md:h-auto",
            ""
          )}
        >
          <ul className="flex h-full w-full flex-col items-center pt-4 uppercase md:flex-row md:gap-14 md:pt-0 md:normal-case">
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
          </ul>
        </nav>
      </div>
    </header>
  );
}

function NavLink({ label, href, color = "red", ...props }: any) {
  const path = usePathname();
  const selected = `/${path.split("/")[1]}` === href;
  return (
    <li
      className={`font-headings border-text-10 relative flex h-fit w-full grow-0 items-center justify-center border-b py-6 transition-all duration-200 after:absolute after:-bottom-1 after:left-0 after:-z-10 after:h-[2px] after:w-full after:opacity-0 after:transition-all after:duration-300 hover:border-transparent hover:after:opacity-100 dark:border-darktext/10 hover:dark:bg-darkbg/50 md:h-min md:border-none md:py-0 md:text-sm ${
        selected ? "after:opacity-100" : null
      } ${COLORS?.[color]}`}
    >
      <Link {...props} href={href}>
        {label}
      </Link>
    </li>
  );
}
