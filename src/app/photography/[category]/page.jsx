// "use client";

import Link from "next/link";
import Image from "next/image";
import { IconChevronLeft } from "@tabler/icons";
import { LightboxWrapper, MarkdownRenderer } from "@components/common";

import {
  convertRelativeUrl,
} from "@lib/utils";



import { PageWrapper } from "@components/layout";

export default async function Page({ params }) {
  const { data, imageLinks } = await getData(params);

  return (
    <>

      <LightboxWrapper imageLinks={imageLinks} data={data}/>
 
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

  const idRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/albums?${query}`, {
    headers,
  });
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

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/albums/${id}?${query}`, {
    headers,
  });

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

async function getStaticPaths() {
  const headers = new Headers({
    Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/albums?pagination[pageSize]=50`,
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
