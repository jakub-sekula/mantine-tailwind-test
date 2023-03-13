import Head from "next/head";

import slugify from "slugify";
import { motion } from "framer-motion";
import { IconDownload } from "@tabler/icons";
import { FaLinkedin } from "react-icons/fa";

import { Layout } from "components/layout";
import { SectionHeading, TableOfContents } from "components/common";
import { ExperienceLine, BulletsOnly, InlineList } from "components/cv";
import Link from "next/link";

export default function Cv({ data }) {
  console.log(data);
  return (
    <>
      <Head>
        <title>CV - Jakub Sekula</title>
      </Head>
      <Layout>
        <motion.section
          id="cv"
          className="relative mx-auto grid w-full max-w-5xl grid-cols-12 px-6 pt-8 xl:px-2 2xl:px-0 "
        >
          <h1 className="md:texxt-center col-span-full font-heading text-3xl font-bold md:mb-6 md:text-4xl lg:text-5xl">
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
            className="row-[span_7_/_span_7] row-start-2 hidden w-full flex-col text-right text-sm
        font-light lg:col-span-3 lg:col-start-10 lg:block "
          >
            <nav aria-label="Table of contents" className="sticky top-16">
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
                <li>
                  <Link
                    className=" ml-auto mt-4 flex h-min w-max cursor-pointer select-none items-center
                    justify-center gap-2 rounded-md 
                    text-center text-xs transition-all duration-200 hover:-translate-y-[2px]
                  "
                    href="https://www.linkedin.com/in/jakub-sekula/"
                  >
                    View on LinkedIn
                    <FaLinkedin size={24} />
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>

          {data.sections.map((section) => {
            return (
              <section
                key={`${section.title}-${section.id}-main`}
                id={slugify(section.title).toLowerCase()}
                className="col-span-full mb-4 flex flex-col rounded-lg lg:col-span-9 lg:col-start-1"
              >
                <SectionHeading
                  color={section.color}
                  title={section.title}
                  className="top-24 w-full py-4"
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
    </>
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
