import Link from "next/link";
import { Layout } from "../../components/layout";

export default function Tag({ data }) {
  return (
    <Layout>
      {data.albums.data.length != 0
        ? data.albums.data.map((album) => (
            <Link key={album.attributes.slug} href={`/photography/${album.attributes.slug}`}>
              {album.attributes.title}
            </Link>
          ))
        : null}
      {data.projects.data.length != 0
        ? data.projects.data.map((project) => (
            <Link key={project.attributes.slug} href={`/projects/${project.attributes.slug}`}>
              {project.attributes.title}
            </Link>
          ))
        : null}
      {data.posts.data.length != 0
        ? data.posts.data.map((post) => (
            <Link key={post.attributes.slug} href={`/blog/${post.attributes.slug}`}>
              {post.attributes.title}
            </Link>
          ))
        : null}
    </Layout>
  );
}

export async function getStaticProps(ctx) {
  const qs = require("qs");
  const { tag } = ctx.params;
  let query;

  const headers = new Headers({
    Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  });

  query = qs.stringify({
    filters: {
      slug: {
        $eq: tag,
      },
    },
  });

  const idRes = await fetch(`http://localhost:1337/api/tags?${query}`, {
    headers,
  });
  const idJson = await idRes.json();

  const id = idJson.data[0].id;

  query = qs.stringify({
    populate: "*",
  });

  const res = await fetch(`http://localhost:1337/api/tags/${id}?${query}`, {
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
    "http://localhost:1337/api/tags?pagination[pageSize]=50",
    { headers }
  );
  const json = await res.json();

  const paths = json.data.map((item) => {
    return { params: { tag: item.attributes.slug } };
  });

  return {
    paths: paths,
    fallback: true,
  };
}
