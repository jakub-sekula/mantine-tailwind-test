import React, { createContext, useState } from "react";

const SiteAnimationContext = createContext({
  HeroFinished: false,
});

export const SiteAnimationProvider = ({ children }) => {
  const [heroFinished, setHeroFinished] = useState(false);
  const [animationMode, setAnimationMode ] = useState("wait")
  const [animationsDisabled,  setAnimationsDisabled] = useState(false)

  return (
    <SiteAnimationContext.Provider value={{ heroFinished, setHeroFinished, animationsDisabled}}>
      {children}
    </SiteAnimationContext.Provider>
  );
};

export const useSiteAnimationContext = () =>
  React.useContext(SiteAnimationContext);
