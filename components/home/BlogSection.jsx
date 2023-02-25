import { motion } from "framer-motion";
import { useAnimationContext } from "components/contexts";
import SectionContainer from "./SectionContainer";
import Image from "next/image";

export default function BlogSection({ title }) {
  return (
    <SectionContainer title="Blog">
      <div className="relative grid w-full grid-cols-12 gap-12">
        <div className="col-span-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            {/* <div className="mb-2 h-60 w-full rounded-md bg-js-green" /> */}
            <Image
              src={"/images/thailand.jpg"}
              width={500}
              height={500}
              alt="/"
              className="mb-2 h-60 w-full rounded-md object-cover"
            />
            <div className="flex flex-col gap-1">
              <span className="text-xs font-light text-neutral-500">
                22 December 2022
              </span>
              <h3 className="font-heading text-2xl font-semibold">
                This is a very long post title
              </h3>
            </div>
            <p className="text-justify font-light line-clamp-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
        <div className="col-span-6 flex flex-col gap-4">
          <BlogLink />
          <BlogLink />
          <BlogLink />
          <BlogLink />
        </div>
      </div>
    </SectionContainer>
  );
}

function BlogLink() {
  return (
    <div className="flex items-center gap-4 border-b border-neutral-300 pb-3">
      {/* <div className=" bg-js-yellow" /> */}
      <Image
        src={"/images/thailand.jpg"}
        width={128}
        height={128}
        alt=""
        className="h-16 w-16 rounded-md object-cover"
      />
      <div className="flex flex-col">
        <h3 className="font-heading text-lg line-clamp-1">
          This is a very long post title
        </h3>
        <span className="text-xs font-light text-neutral-500">
          22 December 2022
        </span>
      </div>
    </div>
  );
}
