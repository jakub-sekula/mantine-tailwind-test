import ProjectsList from "./ProjectsList";

import { PageWrapper } from "@components/layout";

export default async function Projects() {
  const { data } = await getData();

  return (
    <>
      <PageWrapper title="My projects">
        <ProjectsList data={data} />
      </PageWrapper>
    </>
  );
}

async function getData() {
  const qs = require("qs");
  const headers = new Headers({
    Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  });

  const query = qs.stringify({
    populate: {
      featured_image: true,
      tools: {
        populate: "*",
      },
    },
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/projects?${query}`,
    {
      headers,
    }
  );

  const resJson = await res.json();

  return {
    data: resJson.data,
  };
}
