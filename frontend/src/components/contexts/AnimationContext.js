import React, { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useReducedMotion } from "@mantine/hooks";

const SiteAnimationContext = createContext();

export const AnimationContext = ({ children }) => {
  const [heroFinished, setHeroFinished] = useState(false);
  const [mounted, setMounted] = useState(false);
  const animationsDisabled = useReducedMotion();
  const [prev, setPrev] = useState(false);
  const router = useRouter();

  const easingFunction = [0.36, 0.66, 0.04, 1];

  const disabledAnimationProps = {
    initial: "visible",
    animate: "visible",
    exit: "visible",
    transition: {
      duration: 0,
    },
  };

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
          duration: 0.4,
          ease: easingFunction,
        },
        // fallbackStyle:{ opacity: 1 },
      }
    : disabledAnimationProps;

  const alternatePageTransition = !animationsDisabled
    ? {
        transition: {
          duration: 0.75,
          ease: easingFunction,
        },
      }
    : disabledAnimationProps;



  const activeCardAnimation = !animationsDisabled
    ? {
        layoutId: 10,
        initial: "visible",
        animate: "visible",
        exit: "visible",
        transition: easingFunction,
        // fallbackStyle:{ opacity: 1 },
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
            // delay: heroFinished ? 0 : 4,
            duration: 0.5,
            ease: easingFunction,
          },
          // fallbackStyle:{ opacity: 1 },
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
              // delay: 2.75,
              when: "beforeChildren",
              staggerChildren: 0.1,
            },
          },
          hidden: { opacity: 0 },
        },
        // fallbackStyle:{ opacity: 1 },
      }
    : disabledAnimationProps;

  const heroTextAnimation = !animationsDisabled
    ? {
        variants: {
          initial: { opacity: 1 },
          hidden: { opacity: 0, y: -16 },
          visible: { opacity: 1, y: 0 },
        },
        transition: {
          duration: 0.3,
          ease: easingFunction,
        },
        // fallbackStyle:{ opacity: 1 },
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
              // delay: 0.5,
              when: "beforeChildren",
              // staggerChildren: 0.75,
            },
          },
          hidden: {
            opacity: 0,
          },
        },
        // fallbackStyle:{ opacity: 1 },
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
          duration: 0.2,
          ease: easingFunction,
        },
        // fallbackStyle:{ opacity: 1 }
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
        transition: easingFunction,
        // fallbackStyle:{ opacity: 1 }
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
            easingFunction,
            disabledAnimationProps,
            activeCardAnimation,
            otherCardAnimation,
            headerAnimation,
            heroGridAnimation,
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

export const useAnimationContext = () => React.useContext(SiteAnimationContext);
