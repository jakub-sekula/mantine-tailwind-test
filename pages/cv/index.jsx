import { Layout } from "components/layout";
import { SectionHeading } from "components/common";
import { motion } from "framer-motion";
import {
  ExperienceLine,
  BulletsOnly,
  InlineList,
  useHeadingsData,
  useIntersectionObserver,
} from "components/cv";
import slugify from "slugify";
import { useState } from "react";
import { IconDownload } from "@tabler/icons";

export default function Cv({ data }) {
  console.log(data);
  return (
    <Layout>
      <motion.section
        id="cv"
        className="relative mx-auto grid w-full max-w-page grid-cols-12 pt-8"
      >
        <h1 className="col-span-full row-start-1 font-heading text-2xl font-bold md:text-4xl">
          Curriculum Vitae
        </h1>
        <a
          href={`${process.env.NEXT_PUBLIC_API_URL}${data.cv_pdf.data.attributes.url}`}
          target="_blank"
          referrerPolicy="noreferrer"
          className="my-2 flex h-min w-max cursor-pointer select-none items-center
          justify-center gap-2 rounded-md border border-text py-2 px-4
          text-center text-xs transition-all duration-200 hover:-translate-y-[2px]
        dark:border-darktext"
        >
          <IconDownload size={16} />
          Download PDF
        </a>
        <aside className="row-[span_7_/_span_7] row-start-3 hidden w-full text-right text-sm font-light lg:col-span-3 lg:col-start-10 lg:block ">
          <TableOfContents />
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

const TableOfContents = () => {
  const [activeId, setActiveId] = useState();
  const { nestedHeadings } = useHeadingsData();
  useIntersectionObserver(setActiveId);

  return (
    <nav aria-label="Table of contents" className="sticky top-36">
      <ul className="flex flex-col gap-4">
        {nestedHeadings.map((heading) => (
          <li
            key={heading.id}
            className={heading.id === activeId ? "font-bold" : ""}
          >
            <a
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(`#${heading.id}`).scrollIntoView({
                  behavior: "smooth",
                });
              }}
              href={`#${heading.id}`}
            >
              {heading.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

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

  console.log(resJson.data.attributes.sections);

  return {
    props: {
      data: resJson.data.attributes,
    },
  };
}
