import { Layout } from "components/layout";
import { SectionHeading } from "components/common";
import { motion } from "framer-motion";
import { ExperienceLine } from "components/cv";
import { CVData } from "cv";
import slugify from "slugify";

export default function Cv() {
  return (
    <Layout>
      <motion.section
        id="cv"
        className="relative mx-auto grid w-full max-w-page grid-cols-12 gap-8 py-16  "
      >
        <h1 className=" col-span-full row-start-1 mb-4 font-heading text-4xl font-bold">
          Curriculum Vitae
        </h1>
        <aside className="col-span-3 col-start-10 row-[span_7_/_span_7] row-start-2 w-full text-right text-sm font-light ">
          <ul className="sticky top-36 flex flex-col gap-4 ">
            {CVData.map((category) => (
              <li
                className="underline"
                key={`${category.title}-${category.id}-sidebar`}
              >
                <a href={`#${slugify(category.title).toLowerCase()}`}>
                  {category.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>
        {CVData.map((category) => {
          return (
            <section
              key={`${category.title}-${category.id}-main`}
              id={slugify(category.title).toLowerCase()}
              className="col-span-9 col-start-1 flex flex-col"
            >
              <SectionHeading
                color={category.color}
                title={category.title}
                className="sticky top-24 w-full bg-white/95 py-4  backdrop-blur dark:bg-darkbg"
              />
              <div className="flex flex-col gap-5">
                {category.items.map((item) => {
                  return <ExperienceLine key={`${JSON.stringify(item)}`} item={item} />;
                })}
              </div>
            </section>
          );
        })}
      </motion.section>
    </Layout>
  );
}
