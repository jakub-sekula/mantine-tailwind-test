import { useState } from "react";
import { useHeadingsData } from "./useHeadingsData";
import { useIntersectionObserver } from "./useIntersectionObserver";

export default function TableOfContents({ depth = 1, border = true }) {
  const [activeId, setActiveId] = useState();
  const { nestedHeadings } = useHeadingsData();
  useIntersectionObserver(setActiveId);

  return (
    <>
      {nestedHeadings.map((heading) => (
        <li
          key={heading.id}
          className={`${
            heading.id === activeId
              ? `border-js-yellow`
              : `border-text/10 text-text/50 dark:border-darktext/10`
          } ${
            border ? "border-r-2 pr-4" : ""
          } pb-3  transition-all duration-200`}
        >
          <a
            onClick={(e) => {
              e.preventDefault();
              document.querySelector(`#${heading.id}`).scrollIntoView({
                behavior: "smooth",
              });
            }}
            href={`#${heading.id}`}
            className="hover:text-text"
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
                      ? "border-js-yellow text-text"
                      : "border-text/10 text-text/50 dark:border-darktext/10"
                  } mb-1 pl-1 text-xs transition-all duration-500`}
                >
                  <a
                    href={`#${child.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(`#${child.id}`).scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                    className="hover:text-text transition-all duration-200"
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
