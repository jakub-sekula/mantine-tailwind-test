import { Hyperlink } from "components/common";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { customEaseTransition } from "dummyData";
import Link from "next/link";

export default function PhotographySection({ title }) {
  return (
    <section
      id="photography-section"
      className="mx-auto flex w-full max-w-page flex-col items-center gap-12"
    >
      <h2
        id="webdev"
        className="font-poppins text-4xl font-bold text-js-yellow"
      >
        {title}
      </h2>
      <div className="relative grid w-full grid-cols-12 gap-4">
        <PhotoCard img="images/travel.jpg" title="travel" />
        <PhotoCard img="images/architecture.jpg" title="architecture" />
        <PhotoCard img="images/analogue.jpg" title="analogue" />
        <PhotoCard img="images/monochrome.jpg" title="monochrome" />
        <PhotoCard img="images/portraits.jpg" title="portraits" />
        <PhotoCard img="images/experiments.jpg" title="experiments" />
      </div>
      <Hyperlink title="Go to photography page" href="/photography" />
    </section>
  );
}

function PhotoCard({ title = "Photo", img = "IMG_1933.jpg" }) {
  const router = useRouter();

  const activeCardAnimation = {
    initial: "hidden",
    animate: "visible",
    exit: "hidden",
    transition: customEaseTransition,
  };

  return (
    <Link
      scroll={false}
      href={`/photography/${title}`}
      className="relative col-span-4 flex h-56 w-full flex-col items-center justify-center gap-4 overflow-hidden
    rounded-md border border-neutral-200 px-3 py-6 font-bold"
    >
      <motion.div {...activeCardAnimation} key={`photocard-${title}`}>
        <img
          src={img}
          alt={title}
          className="absolute inset-0 -z-10 h-full w-full"
        />
        <h6 className="z-10 font-poppins text-4xl font-bold text-white">
          {title.toUpperCase()}
        </h6>
      </motion.div>
    </Link>
  );
}
