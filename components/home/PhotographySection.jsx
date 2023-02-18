import Image from "next/image";

import { Hyperlink } from "components/common";
import Link from "next/link";
import SectionContainer from "./SectionContainer";

export default function PhotographySection({ title }) {

  return (
    <SectionContainer title="Photography">
      <div className="relative grid w-full grid-cols-12 gap-4">
        <PhotoCard img="/images/thailand.jpg" title="thailand" />
        <PhotoCard img="/images/architecture.jpg" title="architecture" />
        <PhotoCard img="/images/analogue.jpg" title="analogue" />
        <PhotoCard img="/images/monochrome.jpg" title="monochrome" />
        <PhotoCard img="/images/portraits.jpg" title="portraits" />
        <PhotoCard img="/images/experiments.jpg" title="experiments" />
      </div>
      <Hyperlink title="Go to photography page" href="/photography" />
    </SectionContainer>
  );
}

export function PhotoCard({ title = "Photo", img = "IMG_1933.jpg" }) {
  return (
    <Link
    scroll={false}
      href={`/photography/${title}`}
      className="relative col-span-4 flex h-64 w-full flex-col items-center justify-center gap-4 overflow-hidden
    rounded-md border border-neutral-200 dark:border-0 px-3 py-6 font-bold group"
      key={`photocard-${title}`}
    >
      <Image
        width={400}
        height={100}
        src={img}
        alt={title}
        className="absolute -z-10 w-full h-full group-hover:scale-105 transition-transform"
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-darkbg/50 "/>
      <h6 className="z-10 font-heading text-2xl font-semibold text-white uppercase">
        {title}
      </h6>
    </Link>
  );
}
