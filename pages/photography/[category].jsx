import Link from "next/link";
import Image from "next/image";
import { IconChevronLeft } from "@tabler/icons";
import { motion } from "framer-motion";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
  markdownComponents,
  imageLinkTransformer,
  convertRelativeUrl,
} from "lib/utils";

import { Layout } from "components/layout";
import { useLayoutContext, useAnimationContext } from "components/contexts";
import { useEffect } from "react";
import Head from "next/head";

export default function Page({ data, featured_image }) {
  const { setTransparent, setFixed, setDark } = useLayoutContext();
  useEffect(() => {
    setTransparent(true);
    setDark(true);
    return () => {
      setTransparent(false);
      setDark(false);
    };
  }, [setDark, setTransparent]);

  return (
    <>
      <Head>
        <title>Photography - {data.title}</title>
      </Head>
      <Layout>
        <motion.section
          key={`hero-${data.title}`}
          className="relative -mt-24 flex max-h-[900px] w-full max-w-[1920px] justify-center px-6 xl:px-4 2xl:px-0"
        >
          <div className="absolute inset-0 z-10 h-full bg-gradient-to-tr from-darkbg/90" />
          <Image
            width={1500}
            height={1667}
            alt={data.title}
            src={featured_image}
            priority={true}
            className="absolute inset-0 z-0 mx-auto h-full w-full object-cover"
          />
          <div className="z-20 mt-20 flex w-full max-w-page flex-col items-center pt-40 pb-32 text-white ">
            <Link
              scroll={false}
              href="/photography"
              className="mb-4 flex items-center gap-1 text-sm font-light"
            >
              <IconChevronLeft size={16} />
              Back to albums
            </Link>
            <h1
              className="mb-3 break-words font-heading text-[4.5rem] font-bold
                uppercase leading-none tracking-tight xl:text-[5.5rem] 2xl:text-[6rem]"
            >
              {data.title}
            </h1>
            <p className="max-w-[75ch] text-center text-lg font-light">
              {data.description}
            </p>
            {data.showTags &&
              !!data.tags &&
              data.tags.data.map((tag) => (
                <span key={`${tag.attributes.title}-${tag.id}`}>
                  {tag.attributes.title}
                </span>
              ))}
          </div>
        </motion.section>

        {!!data.sections &&
          data.sections.map((section) => {
            if (section.__component === "album.sections") {
              return (
                <section
                  key={`${section.title}`}
                  className="grid w-full max-w-page grid-cols-12 gap-4 py-12"
                >
                  {!!section.title || !!section.text ? (
                    <div className="col-span-full mx-auto mb-4 flex max-w-[75ch] flex-col gap-4">
                      {!!section?.title ? (
                        <h2 className="text-heading text-center text-5xl font-semibold">
                          {section.title}
                        </h2>
                      ) : null}

                      {/* Post content in Markdown */}
                      {!!section.text ? (
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={markdownComponents}
                          transformImageUri={imageLinkTransformer}
                          className="prose-pre:overflow-x-none prose  mx-auto
                                       w-full max-w-none px-6 font-light prose-pre:m-0
                                       prose-pre:h-min prose-pre:bg-red-600 prose-pre:p-0 
                                     dark:prose-invert lg:px-0"
                        >
                          {section.text}
                        </ReactMarkdown>
                      ) : null}
                    </div>
                  ) : null}

                  {!!section.gallery?.data ? (
                    <div
                      className={`${
                        !!section.text || !!section.title
                          ? "max-w-4xl"
                          : "max-w-page"
                      } col-span-full mx-auto grid w-full grid-cols-12 gap-3`}
                    >
                      {section.gallery.data.map((item) => {
                        const image = item.attributes.formats.medium;
                        return (
                          <Image
                            key={`gallery-image-${item.id}`}
                            width={image.width}
                            height={image.height}
                            alt={image.name}
                            src={convertRelativeUrl(image.url)}
                            className="aspect col-span-3 aspect-square rounded-sm bg-neutral-700 object-cover"
                          />
                        );
                      })}
                    </div>
                  ) : null}
                </section>
              );
            } else if (section.__component === "album.link") {
              return (
                <section
                  key={`links-${section.id}`}
                  className="grid w-full max-w-page grid-cols-12 gap-4 py-4"
                >
                  {section.albums.data.map((item) => {
                    const image =
                      item.attributes.featured_image?.data.attributes.formats;
                    console.log(image);
                    return (
                      <Link
                        href="/photography/[category]"
                        as={`/photography/${item.attributes.title.toLowerCase()}`}
                        key={`links-image-${item.id}`}
                        className="group relative col-span-6 flex h-64 w-full flex-col items-center justify-center gap-4
                      overflow-hidden rounded-md border border-neutral-200 px-3 py-6 font-bold dark:border-0"
                      >
                        <Image
                          width={400}
                          height={400}
                          src={
                            !!item.attributes.featured_image?.data
                              ? `${process.env.NEXT_PUBLIC_API_URL}${item.attributes.featured_image.data.attributes.url}`
                              : "/"
                          }
                          alt={item.attributes.title}
                          className="absolute -z-10 h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-darkbg/50 " />
                        <h6 className="z-10 font-heading text-2xl font-semibold uppercase text-white">
                          {item.attributes.title}
                        </h6>
                      </Link>
                    );
                  })}
                </section>
              );
            }
          })}
      </Layout>
    </>
  );
}

export async function getStaticProps(ctx) {
  const qs = require("qs");
  const { category } = ctx.params;
  let query;

  const headers = new Headers({
    Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  });

  query = qs.stringify({
    filters: {
      slug: {
        $eq: category,
      },
    },
  });

  const idRes = await fetch(`http://localhost:1337/api/albums?${query}`, {
    headers,
  });
  const idJson = await idRes.json();

  const id = idJson.data[0].id;

  query = qs.stringify({
    populate: {
      sections: {
        tags: "*",
        populate: {
          gallery: true,
          featured_image: true,
          albums: {
            populate: {
              featured_image: "*",
            },
          },
        },
      },
      featured_image: {
        populate: "formats",
      },
    },
  });

  const res = await fetch(`http://localhost:1337/api/albums/${id}?${query}`, {
    headers,
  });

  const resJson = await res.json();

  return {
    props: {
      data: resJson.data.attributes,
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
    "http://localhost:1337/api/albums?pagination[pageSize]=50",
    { headers }
  );
  const json = await res.json();

  const paths = json.data.map((item) => {
    return { params: { category: item.attributes.slug } };
  });

  return {
    paths: paths,
    fallback: true,
  };
}
