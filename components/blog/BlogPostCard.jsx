import { convertRelativeUrl } from "lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function BlogPostCard({ post }) {
  const formats = post.attributes.featured_image?.data?.attributes.formats;
  return (
    <Link
      key={`post-card-${post.id}`}
      href={`/blog/${post.attributes.slug}`}
      className={`duration-250 group relative col-span-full flex w-full flex-col hover-group
				  overflow-hidden rounded-md border border-text/10 transition-all
				  hover:-translate-y-1 hover:bg-text/[2%] dark:border-darktext/10
				  dark:hover:bg-darktext/[1%] md:col-span-6 lg:col-span-4`}
    >
      {!!formats ? (
        <Image
          width={formats?.medium.width || 500}
          height={formats?.medium.height || 500}
          src={convertRelativeUrl(formats?.medium.url)}
          alt={formats?.medium.name}
          className="aspect-video h-36 w-full object-cover md:h-full"
        />
      ) : (
        <div className="aspect-video w-full bg-text" />
      )}

      <div className="flex flex-col p-3">
        <h3
          className="font-heading text-lg font-semibold line-clamp-3
					 animate-underline w-fit"
        >
          {post.attributes.title}
        </h3>
        {!!post.attributes.content ? (
          <p className="mt-3 text-sm font-light line-clamp-2">
            {post.attributes.content}
          </p>
        ) : null}

        {/* Tags display */}
        {!!post.attributes.tags?.data.length ? (
          <ul className="mt-5 flex flex-wrap gap-2">
            {post.attributes.tags.data?.slice(0, 3).map((tag) => (
              <span
                key={`${tag.attributes.title}-${tag.id}`}
                className="rounded-sm bg-darkbg px-2 py-0.5 text-xs
								 text-darktext dark:bg-darktext dark:text-text"
              >
                {tag.attributes.title}
              </span>
            ))}
          </ul>
        ) : null}
      </div>
    </Link>
  );
}

const colors = {
  red: " bg-js-red border-js-red",
  green: " bg-js-green border-js-green",
  blue: "  bg-js-blue border-js-blue",
  yellow: " bg-js-yellow border-js-yellow",
};
