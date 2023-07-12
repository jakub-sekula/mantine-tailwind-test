// "use client";

import Link from "next/link";
import Image from "next/image";
import { IconChevronLeft } from "@tabler/icons";
import { LightboxWrapper } from "@components/common";

import { convertRelativeUrl } from "@lib/utils";

export default async function Page({ params }) {
  const { data, imageLinks } = await getData(params);

  return (
    <>
      {/* Hero section */}
      <section
        key={`hero-${data.title}`}
        className="relative -mt-24 flex max-h-[900px] w-full max-w-[1920px] justify-center px-6 xl:px-4 2xl:px-0"
      >
        <div className="absolute inset-0 z-10 h-full bg-gradient-to-tr from-darkbg/90" />
        <Image
          width={data.featured_image.data.attributes.formats.xlarge.width}
          height={data.featured_image.data.attributes.formats.xlarge.height}
          alt={data.title}
          src={convertRelativeUrl(
            data.featured_image.data.attributes.formats.xlarge.url
          )}
          priority={true}
          className="absolute inset-0 z-0 mx-auto h-full w-full object-cover"
        />
        <div className="z-20 mt-20 flex w-full max-w-page flex-col items-center py-24 text-white md:pb-32 md:pt-40 ">
          <Link
            href="/photography"
            className="mb-4 flex items-center gap-1 text-sm font-light"
          >
            <IconChevronLeft size={16} />
            Back to albums
          </Link>
          <h1
            className="mb-3 break-words font-heading text-[3.5rem] font-bold
                uppercase leading-none tracking-tight xl:text-[5.5rem] 2xl:text-[6rem]"
          >
            {data.title}
          </h1>
          <p className="max-w-[75ch] text-center text-sm font-light md:text-lg">
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
      </section>

      <LightboxWrapper imageLinks={imageLinks} data={data} />
    </>
  );
}

async function getData(params) {
  const qs = require("qs");
  const { category } = params;

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

  const idRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/albums?${query}`,
    {
      headers,
    }
  );
  const idJson = await idRes.json();

  const id = idJson?.data[0]?.id;

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

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/albums/${id}?${query}`,
    {
      headers,
    }
  );

  const resJson = await res.json();

  const data = resJson.data.attributes;

  let imageLinks = [];

  if (!!data.sections) {
    data.sections.forEach((section) => {
      if (section.__component === "album.sections" && !!section.gallery?.data) {
        section.gallery.data.forEach((item) => {
          // generate a srcset from all strapi formats
          const sizes = Object.keys(item.attributes.formats).map((key) => {
            const format = item.attributes.formats[key];
            return {
              src: convertRelativeUrl(format.url),
              width: format.width,
              height: format.height,
            };
          });

          imageLinks.push({
            id: item.id,
            src: convertRelativeUrl(item.attributes.formats.xlarge.url),
            width: item.attributes.formats.xlarge.width,
            height: item.attributes.formats.xlarge.height,
            srcSet: sizes,
            description: item.attributes.caption,
          });
        });
      }
    });
  }

  return {
    data,
    imageLinks,
  };
}
