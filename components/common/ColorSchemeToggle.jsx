import { IconSun, IconMoonStars } from "@tabler/icons";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSiteAnimationContext } from "../providers";

export default function ColorSchemeToggle() {
  const { theme, systemTheme, resolvedTheme, setTheme } = useTheme();
  const { animationsDisabled } = useSiteAnimationContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  const toggleColorScheme = (value) => {
    const currentTheme = theme === "system" ? systemTheme : theme;
    setTheme(value || (currentTheme === "dark" ? "light" : "dark"));
  };

  const buttonAnimation = !animationsDisabled
    ? {
        initial: "hidden",
        animate: "enter",
        exit: "exit",
        variants: {
          hidden: { opacity: 0, y: 10 },
          enter: { opacity: 1, y: 0},
          exit: { opacity: 0, y: -10 },
        },
        transition: {
          type: "linear",
          duration: 0.2,
          ease: [0.36, 0.66, 0.04, 1],
        },
      }
    : {
        initial: "initial",
        exit: "exit",
        variants: {
          initial: { opacity: 1 },
          exit: { opacity: 1 },
        },
      };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.button
        className="text-text dark:text-js-yellow"
        onClick={() => toggleColorScheme()}
        key={resolvedTheme === "dark" ? "dark-icon" : "light-icon"}
        {...buttonAnimation}
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
