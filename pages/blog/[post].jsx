import Head from "next/head";
import Image from "next/image";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { TableOfContents } from "components/common";
import { Layout } from "components/layout";
import Link from "next/link";

import { markdownComponents, imageLinkTransformer } from "lib/utils";
import { useHeadingsData } from "components/common/TableOfContents";

export default function Page({ data, author, featured_image }) {
  const { nestedHeadings } = useHeadingsData();
  console.log(nestedHeadings);

  return (
    <>
      <Head>
        <title>{data.title}</title>
      </Head>
      <Layout>
        <main className="mx-auto grid w-full max-w-page grid-cols-12">
          {/* Hero image */}
          {!!featured_image ? (
            <div
              key={`featured-image-${data.title}`}
              className="relative col-span-full mx-auto aspect-video max-h-[480px]
                     w-full overflow-hidden rounded-b-xl lg:col-span-10 lg:col-start-2
                     lg:mt-8 lg:rounded-xl"
            >
              <Image
                width={960}
                height={1667}
                alt={data.title}
                src={featured_image}
                priority={true}
                className="absolute h-full w-full object-cover"
              />
            </div>
          ) : null}

          {/* Title block */}
          <div
            className={`px-6 pt-8 pb-6 lg:col-span-10 lg:col-start-2 lg:px-0 ${
              nestedHeadings.length === 0
                ? "lg:col-span-8 lg:col-start-3"
                : "col-span-full"
            } `}
          >
            <div className="mb-4 block text-sm font-light">
              {author
                ? `Posted by ${author.firstname} ${author.lastname} • `
                : null}
              {new Date(data.createdAt).toLocaleDateString("en-gb")}
            </div>

            <div className="mb-2 flex gap-2">
              {!!data.tags
                ? data.tags.data.map((tag) => (
                    <Link
                      href={`/tags/${tag.attributes.slug}`}
                      className="rounded-sm bg-darkbg px-2 py-0.5 text-xs
                      text-darktext dark:bg-darktext dark:text-text"
                      key={`${tag.attributes.title}-${tag.id}`}
                    >
                      {tag.attributes.title}
                    </Link>
                  ))
                : null}
            </div>

            <h1 className="-mb-3 font-heading text-3xl font-semibold tracking-tight ">
              {data.title}
            </h1>
          </div>

          {/* Post content in Markdown */}
          {data.content ? (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
              className={`prose-pre:overflow-x-none prose col-span-full row-start-3
                          w-full max-w-none px-6 font-light prose-pre:m-0 prose-pre:h-min 
                        prose-pre:bg-red-600 prose-pre:p-0 dark:prose-invert lg:px-0 
                       ${
                         nestedHeadings.length === 0
                           ? "lg:col-span-6 lg:col-start-3"
                           : "lg:col-span-7 lg:col-start-2 lg:pr-24"
                       } `}
              transformImageUri={imageLinkTransformer}
            >
              {data.content}
            </ReactMarkdown>
          ) : null}

          {/* Table of contents */}
          {nestedHeadings.length != 0 ? (
            <aside
              className="sticky top-12 col-span-3 col-start-9
                       row-start-3 hidden h-min lg:block"
            >
              <h4 className="mb-2 font-heading text-lg font-semibold">
                In this post:
              </h4>
              <ul className="font-light">
                <TableOfContents border={false} depth={2} />
              </ul>
            </aside>
          ) : null}
        </main>
      </Layout>
    </>
  );
}

export async function getStaticProps(ctx) {
  const qs = require("qs");
  const { post } = ctx.params;
  let query;

  const headers = new Headers({
    Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  });

  query = qs.stringify({
    filters: {
      slug: {
        $eq: post,
      },
    },
  });

  const idRes = await fetch(`http://localhost:1337/api/posts?${query}`, {
    headers,
  });
  const idJson = await idRes.json();

  const id = idJson.data[0].id;

  query = qs.stringify({
    populate: {
      tags: true,
      sections: {
        populate: {
          gallery: true,
          featured_image: true,
        },
      },
      featured_image: {
        populate: "formats",
      },
      author: true,
    },
  });

  const res = await fetch(`http://localhost:1337/api/posts/${id}?${query}`, {
    headers,
  });

  const resJson = await res.json();

  return {
    props: {
      data: resJson.data.attributes,
      author: resJson.data.attributes.author.data?.attributes || null,
      featured_image: !!resJson.data.attributes.featured_image.data
        ? `http://localhost:1337${resJson.data.attributes.featured_image.data?.attributes.url}`
        : "",
    },
  };
}

export async function getStaticPaths() {
  const headers = new Headers({
    Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  });

  const res = await fetch(
    "http://localhost:1337/api/posts?pagination[pageSize]=50",
    { headers }
  );
  const json = await res.json();

  const paths = json.data.map((item) => {
    return { params: { post: item.attributes.slug } };
  });

  return {
    paths: paths,
    fallback: true,
  };
}
