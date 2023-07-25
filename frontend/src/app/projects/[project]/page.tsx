import Image from "next/image";
import { BlogPostCard } from "@components/blog";
import { Tag, ToolCard, SectionHeading } from "@components/common";
import Link from "next/link";
import { FaGithub, FaPlayCircle } from "react-icons/fa";
import { IconChevronLeft } from "@tabler/icons";
import { notFound } from "next/navigation";
import { convertRelativeUrl, toTitleCase } from "@/lib/utils";
import {
  ApiPostPost,
  ApiProjectProject,
  ApiTagTag,
  ApiToolTool,
} from "../../../../types/strapi/contentTypes";
import { getImageOfSizeOrLargest } from "@/lib/getImageOfSizeOrLargest";
import { SharedSeo } from "../../../../types/strapi/components";
import clsx from "clsx";

export async function generateMetadata({
  params,
}: {
  params: { project: string };
}) {
  const { data, seo } = await getData(params);
  return {
    title:
      seo?.metaTitle ||
      `${toTitleCase(params?.project)} - Jakub Sekula` ||
      "Project page - Jakub Sekula",
    description:
      seo?.metaDescription || `${data?.excerpt}` || "Generic project",
  };
}

export default async function Project({
  params,
}: {
  params: { project: string };
}) {
  const { data } = await getData(params);
  return (
    <main className="mx-auto mt-6 grid w-full max-w-6xl grid-cols-12 gap-2 px-6 md:mt-6 lg:mt-12 xl:px-4 2xl:px-0">
      {/* Header */}
      <div className="col-span-full flex flex-col items-center gap-4">
        <Link href="/projects" className="flex gap-1 text-sm font-light  ">
          <IconChevronLeft size={16} /> Back to projects{" "}
        </Link>
        <h1 className="font-heading text-3xl font-bold leading-none md:text-4xl lg:text-6xl">
          {data.title}
        </h1>
        <p className="max-w-[75ch] text-center text-sm font-light">
          {data.excerpt}
        </p>{" "}
        {!!data.tags.data.length ? (
          <ul className="col-span-full flex gap-4">
            {data.tags.data.map((tag: ApiTagTag) => (
              <Tag
                key={tag.attributes.title}
                href={`/tags/${tag.attributes.slug}`}
                title={tag.attributes.title}
              />
            ))}
          </ul>
        ) : null}
      </div>
      {!!data.github_url || data.demo_url ? (
        <div className="col-span-full mx-auto mb-6 mt-3 flex gap-4">
          {!!data.github_url ? (
            <Link
              href={data.github_url}
              className="group flex w-max items-center gap-2 hover:underline"
            >
              <FaGithub size={18} /> Github link{" "}
            </Link>
          ) : null}
          {!!data.demo_url ? (
            <Link
              href={data.demo_url}
              className="group flex w-max items-center gap-2 hover:underline"
            >
              <FaPlayCircle size={18} /> Live demo{" "}
            </Link>
          ) : null}
        </div>
      ) : null}
      <Image
        src={convertRelativeUrl(
          getImageOfSizeOrLargest(data.featured_image.data.attributes, "xlarge")
            .url
        )}
        alt={
          getImageOfSizeOrLargest(data.featured_image.data.attributes, "xlarge")
            .name
        }
        width={
          getImageOfSizeOrLargest(data.featured_image.data.attributes, "xlarge")
            .width
        }
        height={
          getImageOfSizeOrLargest(data.featured_image.data.attributes, "xlarge")
            .height
        }
        className="col-span-full mx-auto md:mb-12 mb-6 mt-10 aspect-video w-full rounded-md object-cover shadow-xl"
      />
      {/* End header */}
      <div className="col-span-full mb-12 flex flex-col gap-12 md:flex-row">
        <div className={clsx("mx-auto w-full max-w-3xl font-light", !!data.tools.data.length ? "md:w-1/2" : null)}>
          <h2 className="font-heading text-xl font-semibold">Description</h2>{" "}
          <p>{data.description}</p>{" "}
        </div>{" "}
        {!!data.tools.data.length ? (
          <div className="grid w-full grid-cols-12 gap-2 md:w-1/2 ">
            {" "}
            <h2 className="col-span-full font-heading text-xl font-semibold">
              {" "}
              Tools used{" "}
            </h2>{" "}
            {data.tools.data.map((tool: ApiToolTool) => (
              <ToolCard
                tool={tool}
                key={`${tool.attributes.name}-card`}
                className="col-span-4"
              />
            ))}
          </div>
        ) : null}
      </div>{" "}
      {!!data.posts.data.length ? (
        <div className="col-span-full grid grid-cols-12 gap-4 md:gap-5 lg:gap-7">
          {" "}
          <h2 className="col-span-full font-heading text-xl font-semibold">
            {" "}
            Related blog posts{" "}
          </h2>{" "}
          {data.posts.data.map((post: ApiPostPost) => (
            <BlogPostCard key={post.attributes.title} post={post} />
          ))}{" "}
        </div>
      ) : null}{" "}
    </main>
  );
}

async function getData(params: { project: string }): Promise<{
  data: ApiProjectProject["attributes"];
  seo: SharedSeo["attributes"];
}> {
  try {
    const qs = require("qs");
    const { project } = params;

    const headers = new Headers({
      Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
    });

    let query = qs.stringify({
      filters: { slug: { $eq: project } },
      populate: {
        featured_image: "*",
        tags: "*",
        tools: { populate: "*" },
        posts: { populate: { featured_image: "*" } },
        seo: true,
      },
    });
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/projects?${query}`,
      {
        headers,
        next: { revalidate: 10 },
      }
    );
    const json = await res.json();

    return { data: json.data[0].attributes, seo: json.data[0].attributes.seo };
  } catch (err) {
    notFound();
  }
}

export async function generateStaticParams() {
  const headers = new Headers({
    Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  });
  const posts = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/projects?pagination[pageSize]=50`,
    { headers }
  )
    .then((res) => res.json())
    .then((json) => json.data);
  return posts.map((post: ApiPostPost) => ({ project: post.attributes.slug }));
}
