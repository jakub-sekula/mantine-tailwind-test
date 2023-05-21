import Link from "next/link";

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
    data: resJson.data,
  };
}
