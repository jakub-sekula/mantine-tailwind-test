import React, { createContext, useState } from "react";

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
  const [transparent, setTransparent] = useState(false);
  const [dark, setDark] = useState(false);
  const [fixed, setFixed] = useState(true);
  
  return (
    <LayoutContext.Provider
      value={{ transparent, setTransparent, fixed, setFixed, dark, setDark }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayoutContext = () => React.useContext(LayoutContext);
