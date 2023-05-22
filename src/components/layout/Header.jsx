"use client";

import Link from "next/link";
import { ColorSchemeToggle } from "@components/common";
import { useRouter, usePathname } from "next/navigation";
import { useScrollDirection, useScrollPosition } from ".";
import { useEffect, useState } from "react";
import { reveal } from "@lib/utils";

export default function Header({ menuLinks = [] }) {
  const { scrollDirection } = useScrollDirection();
  const { scrollPosition } = useScrollPosition();
  const [heroHeight, setHeroHeight] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      setHeroHeight(document.getElementById("hero-section").clientHeight);
    }

    reveal();
  }, [heroHeight, pathname]);

  console.log(heroHeight - scrollPosition);

  return (
    <header
      className={`sticky border-transparent pb-px text-darktext backdrop-blur-lg

      ${pathname === "/" ? "text-darktext" : "text-text"}
      ${
        scrollPosition < heroHeight && pathname === "/"
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
          {!!menuLinks?.length ? (
            menuLinks.map((link) => {
              return (
                <NavLink
                  key={link.title}
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

function NavLink({ label, href, color = "red", ...props }) {
  const router = useRouter();
  const selected = router.pathname === href;
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

const COLORS = {
  red: "after:bg-js-red",
  green: "after:bg-js-green",
  blue: "after:bg-js-blue",
  yellow: "after:bg-js-yellow",
};
