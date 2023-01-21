import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {Layout} from "components/layout";


const variants = {
  hidden: { opacity: 0, x: 200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

export default function Year() {
  const [selected, setSelected] = useState(false);

  const list = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.02,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
      },
    },
  };

  const item = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: -16 },
  };
  return (
    <Layout>
      <motion.div layout>
        {!selected && (
          <motion.div
            key={1}
            layout
            animate={{ borderRadius: 20, backgroundColor: ["red", "orange"] }}
            // transition={{ duration: 0.2 }}
            onClick={() => {
              setSelected(true);
            }}
            layoutId={1}
            className="w-40 h-40 mb-20 mx-auto " // bg-red-500
          />
        )}

        {selected && (
          <motion.div
            key={1}
            layout
            initial={{ borderRadius: 60, backgroundColor: "green" }}
            onExit={{ backgroundColor: ["red"] }}
            // transition={{ duration: 0.2 }}
            onClick={() => {
              setSelected(false);
            }}
            layoutId={1}
            className="w-80 h-80 mb-20 mx-auto" //bg-green-500
          />
        )}
        <motion.div
          layout
          initial="hidden"
          animate="visible"
          variants={list}
          className="mx-auto w-full flex gap-1 flex-wrap px-8 text-xs bg-zinc-800 p-4"
        >
          <AnimatePresence>
            {Array.from(Array(20)).map((el, index) => {
              if ((index + 1) % 7 === 0) {
                return (
                  <motion.div
                    variants={item}
                    transition={{
                      type: "linear",
                      duration: 0.05,
                    }}
                    key={index}
                    className=" select-none w-8 h-8 text-zinc-800 bg-rose-500 rounded flex justify-center items-center"
                  >
                    {index + 1}
                  </motion.div>
                );
              } else if (Math.random() > 0.6) {
                return (
                  <motion.div
                    key={index}
                    variants={item}
                    transition={{
                      type: "linear",
                      duration: 0.05,
                    }}
                    className="hover:scale-125 transition-transform select-none w-8 h-8 text-zinc-800 bg-green-600 rounded flex justify-center items-center"
                  >
                    {index + 1}
                  </motion.div>
                );
              } else if (Math.random() > 0.75) {
                return (
                  <motion.div
                    key={index}
                    variants={item}
                    transition={{
                      type: "linear",
                      duration: 0.05,
                    }}
                    className="hover:scale-125 transition-transform select-none w-8 h-8 bg-green-300 rounded flex justify-center items-center"
                  >
                    {index + 1}
                  </motion.div>
                );
              }
              return (
                <motion.div
                  key={index}
                  variants={item}
                  transition={{
                    type: "linear",
                    duration: 0.05,
                  }}
                  className="hover:scale-125 transition-transform select-none w-8 h-8 bg-zinc-600 rounded flex justify-center items-center"
                >
                  {index + 1}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </Layout>
  );
}
