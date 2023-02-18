import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { IconChevronLeft } from "@tabler/icons";
import { motion } from "framer-motion";

import { Layout } from "components/layout";
import { useLayoutContext, useAnimationContext } from "components/contexts";
import { useEffect, useState } from "react";
import Head from "next/head";

export default function Page({ data, featured_image }) {
  const { disabledAnimationProps, animationsDisabled } = useAnimationContext();

  const { setTransparent, setFixed, setDark } = useLayoutContext();
  useEffect(() => {
    setTransparent(true);
    setDark(true);
    setFixed(false);
    return () => {
      setTransparent(false);
      setDark(false);
      setFixed(true);
    };
  }, []);

  const animate = !animationsDisabled
    ? {
        initial: "initial",
        animate: "animate",
        variants: {
          initial: { scale: 0.95, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
        },
        transition: {
          duration: 0.2,
        },
      }
    : disabledAnimationProps;

  return (
    <>
      <Head>
        <title>{data.title}</title>
      </Head>
      <Layout>
        <motion.section
          {...animate}
          key={`hero-${data.title}`}
          className="relative -mt-20 flex max-h-[900px] w-full max-w-[1920px] justify-center"
        >
          <div className="absolute inset-0 z-10 h-full bg-gradient-to-tr from-darkbg/90" />
          <Image
            width={1500}
            height={1667}
            alt={data.title}
            src={featured_image}
            className="absolute inset-0 z-0 mx-auto h-full w-full object-cover"
          />
          <div className="z-20 mt-20 w-full max-w-page pt-40 pb-32 text-darktext ">
            <Link
              scroll={false}
              href="/photography"
              className="mb-4 flex items-center gap-1 text-sm font-light"
            >
              <IconChevronLeft size={16} />
              Back to albums
            </Link>
            <h1
              className="mb-3 font-heading
            text-[7rem] font-bold uppercase leading-none tracking-tight"
            >
              {data.title}
            </h1>
            <p className="w-3/5 text-lg font-light">{data.description}</p>
            {data.showTags &&
              !!data.tags &&
              data.tags.data.map((tag) => (
                <span key={tag.attributes.title + tag.id}>
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
                  key={section.title + section.id}
                  className="grid w-full max-w-page grid-cols-12 gap-4 py-4"
                >
                  {!!section?.title && <div className="col-span-full mx-auto grid max-w-3xl items-center justify-center py-10">
                    {!!section?.title && (
                      <h1 className="text-heading mb-5 text-center text-5xl font-semibold uppercase tracking-wide">
                        {section.title}
                      </h1>
                    )}
                    {!!section?.text && (
                      <p className="whitespace-pre-line font-light leading-relaxed">
                        {section.text}
                      </p>
                    )}
                  </div> }
                   

                  {!!section?.gallery?.data &&
                    section.gallery.data.map((item, index) => {
                      return (
                        <img
                          key={item.title + item.id}
                          src={`http://localhost:1337${item.attributes.formats.medium.url}`}
                          className="aspect col-span-3 aspect-square rounded-sm bg-neutral-700 object-cover"
                        />
                      );
                    })}
                </section>
              );
            } else if (section.__component === "album.link") {
              return (
                <section
                  key={section.title + section.id}
                  className="grid w-full max-w-page grid-cols-12 gap-4 py-4"
                >
                  {section.albums.data.map((item) => (
                    <Link
                      href="/photography/[category]"
                      as={`/photography/${item.attributes.title.toLowerCase()}`}
                      key={item.attributes.title + item.id}
                      // scroll={false}
                      className="group relative col-span-6 flex h-64 w-full flex-col items-center justify-center gap-4
                    overflow-hidden rounded-md border border-neutral-200 px-3 py-6 font-bold dark:border-0"
                    >
                      <Image
                        width={400}
                        height={400}
                        src={
                          !!item.attributes.featured_image.data
                            ? `${process.env.NEXT_PUBLIC_API_URL}${item.attributes.featured_image.data.attributes.url}`
                            : "/images/thailand.jpg"
                        }
                        alt={item.attributes.title}
                        className="absolute -z-10 h-full w-full transition-transform group-hover:scale-105 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-darkbg/50 " />
                      <h6 className="z-10 font-heading text-2xl font-semibold uppercase text-white">
                        {item.attributes.title}
                      </h6>
                    </Link>
                  ))}
                </section>
              );
            }
          })}
      </Layout>
    </>
  );
}

export async function getStaticProps(ctx) {
  const { category } = ctx.params;

  const headers = new Headers({
    Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  });

  const url = `http://localhost:1337/api/albums?filters[slug][$eq]=${category}`;

  const idRes = await fetch(`${url}`, { headers });
  const idJson = await idRes.json();

  const id = idJson.data[0].id;

  const res = await fetch(
    `http://localhost:1337/api/albums/${id}?populate[sections][populate]=gallery,albums,albums.featured_image&populate[tags]=*&populate[featured_image]=*`,
    { headers }
  );

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
