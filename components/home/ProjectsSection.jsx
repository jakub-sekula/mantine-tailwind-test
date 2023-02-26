import Image from "next/image";
import { motion } from "framer-motion";

import { Hyperlink } from "components/common";

import SectionContainer from "./SectionContainer";
import { convertRelativeUrl } from "lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";

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
        md:gap-12 lg:col-span-10 lg:col-start-2"
              >
                <div
                  className={`mb-6 flex h-min flex-col gap-4 md:row-start-1 ${
                    reverse ? "md:col-start-2" : "md:col-start-1"
                  }`}
                >
                  <h3 className="mb-1 font-heading text-2xl font-semibold leading-none sm:text-3xl">
                    {project.attributes.title}
                  </h3>

                  {/* Tags display */}
                  {!!project.attributes.tags.data ? (
                    <ul className="flex gap-2">
                      {project.attributes.tags.data?.map((tag) => (
                        <Link
                          href={`/tags/${tag.attributes.slug}`}
                          key={`${tag.attributes.title}-${tag.id}`}
                          className="rounded-sm bg-darkbg px-2 py-0.5 text-xs
                               text-darktext dark:bg-darktext dark:text-text"
                        >
                          {tag.attributes.title}
                        </Link>
                      ))}
                    </ul>
                  ) : null}

                  {!!project.attributes.description ? (
                    <p className="font-light leading-normal md:text-lg md:leading-snug">
                      {project.attributes.description}
                    </p>
                  ) : null}

                  <Hyperlink
                    href={`/projects/${project.attributes.slug}`}
                    className="text-sm"
                  />
                </div>

                <Image
                  src={convertRelativeUrl(featured.formats.large.url)}
                  alt={featured.name}
                  height={featured.formats.large.height}
                  width={featured.formats.large.width}
                  className={`h-80 w-full rounded-md bg-js-yellow ${
                    reverse ? "md:col-start-1" : "md:col-start-2"
                  }`}
                />
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
    </SectionContainer>
  );
}

const colors = {
  red: " bg-js-red border-js-red",
  green: " bg-js-green border-js-green",
  blue: "  bg-js-blue border-js-blue",
  yellow: " bg-js-yellow border-js-yellowŚ",
};

export function ProjectCard({ project }) {
  const formats = project.attributes.featured_image?.data?.attributes.formats;
  const router = useRouter();

  return (
    <motion.div
      key={`project-card-${project.id}`}
      layoutId={`project-card-${project.id}`}
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        router.push(`/projects/${project.attributes.slug}`);
      }}
      className={`relative flex w-full flex-col overflow-hidden rounded-md
		 border border-text/10 dark:border-darktext/10`}
    >
      <Image
        width={formats?.medium.width || 500}
        height={formats?.medium.height || 500}
        src={convertRelativeUrl(formats?.medium.url)}
        alt={formats?.medium.name}
        className="h-48 w-full object-cover lg:h-56 xl:h-60"
      />
      <div className="py-3 px-3 ">
        <div className="flex justify-between">
          <h4 className="font-heading text-lg font-semibold">
            {project.attributes.title}
          </h4>
          <span
            className={`${
              colors[project.attributes.color]
            } mt-2 inline-block h-3 w-3 shrink-0 rounded-full`}
          />
        </div>
        {!!project.attributes.description ? (
          <p className="text-sm font-light line-clamp-3">
            {project.attributes.description}
          </p>
        ) : null}
      </div>
    </motion.div>
  );
}
