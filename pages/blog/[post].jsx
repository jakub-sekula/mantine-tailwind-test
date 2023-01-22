import { Layout } from "components/layout";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const { post } = router.query;

  return (
    <Layout>
      <motion.div className="w-full py-36 text-center text-5xl font-bold">
        Blog post {post}
      </motion.div>
    </Layout>
  );
}
