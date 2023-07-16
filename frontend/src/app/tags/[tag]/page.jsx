import Link from "next/link";
import { notFound } from "next/navigation";
export default async function Tag({ params }) {
  const { data } = await getData(params);
  return (
    <>
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
      {data?.albums.data.length != 0
        ? data.albums.data.map((album) => (
            <Link
              key={album.attributes.slug}
              href={`/photography/${album.attributes.slug}`}
            >
              {album.attributes.title}
            </Link>
          ))
        : null}
      {data?.projects.data.length != 0
        ? data.projects.data.map((project) => (
            <Link
              key={project.attributes.slug}
              href={`/projects/${project.attributes.slug}`}
            >
              {project.attributes.title}
            </Link>
          ))
        : null}
      {data?.posts.data.length != 0
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
  try {
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
      populate: "*",
    });

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/tags?${query}`,
      {
        headers,
        next: { revalidate: 10 },
      }
    );

    const json = await res.json();

    if (json.data.length) {
      return {
        data: json.data[0].attributes,
      };
    } else {
      notFound();
    }
  } catch (err) {
    notFound();
  }
}

export async function generateStaticParams() {
  const headers = new Headers({
    Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  });
  const tags = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/tags?pagination[pageSize]=50`,
    { headers }
  )
    .then((res) => res.json())
    .then((json) => json.data);
  return tags.map((tag) => ({ tag: tag.attributes.slug }));
}
