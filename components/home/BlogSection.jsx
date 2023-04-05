import SectionContainer from "./SectionContainer";
import Image from "next/image";
import { convertRelativeUrl } from "lib/utils";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons";

export default function BlogSection({ posts }) {
  const latest = posts[0].attributes;
  const latest_image = latest.featured_image?.data?.attributes;
  const latest_author = `${latest.author.data?.attributes.firstname} ${latest.author.data?.attributes.lastname}`;

  return (
    <SectionContainer title="Blog">
      <div className="relative grid w-full grid-cols-12 gap-4 md:gap-12 reveal fade-bottom" style={{
            animationDelay: `250ms`,
            transitionDelay: `250ms`,
          }}>
        <div className="col-span-full flex flex-col gap-4 md:col-span-6">
          <div className="flex flex-col gap-2">
            {!!latest_image ? (
              <Image
                src={
                  convertRelativeUrl(latest_image.formats.medium.url) ||
                  "/images/thailand.jpg"
                }
                width={latest_image.formats.medium.width}
                height={latest_image.formats.medium.height}
                alt={latest.title}
                className="mb-2 h-60 w-full rounded-md object-cover"
              />
            ) : (
              <div className="mb-2 h-60 w-full rounded-md bg-text" />
            )}

            <div className="flex flex-col gap-1">
              <span className="text-xs font-light text-neutral-500">
                {latest.author?.data ? `${latest_author} • ` : null}
                {new Date(latest.createdAt).toLocaleDateString("en-gb")}
              </span>
              <Link
                href={`/blog/${latest.slug}`}
                className="font-heading text-xl font-semibold capitalize line-clamp-2 hover:underline"
              >
                <h2>
                  {latest.title} <IconArrowRight size={24} className="inline" />
                </h2>
              </Link>
            </div>
            <p className="font-light line-clamp-2">{latest.content}</p>
            {/* Tags display */}
            {!!latest.tags?.data ? (
              <ul className="mt-2 flex gap-2">
                {latest.tags?.data.map((tag) => (
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
          </div>
        </div>
        <div
          className="col-span-full flex flex-col gap-4 md:col-span-6 reveal fade-bottom"
          style={{
            animationDelay: `450ms`,
            transitionDelay: `450ms`,
          }}
        >
          {posts.slice(1, posts.length).map((post, index) => {
            return (
              <BlogLink
                post={post}
                key={`blog-link-${post.id}`}
                delay={50 * index}
              />
            );
          })}
        </div>
      </div>
    </SectionContainer>
  );
}

function BlogLink({ post, delay }) {
  const image = post.attributes.featured_image?.data?.attributes;

  return (
    <Link
      key={`project-card-${post.id}`}
      href={`/blog/${post.attributes.slug}`}
      className="group flex items-center overflow-hidden rounded-md border
                 border-text/10 dark:border-darktext/10 dark:hover:bg-darktext/[1%]"
      style={{
        animationDelay: `${delay}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {!!image ? (
        <Image
          src={
            convertRelativeUrl(image?.formats?.small.url) ||
            "/images/thailand.jpg"
          }
          width={image?.formats?.small.width || 256}
          height={image?.formats?.small.height || 256}
          alt=""
          className="h-full w-32 rounded-sm object-cover"
        />
      ) : (
        <div className="h-full w-32 rounded-sm bg-text" />
      )}

      <div className="flex h-full w-full flex-col justify-center gap-2 p-3 pl-6">
        <span className="text-xs font-light text-neutral-500">
          {new Date(post.attributes.createdAt).toLocaleDateString("en-gb")}
        </span>

        <h3 className="font-heading line-clamp-2 group-hover:underline">
          {post.attributes.title}
        </h3>
        {!!post.attributes.tags?.data.length ? (
          <ul className="mt-1 flex flex-wrap gap-2">
            {post.attributes.tags.data?.slice(0, 4).map((tag) => (
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
