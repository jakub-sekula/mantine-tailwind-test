import { Layout } from "components/layout";
import { SectionHeading } from "components/common";
import { motion } from "framer-motion";
import {
  ExperienceLine,
  BulletsOnly,
  InlineList,
} from "components/cv";
import { TableOfContents } from "components/common";
import slugify from "slugify";
import { IconDownload } from "@tabler/icons";

export default function Cv({ data }) {
  return (
    <Layout>
      <motion.section
        id="cv"
        className="relative mx-auto grid w-full max-w-page grid-cols-12 px-6 pt-8 xl:px-2 2xl:px-0 "
      >
        <h1 className="col-span-full row-start-1 font-heading text-2xl font-bold md:text-4xl">
          Curriculum Vitae
        </h1>
        <a
          href={`${process.env.NEXT_PUBLIC_API_URL}${data.cv_pdf.data.attributes.url}`}
          target="_blank"
          rel="noreferrer"
          className="ml-auto mt-4 flex h-min w-max cursor-pointer select-none items-center justify-center
          gap-2 rounded-md border border-text py-2 px-4 text-center
          text-xs transition-all duration-200 hover:-translate-y-[2px] dark:border-darktext
        lg:hidden"
        >
          <IconDownload size={16} />
          Download PDF
        </a>
        <aside
          className="row-[span_7_/_span_7] row-start-2 mt-4 hidden w-full flex-col pt-4 text-right text-sm
        font-light lg:col-span-3 lg:col-start-10 lg:block "
        >
          <nav aria-label="Table of contents" className="sticky top-36">
            <ul className="flex flex-col">
              <TableOfContents />
              <li>
                <a
                  href={`${process.env.NEXT_PUBLIC_API_URL}${data.cv_pdf.data.attributes.url}`}
                  target="_blank"
                  rel="noreferrer"
                  className=" ml-auto mt-4 flex h-min w-max cursor-pointer select-none items-center
          justify-center gap-2 rounded-md border border-text py-2 px-4
          text-center text-xs transition-all duration-200 hover:-translate-y-[2px]
        dark:border-darktext"
                >
                  <IconDownload size={16} />
                  Download PDF
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {data.sections.map((section) => {
          return (
            <section
              key={`${section.title}-${section.id}-main`}
              id={slugify(section.title).toLowerCase()}
              className="col-span-full flex flex-col lg:col-span-9 lg:col-start-1"
            >
              <SectionHeading
                color={section.color}
                title={section.title}
                className=" top-24 w-full bg-white/95 py-4  backdrop-blur dark:bg-darkbg"
              />
              <div className="flex flex-col gap-5">
                {section.entries.map((entry) => {
                  switch (entry.type) {
                    case "Experience":
                      return (
                        <ExperienceLine
                          key={slugify(entry.place + entry.title)}
                          entry={entry}
                        />
                      );
                    case "Bullets":
                      return (
                        <BulletsOnly
                          key={slugify(entry.place + entry.title)}
                          entry={entry}
                        />
                      );
                    case "Inline list":
                      return (
                        <InlineList
                          key={slugify(entry.place + entry.title)}
                          entry={entry}
                        />
                      );
                    default:
                      return;
                  }
                })}
              </div>
            </section>
          );
        })}
      </motion.section>
    </Layout>
  );
}


export async function getStaticProps() {
  const qs = require("qs");
  let query;

  const headers = new Headers({
    Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  });

  query = qs.stringify({
    populate: {
      sections: {
        populate: {
          entries: {
            populate: "*",
          },
        },
      },
      cv_pdf: "*",
    },
  });

  const res = await fetch(`http://localhost:1337/api/cv?${query}`, {
    headers,
  });

  const resJson = await res.json();

  return {
    props: {
      data: resJson.data.attributes,
    },
  };
}
