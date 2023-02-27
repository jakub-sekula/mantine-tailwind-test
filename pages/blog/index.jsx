import Head from "next/head";
import { Layout } from "components/layout";

export default function Blog({ data }) {
  const latest = data[0].attributes;
  const latest_image = latest.featured_image?.data.attributes;
  const latest_author = `${latest.author.data?.attributes.firstname} ${latest.author.data?.attributes.lastname}`;

  return (
    <>
      <Head>
        <title>Blog home</title>
      </Head>
      <Layout>
        <main className="mx-auto mt-12 grid w-full max-w-5xl grid-cols-12 gap-3">
          <h1 className="col-span-full mb-8 text-center font-heading text-5xl font-bold">
            Blog
          </h1>
          <div className="relative col-span-full mb-4 flex flex-col items-center">
            <Image
              src={convertRelativeUrl(latest_image.url)}
              width={latest_image.width}
              height={latest_image.height}
              alt={latest_image.name}
              className="inset-0 aspect-video h-80 w-full rounded-md object-cover"
            />
            <div
              className="-bottom-6 -mt-24 flex w-11/12 flex-col gap-2
                         rounded-md border border-text/10 bg-white p-6
                         shadow-md shadow-text/5 dark:border-darktext/5
                       dark:bg-darkbg dark:shadow-darktext/[1%]"
            >
              <div className="block text-sm font-light">
                {latest.author?.data ? `${latest_author} • ` : null}
                {new Date(latest.createdAt).toLocaleDateString("en-gb")}
              </div>
              <Link
                href={`/blog/${latest.slug}`}
                className="font-heading text-xl font-semibold capitalize line-clamp-2 hover:underline"
              >
                <h2>
                  {latest.title} <IconArrowRight size={24} className="inline" />
                </h2>
              </Link>

              {/* Content display */}
              {!!latest.content ? (
                <p className="whitespace-pre-line text-sm font-light line-clamp-2">
                  {latest.content}
                </p>
              ) : null}

              {/* Tags display */}
              {!!latest.tags?.data ? (
                <ul className="mt-2 flex gap-2">
                  {latest.tags.data?.map((tag) => (
                    <Link
                      scroll={false}
                      href={`/tags/${tag.attributes.slug}`}
                      key={`${tag.attributes.title}-${tag.id}`}
                      className="rounded-sm bg-darkbg px-2 py-0.5 text-xs
                               text-darktext dark:bg-darktext dark:text-text"
                    >
                      {tag.attributes.title}
                    </Link>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
          <h4 className="col-span-full mb-4 text-center font-heading text-xl font-semibold">
            Older posts:
          </h4>
          {data.slice(1, data.length).map((item) => (
            <BlogPostCard project={item} key={item.attributes.slug} />
          ))}
        </main>
      </Layout>
    </>
  );
}

import { convertRelativeUrl } from "lib/utils";
import Image from "next/image";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons";

const colors = {
  red: " bg-js-red border-js-red",
  green: " bg-js-green border-js-green",
  blue: "  bg-js-blue border-js-blue",
  yellow: " bg-js-yellow border-js-yellowŚ",
};

export function BlogPostCard({ project }) {
  const formats = project.attributes.featured_image?.data?.attributes.formats;

  return (
    <Link
      key={`project-card-${project.id}`}
      href={`/blog/${project.attributes.slug}`}
      className={`duration-250 group relative col-span-4 flex w-full
		              flex-col overflow-hidden rounded-md border
                  border-text/10 transition-all hover:bg-text/[2%]
                  dark:border-darktext/10 dark:hover:bg-darktext/[1%]`}
    >
      <Image
        width={formats?.medium.width || 500}
        height={formats?.medium.height || 500}
        src={convertRelativeUrl(formats?.medium.url)}
        alt={formats?.medium.name}
        className="aspect-video w-full object-cover"
      />
      <div className="py-3 px-3 ">
        <div className="flex justify-between">
          <h3 className="font-heading font-semibold line-clamp-3 group-hover:underline">
            {project.attributes.title}
          </h3>
          <span
            className={`${
              colors[project.attributes.color]
            } mt-2 inline-block h-3 w-3 shrink-0 rounded-full`}
          />
        </div>
        {!!project.attributes.content ? (
          <p className="mt-2 text-sm font-light line-clamp-2">
            {project.attributes.content}
          </p>
        ) : null}
        {/* Tags display */}
        {!!project.attributes.tags?.data ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.attributes.tags.data?.slice(0, 3).map((tag) => (
              <Link
                scroll={false}
                href={`/tags/${tag.attributes.slug}`}
                key={`${tag.attributes.title}-${tag.id}`}
                className="rounded-sm bg-darkbg px-2 py-0.5 text-xs
                               text-darktext dark:bg-darktext dark:text-text"
              >
                {tag.attributes.title}
              </Link>
            ))}
          </ul>
        ) : null}
      </div>
    </Link>
  );
}

export async function getStaticProps(ctx) {
  const qs = require("qs");
  const headers = new Headers({
    Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  });

  const query = qs.stringify({
    populate: ["featured_image", "tags", "author"],
    sort: {
      createdAt: "desc",
    },
  });

  const res = await fetch(`http://localhost:1337/api/posts?${query}`, {
    headers,
  });

  const resJson = await res.json();

  return {
    props: {
      data: resJson.data,
    },
  };
}
