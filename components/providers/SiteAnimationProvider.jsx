import React, { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useReducedMotion } from "@mantine/hooks";

const SiteAnimationContext = createContext({
  HeroFinished: false,
});

export const SiteAnimationProvider = ({ children }) => {
  const [heroFinished, setHeroFinished] = useState(false);
  const [mounted, setMounted] = useState(false);
  const animationsDisabled = useReducedMotion();
  const [prev, setPrev] = useState(false);
  const router = useRouter();
  // const animationsDisabled = true

  const customEaseTransition = {
    type: "linear",
    duration: 0.3,
    ease: [0.36, 0.66, 0.04, 1],
  };

  const disabledAnimationProps = {
    initial: "visible",
    animate: "visible",
    exit: "visible",
  };

  const sectionEntryAnimation = !animationsDisabled
    ? {
        initial: "hidden",
        animate: "hidden",
        whileInView: "visible",
        transition: { ...customEaseTransition, delay: 0.2, duration: 0.5 },
        viewport: { once: true },
        variants: {
          hidden: { opacity: 0, x: 20 },
          visible: { opacity: 1, x: 0 },
        },
      }
    : disabledAnimationProps;

  const activeCardAnimation = !animationsDisabled
    ? {
        layoutId: 10,
        initial: "visible",
        animate: "visible",
        exit: "visible",
        transition: customEaseTransition,
      }
    : disabledAnimationProps;

  const headerAnimation =
    router.pathname === "/" && !animationsDisabled
      ? {
          initial: "hidden",
          animate: "enter",
          exit: "exit",
          variants: {
            hidden: { opacity: 0, y: -100 },
            enter: { opacity: 1, x: 0, y: 0 },
            exit: { opacity: 0, x: 0, y: 100 },
          },
          transition: {
            delay: 4,
            duration: 0.5,
            ease: [0.36, 0.66, 0.04, 1],
          },
        }
      : disabledAnimationProps;

  const heroGridAnimation = !animationsDisabled
    ? {
        initial: "hidden",
        animate: "visible",
        variants: {
          visible: {
            opacity: 1,
            transition: {
              delay: 2.75,
              when: "beforeChildren",
              staggerChildren: 0.1,
            },
          },
          hidden: { opacity: 0 },
        },
      }
    : disabledAnimationProps;

  const heroTextAnimation = !animationsDisabled
    ? {
        variants: {
          hidden: { opacity: 0, y: -16 },
          visible: { opacity: 1, y: 0 },
        },
        transition: {
          duration: 0.3,
          ease: [0.36, 0.66, 0.04, 1],
        },
      }
    : disabledAnimationProps;

  const heroTextContainerAnimation = !animationsDisabled
    ? {
        initial: "hidden",
        animate: "visible",
        variants: {
          visible: {
            opacity: 1,
            transition: {
              delay: 0.5,
              when: "beforeChildren",
              staggerChildren: 0.75,
            },
          },
          hidden: {
            opacity: 0,
          },
        },
      }
    : disabledAnimationProps;

  const darkModeButtonAnimation = !animationsDisabled
    ? {
        initial: "hidden",
        animate: "enter",
        exit: "exit",
        variants: {
          hidden: { opacity: 0, y: 10 },
          enter: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -10 },
        },
        transition: {
          type: "linear",
          duration: 0.2,
          ease: [0.36, 0.66, 0.04, 1],
        },
      }
    : disabledAnimationProps;

  const defaultPageTransition = !animationsDisabled
    ? {
        initial: "hidden",
        animate: "enter",
        exit: "exit",
        variants: {
          hidden: { opacity: 0, x: 200, y: 0 },
          enter: { opacity: 1, x: 0, y: 0 },
          exit: { opacity: 0, x: 0, y: -100 },
        },
        transition: {
          type: "linear",
          duration: 0.4,
          ease: [0.36, 0.66, 0.04, 1],
        },
      }
    : disabledAnimationProps;

  const alternatePageTransition = !animationsDisabled
    ? {
        transition: {
          duration: 0.75,
          ease: [0.36, 0.66, 0.04, 1],
        },
      }
    : disabledAnimationProps;

  const otherCardAnimation = !animationsDisabled
    ? {
        initial: "initial",
        animate: "enter",
        exit: "exit",
        variants: {
          initial: { opacity: 0 },
          enter: { opacity: 1 },
          exit: { opacity: 0, scale: 0.95 },
        },
        transition: customEaseTransition,
      }
    : disabledAnimationProps;

  const heroCardAnimation = !animationsDisabled
    ? {
        variants: {
          hidden: { opacity: 0, y: -16 },
          visible: { opacity: 1, y: 0 },
        },
        transition: {
          duration: 0.3,
          ease: [0.36, 0.66, 0.04, 1],
        },
        whileHover: { scale: 1.025 },
      }
    : disabledAnimationProps;

  useEffect(() => {
    if (animationsDisabled !== undefined) {
      setMounted(true);
      setPrev(animationsDisabled);
      if (animationsDisabled === !prev && mounted) {
        router.reload();
      }
    }
  }, [animationsDisabled, mounted, prev, router]);

  return (
    <>
      {mounted && (
        <SiteAnimationContext.Provider
          value={{
            heroFinished,
            setHeroFinished,
            animationsDisabled,
            customEaseTransition,
            disabledAnimationProps,
            sectionEntryAnimation,
            activeCardAnimation,
            otherCardAnimation,
            headerAnimation,
            heroGridAnimation,
            heroCardAnimation,
            heroTextAnimation,
            heroTextContainerAnimation,
            darkModeButtonAnimation,
            defaultPageTransition,
            alternatePageTransition,
          }}
        >
          {children}
        </SiteAnimationContext.Provider>
      )}
    </>
  );
};

export const useSiteAnimationContext = () =>
  React.useContext(SiteAnimationContext);
