"use client";

import Link from "next/link";
import { ColorSchemeToggle } from "@components/common";
import { usePathname } from "next/navigation";
import { useScrollDirection, useScrollPosition } from ".";
import { RefObject, useEffect, useRef, useState } from "react";
import { reveal } from "@lib/utils";
import clsx from "clsx";
import { IconMenu, IconX } from "@tabler/icons";
import { ApiMenuMenu } from "../../../types/strapi/contentTypes";
import { MenuLink } from "../../../types/strapi/components";

const COLORS: Record<string, string> = {
  red: "after:bg-js-red",
  green: "after:bg-js-green",
  blue: "after:bg-js-blue",
  yellow: "after:bg-js-yellow",
};

export default function HeaderNew({
  menuItems,
}: {
  menuItems: Array<MenuLink["attributes"]>;
}) {
  const { scrollDirection } = useScrollDirection();
  const { scrollPosition } = useScrollPosition();
  const [heroHeight, setHeroHeight] = useState<number | undefined>(0);
  const pathname = usePathname();
  const buttonRef = useRef<any>();
  const siteNavigationRef = useRef<any>();
  const headerRef = useRef<any>();

  useEffect(() => {
    if (pathname === "/") {
      const heroSection = document?.getElementById("hero-section");
      setHeroHeight(heroSection?.clientHeight);
    }
    reveal();
  }, [heroHeight, pathname]);

  function toggleActive() {
    const isActive = buttonRef.current.getAttribute("data-active") === "true";
    buttonRef.current.setAttribute("data-active", String(!isActive));
    siteNavigationRef.current.setAttribute("data-active", String(!isActive));
    headerRef.current.setAttribute("data-active", String(!isActive));
    document.body.classList.toggle("no-scroll", !isActive);
  }

  useEffect(() => {
    buttonRef.current.setAttribute("data-active", String(false));
    siteNavigationRef.current.setAttribute("data-active", String(false));
    headerRef.current.setAttribute("data-active", String(false));
    document.body.classList.remove("no-scroll");
  }, [pathname]);

  const textColor =
    heroHeight && scrollPosition < heroHeight - 200 && pathname === "/"
      ? "text-darktext stroke-darktext"
      : " dark:text-darktext  md:text-text dark:stroke-darktext  md:stroke-text ";

  const strokeColor =
    heroHeight && scrollPosition < heroHeight - 200 && pathname === "/"
      ? "stroke-darktext"
      : "dark:stroke-darktext  stroke-text ";

  return (
    <header
      data-active={false}
      ref={headerRef}
      className={clsx(
        pathname === "/" ? "text-darktext" : "text-text",
        scrollDirection === "down" ? "-top-16" : "top-0",

        heroHeight && scrollPosition < heroHeight - 200 && pathname === "/"
          ? "text-darktext"
          : "data-[active=false]:bg-white/90  dark:text-darktext  dark:data-[active=false]:bg-darkbg/90  dark:data-[active=false]:backdrop-blur-md md:text-text ",

        heroHeight && scrollPosition < heroHeight - 200 && pathname === "/"
          ? null
          : "data-[active=false]:bg-white/90    dark:data-[active=false]:bg-darkbg/90  dark:data-[active=false]:backdrop-blur-md ",
        textColor,

        "group fixed z-50 flex h-screen max-h-16 w-full shrink-0 flex-col items-baseline justify-between gap-8 overflow-hidden  px-6 py-4 transition-all delay-100 duration-300 ease-out  data-[active=true]:top-0 data-[active=true]:max-h-screen data-[active=true]:bg-black dark:text-darktext  md:h-auto  md:max-h-full md:w-full md:flex-row md:border-r md:bg-transparent "
      )}
    >
      <div className="flex w-full items-center justify-between">
        <Link href="/" rel="home">
          {/* <DotsLogo /> */}
          <div className="mx-auto flex w-full flex-col items-start justify-center gap-2 font-mono  md:mx-0  md:flex-row md:items-center md:justify-start">
            <span className={clsx("font-bold")}>
              <span className="text-js-yellow">
                jakubsekula<span className="text-js-blue">@personal</span>:
              </span>
              <span className="text-white">~</span>
              <span className="text-js-blue">$</span>
            </span>
          </div>
        </Link>
        <button
          ref={buttonRef}
          id="nav-menu-toggle"
          className="group flex h-8 w-8 flex-col items-center justify-end overflow-hidden border-none bg-transparent p-0 text-xs md:hidden"
          aria-controls="primary-menu"
          aria-expanded="false"
          data-active="false"
          onClick={() => toggleActive()}
        >
          <i className="h-8 w-8 p-1 group-data-[active=false]:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full stroke-white"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M18 6l-12 12" />
              <path d="M6 6l12 12" />
            </svg>
          </i>

          <i className="h-8 w-8 p-1 group-data-[active=true]:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={clsx("h-full w-full", strokeColor)}
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 6l16 0" />
              <path d="M4 12l16 0" />
              <path d="M4 18l16 0" />
            </svg>
          </i>
        </button>
      </div>

      <nav
        ref={siteNavigationRef}
        id="site-navigation"
        className="h-full w-full opacity-0 transition-opacity delay-200 duration-150 ease-out data-[active=true]:opacity-100 md:opacity-100"
        data-active="false"
      >
        <ul className="flex h-full w-full flex-col items-center md:flex-row md:justify-end md:gap-14 md:pt-0">
          {!!menuItems?.length ? (
            menuItems
              .filter((link) => link.enabled)
              .map((link) => {
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
    </header>
  );
}

function NavLink({ label, href, color = "red", ...props }: any) {
  const path = usePathname();
  const selected = `/${path.split("/")[1]}` === href;
  return (
    <li
      className={
        "w-full border-b border-text text-lg md:m-0 md:w-fit md:border-none md:p-0"
      }
    >
      <Link
        {...props}
        href={href}
        className={clsx(
          `font-headings border-text-10 relative flex h-fit w-full grow-0 items-center py-4 transition-all md:transition-none duration-200 after:absolute after:-bottom-1 after:left-0 after:-z-10 after:h-[2px] after:w-full after:opacity-0 after:transition-all after:duration-300 hover:after:opacity-100  hover:dark:bg-darkbg/50  md:h-min md:justify-center md:border-none md:py-0 md:text-sm`,
          selected ? "md:after:opacity-100" : null,
          COLORS?.[color]
        )}
      >
        {label}
      </Link>
    </li>
  );
}
