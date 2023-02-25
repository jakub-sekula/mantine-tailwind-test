import { Layout } from "components/layout";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const { project } = router.query;

  return (
    <Layout>
      <div className="w-full py-36 text-center text-5xl font-bold">
        Engineering project {project}
      </div>
    </Layout>
  );
}
