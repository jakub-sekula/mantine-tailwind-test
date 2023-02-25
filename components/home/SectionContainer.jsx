import { motion } from "framer-motion";

export default function SectionContainer({ title = "title" ,children}) {
  return (
    <motion.section
      id={`${title}-section`}
      className="mx-auto flex w-full max-w-page flex-col items-center gap-12
      my-16 px-6 xl:px-4 2xl:px-0"
    >
      <h2 id="webdev" className="font-heading text-4xl font-semibold ">
        {title}
      </h2>
	  {children}
    </motion.section>
  );
}
