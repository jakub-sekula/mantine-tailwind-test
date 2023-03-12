import Head from "next/head";
import { Layout } from "components/layout";

export default function Blog({ data }) {
  const latest = data[0].attributes;
  const latest_image = latest.featured_image.data?.attributes;
  const latest_author = `${latest.author.data?.attributes.firstname} ${latest.author.data?.attributes.lastname}`;

  return (
    <>
      <Head>
        <title>Blog home</title>
      </Head>
      <Layout>
        <main className="mx-auto grid w-full max-w-5xl grid-cols-12 px-6 md:mt-6 lg:mt-12 xl:px-4 2xl:px-0">
          <h1 className="col-span-full font-heading text-3xl font-bold md:mb-6 md:texxt-center md:text-4xl lg:text-5xl">
            My blog
          </h1>
          <h4 className="col-span-full text-lg mb-4">
            Newest post:
          </h4>
          <div className="relative col-span-full mb-4 flex flex-col items-center">
            {/* Latest post image */}
            {!!latest_image ? (
              <Image
                src={convertRelativeUrl(latest_image.url)}
                width={latest_image.width}
                height={latest_image.height}
                alt={latest_image.name}
                className="inset-0 aspect-video h-80 w-full rounded-md object-cover"
              />
            ) : (
              <div className="inset-0 aspect-video h-80 w-full rounded-md bg-text object-cover" />
            )}
            {/* Latest post data block */}
            <div
              className="flex flex-col gap-2 border-text/10 bg-white
                         py-4 shadow-text/5 dark:border-darktext/5 dark:bg-darkbg dark:shadow-darktext/[1%]
                         md:-mt-24 md:w-11/12 md:rounded-md md:border
                         md:p-6 md:shadow-md md:mb-8"
            >
              <div className="block text-xs font-light">
                {latest.author?.data ? `${latest_author} • ` : null}
                {new Date(latest.createdAt).toLocaleDateString("en-gb")}
              </div>
              <Link
                href={`/blog/${latest.slug}`}
                className="font-heading text-xl font-semibold capitalize
                           line-clamp-2 hover:underline"
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

          <h4 className="col-span-full text-lg mb-4">
            Older posts:
          </h4>
          <div className="col-span-full grid grid-cols-12 gap-4 md:gap-5 lg:gap-7">
            {data.slice(1, data.length).map((post) => (
              <BlogPostCard post={post} key={post.attributes.slug} />
            ))}
          </div>
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
  yellow: " bg-js-yellow border-js-yellow",
};

export function BlogPostCard({ post }) {
  const formats = post.attributes.featured_image?.data?.attributes.formats;

  return (
    <Link
      key={`post-card-${post.id}`}
      href={`/blog/${post.attributes.slug}`}
      className={`duration-250 group relative col-span-full flex w-full flex-col
		              overflow-hidden rounded-md border border-text/10 transition-all
                  hover:bg-text/[2%] dark:border-darktext/10 dark:hover:bg-darktext/[1%]
                  md:col-span-6 lg:col-span-4`}
    >
      {!!formats ? (
        <Image
          width={formats?.medium.width || 500}
          height={formats?.medium.height || 500}
          src={convertRelativeUrl(formats?.medium.url)}
          alt={formats?.medium.name}
          className="aspect-video h-36 md:h-full w-full object-cover"
        />
      ) : (
        <div className="aspect-video w-full bg-text" />
      )}

      <div className="p-3 flex flex-col">
        <h3
          className="font-heading text-lg font-semibold line-clamp-3
                         group-hover:underline"
        >
          {post.attributes.title}
        </h3>
        {!!post.attributes.content ? (
          <p className="mt-3 text-sm font-light line-clamp-2">
            {post.attributes.content}
          </p>
        ) : null}

        {/* Tags display */}
        {!!post.attributes.tags?.data.length ? (
          <ul className="mt-5 flex flex-wrap gap-2">
            {post.attributes.tags.data?.slice(0, 3).map((tag) => (
              <span
                key={`${tag.attributes.title}-${tag.id}`}
                className="rounded-sm bg-darkbg px-2 py-0.5 text-xs
                               text-darktext dark:bg-darktext dark:text-text"
              >
                {tag.attributes.title}
              </span>
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
    revalidate: 5,
  };
}
