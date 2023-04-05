import Head from "next/head";
import { Layout, PageWrapper } from "components/layout";
import { BlogPostCard } from "components/blog";
import { convertRelativeUrl } from "lib/utils";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons";
import Image from "next/image";

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
        <PageWrapper title="Blog">
          <div className="hover-group relative col-span-full mb-4 flex flex-col items-center">
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
              md:-mt-24 md:mb-8 md:w-11/12 md:rounded-md
              md:border md:p-6 md:shadow-md"
            >
              <div className="block text-xs font-light">
                {latest.author?.data ? `${latest_author} • ` : null}
                {new Date(latest.createdAt).toLocaleDateString("en-gb")}
              </div>
              <Link
                // as="h2"
                href={`/blog/${latest.slug}`}
                className="animate-underline w-fit font-heading text-xl
                font-semibold capitalize line-clamp-2"
              >
                {latest.title} <IconArrowRight size={24} className="inline" />
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

          <h4 className="col-span-full mb-4 text-lg">Older posts:</h4>
          <div className="col-span-full grid grid-cols-12 gap-4 md:gap-5 lg:gap-7">
            {data.slice(1, data.length).map((post) => (
              <BlogPostCard post={post} key={post.attributes.slug} />
            ))}
          </div>
        </PageWrapper>
      </Layout>
    </>
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
