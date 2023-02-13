import { motion } from "framer-motion";
import { useAnimationContext } from "components/contexts";

export default function BlogSection({ title }) {
  const {sectionEntryAnimation} = useAnimationContext()

  return (
    <motion.section 
    // {...sectionEntryAnimation}
    id="about-section"
    className="mx-auto flex w-full max-w-page flex-col items-center gap-12">
      <h2 id="webdev" className="font-heading text-4xl font-bold text-js-red">
        {title}
      </h2>
      <div className="relative grid w-full grid-cols-12 gap-12">
        <div className="col-span-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="mb-2 h-60 w-full rounded-md bg-js-green" />
            <div className="flex flex-col gap-1">
              <span className="text-xs font-light text-neutral-500">
                22 December 2022
              </span>
              <h3 className="font-heading text-2xl font-bold">
                This is a very long post title
              </h3>
            </div>
            <p className="text-justify text-sm font-light">
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
    </motion.section>
  );
}

function BlogLink() {
  return (
    <div className="flex items-center gap-4 border-b border-neutral-300 pb-3">
      <div className="h-16 w-16 rounded-md bg-js-yellow" />
      <div className="flex flex-col">
        <h3 className="font-heading text-lg font-bold">
          This is a very long post title
        </h3>
        <span className="text-xs font-light text-neutral-500">
          22 December 2022
        </span>
      </div>
    </div>
  );
}
