import { Layout } from "components/layout";
import {
  Hero,
  HomepageSection,
  AboutSection,
  ToolsSection,
  BlogSection,
  PhotographySection,
} from "components/home";

import { webCards } from "siteConfig";
import { engineeringCards } from "siteConfig";
import { useEffect, useState } from "react";
import { useSiteAnimationContext } from "components/providers";

export default function Home() {
  useEffect(() => {
    // If linked to specific section, scroll there on page load
    if (window !== "undefined") {
      const hashId = window.location.hash;

      if (hashId) {
        const element = document.querySelector(hashId);

        if (element) {
          var headerOffset = 160;
          var elementPosition = element.getBoundingClientRect().top;
          var offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
          });
        }
      }
    }
  }, []);

  return (
    <Layout>
      <Hero />
      <PhotographySection
        title="Photography"
      />
      <HomepageSection title="Web Development" cards={webCards} />
      <HomepageSection
        title="Engineering & DIY"
        cards={engineeringCards}
        reverse
      />
      <AboutSection title="About me" />
      <ToolsSection title="Tools and Skills" />
      <BlogSection title="Recent blog posts" />
    </Layout>
  );
}
