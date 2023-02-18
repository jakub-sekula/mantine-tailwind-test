import { IconSun, IconMoonStars } from "@tabler/icons";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAnimationContext } from "components/contexts";

export default function ColorSchemeToggle() {
  const { theme, systemTheme, resolvedTheme, setTheme } = useTheme();
  const { darkModeButtonAnimation } = useAnimationContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleColorScheme = (value) => {
    const currentTheme = theme === "system" ? systemTheme : theme;
    setTheme(value || (currentTheme === "dark" ? "light" : "dark"));
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.button
        className="w-[18px] h-[18px]"
        onClick={() => toggleColorScheme()}
        key={resolvedTheme === "dark" ? "dark-icon" : "light-icon"}
        {...darkModeButtonAnimation}
      >
        {resolvedTheme === "dark" ? (
          <IconMoonStars size={18} />
        ) : (
          <IconSun size={18} />
        )}
      </motion.button>
    </AnimatePresence>
  );
}
