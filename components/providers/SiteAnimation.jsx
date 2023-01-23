import { useReducedMotion } from "@mantine/hooks";
import { useRouter } from "next/router";
import React, { createContext, useEffect, useState } from "react";

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

  useEffect(() => {
    if (animationsDisabled !== undefined) {
      setMounted(true);
      setPrev(animationsDisabled);
      if(animationsDisabled === !prev && mounted) {
        router.reload()
      }
    }
  }, [animationsDisabled, mounted, prev, router]);

  return (
    <>
      {mounted && (
        <SiteAnimationContext.Provider
          value={{ heroFinished, setHeroFinished, animationsDisabled }}
        >
          {children}
        </SiteAnimationContext.Provider>
      )}
    </>
  );
};

export const useSiteAnimationContext = () =>
  React.useContext(SiteAnimationContext);
