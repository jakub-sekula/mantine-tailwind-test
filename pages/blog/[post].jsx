import { Layout } from "components/layout";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { TableOfContents } from "components/common";
import slugify from "slugify";
import Head from "next/head";

export default function Page({ data, author, featured_image }) {
  return (
    <>
      <Head>
        <title>{data.title}</title>
      </Head>
      <Layout>
        <main className="mx-auto grid w-full max-w-page grid-cols-12">
          <div
            key={`featured-image-${data.title}`}
            className="relative col-span-full mx-auto mt-8 aspect-video
                     max-h-[480px] w-full overflow-hidden rounded-xl
                     lg:col-span-10 lg:col-start-2"
          >
            <Image
              width={960}
              height={1667}
              alt={data.title}
              src={featured_image}
              priority={true}
              className="absolute h-full w-full object-cover"
            />
            <div className="absolute top-6 left-6 flex gap-4">
              {!!data.tags
                ? data.tags.data.map((tag) => (
                    <span
                      className="z-50 rounded-full bg-lightbg/90 dark:bg-darkbg/90
                  py-1 px-3 backdrop-blur-lg"
                      key={tag.attributes.title + tag.id}
                    >
                      {tag.attributes.title}
                    </span>
                  ))
                : null}
            </div>
          </div>
          <div className="col-span-10 col-start-2 pt-8 pb-6">
            <h1 className="mb-2 font-heading text-3xl font-semibold tracking-tight">
              {data.title}
            </h1>
            <span className="text-sm font-light opacity-75">
              Posted by{" "}
              {`${author.firstname} ${author.lastname} on ${new Date(
                data.createdAt
              ).toLocaleDateString()}`}
            </span>
          </div>
          {!!data.sections &&
            data.sections.map((section) => {
              return (
                <ReactMarkdown
                  key={`${section.id}-section`}
                  remarkPlugins={[remarkGfm]}
                  className="prose  col-span-full row-start-3 w-full max-w-none pr-24
                           font-light dark:prose-invert lg:col-span-7 lg:col-start-2"
                  transformImageUri={(src) =>
                    `${process.env.NEXT_PUBLIC_API_URL}${src}`
                  }
                  components={{
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
                      console.log(props);
                      return (
                        <h2
                          id={slugify(
                            props.children[0].replace(/[^a-zA-Z ]/g, "")
                          )}
                          {...props}
                        >
                          {props.children}
                        </h2>
                      );
                    },
                    h3(props) {
                      console.log(props);
                      return (
                        <h3
                          id={slugify(
                            props.children[0].replace(/[^a-zA-Z ]/g, "")
                          )}
                          {...props}
                        >
                          {props.children}
                        </h3>
                      );
                    },
                    img(props) {
                      return <img className="rounded-md" {...props} />;
                    },
                  }}
                >
                  {section.text}
                </ReactMarkdown>
              );
            })}
          <aside
            className="sticky top-36 col-span-3 col-start-9
        row-start-3 h-min"
          >
            <h4 className="mb-2 font-heading text-lg font-semibold">
              In this post:
            </h4>
            <ul>
              <TableOfContents border={false} depth={2} />
            </ul>
          </aside>
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
