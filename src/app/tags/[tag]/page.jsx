import Head from "next/head";
import Link from "next/link";
import { Layout } from "@components/layout";

export default async function Tag({ params }) {
  const { data } = await getData(params);
  return (
    <>
      {data.albums.data.length != 0
        ? data.albums.data.map((album) => (
            <Link
              key={album.attributes.slug}
              href={`/photography/${album.attributes.slug}`}
            >
              {album.attributes.title}
            </Link>
          ))
        : null}
      {data.projects.data.length != 0
        ? data.projects.data.map((project) => (
            <Link
              key={project.attributes.slug}
              href={`/projects/${project.attributes.slug}`}
            >
              {project.attributes.title}
            </Link>
          ))
        : null}
      {data.posts.data.length != 0
        ? data.posts.data.map((post) => (
            <Link
              key={post.attributes.slug}
              href={`/blog/${post.attributes.slug}`}
            >
              {post.attributes.title}
            </Link>
          ))
        : null}
    </>
  );
}

async function getData(params) {
  const qs = require("qs");
  const { tag } = params;
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
    data: resJson.data.attributes,
  };
}

export async function generateStaticParams() {
  const headers = new Headers({
    Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  });
  const tags = await fetch(
    "http://localhost:1337/api/tags?pagination[pageSize]=50",
    { headers }
  )
    .then((res) => res.json())
    .then((json) => json.data);
  return tags.map((tag) => ({ tag: tag.attributes.slug }));
}
