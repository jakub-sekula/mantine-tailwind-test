"use client";

import Link from "next/link";
import { ColorSchemeToggle } from "@components/common";
import { usePathname } from "next/navigation";
import { IconChevronLeft, IconChevronUp, IconChevronDown } from "@tabler/icons";
import clsx from "clsx";

import { cleanPhotosData } from "@/lib/cleanPhotosData";
import { useEffect, useState } from "react";

export default function SidebarNavigation({ data }: { data: any }) {
  const filtered = cleanPhotosData(data.data);

  return (
    <header
      className={clsx(
        "z-50 hidden h-full w-full max-w-[20%] flex-col gap-6 px-12 py-12 pb-px text-text backdrop-blur-lg transition-all duration-200 dark:bg-darkbg/70 dark:text-darktext md:flex"
      )}
    >
      <Link
        href="/#Photography-section"
        className="mb-4 flex items-center gap-1 text-sm font-light"
      >
        <IconChevronLeft size={16} />
        Back to main site
      </Link>
      <NavLink label="All albums" href="/photography" />
      {filtered
        ? Object.keys(filtered).map((item: any) => {
            if (filtered[item].length === 1) {
              return (
                <NavLink
                  key={`${filtered[item][0]?.slug}-menuLink`}
                  label={filtered[item][0].title}
                  href={`/photography/${filtered[item][0].slug}`}
                />
              );
            }
            return (
              <NestedNavLinks
                key={`nestedMenu-${item}`}
                links={filtered[item]}
                title={item}
                slug={item.toLowerCase()}
              />
            );
          })
        : null}
      <ColorSchemeToggle className="mt-6" />
    </header>
  );
}

function NavLink({ label, href, color = "red", className }: any) {
  const path = usePathname();
  const selected = path === href;
  return (
    <Link
      className={clsx(
        "font-headings relative text-sm font-light uppercase",
        selected ? "font-semibold" : "opacity-75",
        className
      )}
      href={href}
    >
      {label}
    </Link>
  );
}

function NestedNavLinks({ title, slug, links }: any) {
  let path = usePathname();
  path = path.split("/")[path.split("/").length - 1];

  // Dropdown opens automaticaly if navigating to top level category page
  const [expanded, setExpanded] = useState<boolean>(
    path.toLowerCase() === title.toLowerCase()
  );

  // Open dropdown when top level category is selected
  useEffect(() => {
    if(path.toLowerCase() === title.toLowerCase())  setExpanded(true);
  }, [path]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <NavLink label={title} href={`/photography/${slug}`} />
        <button
          className="w-full p-1 pl-2"
          onClick={() => {
            setExpanded((prev) => !prev);
          }}
        >
          {expanded ? (
            <IconChevronUp size={14} />
          ) : (
            <IconChevronDown size={14} />
          )}
        </button>
      </div>
      <div
        className={clsx(
          "ease flex origin-top flex-col overflow-hidden transition-all duration-500"
        )}
        style={
          expanded
            ? { maxHeight: `${(links.length + 1) * 28}px` }
            : { maxHeight: "0" }
        }
      >
        {links.map((link: any) => {
          return (
            <NavLink
              className={"ml-2 mt-3 text-xs"}
              key={`${link.slug}-menuLink`}
              label={link.title}
              href={`/photography/${link.slug}`}
            />
          );
        })}
      </div>
    </div>
  );
}
