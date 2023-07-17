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
        "mt-8 flex h-fit w-full items-center justify-center gap-4 md:mt-0 md:block md:h-[18px] md:w-[18px]",
        className
      )}
      onClick={() => toggleColorScheme()}
      key={resolvedTheme === "dark" ? "dark-icon" : "light-icon"}
    >
      {mounted && resolvedTheme === "dark" ? (
        <IconMoonStars size={18} />
      ) : (
        <IconSun size={18} />
      )}
      <span className="inline-block md:hidden">TOGGLE THEME</span>
    </button>
  );
}
