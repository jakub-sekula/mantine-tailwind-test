import Image from "next/image";
import Link from "next/link";
import { convertRelativeUrl } from "@lib/utils";
import { cleanPhotosData } from "@/lib/cleanPhotosData";
import { notFound } from "next/navigation";

export default async function Page() {
  const { data, instagramData } = await getData();

  const filtered = cleanPhotosData(data);

  return (
    <>
      <div className="col-span-full mx-auto grid w-full grid-cols-6">
        {Object.keys(filtered).map((item) => {
          if (filtered[item].length != 1) return null;
          return filtered[item].map((category) => {
            const image = category.featured_image.data.attributes.formats;
            return (
              <Link
                key={`index-${category.title}`}
                href="/photography/[category]"
                as={`/photography/${category.slug}`}
                className="group relative col-span-3 flex aspect-[3/2] w-full items-center justify-center overflow-hidden"
              >
                <div className="absolute inset-0 bg-black/[15%] opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100" />
                <Image
                  priority={true}
                  src={convertRelativeUrl(image.medium.url)}
                  alt={image.medium.name}
                  width={image.medium.width}
                  height={image.medium.height}
                  className="absolute -z-10 h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                />
                <h3 className="z-10 translate-y-2 font-heading text-5xl font-semibold uppercase text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {category.title}
                </h3>
              </Link>
            );
          });
        })}
      </div>

      <div className="col-span-full mx-auto grid w-full max-w-3xl grid-cols-6 gap-3">
        <h2 className="col-span-full text-center">
          Latest photos from my Instagram
        </h2>
        {!!instagramData &&
          instagramData.map((item) => {
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.media_url}
                key={item.media_url}
                alt={item.caption}
                width={250}
                height={250}
                className="col-span-2 w-full rounded-sm object-cover"
              />
            );
          })}
      </div>
    </>
  );
}

async function getData() {
  try {
    const qs = require("qs");

    const strapiHeaders = new Headers({
      Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
    });

    let strapiQuery = qs.stringify({
      populate: ["featured_image"],
      filters: {
        showAsCategory: {
          $eq: true,
        },
      },
    });

    let strapiRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/albums?${strapiQuery}`,
      { headers: strapiHeaders, next: { revalidate: 10 } }
    );

    let strapiResJson = await strapiRes.json();

    const instagramHeaders = new Headers({
      Authorization: `Bearer ${process.env.INSTAGRAM_TOKEN}`,
    });

    let instagramRes = await fetch(
      "https://graph.instagram.com/8752984111410672/media?fields=id,caption,media_type,media_url",
      { headers: instagramHeaders, next: { revalidate: 10 } }
    );

    let instagramResJson;
    if (instagramRes.ok) {
      instagramResJson = await instagramRes.json();
    }

    return {
      data: strapiResJson.data,
      instagramData: !!instagramResJson && instagramResJson.data.slice(0, 24),
    };
  } catch (err) {
    notFound();
  }
}
