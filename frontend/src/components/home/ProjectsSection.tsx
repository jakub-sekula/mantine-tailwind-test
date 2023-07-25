"use client";
import Image from "next/image";
import { Hyperlink, Tag, ProjectCard } from "@components/common";
import SectionContainer from "./SectionContainer";
import { convertRelativeUrl } from "@lib/utils";
import clsx from "clsx";
import Link from "next/link";
import {
  ApiProjectProject,
  ApiTagTag,
  ApiToolTool,
} from "../../../types/strapi/contentTypes";

interface ApiProjectProjectWithId extends ApiProjectProject {
  id: number;
}

export default function ProjectsSection({
  title,
  projects,
}: {
  title: string;
  reverse: boolean;
  projects: ApiProjectProjectWithId[];
}) {
  return (
    <SectionContainer title={title}>
      <div className="relative grid w-full grid-cols-12 md:gap-12 lg:gap-16 lg:gap-y-24">
        {/* Featured project(s) display */}
        {projects
          .filter((project) => project.attributes.highlighted)
          .map((project, index) => {
            const featured = project.attributes.featured_image.data?.attributes;
            return (
              <div
                key={`featured-project-${project.id}`}
                className="relative col-span-full grid grid-rows-1 gap-6 
                           md:grid-cols-2 md:gap-12 xl:col-span-10 xl:col-start-2 "
              >
                <div
                  className={clsx(
                    "absolute left-1/2  top-1/2 -z-50 h-full max-h-[75px]  w-full max-w-[300px]  -translate-y-1/2 rounded-full  bg-gradient-to-t from-blue-500 to-blue-300  opacity-0 blur-[100px] dark:opacity-100",
                    index % 2 === 0 ? "-translate-x-3/4" : "-translate-x-1/4"
                  )}
                />
                <div
                  className={`group relative w-full overflow-hidden rounded-md bg-js-yellow object-cover md:aspect-video md:w-[125%] ${
                    index % 2 === 0
                      ? "md:col-start-1 md:place-self-end"
                      : "md:col-start-2 md:place-self-start"
                  } `}
                >
                  <div className=" absolute z-0 h-0 w-full" />
                  <Link href={`/projects/${project.attributes.slug}`}>
                    <Image
                      src={
                        convertRelativeUrl(featured.formats?.large?.url) ||
                        "placeholder-project.jpg"
                      }
                      alt={featured?.name || "Featured photo"}
                      height={featured?.formats?.large?.height || 300}
                      width={featured?.formats?.large?.width || 150}
                      className={`z-50 h-full w-full rounded-md object-cover transition-all duration-500 ease-out group-hover:scale-105`}
                    />
                  </Link>
                </div>
                <div
                  className={clsx(
                    `flex h-min flex-col gap-4 md:row-start-1 md:mb-0 md:place-self-center`,

                    projects.filter(
                      (project) => !project.attributes.highlighted
                    ).length != 0
                      ? "mb-12"
                      : null,
                    index % 2 === 0 ? "md:col-start-2" : "md:col-start-1"
                  )}
                >
                  <Link
                    href={`/projects/${project.attributes.slug}`}
                    className="hover-group w-fit"
                  >
                    <h3 className="animate-underline mb-1 font-heading text-3xl font-semibold leading-none md:text-4xl">
                      {project.attributes.title}
                    </h3>
                  </Link>

                  {/* Tags display */}
                  {project.attributes.tags.data.length ? (
                    <ul className="flex flex-wrap gap-2">
                      {project.attributes.tags.data?.map((tag: ApiTagTag) => (
                        <Tag
                          key={tag.attributes.title}
                          href={`/tags/${tag.attributes.slug}`}
                          title={tag.attributes.title}
                        />
                      ))}
                    </ul>
                  ) : null}

                  {!!project.attributes.excerpt ? (
                    <p className="font-light leading-normal md:leading-snug">
                      {project.attributes.excerpt}
                    </p>
                  ) : null}

                  {!!project.attributes.tools.data.length ? (
                    <div className="flex gap-2">
                      {project.attributes.tools.data
                        .filter(
                          (tool: ApiToolTool) =>
                            tool.attributes.show_on_homepage
                        )
                        .map((tool: ApiToolTool, index: number) => {
                          return (
                            <Image
                              key={`${tool.attributes.name}-mini-${index}`}
                              src={convertRelativeUrl(
                                tool.attributes.icon_dark.data?.attributes
                                  ?.url ||
                                  tool.attributes.icon_light.data?.attributes
                                    ?.url
                              )}
                              width={
                                tool.attributes.icon_light.data.attributes.width
                              }
                              height={
                                tool.attributes.icon_light.data.attributes
                                  .height
                              }
                              alt={tool.attributes.name}
                              className="h-6 w-6 opacity-75 "
                            />
                          );
                        })}
                    </div>
                  ) : null}

                  <Hyperlink
                    href={`/projects/${project.attributes.slug}`}
                    className="text-sm"
                  />
                </div>
              </div>
            );
          })}

        {/* Other projects display */}
        <div className="col-span-full flex flex-wrap justify-center gap-4">
          {projects
            .filter((project) => !project.attributes.highlighted)
            .map((project, index) => {
              return (
                <ProjectCard
                  key={`${project.attributes.title}-${project.id}`}
                  project={project}
                  className={clsx(
                    projects.filter(
                      (project) => !project.attributes.highlighted
                    ).length === 3 && index === 0
                      ? "lg:col-start-2"
                      : ""
                  )}
                />
              );
            })}
        </div>
      </div>
      <Hyperlink
        title="View all projects"
        href="/projects"
        className="reveal fade-bottom  place-self-end md:place-self-auto"
      />
    </SectionContainer>
  );
}
