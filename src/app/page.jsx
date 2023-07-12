import {
  Hero,
  ProjectsSection,
  AboutSection,
  ToolsSection,
  BlogSection,
  PhotographySection,
} from "@/components/home";

export default async function Home() {
  const data = await getData();

  return (
    <>
      <Hero />
      <AboutSection title="About me" cv={data.cv} />
      <ToolsSection title="Skills" toolCollections={data.toolCollections} />
      <ProjectsSection
        reverse={false}
        title="Web & Software Projects"
        projects={data.projects.filter(
          (project) => project.attributes.type === "Software"
        )}
      />
      <ProjectsSection
        reverse
        title="Engineering & DIY projects"
        projects={data.projects.filter(
          (project) => project.attributes.type === "Engineering"
        )}
      />
      <PhotographySection title="Photography" photos={data.photos} />
      <BlogSection title="Recent blog posts" posts={data.posts} />
    </>
  );
}

async function getData() {
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

  let toolCollections = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/tool-collections?${query}`,
    {
      headers,
    }
  );

  let toolCollectionsJson = await toolCollections.json();

  query = qs.stringify({
    populate: ["featured_image", "tags"],
  });

  let projects = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/projects?${query}`,
    {
      headers,
    }
  );

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

  const posts = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts?${query}`,
    {
      headers,
    }
  );

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

  const cv = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cv?${query}`, {
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
    `${process.env.NEXT_PUBLIC_API_URL}/api/albums?${query}`,
    { headers: headers }
  );

  let photosResJson = await photosRes.json();

  return {
    toolCollections: toolCollectionsJson.data,
    projects: projectsJson.data,
    photos: photosResJson.data,
    posts: postsJson.data,
    cv: cvJson.data,
  };
}
