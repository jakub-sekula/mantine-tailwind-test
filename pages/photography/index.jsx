import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Layout } from "components/layout";

export default function Page({ data, instagramData }) {
  return (
    <>
      <Head>
        <title>Photography</title>
      </Head>
      <Layout>
        <motion.div className="flex w-full flex-col py-36 text-center text-5xl font-bold">
          {data.map((item) => (
            <Link
              key={`index-${item.attributes.title}`}
              href="/photography/[category]"
              as={`/photography/${item.attributes.title.toLowerCase()}`}
            >
              {item.attributes.title}
            </Link>
          ))}
        </motion.div>
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
                  className="col-span-2 rounded-sm object-cover w-full"
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
      instagramData: !!instagramResJson && instagramResJson.data.slice(0, 6),
    },
  };
}
