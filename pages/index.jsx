import { useEffect } from "react";

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

export default function Home({ tools }) {
  // If linked to specific section, (hash in url) scroll there on page load
  useEffect(() => {
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
      <PhotographySection title="Photography" />
      <HomepageSection title="Web Development" cards={webCards} />
      <HomepageSection
        title="Engineering & DIY"
        cards={engineeringCards}
        reverse
      />
      <AboutSection title="About me" />
      <ToolsSection title="Tools and Skills" tools={tools} />
      <BlogSection title="Recent blog posts" />
    </Layout>
  );
}

export async function getStaticProps() {
  const qs = require("qs");
  const headers = new Headers({
    Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  });

  const toolsQuery = qs.stringify({
    populate: {
      tools: {
        populate: "*",
      },
    },
  });

  let tools = await fetch(`http://localhost:1337/api/tools?${toolsQuery}`, {
    headers,
  });

  let toolsJson = await tools.json();

  return {
    props: {
      tools: toolsJson.data,
    },
  };
}
