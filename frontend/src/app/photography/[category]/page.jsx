import Link from "next/link";
import Image from "next/image";
import { IconChevronLeft } from "@tabler/icons";
import { LightboxWrapper } from "@components/common";
import { toTitleCase, convertRelativeUrl } from "@lib/utils";

export async function generateMetadata({ params }) {
  const { data } = await getData(params);
  return {
    title: `${toTitleCase(params.category)} - Jakub Sekula`,
    description: `${data.description}`
  };
}

export default async function Page({ params }) {
  const { data, imageLinks } = await getData(params);

  return (
    <>
      {/* Hero section */}
      <section
        key={`hero-${data.title}`}
        className="relative flex h-screen max-h-[400px] max-w-[1920px] items-center justify-center overflow-hidden rounded-sm"
      >
        <div className="absolute inset-0 z-10 h-full bg-gradient-to-tr from-darkbg/90" />
        <Image
          width={
            data.featured_image.data.attributes.formats?.large?.width ||
            data.featured_image.data.attributes.formats?.medium?.width ||
            data.featured_image.data.attributes.formats?.small?.width ||
            data.featured_image.data.attributes.formats?.xsmall?.width ||
            data.featured_image.data.attributes.formats?.thumbnail?.width ||
            300
          }
          height={
            data.featured_image.data.attributes.formats?.large?.height ||
            data.featured_image.data.attributes.formats?.medium?.height ||
            data.featured_image.data.attributes.formats?.small?.height ||
            data.featured_image.data.attributes.formats?.xsmall?.height ||
            data.featured_image.data.attributes.formats?.thumbnail?.height ||
            300
          }
          alt={data.title}
          src={convertRelativeUrl(
            data.featured_image.data.attributes.formats?.large?.url ||
              data.featured_image.data.attributes.formats?.medium?.url ||
              data.featured_image.data.attributes.formats?.small?.url ||
              data.featured_image.data.attributes.formats?.xsmall?.url ||
              data.featured_image.data.attributes.formats?.thumbnail?.url ||
              "/default.jpg"
          )}
          priority={true}
          className="absolute inset-0 z-0 mx-auto h-full w-full object-cover"
        />
        <div className="z-20 flex w-full max-w-page flex-col items-center text-white ">
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
          {data?.showTags &&
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
      next: { revalidate: 10 },
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
      next: { revalidate: 10 },
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
              size: key,
              src: convertRelativeUrl(format.url),
              width: format.width,
              height: format.height,
            };
          });

          imageLinks.push({
            id: item.id,
            src: convertRelativeUrl(
              item.attributes.formats?.xlarge?.url ||
                item.attributes.formats?.large?.url ||
                item.attributes.formats?.medium?.url ||
                item.attributes.formats?.small?.url ||
                item.attributes.formats?.xsmall?.url ||
                item.attributes.formats?.thumbnail?.url ||
                "/default.jpg"
            ),
            width:
              item.attributes.formats?.xlarge?.width ||
              item.attributes.formats?.large?.width ||
              item.attributes.formats?.medium?.width ||
              item.attributes.formats?.small?.width ||
              item.attributes.formats?.xsmall?.width ||
              item.attributes.formats?.thumbnail?.width ||
              300,
            height:
              item.attributes.formats?.xlarge?.height ||
              item.attributes.formats?.large?.height ||
              item.attributes.formats?.medium?.height ||
              item.attributes.formats?.small?.height ||
              item.attributes.formats?.xsmall?.height ||
              item.attributes.formats?.thumbnail?.height ||
              300,
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
