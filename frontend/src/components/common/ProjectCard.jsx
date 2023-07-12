'use client'

import { useRouter } from "next/navigation";
import { convertRelativeUrl } from "@lib/utils";
import Image from "next/image";

export default function ProjectCard({ project, delay = 0, ...props }) {
  const formats = project.attributes.featured_image?.data?.attributes.formats;
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push(`/projects/${project.attributes.slug}`);
      }}
      className={`reveal fade-bottom hover-group group relative flex w-full flex-col overflow-hidden 
		   rounded-card hover:-translate-y-1  ${props.className}`}
      style={{ animationDelay: `${delay}ms`, transitionDelay: `${delay}ms` }}
    >
      <div className="h-48 w-full overflow-hidden lg:h-56 xl:h-60" >
        <Image
          width={formats?.medium.width || 500}
          height={formats?.medium.height || 500}
          src={convertRelativeUrl(formats?.medium.url)}
          alt={formats?.medium.name}
          className="h-full w-full object-cover transition-all ease-out group-hover:scale-105 duration-500"
        />
      </div>
      <div className="py-3 px-3 ">
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
