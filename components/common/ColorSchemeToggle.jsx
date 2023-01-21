import {
  ActionIcon,
  Group,
} from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function ColorSchemeToggle() {
  const { theme, systemTheme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
 
  }
  const toggleColorScheme = (value) => {
    const currentTheme = theme === "system" ? systemTheme : theme
    setTheme(value || (currentTheme === "dark" ? "light" : "dark"));
  };

  return (
    // <Group position="center" my="xl">
    <button onClick={()=>{toggleColorScheme()}} className="text-gray-500 dark:text-yellow-500">
    {resolvedTheme === 'dark' ? <IconMoonStars size={18} /> : <IconSun size={18} />}
  </button>
    // </Group>
  );
}
