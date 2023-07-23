import Link from "next/link";
import React from "react";
import { ApiTagTag } from "../../../types/strapi/contentTypes";

export default function Tag({
  title,
  href = "",
}: {
  title:string,
  href?: string,
}) {
  if (href != "") {
    return (
      <Link
        href={href}
        className="w-fit rounded-sm bg-text px-2 py-0.5
		text-xs text-white dark:bg-darktext dark:text-text"
      >
        {title}
      </Link>
    );
  } else {
    return (
      <span
        className="w-fit rounded-sm bg-text px-2 py-0.5
		text-xs text-white dark:bg-darktext dark:text-text"
      >
        {title}
      </span>
    );
  }
}
