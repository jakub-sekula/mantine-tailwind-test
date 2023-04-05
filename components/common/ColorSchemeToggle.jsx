import { IconSun, IconMoonStars } from "@tabler/icons";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function ColorSchemeToggle() {
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
        className="w-[18px] h-[18px]"
        onClick={() => toggleColorScheme()}
        key={resolvedTheme === "dark" ? "dark-icon" : "light-icon"}
      >
        {resolvedTheme === "dark" ? (
          <IconMoonStars size={18} />
        ) : (
          <IconSun size={18} />
        )}
      </button>
  );
}
