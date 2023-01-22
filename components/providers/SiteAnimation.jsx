import React, { createContext, useState } from "react";

const SiteAnimationContext = createContext({
  HeroFinished: false,
});

export const SiteAnimationProvider = ({ children }) => {
  const [HeroFinished, setHeroFinished] = useState(false);

  return (
    <SiteAnimationContext.Provider value={{ HeroFinished, setHeroFinished }}>
      {children}
    </SiteAnimationContext.Provider>
  );
};

export const useSiteAnimationContext = () =>
  React.useContext(SiteAnimationContext);
