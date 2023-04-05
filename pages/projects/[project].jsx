import Head from "next/head";
import { Layout } from "components/layout";
import { convertRelativeUrl } from "lib/utils";
import Image from "next/image";
import { BlogPostCard } from "components/blog";
import { Tag, ToolCard, SectionHeading } from "components/common";
import Link from "next/link";
import { FaGithub, FaPlayCircle } from "react-icons/fa";
import { IconChevronLeft } from "@tabler/icons";

export default function Project({ data }) {
  return (
    <>
      <Head>
        <title>Project - {data.title}</title>
      </Head>
      <Layout>
        <main className="mx-auto mt-6 grid w-full max-w-6xl grid-cols-12 gap-2 px-6 md:mt-6 lg:mt-12 xl:px-4 2xl:px-0">
          <div className="col-span-full flex flex-col items-center gap-4">
            <Link href="/projects" className="flex gap-1 text-sm font-light  ">
              <IconChevronLeft size={16} />
              Back to projects
            </Link>
            <h1 className="mb-3 font-heading text-3xl font-bold leading-none md:text-4xl lg:text-6xl">
              {data.title}
            </h1>
            <ul className="col-span-full flex gap-4">
              {data.tags.data.map((tag) => (
                <Tag key={tag.attributes.title} tag={tag} />
              ))}
            </ul>
          </div>
          <div className="col-span-full mx-auto my-6 flex gap-4">
            <Link
              href="#"
              className="group flex w-max items-center gap-2 hover:underline"
            >
              <FaGithub size={18} /> Github link
            </Link>
            <Link
              href="#"
              className="group flex w-max items-center gap-2 hover:underline"
            >
              <FaPlayCircle size={18} /> Live demo
            </Link>
          </div>

          <Image
            src={convertRelativeUrl(data.featured_image.data.attributes.formats.xlarge.url)}
            width={data.featured_image.data.attributes.formats.xlarge.width}
            height={data.featured_image.data.attributes.formats.xlarge.height}
            alt={data.featured_image.data.attributes.name}
            className="col-span-full mx-auto mb-12 aspect-video w-full rounded-md object-cover shadow-xl"
          />

          <div className="col-span-full flex gap-16">
            <div className="mx-auto w-1/2 max-w-3xl font-light">
              <h2 className="font-heading text-xl font-semibold">
                Description
              </h2>
              <p>{data.description}</p>
            </div>
            <div className="grid w-1/2 grid-cols-12 gap-2 ">
              <h2 className="col-span-full font-heading text-xl font-semibold">
                Tools used
              </h2>

              {data.tools.data.map((tool) => (
                <ToolCard
                  tool={tool}
                  key={`${tool.attributes.name}-card`}
                  className="col-span-4"
                />
              ))}
            </div>
          </div>
          {!!data.posts.data.length ? (
            <div className="col-span-full grid grid-cols-12 gap-4 md:gap-5 lg:gap-7">
              <h2 className="col-span-full font-heading text-xl font-semibold">
                Related blog posts
              </h2>
              {data.posts.data.map((post) => (
                <BlogPostCard key={post.attributes.title} post={post} />
              ))}
            </div>
          ) : null}
        </main>
      </Layout>
    </>
  );
}

export async function getStaticProps(ctx) {
  const qs = require("qs");
  const { project } = ctx.params;
  let query;

  const headers = new Headers({
    Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  });

  query = qs.stringify({
    filters: {
      slug: {
        $eq: project,
      },
    },
  });

  const idRes = await fetch(`http://localhost:1337/api/projects?${query}`, {
    headers,
  });
  const idJson = await idRes.json();

  const id = idJson.data[0].id;

  query = qs.stringify({
    populate: {
      featured_image: "*",
      tags: "*",
      tools: { populate: "*" },
      posts: {
        populate: {
          featured_image: "*",
        },
      },
    },
  });

  const res = await fetch(`http://localhost:1337/api/projects/${id}?${query}`, {
    headers,
  });

  const resJson = await res.json();

  return {
    props: {
      data: resJson.data.attributes,
    },
  };
}

export async function getStaticPaths() {
  const headers = new Headers({
    Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  });

  const res = await fetch(
    "http://localhost:1337/api/projects?pagination[pageSize]=50",
    { headers }
  );
  const json = await res.json();

  const paths = json.data.map((item) => {
    return { params: { project: item.attributes.slug } };
  });

  return {
    paths: paths,
    fallback: true,
  };
}
