import { Layout } from "components/layout";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAnimationContext } from "components/contexts";

export default function About() {
  const router = useRouter();
  const [defaultTransition, setDefaultTransition] = useState(false);
  const { activeCardAnimation, otherCardAnimation } = useAnimationContext();

  useEffect(() => {
    setDefaultTransition(true);
  }, []);

  return (
    <Layout
      useDefaultTransition={defaultTransition}
    >
      <motion.div className=" flex items-center justify-center gap-12">
        <motion.div
          {...activeCardAnimation}
          onClick={() => {
            setDefaultTransition(false);
            router.push("/work", undefined, {scroll:false});
          }}
          className=" flex h-96 w-96 items-center justify-center rounded-md bg-js-blue text-center text-5xl font-bold"
        >
          <motion.h1 {...otherCardAnimation}>World</motion.h1>
        </motion.div>

        <motion.div
          {...otherCardAnimation}
          className="flex h-96 w-96 items-center justify-center rounded-md bg-js-green text-center text-5xl font-bold"
        />
      </motion.div>
    </Layout>
  );
}
