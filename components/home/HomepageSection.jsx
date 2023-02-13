import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { nanoid } from "nanoid";
import slugify from "slugify";

import { Chip, Hyperlink } from "components/common";
import { useAnimationContext } from "components/contexts";

import { chips } from "siteConfig";

export default function HomepageSection({ title, cards, reverse }) {
  const { sectionEntryAnimation } = useAnimationContext();
  const [selected, setSelected] = useState(null);

  return (
    <motion.section
      // {...sectionEntryAnimation}
      id={`${slugify(title).toLowerCase()}-section`}
      className="mx-auto flex w-full max-w-page flex-col items-center gap-12"
    >
      <h2 className="font-heading text-4xl font-semibold ">{title}</h2>
      <div className="relative grid w-full grid-cols-12 gap-16  ">
        <div
          className="col-span-10 col-start-2 row-start-1 grid md:grid-cols-2
        md:grid-rows-1 grid-rows-2 gap-12"
        >
          <div
            className={`md:row-start-1 flex flex-col gap-4 ${
              reverse ? "md:col-start-2" : "md:col-start-1"
            }`}
          >
            <h3 className="font-heading text-2xl font-semibold leading-none sm:mb-4 sm:text-3xl">
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
            <p className="leading-normal md:text-lg md:leading-snug ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <Hyperlink href="/projects/web/internal-memo-board" className="text-sm" />
          </div>
          <div
            className={`row-start-1 h-80 w-full rounded-md bg-js-yellow ${
              reverse ? "md:col-start-1" : "md:col-start-2"
            }`}
          ></div>
        </div>
        <div className="col-span-full row-start-2 flex items-stretch gap-4">
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
    </motion.section>
  );
}

const colors = {
  red: "bg-js-red border-js-red",
  green: "bg-js-green border-js-green",
  blue: " bg-js-blue border-js-blue",
  yellow: "bg-js-yellow border-js-yellowŚ",
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
    <motion.div
      key={id}
      onClick={() => {
        setSelected(id);
      }}
      layoutId={id}
      whileTap={{ scale: 0.95 }}
      className={`${colors[color]}relative flex w-full flex-col overflow-hidden
		 rounded-lg  text-white `}
    >
      {/* <ul className="absolute flex gap-2 p-3 ">
        {tags.map((tag, index) => {
          return (
            <Chip
              className=" bg-zinc-800 font-bold"
              name={tag}
              key={nanoid()}
            />
          );
        })}
      </ul> */}
      <Image
        width={300}
        height={600}
        src={img}
        alt={img}
        className="h-60 w-full"
      />
      <h4 className="w-1/2 p-4 font-heading text-2xl font-bold">{title}</h4>
    </motion.div>
  );
}
