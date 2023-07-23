"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Tag } from "@/components/common";
import { convertRelativeUrl } from "@lib/utils";

import {
  ApiProjectProject,
  ApiToolTool,
} from "../../../types/strapi/contentTypes";
import { getImageOfSizeOrLargest } from "@/lib/getImageOfSizeOrLargest";

export default function ProjectsList({ data }: { data: ApiProjectProject[] }) {
  const [filter, setFilter] = useState("All projects");
  const [filteredData, setFilteredData] = useState(data);
  const filterList = [
    "All projects",
    ...new Set(data.map((item: ApiProjectProject) => item.attributes.type)),
  ];
  return (
    <>
      {" "}
      <div className="col-span-full flex justify-center gap-3">
        {filterList.map((item: string) => {
          return (
            <button
              key={`${item}-button`}
              className={`rounded-card w-36  px-4 py-2 text-sm transition-all  ease-out hover:-translate-y-px ${
                filter === item ? "outline outline-js-yellow" : ""
              }`}
              onClick={() => {
                setFilter(item);
                setFilteredData(
                  data.filter((entry: ApiProjectProject) =>
                    item != "All projects"
                      ? entry.attributes.type === item
                      : item
                  )
                );
              }}
            >
              {item}
            </button>
          );
        })}
      </div>
      {filteredData.map((item: ApiProjectProject) => (
        <Link
          href={`projects/${item.attributes.slug}`}
          key={item.attributes.slug}
          className="rounded-card hover-group group relative col-span-full flex w-full cursor-pointer
              flex-col overflow-hidden p-3 transition-all ease-in-out hover:-translate-y-1 md:col-span-4"
        >
          <Image
            priority
            src={convertRelativeUrl(
              getImageOfSizeOrLargest(
                item.attributes.featured_image.data.attributes,
                "medium"
              ).url
            )}
            alt={
              getImageOfSizeOrLargest(
                item.attributes.featured_image.data.attributes,
                "medium"
              ).name
            }
            width={
              getImageOfSizeOrLargest(
                item.attributes.featured_image.data.attributes,
                "medium"
              ).width
            }
            height={
              getImageOfSizeOrLargest(
                item.attributes.featured_image.data.attributes,
                "medium"
              ).height
            }
            className="aspect-video w-full rounded-sm object-cover"
          />
          <h2 className="animate-underline mb-2 mt-3 w-fit font-heading text-xl font-semibold">
            {item.attributes.title}
          </h2>

          <h3 className="mb-4 text-sm font-light">{item.attributes.excerpt}</h3>
          <div className="mt-auto flex w-full flex-wrap gap-2">
            {item.attributes.tools.data.map((tool: ApiToolTool) => {
              return (
                <Tag
                  key={item.attributes.title + tool.attributes.name}
                  title={tool.attributes.name}
                />
              );
            })}
          </div>
        </Link>
      ))}
    </>
  );
}
