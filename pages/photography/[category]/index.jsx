import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import { Layout } from "components/layout";

export default function Page() {
  const router = useRouter();
  const { category } = router.query;

  return (
    <Layout>
      <Link
        scroll={false}
        href="/#photography-section"
        className="min-h-[1000px] w-full py-36 text-center text-5xl font-bold"
      >
        Photo category {category}
        <Image
          width={2000}
          height={500}
          alt={category}
          src={`/images/${category}.jpg`}
          className="mx-auto max-w-page max-h-[500px] -z-50 object-cover"
        />
      </Link>
    </Layout>
  );
}
