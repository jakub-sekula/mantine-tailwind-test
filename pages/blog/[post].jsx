import Head from "next/head";
import Image from "next/image";

import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";
import slugify from "slugify";

import { TableOfContents } from "components/common";
import { Layout } from "components/layout";
import Link from "next/link";

export default function Page({ data, author, featured_image }) {
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
          <div className="col-span-full px-6 pt-8 pb-6 lg:col-span-10 lg:col-start-2 lg:px-0">
            <div className="text-sm font-light opacity-75 mb-3">
              Posted by{" "}
              {`${author?.firstname} ${author?.lastname} on ${new Date(
                data.createdAt
              ).toLocaleDateString()}`}
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
              className="prose-pre:overflow-x-none prose col-span-full row-start-3 w-full max-w-none
                         px-6 font-light prose-pre:m-0 prose-pre:h-min
                       prose-pre:bg-red-600 prose-pre:p-0 dark:prose-invert lg:col-span-7 lg:col-start-2 lg:px-0 lg:pr-24"
              transformImageUri={imageLinkTransformer}
            >
              {data.content}
            </ReactMarkdown>
          ) : null}

          {/* Table of contents */}
          <aside
            className="sticky top-36 col-span-3 col-start-9
                       row-start-3 hidden h-min lg:block"
          >
            <h4 className="mb-2 font-heading text-lg font-semibold">
              In this post:
            </h4>
            <ul className="font-light">
              <TableOfContents border={false} depth={2} />
            </ul>
          </aside>
        </main>
      </Layout>
    </>
  );
}

// Converts relative links from Markdown to absolute for image display
function imageLinkTransformer(src) {
  return `${process.env.NEXT_PUBLIC_API_URL}${src}`;
}

// Components for React Markdown renderer
const markdownComponents = {
  a(props) {
    return (
      <a
        {...props}
        className="visited:text-purple-400 dark:visited:text-purple-600"
      >
        {props.children}
      </a>
    );
  },
  h2(props) {
    return (
      <h2 id={slugify(props.children[0].replace(/[^a-zA-Z ]/g, ""))} {...props}>
        {props.children}
      </h2>
    );
  },
  h3(props) {
    return (
      <h3 id={slugify(props.children[0].replace(/[^a-zA-Z ]/g, ""))} {...props}>
        {props.children}
      </h3>
    );
  },
  img(props) {
    return <img className="rounded-md" {...props} />;
  },
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter
        // children={String(children).replace(/\n$/, "")}
        style={atomDark}
        customStyle={{
          margin: 0,
        }}
        wrapLines={true}
        showLineNumbers
        language={match[1]}
        {...props}
      />
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};

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
      author: resJson.data.attributes.author.data.attributes,
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
