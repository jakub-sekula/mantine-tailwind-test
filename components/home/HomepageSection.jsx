import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { nanoid } from "nanoid";
import slugify from "slugify";

import { Chip, Hyperlink } from "components/common";
import { useAnimationContext } from "components/contexts";

import { chips } from "siteConfig";
import SectionContainer from "./SectionContainer";

export default function HomepageSection({ title, cards, reverse }) {
  const { sectionEntryAnimation } = useAnimationContext();
  const [selected, setSelected] = useState(null);

  return (
    <SectionContainer title={title}>
      <div className="relative grid w-full grid-cols-12 md:gap-12 lg:gap-16">
        <div
          className="col-span-full row-start-1 grid grid-rows-1 gap-6 md:grid-cols-2 
        md:gap-12 lg:col-span-10 lg:col-start-2"
        >
          <div
            className={`mb-6 flex h-min flex-col gap-4 md:row-start-1 ${
              reverse ? "md:col-start-2" : "md:col-start-1"
            }`}
          >
            <h3 className="mb-1 font-heading text-2xl font-semibold leading-none sm:text-3xl">
              Internal memo board
            </h3>
            <ul className="flex gap-2">
              {chips.map((chip) => (
                <Chip
                  className="border border-[#111111]"
                  key={chip.id}
                  name={chip.name}
                />
              ))}
            </ul>
            <p className="font-light leading-normal md:text-lg md:leading-snug">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <Hyperlink
              href="/projects/web/internal-memo-board"
              className="text-sm"
            />
          </div>
          <div
            className={`row-start-1 h-80 w-full rounded-md bg-js-yellow ${
              reverse ? "md:col-start-1" : "md:col-start-2"
            }`}
          ></div>
        </div>
        <div className="col-span-full row-start-2 grid grid-cols-1 items-stretch gap-4 md:grid-cols-3 lg:grid-cols-5">
          {cards.map((card) => {
            return (
              <HomepageProjectCard
                key={`${card.title}-${card.id}`}
                setSelected={setSelected}
                id={`${card.title}-${card.id}`}
                title={card.title}
                img={card.img}
                href={card.href}
                color={card.color}
                tags={card.tags}
              />
            );
          })}
        </div>
      </div>
    </SectionContainer>
  );
}

const colors = {
  red: " bg-js-red border-js-red",
  green: " bg-js-green border-js-green",
  blue: "  bg-js-blue border-js-blue",
  yellow: " bg-js-yellow border-js-yellowŚ",
};

function HomepageProjectCard({
  setSelected,
  id,
  title = "Title",
  img,
  color = "yellow",
  tags = [],
}) {
  return (
    // ${colors[color]}
    <motion.div
      key={id}
      onClick={() => {
        setSelected(id);
      }}
      layoutId={id}
      whileTap={{ scale: 0.95 }}
      className={`relative flex w-full flex-col overflow-hidden rounded-md
		 border border-text/10 dark:border-darktext/10`}
    >
      <Image
        width={300}
        height={600}
        src={img}
        alt={img}
        className="h-48 w-full object-cover lg:h-56 xl:h-60"
      />
      <div className="py-3 px-3 ">
        <div className="mb-1 flex justify-between">
          <h4 className="font-heading text-lg font-semibold">{title}</h4>
          <span
            className={`${colors[color]} mt-2 inline-block h-3 w-3 shrink-0 rounded-full`}
          />
        </div>
        <p className="text-sm font-light line-clamp-3">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis
          consequuntur nulla omnis vitae nostrum assumenda tempore molestiae
          officia quas modi eius, ad exercitationem est placeat fugit
          praesentium cumque quisquam doloremque.
        </p>
      </div>
    </motion.div>
  );
}
