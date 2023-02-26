import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { Layout } from "components/layout";

export default function Projects({ data }) {
  return (
    <>
    <Head>
      <title>Projects</title>
    </Head>
    <Layout>
      <motion.div className="">
        {data.map((item) => (
          <Link
            key={item.attributes.slug}
            href={`projects/${item.attributes.slug}`}
          >
            {item.attributes.title}
          </Link>
        ))}
      </motion.div>
    </Layout>
    </>
  );
}
export async function getStaticProps(ctx) {
  const qs = require("qs");
  const headers = new Headers({
    Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  });

  const query = qs.stringify({});

  const res = await fetch(`http://localhost:1337/api/projects?${query}`, {
    headers,
  });

  const resJson = await res.json();

  return {
    props: {
      data: resJson.data,
    },
  };
}
