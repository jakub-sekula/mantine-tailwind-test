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

export default function Home({ projects, toolCollections, posts, cv , photos}) {
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
        <PhotographySection title="Photography" photos={photos}/>
        <ProjectsSection
          title="Web development"
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
        <ToolsSection title="Tools and Skills" toolCollections={toolCollections} />
        <AboutSection title="About me" cv={cv} />
        <BlogSection title="Recent blog posts" posts={posts} />
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

  let toolCollections = await fetch(`http://localhost:1337/api/tool-collections?${query}`, {
    headers,
  });

  let toolCollectionsJson = await toolCollections.json();

  query = qs.stringify({
    populate: ["featured_image", "tags"],
  });

  let projects = await fetch(`http://localhost:1337/api/projects?${query}`, {
    headers,
  });

  let projectsJson = await projects.json();

  query = qs.stringify({
    populate: ["featured_image", "tags", "author"],
    sort: {
      createdAt: "desc",
    },
    pagination: {
      start: 0,
      limit: 5,
    },
  });

  const posts = await fetch(`http://localhost:1337/api/posts?${query}`, {
    headers,
  });

  const postsJson = await posts.json();

  query = qs.stringify({
    populate: {
      sections: {
        populate: {
          entries: {
            populate: "image",
          },
        },
      },
    },
  });

  const cv = await fetch(`http://localhost:1337/api/cv?${query}`, {
    headers,
  });

  const cvJson = await cv.json();

  query = qs.stringify({
    populate: ["featured_image"],
    filters: {
      showAsCategory: {
        $eq: true,
      },
    },
  });

  let photosRes = await fetch(
    `http://localhost:1337/api/albums?${query}`,
    { headers: headers }
  );

  let photosResJson = await photosRes.json()

  return {
    props: {
      toolCollections: toolCollectionsJson.data,
      projects: projectsJson.data,
      photos: photosResJson.data,
      posts: postsJson.data,
      cv: cvJson.data,
    },
    revalidate: 5,
  };
}
