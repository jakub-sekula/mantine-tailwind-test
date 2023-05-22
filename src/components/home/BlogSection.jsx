import SectionContainer from "./SectionContainer";
import Image from "next/image";
import { convertRelativeUrl } from "@lib/utils";
import { BlogLink } from "@components/blog";
import { Hyperlink } from "@components/common";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons";

export default function BlogSection({ posts }) {
  const latest = posts[0].attributes;
  const latest_image = latest.featured_image?.data?.attributes;
  const latest_author = `${latest.author.data?.attributes.firstname} ${latest.author.data?.attributes.lastname}`;

  return (
    <SectionContainer title="Blog">
      <div
        className="reveal fade-bottom relative grid w-full grid-cols-12 gap-4 md:gap-12"
        style={{
          animationDelay: `250ms`,
          transitionDelay: `250ms`,
        }}
      >
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
          className="reveal fade-bottom col-span-full flex flex-col gap-4 md:col-span-6"
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
        <Hyperlink href={`/blog`} className="reveal text-sm" />
    </SectionContainer>
  );
}
