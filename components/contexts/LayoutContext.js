import React, { createContext, useEffect, useState } from "react";
const qs = require("qs");

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
  const [transparent, setTransparent] = useState(false);
  const [dark, setDark] = useState(false);
  const [fixed, setFixed] = useState(false);
  const [menuLinks, setMenuLinks] = useState({});

  useEffect(() => {
    async function getHeaderMenu() {
      let menuQuery = qs.stringify({
        populate: "links",
        filters: {
          name: {
            $eq: "Header",
          },
        },
      });

      let menu = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/menus?${menuQuery}`
      );

      let menuJson = await menu.json();

      setMenuLinks(menuJson.data[0].attributes.links);
      setMounted(true);
    }

    try {
      getHeaderMenu();
    } catch (err) {
      console.log(err);
    }

  }, []);

  const [mounted, setMounted] = useState(false);

  return (
    <>
      {mounted && (
        <LayoutContext.Provider
          value={{
            transparent,
            setTransparent,
            fixed,
            setFixed,
            dark,
            setDark,
            menuLinks,
          }}
        >
          {children}
        </LayoutContext.Provider>
      )}
    </>
  );
};

export const useLayoutContext = () => React.useContext(LayoutContext);
