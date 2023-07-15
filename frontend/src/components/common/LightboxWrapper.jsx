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
import clsx from "clsx";

export default function LightboxWrapper({ imageLinks = [], data }) {
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
        close={() => {
          setOpen(false);
        }}
        slides={imageLinks}
      />

      {!!data.sections &&
        data.sections.map((section) => {
          console.log(section?.gallery?.data.slice(4));
          if (section.__component === "album.sections") {
            return (
              <section
                key={`${section.title}`}
                className="col-span-full grid w-full grid-cols-12 pt-4"
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
                      <MarkdownRenderer>{section.text}</MarkdownRenderer>
                    ) : null}
                  </div>
                ) : null}

                {!!section.gallery?.data ? (
                  <div
                    className={`col-span-full mx-auto grid w-full grid-cols-12 gap-4`}
                  >
                    {section.gallery.data.map((item) => {
                      const image =
                        item.attributes.formats?.xlarge ||
                        item.attributes.formats?.large ||
                        item.attributes.formats?.medium ||
                        item.attributes.formats?.small ||
                        item.attributes.formats?.thumbnail;
                      return (
                        <div
                          key={image.name}
                          className="group relative z-0 aspect-[3/2] overflow-hidden md:rounded-sm bg-neutral-100 col-span-6 lg:col-span-4"
                        >
                          {image.height >= image.width ? (
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
                              className="absolute z-20 h-full w-full scale-[110%] object-cover blur-md  transition-all duration-500 ease-out group-hover:scale-[112.5%]"
                            />
                          ) : null}

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
                            className={clsx("absolute z-50 h-full w-full transition-all duration-500 ease-out group-hover:scale-[102.5%]", image.width >= image.height ? "object-cover" : "object-contain")}
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
                      as={`/photography/${item.attributes.slug}`}
                      key={`links-image-${item.id}`}
                      className="group relative col-span-full md:col-span-4 flex  flex-col items-center justify-center gap-4
                      overflow-hidden rounded-sm aspect-[2.5] md:aspect-[3/2] px-3 py-6 font-bold dark:border-0"
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
    </>
  );
}
