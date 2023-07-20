import Image from "next/image";
import { Hyperlink, Tag, ProjectCard } from "@components/common";
import SectionContainer from "./SectionContainer";
import { convertRelativeUrl } from "@lib/utils";
import clsx from "clsx";
import Link from "next/link";

export default function ProjectsSection({ title, reverse, projects }) {
  return (
    <SectionContainer title={title}>
      <div className="relative grid w-full grid-cols-12 md:gap-12 lg:gap-16">
        {/* Featured project(s) display */}
        {projects
          .filter((project) => project.attributes.highlighted)
          .map((project) => {
            const featured = project.attributes.featured_image.data?.attributes;
            return (
              <div
                key={`featured-project-${project.id}`}
                className="col-span-full grid grid-rows-1 gap-6 md:grid-cols-2 
                           md:gap-12 xl:col-span-10 xl:col-start-2"
              >
                <div
                  className={`relative w-full rounded-md bg-js-yellow object-cover group md:aspect-[3/2] overflow-hidden ${
                    reverse ? "md:col-start-1" : "md:col-start-2"
                  } `}
                >
                  <div className=" absolute z-0 h-0 w-full" />
                  <Link href={`/projects/${project.attributes.slug}`}>
                    <Image
                      src={convertRelativeUrl(featured.formats?.large?.url) || "placeholder-project.jpg"}
                      alt={featured?.name || "Featured photo"}
                      height={featured?.formats?.large?.height || 300}
                      width={featured?.formats?.large?.width || 150}
                      className={`z-50 h-full w-full rounded-md object-cover transition-all ease-out group-hover:scale-105 duration-500`}
                    />
                  </Link>
                </div>
                <div
                  className={`mb-12 flex h-min flex-col gap-4 md:row-start-1 md:pt-12 ${
                    reverse ? "md:col-start-2" : "md:col-start-1"
                  } `}
                >
                  <Link
                    href={`/projects/${project.attributes.slug}`}
                    className="hover-group w-fit"
                  >
                    <h3 className="animate-underline mb-1 font-heading text-2xl font-semibold leading-none sm:text-3xl">
                      {project.attributes.title}
                    </h3>
                  </Link>

                  {/* Tags display */}
                  {project.attributes.tags.data.length ? (
                    <ul className="flex flex-wrap gap-2">
                      {project.attributes.tags.data?.map((tag) => (
                        <Tag key={tag.attributes.name} tag={tag} />
                      ))}
                    </ul>
                  ) : null}

                  {!!project.attributes.excerpt ? (
                    <p className="font-light leading-normal md:leading-snug">
                      {project.attributes.excerpt}
                    </p>
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
        <div className="col-span-full grid grid-cols-1 items-stretch gap-4 md:grid-cols-3 lg:grid-cols-5">
          {projects
            .filter((project) => !project.attributes.highlighted)
            .map((project, index) => {
              return (
                <ProjectCard
                  key={`${project.title}-${project.id}`}
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
        title="All projects"
        href="/projects"
        className="reveal fade-bottom"
      />
    </SectionContainer>
  );
}
