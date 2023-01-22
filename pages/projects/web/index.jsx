import {Layout} from "components/layout";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <Layout>
      <motion.div className="w-full text-5xl font-bold py-36 text-center">
          Web projects home
        </motion.div>
    </Layout>
  );
}
