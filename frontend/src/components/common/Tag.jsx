import Link from "next/link";
import React from "react";

export default function Tag({ tag, noLink }) {
  if (!noLink) {
    return (
      <Link
        href={`/tags/${tag.attributes.slug}`}
        className="w-fit rounded-sm bg-text px-2 py-0.5
		text-xs text-white dark:bg-darktext dark:text-text"
      >
        {tag.attributes.title || tag.attributes.name}
      </Link>
    );
  } else {
    return (
      <span
        className="w-fit rounded-sm bg-text px-2 py-0.5
		text-xs text-white dark:bg-darktext dark:text-text"
      >
        {tag.attributes.title || tag.attributes.name}
      </span>
    );
  }
}
