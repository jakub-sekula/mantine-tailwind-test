"use client";

import { useRouter } from "next/navigation";
import { convertRelativeUrl } from "@lib/utils";
import Image from "next/image";

export default function ProjectCard({ project, delay = 0, ...props }) {
  const formats = project.attributes.featured_image?.data?.attributes.formats;
  const small_image = project.attributes.featured_image_small?.data?.attributes;
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push(`/projects/${project.attributes.slug}`);
      }}
      className={`reveal fade-bottom hover-group rounded-card group relative flex grow flex-col overflow-hidden hover:-translate-y-1 
		   md:max-w-[calc(33.333%-1rem)] xl:max-w-[calc(20%-1rem)]  ${props.className}`}
      style={{ animationDelay: `${delay}ms`, transitionDelay: `${delay}ms` }}
    >
      <div className="aspect-video w-full overflow-hidden lg:aspect-[5/4]">
        <Image
          width={small_image?.width || formats?.medium.width || 500}
          height={small_image?.height || formats?.medium.height || 500}
          src={convertRelativeUrl(small_image?.url || formats?.medium.url)}
          alt={formats?.medium.name}
          className="h-full w-full object-cover transition-all duration-500 ease-out group-hover:scale-105"
        />
      </div>
      <div className="px-3 py-3 ">
        <div className="flex justify-between">
          <h4 className="animate-underline font-heading text-lg font-semibold">
            {project.attributes.title}
          </h4>
          <span
            className={`${
              colors[project.attributes.color]
            } mt-2 inline-block h-3 w-3 shrink-0 rounded-full`}
          />
        </div>
      </div>
    </div>
  );
}

const colors = {
  red: " bg-js-red border-js-red",
  green: " bg-js-green border-js-green",
  blue: "  bg-js-blue border-js-blue",
  yellow: " bg-js-yellow border-js-yellow",
};
