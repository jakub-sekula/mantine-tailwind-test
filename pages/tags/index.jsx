import { Layout } from "components/layout";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Tags({ data }) {
  return (
    <Layout>
      <motion.div className="">
        {data.map((item) => (
          <Link
            key={item.attributes.slug}
            href={`tags/${item.attributes.slug}`}
          >
            {item.attributes.title}
          </Link>
        ))}
      </motion.div>
    </Layout>
  );
}
export async function getStaticProps(ctx) {
	const qs = require("qs");
	const headers = new Headers({
	  Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
	});
  
	const query = qs.stringify({});
  
	const res = await fetch(`http://localhost:1337/api/tags?${query}`, {
	  headers,
	});
  
	const resJson = await res.json();
  
	return {
	  props: {
		data: resJson.data,
	  },
	};
  }
  