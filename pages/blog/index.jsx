import { Layout } from "components/layout";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Blog({ data }) {
  console.log(data);
  return (
    <Layout>
      <div className="">
        {data.map((item) => (
          <Link
            key={item.attributes.slug}
            href={`blog/${item.attributes.slug}`}
          >
            {item.attributes.title}
          </Link>
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps(ctx) {
  const qs = require("qs");
  const headers = new Headers({
    Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  });

  const query = qs.stringify({});

  const res = await fetch(`http://localhost:1337/api/posts?${query}`, {
    headers,
  });

  const resJson = await res.json();

  return {
    props: {
      data: resJson.data,
    },
  };
}
