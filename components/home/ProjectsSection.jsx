import Image from "next/image";
import { Hyperlink, Tag, ProjectCard } from "components/common";
import SectionContainer from "./SectionContainer";
import { convertRelativeUrl } from "lib/utils";

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
                className="col-span-full  grid grid-rows-1 gap-6 md:grid-cols-2 
                           md:gap-12 xl:col-span-10 xl:col-start-2"
              >
                <Image
                  src={convertRelativeUrl(featured.formats.large.url)}
                  alt={featured.name}
                  height={featured.formats.large.height}
                  width={featured.formats.large.width}
                  className={`w-full rounded-sm bg-js-yellow object-cover md:aspect-square ${
                    reverse ? "md:col-start-1" : "md:col-start-2 "
                  } `}
                />
                <div
                  className={`mb-12 flex h-min flex-col gap-4 md:row-start-1 md:pt-12 ${
                    reverse ? "md:col-start-2" : "md:col-start-1"
                  } `}
                >
                  <h3 className="mb-1 font-heading text-2xl font-semibold leading-none sm:text-3xl">
                    {project.attributes.title}
                  </h3>

                  {/* Tags display */}
                  {project.attributes.tags.data.length ? (
                    <ul className="flex flex-wrap gap-2">
                      {project.attributes.tags.data?.map((tag) => (
                       <Tag key={tag.attributes.name} tag={tag} />
                      ))}
                    </ul>
                  ) : null}

                  {!!project.attributes.description ? (
                    <p className="font-light leading-normal md:leading-snug">
                      {project.attributes.description}
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
            .map((project) => {
              return (
                <ProjectCard
                  key={`${project.title}-${project.id}`}
                  project={project}
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

