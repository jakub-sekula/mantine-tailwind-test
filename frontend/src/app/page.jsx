import {
  Hero,
  ProjectsSection,
  AboutSection,
  SkillsSection,
  BlogSection,
  PhotographySection,
} from "@/components/home";
import { Footer, Header } from "@/components/layout";
import { notFound } from "next/navigation";

export default async function Home() {
  const { posts, cv } = await getPostsAndCv();
  const menuItems = await getMenuItems();
  const { data } = await getData();
  const { skills, projects, photography, blog, about, hero } = data.attributes;

  return (
    <>
      <Header menuItems={menuItems} />
      <Hero data={hero} />
      <AboutSection title="About me" about={about} cv={cv} />
      {projects.filter((item) => item.enabled).length > 0
        ? projects
            .filter((item) => item.enabled)
            .map((project, index) => {
              return (
                <ProjectsSection
                  key={`project-section-${project.category}`}
                  reverse={(index + 1) % 2 === 0}
                  title={project.category}
                  projects={project.projects.data}
                />
              );
            })
        : null}
      {skills.filter((skill) => skill.enabled).length > 0 ? (
        <SkillsSection title="Skills" skills={skills} />
      ) : null}


      {photography.enabled ? (
        <PhotographySection title="Photography" data={photography} />
      ) : null}

      {blog.enabled ? (
        <BlogSection title="Recent blog posts" posts={posts} />
      ) : null}

      <Footer />
    </>
  );
}

async function getPostsAndCv() {
  try {
    const qs = require("qs");
    const headers = new Headers({
      Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
    });

    let query = qs.stringify({
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
        next: { revalidate: 10 },
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

    const cv = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/cv?${query}`,
      {
        headers,
        next: { revalidate: 10 },
      }
    );

    const cvJson = await cv.json();

    return {
      posts: postsJson.data,
      cv: cvJson.data,
    };
  } catch (err) {
    notFound();
  }
}

async function getData() {
  try {
    const qs = require("qs");
    const headers = new Headers({
      Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
    });

    let query = qs.stringify({
      populate: {
        skills: {
          populate: {
            tools: {
              populate: "*",
            },
          },
        },
        projects: {
          populate: {
            projects: {
              populate: {
                featured_image: true,
                tags: true,
                tools: {
                  populate: "*"
                }
              }
            },
          },
        },
        photography: {
          populate: {
            albums: {
              populate: "*",
            },
          },
        },
        blog: {
          populate: {
            posts: {
              populate: "*",
            },
          },
        },
        about: {
          populate: {
            avatar: {
              populate: "*",
            },
          },
        },
        hero: {
          populate: {
            socials: {
              populate: {
                icon: {
                  populate: true,
                },
              },
            },
            avatar: true,
            background: true
          },
        },
        seo: true,
      },
    });

    const homepageRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/homepage?${query}`,
      {
        headers,
        next: { revalidate: 10 },
      }
    );

    const homepageJson = await homepageRes.json();

    return {
      data: homepageJson.data,
      seo: homepageJson.data.attributes.seo,
    };
  } catch (err) {
    notFound();
  }
}

async function getMenuItems() {
  const qs = require("qs");

  let menuQuery = qs.stringify({
    populate: "links",
    filters: {
      slug: {
        $eq: "header-menu",
      },
    },
  });

  let menu = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/menus?${menuQuery}`
  );

  const menuJson = await menu.json();

  return menuJson.data[0].attributes.links;
}
