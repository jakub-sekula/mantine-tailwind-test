import Head from "next/head";
import { motion } from "framer-motion";
import { Layout } from "components/layout";

export default function Blog() {
  return (
    <>
      <Head>
        <title>Contact</title>
      </Head>
      <Layout>
        <motion.div className="w-full py-36 text-center text-5xl font-bold">
          Contact
        </motion.div>
      </Layout>
    </>
  );
}
