import { useEffect } from "react";
import Head from "next/head";

import { Layout } from "components/layout";
import {
  Hero,
  ProjectsSection,
  AboutSection,
  ToolsSection,
  BlogSection,
  PhotographySection,
} from "components/home";

export default function Home({ projects, tools }) {
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
    <>
      <Head>
        <title>Jakub Sekuła - personal website</title>
      </Head>
      <Layout>
        <Hero />
        <PhotographySection title="Photography" />
        <ProjectsSection
          title="Software"
          projects={projects.filter(
            (project) => project.attributes.type === "Software"
          )}
        />
        <ProjectsSection
          reverse
          title="Engineering & DIY"
          projects={projects.filter(
            (project) => project.attributes.type === "Engineering"
          )}
        />
        <AboutSection title="About me" />
        <ToolsSection title="Tools and Skills" tools={tools} />
        <BlogSection title="Recent blog posts" />
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const qs = require("qs");
  const headers = new Headers({
    Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  });

  let query = qs.stringify({
    populate: {
      tools: {
        populate: "*",
      },
    },
  });

  let tools = await fetch(`http://localhost:1337/api/tools?${query}`, {
    headers,
  });

  let toolsJson = await tools.json();

  query = qs.stringify({
    populate: ["featured_image", "tags"],
  });

  let projects = await fetch(`http://localhost:1337/api/projects?${query}`, {
    headers,
  });

  let projectsJson = await projects.json();

  return {
    props: {
      tools: toolsJson.data,
      projects: projectsJson.data,
    },
  };
}
