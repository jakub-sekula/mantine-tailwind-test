import Image from "next/image";
import Link from "next/link";

import SectionContainer from "./SectionContainer";
import { Hyperlink } from "components/common";
import { convertRelativeUrl } from "lib/utils";

export default function PhotographySection({ photos }) {
  return (
    <SectionContainer title="Photography">
      <div
        className="relative grid w-full grid-cols-12 gap-4"
      >
        {photos.map((item, index) => {
          const image = item.attributes.featured_image.data.attributes.formats;
          return (
            <PhotoCard
              key={item.attributes.title}
              image={image}
              title={item.attributes.title}
              href={`/photography/${item.attributes.title.toLowerCase()}`}
            />
          );
        })}
      </div>
      <Hyperlink title="Go to photography page" href="/photography" />
    </SectionContainer>
  );
}
export function PhotoCard({ title, image, delay = 0, href }) {
  return (
    <Link
      href={href}
      className=" group relative col-span-4 flex h-64 w-full flex-col items-center
    justify-center gap-4 overflow-hidden rounded-md border border-text/10 px-3 py-6 font-bold dark:border-0"
      style={{ animationDelay: `${delay}ms`, transitionDelay: `${delay}ms` }}
      key={`photocard-${title}`}
    >
      <Image
        src={convertRelativeUrl(image.medium.url)}
        alt={image.medium.name}
        width={image.medium.width}
        height={image.medium.height}
        className="absolute -z-10 h-full w-full object-cover transition-all group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-darkbg/50" />
      <h6 className="z-10 font-heading text-2xl font-semibold uppercase text-white">
        {title}
      </h6>
    </Link>
  );
}
