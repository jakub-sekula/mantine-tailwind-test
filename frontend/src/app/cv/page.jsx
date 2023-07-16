import Head from "next/head";
import Link from "next/link";

import slugify from "slugify";
import { FaLinkedin } from "react-icons/fa";
import { IconDownload } from "@tabler/icons";

import { Layout, PageWrapper } from "@components/layout";
import { SectionHeading, TableOfContents } from "@components/common";
import { ExperienceLine, BulletsOnly, InlineList } from "@components/cv";
import { notFound } from "next/navigation";

export default async function Cv() {
  const { data } = await getData();
  return (
    <PageWrapper title="Curriculum Vitae">
      <a
        href={`${process.env.NEXT_PUBLIC_API_URL}${data.cv_pdf.data.attributes.url}`}
        target="_blank"
        rel="noreferrer"
        className="ml-auto mt-4 flex h-min w-max cursor-pointer select-none items-center justify-center
          gap-2 rounded-md border border-text px-4 py-2 text-center
          text-xs transition-all duration-200 hover:-translate-y-[2px] dark:border-darktext
        lg:hidden"
      >
        <IconDownload size={16} />
        Download PDF
      </a>
      <aside
        className="row-[span_7_/_span_7] row-start-1 hidden w-full flex-col text-right text-sm
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
          justify-center gap-2 rounded-md border border-text px-4 py-2
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
              className="top-24 w-full pb-4"
            />
            <div className="flex flex-col gap-5">
              {section.entries.map((entry) => {
                if (!entry.show_on_website) return;
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
    </PageWrapper>
  );
}

async function getData() {
  try {
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
      filter: {
        sections: {
          entries: {
            show_on_website: {
              $eq: false,
            },
          },
        },
      },
    });

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/cv?${query}`,
      {
        headers,
        next: { revalidate: 10 },
      }
    );

    const resJson = await res.json();

    return {
      data: resJson.data.attributes,
    };
  } catch (err) {
    notFound();
  }
}
