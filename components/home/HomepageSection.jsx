import Link from "next/link";
import { Chip } from "components/common";
import { HomepageProjectCard } from "components/home";
import { IconChevronRight } from "@tabler/icons";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const chips = [
  { id: 1, name: "NextJS" },
  { id: 2, name: "Strapi" },
  { id: 3, name: "GraphQL" },
  { id: 4, name: "Mantine UI" },
  { id: 5, name: "Full stack" },
];

export default function HomepageSection({ title, cards, reverse }) {
  const [selected, setSelected] = useState(null);

  return (
    <motion.section className="mx-auto flex w-full max-w-page flex-col items-center gap-12 py-12 ">
      <h2 id="webdev" className="font-poppins text-4xl font-bold text-js-red">
        {title}
      </h2>
      <div className="relative grid w-full grid-cols-12 gap-16  ">
        <div
          className="col-span-10 col-start-2 row-start-1 grid grid-cols-2
        grid-rows-1 gap-12"
        >
          <div
            className={`row-start-1 flex flex-col gap-4 ${
              reverse ? "col-start-2" : "col-start-1"
            }`}
          >
            <h3 className="font-poppins text-4xl font-bold">
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
            <p className="font-light leading-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <Link scroll={false} href="/projects/web/internal-memo-board" className="flex items-center gap-1 hover:underline">
              Project details
              <IconChevronRight size={16} />
            </Link>
          </div>
          <div
            className={`row-start-1 h-80 w-full rounded-md bg-js-yellow ${
              reverse ? "col-start-1" : "col-start-2"
            }`}
          ></div>
        </div>
        <div className="col-span-full row-start-2 flex gap-4 items-stretch">
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
      {/* <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={() => {
              setSelected(false);
            }}
          >
            <motion.div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="flex h-56 w-[600px] items-center justify-center rounded-md bg-js-yellow text-5xl font-bold"
              layoutId={selected}
            >
              {selected}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence> */}
    </motion.section>
  );
}
