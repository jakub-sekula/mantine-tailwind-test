"use client";

import React from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { Zoom, Captions } from "yet-another-react-lightbox/plugins";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PageWrapper } from "../layout";
import MarkdownRenderer from "./MarkdownRenderer";
import { convertRelativeUrl } from "@/lib/utils";

export default function LightboxWrapper({imageLinks=[], data}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <>
    <Lightbox
      plugins={[Zoom, Captions]}
      open={open}
      index={index}
      captions={{ descriptionTextAlign: "center" }}
      carousel={{ preload: 2 }}
      controller={{ closeOnBackdropClick: true }}
      close={() => {setOpen(false)}}
      slides={imageLinks}
    />


        <PageWrapper>
          {!!data.sections &&
            data.sections.map((section) => {
              if (section.__component === "album.sections") {
                return (
                  <section
                    key={`${section.title}`}
                    className="col-span-full grid w-full max-w-page grid-cols-12"
                  >
                    {!!section.title || !!section.text ? (
                      <div className="col-span-full mx-auto mb-8 flex max-w-[75ch] flex-col gap-4 md:mb-12">
                        {!!section?.title ? (
                          <h2 className="text-heading text-center text-3xl font-semibold md:text-4xl xl:text-5xl">
                            {section.title}
                          </h2>
                        ) : null}

                        {/* Post content in Markdown */}
                        {!!section.text ? (
                          <MarkdownRenderer>
                            {section.text}
                          </MarkdownRenderer>
                        ) : null}
                      </div>
                    ) : null}

                    {!!section.gallery?.data ? (
                      <div
                        className={`col-span-full mx-auto grid w-full grid-cols-12 gap-6 md:gap-4`}
                      >
                        {section.gallery.data.map((item) => {
                          const image = item.attributes.formats.xlarge;
                          return (
                            <div
                              key={image.name}
                              className="aspect col-span-6 aspect-[3/2] overflow-hidden rounded-sm bg-neutral-700 md:col-span-6 lg:col-span-4"
                            >
                              <Image
                                key={`gallery-image-${item.id}`}
                                onClick={() => {
                                    setOpen(true);
                                    setIndex(
                                      imageLinks
                                        .map((link) => link.id)
                                        .indexOf(item.id)
                                  	  );
                                }}
                                width={image.width}
                                height={image.height}
                                alt={image.name}
                                src={convertRelativeUrl(image.url)}
                                className="h-full w-full object-cover transition-all duration-500 ease-out hover:scale-[102.5%]"
                              />
                            </div>
                          );
                        })}
                      </div>
                    ) : null}
                  </section>
                );
              } else if (section.__component === "album.link") {
                return (
                  <section
                    key={`links-${section.id}`}
                    className="col-span-full grid w-full max-w-page grid-cols-12 gap-4 py-4"
                  >
                    {section.albums.data.map((item) => {
                      const image =
                        item.attributes.featured_image?.data.attributes.formats;
                      return (
                        <Link
                          href="/photography/[category]"
                          as={`/photography/${item.attributes.title.toLowerCase()}`}
                          key={`links-image-${item.id}`}
                          className="group relative col-span-6 flex h-64 w-full flex-col items-center justify-center gap-4
                      overflow-hidden rounded-md border border-neutral-200 px-3 py-6 font-bold dark:border-0"
                        >
                          <Image
                            width={image.medium.width}
                            height={image.medium.height}
                            src={convertRelativeUrl(image.medium.url)}
                            alt={item.attributes.title}
                            className="absolute -z-10 h-full w-full object-cover transition-transform group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-tr from-darkbg/50 " />
                          <h6 className="z-10 font-heading text-2xl font-semibold uppercase text-white">
                            {item.attributes.title}
                          </h6>
                        </Link>
                      );
                    })}
                  </section>
                );
              }
            })}
        </PageWrapper>
    </>
  );
}
