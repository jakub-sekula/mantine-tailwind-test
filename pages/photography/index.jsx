import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Layout } from "components/layout";
import { convertRelativeUrl } from "lib/utils";

export default function Page({ data, instagramData }) {
  return (
    <>
      <Head>
        <title>Photography</title>
      </Head>
      <Layout>
        <div className="mx-auto grid w-full grid-cols-6 gap-3">
          {data.map((item) => {
            const image =
              item.attributes.featured_image.data.attributes.formats;
            return (
              <Link
                key={`index-${item.attributes.title}`}
                href="/photography/[category]"
                as={`/photography/${item.attributes.title.toLowerCase()}`}
                className="group relative col-span-2 aspect-[3/2] flex w-full items-center justify-center overflow-hidden  object-cover"
              >
                <div className="absolute inset-0 bg-black/[15%] backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300" />
                <Image
                  src={convertRelativeUrl(image.medium.url)}
                  alt={image.medium.name}
                  width={image.medium.width}
                  height={image.medium.height}
                  className="absolute -z-10 h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                />
                <h3 className="z-10 text-white font-heading text-5xl font-semibold uppercase opacity-0 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  {item.attributes.title}
                </h3>
              </Link>
            );
          })}
        </div>

        <div className="mx-auto grid w-full max-w-3xl grid-cols-6 gap-3">
          <h2 className="col-span-full text-center">
            Latest photos from my Instagram
          </h2>
          {!!instagramData &&
            instagramData.map((item) => {
              return (
                <Image
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
      </Layout>
    </>
  );
}

export async function getStaticProps(ctx) {
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
    `http://localhost:1337/api/albums?${strapiQuery}`,
    { headers: strapiHeaders }
  );

  let strapiResJson = await strapiRes.json();

  const instagramHeaders = new Headers({
    Authorization: `Bearer ${process.env.INSTAGRAM_TOKEN}`,
  });

  let instagramRes = await fetch(
    "https://graph.instagram.com/8752984111410672/media?fields=id,caption,media_type,media_url",
    { headers: instagramHeaders }
  );

  let instagramResJson;
  if (instagramRes.ok) {
    instagramResJson = await instagramRes.json();
  }

  return {
    props: {
      data: strapiResJson.data,
      instagramData: !!instagramResJson && instagramResJson.data.slice(0, 24),
    },
  };
}
