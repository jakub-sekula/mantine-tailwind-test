"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { IconChevronUp, IconChevronDown } from "@tabler/icons";

import { ApiAlbumAlbum } from "../../../types/strapi/contentTypes";

export default function SidebarNavigation({ data }: { data: ApiAlbumAlbum[] }) {
  return (
    <aside
      className={clsx(
        "hidden h-full w-full max-w-[20%] flex-col gap-6 px-4 py-12 pb-px text-text backdrop-blur-lg transition-all duration-200 dark:bg-darkbg/70 dark:text-darktext md:flex"
      )}
    >
      <NavLink label="All albums" href="/photography" />
      {data
        ? data.map((item: ApiAlbumAlbum) => {
            if (item.attributes.type === "album") {
              return (
                <NavLink
                  key={`${item.attributes.slug}-menuLink`}
                  label={item.attributes.title}
                  href={`/photography/${item.attributes.slug}`}
                />
              );
            } else {
              return (
                <NestedNavLinks
                  key={`${item.attributes.slug}-nestedMenu`}
                  links={item.attributes.albums.data}
                  title={item.attributes.title}
                  slug={item.attributes.slug}
                />
              );
            }
          })
        : null}
    </aside>
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
    if (path.toLowerCase() === title.toLowerCase()) setExpanded(true);
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
              key={`${link.attributes.slug}-menuLink`}
              label={link.attributes.title}
              href={`/photography/${link.attributes.slug}`}
            />
          );
        })}
      </div>
    </div>
  );
}
