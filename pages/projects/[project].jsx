import Head from "next/head";
import Link from "next/link";
import { Layout } from "../../components/layout";

export default function Project({ data }) {
  return (
    <>
      <Head>
        <title>Project - {data.title}</title>
      </Head>
      <Layout>{data.title}</Layout>
    </>
  );
}

export async function getStaticProps(ctx) {
  const qs = require("qs");
  const { project } = ctx.params;
  let query;

  const headers = new Headers({
    Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  });

  query = qs.stringify({
    filters: {
      slug: {
        $eq: project,
      },
    },
  });

  const idRes = await fetch(`http://localhost:1337/api/projects?${query}`, {
    headers,
  });
  const idJson = await idRes.json();

  const id = idJson.data[0].id;

  query = qs.stringify({
    populate: "*",
  });

  const res = await fetch(`http://localhost:1337/api/projects/${id}?${query}`, {
    headers,
  });

  const resJson = await res.json();

  return {
    props: {
      data: resJson.data.attributes,
    },
  };
}

export async function getStaticPaths() {
  const headers = new Headers({
    Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  });

  const res = await fetch(
    "http://localhost:1337/api/projects?pagination[pageSize]=50",
    { headers }
  );
  const json = await res.json();

  const paths = json.data.map((item) => {
    return { params: { project: item.attributes.slug } };
  });

  return {
    paths: paths,
    fallback: true,
  };
}
