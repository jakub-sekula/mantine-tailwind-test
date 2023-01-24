import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Layout } from "components/layout";
import { useRouter } from "next/router";

import { useSiteAnimationContext } from "components/providers";

const selected = {
  initial: { opacity: 1 },
  enter: { opacity: 1 },
  exit: { opacity: 1 },
};

const others = {
  initial: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

export default function Work() {
  const { activeCardAnimation, otherCardAnimation } =
    useSiteAnimationContext();

  const router = useRouter();
  const [defaultTransition, setDefaultTransition] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    setDefaultTransition(true);
  }, []);

  useEffect(() => {
    console.log("transition in work: ", defaultTransition);
    if (defaultTransition) setSelectedId(null);
  }, [defaultTransition]);


  return (
    <Layout
      useDefaultTransition={defaultTransition}
    >
      <motion.div
        className="relative mx-auto grid h-[600px] w-full max-w-page grid-cols-12 
                   gap-4 py-36 text-center"
      >
        <motion.div
          {...activeCardAnimation}
          onClick={() => {
            setDefaultTransition(false);
            router.push("/about");
          }}
          className="col-span-4 flex h-20 items-center justify-center 
        rounded-md bg-js-yellow"
        >
          <motion.h1 {...otherCardAnimation} className="text-5xl font-bold">
            Hello
          </motion.h1>
        </motion.div>
        <motion.div
          {...otherCardAnimation}
          className="col-span-4 flex h-20 items-center justify-center 
        rounded-md bg-js-red text-5xl font-bold "
        >
          World
        </motion.div>
      </motion.div>
    </Layout>
  );
}
