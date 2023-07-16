import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Tags() {
  const { data } = await getData();
  return (
    <div className="">
      {data.map((item) => (
        <Link key={item.attributes.slug} href={`tags/${item.attributes.slug}`}>
          {item.attributes.title}
        </Link>
      ))}
    </div>
  );
}
async function getData() {
  try {
    const qs = require("qs");
    const headers = new Headers({
      Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
    });

    const query = qs.stringify({});

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/tags?${query}`,
      {
        headers,
        next: { revalidate: 10 },
      }
    );

    const resJson = await res.json();

    return {
      data: resJson.data,
    };
  } catch (err) {
    notFound();
  }
}
