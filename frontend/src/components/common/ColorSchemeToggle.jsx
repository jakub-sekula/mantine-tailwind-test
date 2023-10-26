"use client";
import { IconSun, IconMoonStars } from "@tabler/icons";
import clsx from "clsx";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function ColorSchemeToggle({ className = "" }) {
  const { theme, systemTheme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleColorScheme = (value) => {
    const currentTheme = theme === "system" ? systemTheme : theme;
    setTheme(value || (currentTheme === "dark" ? "light" : "dark"));
  };

  return (
    <button
      aria-label="colour-theme-toggle"
      className={clsx(
        "font-headings  relative mt-auto flex h-fit w-full grow-0 flex-row-reverse items-center justify-between border-t border-text pt-4 pb-8 text-lg  md:m-0 md:mt-0 md:block md:h-[18px] md:w-[18px]",
        className
      )}
      onClick={() => toggleColorScheme()}
      key={resolvedTheme === "dark" ? "dark-icon" : "light-icon"}
    >
      {mounted && resolvedTheme === "dark" ? (
        <i className="h-6 w-6">
          <IconMoonStars size={18} className="h-full w-full" />
        </i>
      ) : (
        <i className="h-6 w-6">
          <IconSun size={18} className="h-full w-full" />
        </i>
      )}
      <span className="inline-block md:hidden">Toggle theme</span>
    </button>
  );
}
