import { useState } from "react";
import { useHeadingsData } from "./useHeadingsData";
import { useIntersectionObserver } from "./useIntersectionObserver";
import { useTheme } from "next-themes";

const colors = {
  dark: {
    default: "border-darktext/10 text-darktext/50 dark:border-text/10",
    active: "border-js-yellow text-text dark:text-darktext",
  },
  light: {
    default: "border-text/10 text-text/50 dark:border-darktext/10",
    active: "border-js-yellow text-text dark:text-darktext",
  },
};

export default function TableOfContents({ depth = 1, border = true }) {
  const { resolvedTheme } = useTheme();
  const [activeId, setActiveId] = useState();
  const { nestedHeadings } = useHeadingsData();
  useIntersectionObserver(setActiveId, depth);

  return (
    <>
      {nestedHeadings.map((heading) => (
        <li
          key={heading.id}
          className={`${
            heading.id === activeId
              ? `${
                  resolvedTheme === "dark"
                    ? colors.dark.active
                    : colors.light.active
                }`
              : `${
                  resolvedTheme === "dark"
                    ? colors.dark.default
                    : colors.light.default
                }`
          } ${
            border ? "border-r-2 pr-4" : ""
          } pb-3 transition-all duration-100`}
        >
          <a
            onClick={(e) => {
              e.preventDefault();
              document.querySelector(`#${heading.id}`).scrollIntoView({
                behavior: "smooth",
              });
            }}
            href={`#${heading.id}`}
            className="hover:text-text dark:hover:text-darktext"
          >
            {heading.title}
          </a>
          {depth === 2 && heading.items.length > 0 && (
            <ul className="pt-3">
              {heading.items.map((child) => (
                <li
                  key={child.id}
                  className={`${
                    child.id === activeId
                      ? `${
                          resolvedTheme === "dark"
                            ? colors.dark.active
                            : colors.light.active
                        }`
                      : `${
                          resolvedTheme === "dark"
                            ? colors.dark.default
                            : colors.light.default
                        }`
                  }  mb-4 last:mb-0 pl-2 text-sm transition-all duration-100`}
                >
                  <a
                    href={`#${child.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(`#${child.id}`).scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                    className="transition-all duration-200 hover:text-text dark:hover:text-darktext"
                  >
                    {child.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </>
  );
}
