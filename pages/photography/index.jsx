import { Layout } from "components/layout";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Page({ data }) {
  return (
    <Layout>
      <motion.div className="w-full py-36 text-center text-5xl font-bold flex flex-col">
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
    </Layout>
  );
}

export async function getStaticProps(ctx) {
  const headers = new Headers({
    Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  });

  let res = await fetch(
    "http://localhost:1337/api/albums?populate=featured_image&filters[showAsCategory][$eq]=true",
    { headers }
  );

  let resJson = await res.json();

  return {
    props: {
      data: resJson.data,
    },
  };
}
