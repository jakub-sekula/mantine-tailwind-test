import Link from 'next/link'
import React from 'react'

export default function Tag({tag}) {
  return (
	<Link
	href={`/tags/${tag.attributes.slug}`}
	key={`${tag.attributes.title}-${tag.id}`}
	className="rounded-sm bg-text px-2 py-0.5 text-xs
  text-white dark:bg-darktext dark:text-text w-fit"
  >
	{tag.attributes.title || tag.attributes.name}
  </Link>
  )
}
