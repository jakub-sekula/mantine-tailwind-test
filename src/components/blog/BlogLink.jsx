import Link from "next/link";
import Image from "next/image";
import { Tag } from "@components/common";
import { convertRelativeUrl } from "lib/utils";

export default function BlogLink({ post, delay }) {
  const image = post.attributes.featured_image?.data?.attributes;

  return (
    <Link
      key={`project-card-${post.id}`}
      href={`/blog/${post.attributes.slug}`}
      className="rounded-card group flex items-center overflow-hidden"
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
        <span className="text-xs font-light">
          {new Date(post.attributes.createdAt).toLocaleDateString("en-gb")}
        </span>

        <h3 className="font-heading line-clamp-2 group-hover:underline">
          {post.attributes.title}
        </h3>
        {!!post.attributes.tags?.data.length ? (
          <ul className="mt-1 flex flex-wrap gap-2">
            {post.attributes.tags.data?.slice(0, 4).map((tag) => (
              <Tag tag={tag} key={tag.name}/>
            ))}
          </ul>
        ) : null}
      </div>
    </Link>
  );
}
