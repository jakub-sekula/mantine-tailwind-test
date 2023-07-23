import { notFound } from "next/navigation";
import ProjectsList from "./ProjectsList";

import { PageWrapper } from "@components/layout";

import { ApiProjectProject } from "../../../types/strapi/contentTypes";
import { StrapiResponse } from "../../../types/strapi/responseTypes";

export async function generateMetadata() {
  return {
    title: "Projects - Jakub Sekula",
    description: "Projects homepage",
  };
}

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

async function getData(): Promise<{ data: ApiProjectProject[] }> {
  try {
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

    const res: Response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/projects?${query}`,
      {
        headers,
        next: { revalidate: 10 },
      }
    );

    const resJson: StrapiResponse<ApiProjectProject[]> = await res.json();

    return {
      data: resJson.data,
    };
  } catch (err) {
    notFound();
  }
}
