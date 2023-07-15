"use client";

import Link from "next/link";
import { ColorSchemeToggle } from "@components/common";
import { usePathname } from "next/navigation";
import { IconChevronLeft } from "@tabler/icons";
import clsx from "clsx";

import { cleanPhotosData } from "@/lib/cleanPhotosData";

export default function SidebarNavigation({ data }: { data: any }) {
  const filtered = cleanPhotosData(data.data)

  return (
    <header
      className={clsx(
        "z-50 hidden h-full w-full max-w-[20%] flex-col gap-6 px-12 py-12 pb-px text-text backdrop-blur-lg transition-all duration-200 dark:bg-darkbg/70 dark:text-darktext md:flex"
      )}
    >
      <Link
        href="/"
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
  return (
    <div className="flex flex-col">
      <NavLink label={title} href={`/photography/${slug}`} />

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
  );
}

