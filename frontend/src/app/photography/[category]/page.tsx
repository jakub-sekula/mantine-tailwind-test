import Link from "next/link";
import Image from "next/image";
import { IconChevronLeft } from "@tabler/icons";
import { LightboxWrapper } from "@components/common";
import { toTitleCase, convertRelativeUrl } from "@lib/utils";
import { getImageOfSizeOrLargest } from "@/lib/getImageOfSizeOrLargest";

import {
  ApiAlbumAlbum,
  ApiTagTag,
  PluginUploadFile,
} from "../../../../types/strapi/contentTypes";
import { AlbumSections } from "../../../../types/strapi/components";
import { StrapiResponse } from "../../../../types/strapi/responseTypes";

interface ApiTagTagWithId extends ApiTagTag {
  id: number;
}

interface PluginUploadFileWithId extends PluginUploadFile {
  id: number;
}

interface ImageLink {
  id: number;
  src: string;
  width: number;
  height: number;
  srcSet: Size[];
  description?: String;
}

interface Size {
  size: string;
  src: string;
  width: number;
  height: number;
}

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}) {
  const { seo, description } = await getData(params);

  return {
    title: seo?.metaTitle || `${toTitleCase(params.category)} - Jakub Sekula`,
    description: seo?.metaDescription || `${description}`,
  };
}

export default async function Page({
  params,
}: {
  params: { category: string };
}) {
  const data = await getData(params);

  const { title, description, show_tags, tags, featured_image, imageLinks } =
    data;

  return (
    <>
      {/* Hero section */}
      <section
        key={`hero-${title}`}
        className="relative flex h-screen max-h-[400px] max-w-[1920px] items-center justify-center overflow-hidden rounded-sm"
      >
        <div className="absolute inset-0 z-10 h-full bg-gradient-to-tr from-darkbg/90" />
        <Image
          src={
            convertRelativeUrl(
              getImageOfSizeOrLargest(featured_image.data.attributes, "xlarge")
                .url
            ) || "/default.jpg"
          }
          width={
            getImageOfSizeOrLargest(featured_image.data.attributes, "xlarge")
              .width || 300
          }
          height={
            getImageOfSizeOrLargest(featured_image.data.attributes, "xlarge")
              .height || 300
          }
          alt={title}
          priority={true}
          className="absolute inset-0 z-0 mx-auto h-full w-full object-cover"
        />
        <div className="z-20 p-6 flex w-full max-w-page flex-col items-center text-white ">
          <Link
            href="/photography"
            className="mb-4 flex items-center gap-1 text-sm font-light"
          >
            <IconChevronLeft size={16} />
            Back to albums
          </Link>
          <h1
            className="mb-3 break-words font-heading text-3xl md:text-5xl font-bold
                uppercase leading-none tracking-tight xl:text-[5.5rem] 2xl:text-[6rem]"
          >
            {title}
          </h1>
          <p className="max-w-[75ch] text-center text-sm font-light md:text-lg">
            {description}
          </p>
          {!!show_tags &&
            !!tags &&
            tags.data.map((tag: ApiTagTagWithId) => (
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

async function getData(params: { category: string }) {
  const qs = require("qs");
  const { category } = params;

  const headers = new Headers({
    Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  });

  let query = qs.stringify({
    filters: {
      slug: {
        $eq: category,
      },
    },
    populate: {
      albums: {
        populate: "featured_image",
      },
      tags: "*",
      sections: {
        populate: "*",
      },
      featured_image: {
        populate: "*",
      },
      seo: true,
    },
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/albums?${query}`,
    {
      headers,
      next: { revalidate: 10 },
    }
  );
  const json: StrapiResponse<ApiAlbumAlbum[]> = await res.json();

  const data = json?.data[0]?.attributes;

  // Prepare image links array for the lightbox wrapper
  // This ensures that they are all in the same order as images on the page
  let imageLinks: ImageLink[] = [];

  if (!!data?.sections) {
    data.sections.forEach((section: AlbumSections["attributes"]) => {
      section.gallery.data.forEach((item: PluginUploadFileWithId) => {
        // generate a srcset from all strapi formats
        const sizes = Object.keys(item.attributes.formats).map((key) => {
          const format = item.attributes.formats[key];
          return {
            size: key,
            src: convertRelativeUrl(format.url),
            width: format.width,
            height: format.height,
          };
        });

        imageLinks.push({
          id: item.id,
          src: convertRelativeUrl(
            getImageOfSizeOrLargest(item.attributes)?.url || "/default.jpg"
          ),
          width: getImageOfSizeOrLargest(item.attributes)?.width || 300,
          height: getImageOfSizeOrLargest(item.attributes)?.height || 300,
          srcSet: sizes,
          description: item.attributes.caption,
        });
      });
    });
  }

  return {
    ...data,
    imageLinks: imageLinks,
  };
}
